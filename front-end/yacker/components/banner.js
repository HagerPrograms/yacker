function Banner(props) {
    return (
        <>
            <div className="rules-banner">
                <hr/>
                <h2 className="rules">Rules:</h2>
                <p className="rules">1. Don't post illegal content.</p>
                <p className="rules">2. Don't spam the board.</p>
                <p className="rules">3. Don't advertise on the board.</p>
                <hr/>
            </div>
            <div>
                <h1 className="school-name">{props.school}</h1>
            </div>
        </>
    )
}

export default Banner;