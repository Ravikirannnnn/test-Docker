import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    data: [], // Initial state for courses data
  },
  reducers: {
    setCourses: (state, action) => {
      state.data = action.payload; // Update the courses data
    },
  },
});

export const { setCourses } = coursesSlice.actions;

export default coursesSlice.reducer;