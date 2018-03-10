import React from 'react'

class ToggleableText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button class="link" onClick={this.toggleVisibility}>{this.props.textLabel}</button>
        </div>
        <div style={showWhenVisible}>
        <button class="link" onClick={this.toggleVisibility}>{this.props.textLabel}</button>
            {this.props.children}
        </div>
      </div>
    )
  }
}

export default ToggleableText