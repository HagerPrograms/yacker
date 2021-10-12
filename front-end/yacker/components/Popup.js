import { useState } from "react";

export default function Popup(props){
    
    const [content, setContent] = useState('');
    
    function contentHandler(event){
        setContent(() => {
            return event.target.value
        });
    }

    console.log("Report Content: ", content)

    return (
        <div className="report-popup">
            <div className="report-header">
                <h3 className="report-label">Report post: {props.id}</h3>
                {props.close_button}
            </div>
            <form method="POST" onSubmit={e=>{reportHandler(e, {content, id: props.id})}}>
                <label className="report-label" >What rule was broken and how?</label>
                <textarea value={content} onChange={contentHandler}required id="report-form-text"placeholder="Reason for report."/>
                <input required id="report-form-submit" type="submit" value="Create Report"></input>
            </form>    
        </div>);
}

async function reportHandler(event, {content, id}){
    
    event.preventDefault();

    const graphqlQuery = {
        query: `
        mutation{
            reportPost(reportData: {content: "${content}", postID: ${id}})
            {
                report_content
            }
        }
        `};
    const data = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery)
      })

    console.log(data);
}