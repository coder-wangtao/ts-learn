import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "./axios";

const baseURL = "http://localhost:8080";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

interface Person {
  name: string;
  age: number;
}

let person: Person = { name: "jw", age: 30 };

// let requestConfig: AxiosRequestConfig = {
//   url: baseURL + "/vpp/captcha",
//   method: "get",
//   params: person,
// };

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

// axios.inter;

//请求拦截器是倒序走的
let r1 = axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.name += "a";
    return config;
  },
  (err) => {
    console.log(err);
  }
);

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.name += "b";
    return config;
  },
  (err) => {
    console.log(err);
  }
);
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.name += "c";
    return config;
  },
  (err) => {
    console.log(err);
  }
);

axios.interceptors.request.eject(r1); //删除r1

//响应拦截器是正序走
// axios.interceptors.response.use(
//   (response) => {
//     response.data.name += "a";
//     return response;
//   },
//   () => {}
// );

// let r2 = axios.interceptors.response.use(
//   (response) => {
//     response.data.name += "b";
//     return response;
//   },
//   () => {}
// );

// axios.interceptors.response.use(
//   (response) => {
//     response.data.name += "c";
//     return response;
//   },
//   () => {}
// );

// axios.interceptors.response.eject(r2);

axios<Person>(requestConfig)
  .then((response: AxiosResponse<Person>) => {
    console.log(response.data);
  })
  .catch((error: any) => {
    if (axios.isCancel(error)) {
      return console.log("是取消的错误", error);
    }
    console.log("error" + error);
  });

source.cancel("我不想请求了");
