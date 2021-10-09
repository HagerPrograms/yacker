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


export default function Home(props) {
    const router = useRouter();
    let{ school } = router.query;

    const posts = props.posts;

    let feed;
        (posts.length > 0) ?
        feed = posts.map(post => {
            let created_on = new Date(post.created_on);
            let last_reply = new Date(post.last_reply);
            
            const replyFeed = (post.reply.length>0) ? post.reply.map(reply => {
                
                let created_on = new Date(post.created_on);
                console.log(reply);
                return (
                    <Reply
                    key={reply.id} 
                    school= {post.school}
                    file_path={reply.file_path}
                    created_on={created_on} 
                    content={reply.content} 
                    author={reply.author}
                />
                )
            }): (<h2 className="error-container">No replies yet.</h2>)

            return (
                <div className="post">
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
                <ReplyForm 
                masterID={post.id}
                school={school}
                />
                {replyFeed}
                <Link href={`/${post.school}/${post.id}`}>
                    <a className="thread-actions view-thread">View thread</a>
                </Link>
                </div>
            )
        }) :
        feed = (
            <>
            <Error content={"No posts for " + school + " yet, but you can create one!"}/>
            </>
        )

    //console.log(feed);



    return ( 
    <>
        <div className="nav">
            <Nav school={school} state={props.college.state} loggedIn={props.loggedIn}/>
        </div>
        <Banner school={props.college.school}/>
        <PostForm school={school}/>
        
        <hr id="page-separator"/>
        
        <div className="feed-container">

            {feed}
        </div>
    </>
    )
}

export async function getServerSideProps({params, req}){

    const graphqlQuery = {
        query: `
        {
            getPosts(abbreviation: "${params.school}") {
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
              }
            }
          }
          
        `
    }

    const payload = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            auth: req.cookies.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })
    
    const { data } = await payload.json();



    const college = Schools.find(element => element.abrv === params.school);

    if (!college){
        return {
            notFound: true,
        }
    }

    return {
        props: {
            posts: data.getPosts || [],
            college: college,
            loggedIn: req.cookies.token || ""
        }
    }
}