declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.module.scss' {
  const styles: { [key: string]: string };
  export default styles;
}
