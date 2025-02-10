import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the AuthState type
interface AuthState {
  user: { id: string; email: string } | null;
  token: string | null;
}

// Load initial state from localStorage
const loadAuthState = (): AuthState => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken ? storedToken : null,
    };
  }
  return { user: null, token: null };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: AuthState["user"]; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
