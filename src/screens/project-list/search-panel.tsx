import { Form, Input, Select } from 'antd';

//import { SyntheticEvent } from 'react';

//定义类型
export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
}
interface SearchPanelProps {
    param: {
        name: string;
        personId: string;
    };
    users: User[];
    setParam: (param: SearchPanelProps['param']) => void;
}

const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => (
    <Form>
        <Form.Item>
            <Input
                type='text'
                value={param.name}
                onChange={evt =>
                    setParam({
                        ...param,
                        name: evt.target.value
                    })
                }
            />
        </Form.Item>
        <Form.Item>
            <Select
                value={param.personId}
                onChange={value =>
                    setParam({
                        ...param,
                        personId: value
                    })
                }
            >
                <Select.Option value=''>负责人</Select.Option>
                {/* 遍历读取用户列表数据 */}
                {users.map(user => (
                    <Select.Option
                        key={user.id}
                        value={user.id}
                    >
                        {user.name}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    </Form>
);

export default SearchPanel;
