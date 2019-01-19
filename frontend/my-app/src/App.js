import React, { Component } from 'react';
import Main from './Main';
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme();

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Main/>
      </ThemeProvider>
    );
  }
}

export default App;
