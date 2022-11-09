import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Settings from './pages/Settings';
import store from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ App } />
      </Switch>
    </Provider>
  </BrowserRouter>,
);
