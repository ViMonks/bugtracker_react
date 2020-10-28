import React from 'react';
import logo from './logo.svg';

// React Router Imports
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

import projects from "./fakeAPI/projects";
import tickets from "./fakeAPI/tickets";
import { ProjectDisplay } from './projects/projectViews';
import { ProjectDetailsPage } from "./projects/projectDetails";
import { TicketDetailsPage } from "./tickets/ticketDetails";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      <h3>Bugtracker</h3>
        <div>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <ProjectDisplay projects={projects}/>
                    </Route>
                    <Route path='/tickets/:ticketId'>
                        <TicketDetailsPage allTickets={tickets} />
                    </Route>
                    <Route path='/projects/:projectId'>
                        <ProjectDetailsPage allProjects={projects} allTickets={tickets} />
                    </Route>
                </Switch>
            </Router>
        </div>
    </div>
  );
}

export default App;
