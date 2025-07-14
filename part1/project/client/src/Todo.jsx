const Todo = ({ todo }) => {
  return (
    <div className="todo-item">
      <div className="todo-content">
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.text}
        </span>
        <div className="todo-meta">
          <span className="todo-status">
            {todo.completed ? '✅ Completed' : '⏳ Pending'}
          </span>
          <span className="todo-date">
            {new Date(todo.createdat).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Todo
