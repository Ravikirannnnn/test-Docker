// userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL4002, API_URL4008 } from '../Service/ApiService';
import axios from 'axios';

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({ "user_id": user_id });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch(API_URL4002 + "getUserProfile", requestOptions);
      const data = await response.json();
      if (response.ok) {
        return data; // Success case: return user profile data
      } else {
        return rejectWithValue(data); // Error case: return error message
      }
    } catch (error) {
      return rejectWithValue(error.message); // Network error
    }
  }
);

// Async thunk to fetch Stripe pricing (only once)
export const fetchPricing = createAsyncThunk(
  'user/fetchPricing',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching pricing...');
      
      // Fetch user's public IP
      const ipResponse = await axios.get("https://api64.ipify.org?format=json");
      const userIp = ipResponse.data.ip;

      // Get pricing data from backend
      const response = await axios.post(API_URL4008+"get-stripe-pricing", { ip: userIp });
      console.log('this is price',response)
      return response.data.pricing; // Return pricing data
      
    } catch (error) {
      console.error("Error fetching pricing:", error);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    pricing: null, // Add pricing state
    loading: false,
    error: null,
    pricingLoading: false,
    pricingError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch pricing
      .addCase(fetchPricing.pending, (state) => {
        state.pricingLoading = true;
        state.pricingError = null;
      })
      .addCase(fetchPricing.fulfilled, (state, action) => {
        state.pricingLoading = false;
        state.pricing = action.payload; // Store pricing data
      })
      .addCase(fetchPricing.rejected, (state, action) => {
        state.pricingLoading = false;
        state.pricingError = action.payload;
      });
  },
});

export default userSlice.reducer;
