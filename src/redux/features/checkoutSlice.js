import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://immutable858-001-site1.atempurl.com/api";

const getJwtToken = () => {
  return localStorage.getItem("jwtToken");
};

export const fetchCheckoutData = createAsyncThunk(
  "checkout/FormData",
  async (formData) => {
    try {
      const token = getJwtToken();

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(`${baseUrl}/Checkout`, formData, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to submit form data");
    }
  }
);

export const fetchCountryData = createAsyncThunk(
  "checkout/Country",
  async (_, thunkAPI) => {
    try {
      const token = getJwtToken();

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${baseUrl}/Country`, { headers });

      return response?.data;
    } catch (error) {
      console.error("Error fetching country data:", error.message);
      throw error;
    }
  }
);

export const fetchProvinceData = createAsyncThunk(
  "checkout/Province",
  async (_, thunkAPI) => {
    try {
      const token = getJwtToken();

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${baseUrl}/Province`, { headers });

      return response?.data;
    } catch (error) {
      console.error("Error fetching province data:", error.message);
      throw error;
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    status: "idle",
    error: null,
    formData: null, 
    country: null, 
    province: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //formdata
      .addCase(fetchCheckoutData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCheckoutData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formData = action.payload;
      })
      .addCase(fetchCheckoutData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      ///country
      .addCase(fetchCountryData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountryData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.country = action.payload;
      })
      .addCase(fetchCountryData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //Province
      .addCase(fetchProvinceData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProvinceData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.province = action.payload;
      })
      .addCase(fetchProvinceData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default checkoutSlice.reducer;
