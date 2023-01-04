/**
 * @author meng
 * @version 1.0
 * @date 2022/11/24
 * @file  SEARCH组件
 */

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Form, Input } from 'antd';

// eslint-disable-next-line import/no-cycle
import { Project } from './list';
// eslint-disable-next-line import/no-cycle
import { UserSelect } from '@/components/userSelect/user-select';

//定义类型
export interface User {
    id: number;
    name: string;
    personId: number;
    email: string;
    title: string;
    organization: string;
    token: string;
}
interface SearchPanelProps {
    //通过utiltype和list组件中的类型保持一致
    param: Partial<Pick<Project, 'name' | 'personId'>>;

    setParam: (param: SearchPanelProps['param']) => void;
}

const SearchPanel = ({ param, setParam }: SearchPanelProps) => (
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
            <UserSelect
                defaultOptionName='负责人'
                value={param.personId}
                onChange={value =>
                    setParam({
                        ...param,
                        personId: value
                    })
                }
            />
        </Form.Item>
    </Form>
);

export default SearchPanel;
