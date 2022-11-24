import { Route, Switch } from "react-router-dom";
import Audiocall from "../Containers/Games/Audiocall/Audiocall";
import Games from "../Containers/Games/Games";
import Sprint from "../Containers/Games/Sprint/Sprint";
import Wordle from "../Containers/Games/Wordle/Wordle";
import Home from "../Containers/Home/Home";
import Login from "../Containers/Login/Login";
import Signup from "../Containers/Signup/Signup";
import Statistics from "../Containers/Statistics/Statistics";
import Team from "../Containers/Team/Team";
import TextbookPage from "../Containers/TextbookPage/TextbookPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/textbook">
        <TextbookPage />
      </Route>
      <Route exact path="/games">
        <Games />
      </Route>
      <Route exact path="/games/audiocall">
        <Audiocall />
      </Route>
      <Route exact path="/games/sprint">
        <Sprint />
      </Route>
      <Route exact path="/games/wordle">
        <Wordle />
      </Route>
      <Route exact path="/team">
        <Team />
      </Route>
      <Route exact path="/statistics">
        <Statistics />
      </Route>
    </Switch>
  );
}
