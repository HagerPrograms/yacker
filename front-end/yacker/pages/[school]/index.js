import Nav from '../../components/Nav.js';
import {useRouter} from 'next/router'
import PostForm from '../../components/postform'
import Banner from '../../components/banner.js';
import Schools from '../../../data/schools.json'

export default function Home(props) {
    const router = useRouter();
    let{ school } = router.query

    console.log(props.college);



    const posts = props.posts;    
    const feed = posts.map(post => {
        let created_on = new Date(post.created_on);
        let last_reply = new Date(post.last_reply);
        return (
        <>
        <div className="post">
            <div className="post-header">
                <h4 className="post-author">{post.author}</h4>
                <a className="thread-actions">(Ban user and close thread)</a>
                <a className="thread-actions">(Close thread)</a>
                <h3 className="post-content">{post.content}</h3>
                <h4 className="post-created">{"Post created on: " + created_on.toLocaleString()}</h4>
                <h4 className="post-updated">{"Last reply: " + last_reply.toLocaleString()}</h4>
                <div className="id-wrapper">
                    <h4 className="post-id">{"Post ID: " + post.id}</h4>
                </div>
            </div>
            <img src="https://i.imgur.com/MUZrItF.jpg"/>
            <form>
                <textarea className="reply-text"></textarea>
                <input className="reply-file" type="file"></input>
                <input className="reply-submit" value="Reply"type="submit"></input>
            </form>
        </div>
        </>
        )
    })

    return ( 
    <>
        <div className="nav">
            <Nav school={school} state={props.college.state}/>
        </div>
        <Banner school={props.college.school}/>
        <PostForm/>
        
        <hr id="page-separator"/>
        
        <div className="feed-container">

            {feed}
        </div>
    </>
    )
}

export async function getServerSideProps({params}){

    const graphqlQuery = {
        query: `
        {
            getPosts(abbreviation: "${params.school}"){
            author
            created_on
            last_reply
            id
            school
            file_path
            content
          }
        }
        `
    }

    const req = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })
    
    const { data } = await req.json()

    const college = Schools.find(element => element.abrv === params.school);

    if (!college){
        return {
            notFound: true,
        }
    }

    return {
        props: {
            posts: data.getPosts,
            college: college
        }
    }
}