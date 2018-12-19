import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

// styles
import './Form.css'

class Form extends Component {
  state = {
    text: '',
  }

  handleChange = evt => {
    const newText = evt.target.value
    this.setState({ text: newText })
  }

  handleKeyDown = evt => {
    if (evt.key === 'Enter') {
      this.props.submit(this.state.text)
      this.setState({ text: '' })
    }
  }

  render() {
    const { text } = this.state
    return (
      <TextField
        id="text-field"
        placeholder="new todo..."
        margin="normal"
        fullWidth
        value={text}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

export default Form
