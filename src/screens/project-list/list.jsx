import React from 'react';

const List = ({ users, list }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {list.map(project => (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        {/* undefined.name */}
                        <td>
                            {users.find(user => user.id === project.personID)?.username || 'weizhi'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default List;
