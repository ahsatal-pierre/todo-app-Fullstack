/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import TodoAdd from './TodoAdd';

jest.mock('axios');

describe('TodoAdd', () => {
  test('submits form with correct values and calls onTodoAdded callback', async () => {
    const mockTodo = {
      title: 'Test Title',
      content: 'Test Content',
      details: 'Test Details',
    };

    axios.post.mockResolvedValue({ data: mockTodo });

    const onTodoAdded = jest.fn();

    render(<TodoAdd onTodoAdded={onTodoAdded} />);

    const titleInput = screen.getByPlaceholderText('Title - required');
    const contentInput = screen.getByPlaceholderText('Content');
    const detailsInput = screen.getByPlaceholderText('Details');
    const addButton = screen.getByText('Add Todo');

    fireEvent.change(titleInput, { target: { value: mockTodo.title } });
    fireEvent.change(contentInput, { target: { value: mockTodo.content } });
    fireEvent.change(detailsInput, { target: { value: mockTodo.details } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/todos', {
        title: mockTodo.title,
        content: mockTodo.content,
        details: mockTodo.details,
      });
      expect(onTodoAdded).toHaveBeenCalledTimes(1);
      expect(onTodoAdded).toHaveBeenCalledWith(mockTodo);
      expect(titleInput.value).toBe('');
      expect(contentInput.value).toBe('');
      expect(detailsInput.value).toBe('');
    });
  });
});
