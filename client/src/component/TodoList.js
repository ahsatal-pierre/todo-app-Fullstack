import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoAdd from './TodoAdd';
import TodoDetails from './TodoDetails';
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

  const [expandedTodoId, setExpandedTodoId] = useState(null);

  const handleTodoClick = (id) => {
    setExpandedTodoId(id === expandedTodoId ? null : id);
  };

  return (
    <div>
      <TodoAdd onTodoAdded={handleTodoAdded} />
      <ul className='list'>
        {pendingTodos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: 'none' }}>
            <h3 onClick={() => handleTodoClick(todo.id)}>{todo.title}</h3>
            {expandedTodoId === todo.id && <p>{todo.content}</p>}
            <div className='todo-actions'>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoStateChanged(todo.id, todo.completed)}
              />
              <span>Pending</span>
              <button className='deleteButton' onClick={() => handleTodoDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
        {completedTodos.map((todo) => (
          <>
            <li key={todo.id} style={{ textDecoration: 'line-through' }}>
              <h3 onClick={() => handleTodoClick(todo.id)}>{todo.title}</h3>
              {expandedTodoId === todo.id && <p>{todo.content}</p>}
            </li>
            <div className='todo-actions'>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoStateChanged(todo.id, todo.completed)}
              />
              <span>Done</span>
              <button className='deleteButton' onClick={() => handleTodoDelete(todo.id)}>Delete</button>
            </div>
          </>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
