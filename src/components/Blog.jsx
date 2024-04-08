import { useState } from 'react'

const Blog = ({ blog, updateLikes, userLogged, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogUsername = typeof blog.user === 'undefined' ? null : blog.user.username
  const blogUserCreator = blogUsername === userLogged.username
  const showInfo = () => {
    visible ? setVisible(false) : setVisible(true)
    visible ? setLabel('view') : setLabel('hide')
  }
  const handleLike =  (putBlog) => {
    putBlog.likes += 1
    updateLikes(putBlog)
    //const updatedBlog = await blogService.put(putBlog)
  }
  const blogPreview = () => {
    return(
      <>
        {blog.title} {blog.author}
      </>
    )
  }
  const deleteButton = (onSmash) => {
    return <button onClick={onSmash}>delete</button>
  }
  const handleDelete = (deleteBlogId) => {
    if (window.confirm('remove blog: '+blog.title+' ?')) {
      deleteBlog(deleteBlogId)
    }
  }
  const blogInfo = () => {
    return (
      <>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{typeof blog.user === 'undefined' ? '' : blog.user.username}</div>
        {blogUserCreator?deleteButton(handleDelete):''}
      </>
    )
  }
  return (
    <div style={blogStyle}>
      {blogPreview()}
      <button onClick={showInfo}>{label}</button>
      {visible ? blogInfo():''}
    </div>

  )
}



export default Blog