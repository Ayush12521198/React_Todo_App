import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "./context";
import Task from "./Task";
import "../App.css"

const List = () => {
    // Accessing tasks and filter from global context
    const { tasks, filter } = useGlobalContext();
  
    let filtred = [...tasks]; // Copying tasks to a new array
  
    // Filtering tasks based on the selected filter
    switch (filter) {
      case "all":
        filtred = [...tasks];
        break;
      case "completed":
        filtred = tasks.filter((task) => task.completed);
        break;
      case "uncompleted":
        filtred = tasks.filter((task) => !task.completed);
        break;
      default:
        filtred = [...tasks];
        break;
    }
  
    return (
      // Droppable component for drag-and-drop functionality
      <Droppable droppableId='droppable-1'>
        {(provided, snapshot) => (
          <ul
            className='tasks-wrapper' // CSS class for styling
            ref={provided.innerRef} // Reference to the droppable container
            {...provided.droppableProps} // Props provided by Droppable
          >
            {/* Mapping through filtered tasks and rendering Task components */}
            {filtred.map((task, i) => (
              <Task key={task.id} {...task} index={i} /> // Task component with key and props
            ))}
            {provided.placeholder} {/* Placeholder for maintaining layout during drag-and-drop */}
          </ul>
        )}
      </Droppable>
    );
  };
  
  export default List;
