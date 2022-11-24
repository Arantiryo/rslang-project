import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../../interfaces/app";
import { UserLoginInfo } from "../../interfaces/user";

export const initialState: State = {
  userId: "",
  name: "",
  token: "",
  refreshToken: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserLoginInfo>) => {
      const { name, userId, token, refreshToken } = action.payload;
      state.name = name;
      state.userId = userId;
      state.token = token;
      state.refreshToken = refreshToken;
    },
  },
});

export const { updateUserInfo } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

export default loginSlice.reducer;
