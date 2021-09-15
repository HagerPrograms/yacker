import Nav from '../../components/header.js';
import {useRouter} from 'next/router'
import PostForm from '../../components/postform'

export default function Home(props) {
    const router = useRouter();
    let{ school } = router.query

    const posts = props.posts;
    //console.log(posts);
    const feed = posts.map(post => {
        return (
        <>
        <h3>{post.content}</h3>
        </>
        )
    })

    console.log()

    return (
    <div class="nav">
    <Nav school={school}/>
    <PostForm/>
    {feed}
    </div>
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

    console.log(data)

    if (!data.getPosts[0]){
        return {
            notFound: true,
        }
    }

    return {
        props: {posts: data.getPosts}
    }
}