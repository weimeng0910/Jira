import { DisplayBoard } from '@/types/displayBoard';
import { useTasks } from '@/utils/hooks/task';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/03/20
 * @file DisplayBoard看板页面的每一个task列表
 */

export const DisplayBoardColumn = ({ displayBoard }: { displayBoard: DisplayBoard }) => {
    const { data: allTasks } = useTasks();
    const tasks = allTasks?.filter(task => task.displayBoardId === displayBoard.id);
    console.log(tasks, '003');

    return (
        <div>
            <h3>{displayBoard.name}</h3>
            {tasks?.map(task => (
                <div key={task.id}>{task.name}</div>
            ))}
        </div>
    );
};
