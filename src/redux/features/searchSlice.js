import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://immutable858-001-site1.atempurl.com/api";

export const fetchData = createAsyncThunk("search/fetchData", async (inputValue) => {
  try {
    const response = await axios.get(
      `${baseUrl}/UserProduct/Products?Prompt=${inputValue}&ShowMore.TakeProduct=8`
    );
    return response.data[0].products;
  } catch (error) {
    throw error;
  }
});

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: null,
    inputValue: "",
    status: "idle", 
    error: null,
  },
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setInputValue } = searchSlice.actions;

export const selectData = (state) => state.search.data;
export const selectInputValue = (state) => state.search.inputValue;
export const selectStatus = (state) => state.search.status;
export const selectError = (state) => state.search.error;

export default searchSlice.reducer;