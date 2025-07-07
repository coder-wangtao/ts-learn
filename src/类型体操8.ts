//判断传入的字符串字面量类型中是否有某个字符串

type Include<T extends string, C extends string> = T extends ""
  ? C extends ""
    ? true
    : false
  : T extends `${infer L}${C}${infer R}`
  ? true
  : false;

type a1 = Include<"jiang", "j">;
type a2 = Include<"", "a">;
type a3 = Include<"", "">;
export {};

//删除空格
type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;
type TrimRight<T extends string> = T extends `${infer L} ` ? TrimRight<L> : T;
type Trim<T extends string> = TrimRight<TrimLeft<T>>;
type a4 = Trim<"          .jiang     ">;

//实现一个replace(目标字符串，要替换的字符，替换后的字符)

type Replace<
  T extends string,
  C extends string,
  RC extends string,
  F extends string = ""
> = C extends ""
  ? T extends ""
    ? RC
    : `${RC}${T}`
  : T extends `${infer L}${C}${infer R}`
  ? Replace<R, C, RC, `${F}${L}${RC}`>
  : `${F}${T}`;

type a5 = Replace<"ha ha 11", "ha", "he">;
type a6 = Replace<"", "", "he">;
type a7 = Replace<"a", "", "he">;
