import React from 'react';
import Todo from './Todo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import Register from './Register';
import InvalidRequest from './InvalidRequest';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/view" component={Todo} />
        <Route exact path="/register" component={Register} />
        <Route path="/" component={InvalidRequest} />
      </Switch>
    </Router>
  );
}

export default App;
