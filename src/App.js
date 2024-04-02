import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./components/List";
import { useGlobalContext } from "./components/context";
import {HiDocumentText} from  "react-icons/hi";

const App = () => {
  // Destructuring values from global context
  const {
    inputRef,
    tasks,
    setTasks,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
  } = useGlobalContext();

  // Function to add a new task or edit an existing one
  const addTask = (e) => {
    e.preventDefault();
    if (!name) {
      return;
    } else if (name && isEditing) {
      setTasks(
        tasks.map((task) => {
          return task.id === editId ? { ...task, name: name } : task;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
    } else {
      const newTask = {
        id: uuid().slice(0, 8),
        name: name,
        completed: false,
        color: "#009688",
      };
      setTasks([...tasks, newTask]);
      setName("");
    }
  };

  // Function to filter tasks based on completion status
  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  // Function to delete all tasks
  const deleteAll = () => {
    setTasks([]);
  };

  // Effect to focus on the input field and update localStorage when tasks change
  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  // Function to handle drag and drop reordering of tasks
  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  return (
    <div className="container">
      {/* Heading */}
      <h1 style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333', 
        fontSize: '28px', 
        marginBottom: '20px' 
      }}>
        <span style={{ marginRight: '10px' ,marginTop:'10px'}}>
          <HiDocumentText />
        </span>
        ToDo App
      </h1>
      {/* Form for adding/editing tasks */}
      <form className="head" onSubmit={addTask}>
        <input
          type="text"
          ref={inputRef}
          placeholder="New Task"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">{isEditing ? "Edit" : "Add Task"}</button>
      </form>
      {/* Filter buttons */}
      <div className="filter">
        <button
          data-filter="all"
          className={filter === "all" ? "active" : ""}
          onClick={filterTasks}
        >
          All
        </button>
        <button
          data-filter="completed"
          className={filter === "completed" ? "active" : ""}
          onClick={filterTasks}
        >
          Completed
        </button>
        <button
          data-filter="uncompleted"
          className={filter === "uncompleted" ? "active" : ""}
          onClick={filterTasks}
        >
          Uncompleted
        </button>
      </div>
      {/* Drag and drop context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* List of tasks */}
        {tasks.length > 0 ? (
          <List />
        ) : (
          <p className="no-tasks">Your list is clear!</p>
        )}
      </DragDropContext>
      {/* Button to delete all tasks */}
      {tasks.length > 2 && (
        <button
          className="btn-delete-all"
          onClick={deleteAll}
          title="Delete All Tasks (Completed and Uncompleted)!"
        >
          Clear All
        </button>
      )}
      {/* Footer */}
      <div className="footer">
        <p>
          &copy; {new Date().getFullYear()} Ayush Sharma. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default App;
