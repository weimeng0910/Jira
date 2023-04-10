import styled from '@emotion/styled';
import { Spin } from 'antd';

import { CreateDisplayBoard } from './createDisplayBoard';
import { DisplayBoardColumn } from './displayBoardColumn';
import { SearchPanel } from './searchPanel';
import { useDisplayBoardSearchParams, useProjectInUrl, useTasksSearchParams } from './util';
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
const ColumnsContainer = styled.div`
    display: flex;
    overflow: hidden;
    margin-right: 4rem;
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
        <ScreenContainer>
            <h1>{currentProject?.name}display</h1>
            <SearchPanel />
            {isLoading ? (
                <Spin size='large' />
            ) : (
                <ColumnsContainer>
                    {displayBoards?.map(board => (
                        <DisplayBoardColumn
                            displayBoard={board}
                            key={board.id}
                        />
                    ))}
                    <CreateDisplayBoard />
                </ColumnsContainer>
            )}
        </ScreenContainer>
    );
};
