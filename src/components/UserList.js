import React, {useState, useEffect} from 'react';

const UserList = ({file}) => {
    const [users, setUsers] = useState([]);
    let fileArray = [];
    fileArray.push(file);

    useEffect(() => {
        let userList = new Set();

        try{
            if(file){

                function findCommentatorName(item){
                    if(item.user){
                        userList.add(item.user);
                    }
                    if(item.hasOwnProperty('replies')){
                        item.replies.map(el => {
                            if(el.hasOwnProperty("replies")){
                                findCommentatorName(el);
                            }
                            if(el.user){
                                return userList.add(el.user);
                            }
                            return null;
                        });
                    }
                }

                fileArray.map(item => findCommentatorName(item));

                setUsers([...new Set(userList)].sort());
            }
        }
        catch (e) {
            console.log('Error ... ', e);
        }
    }, [file]);

    function handleClickRemove(user) {
        setUsers(users.filter(item => item !== user));
     }

    return(
        <div className="user-list-container">
            <ul>
                { (users.length === 0) && <p>Список пуст!</p> }

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