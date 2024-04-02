import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { useGlobalContext } from "./context";
import "../App.css"

const Task = ({ id, name, completed, color, index }) => {
  // Accessing necessary functions from global context
  const { removeTask, toggleDone, editTask } = useGlobalContext();

  return (
    // Draggable component for drag-and-drop functionality
    <Draggable key={id} draggableId={"draggable-" + id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef} // Reference to the draggable item
          {...provided.draggableProps} // Props provided by Draggable for the item
          {...provided.dragHandleProps} // Props for the draggable handle
          style={{
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 5rem #666" : "none", // Add shadow effect when dragging
            opacity: snapshot.isDragging ? "1" : provided.draggableProps.style.opacity, // Change opacity when dragging
            backgroundColor: color, // Set background color
          }}
          className={`task ${completed && "task-done"}`} // Apply completed style if task is completed
        >
          <p>{name}</p> {/* Task name */}
          {/* Button to toggle task completion */}
          <button onClick={() => toggleDone(id)}>
            {completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </button>
          {/* Button to remove task */}
          <button onClick={() => removeTask(id)}>
            <FiTrash />
          </button>
          {/* Button to edit task */}
          <button onClick={() => editTask(id)}>
            <FiEdit />
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
