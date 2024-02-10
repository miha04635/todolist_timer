import { Component } from 'react'
import './index.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  state = {
    label: '',
  }

  onLabelChange = e => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <label htmlFor="">
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </label>
      </form>
    )
  }
}
