export default function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    id: Date.now(),
                    title: isNaN(action.payload) ? action.payload : +action.payload,
                    completed: false,
                    editable: false,
                },
            ]
        case 'TOGGLE':
            return state.map((task) => {
                if (task.id === action.payload) {
                    task.completed = !task.completed
                }
                return task
            })
        case 'EDIT_ON/OFF':
            return state.map((task) => {
                if (task.id === action.payload) {
                    task.editable = !task.editable
                }
                return task
            })
        case 'EDITING':
            return state.map((task) => {
                if (task.id === action.id) {
                    task.title = action.payload
                    task.editable = !task.editable
                }
                return task
            })
        case 'REMOVE':
            return state.filter((task) => task.id !== action.payload)
        case 'SORTING_ALPHA_UP':
            return [...state].sort((a, b) => (a.title > b.title ? 1 : -1))
        case 'SORTING_ALPHA_DOWN':
            return [...state].sort((a, b) => (b.title > a.title ? 1 : -1))
        case 'SORTING_ORDER_UP':
            return [...state].sort((a, b) => (a.id > b.id ? 1 : -1))
        case 'SORTING_ORDER_DOWN':
            return [...state].sort((a, b) => (b.id > a.id ? 1 : -1))
        default:
            return state
    }
}
