import Nav from '../../components/Nav.js';
import {useRouter} from 'next/router'
import PostForm from '../../components/postform'
import Banner from '../../components/banner.js';
import Schools from '../../../data/schools.json'
import Post from '../../components/post'
import Error from '../../components/error.js';

export default function Home(props) {
    const router = useRouter();
    let{ school } = router.query
    let replies = null;
    console.log(props.college);

    const posts = props.posts; 

    console.log(posts);
    let feed;
        (posts.length > 0) ?
        feed = posts.map(post => {
            let created_on = new Date(post.created_on);
            let last_reply = new Date(post.last_reply);
            return (
                <Post
                    key={post.id} 
                    author={post.author}
                    id= {post.id}
                    school= {post.school}
                    file={post.file_path}
                    created_on={created_on} 
                    last_reply={last_reply} 
                    content={post.content} 
                    replies={replies}
                />
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
            <Nav school={school} state={props.college.state}/>
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