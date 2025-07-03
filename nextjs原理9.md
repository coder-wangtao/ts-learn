<!--
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
    export {};
-->
