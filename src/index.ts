interface IPerson {
  name: string;
  age: string;
}
interface IAnimal {
  name: string;
  age: string;
  address: string;
}

let person!: IPerson;
// let animal!: IAnimal;
// person = animal;

let s1 = (a: string, b: string) => a + b;
let s2 = (a: string) => a;
s1 = s2;

function fn(callback: (instance: Child) => Child) {
  let child = new Child();
  let ins = callback(child);
  return ins;
}

class Parent {
  house() {}
}
class Child extends Parent {
  car() {}
}
class Grandson extends Child {
  money() {}
}

let t1: (instance: Child) => void = (instance: Parent) => ""; //函数的参数是逆变的
let t2: (instance: Child) => Child = (instance: Child) => new Grandson(); //函数的参数是协变的

fn((instance: Parent) => {
  instance.house();
  return new Child();
});

type Arg<T> = (arg: T) => void;
type Return<T> = (arg: any) => T;
type ArgType = Arg<Parent> extends Arg<Child> ? true : false; //逆变
type ReturnType = Return<Grandson> extends Return<Child> ? true : false; //逆变
export {};

interface MyArray<T> {
  concat1(...args: T[]): T[]; //不会对参数进行逆变检测
  concat2: (...args: T[]) => void; //会对检测逆变，这种方式不推荐
}

let arr1!: MyArray<Parent>;
let arr2!: MyArray<Child>;
// arr1 = arr2;

// const classDecorator = <T extends new (...args: any[]) => any>(target: T) => {
//   (target as any).type = "动物";
//   (target as any).getType = function () {
//     return this.type;
//   };
//   Object.assign(target.prototype, {
//     eat() {},
//     drink() {},
//   });
// };

// @classDecorator
// class Animal {}
// console.log(typeof Animal); //function
// console.log((Animal as any).getType());
// const animal = new Animal();
// console.log(animal);

// function OverrideAnimal(target: any) {
//   return class extends target {
//     eat() {
//       super.eat();
//       console.log("new eat");
//     }
//   };
// }

function Enum(isEnum: boolean): MethodDecorator {
  return function (target, property, descriptor) {
    //descriptor.enumerable 是否可枚举
    //descriptor.writable 是否可被重写
    //descriptor.configurable 是否可被删除
    //descriptor.value 当前值
    descriptor.enumerable = isEnum;
    let original = descriptor.value as any;
    descriptor.value = function () {
      console.log("prev eat");
      return original(...arguments);
    } as any;
  };
}

// class Animal {

//   @Enum(true)
//   eat() {
//     console.log("animal original");
//   }
// }

// function ToUpper(isUpper: boolean): PropertyDecorator {
//   return function (target, property, descriptor) {
//     //descriptor.enumerable 是否可枚举
//     //descriptor.writable 是否可被重写
//     //descriptor.configurable 是否可被删除
//     //descriptor.value 当前值
//     descriptor.enumerable = isEnum;
//     let original = descriptor.value as any;
//     descriptor.value = function () {
//       console.log("prev eat");
//       return original(...arguments);
//     } as any;
//   };
// }

// class Animal {
//   @ToUpper(true)
//   public name: string = "animal";
// }
// const animal = new Animal();
// animal.eat();

function MyPropertyDecorator(target: any, propertyKey: string | symbol) {
  console.log(
    `${target.toString()} Property ${String(propertyKey)} is being decorated!`
  );
}

class MyClass {
  @MyPropertyDecorator
  myProperty: string;

  constructor(myProperty: string) {
    this.myProperty = myProperty;
  }
}

function ToUpper(isUpper: boolean): PropertyDecorator {
  return function (target, property) {
    //descriptor.enumerable 是否可枚举
    //descriptor.writable 是否可被重写
    //descriptor.configurable 是否可被删除
    //descriptor.value 当前值
    let val = "";
    Object.defineProperty(target, property, {
      enumerable: true,
      get() {
        return val.toUpperCase();
      },
      set(newValue) {
        val = newValue;
      },
    });
  };
}
function valToUpper(target: any, property: any, descriptor: any) {
  let originalSet = descriptor.set;
  let originalGet = descriptor.get;
  descriptor.set = function (newValue: string) {
    return originalSet.call(this, newValue.toUpperCase());
  };
  descriptor.get = function () {
    return originalGet.call(this) + "123";
  };
}

class Animal {
  private _val!: string;
  @valToUpper
  get val() {
    return this._val;
  }
  set val(newValue: string) {
    this._val = newValue;
  }
}
const animal = new Animal();
animal.val = "abc";
console.log(animal.val);

// class Animal {
//   @ToUpper(true)
//   public name: string = "animal";
// }
