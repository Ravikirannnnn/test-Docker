import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL4004 } from "../Service/ApiService";

// Async thunk for fetching lessons
export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async ({ sub_Cat_ids }, { getState, rejectWithValue }) => {
    const { user_id, accessToken } = {
      user_id: localStorage.getItem("user_id"),
      accessToken: localStorage.getItem("accessToken"),
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const raw = JSON.stringify({
      category_id: sub_Cat_ids,
      user_id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${API_URL4004}getLessonsNewFlow`,
        requestOptions
      );
      const result = await response.json();

      console.log(result);
      

      if (result.Status) {
        return result; // Resolve with the data
      } else {
        return rejectWithValue(result); // Reject with error response
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const lessonsSlice = createSlice({
    name: "lessons",
    initialState: {
      data1: null, // Store the entire response here
      lessons: [], // Store just the lessons array
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLessons.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLessons.fulfilled, (state, action) => {
          state.loading = false;
          state.data1 = action.payload; // Store the full response
          state.lessons = action.payload.lessons || []; // Extract lessons if available
        })
        .addCase(fetchLessons.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong.";
        });
    },
  });
  

export default lessonsSlice.reducer;
