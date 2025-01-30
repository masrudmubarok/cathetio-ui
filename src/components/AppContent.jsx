import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList) || [];
  const sortedTodoList = todoList.slice().sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <div>
      {sortedTodoList.length > 0 
        ? sortedTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : 'No todo found'}
    </div>
  );
}

export default AppContent;