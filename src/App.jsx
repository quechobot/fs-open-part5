import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)
  const blogFormRef = useRef()
  const redNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const greenNotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b)=>{
            return b.likes - a.likes
          })
      )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationStyle(redNotificationStyle);
      setAlertMessage(`invalid username or password`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 3000);
      setUsername('')
      setPassword('')
    }
  }
  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
  }

  const handlePost = async (newBlogObject) => {
    try {
      const returnedBlog =  await blogService.create(newBlogObject)
      const returnedUserBlog = await usersService.getById(returnedBlog.user)
      returnedBlog.user = returnedUserBlog;
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setNotificationStyle(greenNotificationStyle);
      setAlertMessage(`new blog added: ${returnedBlog["title"]}`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 3000);
    } catch (exception) {
      setNotificationStyle(redNotificationStyle);
      setAlertMessage(`upsss '${exception}' !!!!! `)
      setTimeout(() => {
        setAlertMessage(null)
      }, 3000);
    }
  }
  const handleLikes = async (putBlogObject) => {
    try {
      const returnedBlog =  await blogService.put( putBlogObject.id, putBlogObject)
      const returnedUserBlog = await usersService.getById(returnedBlog.user)
      returnedBlog.user = returnedUserBlog;
      setBlogs(blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog)).sort(
          (a,b)=>{
            return b.likes - a.likes
          }
      ))
      setNotificationStyle(greenNotificationStyle)
      setAlertMessage(`blog: ${returnedBlog["title"]} updated`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 3000);
    } catch (exception) {
      setNotificationStyle(redNotificationStyle);
      setAlertMessage(`upsss '${exception}' !!!!! `)
      setTimeout(() => {
        setAlertMessage(null)
      }, 3000);
    }
  }

  const loginForm = () =>{
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="username" onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input type="password" value={password} name="password" onChange={({target}) => setPassword(target.value)}/>
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    )
  }

  const blogForm = () =>{
    return (
        <div>
          <BlogForm createBlog={handlePost}/>
        </div>
    )
  }

  const blogList = () => {
    return (
        <div>
          <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateLikes={handleLikes}/>
            )}
          </div>
      )
  }

  const Notification = ({ message, notificationStyle}) => {
    if (message === null) {
      return null
    }
    return (
        <div style={notificationStyle}>
          {message}
        </div>
    )
  }

  return (
      <div>
        <h1>Blog App</h1>
        <Notification message={alertMessage} notificationStyle={notificationStyle}/>
        {user === null ? loginForm() :
            <div>
              <p>{user.name} logged-in</p>
              <button onClick={handleLogOut}> log out </button>
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <h1>Create</h1>
                {blogForm()}
              </Togglable>
              {blogList()}
            </div>
        }
      </div>
  )
}

export default App