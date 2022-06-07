import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({ open, onClose, onDelete, data }) {
    const deleteHandler = () => {
        onDelete(data?._id)
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Delete Record"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure want to delete the record?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button color='error' onClick={deleteHandler}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}