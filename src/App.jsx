import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [alertMessage, setAlertMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)
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
      setBlogs( blogs )
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

  const handlePost = async (event) => {
    event.preventDefault()
    try {
      const newBlogObject = {
        title: title,
        author: author,
        url: url
      }
      const returnedBlog =  await blogService.create(newBlogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const blogList = () => {
    return (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
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
              <h1>Create</h1>
              {blogForm()}
              {blogList()}

            </div>
        }
      </div>
  )
}

export default App