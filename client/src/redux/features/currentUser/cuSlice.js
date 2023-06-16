import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout, setTokenInLocalStorage } from "../../../lib/authUtils";
import { endLoading, startLoading } from "../loader/loaderSlice";

const initialState = {
  isLoggedIn: false,
  user: {},
  error: "",
};

export const fetchUser = createAsyncThunk("cu/fetchUser", (data, thunkAPI) => {
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
      })
      .catch((err) => {
        throw err;
      });
  } else {
    thunkAPI.dispatch(startLoading());
    return fetch("http://localhost:3000/user/data", {
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
        thunkAPI.dispatch(endLoading());
        return result;
      })
      .catch((err) => {
        thunkAPI.dispatch(endLoading());
        throw err;
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
      state.isLoggedIn = false;
      state.error = "";
      state.user = {};
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      logout();
      state.user = {};
      state.isLoggedIn = false;
      state.error = action.error.message;
    });
  },
});

export default cuSlice.reducer;
export const { removeUser } = cuSlice.actions;
