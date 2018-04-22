import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainPage from "./components/MainPage";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <MainPage/>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
