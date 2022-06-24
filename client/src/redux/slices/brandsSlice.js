import { createSlice} from "@reduxjs/toolkit";
import { queryApi} from "../../utils/queryApi";
let initialState = {
brands: [],
selectedBrand: {},
errors: "",
};

const BrandsSlice = createSlice({
name: "brands",
initialState,
reducers: {
populateBrands(state, action) {
state.brands = action.payload;
},
selectBrand(state, action) {
state.selectedBrand = action.payload;
},
unselectBrand(state) {
state.selectedBrand = null;
},
deleteBrand: (state, action) => {
const payload = action.payload;
const index = state.brands.findIndex((item) => item._id === payload);
if (index !== -1) {
state.brands.splice(index, 1);
}
},
updateBrand: (state, action) => {
const payload = action.payload;
const index = state.brands.findIndex(
(item) => item._id === payload._id
);
if (index !== -1) {
state.brands[index] = payload;
}
},
addBrand: (state, action) => {
const payload = action.payload;
state.brands.push(payload);
},
setErrors(state, action) {
state.errors = action.payload;
},
},

});
export const fetchBrands = () => async (dispatch) => {
const [res, error] = await queryApi("brand/");
if (error) {
dispatch(setErrors(error));
} else {
dispatch(populateBrands(res));
}
};
export const selectBrands = (state) => {
return [state.brands.brands, state.brands.errors];
};
export const selectSelectedBrand = (state) => {
return state.brands.selectedBrand;
};
export const {
populateBrands,
selectBrand,
unselectBrand,
setErrors,
deleteBrand,
updateBrand,
addBrand,
} = BrandsSlice.actions;
export default BrandsSlice.reducer;