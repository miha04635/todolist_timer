import { Component } from 'react'
import PropTypes from 'prop-types'

export default class TasksFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' },
  ]

  static defaultProps = {
    filter: '',
    onFilterChange: () => {},
  }

  static PropTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.function,
  }

  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      const selectedClass = isActive ? 'selected' : ''

      return (
        <li key={name}>
          <button type="button" onClick={() => onFilterChange(name)} className={selectedClass}>
            {label}
          </button>
        </li>
      )
    })

    return <ul className="filters">{buttons}</ul>
  }
}

TasksFilter.defaultProps = {
  filter: () => {},
  onFilterChange: () => {},
}
