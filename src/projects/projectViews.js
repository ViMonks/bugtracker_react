import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import projects from "../fakeAPI/projects";

export { ProjectDisplay }


function ProjectDisplay(props) {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [manager, setManager] = useState('');
    const [viewingArchived, setViewingArchived] = useState(false);
    const projects = props.projects
    const managers = projects.map((project) => project.manager)
    const uniqueManagers = [...new Set(managers)]

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

    useEffect(() => {

    })

    return (
        <div>
            <ProjectFilter
                title={title}
                startDate={startDate}
                endDate={endDate}
                manager={manager}
                viewingArchived={viewingArchived}
                uniqueManagers={uniqueManagers}
                handleTitleChange={handleTitleChange}
                handleManagerChange={handleManagerChange}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                handleArchivedToggleClick={handleViewingArchivedToggle}
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
        </div>
    )
}


function ProjectFilter(props) {
    return (
        <form>
            <label>
                Title
                <input type="text" value={props.title} onChange={props.handleTitleChange}/>
            </label>
            <label>
                Start Date
                <input type="date" value={props.startDate} onChange={props.handleStartDateChange} />
            </label>
            <label>
                End Date
                <input type="date" value={props.endDate} onChange={props.handleEndDateChange} />
            </label>
            <label>
                Manager
                <select name="manager" id="manager" value={props.manager} onChange={props.handleManagerChange}>
                    <option value=''></option>
                    {props.uniqueManagers.map((manager, index) => {
                        return <option key={index} value={manager}>{manager}</option>
                    })}
                </select>
            </label>
            <CreateNewProjectButton />
            <ArchivedProjectsToggle viewingArchived={props.viewingArchived} handleClick={props.handleArchivedToggleClick} />
            <Button color="primary" onClick={props.handleResetClick}>Reset</Button>
        </form>
    )
}


function ProjectTable(props) {
    const projects = props.projects
    const filteredProjects = []

    projects.forEach((project) => {
        const titleMatch = project.title.toLowerCase().indexOf(props.title.toLowerCase()) !== -1
        const isArchivedMatch = project.is_archived === props.viewingArchived
        const managerMatch = project.manager.toLowerCase() === props.manager.toLowerCase() || props.manager === ''
        const startDateMatch = new Date(project.created_on) >= new Date(props.startDate) || props.startDate === ''
        const endDateMatch = new Date(project.created_on) <= new Date(`${props.endDate} 11:59:59 PM`) || props.endDate === ''
        const allFiltersMatch = titleMatch && isArchivedMatch && managerMatch && startDateMatch && endDateMatch
        if (allFiltersMatch) {
            filteredProjects.push(
                <ProjectTableRow key={project.id} project={project} />
            )
        }
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Manager</th>
                    <th>Open Tickets</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
            {filteredProjects}
            </tbody>
        </table>
    )
}


function ProjectTableRow(props) {
    const project = props.project
    return (
        <tr>
            <td>{project.title}</td>
            <td>{project.description}</td>
            <td>{project.manager}</td>
            <td>{project.open_tickets}</td>
            <td>{project.created_on}</td>
        </tr>
    )
}


function CreateNewProjectButton() {
    return (
        <Button variant="contained" color="primary">
            Create New Project
        </Button>
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