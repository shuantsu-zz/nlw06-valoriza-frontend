import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import Dashboard from './pages/dashboard';
import { ToastContainer } from 'react-toastify';

import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./globalStyles.scss";

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
<>
<ThemeProvider theme={darkTheme}>
  <CssBaseline/>
  <Router>
    <Switch>
        <Route exact path="/dashboard">
          <Dashboard/>
        </Route>
        <Route exact path="/">
          <Index/>
        </Route>
    </Switch>
  </Router>
</ThemeProvider>
<ToastContainer />
</>,
document.getElementById('root'));