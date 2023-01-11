/**
 * @author meng
 * @version 1.0
 * @date 2022/11/24
 * Test
 */
import { Button } from 'antd';
<<<<<<< HEAD
=======
import { nanoid } from 'nanoid';
import { FC } from 'react';
>>>>>>> meng

import { useArray } from '@/utils/hooks/useArray';
import useEffectOnce from '@/utils/hooks/useMount';

<<<<<<< HEAD
export const TsReactTest = () => {
=======
export const TsReactTest: FC = () => {
>>>>>>> meng
    const persons: { name: string; age: number }[] = [
        {
            name: 'mengwei',
            age: 18
        },
        {
            name: 'yulan',
            age: 16
        }
    ];

    const { value, clear, removeIndex, add } = useArray(persons);

    useEffectOnce(() => {
        console.log(value);
<<<<<<< HEAD
=======
        //add({name:'meng'});
        //removeIndex('123');
>>>>>>> meng
    });
    return (
        <div>
            <div>
                <h1 style={{ marginLeft: '20px' }}>按钮</h1>
                <Button
<<<<<<< HEAD
                    style={{ marginLeft: '20px' }}
                    type="primary"
=======
                    style={{ margin: '20px' }}
                    type='primary'
>>>>>>> meng
                    onClick={() => add({ name: 'john', age: 22 })}
                >
                    add john
                </Button>
                <Button
<<<<<<< HEAD
                    style={{ marginLeft: '20px' }}
                    type="primary"
=======
                    style={{ margin: '20px' }}
                    type='primary'
>>>>>>> meng
                    onClick={() => removeIndex(0)}
                >
                    removeIndex
                </Button>
                <Button
<<<<<<< HEAD
                    style={{ marginLeft: '20px' }}
                    type="primary"
=======
                    style={{ margin: '20px' }}
                    type='primary'
>>>>>>> meng
                    onClick={() => clear()}
                >
                    clear
                </Button>
<<<<<<< HEAD
                {value.map((item: { name: string; age: number }, index: number) => (
                    <div key={index}>
=======
                {value.map((item: { name: string; age: number }) => (
                    <div
                        style={{ margin: '30px' }}
                        key={nanoid()}
                    >
>>>>>>> meng
                        <span>姓名：{item.name}</span>
                        <br />
                        <span>年龄：{item.age}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
