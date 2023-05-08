
///**
// * @todo 插入前处理函数
// * @param list
// * @param from
// * @param to
// * 格式：JSON
//*/
//const insertBefore = (list, from, to) => {
//  const toItem = list[to];
//  const removedItem = list.splice(from, 1)[0];
//  const toIndex = list.indexOf(toItem);
//  list.splice(toIndex, 0, removedItem);
//  return list;
//};
///**
// * @todo 插入后处理函数
// * @param list
// * @param from
// * @param to
// * 格式：JSON
//*/
//const insertAfter = (list, from, to) => {
//  const toItem = list[to];
//  const removedItem = list.splice(from, 1)[0];
//  const toIndex = list.indexOf(toItem);
//  list.splice(toIndex + 1, 0, removedItem);
//  return list;
//};

////接收前瑞传递的参数
//const reorder = ({ fromId, type, referenceId }) => {
////获取数据
//const list=
//  const movingItemIndex = list.findIndex((item) => item.id === fromId);
//  if (!referenceId) {
//    insertAfter(list, movingItemIndex, list.length - 1);
//    this.persist();
//    return;
//  }
//  const targetIndex = list.findIndex((item) => item.id === referenceId);
//  const insert = type === "after" ? insertAfter : insertBefore;
//  insert(list, movingItemIndex, targetIndex);
//  persist();
//}
