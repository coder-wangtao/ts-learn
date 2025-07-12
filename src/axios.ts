import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface ResponseData<T = any> {
  code: number;
  data?: T;
  message: string;
}

class HttpRequest {
  public baseUrl = "http://localhost:4000";
  public timeout = 3000;
  public requestQueue = new Set();
  public tokens = new Set();
  mergeConfig(requestConfig: AxiosRequestConfig) {
    return Object.assign(
      {
        baseUrl: this.baseUrl,
        timeout: this.timeout,
      },
      requestConfig
    );
  }

  withInterceptors(instance: AxiosInstance) {
    let requestUrl: string = "";
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      config.headers.token = "my token";
      requestUrl = config.url!;
      this.requestQueue.add(requestUrl);
      return config;
    });
    instance.interceptors.request.use(
      (response) => {
        if (response.data.code === 401) {
          return Promise.reject("请求处理失败");
        }
        this.requestQueue.delete(requestUrl);
        return response;
      },
      (err) => {
        this.requestQueue.delete(requestUrl);
        return Promise.reject("请求处理失败");
      }
    );
  }

  public getAllTokens() {
    return this.tokens;
  }

  public request(requestConfig: AxiosRequestConfig) {
    const instance = axios.create();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const cancelToken = source.token;

    const requestOptions = this.mergeConfig({
      cancelToken: cancelToken,
      ...requestConfig,
    });
    this.tokens.add(cancelToken);
    this.withInterceptors(instance);
    return instance(requestOptions) as Promise<ResponseData>;
  }
  get<T = any>(url: string, config: any): Promise<ResponseData<T>> {
    return this.request({
      method: "get",
      url,
      params: config,
    });
  }
  post<T = any>(url: string, data: any): Promise<ResponseData<T>> {
    return this.request({
      method: "post",
      url,
      data,
    });
  }
}

const http = new HttpRequest();
http.request({});
