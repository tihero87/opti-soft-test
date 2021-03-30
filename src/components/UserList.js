import React, { useState, useEffect } from 'react';

const UserList = ({ nameList }) => {

    const [users, setUsers] = useState(nameList);

    useEffect(() => {
        setUsers(nameList)
    },[nameList]);

    function handleClickRemove(user) {
        setUsers(users.filter(item => item !== user));
     }

    return(
        <div className="user-list-container">
            <ul>
                { users.length === 0 && "Список пуст!" }

                { users.length > 0 && users.map(user => {

                        return  <li key={user}>
                                    { user }
                                    <div className="user-remove" onClick={() => handleClickRemove(user)}>
                                        &times;
                                    </div>
                                </li>
                        })
                }
            </ul>
        </div>
    )
};
export default UserList;