import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/todos/${id}`);
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

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
