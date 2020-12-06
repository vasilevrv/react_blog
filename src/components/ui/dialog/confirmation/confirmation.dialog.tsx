import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface ConfirmationDialogProps {
    title: string;
    message?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        setOpen(false);
        props.onConfirm();
    };

    const handleCancel = () => {
        setOpen(false);
        props.onCancel && props.onCancel();
    };

    return (
        <div>
            <Button size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
                {props.title}
            </Button>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message ?? 'Confirm?'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}