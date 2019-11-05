import React from 'react';
import Todo from './Todo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import history from './history';
import Register from './Register';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/view" component={Todo} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
