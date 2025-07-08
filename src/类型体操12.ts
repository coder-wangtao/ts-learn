//将联合类型转化为交叉类型
type UnionToIntersection<T> = (T extends any ? (p: T) => any : false) extends (
  p: infer P
) => any
  ? P
  : never;

//函数的逆变和协变
type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }>;

export {};
