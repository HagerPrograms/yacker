function PostForm(props){
    return (
        <>
        <div className="post-form-container">
            <form className="post-form">
                <textarea id="post-form-text"placeholder="Say something!"/>
                <label htmlFor="file-upload">Media upload:</label>
                <input id="file-upload" type="file"></input>
                <input id="post-form-submit" type="submit" value="Create Post"></input>
            </form>
        </div>
        </>
    )
}

export default PostForm;