import {useState} from 'react';
import Popup from './Popup';
import cookie from 'js-cookie';

export default function ReplyActions(props){
    
    const [reported, setReported] = useState(false);
    const [banned, setBanned] = useState(()=>false);

    const replyID = props.id;
    
    function reportedHandler() {
        setReported((r)=>!r);
    }
    function banHandler(){
        setBanned((b)=>true);
        banUser(props.author);
        closePost(replyID)
    }
    
    function closeHandler(){
        closePost(replyID)
    }

    const closeButton = <p onClick={reportedHandler} className="close-report">X</p>
    const reportForm = (reported === true)? <Popup content={props.content} reply={true} close_button={closeButton} id={props.id}/> : <></>; 


    return (props.isAuth)?
    (
        <>
        <p className="author">{props.author}</p>
        <a onClick={banHandler}className="thread-actions">(Ban user and delete reply.)</a>
        <a onClick={closeHandler} className="thread-actions">(Delete reply.)</a>
        </>
    ):
    <>
        <a onClick={reportedHandler} className="thread-actions report">(Report reply.)</a>
        {reportForm}
    </>
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

async function closePost(postID){

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

    const ban = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(closeQuery),
        })
}