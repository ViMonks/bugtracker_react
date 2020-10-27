import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// React Router Imports
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
import teams from "../fakeAPI/teams";

// CSS Modules
import styles from './ProjectTable.module.css'

export { ProjectDisplay }

function ProjectDisplay(props) {
    // State setup
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [manager, setManager] = useState('');
    const [viewingArchived, setViewingArchived] = useState(false);
    const projects = props.projects
    // const managers = projects.map((project) => project.manager)
    // const uniqueManagers = [...new Set(managers)]
    const uniqueManagers = teams[0].managers

    // Ancestor functions setup
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleManagerChange = (e) => {
        setManager(e.target.value)
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }
    const handleViewingArchivedToggle = () => {
        setViewingArchived(!viewingArchived)
    }
    const handleResetClick = () => {
        setTitle('')
        setStartDate('')
        setEndDate('')
        setManager('')
    }

    return (
        <div>
            <ProjectFilter
                title={title}
                startDate={startDate}
                endDate={endDate}
                manager={manager}
                uniqueManagers={uniqueManagers}
                handleTitleChange={handleTitleChange}
                handleManagerChange={handleManagerChange}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                handleResetClick={handleResetClick}
            />
            <ProjectTable
                projects={projects}
                title={title}
                startDate={startDate}
                endDate={endDate}
                manager={manager}
                viewingArchived={viewingArchived}
            />
            <ButtonsRow
                viewingArchived={viewingArchived}
                handleArchivedToggleClick={handleViewingArchivedToggle}
                uniqueManagers={uniqueManagers}
            />
        </div>
    )
}


function ProjectFilter(props) {
    return (
        <form>
            <div className={styles.inputContainer}>
                <TextField id='title' label='Title' value={props.title} onChange={props.handleTitleChange} variant='filled' />
                <TextField
                    id="date"
                    label="Start date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={props.startDate}
                    onChange={props.handleStartDateChange}
                    variant='filled'
                />
                <TextField
                    id="date"
                    label="End date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={props.endDate}
                    onChange={props.handleEndDateChange}
                    variant='filled'
                />
                <TextField
                    id='manager'
                    label='Manager'
                    value={props.manager}
                    onChange={props.handleManagerChange}
                    select
                    style={{minWidth: '25ch'}}
                    variant='filled'
                >
                    <MenuItem value=''></MenuItem>
                    {props.uniqueManagers.map((manager, index) => {
                        return <MenuItem key={index} value={manager}>{manager}</MenuItem>
                    })}
                </TextField>
                <Button color="primary" onClick={props.handleResetClick}>Reset</Button>
            </div>
        </form>
    )
}


function ButtonsRow(props) {
    return (
        <div className={styles.inputContainer}>
            <CreateProjectModalForm uniqueManagers={props.uniqueManagers} text='Create new project' />
            <ArchivedProjectsToggle viewingArchived={props.viewingArchived} handleClick={props.handleArchivedToggleClick} />
        </div>
    )
}


function ProjectTable(props) {
    const projects = props.projects
    const filteredProjects = []

    projects.forEach((project) => {
        // Creating a boolean for each filter input
        const titleMatch = project.title.toLowerCase().indexOf(props.title.toLowerCase()) !== -1
        const isArchivedMatch = project.is_archived === props.viewingArchived
        const managerMatch = project.manager.toLowerCase() === props.manager.toLowerCase() || props.manager === ''
        const startDateMatch = new Date(project.created_on) >= new Date(props.startDate) || props.startDate === ''
        const endDateMatch = new Date(project.created_on) <= new Date(`${props.endDate} 11:59:59 PM`) || props.endDate === ''
        // Creating a boolean that aggregates each individual filter input, then returns a table row for each item that matches the aggregate
        const allFiltersMatch = titleMatch && isArchivedMatch && managerMatch && startDateMatch && endDateMatch
        if (allFiltersMatch) {
            filteredProjects.push(
                <ProjectTableRow key={project.id} project={project}/>
            )
        }
    })
    return (
        <TableContainer component={Paper}>
            <Table aria-label='table of projects'>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Manager</TableCell>
                        <TableCell>Open Tickets</TableCell>
                        <TableCell>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProjects}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function ProjectTableRow(props) {
    const project = props.project
    return (
        <TableRow>
            <TableCell component='th' scope='row'>
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>{project.manager}</TableCell>
            <TableCell>{project.open_tickets}</TableCell>
            <TableCell>{project.created_on}</TableCell>
        </TableRow>
    )
}


function ArchivedProjectsToggle(props) {
    const viewingArchived = props.viewingArchived
    return (
        <Button color="primary" onClick={props.handleClick}>
            {viewingArchived ? 'View Open Projects' : 'View Archived Projects'}
        </Button>
    )
}