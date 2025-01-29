import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
    const localTodoList = window.localStorage.getItem('todoList');
    if(localTodoList){
        return JSON.parse(localTodoList);   // Retrieve and parse the stored todo list if available
    }
    window.localStorage.setItem('todoList', JSON.stringify([]));    // Initialize an empty todo list in localStorage if none exists
    return [];
};

const initialValue = {
    todoList: getInitialTodo()  // Set the initial state of the todo list from localStorage
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);    // Add new todo to the Redux state
            
            const todoList = window.localStorage.getItem('todoList');
            if(todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({ ...action.payload });    // Append new todo item to the localStorage list
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
            } else {
                window.localStorage.setItem('todoList', JSON.stringify([{ ...action.payload }]));  // Create new list if none exists
            }
        },
    },
});

export const { addTodo } = todoSlice.actions;   // Export action for adding todos
export default todoSlice.reducer;              // Export reducer to be used in the store