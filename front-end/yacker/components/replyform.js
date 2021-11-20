import { useState } from "react";

export default function replyForm(props){
    

    const [content, setContent] = useState('');
    const [media, setMedia] = useState('');
    const [size, setSize] = useState(0);
  
    let wordCounter;

    const masterID = props.masterID;
    const school = props.school;

    (size > 255) ? 
      wordCounter = (
        <label className="word-counter"style={{color: "red"}} className="word-counter">{size + "/255"}</label>
      ):
      wordCounter = (
        <label className="word-counter"style={{color: "white"}} className="word-counter">{size + "/255"}</label>
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
    <div className="reply-form-wrapper">
    <h4 className="reply-form-header">Reply:</h4>
        <form method="POST" onSubmit={(e)=>replyHandler(e, {content, media, masterID, school})}>
        <div className="text-area-container">
            <textarea value={content} onChange={onContentChange} placeholder="Write a reply..."className="reply-text"></textarea>
            {wordCounter}
        </div>

        <input accept="image/*,video/*" id={"upload_"+masterID} onChange={onMediaChange} value={media} className="reply-file" type="file"></input>
        <input className="reply-submit" value="Reply"type="submit"></input>
        </form>
    </div>)
}

async function replyHandler(event, postData){

    const formData = new FormData();
    const content = postData.content.replaceAll(`"`, `\\"`);
  
    const fileField = document.querySelector("#upload_"+postData.masterID);
  
    formData.append('school', postData.school);
    formData.append('upload', fileField.files[0]);

    if(fileField.files[0]){
      fetch('http://yacker.co:4000/post-media-upload', {
        method: 'PUT',
        body:formData
        }).then(res => {
          res.json().then((data)=>{
            
            const graphqlQuery = {
              query: `
                  mutation{
                  createReply(replyData: {
                  content: "${content}", 
                  masterID: "${postData.masterID}",
                  school: "${postData.school}",
                  file_path: "/${postData.school}/${data.file_path}"})
                  {
                      content
                  }
              }
              `};
            
            console.log("graqla query:", graphqlQuery);

            fetch('http://yacker.co:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(graphqlQuery)
          }).then(res => {
            console.log(res.json().then(window.location.reload()));
            })
          })
      })
    }else{
      
      const graphqlQuery = {
        query: `
            mutation{
            createReply(replyData: {
            content: "${content}", 
            masterID: "${postData.masterID}",
            school: "${postData.school}",
            file_path: null})
            {
                content
            }
        }
        `};

        console.log("graqla query:", graphqlQuery);

      fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
        }).then(res => {
          console.log(res.json().then(window.location.reload()));
        })
    }



}