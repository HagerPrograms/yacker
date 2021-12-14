import Footer from '../components/footer'
import Head from 'next/head'
import Header from "../components/Header"
export default function contact () {
    return (
        <>
        <Head>
    	    <meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
            <title>News/Announcements</title>
        </Head>
        <Header active="news"/>
        <div className="welcome-container">
            <h1 className="welcome-text">News feed.</h1>
            <h2 className="contact-text"><em>News feed coming soon!</em></h2>
        </div>
        </>
    )   
}