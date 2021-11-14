import Nav from '../../components/Nav.js';
import {useRouter} from 'next/router';
import PostForm from '../../components/postform'
import Banner from '../../components/banner.js';
import Schools from '../../../data/schools.json'
import Post from '../../components/post'
import Error from '../../components/error.js';
import Reply from '../../components/reply.js';
import ReplyForm from '../../components/replyform'
import Link from 'next/link'
import Popup from '../../components/Popup.js';
import ThreadActions from '../../components/threadActions'
import cookie from 'js-cookie';
import { StickyBanner, Outstream } from "exoclick-react";


export default function Thread(props) {
 
const post = props.post;
const school = props.school;

let created_on = new Date(post.created_on);
let last_reply = new Date(post.last_reply);

//console.log("POST DATA: ", post);

const replies = post.reply.map((r) => {
    return (
        <Reply
        key={r.id} 
        school= {post.school}
        file_path={r.file_path}
        created_on={created_on} 
        content={r.content} 
        author={r.author}
        loggedIn = {false}
        id = {r.id}
        />
    )
}) 
 
return(
    <>
    <div className="thread-container">
        <Nav loggedIn={false}/>
        <div className="back-link">
        <Link href={"/"+school}>
            <a id="back-link">{"<<" + school}</a>
        </Link>
        </div>
        <Post
            key={post.id} 
            author={post.author}
            id= {post.id}
            school= {post.school}
            file={post.file_path}
            created_on={created_on} 
            last_reply={last_reply} 
            content={post.content} 
            loggedIn = {props.loggedIn}
        />
        <ThreadActions
            loggedIn= {false}
            post = {post.id}
        />
        <ReplyForm 
            masterID={post.id}
            school={school}
        />
        {replies}
    </div>
    <StickyBanner 
    zoneId={4497894}
    format="160x600"
    verticalPosition="middle"
    horizontalPosition="right"
    />
    </>)

}

export async function getServerSideProps({params, req}){

    const auth = (req.headers.cookie)? req.headers.cookie.split('=')[1] : '';

    const graphqlQuery = {
        query: `
        {
            getPost(postID: "${params.post}" school: "${params.school}") {
              author
              created_on
              last_reply
              id
              school
              file_path
              content
              reply {
                content
                author
                created_on
                file_path
                id
              }
            }
          }
          
        `
    }

    const payload = await fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })

    const { data }          = await payload.json();

    if (data.getPost === null){
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post: data.getPost,
            school: params.school
            }
    }
}
