import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://immutable858-001-site1.atempurl.com/api";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/ApplicationUser/CreateUser`,
        userData
      );
      if (response.status === 200) {
        console.log("Form data submitted successfully");
      } else {
        console.error("Error submitting form data:");
      }
    } catch (error) {
      console.log(error?.response?.data?.Message, "erorr-text");
      return rejectWithValue(error?.response?.data?.Message);
    }
  }
);

export const Loginn = createAsyncThunk(
  "user/Loginn",
  async (Login, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/ApplicationUser/Login`,
        Login
      );
      localStorage.setItem("jwtToken", response.data.jwtToken);
      localStorage.setItem("userId", response.data.userId);
      if (response.status === 200) {
        console.log("Form data submitted successfully");
        return response.data;
      } else {
        console.error("Error submitting form data:");
      }
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.Message, "erorr-text");
      return rejectWithValue(error?.response?.data?.Message);
    }
  }
);

export const UserData = createAsyncThunk("user/UserData", async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/ApplicationUser/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const editUser = createAsyncThunk("user/editUser", async (editData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/ApplicationUser/UpdateUser`,
      editData
    );
    if (response.status === 200) {
      console.log("Form data submitted successfully");
    } else {
      console.error("Error submitting form data:");
    }
  } catch (error) {
    console.log(error?.response?.data?.Message, "erorr-text");
    throw new Error("There was an error creating the user: " + error.message);
  }
});

const authSlice = createSlice({
  name: "user",
  initialState: {
    login: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    errorRegister: null,
    success: false,
    successRegister: false,
    jwtToken: "",
    userId: 0,
    userData: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.jwtToken = action.payload;
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.jwtToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successRegister = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.errorRegister = action.payload;
      })
      // login
      .addCase(Loginn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Loginn.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.jwtToken = action.payload.jwtToken;
        state.success = true;
      })
      .addCase(Loginn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //userData
      .addCase(UserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(UserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //edit
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user;
export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
