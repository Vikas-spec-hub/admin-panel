import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// Create the counterSlice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Increment
    increment: (state) => {
      state.value += 1;
    },
    // Decrement
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Export the actions
export const { increment, decrement } = counterSlice.actions;

// Export the reducer
export default counterSlice.reducer;
