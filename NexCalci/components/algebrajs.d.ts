declare module 'algebra.js' {
  export class Expression {
    constructor(value?: any);
    toString(): string;
  }

  export class Equation {
    constructor(lhs: any, rhs: any);
    solveFor(variable: string): any;
    toString(): string;
  }

  export function parse(expr: string): any;
}
