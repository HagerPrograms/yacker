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
import ThreadActions from '../../components/threadActions.js'

export default function ReportsPage(props) {
    const allReports = [];

    if(props.replyReports){
        allReports.push(...props.replyReports);
    }
    if(props.postReports){
        allReports.push(...props.postReports);
    }

    allReports.sort((x,y) => {
        return y.report.length - x.report.length;
    })

    //console.log("This is the reports sorted and sliced: ", allReports)

    const reportFeed = allReports.map((r) => {
        let created_on = new Date(r.created_on);
        let last_reply = new Date(r.last_reply);

        const reports = r.report.map((element)=>{
            console.log(element)
            const reportDate = parseInt(element.created_on)
            return(
            <Reply 
                key = {element.id || "0000000"}
                file_path={null}
                created_on={reportDate} 
                content={element.report_content} 
                author={element.author}
                loggedIn = {props.loggedIn}
                report = {true}
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
                <ThreadActions
                    loggedIn= {props.loggedIn}
                    post = {r.id}
                    author= {r.author}
                    school={r.school}
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

    const auth = (req.headers.cookie)? req.headers.cookie.split('=')[1] : '';

    if(!auth){
        return {
            notFound: true
        }
    }


    let graphqlQuery = {
        query: `
        {
            getReplyReports{
                id
                content
                author
                created_on
                last_reply
                file_path
                report{
                    author
                    created_on
                    report_content
                }
            }
        }
          
        `
    }

    const replyPayload = await fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth}`,
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
              school
              report {
                author
                created_on
                report_content
              }
            }
          }
          
        `
    }

    const authQuery = {
        query: `
            {
                isAdmin
            }
        `
    }

    const authPayload = await fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authQuery)
    })
    

    const postPayload = await fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })
    
    const postData   = await postPayload.json();
    const replyData  = await replyPayload.json();
    const {data}     = await authPayload.json();
    
    const replyReports = replyData.data;
    const postReports = postData.data;

    return {
        props: {
            replyReports: replyReports.getReplyReports,
            postReports: postReports.getPostReports,
            loggedIn:    data.isAdmin
        }
    }
}