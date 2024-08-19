"use client";
import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import Popup from '../components/Popup';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      showPopupMessage('Failed to fetch todos.', 'error');
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        await fetchTodos(); // ดึงข้อมูลใหม่
        showPopupMessage('Todo added successfully!', 'success');
      } else {
        showPopupMessage('Failed to add todo.', 'error');
      }
    } catch (error) {
      showPopupMessage('An error occurred while adding todo.', 'error');
    }
  };

  const editTodo = async (id, newText, completed) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, newText, completed }),
      });
      if (response.ok) {
        await fetchTodos(); // ดึงข้อมูลใหม่
        setEditingTodo(null);
        showPopupMessage('Todo updated successfully!', 'success');
      } else {
        showPopupMessage('Failed to update todo.', 'error');
      }
    } catch (error) {
      showPopupMessage('An error occurred while updating todo.', 'error');
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(todo => todo._id === id);
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, newText: todo.text, completed: !todo.completed }),
      });
      if (response.ok) {
        await fetchTodos(); // ดึงข้อมูลใหม่
        showPopupMessage('Todo status toggled!', 'success');
      } else {
        showPopupMessage('Failed to toggle todo status.', 'error');
      }
    } catch (error) {
      showPopupMessage('An error occurred while toggling todo status.', 'error');
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleteId: id }),
      });
      if (response.ok) {
        await fetchTodos(); // ดึงข้อมูลใหม่
        if (editingTodo && editingTodo._id === id) {
          setEditingTodo(null);
        }
        showPopupMessage('Todo deleted successfully!', 'success');
      } else {
        showPopupMessage('Failed to delete todo.', 'error');
      }
    } catch (error) {
      showPopupMessage('An error occurred while deleting todo.', 'error');
    }
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo._id === id);
    setEditingTodo(todoToEdit);
  };

  const showPopupMessage = (message, status) => {
    // status can be 'success' or 'error'
    setPopupMessage({ text: message, status });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // ปิด Popup หลังจาก 3 วินาที
  };

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <TodoForm onAdd={addTodo} onEdit={editTodo} editingTodo={editingTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={handleEdit} />
      {showPopup && 
        <Popup 
          message={popupMessage.text} 
          onClose={() => setShowPopup(false)}
          className={`popup ${popupMessage.status}`} 
        />
      }
    </div>
  );
};

export default Home;
