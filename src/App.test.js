import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { useStoreValue } from './store/store';

// Clean up after each test and reset Zustand store
afterEach(() => {
  cleanup();
  // Reset Zustand store
  useStoreValue.getState().setInputValue([]);
});

describe('Todo List App', () => {
  it('should add a new item', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new item and press Enter...');
    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('should toggle todo completion', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new item and press Enter...');
    
    // Add a todo
    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Toggle completion - get the checkbox for this specific todo
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    // Check if task is marked as completed (has line-through and text-gray-500)
    const todoText = screen.getByText('Test task');
    expect(todoText).toHaveClass('line-through');
    expect(todoText).toHaveClass('text-gray-500');
  });

  it('should delete a todo item', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new item and press Enter...');
    
    // Add a todo
    fireEvent.change(input, { target: { value: 'Task to delete' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Delete the todo - find delete button within the same container as the task
    const todoContainer = screen.getByText('Task to delete').closest('div');
    const deleteButton = todoContainer.querySelector('button');
    fireEvent.click(deleteButton);
    
    // Check if todo is removed
    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
  });

  it('should show correct statistics', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new item and press Enter...');
    
    // Add two todos
    fireEvent.change(input, { target: { value: 'Todo 1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    fireEvent.change(input, { target: { value: 'Todo 2' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Complete one todo
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    // Check statistics using more flexible text matching
    expect(screen.getByText(/Total:\s*2/)).toBeInTheDocument();
    expect(screen.getByText(/Completed:\s*1/)).toBeInTheDocument();
    expect(screen.getByText(/Pending:\s*1/)).toBeInTheDocument();
  });

  it('should clear all todos', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new item and press Enter...');
    
    // Add a todo
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Clear all
    const clearAllButton = screen.getByText('Clear All');
    fireEvent.click(clearAllButton);
    
    // Check if empty message is shown
    expect(screen.getByText('No items yet. Add one above!')).toBeInTheDocument();
  });
});
