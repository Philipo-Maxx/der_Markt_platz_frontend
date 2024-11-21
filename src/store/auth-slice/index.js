import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:2550/api/v1/auth/create-user",
      formData,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:2550/api/v1/auth/login-user",
    formData,
    { withCredentials: true }
  );
  console.log(response.data);
  return response.data;
});

export const verifyUser = createAsyncThunk(
  "/auth/verify-email",
  async (otp) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const response = await axios.post(
      "http://localhost:2550/api/v1/auth/verify-user",
      otp,
      { withCredentials: true },
      {
        headers: {
          Authorization: `Bearer ${token ? token : ""}`, // Include the token in the Authorization header
          "Content-Type": "application/json", // Optional: set content type if needed
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
