import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Select,
  MenuItem, 
  InputLabel,
  NativeSelect,
  FormControl
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import emailjs from "emailjs-com";
import { useState , useRef } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};



export default function UserListToolbar({ numSelected, filterName, onFilterName, selected }) {

  console.log("selected: ",selected)

  const form = useRef();
  function sendEmail(e){
    e.preventDefault();

    emailjs.sendForm('service_vpdv6s5', 'template_wzd12hd', form.current, '3V11wABCO2HI6Ci23')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  const [mail, setMail] = useState(0);
  const handleChanges = (event) => {
    setMail(event.target.value);
  };
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search type of coupons..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
       
        <form ref={form} onSubmit={sendEmail}> 
        <input hidden type="text" value={selected} name="code" /> 


        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>   
  <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={mail}
          label="Age"
          onChange={handleChanges}
        >
          
          <MenuItem value={1}>elae.debichi@esprit.tn</MenuItem>
          <MenuItem value={2}>elae.debichi@esprit.tn</MenuItem>
          <MenuItem value={3}>elae.debichi@esprit.tn</MenuItem>
        </Select>
     </FormControl>
&nbsp;&nbsp;

        <Button size="  large" variant="contained" startIcon={<Iconify icon="eva:email-outline" />} type="submit">
          send
          </Button>    
        </form>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
