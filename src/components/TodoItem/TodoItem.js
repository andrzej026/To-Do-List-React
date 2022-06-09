import React, { useState, useContext } from 'react'
import { Context } from '../../context'
import './TodoItem.css'

export default function TodoItem({ title, id, completed, editable, index }) {
    const { dispatch } = useContext(Context)
    const classes = ['list-group-item', 'task']
    let editIcon = 'bi bi-pencil'

    if (completed) {
        classes.push('completed')
    }

    const [editTaskTitle, setEditTaskTitle] = useState('')

    const editTask = () => {
        dispatch({
            type: 'EDIT_ON/OFF',
            payload: id,
        })
    }

    const editing = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            if (editTaskTitle.trim()) {
                dispatch({
                    type: 'EDITING',
                    payload: editTaskTitle,
                    id,
                })
                setEditTaskTitle('')
            }
        } else if (event.key === 'Escape') {
            dispatch({
                type: 'EDIT_ON/OFF',
                payload: id,
            })
            setEditTaskTitle('')
        }
    }

    let item
    if (editable) {
        editIcon = 'bi bi-check2'
        item = (
            <input
                type="text"
                className="form-control edit"
                value={editTaskTitle}
                placeholder={title}
                onKeyDown={editing}
                autoFocus={true}
                onChange={(event) => setEditTaskTitle(event.target.value)}
            />
        )
    } else {
        item = <span>{title}</span>
    }

    return (
        <li className={classes.join(' ')}>
            <div className="input-group-text">
                <div className="checkandnumber">
                    <input
                        type="checkbox"
                        className="form-check-input me-1"
                        aria-label="Checkbox for following text input"
                        checked={completed}
                        onChange={() =>
                            dispatch({
                                type: 'TOGGLE',
                                payload: id,
                            })
                        }
                    />
                    <strong>{index + 1}</strong>
                </div>
                {item}
                <div className="icons">
                    <i
                        className={editIcon}
                        onClick={editIcon === 'bi bi-pencil' ? editTask : editing}
                    ></i>
                    <i
                        className="bi bi-trash"
                        onClick={() =>
                            dispatch({
                                type: 'REMOVE',
                                payload: id,
                            })
                        }
                    ></i>
                </div>
            </div>
        </li>
    )
}
