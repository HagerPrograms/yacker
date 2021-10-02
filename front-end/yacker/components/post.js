export default function Post (props) {
return ( 
    <>
    <div className="post">
        
        <div className="post-header">
            <h4 className="post-author">{props.author}</h4>
            <a className="thread-actions">(Ban user and close thread)</a>
            <a className="thread-actions">(Close thread)</a>
            <h3 className="post-content">{props.content}</h3>
            <h4 className="post-created">{"Post created on: " + props.created_on.toLocaleString()}</h4>
            <h4 className="post-updated">{"Last reply: " + props.last_reply.toLocaleString()}</h4>
            <div className="id-wrapper">
                <h4 className="post-id">{"Post ID: " + props.id}</h4>
            </div>
        </div>

        <img key={props.id} src="https://i.imgur.com/MUZrItF.jpg"/>
        
        <div className="reply-form-wrapper">
            <h4 className="reply-form-header">Reply:</h4>
            <form>
                <div className="text-area-container">
                    <textarea placeholder="Write a reply..."className="reply-text"></textarea>
                </div>
                <input className="reply-file" type="file"></input>
                <input className="reply-submit" value="Reply"type="submit"></input>
            </form>
        </div>
        
        {props.replies}

    </div>
    </>
)
}