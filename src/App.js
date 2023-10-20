import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos.length > 0){
      setTodos(storedTodos)
    }
  } , [])


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo(text){
    setTodos([...todos, text])
  }

  function removeTodo(index){
    setTodos(todos.filter((todo, i) => i !== index))
  }

  function editTodo(index, text){
    const newTodos = [...todos]
    newTodos[index] = text
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h1>Todo list</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        addTodo(event.target.elements.todo.value)
        event.target.elements.todo.value = ''
      }}>
        <input  type="text" name="todo"/>
        <button type="submit">Add TO DO</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input type="text" value={todo} onChange={(event) => editTodo(index, event.target.value)}/>
            <button onClick={() => removeTodo(index)}>Remove </button> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
