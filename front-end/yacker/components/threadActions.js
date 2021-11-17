import {useState} from 'react';
import Popup from './Popup';
import cookie from 'js-cookie';

export default function postActions(props) {

    const [reported, setReported] = useState(false);
    const [banned, setBanned] = useState(()=>false);

    function reportedHandler() {
        setReported((r)=>!r);
    }
    console.log("SCHOOL: ", props.school);

    function banHandler(){
        setBanned((b)=>true);
        banUser(props.author);
        closePost(postID, ((props.school === undefined)? false : true))
    }
    
    function closeHandler(){
        closePost(postID, ((props.school)? false : true))
    }

    const closeButton = <p onClick={reportedHandler} className="close-report">X</p>
    const reportForm = (reported === true)? <Popup reply={false} close_button={closeButton} id={props.post}/> : <></>; 
    const postID = props.post;

    return (props.loggedIn !== false)? 
    (<>
        <div className="action-bar">    
            <h4 className="post-author">{props.author}</h4>
            <a onClick={banHandler} className="thread-actions">(Ban user and close thread)</a>
            <a onClick={closeHandler} className="thread-actions">(Close thread)</a>
        </div>
    </>)
        :
    (<>
        <div className="action-bar">
            <a value={reported} onClick={reportedHandler} className="thread-actions">(Report thread)</a>
            {reportForm}
        </div>
    </>);
}

async function banUser(ip){
    
    const auth = cookie.get("logintoken");

    const banQuery = {
        query: `
            mutation{
                banUser(ip: "${ip}")
            }
        `}

    const ban = await fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(banQuery)
        })
}

async function closePost(postID, post){

    const auth = cookie.get("logintoken");
    
    const closeQuery = (post)? 
        {query:
    `
            mutation{
                closePost(postID: ${postID})
            }
    `} : 
        {query: `
            mutation{
                closeReply(replyID: ${postID})
            }
    `} 

    console.log(closeQuery)

    const ban = await fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(closeQuery),
        })
}