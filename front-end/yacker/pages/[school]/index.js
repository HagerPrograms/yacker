import Nav from '../../components/Nav.js';
import {useRouter} from 'next/router'
import PostForm from '../../components/postform'
import GlobalStyles from '../../components/global-styles.js';
import Banner from '../../components/banner.js';
import Schools from '../../../data/schools.json'

export default function Home(props) {
    const router = useRouter();
    let{ school } = router.query

    const posts = props.posts;
    const feed = posts.map(post => {
        return (
        <>
        <h3>{post.content}</h3>
        </>
        )
    })

    return ( 
    <>
        <div class="nav">
            <Nav school={school}/>
        </div>
        <Banner school={props.college.school}/>
        <PostForm/>
        {feed}
        <GlobalStyles/>
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

    console.log(college);

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