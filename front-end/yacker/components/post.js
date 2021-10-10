import { useState } from "react";
import Popup from '../components/Popup';
export default function Post(props) {
    let media = (<></>);

    const [report, setReport] = useState(false);

    function reportHandler(event){
        setReport((e) => !e)
    }

    if(props.file.includes("gif") || props.file.includes("jpg") || props.file.includes("jpeg") || props.file.includes("png")){
        media = (
            <img key={props.id} src={`http://localhost:4000${props.file}`}/>
        )
    } else {
        media = (
        <video controls>
            <source src={`http://localhost:4000${props.file}`}/>
        </video>
        )
    }

    return ( 
        <>
            <div className="post-header">
                <h3 className="post-content">{props.content}</h3>
                <h4 className="post-created">{"Post created on: " + props.created_on.toLocaleString()}</h4>
                <h4 className="post-updated">{"Last reply: " + props.last_reply.toLocaleString()}</h4>
                <div className="id-wrapper">
                    <h4 className="post-id">{"Post ID: " + props.id}</h4>
                </div>
            </div>
            <div className="media-container">
            {media}
            </div>
            
        </>
    )
}