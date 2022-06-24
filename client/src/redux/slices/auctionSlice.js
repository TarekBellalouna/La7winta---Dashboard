import { createSlice} from "@reduxjs/toolkit";
import { queryApi} from "../../utils/queryApi";
let initialState = {
auctions: [],
selectedAuction: {},
errors: "",
};

const AuctionSlice = createSlice({
name: "auctions",
initialState,
reducers: {
populateAuctions(state, action) {
state.auctions = action.payload;
},
selectAuction(state, action) {
state.selectedAuction = action.payload;
},
unselectAuction(state) {
state.selectedAuction = null;
},
deleteAuction: (state, action) => {
const payload = action.payload;
const index = state.auctions.findIndex((item) => item._id === payload);
if (index !== -1) {
state.auctions.splice(index, 1);
}
},
updateAuction: (state, action) => {
const payload = action.payload;
const index = state.auctions.findIndex(
(item) => item._id === payload._id
);
if (index !== -1) {
state.auctions[index] = payload;
}
},
setErrors(state, action) {
state.errors = action.payload;
},
},

});
export const fetchAuctions = () => async (dispatch) => {
const [res, error] = await queryApi("auction/");
console.log("test get")
if (error) {
dispatch(setErrors(error));
} else {
dispatch(populateAuctions(res));
}
};
export const selectAuctions = (state) => {
return [state.auctions.auctions, state.auctions.errors];
};
export const selectSelectedAuction = (state) => {
return state.auctions.selectedAuction;
};
export const {
populateAuctions,
selectAuction,
unselectAuction,
setErrors,
deleteAuction,
updateAuction,
addAuction,
} = AuctionSlice.actions;
export default AuctionSlice.reducer;