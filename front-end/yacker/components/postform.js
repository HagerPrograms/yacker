import { useState } from "react";

function PostForm(props){
    
    const [content, setContent] = useState('');
    const [media, setMedia] = useState('');


  function onContentChange(event) {
    setContent(() => {return event.target.value})
  }
  
  function onMediaChange(event){
    setMedia(() => {return event.target.value})
  }

  console.log(content);
  console.log(media);

    return (
        <>
        <div className="post-form-container">
            <form className="post-form">
                <textarea value={content} onChange={onContentChange} required id="post-form-text"placeholder="Say something!"/>
                <label id="post-form-label" htmlFor="file-upload">Media upload:</label>
                <input value={media} onChange={onMediaChange} required id="file-upload" type="file"></input>
                <input onSubmit={(e)=>postHandler(e, {content, media})} required id="post-form-submit" type="submit" value="Create Post"></input>
            </form>
        </div>
        </>
    )
}

async function postHandler(event, postData){
    
}

export default PostForm;