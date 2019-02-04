import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
//import Home from "./Home";
import Players from "./Team_Play";
import Teams from "./App";
class Main extends Component {
  render() {
    return (
       <HashRouter>
        <div>
          <h1>Counter-Strike: GO Esports</h1>
          <ul className="header">
            <li><NavLink exact to="/">Stuff</NavLink></li>
            
          </ul>
          <div className="content">
            <Route exact path="/" component={Teams}/>
            <Route path="/Players/:id" component={Players}/>
          </div>
        </div>
         </HashRouter>
    );
  }
}

export default Main;
