function readFile(file) {

    let newList = [];
    let fileArray = [];
    fileArray.push(file);

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

                for (let item of fileArray){
                    findCommentatorName(item);
                }

                newList = [...userList].sort();
               // console.log('inside readFile ', newList);
            }
        }
        catch (e) {
            console.log('Error ... ', e);
        }

    return newList;
}
export default readFile;
