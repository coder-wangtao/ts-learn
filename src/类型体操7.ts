//重复字符串
export type RepeatString<
  T extends string,
  C extends number,
  A extends any[] = [],
  F extends string = ""
> = C extends A["length"]
  ? F
  : RepeatString<T, C, [...A, undefined], `${F}${T}`>;

//第一次
//a 3 [undefined] a
//第二次
//a 3 [undefined，undefined] aa
//第三次
//a 3 [undefined，undefined，undefined] aaa
//第四次
//返回aaa
type A = RepeatString<"a", 3>;
type B = RepeatString<"a", 0>;

//将字符串字面量类型安装指定字符，分割为元组，无法分割则返回原字符串字面量

export type SplitString<
  T extends string,
  S extends string,
  A extends any[] = []
> = T extends `${infer L}${S}${infer R}`
  ? SplitString<R, S, [...A, L]>
  : [...A, T];

type A1 = SplitString<"handle-open-flag", "-">;
type A2 = SplitString<"open-flag", "-">;
type A3 = SplitString<"handle.open", ".">;

//计算字符串字面量的长度
type LengthOfString<
  T extends string,
  A extends any[] = []
> = T extends `${infer L}${infer R}`
  ? LengthOfString<R, [...A, L]>
  : A["length"];

type A4 = LengthOfString<"BEF.DEV">;
type A5 = LengthOfString<"">;

//驼峰命名 - => 驼峰命名

type RemoveFirst<T> = T extends `-${infer V}` ? V : T;
type KebabCase<
  T extends string,
  F extends string = ""
> = T extends `${infer L}${infer R}`
  ? KebabCase<R, `${F}${Capitalize<L> extends L ? `-${Lowercase<L>}` : L}`>
  : RemoveFirst<F>;

type a1 = KebabCase<"HandleOpenFlag">;
type a2 = KebabCase<"OpenFlag">;

//驼峰命名转 - 驼峰命名=> -

type CamelCase<
  T extends string,
  F extends string = ""
> = T extends `${infer L}-${infer R1}${infer R2}`
  ? CamelCase<R2, `${F}${L}${Capitalize<R1>}`>
  : `${Capitalize<`${F}${T}`>}`;

type a3 = CamelCase<"handle-open-flag">;
type a4 = CamelCase<"open-flag">;

type a5 = {
  "handle-open": (flag: boolean) => true;
  "preview-item": (data: { item: any; index: number }) => true;
  "close-item": (data: { item: any; index: number }) => true;
};

type ComponentEmitsType<T> = {
  [K in keyof T as `on${CamelCase<K & string>}`]: T[K] extends (
    ...args: infer P
  ) => any
    ? (...args: P) => void
    : never;
};

type a6 = ComponentEmitsType<a5>;

export {};
