import styled from '@emotion/styled';
import { Spin } from 'antd';
import { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { CreateDisplayBoard } from './createDisplayBoard';
import { DisplayBoardColumn } from './displayBoardColumn';
import { SearchPanel } from './searchPanel';
import { TaskModal } from './taskModal';
import {
    useDisplayBoardSearchParams,
    useProjectInUrl,
    useTasksSearchParams,
    useDisplayBoardQueryKey
} from './util';
import { Drag, Drop, DropChild } from '@/components/dragAndDrop';
import { ScreenContainer } from '@/components/lib/lib';
import { useDisplayBoard, useReorderDisplayBoard } from '@/utils/hooks/displayBoard';
import { useTasks } from '@/utils/hooks/task';
import { useDocumentTitle } from '@/utils/hooks/useDocumentTitle';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/03/20
 * @file DisplayBoar看板页面
 */
//样式
const ColumnsContainer = styled('div')`
    display: flex;
    overflow-x: scroll;
    flex: 1;
`;
//拖拽的hook
export const useDragEnd = () => {
    //获取看板的列表数据
    const { data: displayBoards } = useDisplayBoard(useDisplayBoardSearchParams());
    const { mutate: reorderDisplayBoard } = useReorderDisplayBoard(useDisplayBoardQueryKey());
    // eslint-disable-next-line consistent-return
    return useCallback(
        // eslint-disable-next-line consistent-return
        ({ source, destination, type }: DropResult) => {
            //*如果没有拖动直接结束
            //如果没有destination，没有什么需要做，我们可以直接退出。
            if (!destination) {
                return false;
            }
            // 看板排序
            if (type === 'COLUMN') {
                const fromId = displayBoards?.[source.index].id;
                const toId = displayBoards?.[destination.index].id;
                if (!fromId || !toId || fromId === toId) {
                    return false;
                }
                const newType = destination.index > source.index ? 'after' : 'before';
                reorderDisplayBoard({ fromId, referenceId: toId, type: newType });
            }
        },
        [displayBoards, reorderDisplayBoard]
    );
};
//看板组件
export const DisplayBoardScreen = () => {
    useDocumentTitle('看板列表');
    //通过ID来获取相应的project
    const { data: currentProject } = useProjectInUrl();
    //获得所有看板列表
    const { data: displayBoards, isLoading: displayBoardLoding } = useDisplayBoard(
        useDisplayBoardSearchParams()
    );
    const { isLoading: tasksLoading } = useTasks(useTasksSearchParams());

    const isLoading = tasksLoading || displayBoardLoding;
    const onDragEnd = useDragEnd();
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ScreenContainer>
                <h1>{currentProject?.name}display</h1>
                <SearchPanel />
                {isLoading ? (
                    <Spin size='large' />
                ) : (
                    <ColumnsContainer>
                        <Drop
                            type='COLUMN'
                            direction='horizontal'
                            droppableId='displayBoard'
                        >
                            <DropChild style={{ display: 'flex' }}>
                                {displayBoards?.map((board, index) => (
                                    <Drag
                                        key={board.id}
                                        draggableId={`board${board.id}`}
                                        index={index}
                                    >
                                        <DisplayBoardColumn
                                            displayBoard={board}
                                            key={board.id}
                                        />
                                    </Drag>
                                ))}
                            </DropChild>
                        </Drop>
                        <CreateDisplayBoard />
                    </ColumnsContainer>
                )}
                <TaskModal />
            </ScreenContainer>
        </DragDropContext>
    );
};
