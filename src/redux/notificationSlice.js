import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL4005 } from '../Service/ApiService';

// Create an async thunk to handle the notification fetch logic
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    const user_id = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('accessToken');
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    
    const raw = JSON.stringify({ user_id });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(API_URL4005+"getNotification", requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const result = await response.json(); // assuming the response is in JSON
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default notificationSlice.reducer;
