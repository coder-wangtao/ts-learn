//1.Repeat
type Repeat<T, C extends number, F extends any[] = []> = C extends F["length"]
  ? F
  : Repeat<T, C, [...F, T]>;

type A = Repeat<number, 3>;
type B = Repeat<string, 2>;
type C = Repeat<1, 1>;
type D = Repeat<0, 0>;

//2.Filter
type Filter<T extends any[], U, F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? Filter<R, U, L & {} extends U ? [...F, L] : F>
  : F;

type E = Filter<[1, "BFE", 2, true, "dev"], number>;
type F = Filter<[1, "BFE", 2, true, "dev"], string>;

//3.FindIndex
type IsEqual<T, U, Success, Fail> = [T] extends [U]
  ? [U] extends [T]
    ? keyof T extends keyof U
      ? keyof U extends keyof any
        ? Success
        : Fail
      : Fail
    : Fail
  : Fail;

export type FindIndex<T extends any[], E, F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? IsEqual<L, E, F["length"], FindIndex<R, E, [...F, L]>>
  : never;

type G = [any, never, 1, "2", true];
type H = FindIndex<G, 1>;
type I = FindIndex<G, true>;

export {};
