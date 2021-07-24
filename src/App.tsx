import React from "react";
import EpisodeList from "./components/EpisodeList/EpisodeList";
import "./assets/styles/main.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h2 className="center home-title">Список серий</h2>
          <EpisodeList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
