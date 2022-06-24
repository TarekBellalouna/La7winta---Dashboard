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

EventCard.propTypes = {
  event: PropTypes.object
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

export default function EventCard({ event , deleteEvent , history }) {
  console.log(event)
  const { title, description, Startdate, Enddate, location,image, avatar } = event;
  console.log(avatar)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 const dispatch = useDispatch()
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={avatar} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>dispatch(deleteEvent(event._id))} >Delete</Button>
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
           
            </Typography>
            <Divider variant="middle" />

            <div className="d-flex justify-content-between">
              <div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 <span style={{ 'color':"green" , 'font-size':"bold" }}>startdate : {Startdate} </span> 
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span style={{ 'color':"green" , 'font-size':"bold" }}>enddate :{Enddate}</span>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span style={{ 'color':"green" , 'font-size':"bold" }}>location : {location} </span>  
                </Typography>
              </div>
              <div>
                  
              
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
