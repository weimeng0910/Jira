import { nanoid } from 'nanoid';

import { useProjectInUrl } from './util';
import { useDisplayBoard } from '@/utils/hooks/displayBoard';
import { useDocumentTitle } from '@/utils/hooks/useDocumentTitle';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/03/20
 * @file DisplayBoar看板页面
 */
export const DisplayBoardScreen = () => {
    useDocumentTitle('看板列表');
    const { data: currentProject } = useProjectInUrl();
    const { data: displayBoards } = useDisplayBoard();

    return (
        <div>
            <h1>{currentProject?.name}display</h1>

            {displayBoards?.map(board => (
                <div key={nanoid()}>{board.name}</div>
            ))}
        </div>
    );
};
