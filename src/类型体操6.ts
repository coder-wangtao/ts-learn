//首字母大写
type CapitalizeString<T> = T extends `${infer L}${infer R}`
  ? `${Capitalize<L>}${R}`
  : T;

type a1 = CapitalizeString<"handler">;
type a2 = CapitalizeString<"parent">;
type a3 = CapitalizeString<233>;

//获取字符串字面量中的第一个字符
type FirstChar<T extends string> = T extends `${infer L}${infer R}` ? L : never;

type A = FirstChar<"BEF">; //B
type B = FirstChar<"dev">; //d
type C = FirstChar<"">; //''
type D = FirstChar<"A">; //A

//获取字符串字面量中的最后一个字符
export type LastChar<T, F = never> = T extends `${infer L}${infer R}`
  ? LastChar<R, L>
  : F;
type E = LastChar<"BEF">; //F
type F = LastChar<"dev">; //v
type G = LastChar<"">; //never

//将字符串转换为元组类型
type StringToTuple<T, F extends any[] = []> = T extends `${infer L}${infer R}`
  ? StringToTuple<R, [...F, L]>
  : F;
type H = StringToTuple<"BEF.DEV">;
type I = StringToTuple<"">;

//将字符串类型的元组转换成字符串字面量类型
type TupleToString<T extends any[], F extends string = ""> = T extends [
  infer L,
  ...infer R
]
  ? TupleToString<R, `${F}${L & string}`>
  : F;
type L = TupleToString<["a", "b", "c"]>;
type M = TupleToString<["a"]>;
type N = TupleToString<[]>;

export {};
