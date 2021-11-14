import Link from 'next/link';
import Footer from '../components/footer';
import Head from 'next/head';
import Ads from '../components/ads'

export default function HomePage() {
    return (
    <>
    <Head>
    	<meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
    </Head>
    <div className="welcome-banner">
    <h1 id="welcome-header">Welcome to yacker!</h1>
    <h2 id="welcome-body">yacker is an anonymous online community that strives to promote all forms of social discourse on college campuses. yacker is an unfiltered experience and its content may be shocking. content may be <span id="nsfw-warning"> nsfw </span>.</h2>
    <Link href='/states'>
    	<div className="button">Continue...</div>
    </Link>
    </div>
    <Ads/>
    <Footer/>
    </>
    )
}
