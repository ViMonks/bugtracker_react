import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";

import { SuccessMessage } from '../utils/toast_messages'


export default function CreateProjectModalForm(props) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [manager, setManager] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSuccessToastClose = () => {
        setSuccess(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
        setTitle('')
        setDescription('')
        setManager('')
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const newProject = {
            title: title,
            description: description,
            manager: manager,
        }
        console.log(newProject)
        setOpen(false)
        setSuccess(true)
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    };
    const handleManagerChange = (e) => {
        setManager(e.target.value)
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create new project
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new project for the current team.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        onChange={handleTitleChange}
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
                    />
                    <TextField
                        id='manager'
                        label='Manager'
                        select
                        fullWidth
                        onChange={handleManagerChange}
                        value={manager}
                    >
                        <MenuItem value={manager}> </MenuItem>
                        {props.uniqueManagers.map((manager, index) => {
                            return <MenuItem key={index} value={manager}>{manager}</MenuItem>
                        })}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <SubmitButton title={title} description={description} manager={manager} handleSubmit={handleSubmit} />
                </DialogActions>
            </Dialog>
            <SuccessMessage message='Project created!' success={success} onClose={handleSuccessToastClose} />
        </div>
    );
}

function SubmitButton(props) {
    const anyFieldIsEmpty = !(props.title && props.description && props.manager)
    const handleSubmit = props.handleSubmit
    if (anyFieldIsEmpty) {
        return (
            <Tooltip title='All fields are required.'>
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


