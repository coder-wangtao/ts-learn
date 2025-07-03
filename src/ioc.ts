interface Monitor {}
interface Host {}
class Monitor27inch implements Monitor {}
class AppleHost implements Host {}

//ioc(控制反转)
class Computer {
  constructor(public monitor: Monitor, public host: Host) {}
  bootstrap() {
    console.log("启动电脑", this);
  }
}
let monitor = new Monitor27inch();
let host = new AppleHost();

class Container {
  private instances = new Map();
  bind<T>(key: string, creator: () => T) {
    if (!this.instances.has(key)) {
      this.instances.set(key, creator());
    }
  }
  resolve(key: string) {
    return this.instances.get(key);
  }
}
const container = new Container();
container.bind<Monitor>("Monitor", () => new Monitor27inch());
container.bind<Host>("Host", () => new AppleHost());

container.bind<Computer>(
  "Computer",
  () => new Computer(container.resolve("Monitor"), container.resolve("Host"))
);

const computer = container.resolve("Computer")
computer.bootstrap();
// class Computer {
//   public monitor = new Monitor27inch();
//   public host = new AppleHost();
//   bootstrap() {
//     console.log("启动电脑", this);
//   }
// }
