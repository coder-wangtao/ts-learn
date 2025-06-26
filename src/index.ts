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
