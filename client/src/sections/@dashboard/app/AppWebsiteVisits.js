/* eslint-disable no-unused-vars */
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material

import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from 'src/redux/slices/userSlice';
import { fetchEventsCount, getEventCount, selectEventCount } from 'src/redux/slices/eventSlice';
import { fetchUsersCount, getUserCount, selectUserCount } from 'src/redux/slices/userSlice';
import {
  fetchDonationsCount,
  getDonationsCount,
  selectDonationCount
} from 'src/redux/slices/donationSlice';

import { useEffect } from 'react';
import moment from 'moment';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Events',
    type: 'column',
    data: [23, 11, 22, 27]
  },
  {
    name: 'Donations',
    type: 'area',
    data: [94, 55, 41, 67]
  },
  {
    name: 'Users',
    type: 'column',
    data: [50, 25, 36, 30]
  }
];

export default function AppWebsiteVisits() {
  const [eventCount, err] = useSelector(selectEventCount);
  const [usersCount, errs] = useSelector(selectUserCount);
  const [donationsCount, errors] = useSelector(selectDonationCount);

  const dispatch = useDispatch();
  const getChartData = (name) => {
    switch (name) {
      case 'Events':
        dispatch(fetchEventsCount(moment().startOf('month').format('YYYY-MM-DD')));

        CHART_DATA.map((item) => {
          if (item.name === 'Events') {
            return (item.data = eventCount);
          }
        });
        break;
      case 'Users':
        dispatch(fetchUsersCount(moment().startOf('month').format('YYYY-MM-DD')));

        CHART_DATA.map((item) => {
          if (item.name === 'Users') {
            return (item.data = usersCount);
          }
        });
        break;
      case 'Donations':
        dispatch(fetchDonationsCount(moment().startOf('month').format('YYYY-MM-DD')));

        CHART_DATA.map((item) => {
          if (item.name === 'Donations') {
            return (item.data = donationsCount);
          }
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getChartData('Events');
    getChartData('Users');
    getChartData('Donations');
  }, []);

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: ['Week1', 'week2', 'week3', 'week4'],
    xaxis: { type: 'string' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader
        title="Website Statistics Per Month"
        subheader={`From ${moment().startOf('month').format('YYYY-MM-DD')} To ${moment()
          .startOf('month')
          .add(4, 'weeks')
          .format('YYYY-MM-DD')}`}
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
