import { createAsyncThunk } from '@reduxjs/toolkit';

// LOGIN THUNK
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    const { username, password } = credentials;
    if (username === "kminchelle" && password === "0lelplR") {
      return {
        username: "kminchelle",
        id: 15,
        email: "kminchelle@qq.com",
        token: "fake-mocked-jwt"
      };
    } else {
      return rejectWithValue({ message: "Invalid credentials (mocked)" });
    }
  }
);

// LOGOUT THUNK
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { fulfillWithValue }) => {
    // For dummyjson, logout is just a client-side reset
    return fulfillWithValue(true);
  }
);
