
export default function Reply(props){
    // (props.media)
    let media = props.file_path;
    
    if(media === null){
        media = (<>
        </>)
    }
    else if(media.includes("gif") || media.includes("jpg") || media.includes("jpeg") || media.includes("png")){
        media = 
        <div className="reply-media">
            <img src={"http://localhost:4000" + media}></img>
        </div>
    }
    else{
        media =
        <div className="reply-media">
            <video controls src={"http://localhost:4000" + media}></video>
        </div>
    }

    const created_on = new Date(props.created_on).toLocaleString();


    return (
        <div className="reply-box">
            <div>
                <div className="reply-header">
                    <p className="date">{created_on}</p>
                    <p className="author">{props.author}</p>
                    <a className="thread-actions">(Ban user and delete reply.)</a>
                    <a className="thread-actions">(Delete reply.)</a>
                    <a className="thread-actions report">(Report reply.)</a>
                </div>
                {media}
                <p className="reply-content">{props.content}</p>

            </div>
        </div>
    )
}