import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function PostForm(props){
  const school = props.school

  console.log("THIS IS THE SCHOOL:", school)

  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const [captcha, setCaptcha] = useState()
  const [error, setError] = useState('');
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
    
    errorHandle('');

    setContent(() => {
      return event.target.value;
    })
        
    setSize(() => {
      return event.target.value.length;
    })
  
  }

  function errorHandle(msg){
    if(msg === ''){
      setError(()=><></>)
    } else{
      setError(() => {
        return (
        <>
          <div className="error-message">
          {msg}
          </div>
        </>)
      })
    }
  }

  function onCaptchaChange(val){
    setCaptcha(() => val)
  }

  function onMediaChange(event){
    setMedia(() => {return event.target.value})
  }

  async function submitHandle(event, postData){
    if(!postData.captcha){
      event.preventDefault();
      errorHandle("Captcha Required!");
      console.log("ERROR", error);
      return
    }
    postHandler(event, postData)
  }

    return (
        <>
        <div className="post-form-container">
            <form method="POST" onSubmit={(e)=>submitHandle(e, {content, media, school, captcha})} className="post-form">
                <textarea value={content} onChange={onContentChange} required id="post-form-text"placeholder="Say something!"/>
                {wordCounter}
                <label id="post-form-label" htmlFor="file-upload">Media upload:</label>
                <input accept="image/*,video/*" value={media} onChange={onMediaChange} required id="file-upload" type="file"></input>
                <div className="post-captcha">
                  <ReCAPTCHA
                    sitekey="6LdW0uAdAAAAAG1As-Pq-9OJTR1Cvx4HfdIsWB0q"
                    onChange={onCaptchaChange}
                    theme="dark"
                  />
                </div>
                <input required id="post-form-submit" type="submit" value="Create Post"></input>
            </form>
            {error}
        </div>
        </>
    )
}

async function postHandler(event, postData){

  const formData = new FormData();
  const content = postData.content.replaceAll(`"`, `\\"`);

  console.log(postData.captcha)

  const fileField = document.querySelector('input[type="file"]');

  formData.append('school', postData.school);
  formData.append('upload', fileField.files[0]);

  fetch('http://yacker.co:4000/post-media-upload', {
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
          file_path: "/${postData.school}/${data.file_path}"
          captcha: "${postData.captcha}"}){
          id
          content
        }
      }
      `};

      console.log("graphql query:", graphqlQuery.query);

      fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      }).then(res => {
        res.json().then(data => {
          // console.log("DATA: ", data)
        }).then(() => {
          location.reload();
        })
      })
    })
  })
}

export default PostForm;
