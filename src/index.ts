import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "./axios";

const baseURL = "http://localhost:8080";

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
  url: baseURL + "/vpp/captcha",
  method: "post",
  data: person,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 1000,
};

// axios.inter;

debugger;
axios<Person>(requestConfig)
  .then((response: AxiosResponse<Person>) => {
    console.log(response.data);
  })
  .catch((error: any) => {
    console.log("error" + error);
  });
