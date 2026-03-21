import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: false,
  },

  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },

    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((t) =>
        t._id === action.payload._id ? action.payload : t
      );
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (t) => t._id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setLoading,
} = todoSlice.actions;

export default todoSlice.reducer;