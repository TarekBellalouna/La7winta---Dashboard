import * as React from "react";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAuction,
  updateAuction,
  selectAuctions,
  addAuction,
  fetchAuctions
} from "../redux/slices/auctionSlice";
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  TablePagination,
} from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
import { queryApi } from "../utils/queryApi";
//
import USERLIST from "../_mocks_/user";

// ----------------------------------------------------------------------

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// material

const TABLE_HEAD = [
  { id: "productName", label: "Name", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "image", label: "Image", alignRight: false },
  { id: "Price", label: "Price", alignRight: false },
  { id: "duration", label: "Duration", alignRight: false },
  { id: "catergory", label: "Category", alignRight: false },
  { id: "currentPrice", label: "Current Price", alignRight: false },
  { id: "currentBidder2", label: "Current Bidder", alignRight: false }


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
  return order === "desc"
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
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Auction() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("pro");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // get all Auctions
  const [auctions, err] = useSelector(selectAuctions);
  // console.log(auctions);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const dispatch = useDispatch();
  useEffect(() => {
     
  dispatch(fetchAuctions())
  
  
  }) 

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = auctions.map((n) => n.productName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, productName) => {
    const selectedIndex = selected.indexOf(productName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, productName);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - auctions.length) : 0;

  const filteredAuctions = applySortFilter(  auctions,  getComparator(order, orderBy),  filterName);

  const isAuctionNotFound = filteredAuctions.length === 0;

  

 

  const deleteAuctionFunc = async (id) => {
    const [, err] = await queryApi(
      "auction/delete-auction/"+id,
      { },
      "DELETE"
    );
    if (err) {
      console.log(err);
    } else dispatch(deleteAuction(id));
  };

  return (
    <Page title="Auction | La7winta">
      <Container>
       

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
                  rowCount={auctions.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                 <TableBody>
                  {auctions.filter(
                      (auction) => auction.productName.includes(filterName) || auction.productName.includes(filterName)
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      
                      const { auctionId, productName, description, image, Price, duration, catergory,currentPrice,currentBidder2 } = row;
                      const isItemSelected = selected.indexOf(productName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={auctionId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, productName)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={productName} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {productName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">{image}</TableCell>
                          <TableCell align="left">{Price}</TableCell>
                          <TableCell align="left">{duration}   </TableCell>
                          <TableCell align="left">{catergory}   </TableCell>
                          <TableCell align="left">{currentPrice}   </TableCell>
                          <TableCell align="left">{currentBidder2}   </TableCell>




                         
                        
                         <TableCell align="right">
                         <Button
                           variant="outlined"
                           startIcon={<DeleteIcon />}
                           onClick={() => deleteAuctionFunc(auctionId)}
                         >
                           Delete
                         </Button>
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
                {isAuctionNotFound && (
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
            count={auctions.length}
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
