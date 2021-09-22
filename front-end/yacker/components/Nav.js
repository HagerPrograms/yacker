import Link from 'next/link'

function Nav(props){
    let stateLink = (
    <>
    </>)

    if(props.state){
        stateLink = (
        <>
        <Link href={"/states/" + props.state}>
            <a id="back-link">{"<<" + props.state}</a>
        </Link>
        </>
        )
    }
    
    if(props.states){
        stateLink = (
        <>
        <Link href={"/states"}>
            <a id="back-link">{"<<STATES"}</a>
        </Link>
        </>
        )
    }
    
    return(
        <>
        <div className="header">
        <h1 id="website-name">yacker{(props.school)? ` - ${props.school}`: ""}</h1>
        {stateLink}
        </div>
        </>
    )
}

export default Nav;
