import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import projects from "../fakeAPI/projects";

export { ProjectDisplay }


function ProjectDisplay(props) {
    const projects = props.projects
    return (
        <div>
            <ProjectFilter/>
            <ProjectTable projects={projects}/>
        </div>
    )
}


function ProjectFilter() {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openTickets, setOpenTickets] = useState(null);
    const [manager, setManager] = useState(null);

    return (
        <form>
            <label>
                Title
                <input type="text"/>
            </label>
            <label>
                Start Date
                <input type="date"/>
            </label>
            <label>
                End Date
                <input type="date"/>
            </label>
            <label>
                Manager
                <select name="manager" id="manager">
                    <option value="1">Manager 1</option>
                    <option value="2">Manager 2</option>
                </select>
            </label>
            <Button variant="contained" color="primary">
                Search
            </Button>
            <Button color="primary">
                Reset
            </Button>
        </form>
    )
}


function ProjectTable(props) {
    const projects = props.projects
    const projectList = projects.map((project) =>
        <ProjectTableRow key={project.id} project={project} />
    )
    return (
        <table>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Manager</th>
                <th>Open Tickets</th>
                <th>Created</th>
            </tr>
            {projectList}
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

// export ProjectTable