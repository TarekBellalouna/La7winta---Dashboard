import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { queryApi } from '../../utils/queryApi';
let initialState = {
  users: [],
  // selectedEvent: {},
  errors: '',
  userDeleted: '',
  usersCount: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    populateUser(state, action) {
      state.users = action.payload;
    },
    populateDeletedUser(state, action) {
      state.userDeleted = action.payload;
    },
    getUserCount(state, action) {
      state.usersCount = action.payload;
    },
    // selectEvent(state, action) {
    // state.selectedEvent = action.payload;
    // },

    // unselectEvent(state) {
    // state.selectedProduct = null;
    // },
    // deleteEvent: (state, action) => {
    // const payload = action.payload;
    // const index = state.products.findIndex((item) => item._id === payload);
    // if (index !== -1) {
    // state.products.splice(index, 1);
    // }
    // },

    setErrors(state, action) {
      state.errors = action.payload;
    }
  }
});
export const fetchUsers = () => async (dispatch) => {
  const [res, error] = await queryApi('user/');
  console.log(res);
  if (error) {
    dispatch(setErrors(error));
  } else {
    dispatch(populateUser(res));
  }
};
export const deleteUser = (id) => async (dispatch) => {
  const res = await axios.delete(`http://localhost:5000/user/${id}`);

  dispatch(populateDeletedUser(res));
};
export const disableUser = (id) => async (dispatch) => {
  const res = await axios.put(`http://localhost:5000/user/disable/${id}`);

  dispatch(populateDeletedUser(res));
};
export const selectUser = (state) => {
  return [state.users.users, state.users.errors];
};
export const fetchUsersCount = (from) => async (dispatch) => {
  const res = await axios.post(`http://localhost:5000/user/getUsersByTime?from=${from}`);
  console.log(res);

  dispatch(getUserCount(res.data));
};
export const deleteUsers = (state) => {
  return [state.users.userDeleted, state.users.errors];
};
export const selectUserCount = (state) => {
  return [state.users.usersCount, state.users.errors];
};
// export const selectSelectedProduct = (state) => {
// return state.products.selectedProduct;
// };
export const {
  populateUser,

  populateDeletedUser,
  // selectProduct,
  // unselectProduct,
  setErrors,
  getUserCount
  // deleteProduct,
  // updateProduct,
  // addProduct,
} = userSlice.actions;
export default userSlice.reducer;
