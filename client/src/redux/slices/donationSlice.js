import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { queryApi } from '../../utils/queryApi';
let initialState = {
  donations: [],
  errors: '',
  donationsCount: null
};

const DonationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    populateDonations(state, action) {
      state.donations = action.payload;
    },

    getDonationsCount(state, action) {
      state.donationsCount = action.payload;
    },

    setErrors(state, action) {
      state.errors = action.payload;
    }
  }
});
export const fetchDonations = () => async (dispatch) => {
  const [res, error] = await queryApi('donation/?searchValue');
  console.log(res);
  if (error) {
    dispatch(setErrors(error));
  } else {
    dispatch(populateDonations(res));
  }
};

export const selectDonations = (state) => {
  return [state.donations.donations, state.donations.errors];
};
export const fetchDonationsCount = (from) => async (dispatch) => {
  const res = await axios.get(`http://localhost:5000/donation/getDonationsByTime?from=${from}`);
  console.log(res,"------------------------->");

  dispatch(getDonationsCount(res.data));
};

export const selectDonationCount = (state) => {
  console.log(state);
  return [state.donations.donationsCount, state.donations.errors];
};

export const {
  populateDonations,

  populateDeletedUser,
  setErrors,
  getDonationsCount,
  populateDonationsCount
  
} = DonationSlice.actions;
export default DonationSlice.reducer;
