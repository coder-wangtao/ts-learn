控制反转（Inversion of Control，IoC）
在传统的程序设计中，我们通常会在类内部直接创建依赖的对象（即 "控制" 对象的创建）。而在使用 控制反转 时，控制对象创建的责任从类本身转移到外部容器或框架（通常是一个 IoC 容器）。在这个容器中，我们会显式地配置类之间的依赖关系，并让容器负责创建和注入这些依赖项。

为什么这个例子是 IoC？
控制反转：Computer 类的构造函数需要一个 Monitor 和一个 Host 对象作为依赖项。在传统模式中，Computer 会直接创建这些依赖项（例如 new Monitor27inch()）。但是在这个例子中，这些依赖项是由外部的 Container 来提供的。也就是说，Container 负责管理和提供 Computer 所需要的依赖，而 Computer 自己并不关心如何创建这些依赖。

依赖注入：在容器中通过 bind 方法将依赖项（Monitor 和 Host）注册到容器中。然后，容器在 resolve 方法中为 Computer 提供这些依赖。这就是依赖注入的实现——Computer 类依赖的 Monitor 和 Host 对象并不是自己创建的，而是由容器提供的。

典型 IoC 容器的工作原理：
绑定依赖：通过 container.bind 方法，将类或接口与其具体实现关联起来。
解析依赖：通过 container.resolve 方法，容器根据之前的绑定来返回实际的对象实例。
依赖注入：在实例化 Computer 类时，容器将通过 resolve 方法自动注入其所需的 Monitor 和 Host 实例。

<!--
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
-->
