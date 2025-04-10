import { request } from '@umijs/max';

// 分片上传
export async function uploadChunk(params = {}) {
  return request('/upload/chunk', {
    method: 'post',
    data: params,
  });
}

// 分片合并
export async function mergeFile(params = {}) {
  return request('/upload/merge', {
    method: 'post',
    data: params,
  });
}

// 查询已上传分片
export async function uploadStatus(params = {}) {
  return request('/upload/status', {
    method: 'get',
    params: params,
  });
}
