import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL4010 } from '../Service/ApiService';


// Async thunk for fetching school profile
export const fetchSchoolProfile = createAsyncThunk(
  "schoolProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("accessToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({ user_id });

      const response = await fetch(API_URL4010 + "get_SchoolProfile", {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      });

      const result = await response.json();
      console.log(result,'skkks')
      if (result.status) {
        return result.response;
      } else {
        return rejectWithValue(result.message || "Failed to fetch school profile");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching school profile");
    }
  }
);

// Redux slice
const schoolProfileSlice = createSlice({
  name: "schoolProfile",
  initialState: {
    data: [],
    designationNames: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.designationNames = action.payload.flatMap((item) =>
          item.credentialData
            .filter((cred) => cred.isApproval)
            .map((cred) => cred.designationName)
        );
      })
      .addCase(fetchSchoolProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = schoolProfileSlice.actions;

export default schoolProfileSlice.reducer;
