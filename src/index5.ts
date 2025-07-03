interface Monitor {}
interface Host {}

class Container {
  private instances = new Map(); //这个 Map 用来存储实例（key 为服务的名称，value 为服务的实例）。
  public properties = new Map(); //这个 Map 用来存储类属性和它们依赖的服务。例如，它记录了 Computer 类的 monitor 属性依赖于 Monitor 服务。
  bind<T>(key: string, creator: () => T) {
    if (!this.instances.has(key)) {
      this.instances.set(key, creator());
    }
  }
  resolve<T>(key: string): T {
    const instance = this.instances.get(key);

    for (let prop of this.properties) {
      debugger;
      let [key, ServiceKey] = prop;
      let [className, propName] = key.split("-");
      if (instance.constructor.name !== className) {
        continue;
      }
      instance[propName] = this.resolve(ServiceKey);
    }
    return this.instances.get(key);
  }
}
const container = new Container();

function Provide(key: string) {
  return (target: any) => {
    container.bind(key, () => new target());
  };
}

function Inject(injectKey: string) {
  return (target: object, key: string) => {
    container.properties.set(`${target.constructor.name}-${key}`, injectKey);
  };
}

@Provide("Monitor")
class Monitor27inch implements Monitor {}

@Provide("Host")
class AppHost implements Host {}

@Provide("Computer")
class Computer {
  @Inject("Monitor")
  monitor!: Monitor27inch;
  @Inject("Host")
  host!: AppHost;
  bootstrap() {
    console.log("启动电脑", this);
  }
}

const computer = container.resolve<Computer>("Computer");
computer.bootstrap();

export {};
