import Header from '../components/Header'
import Head from 'next/head'
import Link from 'next/link'
export default function Index() {
    return(
    <>
    <Head>
    	<meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
        <title>Join the chaos!</title>
    </Head>
    <Header/>
    <div className="welcome-container">
        <h1 className="welcome-text">Welcome to Yacker...</h1>
        <h2 className="welcome-text">The website that will change college campuses forever.</h2>
        <h2 className="welcome-text">No registration and only 3 rules.</h2>
        <h2 className="welcome-text">Unfiltered and unregulated.</h2>
        <Link href='/states' passHref>
    	    <div className="welcome-button">Find your university</div>
        </Link>
    </div>
    </>)
}