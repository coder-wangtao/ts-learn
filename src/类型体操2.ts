//根据值类型（挑选/忽略）对象类型的属性
interface Person {
  name: string;
  age: number;
  address: string;
}

type PickKeysByValue<T extends object, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type p = PickKeysByValue<Person, string>;

export {};
