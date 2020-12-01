import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Home from './pages/home'

function App(){
  const [online, setOnline] = React.useState(navigator.onLine)
  if (online) {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
            <Home />
            </Route>
            <Route path="/login">
            <Login type={"login"} />
            </Route>
            <Route path="/register">
            <Login type={"register"} />
            </Route>
            <Route path="/dashboard/:page">
            <Dashboard />
            </Route>
            <Route path="/dashboard">
            <Dashboard />
            </Route>
            <Route>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="container container-offline">
      <div>
      <center>
      <img src="../img/twe_logo.png" alt="The Weekly Edge Logo" />
      <h1>Your browser appears to be offline!</h1>
      <h4>You must have an active internet <br /> connection to use The Weekly Edge</h4>
      </center>
      </div>
      </div>
    )
  }
  
}

export default App;
