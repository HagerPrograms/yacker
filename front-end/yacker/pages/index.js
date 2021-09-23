import Link from 'next/link';

export default function HomePage() {
    return (
    <>
    <div className="welcome-banner">
    <h1 id="welcome-header">Welcome to yacker!</h1>
    <h2 id="welcome-body">yacker is an anonymous online community that strives to promote all forms of social discourse on college campuses. yacker is an unfiltered experience and its content may be shocking. content may be <span id="nsfw-warning"> nsfw </span>.</h2>
    <Link href='/states'>
        <div className="button">Continue...</div>
    </Link>
    </div>
    </>
    )
}