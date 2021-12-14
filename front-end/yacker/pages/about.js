import Footer from '../components/footer'
import Head from 'next/head'
import Header from "../components/Header"
export default function contact () {
    return (
        <>
        <Head>
    	    <meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
            <title>About us</title>
        </Head>
        <Header active="about"/>
        <div className="welcome-container">
            <h1 className="welcome-text">About us</h1>
            <h2 className="contact-text">We are a diverse group of people-- from college graduates to college dropouts, from film majors to computer science majors-- but we all came together to create a vision. We aim to preserve the freedoms (and the wackiness) of the internet and aim to do so through anonymity.</h2>
        </div>
        </>
    )   
}