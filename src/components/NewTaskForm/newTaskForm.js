import { Component } from 'react'

import './index.css'
import Timer from '../Timer/timer'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  state = {
    label: '',
    min: '',
    sec: '',
  }

  onLabelChange = e => {
    this.setState({
      label: e.target.value,
    })
  }

  onLabelChangeMin = e => {
    this.setState({
      min: e.target.value,
    })
  }

  onLabelChangeSec = e => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label, this.state.min, this.state.sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <label htmlFor="">
          <input
            type="text"
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
          <Timer
            valueMin={this.state.min}
            valueSec={this.state.sec}
            onChangeMin={this.onLabelChangeMin}
            onChangeSec={this.onLabelChangeSec}
          />
        </label>
        <button type="submit"></button>
      </form>
    )
  }
}
