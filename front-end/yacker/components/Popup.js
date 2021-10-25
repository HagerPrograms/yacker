import { useState } from "react";

export default function Popup(props){
    
    const [content, setContent] = useState('');
    const [size, setSize] = useState(0);


    function contentHandler(event){
        setContent(() => {
            return event.target.valuel
        });
        setSize(() => {
            return event.target.value.length;
        })
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
        <h3 className="report-label"> Report reply "<span class="reported-content">{props.content}</span>": </h3> 

    return (
        <div className="report-popup">
            <div className="report-header">
                {reportHeader}
                {props.close_button}
            </div>
            <form method="POST" onSubmit={e=>{reportHandler(e, {content, id: props.id, reply})}}>
                <label className="report-label" >What rule was broken and how?</label>
                <textarea value={content} onChange={contentHandler}required id="report-form-text"placeholder="Reason for report."/>
                <div className="report-counter">
                    {wordCounter}
                </div>
                <input required id="report-form-submit" type="submit" value="Create Report"></input>
            </form>    
        </div>);
}

async function reportHandler(event, {content, id, reply}){

    const report_content = content.replaceAll(`"`, `\\"`);

    const graphqlQuery = (!reply)?{
        query: `
        mutation{
            reportPost(reportData: {content: "${report_content}", postID: ${id}})
            {
                report_content
            }
        }
        `}:{
        query: `
            mutation{
                reportReply(reportData: {content: "${report_content}", replyID: ${id}})
                {
                    report_content
                }
            }
        `}

    const data = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery)
      })
}