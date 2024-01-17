// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   id: '',
//   email: '',
//   first_name: '',
//   last_name: '',
//   avatar: '',
// };

// const userDetailSlice = createSlice({
//   name: 'userDetail',
//   initialState,
//   reducers: {
//     fetchedUserDetails: (state, { payload }) => {
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//   },
// });

// export const { fetchedUserDetails } = userDetailSlice.actions;
// export default userDetailSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   users: [],
// };

// const userDetailSlice = createSlice({
//   name: 'userDetail',
//   initialState,
//   reducers: {
//     fetchedUserDetails: (state, { payload }) => {
//       return {
//         users: payload,
//       };
//     },
//   },
// });

// export const { fetchedUserDetails } = userDetailSlice.actions;
// export default userDetailSlice.reducer;

// userSlice.js

/******************************************Orignal****************************************************/

// import { createSlice } from '@reduxjs/toolkit';

// const defaultSate = {
//   usersData: [],
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState: defaultSate,
//   reducers: {
//     setUsersData: (state, action) => {
//       state.usersData = action.payload;
//     },
//   },
// });

// export const { setUsersData } = userSlice.actions;
// export const selectUsersData = (state: any) => state.user.usersData;
// export default userSlice.reducer;

/************createasyncThunk**************************/

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface defaultState {
  contents: any | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: defaultState = {
  contents: null,
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_payload, thunkAPI) => {
    const state: any = thunkAPI.getState();

    // console.log(state.user.contents.data, 'STATE');

    console.log('getState', state);
    const res = await axios('https://reqres.in/api/users/');

    const data = await res.data;

    return data.data;
  }
);

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    updateContents: (state, action) => {
      console.log('stateREdux', state);
      state.contents = [...state.contents, action.payload];
    },
    deleteUser: (state, action) => {
      state.contents = state.contents?.filter(
        (user: any) => user.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log('fullfilled:', state);
      state.contents = action.payload;
      // state.contents = [...action.payload];
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default contentSlice.reducer;
export const { updateContents } = contentSlice.actions;
export const { deleteUser } = contentSlice.actions;
