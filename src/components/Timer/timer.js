import React from 'react'

const Timer = ({ onChangeMin, onChangeSec, valueMin, valueSec }) => {
  return (
    <>
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        onChange={onChangeMin}
        value={valueMin}
        autoFocus
        min={0}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
        onChange={onChangeSec}
        value={valueSec}
        autoFocus
        min={0}
      />
    </>
  )
}

export default Timer
