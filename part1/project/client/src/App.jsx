import { useState, useEffect } from 'react'
import Todo from './Todo'
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading todos...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
        <p>DevOps with Kubernetes Project</p>
      </header>
      
      <main className="app-main">
        <div className="todos-container">
          <h2>My Todos ({todos.length})</h2>
          {todos.length === 0 ? (
            <p className="no-todos">No todos found</p>
          ) : (
            <div className="todos-list">
              {todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
