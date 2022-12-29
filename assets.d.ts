declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

//declare a module to your type definitions files *.d.ts
// interface ResponsiveImageOutput {
//   src: string;
//   srcSet: string;
//   placeholder: string | undefined;
//   images: { path: string; width: number; height: number }[];
//   width: number;
//   height: number;
//   toString: () => string;
// }

// declare module '*!rl' {
//   const src: ResponsiveImageOutput;
//   export default src;
// }
