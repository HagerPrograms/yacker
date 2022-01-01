import { useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";

export default function Popup(props){
    
    const [content, setContent] = useState('');
    const [size, setSize] = useState(0);
    const [captcha, setCaptcha] = useState()
    const [error, setError] = useState('');


    function contentHandler(event){
        errorHandle('');
        setContent(() => {
            return event.target.value
        });
        setSize(() => {
            return event.target.value.length;
        })
    }

    function onCaptchaChange(val){
        errorHandle('');
        setCaptcha(() => val)
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

    async function submitHandle(event, postData){

        console.log("DATA:", postData)

        if(!postData.captcha){
          event.preventDefault();
          errorHandle("Captcha Required!");
          return
        }
        reportHandler(event, postData)
      }

    let wordCounter;

    (size > 255) ? 
      wordCounter = (
        <label style={{color: "red"}} className="word-counter">{size + "/255"}</label>
      ):
      wordCounter = (
        <label style={{color: "white"}} className="word-counter">{size + "/255"}</label>
      )

    const reply = props.reply;

    const reportHeader = (!props.reply)? 
        <h3 className="report-label"> Report post {props.id}: </h3> :
        <h3 className="report-label"> Report reply &quot;<span className="reported-content">{props.content}</span>&quot;: </h3> 

    return (
        <div className="report-popup">
            <div className="report-header">
                {reportHeader}
                {props.close_button}
            </div>
            <form method="POST" onSubmit={e=>{submitHandle(e, {content, id: props.id, reply, captcha})}}>
                <label className="report-label" >What rule was broken and how?</label>
                <textarea value={content} onChange={contentHandler} required id="report-form-text"placeholder="Reason for report."/>
                <div className="report-counter">
                    {wordCounter}
                </div>
                <div className="report-captcha">
                  <ReCAPTCHA
                    sitekey="6LdW0uAdAAAAAG1As-Pq-9OJTR1Cvx4HfdIsWB0q"
                    onChange={onCaptchaChange}
                    theme="dark"
                  />
                  {error}
                </div>
                <input required id="report-form-submit" type="submit" value="Create Report"></input>
            </form>    
        </div>);
}

async function reportHandler(event, reportData){

    const report_content = reportData.content.replaceAll(`"`, `\\"`);

    const graphqlQuery = (!reportData.reply)?{
        query: `
        mutation{
            reportPost(reportData: {content: "${report_content}", postID: ${reportData.id} captcha: "${reportData.captcha}"})
            {
                report_content
            }
        }
        `}:{
        query: `
            mutation{
                reportReply(reportData: {content: "${report_content}", replyID: ${reportData.id}, captcha: "${reportData.captcha}"})
                {
                    report_content
                }
            }
        `}

    const data = await fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery)
      })

    console.log(data);
}