//推断函数类型中参数的最后一个参数类型
function sum(a: string, b: string, c: number) {}

type LastParam<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P extends [...any, infer Last]
    ? Last
    : never
  : never;

type X = LastParam<typeof sum>;

export {};
