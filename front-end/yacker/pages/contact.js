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
            <h2 className="contact-text">Email: hagerprograms@gmail.com</h2>
            <h2 className="contact-text">Twitter: @yackerco</h2>
            <h2 className="contact-text">LinkedIn: http://www.linkedin.com/in/seth-hager</h2>
        </div>
        </>
    )   
}