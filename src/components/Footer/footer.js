import { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/tasksFilter'

export default class Footer extends Component {
  static defaultProps = {
    onFilterChange: () => {},
    delList: () => {},
    filter: () => {},
    doneCount: 0,
  }

  static PropTypes = {
    doneCount: PropTypes.object,
    delList: PropTypes.function,
    filter: PropTypes.string,
    onFilterChange: PropTypes.function,
  }

  render() {
    const { doneCount, delList, filter, onFilterChange } = this.props
    const count = doneCount.filter(el => !el.done).length

    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button onClick={delList} className="clear-completed">
          Clear completed
        </button>
      </footer>
    )
  }
}
