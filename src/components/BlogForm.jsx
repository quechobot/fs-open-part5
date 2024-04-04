import { useState } from 'react'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const handlePost = (event) => {
        event.preventDefault()
        const newBlogObject = {
            title: title,
            author: author,
            url: url
        }
        createBlog(newBlogObject)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={handlePost}>
                <div>
                    title
                    <input type="text" value={title} name="title" onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    author
                    <input type="text" value={author} name="author" onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    url
                    <input type="url" value={url} name="url" onChange={({target}) => setUrl(target.value)}/>
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm