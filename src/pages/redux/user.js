import { createSlice } from "@reduxjs/toolkit";
// Slice
const initialUser = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
  },
});
const { loginSuccess, logoutSuccess } = slice.actions;
export default slice.reducer;
// Actions

export const login = (data) => (dispatch) => {
  console.log("helloo");
  try {
    dispatch(loginSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const logout = () => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
