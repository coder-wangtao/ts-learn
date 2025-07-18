import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "./types";
import qs from "qs";
import parseHeader from "parse-headers";
import AxiosInterceptorManager, {
  Interceptor,
} from "./AxiosInterceptorManager";

class Axios {
  public interceptors = {
    request: new AxiosInterceptorManager<InternalAxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse>(),
  };

  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const chain: (
      | Interceptor<InternalAxiosRequestConfig>
      | Interceptor<AxiosResponse<AxiosResponse>>
    )[] = [{ onFulfilled: this.dispatchRequest }];

    this.interceptors.request.interceptors.forEach((interceptor) => {
      interceptor && chain.unshift(interceptor);
    });

    this.interceptors.response.interceptors.forEach((interceptor) => {
      interceptor && chain.push(interceptor);
    });

    let promise: Promise<
      InternalAxiosRequestConfig | AxiosResponse | AxiosRequestConfig
    > = Promise.resolve(config);

    while (chain.length) {
      const { onFulfilled, onRejected } = chain.shift()!;
      promise = promise.then(
        onFulfilled as (v: AxiosRequestConfig | AxiosResponse) => any,
        onRejected
      );
    }
    return promise as Promise<AxiosResponse<T>>;
  }

  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      let { url, method, params, headers, data, timeout } = config;
      const request = new XMLHttpRequest();
      if (params) {
        if (typeof params === "object") {
          params = qs.stringify(params);
        }
        url += (url?.includes("?") ? "&" : "?") + params;
      }

      request.open(method, url!, true);

      if (headers) {
        for (let key in headers) {
          request.setRequestHeader(key, headers[key]);
        }
      }

      request.responseType = "json";
      request.onreadystatechange = () => {
        //请求发送成功了，status = 0表示请求未发送，请求（网络）异常
        if (
          (request.readyState === 4 || request.readyState === 2) &&
          request.status !== 0
        ) {
          //请求成功
          if (request.status >= 200 && request.status < 300) {
            let response: AxiosResponse<T> = {
              data: request.response || { name: "wt", age: 20 },
              status: request.status,
              statusText: request.statusText,
              headers: parseHeader(request.getAllResponseHeaders()),
              config,
              request,
            };
            resolve(response);
          }
        } else {
          reject(
            "my errorAxiosError:Request failed with status code " +
              request.status
          );
        }
      };

      let requestBody: null | string = null;
      if (data) {
        requestBody = JSON.stringify(data);
      }
      if (timeout) {
        request.timeout = timeout;
        request.ontimeout = function () {
          reject(`errorAxiosError: timeout of ${timeout}ms exceeded`);
        };
      }

      request.onerror = function () {
        reject("net::ERR_INTERNET_DISCONNECTED");
      };

      if (config.cancelToken) {
        config.cancelToken.then((message) => {
          request.abort();
          reject(message);
        });
        return;
      }

      request.send(requestBody); //发送请求
    });
  }
}

export default Axios;

//失败有几种情况?
//1 网络挂了
//2 根据状态码来决定失败
//3 超时处理
