"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the AuthState type
interface AuthState {
  user: { id: string; email: string , name: string, role: string} | null;
  token: string | null;
  company_name: string | null;
}

// Load initial state from localStorage
const loadAuthState = (): AuthState => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedCompany = localStorage.getItem("company_name");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken ?? null,
      company_name: storedCompany ?? null

    };
  }
  return { user: null, token: null, company_name: null };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: AuthState["user"]; token: string; company_name: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.company_name = action.payload.company_name;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("company_name", action.payload.company_name);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.company_name = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("company_name");
      }
    },
    
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
