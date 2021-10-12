import { query } from 'express';
import { graphql } from 'graphql';
import {useState} from 'react';
import Popup from './Popup';

export default function postActions(props) {
    
    const [reported, setReported] = useState(false);
    const [banned, setBanned] = useState(()=>false);
    
    console.log("postActions Props: ", props)

    function reportedHandler() {
        setReported((r)=>!r);
    }
    function banHandler(){
        setBanned((b)=>true);
        banUser(props.author);
    }
    
    function closeHandler(){
        console.log(`post: ${props.post} is closed!`)
    }


    const closeButton = <p onClick={reportedHandler} className="close-report">X</p>
    const reportForm = (reported === true)? <Popup close_button={closeButton} id={props.post}/> : <></>; 
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
    
    const banQuery = {
        query: `
            mutation{
                banUser(ip: "${ip}")
            }
        `}

    const ban = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(banQuery)
        })
}

async function closePost(postID, post){
    
    // const closeQuery = (post)? 
    // {query:
    //     `
    //         mutation{
    //             closeThread(postID: "${postID}")
    //         }
    // `} : 
    // {query: `
    //         mutation{
    //             closeReply(replyID: "${postID}")
    //         }
    // `} 

    // const ban = await fetch('http://localhost:4000/graphql', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(closeQuery),
    //     })
}