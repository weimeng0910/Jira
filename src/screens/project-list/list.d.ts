import { User } from '@/screens/project-list/search-panel';
interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
}
interface ListProps {
    list: Project[];
    users: User[];
}
declare const List: ({ users, list }: ListProps) => JSX.Element;
export default List;
