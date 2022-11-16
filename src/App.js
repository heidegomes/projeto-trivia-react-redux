import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Style/App.css';
import Settings from './pages/Settings';

import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Rankings from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/rankings" component={ Rankings } />
    </Switch>
  );
}
