import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action
export const fetchTodos = createAsyncThunk('fetchTodos', async (_, { getState }) => {
  // Retrieve the token from the state if needed
  const token = "e1b60fa6c62f7de7bdbbc33fd77b39586d20e497a56028493adfd318ebff4c01748f1005d098ccca1a55864cc5beed3e9d39cdde6f3df8c8b95bacfa714cde88f330068a69a3cd88f1c1506d5f89b271e76eebee83635b8dd42623cc0e608ad75ece4ea7232b8c138571e405ac66f0dce9fddf9b10f45ab86fdd64e2dde89243";

  const headers = {
    Authorization: `Bearer ${token}`, // Include your token here
  };

  try {
    const response = await fetch('http://localhost:1337/api/products?populate=*', {
      headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  reducers: {}, // Add your reducers here if needed
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
      state.isError = false; // Reset error state when starting a new request
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false; // Reset error state on successful response
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default todoSlice.reducer;
