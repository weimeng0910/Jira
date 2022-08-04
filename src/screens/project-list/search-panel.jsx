import React from 'react';

export default function SearchPanel({ param, setParam, users }) {
    //input输入框触发函数
    function handleChangeInput(evt) {
        console.log(evt.target.value);
        //Object.assign()基本用法： Object.assign方法用来将源对象（source）的所有可枚举属性，
        //复制到目标对象（target）。 它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象
        //  setParam(Object.assign({},param,{name:evt.target.value}))
        setParam({
            ...param, //解构对象
            name: evt.target.value //重新为对象中的属性赋值
        });
    }
    //handleChangeSelect
    const handleChangeSelect = evt => {
        setParam({
            ...param,
            personId: evt.target.value
        });
    };
    return (
        <form>
            <div>
                <input type="text" value={param.name} onChange={handleChangeInput} />
                <select value={param.personId} onChange={handleChangeSelect}>
                    <option value={''}>负责人</option>
                    {/* 遍历读取用户列表数据 */}
                    {users.map(user => {
                        return (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </form>
    );
}
