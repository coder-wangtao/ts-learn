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
