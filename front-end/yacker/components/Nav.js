function Nav(props){
    return(
        <>
        <div className="header">
        <h1 id="website-name">yacker{(props.school)? ` - ${props.school}`: ""}</h1>
        </div>
        </>
    )
}

export default Nav;
