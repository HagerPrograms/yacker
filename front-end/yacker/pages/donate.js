import Footer from '../components/footer'
import Head from 'next/head'
import Header from "../components/Header"
export default function contact () {
    return (
        <>
        <Head>
    	    <meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
            <title>Donate to Yacker</title>
        </Head>
        <Header active="donate"/>
        <div className="welcome-container">
            <h1 className="welcome-text">Donate</h1>
            <h2 className="contact-text"><em>Donation links coming soon!</em></h2>
        </div>
        </>
    )   
}