function Echo(val: string) {
  return function (target: object, key?: string, descriptor?: any) {
    console.log(val, target, key, descriptor);
  };
}

@Echo("类的装饰器4")
@Echo("类的装饰器3")
@Echo("类的装饰器2")
@Echo("类的装饰器1")
class Flow {
  constructor(@Echo("构造函数的参数装饰器") str: string) {}

  @Echo("原型方法")
  handler(@Echo("原型方法的参数") str: any) {}

  @Echo("静态属性")
  static type = "xxx";

  @Echo("实例属性")
  name!: string;

  @Echo("属性访问器")
  get value() {
    return "aaa";
  }

  @Echo("静态方法")
  static getType() {
    return this.type;
  }
}

export {};
