import { AxiosRequestConfig, AxiosResponse } from "./types";

class Axios {
  request<T>(axios:AxiosRequestConfig):Promise<AxiosResponse<T>> {
    return new Promise((resolve,reject) => {
        resolve('xxx' as any)
    })
  }
}

export default Axios;
