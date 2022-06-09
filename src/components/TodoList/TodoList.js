import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css'

export default function TodoList({ tasks }) {
    const filter = () => {
        const activeTasks = tasks.filter((task) => task.completed === false)
        const inActiveTasks = tasks.filter((task) => task.completed === true)
        return (tasks = activeTasks.concat(inActiveTasks))
    }
    return (
        <>
            {tasks.length ? (
                (filter(),
                (
                    <ul className="list-group list-group-flush">
                        {tasks.map((task, index) => (
                            <TodoItem key={task.id} {...task} index={index} />
                        ))}
                    </ul>
                ))
            ) : (
                <p className="notext">Nothing to do 😕</p>
            )}
        </>
    )
}
