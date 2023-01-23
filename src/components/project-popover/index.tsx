import styled from '@emotion/styled';
import { Popover, Typography, List, Divider } from 'antd';

import { ButtonNoPadding } from '@/components/lib/lib';
//定义类型
import { Project } from '@/types/user';
import { useProjects } from '@/utils/hooks/project';

//样式
const ContentContainer = styled.div`
    min-width: 30rem;
`;
export const ProjectPopover = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
    //获取projects数据
    const { data: projects } = useProjects();
    //获得pin收藏项目数据
    const pinnedProjects = projects?.filter((project: Project) => project.pin);

    //Popover组件的内容
    const content = (
        <ContentContainer>
            <Typography.Text type='secondary'>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map(project => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))}
            </List>
            <Divider />
            <ButtonNoPadding
                type='link'
                onClick={() => props.setProjectModalOpen(true)}
            >
                创建项目
            </ButtonNoPadding>
        </ContentContainer>
    );
    return (
        <Popover
            placement='bottom'
            content={content}
        >
            <span>项目</span>
        </Popover>
    );
};
