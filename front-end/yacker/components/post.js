import { useState } from "react";
export default function Post(props) {
    let media = (<></>);

    const [report, setReport] = useState(false);

    function reportHandler(event){
        setReport((e) => !e)
    }

    const reply = (props.school === undefined)

    if(props.file !== null){
        media = <></>;
        if(props.file.includes("gif") || props.file.includes("jpg") || props.file.includes("jpeg") || props.file.includes("png")){
            media = (
                <img key={props.id} alt={props.content} src={`http://yacker.co:4000${props.file}`}/>
            )
        } else {
            media = (
            <video controls>
                <source src={`http://yacker.co:4000${props.file}`}/>
            </video>
            )
        }
    }

    const type = (props.school)? 'Post' : 'Reply';

    return ( 
        <>
            <div className="post-header">
                <h3 className="post-content">{props.content}</h3>
                <h4 className="post-created">{`${type} created on: ` + props.created_on.toLocaleString()}</h4>
                <h4 className="post-updated">{"Last reply: " + props.last_reply.toLocaleString()}</h4>
                <div className="id-wrapper">
                    <h4 className="post-id">{`${type} ID: ` + props.id}</h4>
                </div>
            </div>
            <div className="media-container">
            {media}
            </div>
            
        </>
    )
}
