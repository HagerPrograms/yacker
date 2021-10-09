export default function Post(props) {
    let media = (<></>);
    
    console.log(props.file);
    
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

    const threadActions = (props.loggedIn !== '')? (<>
            <div className="action-bar">    
                <h4 className="post-author">{props.author}</h4>
                <a className="thread-actions">(Ban user and close thread)</a>
                <a className="thread-actions">(Close thread)</a>
                <a className="thread-actions">(Report thread)</a>
            </div>
    </>):(<>
            <div className="action-bar">
                <a className="thread-actions">(Report thread)</a>
            </div>
    </>) 

    return ( 
        <>
            <div className="post-header">
                <h3 className="post-content">{props.content}</h3>

                <h4 className="post-created">{"Post created on: " + props.created_on.toLocaleString()}</h4>
                <h4 className="post-updated">{"Last reply: " + props.last_reply.toLocaleString()}</h4>
                <div className="id-wrapper">
                    <h4 className="post-id">{"Post ID: " + props.id}</h4>
                </div>
                {threadActions}
            </div>
            
            <div className="media-container">
            {media}
            </div>
        </>
    )
}