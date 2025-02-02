import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';
import style from '../styles/modules/app.module.scss';
import { getTodo } from '../slice/todoSlice';

// Animation container settings for motion elements
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation for each child element
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// Function to format date and time into a readable string
const formatDateTime = (date) => {
  const d = new Date(date);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // 12-hour format
  };
  return d.toLocaleString(undefined, options); // Returns formatted date string, e.g., "2/2/2025, 4:20:58 PM"
};

function AppContent() {
  const dispatch = useDispatch();

  // Retrieve todoList from Redux store
  const todoList = useSelector((state) => state.todo.todoList);

  // Retrieve filter status from Redux store
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  // Dispatch getTodo to fetch data on initial render
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  // Format todoList items by adding a formatted 'time' property
  const formattedTodoList = todoList.map((todo) => ({
    ...todo,
    time: formatDateTime(todo.date), // Add 'time' property with formatted date
  }));

  // Sort todoList by date in descending order
  const sortedTodoList = Array.isArray(formattedTodoList)
    ? formattedTodoList.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  // Filter todoList based on the status filter
  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={style.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {/* Render todo items if available, else show 'No Task Found' */}
        {filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        ) : (
          <motion.p className={style.emptyText} variants={child}>
            No Task Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;