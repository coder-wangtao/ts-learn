源码
axios 基于 XMLHttpRequest 做了一层封装

1.业务用的 axios 并不是源码中的 Axios 类中 new Axios()出来的实例，而是 Axios 类的 request 方法

2.针对拦截器
请求拦截器执行顺序是倒序(定义顺序倒序)
响应拦截器执行顺序是正序(定义顺序正序)
axios 内部用的一个数组 chain=[{request:内部请求逻辑(XMLHttpRequest)}]
请求拦截 [a1,a2,a3]:针对请求拦截器，遍历请求拦截器数组，使用 unshift 向 chain 从头添加
[a3,a2,a1,{request:内部请求逻辑(XMLHttpRequest)}]
响应拦截 [b1,b2,b3]:针对响应拦截器，遍历响应拦截器数组，使用 push 向 chain 从尾添加
[a3,a2,a1,{request:内部请求逻辑(XMLHttpRequest)},b1,b2,b3]
定义一个 promise，然后用 promise.then 依次执行数组里的每一项(数组的每一项都是一个对象{ onFulfilled:() => {}, onRejected:() => {} })

3.axios 中 cancelToken 逻辑
3.1 使用

<!--
let requestConfig: AxiosRequestConfig = {
  url: baseURL + "/get",
  method: "get",
  params: person,
  headers: {
    // "Content-Type": "application/json",
  },
  cancelToken: source.token,
  // timeout: 1000,
};
-->

入参传入 cancelToken: source.token,后面使用 source.cancel("我不想请求了")取消请求
cancelToken 是一个 promise,source.cancel 就是执行这个 promise 中的 resolve 方法，此时会在 promise 中 resolve 的 then 回调会执行
request.abort();reject(message);//取消请求，抛出错误
