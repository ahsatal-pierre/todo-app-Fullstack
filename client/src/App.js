import React from 'react';

import "./App.css";
import TodoList from "./component/TodoList";
import Timer from './component/Timer';

const App = () => {
  return (
    <>
    <h1 className='title'>TODO List</h1>
    <Timer />
    <TodoList />
    </>
    
  );
};

export default App;

