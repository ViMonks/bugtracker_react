import React from 'react';
import logo from './logo.svg';
// import './App.css';
// import './primitive.css'

import projects from "./fakeAPI/projects";
import { ProjectDisplay } from './projects/projectViews'

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
            <ProjectDisplay projects={projects}/>
        </div>
    </div>
  );
}

export default App;
