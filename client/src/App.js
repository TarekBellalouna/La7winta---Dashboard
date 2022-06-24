// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
//redux 
// ----------------------------------------------------------------------
import { fetchProducts } from "./redux/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchBrands } from './redux/slices/brandsSlice';
 
import { fetchEla }  from './redux/slices/couponsSlice';
import { fetchComments } from './redux/slices/commentSlice';
import { fetchRatings } from './redux/slices/ratingSlice';
import React, { useRef, useState  } from "react";
import { deleteEvent, deleteEventfunction, fetchEvents } from './redux/slices/eventSlice';
import { fetchCategories } from './redux/slices/categorySlice';
import { fetchAuctions } from './redux/slices/auctionSlice';

export default function App() {
  
  const [token, setToken] = useState("");
   
  const  userToken = localStorage.getItem('token')
  const [userId, setUserId] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState("");
  const [deletedEvent,errors] = useSelector(deleteEventfunction);

  const dispatch = useDispatch()
  
  useEffect(() => {
    setToken(userToken)
    console.log("token", token)
    console.log("user appp", userToken)
  }, [userToken])
  useEffect(()=>{
 

  dispatch(fetchProducts())
  dispatch(fetchAuctions())

  dispatch(fetchBrands())
  dispatch(fetchEvents())
  dispatch(fetchComments())
  dispatch(fetchRatings())
  
  dispatch(fetchEla())
  dispatch(fetchCategories())

  },[deletedEvent])
  
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
