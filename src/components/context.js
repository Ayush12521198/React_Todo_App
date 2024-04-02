import React, { useState, useContext, useRef } from "react";
import "../App.css";

// Function to retrieve tasks from local storage
const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Creating a context object
const AppContext = React.createContext(null);

// Context provider component
const AppProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(getTasks()); // State for tasks
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const [editId, setEditId] = useState(null); // State for the ID of the task being edited
  const [name, setName] = useState(""); // State for the task name
  const [filter, setFilter] = useState("all"); // State for current filter
  const [location, setLocation] = useState({}); // State for location data
  const refContainer = useRef(null); // Ref for input field

  // Function to remove a task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to toggle the completion status of a task
  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to prepare for editing a task
  const editTask = (id) => {
    const { name } = tasks.find((task) => task.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(name);
    inputRef.current.focus();
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        removeTask,
        toggleDone,
        refContainer,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        editTask,
        name,
        setName,
        getTasks,
        filter,
        setFilter,
        inputRef,
        location,
        setLocation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context object
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
