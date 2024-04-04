import {useState} from "react";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState("view")
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showInfo = () => {
    visible ? setVisible(false) : setVisible(true)
    visible ? setLabel("view") : setLabel("hide")
  }
  const blogPreview = () => {
    return(
        <>
          {blog.title} {blog.author}
        </>
    )
  }
  const blogInfo = () =>{
    return (
        <>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button>like</button>
          </div>
          <div>{blog.user.username}</div>
        </>
    )
  }
 return (
      <div style={blogStyle}>
        {blogPreview()}
        <button onClick={showInfo}>{label}</button>
        {visible ? blogInfo():""}
      </div>

  )
}



export default Blog