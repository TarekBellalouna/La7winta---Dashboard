import { createSlice} from "@reduxjs/toolkit";
import { queryApi} from "../../utils/queryApi";
let initialState = {
orders: [],
selectedOrder: {},
errors: "",
};

const OrdersSlice = createSlice({
name: "orders",
initialState,
reducers: {
populateOrders(state, action) {
state.orders = action.payload;
},
selectOrder(state, action) {
state.selectedOrder = action.payload;
},
unselectOrder(state) {
state.selectedOrder = null;
},
deleteOrder: (state, action) => {
const payload = action.payload;
const index = state.orders.findIndex((item) => item._id === payload);
if (index !== -1) {
state.orders.splice(index, 1);
}
},
updateOrder: (state, action) => {
const payload = action.payload;
const index = state.orders.findIndex(
(item) => item._id === payload._id
);
if (index !== -1) {
state.orders[index] = payload;
}
},
addOrder: (state, action) => {
const payload = action.payload;
state.orders.push(payload);
},
setErrors(state, action) {
state.errors = action.payload;
},
},

});
export const fetchOrders = () => async (dispatch) => {
const [res, error] = await queryApi("order/readOrder");
if (error) {
dispatch(setErrors(error));
} else {
dispatch(populateOrders(res));
}
};
export const selectOrders = (state) => {
return [state.orders.orders, state.orders.errors];
};
export const selectSelectedOrder = (state) => {
return state.orders.selectedOrder;
};
export const {
populateOrders,
selectOrder,
unselectOrder,
setErrors,
deleteOrder,
updateOrder,
addOrder,
} = OrdersSlice.actions;
export default OrdersSlice.reducer;