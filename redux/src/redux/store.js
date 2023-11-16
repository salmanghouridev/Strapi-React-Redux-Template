import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './path/to/your/todoSlice';
import todoReducer from '../slices/productSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
