import './App.css';
import React from 'react';
import Home from './Components/Home';
import Pantry from './Components/Pantry';
import Recipe from './Components/Recipe';
import Nav from './Components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/pantry" exact component={Pantry} />
          <Route path="/recipe" exact component={Recipe} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
