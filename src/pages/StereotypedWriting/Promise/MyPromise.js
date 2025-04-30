const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  #state = 'pending';
  #result = undefined;
  #handlers = [];
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (data) => {
      this.#changeState(REJECTED, data);
    };
    // 处理throw异常情况，捕获throw异常，reject出去
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  #changeState(state, data) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = data;
    this.#run();
  }
  #run() {
    if (this.#state === PENDING) return;
    // 处理异步
    // 1. 先取出第一个 handler
    // 2. 如果是 fulfilled 状态，执行 onFulfilled
    // 3. 如果是 rejected 状态，执行 onRejected
    while (this.#handlers.length) {
      const { onFulfilled, onRejected } = this.#handlers.shift();
      if (this.#state === FULFILLED && typeof onFulfilled === 'function') {
        onFulfilled(this.#result);
        // resolve(x);
      } else if (this.#state === REJECTED && typeof onRejected === 'function') {
        onRejected(this.#result);
      }
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
}

new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
})
  .then(
    (res) => {
      console.log('res', res);
      return 2;
    },
    (err) => {
      console.log('err', err);
    },
  )
  .then(
    () => {
      console.log(111);
    },
    () => {
      console.log(111);
    },
  );
