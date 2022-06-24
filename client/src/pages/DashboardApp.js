// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  CardLineChart
} from '../sections/@dashboard/app';
import { fetchUsers, selectUser } from '../redux/slices/userSlice';
import { fetchEvents, selectEvent } from '../redux/slices/eventSlice';
import { fetchDonations, selectDonations } from '../redux/slices/donationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const [events, err] = useSelector(selectEvent);
  const [users, errs] = useSelector(selectUser);
  const [donations, errors] = useSelector(selectDonations);
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEvents());
    dispatch(fetchDonations());
  }, []);
  console.log(donations.donations)
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers events={events} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders donations={donations} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports users={users} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid> */}
          <Grid item xs={12} md={6} lg={4}>
            <CardLineChart />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
