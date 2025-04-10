import { useEffect, useState } from 'react';

import { Button, message, notification, Progress, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import SparkMD5 from 'spark-md5';

import { mergeFile, uploadChunk, uploadStatus } from '@/services/upload';

const CHUNK_SIZE = 4 * 1024 * 1024;

/**
 * 封装文件分片方法
 * @param {File} file - 要分片的文件对象
 * @param {Number} chunkSize - 分片的大小（字节）
 * @returns {Blob[]} - 分片数组，每个元素是一个 Blob 对象
 */
const createFileChunks = (file, chunkSize) => {
  const chunks = [];
  let start = 0;
  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    chunks.push(file.slice(start, end));
    start = end;
  }
  return chunks;
};

/**
 * 增量计算文件MD5
 * @param {File} file - 要计算哈希的文件对象
 * @returns {Promise<string>} - 文件的MD5哈希值字符串
 */
const calculateFileHash = (file) => {
  return new Promise((resolve) => {
    const spark = new SparkMD5(); // 创建获取MD5实例
    const fileReader = new FileReader(); // 创建文件读取器
    const chunks = createFileChunks(file, CHUNK_SIZE); // 分片大小为1MB
    let currentChunk = 0; // 当前分片索引

    const readNextChunk = () => {
      if (currentChunk < chunks.length) {
        fileReader.readAsArrayBuffer(chunks[currentChunk]); // 读取当前分片
      } else {
        const hash = spark.end(); // 计算MD5
        resolve(hash); // 返回MD5值
      }
    };

    fileReader.onload = (e) => {
      spark.append(e.target.result); // 将分片数据添加到MD5计算器中
      currentChunk++; // 移动到下一个分片
      readNextChunk(); // 读取下一个分片
    };

    fileReader.onerror = () => {
      resolve(null); // 如果读取出错，返回null
      message.error('计算文件哈希失败');
    };

    readNextChunk(); // 开始读取第一个分片
  });
};
/**
 * 上传单个分片
 * @param {Blob} chunk - 分片数据
 * @param {number} chunkNumber - 当前分片号（从1开始）
 * @param {number} totalChunks - 总分片数
 * @param {string} fileName - 文件名
 * @param {string} fileHash - 文件哈希（作为fileID）
 * @returns {Promise<object>} - 后端响应数据
 * 请求参数（FormData）：
 * - chunk: 文件分片内容
 * - chunkNumber: 当前分片号
 * - totalChunks: 总分片数
 * - fileName: 文件名
 * - fileID: 文件哈希
 * 返回值示例：
 * {
 *   "message": "分片上传成功",
 *   "chunkNumber": 1
 * }
 */
const fetchUploadChunk = async (
  chunk,
  chunkNumber,
  totalChunks,
  fileName,
  fileHash,
) => {
  const formData = new FormData();
  formData.append('chunk', chunk); // 将文件添加到表单数据中
  formData.append('chunkNumber', chunkNumber);
  formData.append('totalChunks', totalChunks);
  formData.append('fileName', fileName);
  formData.append('fileHash', fileHash); // 添加文件哈希值

  const res = await uploadChunk(formData); // 调用上传接口
  return res; // 返回接口响应
};

const LargeFileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileHash, setFileHash] = useState('');
  const [uploadedChunks, setUploadedChunks] = useState(new Set()); // 已上传的分片号的Set集合

  // 当文件和哈希变化时，更新进度
  useEffect(() => {
    if (fileHash && file) {
      const totalChunks = createFileChunks(file).length;
      const progress = Math.round((uploadedChunks.size / totalChunks) * 100);
      setUploadProgress(progress);
    }
  }, [fileHash, file, uploadedChunks]);

  // 处理文件上传
  const handleUpload = async () => {
    if (!file) {
      message.error('请选择文件');
      return;
    }

    setUploading(true);
    try {
      // 1.计算文件hash
      const fileHash = await calculateFileHash(file);
      setFileHash(fileHash);
      message.info(`文件哈希值: ${fileHash}`);
      // 2.文件分片
      const chunks = await createFileChunks(file, CHUNK_SIZE); // 分片大小为1MB
      const totalChunks = chunks.length; // 获取分片总数
      // 3.查询后端已上传的分片
      const res = await uploadStatus({ fileHash });
      let uploadedChunks = new Set(); // 初始化已上传分片的集合
      if (res.success) {
        new Set(res.data.uploadedChunks);
      } else {
        notification.error({
          message: '获取已上传分片失败',
          description: res.message,
        });
        return;
      }
      setUploadedChunks(uploadedChunks);
      // 4.上传剩余文件分片
      let uploadedCount = uploadedChunks.size;
      for (let i = 0; i < totalChunks; i++) {
        const chunkNumber = i + 1;
        if (!uploadedChunks.has(chunkNumber)) {
          // 如果分片未上传
          const res2 = await fetchUploadChunk(
            chunks[i],
            chunkNumber,
            totalChunks,
            file.name,
            fileHash,
          ); // 上传分片
          if (!res2.success) {
            notification.error({
              message: '分片上传失败',
              description: '上传失败，请重试',
            });
            return;
          }
          uploadedChunks.add(chunkNumber);
          uploadedCount++;
          const progress = Math.round((uploadedCount / totalChunks) * 100); // 计算上传进度
          setUploadProgress(progress); // 更新进度条
        }
      }
      // 5.上传完所有分片后，通知后端合并文件
      const res3 = await mergeFile({
        fileName: file.name,
        totalChunks,
        fileHash,
      });
      if (res3.success) {
        message.success('文件上传成功');
      } else {
        notification.error({
          message: '文件合并失败',
          description: res3.message,
        });
      }
    } catch (error) {
      message.error('文件上传失败');
    } finally {
      setUploadProgress(0); // 重置进度条
      setUploading(false); // 设置上传状态为false
    }
  };

  // 当上传文件发生改变时，文件选择处理
  const handleFileChange = (info) => {
    const selectedFile = info.file.originFileObj || info.file;
    setFile(selectedFile);
    setUploadProgress(0);
    setUploadedChunks(new Set());
    setFileHash('');
  };
  const uploadProps = {
    beforeUpload: () => false, // 阻止自动上传
    showUploadList: false,
    onChange: handleFileChange,
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>大文件分片上传</h2>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      {file && <p>已选择文件: {file.name}</p>}
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file || uploading}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading
          ? '上传中...'
          : uploadedChunks.size > 0
          ? '继续上传'
          : '开始上传'}
      </Button>
      {uploadProgress > 0 && (
        <Progress percent={uploadProgress} style={{ marginTop: 16 }} />
      )}
      {fileHash && <p>文件MD5: {fileHash}</p>}
      {uploadedChunks.size > 0 && (
        <p>
          已上传分片: {uploadedChunks.size} /{' '}
          {file ? createFileChunks(file).length : 0}
        </p>
      )}
    </div>
  );
};

export default LargeFileUpload;
