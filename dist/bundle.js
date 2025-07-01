(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    function fn(callback) {
        let child = new Child();
        let ins = callback(child);
        return ins;
    }
    class Parent {
        house() { }
    }
    class Child extends Parent {
        car() { }
    }
    fn((instance) => {
        instance.house();
        return new Child();
    });
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
    function MyPropertyDecorator(target, propertyKey) {
        console.log(`${target.toString()} Property ${String(propertyKey)} is being decorated!`);
    }
    class MyClass {
        constructor(myProperty) {
            this.myProperty = myProperty;
        }
    }
    __decorate([
        MyPropertyDecorator
    ], MyClass.prototype, "myProperty", void 0);
    function valToUpper(target, property, descriptor) {
        let originalSet = descriptor.set;
        let originalGet = descriptor.get;
        descriptor.set = function (newValue) {
            return originalSet.call(this, newValue.toUpperCase());
        };
        descriptor.get = function () {
            return originalGet.call(this) + "123";
        };
    }
    class Animal {
        get val() {
            return this._val;
        }
        set val(newValue) {
            this._val = newValue;
        }
    }
    __decorate([
        valToUpper
    ], Animal.prototype, "val", null);
    const animal = new Animal();
    animal.val = "abc";
    console.log(animal.val);
    // class Animal {
    //   @ToUpper(true)
    //   public name: string = "animal";
    // }

})();
//# sourceMappingURL=bundle.js.map
