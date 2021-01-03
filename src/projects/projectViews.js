import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import getProjects from "../api_access/getProjects";

// React Router Imports
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

// ReactQuery imports
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

// Axios imports
import axios from "axios";
import { axiosHeaders, myHeaders } from "../api_access/getProjects";
// const axios = require('axios').default;

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
// import myHeaders from "../api_access/getProjects";

// CSS Modules
import styles from './ProjectTable.module.css'
import {useTable} from "react-table";

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
            {/*<ProjectTable*/}
            {/*    projects={projects}*/}
            {/*    title={title}*/}
            {/*    startDate={startDate}*/}
            {/*    endDate={endDate}*/}
            {/*    manager={manager}*/}
            {/*    viewingArchived={viewingArchived}*/}
            {/*/>*/}
            <ProjectTableWrapper />
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

// ReactQuery project table
const queryClient = new QueryClient();
function ProjectTableWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <ProjectTableReactQuery />
        </QueryClientProvider>
    )
}

function ProjectTableReactQuery() {
    const { isLoading, error, data } = useQuery('projectData', () =>
        axios.get("http://localhost:8000/api/teams/monks-test-team/projects/", {headers: axiosHeaders})
            .catch(err => {
                if (err.response) {
                    throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'])
                } else {
                    throw new Error(err)
                }
            })
    )

    if (isLoading) return "Loading, yo..."

    if (error) {
        console.log('Something went wrong: '+error.message)
        return `Whoopsie: ${error.message}`
    }
    console.log(data.data)

    return (
        <MyReactTable data={data.data}/>
    )

}

function MyReactTable(props) {
    const propsData = props.data

    const columns = React.useMemo(
        () => [
            {
                Header: 'title',
                accessor: 'title', // accessor is the "key" in the data
            },
            {
                Header: 'description',
                accessor: 'description',
            },
            {
                Header: 'manager',
                accessor: 'manager',
            },
            {
                Header: 'open_tickets',
                accessor: 'open_tickets',
            },
            {
                Header: 'created',
                accessor: 'created',
            },
        ],
        []
    )

    const data = React.useMemo(
        () => propsData,
        [propsData]
    )

    const tableInstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        // apply the table props
        <table {...getTableProps()}>
            <thead>
            {// Loop over the header rows
                headerGroups.map(headerGroup => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {// Loop over the headers in each row
                            headerGroup.headers.map(column => (
                                // Apply the header cell props
                                <th {...column.getHeaderProps()}>
                                    {// Render the header
                                        column.render('Header')}
                                </th>
                            ))}
                    </tr>
                ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
                rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                        // Apply the row props
                        <tr {...row.getRowProps()}>
                            {// Loop over the rows cells
                                row.cells.map(cell => {
                                    // Apply the cell props
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {// Render the cell contents
                                                cell.render('Cell')}
                                        </td>
                                    )
                                })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}



function ProjectTable(props) {
    // const projects = props.projects
    // const filteredProjects = []

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    // useEffect(() => {
    //     fetch("http://localhost:8000/api/teams/monks-test-team/projects/", {headers: myHeaders})
    //         .then(res => {
    //             if (!res.ok) {
    //                 setError(true)
    //                 throw new Error(`Invalid response. HTTP status: ${res.status}`)
    //             }
    //             res.json()
    //         })
    //         .then(
    //             (res) => {
    //                 if (error) {
    //                     console.log('err')
    //                     setError(res['detail'])
    //                     setIsLoading(false)
    //                 } else {
    //                     console.log('no err')
    //                     setProjects(res);
    //                     setIsLoading(false);
    //                 }
    //             },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             (error) => {
    //                 console.log(error.message)
    //                 setError(error.message)
    //                 setIsLoading(false);
    //             }
    //         )
    // }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/api/teams/monks-test-team/projects/", {headers: myHeaders})
            if (!response.ok) {
                setError(true)
            }
            const json = await response.json()
            if (error) {
                console.log('err')
                setErrorText(json.detail)
                setIsLoading(false)
            } else {
                console.log('no err')
                setProjects(json)
                const filteredProjects = []
                projects.forEach((project) => {
                    // Creating a boolean for each filter input
                    const titleMatch = project.title.toLowerCase().indexOf(props.title.toLowerCase()) !== -1
                    const isArchivedMatch = project.is_archived === props.viewingArchived
                    const manager = project.manager !== null ? project.manager.toLowerCase() : ''
                    const managerMatch = manager === props.manager.toLowerCase() || props.manager === ''
                    const startDateMatch = new Date(project.created) >= new Date(props.startDate) || props.startDate === ''
                    const endDateMatch = new Date(project.created) <= new Date(`${props.endDate} 11:59:59 PM`) || props.endDate === ''
                    // Creating a boolean that aggregates each individual filter input, then returns a table row for each item that matches the aggregate
                    const allFiltersMatch = titleMatch && isArchivedMatch && startDateMatch && endDateMatch && managerMatch
                    if (allFiltersMatch) {
                        filteredProjects.push(
                            <ProjectTableRow key={project.id} project={project}/>
                        )
                    }
                })
                setProjects(filteredProjects)
                setIsLoading(false)
            }
        }
        fetchData();
    }, [])

    // projects.forEach((project) => {
    //     // Creating a boolean for each filter input
    //     const titleMatch = project.title.toLowerCase().indexOf(props.title.toLowerCase()) !== -1
    //     const isArchivedMatch = project.is_archived === props.viewingArchived
    //     const manager = project.manager !== null ? project.manager.toLowerCase() : ''
    //     const managerMatch = manager === props.manager.toLowerCase() || props.manager === ''
    //     const startDateMatch = new Date(project.created) >= new Date(props.startDate) || props.startDate === ''
    //     const endDateMatch = new Date(project.created) <= new Date(`${props.endDate} 11:59:59 PM`) || props.endDate === ''
    //     // Creating a boolean that aggregates each individual filter input, then returns a table row for each item that matches the aggregate
    //     const allFiltersMatch = titleMatch && isArchivedMatch && startDateMatch && endDateMatch && managerMatch
    //     if (allFiltersMatch) {
    //         filteredProjects.push(
    //             <ProjectTableRow key={project.id} project={project}/>
    //         )
    //     }
    // })


    if (isLoading) {
        return <div><h1>Loading...</h1></div>
    } else if (error) {
        return <div><h1>Error: {errorText}</h1></div>
    } else {
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
                        {projects}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

function ProjectTableRow(props) {
    const project = props.project

    const date = new Date(project.created).toLocaleDateString()

    return (
        <TableRow>
            <TableCell component='th' scope='row'>
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>{project.manager}</TableCell>
            <TableCell>{project.open_tickets}</TableCell>
            <TableCell>{date}</TableCell>
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