import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";

import { ToastMessage } from '../utils/toast_messages'


export default function CreateTicketModalForm(props) {
    const existingTicket = props.existingTicket
    const titleValue = existingTicket ? existingTicket.title : ''
    const descriptionValue = existingTicket ? existingTicket.description : ''
    const developersValue = existingTicket ? existingTicket.developers : []
    const priorityValue = existingTicket ? existingTicket.priority : 'Medium'
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(titleValue)
    const [description, setDescription] = useState(descriptionValue)
    const [developers, setDevelopers] = useState(developersValue)
    const [priority, setPriority] = useState(priorityValue)
    const [success, setSuccess] = useState(false)

    const toastMessageText = existingTicket ? 'Ticket updated!' : 'Ticket created!'

    const handleSuccessToastClose = () => {
        setSuccess(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
        setTitle(titleValue)
        setDescription(descriptionValue)
        setDevelopers(developersValue)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const newTicket = {
            title: title,
            description: description,
            developers: developers,
            priority: priority,
        }
        console.log(newTicket)
        setOpen(false)
        setSuccess(true)
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    };
    const handleDevelopersChange = (e) => {
        setDevelopers(e.target.value)
    };
    const handlePriorityChange = (e) => {
        setPriority(e.target.value)
    };
    const prioritiesList = ['Low', 'Medium', 'High', 'Urgent']
    const messageText = existingTicket ? 'Update the current ticket.' : 'Submit a new ticket to the current project.'

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                {props.text}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.text}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {messageText}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        onChange={handleTitleChange}
                        value={title}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        multiline
                        rowsMax={10}
                        fullWidth
                        onChange={handleDescriptionChange}
                        value={description}
                    />
                    <InputLabel id='developers-label'>Developers</InputLabel>
                    <Select
                        id='developers'
                        labelId='developers-label'
                        label='Developers'
                        select
                        multiple
                        fullWidth
                        onChange={handleDevelopersChange}
                        value={developers}
                    >
                        <MenuItem value={developers}> </MenuItem>
                        {props.uniqueDevelopers.map((developer, index) => {
                            return <MenuItem key={index} value={developer}>{developer}</MenuItem>
                        })}
                    </Select>
                    <TextField
                        id='priority'
                        label='Priority'
                        select
                        fullWidth
                        onChange={handlePriorityChange}
                        value={priority}
                    >
                        {prioritiesList.map((priority, index) => {
                            return <MenuItem key={index} value={priority}>{priority}</MenuItem>
                        })}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <SubmitButton title={title} description={description} developers={developers} handleSubmit={handleSubmit} />
                </DialogActions>
            </Dialog>
            <ToastMessage message={toastMessageText} trigger={success} onClose={handleSuccessToastClose} />
        </div>
    );
}

function SubmitButton(props) {
    const titleIsEmpty = !(props.title)
    const handleSubmit = props.handleSubmit
    if (titleIsEmpty) {
        return (
            <Tooltip title='A title is required.'>
                 <span>
                    <Button color="primary" disabled>
                        Create
                    </Button>
                 </span>
            </Tooltip>
        )
    } else {
        return (
            <Button onClick={handleSubmit} color="primary">
                Create
            </Button>
        )
    }
}
