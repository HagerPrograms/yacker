import Link from 'next/link';

export default function Header({active}){
    
    

    return (<>
    <div className="nav">
    
        <Link href="/">
            <div className={(active)? "nav-item" : "gone"}>  
                <h2 >Home</h2>
            </div>
        </Link>

        <Link href="/contact">
            <div className={(active === "contact")? "nav-active" : "nav-item"}>  
                <h2 >Contact</h2>
            </div>
        </Link>

        <Link href="/donate">
            <div className={(active === "donate")? "nav-active" : "nav-item"}>  
                <h2 >Donate</h2>
            </div>
        </Link>
        
        <Link href="/about">
            <div className={(active === "about")? "nav-active" : "nav-item"}>  
                <h2 >About</h2>
            </div>
        </Link>
        
        <Link href="/news">
            <div className={(active === "news")? "nav-active" : "nav-item"}>  
                <h2 >News</h2>
            </div>
        </Link>
    </div>
    </>)
}