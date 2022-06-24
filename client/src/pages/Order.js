import * as React from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, selectOrders } from '../redux/slices/ordersSlice';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 


// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/coupon';
import {queryApi} from '../utils/queryApi'
//
import USERLIST from '../_mocks_/user';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user_first_name', label: 'user_first_name', alignRight: false },
  { id: 'user_email', label: 'user_email', alignRight: false },
  { id: 'user_phone', label: 'user_phone', alignRight: false },
  { id: 'user_address', label: 'user_address', alignRight: false },
  { id: 'isDelivered', label: 'isDelivered', alignRight: false },



];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (orderList) => orderList.user_first_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Order() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('type');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderList, setOrderList] = useState([]);

  useEffect(()=>
  {
    axios.get('http://localhost:5000/order/readOrder').then((response)=>{
      console.log(response);
      setOrderList(response.data)
    })
  },[])
console.log("orders list : ", orderList)

  // get all orders   
  const dispatch = useDispatch();
  const [orders, err] = useSelector(selectOrders);
  console.log("orders: ", orders);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderList.map((n) => n.user_first_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
    console.log("selected: ", selected)

  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    console.log("selected: ", selected)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;

  const filteredUsers = applySortFilter(orderList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");





  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}



  const [type, setType] = useState("");
  const [user_first_name, setUser_first_name] = useState("");
  const [user_email, setUser_email] = useState("");
  const [user_phone, setUser_phone] = useState("");
  const [user_address, setUser_address] = useState("");
  const [isDelivered, setIsDelivered] = useState("");
  const [isPaid, setIsPaid] = useState("");


  const [code, setCode] = useState(null);
  const [value, setValue] = useState(null);



  const handleAddBrand = async (e) => {
    e.preventDefault();
    console.log("handleAddBrand:");

    await axios.post('http://localhost:5000/coupon/addcoupon',{
      "type":type,
      "code":code,
      "value":value
    }).then(()=>{
      window.location.reload();

    })
    
  };

  

//console.log("makeid: ",makeid(5));




  return (
    <Page title="Orders | La7winta">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={handleOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Order
          </Button>


          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Form onSubmit={handleAddBrand} >
                <Form.Group className="mb-3" controlId="F">
                  <Form.Label>Type</Form.Label>
                  <Form.Control  type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Enter coupon's type" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Code</Form.Label>
                  <Form.Control  type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter coupon's code" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Value</Form.Label>
                  <Form.Control  type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0 - 100%" />
                </Form.Group>

                <Button type="submit" variant="contained"  color="success">
                  Add
                </Button>
              </Form>
            </Box>
          </Modal>

        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map( (row) => {
                      const { _id, user_email, user_first_name , user_address, user_phone, isDelivered, isPaid} = row;
                      const isItemSelected = selected.indexOf(type) !== -1;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell>
                          
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {user_first_name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {user_email}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                 {user_phone}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                 {user_address}
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(isDelivered.toString() === 'false' && 'error') || 'success'}
                            >
                              {sentenceCase(isDelivered.toString())}
                            </Label>
                          </TableCell>
                          
                     
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orderList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
