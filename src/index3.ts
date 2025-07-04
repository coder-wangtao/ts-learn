import "reflect-metadata";

@Reflect.metadata("Class", "Animal metadata")
class Animal {
  @Reflect.metadata("Class Property", "type metadata")
  static type = "动物";
  @Reflect.metadata("Pro Method", "eat metadata")
  eat() {}
}

/*
weakMap = {
  Animal:{
    undefined:{"Class","Animal metadata"},
    type:{"Class Property","type metadata"}
  }
  Animal.prototype:{
    eat:{"Class Property","type metadata"}
  }
}
 
*/
// Reflect.defineMetadata("Class", "Animal metadata", Animal);
// Reflect.defineMetadata("Class Property", "type metadata", Animal, "type");
// Reflect.defineMetadata("Pro Method", "eat metadata", Animal.prototype, "eat");

// console.log(Reflect.getMetadata("Class", Animal));
// console.log(Reflect.getMetadata("Class Property", Animal, "type"));
// console.log(Reflect.getMetadata("Pro Method", Animal.prototype, "eat"));

const REQUIRED_KEY = Symbol();
const VALIDATE_TYPE_KEY = Symbol();
function Required() {
  return function (target: object, key: string) {
    const requiredKeys: string[] =
      Reflect.getMetadata(REQUIRED_KEY, target) || [];
    Reflect.defineMetadata(REQUIRED_KEY, [...requiredKeys, key], target);
  };
}

enum Type {
  String = "string",
  Number = "number",
}

function ValueType(type: Type) {
  return (target: object, key: string) => {
    Reflect.defineMetadata(VALIDATE_TYPE_KEY, type, target, key);
    debugger;
  };
}

class Person {
  @ValueType(Type.String)
  @Required()
  name!: string;
  @ValueType(Type.Number)
  @Required()
  age!: number;
}

function validate(instance: any) {
  let existsKeys = Reflect.ownKeys(instance);
  const requiredKeys = Reflect.getMetadata(REQUIRED_KEY, instance);
  for (let key of requiredKeys) {
    const validate_type = Reflect.getMetadata(VALIDATE_TYPE_KEY, instance, key);
    if (validate_type) {
      if (typeof instance[key] !== validate_type) {
        throw new Error("这个属性" + key + "类型不正确");
      }
    }
    if (!existsKeys.includes(key)) {
      throw new Error("这个" + key + "没有传递");
    }
  }
  console.log(requiredKeys);
}
const person = new Person();
//@ts-expect-error
person.name = 13;
validate(person);
// const person = new Person();
