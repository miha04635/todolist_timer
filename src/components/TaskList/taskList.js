import PropTypes from 'prop-types'

import Task from '../Task/task'

const TaskList = ({ todos, onDeleted, onToggleDone, timer, stopTimer }) => {
  const elements = todos.map(item => {
    const { id, ...itemProps } = item
    const idx = todos.findIndex(el => el.id === id)
    const oldItem = todos[idx]
    return (
      <Task
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(idx)}
        onToggleDone={() => onToggleDone(idx, oldItem)}
        id={id}
        timer={() => timer(idx, todos, oldItem)}
        stopTimer={() => stopTimer(idx)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  todos: '',
}
TaskList.PropTypes = {
  onDeleted: PropTypes.function,
  onToggleDone: PropTypes.function,
  todos: PropTypes.string,
}

export default TaskList
