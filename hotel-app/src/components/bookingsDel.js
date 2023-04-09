import Button from '@mui/material/Button';
import * as React from 'react';
import { Chip, Stack } from '@mui/material';
import { COLORS } from '../components/consts'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function BookingsDel() {

    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState('');

    return (
        <Box justifyContent={'center'} alignItems={'center'}>
        <Chip label="Delete"
        onClick={handleClickOpen}
        sx={{ backgroundColor: COLORS.primaryColor, color: 'white' }}/>

        <Dialog
            open={open}
            onClose={handleClose}>

            <DialogTitle>
                Delete Booking
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Room Number
                </DialogContentText>
                <TextField />
                <DialogContentText>
                    Hotel
                </DialogContentText>
                <TextField />
                <DialogContentText>
                    Start date
                </DialogContentText>
                <TextField />
            </DialogContent>
            <DialogActions>
                <Button>Submit</Button>
            </DialogActions>
        </Dialog>
        </Box>
    )
}