import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import * as API from '../api/API';
import Home from './Home';
import LoginSignUp from "./LoginSignup";


class MainPage extends Component {

    state = {
        username: '',
        password: '',
        islogged: '',
        user: '',
        message: ''
    };

    componentWillMount() {
        this.setState({username: 'a@a.com', password: '', user: 'User', islogged: 'true'});
    }

    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if (status === 200) {
                    this.setState({
                        isLoggedIn: false,
                        user: "LoggedOut"
                    });
                    this.props.history.push("/");
                }
            });
    };

    render() {
        return (
            <div className="w3-container w3-panel">
                <div>
                    <h1 align="center">SURVEY APE</h1>
                    {
                        this.state.islogged === 'false' ?
                            (<LoginSignUp/>
                            )
                            : ( <Home user={this.state.user} handleLogout={this.handleLogout}/> )
                    }
                </div>
            </div>
        );
    }
}

export default MainPage;
