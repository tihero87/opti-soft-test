import React, { useState, useEffect } from 'react';
import UserList from "./UserList";
import readFile from "../readFile";

const DropArea = () => {
    const [classArea, setClassArea] = useState('drop-area');
    const [classH2, setClassH2] = useState('');
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        let text = [];
        if(file !== null){
            text = readFile(file);
            setUserList(text);
        }
    },[file]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClassArea('drop-area');
        setClassH2('hide');

        let files = e.dataTransfer.files;

        if(files[0].type === 'application/json'){
            setFileName(files[0].name);
            let reader = new FileReader();

            reader.onload = function (event) {
                setFile(JSON.parse(event.target.result));
            };

            reader.readAsText(files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClassArea('drop-area over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClassArea('drop-area');
    };

    return(
        <div className="drop-area-container">
            <h1>{fileName}</h1>
            <div className={classArea}
                 onDragEnter={handleDragEnter}
                 onDrop={handleDrop}
                 onDragOver={handleDragOver}
                 onDragLeave={handleDragLeave}
            >
                <h2 className={classH2}>drop here</h2>

               { fileName && <UserList nameList={userList} /> }

            </div>
        </div>
    )
};
export default DropArea;