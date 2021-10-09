import Nav from '../components/Nav.js';
import {useRouter} from 'next/router'
import PostForm from '../components/postform'
import Banner from '../components/banner.js';
import Schools from '../../data/schools.json'
import Post from '../components/post'
import Error from '../components/error.js';
import Reply from '../components/reply.js';
import ReplyForm from '../components/replyform'
import Link from 'next/link'

export default function ReportsPage() {
    return (
    <>
    <Nav school="report page"></Nav>
    <hr id="page-separator" className></hr>
    </>)
}

export async function getServerSideProps({params, req}){

    const graphqlQuery = {
        query: `
        {
            getReports() {
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

    if (!req.cookies.token){
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