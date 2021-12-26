import Footer from '../components/footer'
import Head from 'next/head'
import Header from "../components/Header"
export default function contact () {
    return (
        <>
        <Head>
    	    <meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
            <title>Contact us</title>
        </Head>
        <Header active="contact"/>
        <div className="welcome-container">
            <h1 className="welcome-text">Contact us</h1>
            <h2 className="contact-text">Email</h2>
            <img alt="twitter logo" className="icons" src="./email.png"/>
            <h2 className="contact-text">: <span className="email">yackerco@gmail.com</span></h2>
            <br/>
            <h2 className="contact-text">Twitter</h2>
            <img alt="twitter logo" className="icons" src="./twitter.png"/>
            <h2 className="contact-text">: <span className="twitter">@yackerco</span></h2>
            <br/>
        </div>
        </>
    )   
}