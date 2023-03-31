import styled from '@emotion/styled';

import { DisplayBoardColumn } from './displayBoardColumn';
import { SearchPanel } from './searchPanel';
import { useProjectInUrl } from './util';
import { useDisplayBoard } from '@/utils/hooks/displayBoard';
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
    const { data: displayBoards } = useDisplayBoard();

    return (
        <div>
            <h1>{currentProject?.name}display</h1>
            <SearchPanel />
            <ColumnsContainer>
                {displayBoards?.map(board => (
                    <DisplayBoardColumn
                        displayBoard={board}
                        key={board.id}
                    />
                ))}
            </ColumnsContainer>
        </div>
    );
};
