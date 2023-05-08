import React, { useState } from 'react';
import axios from 'axios';

const TodoAdd = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [details, setDetails] = useState('');
//  const [completed, setCompleted] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

/*    const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };  */

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title: title,
      content: content,
      details: details, 
   //   completed: false
   //   completed: completed
    };

    axios
      .post('http://localhost:5000/todos', newTodo)
      .then((response) => {
        onTodoAdded(response.data);
        console.log("response.data:" , response.data)
        setTitle('');
        setContent('');
        setDetails('');
    //    setCompleted(false);
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title - required" value={title} onChange={handleTitleChange} required />
      <textarea placeholder="Content" value={content} onChange={handleContentChange} />
      <textarea placeholder="Details" value={details} onChange={handleDetailsChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoAdd;
