import Footer from '../components/footer'
import Head from 'next/head'
export default function contact () {
    return (
        <>
        <Head>
    	    <meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
            <title>Contact page</title>
        </Head>
        <div className="welcome-banner">
            <h2 className="contact-header">contact page</h2>
            <h2 className="contact-info">email: hagerprograms@gmail.com</h2>
            <h2 className="contact-info">twitter: hager_programs</h2>
        </div>
        <Footer/>
        </>
    )   
}