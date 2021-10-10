import {useState} from 'react';
import Popup from './Popup';

export default function postActions(props) {
    
    const [reported, setReported] = useState(false);
    
    
    function reportedHandler() {
        setReported((r)=>!r)
    }

    const closeButton = <p onClick={reportedHandler} className="close-report">X</p>
    const reportForm = (reported === true)? <Popup close_button={closeButton} id={props.post}/> : <></>; 


    return (props.loggedIn !== false)? 
    (<>
        <div className="action-bar">    
            <h4 className="post-author">{props.author}</h4>
            <a className="thread-actions">(Ban user and close thread)</a>
            <a className="thread-actions">(Close thread)</a>
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