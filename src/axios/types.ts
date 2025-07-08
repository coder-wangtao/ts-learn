export type Methods = "get" | "post" | "put" | "delete";

//请求
export interface AxiosRequestConfig {
  url?: string;
  method: Methods;
  params?: any;
}
//请响应
export interface  AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, any>;
  config: AxiosRequestConfig;
  request: XMLHttpRequest;
}

export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}
