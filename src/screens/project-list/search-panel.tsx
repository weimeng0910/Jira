/**
 * @author meng
 * @version 1.0
 * @date 2022/11/24
 * SEARCH
 */

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Form, Input, Select } from 'antd';

//定义类型
export interface User {
    id: number | string;
    name: string;
    email?: string;
    title?: string;
    organization?: string;
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
    //layout='inline'是水平排列
    <Form
        css={css({ padding: '2rem' })}
        layout='inline'
    >
        <Form.Item>
            <Input
                placeholder='项目名'
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
