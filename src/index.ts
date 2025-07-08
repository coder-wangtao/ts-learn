import axios, { AxiosRequestConfig, AxiosResponse } from "./axios";

const baseURL = "http://localhost:8080";

interface Person {
  name: string;
  age: number;
}

let person: Person = { name: "jw", age: 30 };

let requestConfig: AxiosRequestConfig = {
  url: baseURL + "/get",
  method: "get",
  params: person,
};

axios<Person>(requestConfig)
  .then((response: AxiosResponse<Person>) => {
    console.log(response.data.age);
  })
  .catch((error: any) => {
    console.log("error" + error);
  });
