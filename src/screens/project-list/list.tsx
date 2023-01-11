/**
 * @author meng
 * @version 1.0
 * @date 2022/11/24
 * @file LIST组件
 */
// 外部依赖
import { Table, TableProps } from 'antd';
//import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { Pin } from '@/components/pin/pin';
//定义类型
import { Project, User } from '@/types/user';
import { useEditProject } from '@/utils/hooks/project';

//这个类型包含了TableProps中的所有属性，和users这个属性
interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void;
}
//type PropsType = Omit<ListProps,'users'>//...props的类型
//父组件传过来的{ users, ...props }这个props,里面包含了所有的TableProps
//还有users这个数据，先把users取出来，把loading等其它属性放在...props中
const List = ({ users, ...props }: ListProps) => {
    //这个纯函数mutate解构出来，可以在jsx中调用纯函数
    const { mutate } = useEditProject();
    //函数currying柯理化
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh);
    return (
        <Table
            pagination={false}
            columns={[
                {
                    //因为checed={true},所以这里简写
                    title: (
                        <Pin
                            checked
                            disabled
                        />
                    ),
                    render: (_value, project) => (
                        <Pin
                            checked={project.pin}
                            onCheckedChange={pinProject(project.id)}
                        />
                    )
                },
                {
                    title: '名称',
                    //dataIndex: 'name',
                    //localeCompare排序中文字符
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render: (_value, project) => (
                        <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
                    )
                },
                {
                    title: '部门',
                    dataIndex: 'organization'
                },
                {
                    title: '负责人',

                    render: (_value, project) => (
                        <span>
                            {users.find(user => user.id === project.personId)?.name || '未知'}
                        </span>
                    )
                },
                {
                    title: '创建时间',
                    dataIndex: 'created',
                    render: (_value, project) => (
                        <span>
                            {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '未知'}
                        </span>
                    )
                }
            ]}
            //type PropsType = Omit<ListProps,'users'>//...props的类型
            {...props}
            //设置唯一的key
            rowKey={project => project.id!}
        />
    );
};

export default List;
