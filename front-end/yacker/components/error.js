export default function Error(props) {
    return(
    <>
    <div className="post">
        <div className="post-header">
            <h2 className="error-container">
                {props.content}
            </h2>
        </div>
    </div>
    </>)
}