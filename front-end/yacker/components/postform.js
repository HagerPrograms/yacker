import { useState } from "react";
import { useRouter } from "next/router";

function PostForm(props){
  const router = useRouter();

  const refreshData = () => 
  {
    router.replace(router.asPath);
  }

  const school = props.school

  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const [size, setSize] = useState(0)



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
            <form onSubmit={(e)=>postHandler(e, {content, media, school})} className="post-form">
                <textarea value={content} onChange={onContentChange} required id="post-form-text"placeholder="Say something!"/>
                {wordCounter}
                <label id="post-form-label" htmlFor="file-upload">Media upload:</label>
                <input value={media} onChange={onMediaChange} required id="upload" type="file"></input>
                <input required id="post-form-submit" type="submit" value="Create Post"></input>
            </form>
        </div>
        </>
    )
}

async function postHandler(event, postData){

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
      console.log(data);
      const graphqlQuery = {
      query: `
      mutation{
        createPost(postInput: {
          content: "${content}", 
          school: "${postData.school}",
          file_path: "/${data.file_path}"}){
          id
          content
        }
      }
      `};
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    }).then(res => {
      console.log(res.json());
      refreshData();
    })
    })
})
}

export default PostForm;