import React from 'react'
import { Button } from 'react-bootstrap'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: this.props.blog
      
    }
    // console.log(this.state.blog)
}

render() {
  const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
  const showWhenVisible = { display: this.state.visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    background: 'lightblue',
    fontWeight: 'bold'
  }
  const blogStyle2 = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 5
  }
  // const user = this.state.blog
  // console.log(user)

  const textButton = this.state.blog.author + ': ' + this.state.blog.title
  return (
  <div>
    <div className="notVisible" style={hideWhenVisible}>
      <Button className="alku" style={blogStyle} onClick={e => this.setState({ visible: true })}>{textButton}</Button>
    </div>
    <div className="visible" style={showWhenVisible}>
      <Button className="clicked" style={blogStyle}  onClick={e => this.setState({ visible: false })}>{textButton}</Button>
        <div className="clickedText" style={blogStyle2}>
           <a href={this.state.blog.url}>{this.state.blog.url}</a>

           {/* <form name={this.state.blog} onSubmit={this.props.likeBlog}> */}
              <p style={{fontWeight:'bold', fontSize:22}}>{this.props.blog.likes} likes <Button bsStyle="info" onClick={this.props.likeBlog}>like</Button></p>
           {/* </form> */}

           <p style={{fontStyle:'italic'}}>Blog added by {this.state.blog.user.name}</p>
           <form name={this.state.blog._id} onSubmit={this.props.deleteBlog}>
             <Button type="submit" bsStyle="danger" style={{marginBottom: 4}}>delete</Button>
           </form>
        </div>
    </div>
  </div>
  )}
}
export default Blog