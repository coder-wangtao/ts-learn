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
