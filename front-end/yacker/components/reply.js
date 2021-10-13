
import { getServerSideProps } from '../pages/admin';
import ReplyActions from './replyActions';

export default function Reply(props){
    let media = props.file_path;

    console.log("PROPS:", props);

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
                    <ReplyActions id={props.id}content={props.content} isAuth={props.loggedIn} report={props.report}/>
                </div>
                {media}
                <p className="reply-content">{props.content}</p>

            </div>
        </div>
    )
}