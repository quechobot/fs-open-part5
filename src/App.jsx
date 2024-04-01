import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Wrong credentials')
      setUsername('')
      setPassword('')
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


  return (
      <div>
        <h1>Blog App</h1>
        {user === null ? loginForm() : blogList()}
      </div>
  )
}

export default App