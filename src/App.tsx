import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EpisodeList from "./components/EpisodeList/EpisodeList";
import "./assets/styles/main.css";

const EpisodePage = React.lazy(
  () => import("./components/EpisodePage/EpisodePage")
);
const CharacterPage = React.lazy(
  () => import("./components/CharacterPage/CharacterPage")
);

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h2 className="center home-title">Список серий</h2>
          <EpisodeList />
        </Route>
        <Suspense fallback="Загрузка...">
          <Route path="/episode/:id" component={EpisodePage} />
          <Route path="/character/:id" component={CharacterPage} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
