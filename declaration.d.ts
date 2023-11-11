declare module '*css' {
  const css: { [key: string]: string };
  export default css;
}

declare module '*.webp';
declare module '*.png' {
  const value: any;
  export default value;
}
declare module '*.jpg' {
  const value: any;
  export default value;
}
declare module '*.jpeg' {
  const value: any;
  export default value;
}