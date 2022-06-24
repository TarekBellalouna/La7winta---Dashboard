import { createSlice} from "@reduxjs/toolkit";
import { queryApi} from "../../utils/queryApi";
let initialState = {
categories: [],
selectedCategory: {},
errors: "",
};

const CategorySlice = createSlice({
name: "category",
initialState,
reducers: {
populateCategories(state, action) {
state.categories = action.payload;
},
selectCategory(state, action) {
state.selectedCategory = action.payload;
},
unselectCategory(state) {
state.selectedCategory = null;
},
deleteCategory: (state, action) => {
const payload = action.payload;
const index = state.categories.findIndex((item) => item._id === payload);
if (index !== -1) {
state.categories.splice(index, 1);
}
},
updateCategory: (state, action) => {
const payload = action.payload;
const index = state.categories.findIndex(
(item) => item._id === payload._id
);
if (index !== -1) {
state.categories[index] = payload;
}
},
addCategory: (state, action) => {
const payload = action.payload;
state.categories.push(payload);
},
setErrors(state, action) {
state.errors = action.payload;
},
},

});
export const fetchCategories = () => async (dispatch) => {
const [res, error] = await queryApi("category/");
if (error) {
dispatch(setErrors(error));
} else {
dispatch(populateCategories(res));
}
};
export const selectCategories = (state) => {
return [state.category.categories, state.category.errors];
};
export const selectSelectedCategory = (state) => {
return state.category.selectedCategory;
};
export const {
populateCategories,
selectCategory,
unselectCategory,
setErrors,
deleteCategory,
updateCategory,
addCategory,
} = CategorySlice.actions;
export default CategorySlice.reducer;