import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import React from 'react';
import { Route } from 'react-router-dom';
import Signup from './components/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
