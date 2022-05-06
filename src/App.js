import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
// import PrivateRoute from './components/PrivateRoute';
import React from 'react';
import { Route } from 'react-router-dom';
import Signup from './components/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
