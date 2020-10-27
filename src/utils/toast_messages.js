import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export { ToastMessage }

/* Success message utility
Displays a customizable toast message when an event is successful.
Requires three props from the parent component's state:
trigger: a boolean determining whether the event was successful
onClose: a function setting success to false, thus closing the toast message
message: the content of the success message
So far, I don't know a way to make it more portable, so the onClose function must be defined in the parent and passed down as props.
*/

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function ToastMessage(props) {
    return (
        <Snackbar open={props.trigger} autoHideDuration={6000} onClose={props.onClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={props.onClose} severity="success">
                {props.message}
            </Alert>
        </Snackbar>
    )
}