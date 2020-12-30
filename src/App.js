import './App.css';
import Toolbar from './Components/Toolbar/Toolbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import GamesGrid from './Components/GamesGrid/GamesGrid';
import Form from './Components/Form/Form';
import GameInfo from './Components/GameInfo/GameInfo';
import Edit from './Components/Edit/Edit';

//Switch only allows one Route component to render
//Route is used to specify which path(url) should access which component
//exact, a property of Route component, when true The route will only access that path and not its successors
//e.g /games route will rendere its component even when path is /games/:something when exact is false
//Redirect component redirects unwanted paths to a desired path '/' will redirect all paths(exact is false)

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Switch>

        <Route path='/games' component={GamesGrid} />
        <Route path='/game/:id' exact component={GameInfo} />

        <Redirect from='/' to='/games' />
      </Switch>
    </div>
  );
}

export default App;
