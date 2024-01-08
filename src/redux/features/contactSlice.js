import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const submitFormData = createAsyncThunk(
  "contact/submitFormData",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://immutable858-001-site1.atempurl.com/api/ContactMessage",
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to submit form data");
    }
  }
);

export const fetchContactData = createAsyncThunk(
  "contact/fetchContactData",
  async () => {
    try {
      const response = await axios.get(
        "http://immutable858-001-site1.atempurl.com/api/Contact"
      );
      return response?.data?.[0];
    } catch (error) {
      console.error("Error fetching contact data:", error.message);
      throw error; 
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    status: "idle",
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducer cases for submitFormData
      .addCase(submitFormData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitFormData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Reducer cases for fetchContactData
      .addCase(fetchContactData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; 
      })
      .addCase(fetchContactData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
