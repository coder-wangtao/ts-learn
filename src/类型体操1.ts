//部分属性可选
interface Person {
  name: string;
  age: number;
  address: string;
}

type PartialPropsOptional<T extends object, K extends keyof T> = Partial<
  Pick<T, K>
> &
  Omit<T, K>;

type Computed<T> = {
  [K in keyof T]: T[K];
};

type p = Computed<PartialPropsOptional<Person, "age" | "address">>;
