import { useState } from 'react'
import Todo from './Todo'
import { useTodos, useAddTodo } from './hooks/useTodos'

const App = () => {
  const [newTodo, setNewTodo] = useState('')
  const { data: todos = [], isLoading, error } = useTodos()
  const addTodoMutation = useAddTodo()

  const handleAddTodo = async event => {
    event.preventDefault()
    if (newTodo.length > 140) {
      return
    }
    try {
      await addTodoMutation.mutateAsync(newTodo)
      setNewTodo('')
    } catch (err) {
      console.error('Failed to add todo:', err)
    }
  }

  if (isLoading) return <div>Loading todos...</div>
  if (error) return <div>Error: {error.message}</div>

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
        <form onSubmit={handleAddTodo}>
          <input
            onChange={({ target }) => setNewTodo(target.value)}
            value={newTodo}
            maxLength="140"
            placeholder="Enter todo (max 140 characters)"
          />
          <span>{newTodo.length}/140</span>
          <button type="submit">Create todo</button>
        </form>
      </main>
    </div>
  )
}

export default App
