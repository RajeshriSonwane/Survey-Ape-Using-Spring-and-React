import React, {Component} from 'react';
import * as API from '../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import Login from './Login';
import PropTypes from 'prop-types';

class SignUp extends Component {

    state = {
        username: '',
        lastname: '',
        phoneNo: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    componentWillMount() {
        this.setState({
            username: '',
            lastname: '',
            phoneNo: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    handleSignUp = (userdata) => {

        if (userdata.email === "") {
            //   showAlert("Enter username for sign up", "error", this);
            return;
        }
        if (userdata.password === "") {
            //   showAlert("Enter password for sign up", "error", this);
            return;
        }
        if (userdata.username === "") {
            // showAlert("Enter First Name for sign up", "error", this);
            return;
        }
        if (userdata.lastname === "") {
            //  showAlert("Enter Last Name for sign up", "error", this);
            return;
        }
        if (userdata.phoneNo === "") {
            //   showAlert("Enter username for sign up", "error", this);
            return;
        }
        if (userdata.email !== "") {
            API.signup(userdata)
                .then((status) => {
                    if (status === 201) {
                        this.setState({
                            isLoggedIn: false,
                            message: "Something's wrong, Try again..!!"
                        });

                    } else {
                        //   showAlert("Sign Up successfully", "info", this);
                        this.props.history.push("/Login");
                    }
                });
        }
    };

    render() {

        return (
            <div className="w3-container w3-panel">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <div class="panel panel-login">
                                <div class="panel-heading">
                                    <div class="row">
                                        <div class="col-xs-6">
                                            <a href="/Login">Login</a>
                                        </div>
                                        <div class="col-xs-6">
                                            <a href="/SignUp" class="active">Register</a>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <input type="text" name="username" id="username" tabindex="1"
                                                       class="form-control" label="First Name"
                                                       placeholder="First Name" value={this.state.username}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               username: event.target.value
                                                           });
                                                       }}/>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" name="username" tabindex="1"
                                                       class="form-control" label="Last Name"
                                                       placeholder="Last Name" value={this.state.lastname}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               lastname: event.target.value
                                                           });
                                                       }}/>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" name="phoneNo" tabindex="1"
                                                       class="form-control" label="Phone Number "
                                                       placeholder="Phone Number" value={this.state.phoneNo}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               phoneNo: event.target.value
                                                           });
                                                       }}/>
                                            </div>
                                            <div class="form-group">
                                                <input type="email" name="email" id="email" tabindex="1"
                                                       class="form-control" label="Email" placeholder="Email ID"
                                                       value={this.state.email}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               email: event.target.value
                                                           });
                                                       }}/>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="password" id="password" tabindex="2"
                                                       class="form-control" label="password"
                                                       placeholder="Password" value={this.state.password}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               password: event.target.value
                                                           });
                                                       }}/>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="confirm-password" id="confirm-password"
                                                       tabindex="2" class="form-control"
                                                       placeholder="Confirm Password"
                                                       value={this.state.confirmPassword}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               confirmPassword: event.target.value
                                                           });
                                                       }}/>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="register-submit"
                                                               id="register-submit" tabindex="4"
                                                               class="form-control btn btn-register"
                                                               value="Register Now"
                                                               onClick={() => this.handleSignUp(this.state)}/>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);
