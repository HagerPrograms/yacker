function PostForm(props){
    return (
        <>
        <div className="post-form-container">
            <form className="post-form">
                <textarea required id="post-form-text"placeholder="Say something!"/>
                <label id="post-form-label" htmlFor="file-upload">Media upload:</label>
                <input required id="file-upload" type="file"></input>
                <input required id="post-form-submit" type="submit" value="Create Post"></input>
            </form>
        </div>
        </>
    )
}

export default PostForm;