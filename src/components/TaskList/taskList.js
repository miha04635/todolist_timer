import PropTypes from 'prop-types'

import Task from '../Task/task'

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map(item => {
    const { id, ...itemProps } = item

    return (
      <Task {...itemProps} key={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} id={id} />
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
