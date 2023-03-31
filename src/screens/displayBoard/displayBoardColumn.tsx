import styled from '@emotion/styled';
import { Card } from 'antd';

import bugIcon from '@/assets/bug.svg';
import taskIcon from '@/assets/task.svg';
import { useTasksSearchParams } from '@/screens/displayBoard/util';
import { DisplayBoard } from '@/types/displayBoard';
//import { TaskType } from '@/types/taskType';
import { useTasks } from '@/utils/hooks/task';
import { useTaskTypes } from '@/utils/hooks/taskType';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/03/20
 * @file DisplayBoard看板页面的每一个task列表
 */
//外部容器样式
export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar {
        display: none;
    }
`;
//新建组件来获取taskType的列表，然后根据ID来渲染对应的图片
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find(taskType => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return (
        <img
            alt=''
            src={name === 'task' ? taskIcon : bugIcon}
        />
    );
};
//看板的数据呈现
export const DisplayBoardColumn = ({ displayBoard }: { displayBoard: DisplayBoard }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter(task => task.displayBoardId === displayBoard.id);

    return (
        <Container>
            <h3>{displayBoard.name}</h3>
            <TasksContainer>
                {tasks?.map(task => (
                    <Card
                        style={{ marginBottom: '0.5rem' }}
                        key={task.id}
                    >
                        <div>{task.name}</div>

                        <TaskTypeIcon id={task.typeId} />
                    </Card>
                ))}
            </TasksContainer>
        </Container>
    );
};
