declare module 'worker-loader!*' {
  const content: any;
  export = content;
}
declare module 'file-loader?name=[name].js!*' {
  const value: string;
  export = value;
}
