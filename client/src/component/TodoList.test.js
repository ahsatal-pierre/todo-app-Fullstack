/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';


import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import TodoList from './TodoList';

jest.mock('axios');
axios.get.mockResolvedValue({ data: [] });
axios.put.mockResolvedValue();

describe('TodoList', () => {
    test('renders component without errors', () => {
      render(<BrowserRouter><TodoList /></BrowserRouter>);
    });

  test('fetches and displays todos', async () => {
    const todos = [
      { id: 1, title: 'Todo 1', content: 'Content 1', completed: false },
      { id: 2, title: 'Todo 2', content: 'Content 2', completed: true },
    ];

    axios.get.mockResolvedValue({ data: todos });

    render(<BrowserRouter><TodoList /></BrowserRouter>);

    await screen.findByText(/Todo 1/i);
    await screen.findByText(/Todo 2/i);

    todos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
      expect(screen.getByText(todo.content)).toBeInTheDocument();
    });
  });

  test('adds a new todo', async () => {
    const newTodo = { id: 3, title: 'New Todo', content: 'New Content', completed: false };

    axios.post.mockResolvedValue({ data: newTodo });

    render(<BrowserRouter><TodoList /></BrowserRouter>);

    await screen.findByText(/Todo List/i);

    fireEvent.click(screen.getByText('Add Todo'));
    fireEvent.change(screen.getByPlaceholderText('Title - required'), { target: { value: newTodo.title } });
    fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: newTodo.content } });
    fireEvent.click(screen.getByText('Add Todo'));

    await screen.findByText(newTodo.title);
    expect(screen.getByText(newTodo.content)).toBeInTheDocument();
  });

  test('updates the state of a todo', async () => {
    const todos = [
      { id: 1, title: 'Todo 1', content: 'Content 1', completed: false },
      { id: 2, title: 'Todo 2', content: 'Content 2', completed: true },
    ];

    axios.get.mockResolvedValue({ data: todos });

    render(<BrowserRouter><TodoList /></BrowserRouter>);

    await screen.findByText(/Todo 1/i);

    await screen.findByText(/Todo 1/i);

    await act(async () => {
      const todo1Checkbox = screen.getByText('Todo 1').closest('li').querySelector('input[type="checkbox"]');
      fireEvent.click(todo1Checkbox);
    });

    expect(axios.put).toHaveBeenCalledWith('http://localhost:5000/1', { completed: true });
  });
});
