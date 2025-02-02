import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';
import style from '../styles/modules/app.module.scss';

const container = {
  hidden: { opacity: 1},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const child = {
  hidden: { y: 20, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
  }
};

function AppContent() {
  // Retrieve the todo list from Redux store, or set an empty array if it's undefined
  const todoList = useSelector((state) => state.todo.todoList) || [];

  // Retrieve the filter status from Redux store
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  // Create a sorted copy of the todo list, ordering items by time (newest first)
  const sortedTodoList = todoList.slice().sort((a, b) => new Date(b.time) - new Date(a.time));

  // Filter the sorted todo list based on the selected filter status
  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true; // Show all items if the filter is set to 'all'
    }
    return item.status === filterStatus; // Show only items that match the selected status
  });

  return (
    <motion.div 
      className={style.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
      {/* Render the filtered todo list if there are items, otherwise display a message */}
      {filteredTodoList.length > 0 
        ? filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : (
        <motion.p className={style.emptyText} variant={child}> 
          No Task Found
        </motion.p>
      )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;