import { createSlice} from "@reduxjs/toolkit";
import { queryApi} from "../../utils/queryApi";
let initialState = {
comments: [],
selectedComment: {},
errors: "",
};

const CommentsSlice = createSlice({
name: "comments",
initialState,
reducers: {
populateComments(state, action) {
state.comments = action.payload;
},
selectComment(state, action) {
state.selectedComment = action.payload;
},
unselectComment(state) {
state.selectedComment = null;
},
deleteComment: (state, action) => {
const payload = action.payload;
const index = state.comments.comments.findIndex((item) => item._id === payload);
if (index !== -1) {
state.comments.comments.splice(index, 1);
}
},
updateComment: (state, action) => {
const payload = action.payload;
const index = state.comments.findIndex(
(item) => item._id === payload._id
);
if (index !== -1) {
state.comments[index] = payload;
}
},
addComment: (state, action) => {
const payload = action.payload;
state.comments.push(payload);
},
setErrors(state, action) {
state.errors = action.payload;
},
},

});
export const fetchComments = () => async (dispatch) => {
const [res, error] = await queryApi("comments/");
if (error) {
dispatch(setErrors(error));
} else {
dispatch(populateComments(res));
}
};
export const selectComments = (state) => {
return [state.comments.comments, state.comments.errors];
};
export const selectSelectedComment = (state) => {
return state.comments.selectedComment;
};
export const {
populateComments,
selectComment,
unselectComment,
setErrors,
deleteComment,
updateComment,
addComment,
} = CommentsSlice.actions;
export default CommentsSlice.reducer;