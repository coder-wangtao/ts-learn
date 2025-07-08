//获取对象类型中的可选属性的联合类型
//可以考虑把对象的属性删除，看能不能赋予给自己，如果可以就是可选的
type OptionalKeys<T extends object, K = keyof T> = K extends keyof T
  ? Omit<T, K> extends T
    ? K
    : never
  : any;

type A = OptionalKeys<{ foo: number; bar?: string }>;
type B = OptionalKeys<{ foo?: number; flag?: string }>;

//保留一个对象中的可选属性类型
type PickOptional<T extends object> = Pick<T, OptionalKeys<T>>;
type C = PickOptional<{ foo: number; bar?: string }>;
type D = PickOptional<{ foo: number; bar: string }>;
type E = PickOptional<{ foo?: number; bar?: string }>;

type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>;
type F = RequiredKeys<{
  foo: number | undefined;
  bar?: string;
  flag: boolean;
}>;
type G = RequiredKeys<{
  foo: number;
  bar?: string;
}>;

type PickRequired<T extends object> = Omit<T, OptionalKeys<T>>;
type H = PickRequired<{ foo: number; bar?: string }>;
type I = PickRequired<{ foo: number; bar: string }>;

type isNever<T> = [T] extends [never] ? true : false;
type J = isNever<never>;
type K = isNever<any>;

export {};
