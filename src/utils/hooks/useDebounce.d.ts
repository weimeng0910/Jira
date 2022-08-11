export default function useDebounce<T>(value: T, delay?: number): T;
/**
 * 注意，自定义hook一定是在他的内部需要使用别的hook，不需要别的hook就定义成函数就可以
*/
