import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
          <input id='new-blog_title' type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} placeholder='write title here'/>
        </div>
        <div>
                    author
          <input id='new-blog_author' type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} placeholder='write author here'/>
        </div>
        <div>
                    url
          <input id='new-blog_url' type="url" value={url} name="url" onChange={({ target }) => setUrl(target.value)} placeholder='write url here'/>
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm