import styled from '@emotion/styled';
import { Spin } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';

import { CreateDisplayBoard } from './createDisplayBoard';
import { DisplayBoardColumn } from './displayBoardColumn';
import { SearchPanel } from './searchPanel';
import { TaskModal } from './taskModal';
import { useDisplayBoardSearchParams, useProjectInUrl, useTasksSearchParams } from './util';
import { Drag, Drop, DropChild } from '@/components/dragAndDrop';
import { ScreenContainer } from '@/components/lib/lib';
import { useDisplayBoard } from '@/utils/hooks/displayBoard';
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

    return (
        <DragDropContext
            onDragEnd={() => {
                console.log('111');
            }}
        >
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
