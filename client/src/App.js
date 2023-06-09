import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoList from "./component/TodoList";
import TodoDetails from './component/TodoDetails';
import Timer from './component/Timer';

const App = () => {
  return (
    <Router>
      <Timer/>
      <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/todos/:id" element={<TodoDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

