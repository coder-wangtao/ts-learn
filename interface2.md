1.type 和 interface 的区别
1.1 如果只是用来描述结构，我们采用 interface。(比如说一个对象，type 主要是声明一个类型)
1.2 如果涉及到联合类型，则只能使用 type 来进行声明。
1.3 type 不能扩展，interface 是可以扩展。
1.4 type 不能重名，interface 重名可以合并。
1.5 type 可以使用循环和条件，interface 不行。
1.6 其他情况无所谓，可以互换（函数类型一般采用 type 来声名）

//可以用接口描述混合类型

<!-- interface Ifn {
        (): number;  //函数
        count: number;  //属性
    }
    const click: Ifn = () => {
        return click.count++;
    };
    click.count = 0;
-->

//一般情况下,使用接口大概率都是描述对象了。接口中声名的都是抽象的，而且必须要实现。

如何解决多的属性后，让 tomato 可以赋予给 IVeg？

<!-- interface IVeg {
        color: string;
        size: number;
     }
    const tomato: IVeg = {
        color: "red",
        size: 10,
        a: 1,
    };
-->

[1].如果对象中的属性多余接口可以直接采用断言的方式来赋值
const tomato: IVeg = {
//color: "red",
//size: 10,
//a: 1,
} as IVeg;
[2].可以基于接口的特性写一个同名的接口
interface IVeg {
//a: number,
}
[3].产生一个新类型，通过继承原有属性的方式
interface IV extends IVeg{
a?:string
}
[4].通过任意类型来扩展
interface IVeg {
//color: string;
//size: number;
//[key:string]:any //key 是任意类型，key 的类型是字符串时，可以赋予 number,string,symbol，value 也是任意类型
}

//通过 keyof 获取 key 的集合，通过索引操作符获取值的集合
interface ICar {
color: string;
size: number;
}

type key = keyof ICar; //'color' | 'size'
type value = ICar[key]; //string | number

keyof 是取 key
typeof 是取类型
[]是索引查询
in 是循环
extends 是条件
