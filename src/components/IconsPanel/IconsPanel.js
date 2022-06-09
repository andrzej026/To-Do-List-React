import React, { useContext } from 'react'
import { Context } from '../../context'
import './IconsPanel.css'

export default function IconsPanel({ tasks }) {
    const { dispatch } = useContext(Context)

    const sorting = (event) => {
        if (tasks.length > 1) {
            switch (event.target.className) {
                default:
                    break
                case 'bi bi-sort-alpha-down':
                    event.target.className = 'bi bi-sort-alpha-up-alt'
                    dispatch({
                        type: 'SORTING_ALPHA_UP',
                        payload: tasks,
                    })
                    break
                case 'bi bi-sort-alpha-up-alt':
                    event.target.className = 'bi bi-sort-alpha-down'
                    dispatch({
                        type: 'SORTING_ALPHA_DOWN',
                        payload: tasks,
                    })
                    break
                case 'bi bi-sort-numeric-down':
                    event.target.className = 'bi bi-sort-numeric-up-alt'
                    dispatch({
                        type: 'SORTING_ORDER_UP',
                        payload: tasks,
                    })
                    break
                case 'bi bi-sort-numeric-up-alt':
                    event.target.className = 'bi bi-sort-numeric-down'
                    dispatch({
                        type: 'SORTING_ORDER_DOWN',
                        payload: tasks,
                    })
                    break
            }
        }
    }

    return (
        <>
            <i className="bi bi-sort-alpha-down" onClick={sorting}></i>
            <i className="bi bi-sort-numeric-down" onClick={sorting}></i>
        </>
    )
}
