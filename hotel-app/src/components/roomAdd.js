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


export default function RoomAdd() {

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState('');

    return (
        <Box justifyContent={'center'} alignItems={'center'}>
            <Chip label="Add"
                onClick={handleClickOpen}
                sx={{ backgroundColor: COLORS.primaryColor, color: 'white' }} />

            <Dialog
                open={open}
                onClose={handleClose}>

                <DialogTitle>
                    Add Room
                </DialogTitle>
                <DialogContent>
                    <Stack direction={"column"}>
                        <Stack direction={"row"}>
                            <Stack direction={"column"}>
                                <DialogContentText>
                                    Room Number
                                </DialogContentText>
                                <TextField />
                            </Stack>
                            <Stack direction={"column"}>
                                <DialogContentText>
                                    Hotel
                                </DialogContentText>
                                <TextField />
                            </Stack>

                        </Stack>
                        <Stack direction={"row"}>
                            <Stack direction={"column"}>
                                <DialogContentText>
                                    Price
                                </DialogContentText>
                                <TextField />
                            </Stack>
                            <Stack direction={"column"}>
                                <DialogContentText>
                                    Capacity
                                </DialogContentText>
                                <TextField />
                            </Stack>
                        </Stack>
                        <Stack direction={"row"}>
                            <Stack direction={"column"}>
                                <DialogContentText>
                                    Type of View
                                </DialogContentText>
                                <TextField />
                            </Stack>
                            <Stack direction={"column"}>
                            <DialogContentText>
                                Amenities
                            </DialogContentText>
                            <TextField />
                            </Stack>
                        </Stack>
                        <Stack direction={"row"}>
                            <Stack direction={"column"}>
                                <DialogContentText>
                                    Possible Expansion
                                </DialogContentText>
                                <TextField />
                            </Stack>
                            <Stack direction={"column"}>
                            <DialogContentText>
                                Status
                            </DialogContentText>
                            <TextField />
                            </Stack>
                        </Stack>
                    </Stack>



                </DialogContent>
                <DialogActions>
                    <Button>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}