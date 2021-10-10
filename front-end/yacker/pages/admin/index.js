import Nav from '../../components/Nav.js';
import {useRouter} from 'next/router'
import PostForm from '../../components/postform'
import Banner from '../../components/banner.js';
import Schools from '../../../data/schools.json'
import Post from '../../components/post'
import Error from '../../components/error.js';
import Reply from '../../components/reply.js';
import ReplyForm from '../../components/replyform'
import Link from 'next/link'

export default function ReportsPage(props) {
    const allReports = [];

    allReports.push(...props.replyReports);
    allReports.push(...props.postReports);

    //console.log("All reports: ", allReports);

    allReports.sort((x,y) => {
        // console.log('This is the first element: ', x)
        // console.log('This is the second element: ', y)
        return x.report.length - y.report.length;
    })

    //console.log("This is the reports sorted and sliced: ", allReports)

    const reportFeed = allReports.map((r) => {
        let created_on = new Date(r.created_on);
        let last_reply = new Date(r.last_reply);

        const reports = r.report.map((element)=>{
            console.log("These are the reports", element)
            console.log(typeof element.created_on);

            const reportDate = parseInt(element.created_on)

            return(
            <Reply 
                file_path={null}
                created_on={reportDate} 
                content={element.report_content} 
                author={element.author}
            />
            )
        })
        
        return (
            <>
            <div className="post">
                <Post   
                    key={r.id} 
                    author={r.author}
                    id= {r.id}
                    school= {r.school}
                    file={r.file_path}
                    created_on={created_on} 
                    last_reply={last_reply} 
                    content={r.content} 
                    loggedIn = {props.loggedIn}
                />
                {reports}
            </div>
            </>
        ) 
    })
    
    return (
    <>
    <Nav school="admin panel"></Nav>
    <hr id="page-separator"></hr>
    <h1 className="school-name">Reported Content:</h1>
    <div className="feed-container">
            {reportFeed}
    </div>
    </>)
}

export async function getServerSideProps({params, req}){

    let graphqlQuery = {
        query: `
        {
            getReplyReports {
              author
              created_on
              last_reply
              id
              file_path
              content
              report {
                author
                created_on
                report_content
              }
            }
          }
          
        `
    }

    const replyPayload = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            auth: req.cookies.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })

     graphqlQuery = {
        query: `
        {
            getPostReports {
              author
              created_on
              last_reply
              id
              file_path
              content
              report {
                author
                created_on
                report_content
              }
            }
          }
          
        `
    }

    const postPayload = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            auth: req.cookies.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })
    
    const postData   = await postPayload.json();
    const replyData  = await replyPayload.json();

    const replyReports = replyData.data;
    const postReports = postData.data;

    console.log(replyReports);
    console.log(postReports);


    if (!req.cookies.token){
        return {
            notFound: true,
        }
    }

    return {
        props: {
            replyReports: replyReports.getReplyReports,
            postReports: postReports.getPostReports,
            loggedIn: req.cookies.token || ""
        }
    }
}