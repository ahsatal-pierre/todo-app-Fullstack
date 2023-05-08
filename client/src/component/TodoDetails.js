import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/todos/${id}`);
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching todo:', error);
      setError(error.message);
    }
  };

  if (error) {
    return <div data-testid="error-message">{error}</div>; // Render error message element
  }

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.content}</p>
      <p>{todo.details}</p>
      {/* <p>Status: {todo.completed ? 'Done' : 'Pending'}</p> */}
    </div>
  );
};

export default TodoDetails;
