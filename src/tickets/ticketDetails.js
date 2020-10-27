import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// React Router imports
import { useParams } from "react-router-dom";

// Material-UI tables
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Internal imports
import CreateTicketModalForm from "../tickets/createTicket";
import teams from "../fakeAPI/teams";

// CSS Modules
import styles from './ProjectDetailsPane.module.css'

export { TicketDetailsPage }

const team = teams[0]

// Page
function TicketDetailsPage(props) {
    const { ticketId } = useParams();
    const allTickets = props.allTickets
    const ticket = allTickets.find((ticket) => ticket.id.toString() === ticketId)
    /* TODO: the above pattern is probably not great; will revisit when the API is wired up */
    // get comments here or in Comment Pane?


}



// Comment Pane
function CommentPane(props) {
    const ticket = props.ticket
    const comments = '' // this will be retrieved from the API by ticket; ultimately, will need to be state so it can be updated

    // State
    const [commentText, setCommentText] = useState('')
    const handleCommentInputChange = (e) => {
        setCommentText(e.target.value)
    }

    return (
        <div>
            <h3>Comments</h3>
            <CommentList comments={comments} />
            <CommentInput commentText={commentText} handleCommentInputChange={handleCommentInputChange} />
        </div>
    )
}


function CommentInput(props) {
    const handleCommentInputChange = props.handleCommentInputChange
    const commentText = props.commentText
    return (
        <TextField
            margin='dense'
            label='comment-text'
            type='text'
            multiline
            rowsMax={10}
            fullWidth
            onChange={handleCommentInputChange}
            value={commentText}
        />
    )
}


function CommentList(props) {
    {/* TODO: add comment delete button */}
    const comments = props.comments
    const commentElements = comments.map((comment) => {
        return (
            <li key={comment.id}>
                <p>{`${comment.text}`}</p>
                <p><em>{`${comment.user} on ${comment.created_on}`}</em></p>
            </li>
        )
    })
    return (
        <ul>
            {commentElements}
        </ul>
    )
}


// Ticket Details Pane
function TicketPane(props) {
    const ticket = props.ticket

    // State
    const [status, setStatus] = useState(ticket.status) // 'open' or 'closed'
    const handleTicketStatusToggle = () => {
        setStatus(
            status === 'open' ? 'close' : 'open'
        )
    }

    return (
        <div>
            <TicketInfo ticket={ticket} />
            <TicketInput ticket={ticket} handleTicketStatusToggle={handleTicketStatusToggle} />
            {/* TODO: add subscribe/unsubscribe button */}
        </div>
    )

}

function TicketInfo(props) {
    const ticket = props.ticket
    return (
        <div>
            <h3>{ticket.title}</h3>
            <p>{`Submitted by: ${ticket.user}`}</p>
            <p>{`Priority: ${ticket.priority}`}</p>
            <p>{`Status: ${ticket.status}`}</p>
            <p>{`Created on: ${ticket.created_on}`}</p>
            <p>{`Last updated: ${ticket.updated_on}`}</p>
        </div>
    )
}

function TicketInput(props) {
    const ticket = props.ticket
    const handleTicketStatusToggle = props.handleTicketStatusToggle
    const ticketStatusToggleText = ticket.status === 'closed' ? 'Reopen ticket' : 'Close ticket'
    return (
        <div>
            <CreateTicketModalForm existingTicket={ticket} uniqueDevelopers={team.members} text='Update ticket' />
            <Button onClick={handleTicketStatusToggle}>{ticketStatusToggleText}</Button>
        </div>
    )
}