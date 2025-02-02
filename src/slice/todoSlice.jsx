import { createSlice } from '@reduxjs/toolkit';

// Function to get the initial todo list from storage, or initialize it if it doesn't exist
const getInitialTodo = () => {
    const storageTodoList = window.storage.getItem('todoList');  // Attempt to retrieve the 'todoList' from storage
    if(storageTodoList){
        return JSON.parse(storageTodoList);   // If a todo list exists in storage, parse and return it
    }
    window.storage.setItem('todoList', JSON.stringify([]));    // If no todo list exists, initialize an empty list in storage
    return [];  // Return an empty list if none is found
};

// Initial state for the todo slice, which includes a filter status and the todo list fetched from storage
const initialValue = {
    filterStatus: 'all',  // Default filter status set to 'all'
    todoList: getInitialTodo()  // Set the initial todo list from storage
};

// Creating the 'todo' slice using Redux Toolkit's createSlice method
export const todoSlice = createSlice({
    name: 'todo',  // The name of the slice
    initialState: initialValue,  // Setting the initial state defined earlier
    reducers: {
        // Reducer to add a new todo item to the state and storage
        addTodo: (state, action) => {
            state.todoList.push(action.payload);    // Add the new todo item to the Redux state
            
            const todoList = window.storage.getItem('todoList');
            if(todoList) {
                const todoListArr = JSON.parse(todoList);  // Parse the existing todo list from storage
                todoListArr.push({ ...action.payload });   // Add the new todo item to the list in storage
                window.storage.setItem('todoList', JSON.stringify(todoListArr));  // Save the updated list back to storage
            } else {
                window.storage.setItem('todoList', JSON.stringify([{ ...action.payload }]));  // If no list exists, create a new list with the new todo item
            }
        },
        // Reducer to delete a todo item from the state and storage
        deleteTodo: (state, action) => {
            const todoList = window.storage.getItem('todoList');
            if(todoList) {
                const todoListArr = JSON.parse(todoList);  // Retrieve the existing todo list from storage
                todoListArr.forEach((todo, index) => {
                    if(todo.id === action.payload) {  // Find the todo item to delete by its ID
                        todoListArr.splice(index, 1);  // Remove the item from the array
                    }
                });
                window.storage.setItem('todoList', JSON.stringify(todoListArr));  // Save the updated list to storage
                state.todoList = todoListArr;  // Update the Redux state with the new list
            }
        },
        // Reducer to update a todo item in both the state and storage
        updateTodo: (state, action) => {
            const todoList = window.storage.getItem('todoList');
            if(todoList) {
                const todoListArr = JSON.parse(todoList);  // Retrieve the existing todo list from storage
                todoListArr.forEach((todo, index) => {
                    if(todo.id === action.payload.id) {  // Find the todo item to update by its ID
                        todo.title = action.payload.title;
                        todo.description = action.payload.description;
                        todo.status = action.payload.status;  // Update the item's properties
                    }
                });
                window.storage.setItem('todoList', JSON.stringify(todoListArr));  // Save the updated list to storage
                state.todoList = todoListArr;  // Update the Redux state with the modified list
            }
        },
        // Reducer to update the filter status in the state
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;  // Update the filter status in the Redux state
        },
    },
});

// Export the actions to be used in components
export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } = todoSlice.actions;   

// Export the reducer to be used in the Redux store
export default todoSlice.reducer;