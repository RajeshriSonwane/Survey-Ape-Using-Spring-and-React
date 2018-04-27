import React, {Component} from 'react';
import * as API from '../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';

class LoginSignUp extends Component {

    render() {
        return (
            <div>
                <div className="w3-container w3-panel">

                </div>

                <Route exact path="/" render={() => (
                    <div>
                        {this.props.history.push("/Login")}
                    </div>
                )}/>

                <Route exact path="/Login" render={() => (
                    <div>
                        <Login/>
                    </div>
                )}/>

                <Route exact path="/SignUp" render={() => (
                    <div>
                        <SignUp/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(LoginSignUp);
