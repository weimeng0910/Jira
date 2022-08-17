/// <reference types="react" />
export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
}
interface SearchPanelProps {
    param: {
        name: string;
        personId: string;
    };
    users: User[];
    setParam: (param: SearchPanelProps['param']) => void;
}
export default function SearchPanel({ param, setParam, users }: SearchPanelProps): JSX.Element;
export {};
