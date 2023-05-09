import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../component.css';

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleGoBack = () => {
    navigate('/'); 
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='selectedTodo'>
      <h1>{todo.title}</h1>
      <p>{todo.content}</p>
      <p>{todo.details}</p>
      <button onClick={handleGoBack}>Back</button>
      {/* <p>Status: {todo.completed ? 'Done' : 'Pending'}</p> */}
    </div>
  );
};

export default TodoDetails;
