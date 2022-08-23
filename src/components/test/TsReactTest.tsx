import { Button } from 'antd';

import { useArray } from '@/utils/hooks/useArray';
import { useMount } from '@/utils/hooks/useMount';

export const TsReactTest = () => {
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

    useMount(() => {
        console.log(value);
        //add({name:'meng'});
        //removeIndex('123');
    });
    return (
        <div>
            <div>
                <h1 style={{ marginLeft: '20px' }}>按钮</h1>
                <Button
                    style={{ margin: '20px' }}
                    type="primary"
                    onClick={() => add({ name: 'john', age: 22 })}
                >
                    add john
                </Button>
                <Button
                    style={{ margin: '20px' }}
                    type="primary"
                    onClick={() => removeIndex(0)}
                >
                    removeIndex
                </Button>
                <Button
                    style={{ margin: '20px' }}
                    type="primary"
                    onClick={() => clear()}
                >
                    clear
                </Button>
                {value.map((item: { name: string; age: number }, index: number) => (
                    <div
                        style={{ margin: '30px' }}
                        key={index}
                    >
                        <span>姓名：{item.name}</span>
                        <br />
                        <span>年龄：{item.age}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
