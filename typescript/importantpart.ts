import { Numeric } from "Misc/BuiltInObject";

interface FirstType {
  id: number;
  firstName: string;
  lastName: string;
}

interface SecondType {
  id: number;
  address: string;
  city: string;
}

type ExcludeType = Exclude<keyof FirstType, keyof SecondType>;

// Output; "firstName" | "lastName"

type X =
  | {
      x: string;
      z: string;
    }
  | boolean;

type XAble<T> = T extends X ? true : false;

interface T1 {
  x: string;
  y: string;
}

type T2 =
  | {
      x: string;
      y: string;
      // z:string;
    }
  | boolean;

type XInterface1 = XAble<T1>;
type XInterface2 = XAble<T2>;

const x2: X = {
  x: "",
  z: "1",
};

type Diff<T1, T2> = T1 extends T2 ? never : T1;
type Filter<T1, T2> = T1 extends Diff<T1, T2> ? never : T1;

type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">; // => "b" | "d"
// <"a" | "b" | "c" | "d", "a" | "c" | "f">
// 相当于
// <'a', "a" | "c" | "f"> |
// <'b', "a" | "c" | "f"> |
// <'c', "a" | "c" | "f"> |
// <'d', "a" | "c" | "f">
type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">; // => "a" | "c"
// <"a" | "b" | "c" | "d", "a" | "c" | "f"> 同上

type Obj<T> = T extends { a: infer V; b: infer V } ? V : false;

let obj1: Obj<string>; // => number
let obj2: Obj<true>; // => number
let obj3: Obj<{ a: number; b: number }>; // => number
let obj4: Obj<{ a: number; b: () => void }>; // => number | () => void

type F1 = () => number;

type MyReturnType<T> = T extends () => infer E ? E : never;

type F2 = MyReturnType<F1>;
