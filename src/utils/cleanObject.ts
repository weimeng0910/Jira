//首先写一个方法判断当前值为是undefined或者为null或者为空
export const isFalsy = (value: string) =>
  typeof value === 'undefined' || value === null || value === '' ? true : false;

//删除对象中值为空的所有属性
export const cleanObject = (object: object) => {
  //深拷贝传入的对象，防止引用后污然原有的对象属性
  // 注意用扩展运算符对数组或者对象进行拷贝时，只能扩展和深拷贝第一层的值，对于第二层极其以后的值，扩展运算符将不能对其进行打散扩展，也不能对其进行深拷贝，
  const result = { ...object };
  /**删除空值 */
  Object.keys(result).forEach(key => {
    const value = result[key];
    //调用方法来判断value值是不是为空，如果是空删除这个key所对应的值
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
