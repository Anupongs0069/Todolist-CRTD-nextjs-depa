"use client"
import { useState, useEffect, useRef } from 'react';

const TodoForm = ({ onAdd, onEdit, editingTodo }) => {
  const [text, setText] = useState(editingTodo ? editingTodo.text : '');
  const [isEditing, setIsEditing] = useState(!!editingTodo);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // ทำให้เคอร์เซอร์อยู่ที่ช่องกรอกข้อมูลเมื่อเปิดฟอร์ม
    }
  }, [editingTodo]);

  useEffect(() => {
    setText(editingTodo ? editingTodo.text : '');
    setIsEditing(!!editingTodo);
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      return; // ป้องกันการส่งข้อมูลว่าง
    }
    if (isEditing) {
      await onEdit(editingTodo._id, text, editingTodo.completed);
    } else {
      await onAdd(text);
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        required
        ref={inputRef} // ใช้ ref เพื่อเข้าถึง DOM element
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default TodoForm;
