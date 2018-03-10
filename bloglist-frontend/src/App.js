import React from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Success from './components/Success'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {Navbar, NavItem, Nav, ControlLabel, Button, ListGroup, ListGroupItem, Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: 'asdasdasd',
      yay: 'dsadsad',
      username: '',
      password: '',
      user: null,
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    }
    
  }

  componentDidMount() {
  //  console.log(this.state.yay)
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }
  addBlog = (event) => {
    event.preventDefault()
    console.log(this.state.user)
    try {
    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        console.log(newBlog)
        this.setState({
          yay: 'a new blog ' + this.state.newBlogTitle + ' by ' + this.state.newBlogAuthor + ' added to the list!',
          blogs: this.state.blogs.concat(newBlog),
          newBlogTitle: '',
          newBlogAuthor: '',
          newBlogUrl: ''
        })
        
      })
      this.componentDidMount()
     // this.setState({yay: 'A new blog' + this.state.newBlogTitle + 'by' + this.state.newBlogAuthor + 'added to the list!'})
         setTimeout(() => {
         this.setState({ yay: null })
       }, 5000)
    }catch (exception) {
      this.setState({
        error: 'Cannot add blog with the given information',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
  
    }
  }

  deleteBlog = (event) => {
     event.preventDefault()
     if (window.confirm("Are you sure that you watn to delete this blog?")) {
     try {
     console.log(event.target.name)
     console.log(event)
    
      blogService.remove(event.target.name)
      .then(deletedBlog => {
        this.componentDidMount()
      }
      )}catch (exception) {
          this.setState({
            error: 'This user cannot delete the blog'
      }).setTimeout(() => {
        this.setState({error: null})
        }, 5000)
    }
  }
}
addLike = blog => async () => {
  const newBlog = {...blog, likes: blog.likes + 1}
  // console.log(newBlog)
  try {
    await blogService.updateWithoutId(newBlog)
    this.componentDidMount()
    }catch(exception){
      this.setState({
        error: 'Cannot like??',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } 
} 

  logout = async (event) => {
    event.preventDefault()
    console.log(window.localStorage.getItem('loggedBlogappUser'))
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'username or password is invalid',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  handleBlogTitleChange = (event) => {
    this.setState({ newBlogTitle: event.target.value })
  }
  handleBlogAuthorChange = (event) => {
    this.setState({ newBlogAuthor: event.target.value })
  }
  handleBlogUrlChange = (event) => {
    this.setState({ newBlogUrl: event.target.value })
  }
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

render() {
    this.state.blogs.sort(function (a, b) {
      return b.likes - a.likes;
    })

    const loginForm = () => (
      <Toggleable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Toggleable>
    )
    const blogForm = () => (
      <div>
        <h2>Add a new blog</h2>

        <form onSubmit={this.addBlog}>
          <FormGroup>
            <ControlLabel>Title: </ControlLabel> 
              <FormControl
                type="text"
                name="Title"
                value={this.state.newBlogTitle}
                onChange={this.handleBlogTitleChange}
              />
          
            <ControlLabel>Author: </ControlLabel>
              <FormControl
                type="text"
                name="Author"
                value={this.state.newBlogAuthor}
                onChange={this.handleBlogAuthorChange}
              />
          
            <ControlLabel>Url: </ControlLabel>
            <FormControl
              type="text"
              name="Url"
              value={this.state.newBlogUrl}
              onChange={this.handleBlogUrlChange}
            />
            <Button bsStyle="success">Save</Button>
          </FormGroup>
        </form>
      </div>
    )
  
    return (
      <div className="container">
        <div style={{backgroundColor: 'lightgreen', padding: 4, marginTop: 35, fontWeight:"bold"}}>
        <h1>Blog list application</h1>
        </div>
        <Error message={this.state.error} />
        <Success message={this.state.yay} />
        <div style={{marginLeft:20}}>
        {this.state.user === null ?
          loginForm() :
          <div>
            <p style={{fontSize:18, fontStyle:'italic'}}>{this.state.user.name} logged in</p>
            <form onSubmit={this.logout}>
              <Button bsStyle=''>logout</Button>
            </form>
            {blogForm()}
          
          <div className="blogit">
           <h2>Blogs:</h2>
             {this.state.blogs.map(blog => 
               <Blog key={blog._id}
                 blog={blog}
                 deleteBlog={this.deleteBlog}
                 likeBlog={this.addLike(blog)}/>
            )}
           </div>
          </div>
        }
        </div>
      
      </div>
    );
  }
 }


export default App;
