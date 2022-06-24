import {    combineReducers    } from "redux";
    import products from "./slices/productsSlice";
    import brands from "./slices/brandsSlice";
    import category from "./slices/categorySlice";
 import events from "./slices/eventSlice";
 
 import users from "./slices/userSlice";

 import coupons from "./slices/couponsSlice";
 import orders from "./slices/ordersSlice";
 import donations from './slices/donationSlice';
 import comments from "./slices/commentSlice";
 import ratings from "./slices/ratingSlice";
 import auctions from "./slices/auctionSlice";

 


    const reducers = combineReducers({
    products,brands,events,users, orders, coupons,category,
    donations,comments,ratings,auctions
    });
    export default reducers;