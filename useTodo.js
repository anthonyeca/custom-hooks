import { todoReducer } from '../08-useReducer/todoReducer'
import { useEffect, useReducer } from 'react'

export const useTodo = () => {
  const initialState = []

  const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
  }

  const [todos, dispatch] = useReducer(todoReducer, initialState, init)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    }
    dispatch(action)
  }

  const handleDeleteTodo = (id) => {
    const action = {
      type: '[TODO] Remove Todo',
      payload: id,
    }
    dispatch(action)
  }
  const handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    })
  }

  const totalTodo = (todos) => {
    return `TodoApp: ${todos.length} `
  }

  const pendingTodo = (todos) => {
    return `Pendientes: ${todos.filter((todo) => todo.done != true).length}`
  }

  return {
    todos,
    handleDeleteTodo,
    handleToggleTodo,
    handleNewTodo,
    totalTodo,
    pendingTodo,
  }
}
