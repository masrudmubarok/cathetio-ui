import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Fetch Todo from API
export const getTodo = createAsyncThunk("todo/getTodo", async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
});

// Add a New Todo
export const addTodo = createAsyncThunk("todo/addTodo", async (newTodo) => {
  const response = await axios.post(API_URL, newTodo);
  return response.data;
});

// Delete a Todo
export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`); // Use template literals (backticks) for string interpolation
  return id; // Return the id of the deleted todo
});

// Update a Todo
export const updateTodo = createAsyncThunk("todo/updateTodo", async (updatedTodo) => {
  const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo); // Use template literals (backticks) for string interpolation
  return response.data; // Return the updated todo data
});

// Initial State
const initialState = {
  todoList: [],
  filterStatus: "all",
};

// Create Todo Slice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodo.fulfilled, (state, action) => {
        state.todoList = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todoList.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todoList = state.todoList.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      });
  },
});

// Export Actions and Reducer
export const { updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;