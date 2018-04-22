import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import Home from './Home';
import LoginSignup from './LoginSignup';

class MainPage extends Component {

  state={
    username:'',
    password:'',
    islogged:'',
    user:''
  };

  componentWillMount(){
    this.setState({username:'a@a.com',password:'',user:'FirstName',islogged:'true'});
  }

  handleLogout = () => {

    };

    render() {
        return (
          <div className="w3-container w3-panel">
          <h1 align="center">SURVEY APE</h1>
          {
            this.state.islogged==='false' ?
            (<LoginSignup/>)
           :( <Home user={this.state.user} handleLogout={this.handleLogout}/> )
         }
         </div>
        );
    }
}

export default MainPage;
