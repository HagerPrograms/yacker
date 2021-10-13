import { useState } from "react";

export default function Popup(props){
    
    const [content, setContent] = useState('');
    
    function contentHandler(event){
        setContent(() => {
            return event.target.value
        });
    }

    const reply = props.reply;

    const reportHeader = (!props.reply)? 
        <h3 className="report-label"> Report post {props.id}: </h3> :
        <h3 className="report-label"> Report reply "{props.content}": </h3> 

    console.log("POPUP PROPS:", props);

    console.log("Report Content: ", content)

    return (
        <div className="report-popup">
            <div className="report-header">
                {reportHeader}
                {props.close_button}
            </div>
            <form method="POST" onSubmit={e=>{reportHandler(e, {content, id: props.id, reply})}}>
                <label className="report-label" >What rule was broken and how?</label>
                <textarea value={content} onChange={contentHandler}required id="report-form-text"placeholder="Reason for report."/>
                <input required id="report-form-submit" type="submit" value="Create Report"></input>
            </form>    
        </div>);
}

async function reportHandler(event, {content, id, reply}){
    
    event.preventDefault();

    console.log(reply);

    const graphqlQuery = (!reply)?{
        query: `
        mutation{
            reportPost(reportData: {content: "${content}", postID: ${id}})
            {
                report_content
            }
        }
        `}:{
        query: `
            mutation{
                reportReply(reportData: {content: "${content}", replyID: ${id}})
                {
                    report_content
                }
            }
        `}

    console.log("Query:",graphqlQuery);


    const data = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery)
      })

    console.log(data);
}