import { useState } from "react";

function PostForm(props){
  const school = props.school

  console.log("THIS IS THE SCHOOL:", school)

  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const [size, setSize] = useState(0);

  let wordCounter;

  (size > 255) ? 
    wordCounter = (
      <label style={{color: "red"}} className="word-counter">{size + "/255"}</label>
    ):
    wordCounter = (
      <label style={{color: "white"}} className="word-counter">{size + "/255"}</label>
    )

  function onContentChange(event) {
    
    setContent(() => {
      return event.target.value;
    })
        
    setSize(() => {
      return event.target.value.length;
    })
  
  }
  
  function onMediaChange(event){
    setMedia(() => {return event.target.value})
  }

    return (
        <>
        <div className="post-form-container">
            <form method="POST" onSubmit={(e)=>postHandler(e, {content, media, school})} className="post-form">
                <textarea value={content} onChange={onContentChange} required id="post-form-text"placeholder="Say something!"/>
                {wordCounter}
                <label id="post-form-label" htmlFor="file-upload">Media upload:</label>
                <input accept="image/*,video/*" value={media} onChange={onMediaChange} required id="upload" type="file"></input>
                <input required id="post-form-submit" type="submit" value="Create Post"></input>
            </form>
        </div>
        </>
    )
}

async function postHandler(event, postData){

  event.preventDefault();

  const formData = new FormData();
  const content = postData.content.replaceAll(`"`, `\\"`);

  const fileField = document.querySelector('input[type="file"]');

  formData.append('school', postData.school);
  formData.append('upload', fileField.files[0]);

  fetch('http://localhost:4000/post-media-upload', {
    method: 'PUT',
    body:formData
  }).then(res => {
    res.json().then((data)=>{
      
      const graphqlQuery = {
      query: `
      mutation{
        createPost(postInput: {
          content: "${content}", 
          school: "${postData.school}",
          file_path: "/${postData.school}/${data.file_path}"}){
          id
          content
        }
      }
      `};

      console.log("graphql query:", graphqlQuery);

      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      })
    })
  })
}

export default PostForm;