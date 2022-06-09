import React, { useState, useEffect, useReducer } from 'react'
import { Context } from './context'
import reducer from './reducer'
import Loader from './components/Loader/Loader'
import TodoList from './components/TodoList/TodoList'
import IconsPanel from './components/IconsPanel/IconsPanel'

export default function App() {
    const [state, dispatch] = useReducer(
        reducer,
        localStorage.tasks == null ? [] : JSON.parse(localStorage.getItem('tasks'))
    )
    const [taskTitle, setTaskTitle] = useState('')
    const [correct, setCorrect] = useState('Enter your Task:')
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('tasks', JSON.stringify(state))
            setLoader(false)
        }, 2000)
    }, [state])

    const addTask = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            if (taskTitle.trim()) {
                dispatch({
                    type: 'ADD',
                    payload: taskTitle,
                })
                setTaskTitle('')
                setCorrect('Enter your Task:')
            } else {
                setCorrect('Enter Something!')
            }
        }
    }

    return (
        <Context.Provider
            value={{
                dispatch,
            }}
        >
            <div className="header">
                <h1>Todo List</h1>
            </div>
            <div className="container">
                <div className="input-group mb-3">
                    <span
                        className={
                            correct === 'Enter your Task:'
                                ? 'input-group-text'
                                : 'input-group-text uncorrect'
                        }
                        id="inputGroup-sizing-default"
                    >
                        {correct}
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        value={taskTitle}
                        onChange={(event) => setTaskTitle(event.target.value)}
                        onKeyPress={addTask}
                    />
                    <button
                        className="btn btn-secondary"
                        type="button"
                        id="button-addon2"
                        disabled={!taskTitle.trim()}
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>
                <IconsPanel tasks={state} />
                {loader ? <Loader /> : <TodoList tasks={state} />}
            </div>
        </Context.Provider>
    )
}
