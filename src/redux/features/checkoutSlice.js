import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCheckoutData = createAsyncThunk(
  "checkout/FormData",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://immutable858-001-site1.atempurl.com/api/Checkout",
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to submit form data");
    }
  }
);

export const fetchCountryData = createAsyncThunk(
  "checkout/Country",
  async () => {
    try {
      const response = await axios.get(
        "http://immutable858-001-site1.atempurl.com/api/Country"
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching contact data:", error.message);
      throw error;
    }
  }
);

export const fetchProvinceData = createAsyncThunk(
  "checkout/Province",
  async () => {
    try {
      const response = await axios.get(
        "http://immutable858-001-site1.atempurl.com/api/Province"
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching contact data:", error.message);
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
