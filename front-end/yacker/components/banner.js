function Banner(props) {
    return (
        <>
            <div className="rules-banner">
                <hr/>
                <h2 className="rules">Rules:</h2>
                <p className="rule"><em>1. Don&apos;t post illegal content.</em></p>
                <p className="rule"><em>2. Don&apos;t spam the board.</em></p>
                <p className="rule"><em>3. Don&apos;t advertise on the board.</em></p>
                <h2 className="sub-banner"><em>Otherwise... go wild.</em></h2>
                <hr/>
            </div>
            <div>
                <h1 className="school-name">{props.school}</h1>
            </div>
        </>
    )
}

export default Banner;