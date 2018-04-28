import React, {Component} from 'react';
import * as API from '../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import ValidateUser from './ValidateUser';

class LoginSignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }

        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(userdata){
        console.log("inside singn")
        API.signup(userdata)
            .then((status) => {
                this.setState({
                    email:userdata.email,
                    password:userdata.password
                });
                if (status === 201) {
                } else {
                    this.props.history.push("/ValidateUser");
                }
            });
    }

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
                        <SignUp handleSignUp={this.handleSignUp}/>
                    </div>
                )}/>
                <Route exact path="/ValidateUser" render={() => (
                    <div>
                        <ValidateUser email={this.state.email} password={this.state.password}/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(LoginSignUp);
