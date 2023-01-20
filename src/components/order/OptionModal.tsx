import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Button} from "@mui/material";
import {useIntl} from "react-intl";
import CloseIcon from '@mui/icons-material/Close';


const dummy = [
  {productId: '13', menu: '떡볶이 S', price: 35, option: true},
  {productId: '14', menu: '떡볶이 M', price: 35, option: true},
  {productId: '15', menu: '떡볶이 L', price: 35, option: true}
]


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid',
  boxShadow: 24,
  p: 4,
};


const OptionModal = ({open, setOpen, selectedItem, orders, setOrders}: any) => {
  const intl = useIntl();


  const selectSize = (event: React.ChangeEvent<HTMLInputElement>) => {

    const selected = dummy.find((item) => {
      return item?.productId === event.target.value
    })

    if (selectedItem) {

      orders[selectedItem?.group_index]?.push(selected)
      setOrders([...orders])

    } else {

      setOrders([...orders, [selected]])
    }

    setOpen(false)
  }


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <button className={'absolute right-0 top-0'} onClick={() => setOpen(false)}><CloseIcon/></button>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {intl.formatMessage({id: 'choose_option'})}
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              {intl.formatMessage({id: 'size'})}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={selectSize}
            >
              {dummy.map((item) => {
                return (
                  <FormControlLabel value={item.productId} control={<Radio/>} label={item.menu}/>
                )
              })}
            </RadioGroup>
          </FormControl>
        </Typography>
        {/*<Button variant="contained">{intl.formatMessage({id: 'add'})}</Button>*/}
      </Box>
    </Modal>
  );
}

export default OptionModal
