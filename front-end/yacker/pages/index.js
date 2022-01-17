import Header from '../components/Header'
import Head from 'next/head'
import Link from 'next/link'
import Ticker from '../components/Ticker'

export default function Index() {
    return(
    <>
    <Head>
    	<meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
        <meta name="description" content="College is wild, so is Yacker. The content here is untamed.
        All posts are anonymous and anything goes.
        "/>
        <title>Yacker: An anonymous college experience.</title>
    </Head>
    <Header active="home"/>
    <div className="welcome-container">
        <h1 className="welcome-text center">Welcome to Yacker...</h1>
        <h2 className="welcome-text">This is social media without the confining terms of service.</h2>
        <h2 className="welcome-text">Yacker will change universities forever.</h2>
        <h2 className="welcome-text"><em>No registration, and only 3 rules.</em></h2>
        <h2 className="welcome-text">No restrictions on content like Instagram or Snapchat.</h2>
        <h2 className="welcome-text">Post whatever wild shit you'd like.</h2>
        <h2 className="welcome-text"><em>Do whatever you want!</em></h2>
        <Link href='/states' passHref>
    	    <div className="welcome-button">Join the fun and find your university!</div>
        </Link>
    </div>
    <Ticker/>
    </>)
}