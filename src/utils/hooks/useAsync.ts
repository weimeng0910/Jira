/**
 * @author meng
 * @version 1.0
 * @date 2022/11/28
 * 创建一个自定义hook，用于处理所有异步数据获取和更新状态。
 * 防止组件乱七八糟地使用useState调用以跟踪异步函数的状态
 */
import { useState } from 'react';

//定义一个类型，返回的值可能是 value error status status prop 是：“idle”，“pending”，“success”，“error”。
interface State<T> {
  error: Error | null;
  data: T | null;
  //代表四个状态，异步未发生，加载，错误，成功
  status: 'idle' | 'loading' | 'error' | 'success'
}
//默认的state，异步还未发生
const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null
};
//initialState是传入的state，优先级高于莫认的状态
export const useAsync = <T>(initialState?: State<T>) => {

  const [state, setState] = useState<State<T>>({

    ...defaultInitialState,

    ...initialState
  });
  //定义设置数据的方法，调用这个方法时候，说明请求成功，返回数据data
  const setData = (data: T) => setState({
    data,
    status: 'success',
    error: null
  });
  //设置错误的方法，请求完成后发生错误，调用这个方法
  const setError = (error: Error) => setState({
    error,
    status: 'error',
    data: null

  });
  //run 用来触发异步请求的方法，设置hook的消费者传入的异步
  const run = (promise: Promise<T>) => {
    //如果没有传入promise或者没有then，就表示传入的不是异步函数
    if (!promise || !promise.then) {
      throw new Error('请传入promise类型数据');
    }
    setState({ ...state, status: 'loading' });
    return promise
      .then(data => {
        setData(data);
        return data;
      })
      // catch 会消化异常导致不再抛出，如果不主动抛出，外面是接收不到异常的
      .catch(error => {
        setError(error);
        //return error;
        // eslint-disable-next-line promise/no-return-wrap, unicorn/no-useless-promise-resolve-reject
        return Promise.reject(error);
      });
  };
  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    ...state
  };
};
