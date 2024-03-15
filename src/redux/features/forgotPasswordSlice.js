import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://immutable858-001-site1.atempurl.com/api";

export const SendOTPEmail = createAsyncThunk(
  "forgotPassword/sendOTPEmail",
  async (userEmail) => {
    try {
      const response = await axios.post(
        `${baseUrl}/ForgotPassword/SendOTPEmail`,
        userEmail
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Error submitting form data:");
      }
    } catch (error) {
      console.log(error?.response?.data?.Message, "erorr-text");
      throw new Error("There was an error creating the user: " + error.message);
    }
  }
);
export const OtpConfirmation = createAsyncThunk(
  "forgotPassword/OtpConfirmation",
  async (OTP) => {
    try {
      const response = await axios.post(
        `${baseUrl}/ForgotPassword/OtpConfirmation`,
        OTP
      );
      if (response.status === 200) {
        console.log(response.data)
        return response.data;
      } else {
        console.error("Error submitting form data:");
      }
    } catch (error) {
      console.log(error?.response?.data?.Message, "erorr-text");
      throw new Error("There was an error creating the user: " + error.message);
    }
  }
);

export const ResetPasswordd = createAsyncThunk(
  "forgotPassword/ResetPassword",
  async (Password) => {
    try {
      const response = await axios.post(
        `${baseUrl}/ForgotPassword/ResetPassword`,
        Password
      );
      if (response.status === 200) {
        console.log(response.data)
        return response.data;
      } else {
        console.error("Error submitting form data:");
      }
    } catch (error) {
      console.log(error?.response?.data?.Message, "erorr-text");
      throw new Error("There was an error creating the user: " + error.message);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    email: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //SendOTPEmail
      .addCase(SendOTPEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SendOTPEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(SendOTPEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //OtpConfirmation
      .addCase(OtpConfirmation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(OtpConfirmation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(OtpConfirmation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //ResetPassword
      .addCase(ResetPasswordd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ResetPasswordd.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(ResetPasswordd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default forgotPasswordSlice.reducer;
export const { setEmail } = forgotPasswordSlice.actions;
