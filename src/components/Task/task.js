import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    label: '',
    min: '',
    sec: '',
    done: '',
    id: '',
    date: new Date(),
  }

  static PropTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.function,
    onToggleDone: PropTypes.function,
    done: PropTypes.boolean,
    id: PropTypes.number,
    date: PropTypes.object,
  }

  render() {
    const { label, onDeleted, onToggleDone, done, id, date, min, sec, timer, stopTimer, disabled } = this.props

    let className = ''
    if (done) {
      className += 'completed'
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} checked={done} onChange={onToggleDone} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={timer} disabled={disabled}></button>
              <button className="icon icon-pause" onClick={stopTimer}></button>
              <span className="timer">
                {min}:{sec}
              </span>
            </span>
            <span className="description">created {formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" type="button"></button>
          <button className="icon icon-destroy" type="button" onClick={onDeleted}></button>
        </div>
      </li>
    )
  }
}
