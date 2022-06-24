import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';

// material
import Divider from '@mui/material/Divider';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import  { queryApi }  from '../../../utils/queryApi'
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../../components/Label';
import ColorPreview from '../../../components/ColorPreview';


// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};
//------------
//MODAL STYLE
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

export default function ShopProductCard({ product , deleteProduct , history }) {
  const { name, image, description, price, color, total_in_stock, gender, type,brandId , discount } = product;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={image} style={{width:"361px", height:"365px" }} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}DT
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>deleteProduct(product._id)} >Delete</Button>
        {/* <Button >Learn More</Button> */}
        <Button size="small" onClick={handleOpen}>
          Show Details
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img src={image} class="img-thumbnail" alt={image}></img>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              {name}
            </Typography>
            <Divider variant="middle" />

            <div className="d-flex justify-content-between">
              <div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 <span style={{ 'color':"green" , 'font-size':"bold" }}>Category : </span> {type}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span style={{ 'color':"green" , 'font-size':"bold" }}>Color : </span> {color}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span style={{ 'color':"green" , 'font-size':"bold" }}>Brand : </span> {brandId.name}
                </Typography>
              </div>
              <div>
                
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span style={{ 'color':"green" , 'font-size':"bold" }}>Gender : </span>  {gender}
                </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span style={{ 'color':"green" , 'font-size':"bold" }}>Stock : </span>   {total_in_stock}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span style={{ 'color':"green" , 'font-size':"bold" }}>Price : </span>  {price-discount*price}DT
                </Typography>
              
              </div>
            </div>
            <br/>
            <Divider textAlign="left">Description</Divider>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 {description}
                </Typography>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
}
