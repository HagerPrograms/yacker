export default function replyActions(props){
    
    if(props.report === true){
        return <></>
    }

    return (props.isAuth)?
    (
        <>
        <p className="author">{props.author}</p>
        <a className="thread-actions">(Ban user and delete reply.)</a>
        <a className="thread-actions">(Delete reply.)</a>

        </>
    ):
    <>
        <a className="thread-actions report">(Report reply.)</a>
    </>
}