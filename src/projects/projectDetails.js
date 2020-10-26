import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// React Router imports
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

// Material-UI tables
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Internal imports
import CreateProjectModalForm from "./createProject";

// CSS Modules
import styles from './ProjectDetailsPane.module.css'

export { ProjectDetailsPage }

// Main output
function ProjectDetailsPage(props) {
    let { projectId } = useParams();
    const allProjects = props.allProjects
    const project = allProjects.find((project) => project.id.toString() === projectId)
    const allTickets = props.allTickets

    // State setup
    const [isArchived, setIsArchived] = useState(project.is_archived)
    const [viewingClosedTickets, setViewingClosedTickets] = useState(false)
    const [titleFilter, setTitleFilter] = useState('')

    // Ancestor function setup
    const handleArchivedToggle = () => {
        setIsArchived(!isArchived)
    }
    const handleTicketStatusToggle = () => {
        setViewingClosedTickets(!viewingClosedTickets)
    }
    const handleTitleChange = (e) => {
        setTitleFilter(e.target.value)
    }
    const handleTitleClear = () => {
        setTitleFilter('')
    }

    // Filtering tickets list
    const projectTickets = allTickets.filter((ticket) => {
        return ticket.project_id === project.id
    })

    // Output
    return (
        <div className={styles.projectDetailsPage}>
            <DetailsPane
                isArchived={isArchived}
                handleArchivedToggle={handleArchivedToggle}
                project={project}
            />
            <TicketsPane
                handleTicketStatusToggle={handleTicketStatusToggle}
                viewingClosedTickets={viewingClosedTickets}
                handleTitleChange={handleTitleChange}
                handleTitleClear={handleTitleClear}
                titleFilter={titleFilter}
                tickets={projectTickets}
            />
        </div>
    )
}


// Details Pane
function DetailsPane(props) {
    const isArchived = props.isArchived
    const handleArchivedToggle = props.handleArchivedToggle
    const project = props.project

    return (
        <div className={styles.detailsPane}>
            <Details project={project} />
            <DetailsInput isArchived={isArchived} handleArchivedToggle={handleArchivedToggle} />
        </div>
    )
}


function DetailsInput(props) {
    const isArchived = props.isArchived
    const handleArchivedToggle = props.handleArchivedToggle
    return (
        <div>
            {/* TODO: Add an update project button */}
            <Button color='primary' onClick={handleArchivedToggle}>
                {isArchived ? 'Reopen project' : 'Archive project'}
            </Button>
            <p>Subscribe to project LINK</p>
        </div>
    )
}


function Details(props) {
    const project = props.project
    let developerListContent
    if (project.developers) {
        const developers = []
        project.developers.forEach((developer) => {
            developers.push(<li>{developer}</li>)
        })
        developerListContent = (
            <ul>
                {developers}
            </ul>
        )
    } else {
        developerListContent = 'No assigned developers'
    }

    return (
        <div>
            <h2>{project.title}</h2>
            <p><strong>Manager:</strong> {project.manager}</p>
            <p>{project.description}</p>
            <p><strong>Assigned developers:</strong></p>
            <span>{developerListContent}</span>
            <p>Manage developers LINK</p>
            <p>{project.created_on}</p>
        </div>
    )
}


// Tickets Pane
function TicketsPane(props) {
    const handleTicketStatusToggle = props.handleTicketStatusToggle
    const viewingClosedTickets = props.viewingClosedTickets
    const handleTitleChange = props.handleTitleChange
    const handleTitleClear = props.handleTitleClear
    const titleFilter = props.titleFilter
    const tickets = props.tickets

    const [ticketCount, setTicketCount] = useState(null)

    const updateTicketCount = (count) => {
        setTicketCount(count)
    }

    const header = viewingClosedTickets ? `Closed Tickets (${ticketCount})` : `Open Tickets (${ticketCount})`

    return (
        <div className={styles.ticketsPane}>
            <h3 className={styles.ticketsPaneHeader}>{header}</h3>
            <TicketFilter handleTitleChange={handleTitleChange} handleTitleClear={handleTitleClear} titleFilter={titleFilter} />
            <TicketTable titleFilter={titleFilter} tickets={tickets} viewingClosedTickets={viewingClosedTickets} updateTicketCount={updateTicketCount} />
            <ButtonsRow handleTicketStatusToggle={handleTicketStatusToggle} viewingClosedTickets={viewingClosedTickets} />
        </div>
    )
}


function ButtonsRow(props) {
    const handleTicketStatusToggle = props.handleTicketStatusToggle
    const ticketStatusViewToggle = props.viewingClosedTickets ? 'View open tickets' : 'View closed tickets'
    return (
        <div>
            {/*<CreateTicketModalForm />*/}
            <Button color='primary' onClick={handleTicketStatusToggle}>{ticketStatusViewToggle}</Button>
        </div>
    )
}


function TicketFilter(props) {
    const handleTitleChange = props.handleTitleChange
    const handleTitleClear = props.handleTitleClear
    const titleFilter = props.titleFilter
    return (
        <form>
            <div className={styles.ticketPaneInput}>
                <TextField id='title' label='Title' value={titleFilter} onChange={handleTitleChange} variant='filled' />
                <Button color='primary' onClick={handleTitleClear}>Reset</Button>
            </div>
        </form>
    )
}


function TicketTable(props) {
    const titleFilter = props.titleFilter
    const tickets = props.tickets
    const filteredTickets = []
    const viewingClosedTickets = props.viewingClosedTickets

    tickets.forEach((ticket) => {
        const titleMatch = ticket.title.toLowerCase().indexOf(titleFilter.toLowerCase()) !== -1
        let ticketStatusMatch
        if (viewingClosedTickets) {
            ticketStatusMatch = ticket.status === 'closed'
        } else {
            ticketStatusMatch = ticket.status === 'open'
        }
        if (titleMatch && ticketStatusMatch) {
            filteredTickets.push(
                <TicketTableRow key={ticket.id} ticket={ticket} />
            )
        }
    })

    const ticketCount = filteredTickets.length

    useEffect(() => {
        props.updateTicketCount(ticketCount)
    })

    return (
        <TableContainer component={Paper}>
            <Table aria-label='table of tickets'>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Developer</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredTickets}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


function TicketTableRow(props) {
    const ticket = props.ticket
    return (
        <TableRow>
            <TableCell component='th' scope='row'>{ticket.title}</TableCell>
            <TableCell>{ticket.user}</TableCell>
            <TableCell>{ticket.developer}</TableCell>
            <TableCell>{ticket.priority}</TableCell>
            <TableCell>{ticket.created_on}</TableCell>
            <TableCell>{ticket.updated_on}</TableCell>
        </TableRow>
    )
}