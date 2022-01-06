import Link from 'next/link'

function Nav(props){
    let stateLink = (
    <>
    </>)

    if(props.state){
        stateLink = (
        <>
        <Link href={"/states/" + props.state}>
            <a id="back-link">{"<< back to " + props.state.toUpperCase()}</a>
        </Link>
        </>
        )
    }
    let adminHeader = (props.loggedIn === false) ? <></> : 
        <Link href="/admin">
            <a className="admin-subheader">Admin</a>
        </Link>
    
    if(props.states){
        stateLink = (
        <>
        <Link href={"/states"}>
            <a id="back-link">{"<< choose your state"}</a>
        </Link>
        </>
        )
    }
    
    return(
        <>
        <div className="header">
        <Link href="/">
            <h1 id="website-name">Yacker{(props.school)? ` - ${props.school}`: ""}</h1>
        </Link>
        {stateLink}
        {adminHeader}
        </div>
        </>
    )
}

export default Nav;
