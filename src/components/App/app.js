import { Component } from 'react'

import Footer from '../Footer/footer'
import NewTaskForm from '../NewTaskForm/newTaskForm'
import TaskList from '../TaskList/taskList'

import './index.css'

export default class App extends Component {
  maxId = 1

  state = {
    todoData: [],
    filter: 'all',
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'Active':
        return items.filter(item => !item.done)
      case 'Completed':
        return items.filter(item => item.done)
      default:
        return items
    }
  }

  onFilterChange = filter => {
    this.setState({ filter })
  }

  createTodoItem(label) {
    return {
      label,
      id: this.maxId++,
      done: false,
      date: new Date(),
    }
  }

  componentDidMount() {
    this.timeID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timeID)
  }

  tick = () => {
    this.setState({
      date: new Date(),
    })
  }

  deletedItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id)
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      }
    })
  }

  deletedList = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter(item => !item.done) }))
  }

  addItem = text => {
    const textTrimmed = text.trim()
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      if (!textTrimmed) {
        return ''
      }
      return {
        todoData: [...todoData, newItem],
      }
    })
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  render() {
    const { todoData, filter } = this.state

    const visibleItems = this.filter(todoData, filter)
    return (
      <div className="todoapp">
        <button></button>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <TaskList todos={visibleItems} onDeleted={this.deletedItem} onToggleDone={this.onToggleDone} />
        <Footer filter={filter} onFilterChange={this.onFilterChange} doneCount={todoData} delList={this.deletedList} />
      </div>
    )
  }
}
