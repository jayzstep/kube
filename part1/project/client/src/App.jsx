import axios from 'axios'
import { useState, useEffect } from 'react'
import Todo from './Todo'

const App = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos')
      setTodos(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading todos...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <header>
        <img src="/api/picture" alt="random picture" />
        <h1>Todo App</h1>
        <p>DevOps with Kubernetes Project</p>
      </header>

      <main>
        <div>
          <h2>My Todos ({todos.length})</h2>
          {todos.length === 0 ? (
            <p>No todos found</p>
          ) : (
            <div>
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
