declare module "mitt" {
  type PType = string | number | symbol;
  type Listener = (...args: any[]) => void;
  const on: (type: PType, listener: Listener) => this;
  const emit: (type: PType, ...args: any[]) => this;
}

declare module "*.jpg" {
  const str: string;
  export default str;
}

declare const $: {
  (val: string): $;
  fn: $;
  ajax(url: string, options: object): void;
};
