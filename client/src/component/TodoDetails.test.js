import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import TodoDetails from './TodoDetails';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('TodoDetails', () => {
  test('displays todo details after fetching', async () => {
    const mockTodo = {
      id: '1',
      title: 'Test Title',
      content: 'Test Content',
      details: 'Test Details',
    };

    axios.get.mockResolvedValue({ data: mockTodo });

    render(
      <MemoryRouter initialEntries={[`/todos/${mockTodo.id}`]}>
        <Routes>
          <Route path="/todos/:id" element={<TodoDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await screen.findByText(mockTodo.title);
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.content)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.details)).toBeInTheDocument();
  });

  test('displays error message if fetching todo fails', async () => {
    const errorMessage = 'Failed to fetch todo';
    axios.get.mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter initialEntries={['/todos/1']}>
        <Routes>
          <Route path="/todos/:id" element={<TodoDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const errorElement = await screen.findByTestId('error-message');

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMessage);
  });
});
