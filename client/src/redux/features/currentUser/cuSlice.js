import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout, setTokenInLocalStorage } from "../../../lib/authUtils";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  user: {},
  error: "",
};

export const fetchUser = createAsyncThunk("cu/fetchUser", (data) => {
  if (data) {
    return fetch("http://localhost:3000/auth/local/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Authorization Error");
      })
      .then((result) => {
        setTokenInLocalStorage(result.token, result.expires);
        return result;
      });
  } else {
    return fetch("http://localhost:3000/userData", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Authorization Error");
      })
      .then((result) => {
        return result;
      });
  }
});

const cuSlice = createSlice({
  name: "cu",
  initialState,
  reducers: {
    removeUser: () => {
      logout();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.error = "";
      state.user = {};
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.isLoggedIn = false;
      state.error = action.error.message;
    });
  },
});

export default cuSlice.reducer;
export const { removeUser } = cuSlice.actions;
// export cuSlice.actions;
