type A = {
  name: string;
  address: number;
  male: boolean;
};

type B = {
  name: string;
  address: number;
};

//交集
type ObjectInter<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U>
>;

type r1 = ObjectInter<A, B>;

//差集
type ObjectDiff<T extends object, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;

type r2 = ObjectDiff<A, B>;

//补集 补集就是差集，要求有父子关系
type ObjectCom<T extends object, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;

type r3 = ObjectCom<B, A>;

//重写 已后面的类型为准，再加上以前比现在多的类型,有后面存在的类型，覆盖掉之前的类型，之前多的还是要保留的

type Overwrite<T extends object, U extends object> = ObjectInter<U, T> &
  ObjectDiff<T, U>;

type r4 = Computed<Overwrite<A, B>>;
