import { createSlice} from "@reduxjs/toolkit";
import { queryApi} from "../../utils/queryApi";
let initialState = {
ratings: [],
selectedRating: {},
errors: "",
};

const RatingsSlice = createSlice({
name: "ratings",
initialState,
reducers: {
populateRatings(state, action) {
state.ratings = action.payload;
},
selectRating(state, action) {
state.selectedRating = action.payload;
},
unselectRating(state) {
state.selectedRating = null;
},
deleteRating: (state, action) => {
const payload = action.payload;
const index = state.ratings.ratings.findIndex((item) => item._id === payload);
if (index !== -1) {
state.ratings.ratings.splice(index, 1);
}
},
updateRating: (state, action) => {
const payload = action.payload;
const index = state.ratings.findIndex(
(item) => item._id === payload._id
);
if (index !== -1) {
state.ratings[index] = payload;
}
},
addRating: (state, action) => {
const payload = action.payload;
state.ratings.push(payload);
},
setErrors(state, action) {
state.errors = action.payload;
},
},

});
export const fetchRatings = () => async (dispatch) => {
const [res, error] = await queryApi("ratings/");
if (error) {
dispatch(setErrors(error));
} else {
dispatch(populateRatings(res));
}
};
export const selectRatings = (state) => {
    console.log(state)
return [state.ratings.ratings, state.ratings.errors];
};
export const selectSelectedRating = (state) => {
return state.ratings.selectedRating;
};
export const {
populateRatings,
selectRating,
unselectRating,
setErrors,
deleteRating,
updateRating,
addRating,
} = RatingsSlice.actions;
export default RatingsSlice.reducer;