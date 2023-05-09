import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TodoAdd from './TodoAdd';
import '../component.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get('http://localhost:5001/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  };

/*   const handleTodoAdded = () => {
    fetchTodos();
  }; */
  const handleTodoAdded = (newTodo) => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };
  

  const handleTodoStateChanged = async (id, completed) => {
    await axios.put(`http://localhost:5001/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const handleTodoDelete = async (id) => {
    await axios.delete(`http://localhost:5001/todos/${id}`);
    fetchTodos();
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <h1 className='title'>TODO List</h1>
      <TodoAdd onTodoAdded={handleTodoAdded} />
      <ul className='list'>
        {pendingTodos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: 'none' }}>
            <Link to={`/todos/${todo.id}`}>
              <h3>{todo.title}</h3>
            </Link>
            <p>{todo.content}</p>
            <div className='todo-actions'>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleTodoStateChanged(todo.id, todo.completed)}
            />

            <span>Pending</span>
            <button className='deleteButton'  onClick={() => handleTodoDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
        {completedTodos.map((todo) => (
          <><li key={todo.id} style={{ textDecoration: 'line-through' }}>
            <h3>{todo.title}</h3>
            <p>{todo.content}</p>

          </li><div className='todo-actions'>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoStateChanged(todo.id, todo.completed)} />
              <span>Done</span>
              <button className='deleteButton' onClick={() => handleTodoDelete(todo.id)}>Delete</button>
            </div></>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
