// 你这个类型定义是为了实现 “互斥联合类型”，确保对象只能是三个接口中 唯一一个接口的属性集合，防止属性混合。
// 这在设计复杂数据结构、状态或者事件类型时非常有用，保证类型安全和数据结构的清晰。

interface Man1 {
  fortune: string;
}
interface Man2 {
  funny: string;
}
interface Man3 {
  foreign: string;
}

type DiscardType<T, U> = { [K in Exclude<keyof T, keyof U>]?: never };

type OrType<T, U> = (DiscardType<T, U> & U) | (DiscardType<U, T> & T);

type manType = OrType<Man3, OrType<Man1, Man2>>;

let man: manType = {
  funny: "222",
};

export {};
