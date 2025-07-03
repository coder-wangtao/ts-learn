import "reflect-metadata";

function Controller(path?: string) {
  return function (target: object) {
    Reflect.defineMetadata("path", path, target); //给类添加一个元数据(path)
  };
}

function methodDecorator(method: string) {
  return function (path: string) {
    return function (target: object, key: string, descriptor: any) {
      Reflect.defineMetadata("method", method, descriptor.value);
      Reflect.defineMetadata("path", path, descriptor.value);
    };
  };
}

const Post = methodDecorator("post");
const Delete = methodDecorator("delete");
const Get = methodDecorator("get");

@Controller("/article")
class ArticleController {
  @Post("/add")
  addArticle() {
    return "add article";
  }

  @Get("/detail")
  getDetail() {
    return "detail";
  }

  @Delete("/remove")
  removeArticle() {
    return "remove detail";
  }
}

const controller = new ArticleController();

function createRoutes(instance: any) {
  const prototype = Reflect.getPrototypeOf(instance)!;
  const classPath = Reflect.getMetadata("path", prototype.constructor);
  debugger;
  let keys = Reflect.ownKeys(prototype).filter(
    (item) => item !== "constructor"
  );
  let routes: any[] = [];
  keys.forEach((key) => {
    let prototypeFn = (prototype as any)[key];
    const method = Reflect.getMetadata("method", prototypeFn);
    const path = Reflect.getMetadata("path", prototypeFn);
    routes.push({
      method: method,
      path: classPath + path,
      handler: prototypeFn,
    });
  });
  return routes;
}
const routes = createRoutes(controller);
console.log(routes);

//模版字符串也是具备分发能力
type Direction = "top" | "bottom" | "right" | "left";
type AllMargin = `margin-${Direction}`; //"margin-top" | "margin-bottom" | "margin-right" | "margin-left"

//将对象的属性进行重命名操作{name,age,address} => {r_name,r_age,r_address}
// type Person = {
//   name: string;
//   age: number;
//   address: string;
// };

type ReType<T> = {
  [K in keyof T as `r_${K & string}`]: T[K];
};
type x = ReType<Person>;
// {
//     r_name: string;
//     r_age: string;
//     r_address: string;
// }

type Person = {
  name: string;
  age: number;
  address: string;
};

let person: Person = {
  name: "jw",
  age: 30,
  address: "北京",
};
type WithGetter<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]?: () => T[K];
};

type Compute<T> = { [K in keyof T]: T[K] };
type WithGetterType = Compute<WithGetter<Person>>;
let personGetter: WithGetterType = {
  getName() {
    return person.name;
  },
  getAge() {
    return person.age;
  },
  getAddress() {
    return person.address;
  },
};
export {};
