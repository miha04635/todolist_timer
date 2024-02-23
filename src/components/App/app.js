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

  createTodoItem(label, min, sec) {
    return {
      label,
      min,
      sec,
      id: this.maxId++,
      done: false,
      date: new Date(),
      timer: null,
      disabled: false,
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

  deletedItem = (idx, todos) => {
    clearInterval(todos[idx].timer)
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      }
    })
  }

  deletedList = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter(item => !item.done) }))
  }

  addItem = (text, min, sec) => {
    const textTrimmed = text.trim()
    const minTrimmed = min.trim()
    const secTrimmed = sec.trim()
    const newItem = this.createTodoItem(textTrimmed, minTrimmed, secTrimmed)

    this.setState(({ todoData }) => {
      if (!textTrimmed) {
        return ''
      }

      return {
        todoData: [...todoData, newItem],
      }
    })
  }

  onToggleDone = (idx, oldItem) => {
    this.setState(({ todoData }) => {
      const newItem = { ...oldItem, done: !oldItem.done }
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  stopTimer = (idx, oldItem, todos) => {
    this.setState(({ todoData }) => {
      const newItem = { ...oldItem, disabled: false }
      clearInterval(todos[idx].timer)
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  timer = (idx, todos) => {
    let amountSeconds = Number(todos[idx].min) * 60 + Number(todos[idx].sec)
    const timerId = setInterval(() => {
      if (amountSeconds === 0) {
        clearInterval(timerId)
      }

      this.setState(({ todoData }) => {
        const minutes = Math.floor(amountSeconds / 60)
        const remainderSeconds = amountSeconds % 60
        const oldItem = todoData[idx]
        const newItem = { ...oldItem, min: minutes, sec: remainderSeconds, timer: timerId, disabled: true }

        return {
          todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
        }
      })
      amountSeconds--
    }, 1000)
  }

  render() {
    const { todoData, filter } = this.state
    const visibleItems = this.filter(todoData, filter)

    return (
      <>
        <div className="todoapp">
          <header className="header">
            <h1>TODO</h1>
            <NewTaskForm onItemAdded={this.addItem} />
          </header>
          <TaskList
            todos={visibleItems}
            onDeleted={this.deletedItem}
            onToggleDone={this.onToggleDone}
            timer={this.timer}
            stopTimer={this.stopTimer}
          />
          <Footer
            filter={filter}
            onFilterChange={this.onFilterChange}
            doneCount={todoData}
            delList={this.deletedList}
          />
        </div>
      </>
    )
  }
}
