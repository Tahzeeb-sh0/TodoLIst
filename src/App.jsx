import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './index.css';
import Navbar from './Components/Navbar';
import LocomotiveScroll from 'locomotive-scroll';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const saveToLs = (todosToSave) => {
    localStorage.setItem("todos", JSON.stringify(todosToSave));
  }

  const handleAdd = () => {
    if (todo.trim() === "") {
      alert("Please enter a todo");
      return;
    }
    const newTodo = { id: uuidv4(), value: todo, isCompleted: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo("");
    saveToLs(newTodos);
  }

  const handleEdit = (e) => {
    const id = e.currentTarget.name;
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return;
    const newValue = prompt("Edit Todo", todoToEdit.value);
    if (newValue === null) return;
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, value: newValue || todo.value } : todo
    );
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  }

  const handleDelete = (e) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      const id = e.currentTarget.name;
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      saveToLs(newTodos);
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    const updatedTodos = todos.map((todo) => 
      todo.id === name ? { ...todo, isCompleted: checked } : todo
    );
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  }

  return (
    <>
      <Navbar />
      <div className=" mx-auto m-auto sm:w-3/4  md:w-1/2 my-8 h-screen rounded-2xl p-5 text-center bg-violet-100 overflow-y-scroll shadow-xl scroll-smooth">
        <div className="todoAdd ">
          <h2 className="text-xl font-bold text-center my-3 flex justify-center items-center">Manage your tasks</h2>
          <input
            onChange={handleChange}
            placeholder='Add a new task...'
            onKeyDown={(e) => {e.key=='Enter'?handleAdd():null}}
            value={todo}
            className="text-sm sm:text-base sm:w-3/4 bg-white rounded-xl w-1xl p-2 drop-shadow-lg"
            type="text"
          />
          <button onClick={handleAdd} className="bg-violet-600 drop-shadow-md hover:bg-violet-700 p-3 py-1 rounded-md m-4">
            Save
          </button>
        </div>
        <div className="todo">
          <h1 className="font-bold my-3">Your Todos</h1>
          <div className="Todos">
            {todos.map((todo) => (
              <div key={todo.id} className="sm:flex-row justify-between p-3 bg-violet-200 rounded-md my-2 drop-shadow-md">
                <div className="flex">
                  <input
                    type="checkbox"
                    name={todo.id}
                    onChange={handleCheckBox}
                    className="m-3"
                  />
                  <div className={ `rounded-md overflow-hidden break-words whitespace-normal ${todo.isCompleted?'line-through':''} ` }>
                    {todo.value}
                  </div>
                </div>
                <div className="buttons flex">
                  <button
                    onClick={handleEdit}
                    name={todo.id}
                    className="bg-violet-600 drop-shadow-md hover:bg-violet-700 p-3 py-1 rounded-md m-1 sm:p-2 sm:text-sm"
                  >
                    <MdEditDocument />
                  </button>
                  <button
                    onClick={handleDelete}
                    name={todo.id}
                    className="bg-violet-600 drop-shadow-md hover:bg-violet-700 p-3 py-1 rounded-md m-1"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
