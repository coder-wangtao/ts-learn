const a: string = "111";
console.log(a);

let name = "1111";
let s1: String = new String("abc");
let s2: String = "abc";
let age: number;

const enum USER_ROLE {
  USER,
  ADMIN,
}

console.log(USER_ROLE.USER);

function validate(val: never) {}

function handle(a: string | number | boolean) {
  if (typeof a === "string") {
    return a;
  }
  if (typeof a === "number") {
    return a;
  }
  if (typeof a === "boolean") {
    return a;
  }
  validate(a);
}
console.log("aad");

export {};

let union: string | number | boolean | never;

let person = {
  name: "wangtao",
  age: 20,
};
//采用ts中的typeof来获取变量的类型,
//ts中的this类型需要手动指定，默认是函数的第一个参数
type IThis = typeof person;

function getVal(this: IThis, key: keyof IThis) {
  return this[key];
}

let n = getVal.call(person, "name");
let b = getVal.call(person, "age");

//ts中的函数重载是伪重载，是类型的重载，而不是逻辑的重载
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: number | string): string[] | number[] {
  if (typeof value === "string") {
    return value.split("");
  } else {
    return value
      .toString()
      .split("")
      .map((item) => Number(item));
  }
}
let arr = toArray(123);
let arr1 = toArray("123");

class Animal {
  constructor(public name: string, public age: number) {}
  eat(food: string): void {
    console.log(food);
  }
}

class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
  }
  eat() {
    return "111";
  }
}

interface Ifn {
  (): number;
  count: number;
}

const click: Ifn = () => {
  return click.count++;
};
click.count = 0;

interface IVeg {
  color: string;
  size: number;
  [key: string]: any;
}
const tomato: IVeg = {
  color: "red",
  size: 10,
  a: 1,
};

type ISwap = <T, K>(tuple: [T, K]) => [K, T];
let swap: ISwap = (tuple) => {
  return [tuple[1], tuple[0]];
};
let r = swap(["abc", 123]);

type ICallback<T> = (item: T, index: number) => void;
type IForEach = <T>(arr: T[], callback: ICallback<T>) => void;

const forEach: IForEach = (arr, callback) => {
  for (let index = 0; index < arr.length; index++) {
    callback(arr[index], index);
  }
};

forEach([1, 2, 3, "a", "b", "c"], function (item, index) {});

interface IWithLen {
  length: number;
}
function handle2<T extends IWithLen>(val: T) {
  return val.length;
}
handle2({ a: 1, b: 2, length: 123 });

let a1: string | number;
a1 = "1";

interface Person1 {
  handsome: string;
}
interface Person2 {
  high: string;
}

type Person3 = Person1 & Person2;

let person3: Person3 = {
  handsome: "帅",
  high: "高",
};

type Conditional<T> = T extends string ? string : number;
type R1 = Conditional<"1" | 1>;

type Conditional2<T, U> = T extends U ? true : false;
type R2 = Conditional2<1 | 2, 1>;
type NoDistribute<T> = T & {};
type Conditional3<T, U> = NoDistribute<T> extends U ? true : false;
type R3 = Conditional3<1 | 2, 1>;

type Conditional4<T, U> = [T] extends [U] ? true : false;
type R4 = Conditional4<1 | 2, 1>;

type MyExtract<T, U> = T extends U ? T : never;
type R6 = MyExtract<1 | 2 | 3, 1 | 2 | 4>; //求差集

type MyExclude<T, U> = T extends U ? never : T;
type R7 = MyExclude<1 | 2 | 3 | 4 | 5, 2 | 4>;

type x1 = null & {}; //never
type x2 = undefined & {}; //never
type x3 = 1 & {}; //1
type NoNullable<T> = T & {};
type R8 = NoNullable<1 | 2 | null | undefined>;

function getObj(name: string, age: number) {
  return { name, age };
}

type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type R9 = ReturnType<typeof getObj>;
// {
//   name: string;
//   age: number;
// }

type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type R10 = Parameters<typeof getObj>;

abstract class A {
  constructor(name: string, age: number) {}
}
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
type R11 = ConstructorParameters<typeof A>;

type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any[]) => infer P ? P : never;
type R12 = InstanceType<typeof A>;

function createInstance<T extends new (...args: any[]) => any>(
  target: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new target(...args);
}

class MyPerson {
  constructor(public name: string, public age: number) {}
}
let c = createInstance(MyPerson, "wt", 10);

type Swap<T> = T extends [infer A1, infer A2] ? [A2, A1] : never;
type R13 = Swap<["jw", 30]>; //[30,"jw"];

type SwapHeadTail<T> = T extends [infer H, ...infer N, infer T]
  ? [T, ...N, H]
  : never;
type R14 = SwapHeadTail<[1, 2, 3, 4, 5, 6, 7]>; //[7, 2, 3, 4, 5, 6, 1]

type PromiseReturnValue<T> = T extends Promise<infer P>
  ? PromiseReturnValue<P>
  : T;
type R15 = PromiseReturnValue<Promise<Promise<Promise<100>>>>;

type ElementToUnion<T> = T extends Array<infer E> ? E : never;
type R16 = ElementToUnion<[number, boolean, string]>; //string | number | boolean
interface IAddress {
  x: string;
  y: string;
}

// interface Person {
//   name: string;
//   age: number;
//   address: IAddress;
// }

type Partial<T> = {
  [K in keyof T]?: T[K];
};
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

let p1: Partial<Person> = { name: "1", age: 100, address: { x: "1", y: "1" } };
// let p2: DeepPartial<Person> = { name: "1", age: 100, address: { x: "1" } };

type Require<T> = {
  [K in keyof T]-?: T[K];
};

// interface Person {
//   name: string;
//   age: number;
// }
// let p3: Require<Person> = { name: "1", age: 10 };

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// let p4: Readonly<Person> = { name: "1", age: 10 };
// p4.age = 12;

interface Person {
  name: string;
  age: number;
  address: IAddress;
}

type Mutate<T> = {
  -readonly [K in keyof T]: T[K];
};
// let p5: Mutate<Person> = { name: "1", age: 10 };
// p5.age = 12;

type Pick<T, K extends keyof T> = {
  [Key in K]: T[K];
};
type PickPerson = Pick<Person, "name" | "age">;

interface Person {
  name: string;
  age: number;
  address: IAddress;
}
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// type OmitPerson = Omit<Person, "name" | "age">;

// function mixin<T, K>(a: T, b: K): Omit<K, keyof T> & T {
//   return { ...a, ...b };
// }

function mixin<T, K>(a: T, b: K): Omit<K, keyof T> & T {
  return { ...a, ...b };
}
let x = mixin(
  {
    name: "wt",
    age: 30,
    c: 3,
  },
  {
    name: 123,
    age: 30,
    b: 2,
  }
);
type Computed<T> = {
  [K in keyof T]: T[K];
};
type nameType = Computed<typeof x>;

type Record<K extends keyof any, V> = { [P in K]: V };
let p6: Record<string, any> = { AB: 123 };

function map<T extends keyof any, K, U>(
  obj: Record<T, K>,
  callback: (value: K, key: T) => U
) {
  let result = {} as Record<T, U>;
  for (let key in obj) {
    result[key] = callback(obj[key], key);
  }
  return result;
}

let mapResult = map({ name: "jj", age: 30 }, (value, key) => {
  return "ABC";
});

let obj: {};
let str: string = "js";
obj = str;
obj.toString();
