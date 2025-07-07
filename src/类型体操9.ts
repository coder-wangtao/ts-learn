//计算元组的长度
type LengthOfTuple<T extends any[]> = T["length"];
type A = LengthOfTuple<["b", "e", "f"]>;
type B = LengthOfTuple<[]>;

//得到元组类型中的第一个元素
type FirstItem<T extends any[]> = T[0];
type C = FirstItem<[string, number, boolean]>;
type D = FirstItem<["B", "E", "F"]>;

//得到元组类型中的最后一个元素
type LastItem<T extends any[]> = T extends [...infer L, infer R] ? R : never;
type E = LastItem<[string, number, boolean]>;
type F = LastItem<["B", "E", "F"]>;

//移除元组类型中的第一个类型
type Shift<T extends any[]> = T extends [infer L, ...infer R] ? R : [];
type G = Shift<[1, 2, 3]>;
type H = Shift<[1]>;
type I = Shift<[]>;

//给元组类型最后添加一个类型
type Push<T extends any[], C> = [...T, C];
type J = Push<[1, 2, 3], 4>;
type K = Push<[1], 2>;

//反转元组
type ReverseTuple<T extends any[], F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? ReverseTuple<R, [L, ...F]>
  : F;

type L = ReverseTuple<[string, number, boolean]>;
type M = ReverseTuple<[1, 2, 3]>;

//拍平元组
type Flat<T extends any[]> = T extends [infer L, ...infer R]
  ? [...(L extends any[] ? Flat<L> : [L]), ...Flat<R>]
  : T;
type N = Flat<[1, 2, 3]>;
type O = Flat<[[[1]], [2, 3], [4, [5, [6]]]]>;

export {};
