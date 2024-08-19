// components/TodoList.js
"use client";
import React from 'react';


const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          <span onClick={() => onToggle(todo._id)}>{todo.text}</span>
          <button className="edit" onClick={() => onEdit(todo._id)}>Edit</button>
          <button className="delete" onClick={() => onDelete(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;



