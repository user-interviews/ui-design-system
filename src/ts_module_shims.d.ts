declare module '*.module.scss';
declare module '*.module.css';
declare module '*.png';

// types/mdx.d.ts
declare module '*.mdx' {
  const MDXComponent: (props) => React.JSX;
  export default MDXComponent;
}
