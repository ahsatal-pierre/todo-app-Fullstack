import React, { useState } from 'react';
import axios from 'axios';
import '../component.css';

const TodoAdd = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [details, setDetails] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

let counter = 6; 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newTodo = {
      title: title,
      content: content,
      details: details, 
      id: counter,
    };
  counter += 1

    axios
      .post('http://localhost:5001/todos', newTodo)
      .then((response) => {
        onTodoAdded(response.data);
        console.log("response.data:" , response.data)
        setTitle('');
        setContent('');
        setDetails('');
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };

  return (
    <div className='addingTodo'>
      <div className='formTitle'>{"Add a new task: "}</div>  
    <form className='formBox' onSubmit={handleSubmit}>

      <input className='form' type="text" placeholder="Title - required" value={title} onChange={handleTitleChange} required />
      <textarea className='form' placeholder="Content" value={content} onChange={handleContentChange} />
      <textarea className='form' placeholder="Details" value={details} onChange={handleDetailsChange} />
      <button className='formButton' type="submit">Add Todo</button>
    </form>
    </div>
  );
};

export default TodoAdd;
