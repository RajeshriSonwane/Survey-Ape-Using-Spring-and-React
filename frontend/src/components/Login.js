import React, {Component} from 'react';
import * as API from '../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import SignUp from './SignUp';
import Home from './Home';
import {FormErrors} from './FormErrors';
import PropTypes from 'prop-types';

class Login extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
        handleLogin: PropTypes.func.isRequired
    };

    state = {
        email: '',
        password: '',
        islogged: '',
        user: '',
        message: ''
    };

    handleLogin = (userdata) => {
        this.props.handleLogin(userdata);
    };

    componentWillMount() {
        this.setState({email: '', password: '', islogged: 'false', message: this.props.message});
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    componentWillMount() {
        this.setState({
            email: '',
            password: '',
            islogged: '',
            user: '',
            message: ''
        });
    }

    render() {
        return (
            <div>
                <div className="w3-container w3-panel">
                    <div className="container">
                        <div className="row">
                            <br/><br/>
                            <div className="col-md-6 col-md-offset-3">
                                <div className="demoForm">
                                    <div className="panel panel-login">
                                        <div className="panel-heading">
                                            <div className="row">
                                                <div className="col-xs-6">
                                                    <a href="/Login" className="active">Login</a>
                                                </div>
                                                <div className="col-xs-6">
                                                    <Link to='/SignUp'>Register</Link>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div
                                                        className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                                        <input type="text" name="email"
                                                               tabindex="1"
                                                               className="form-control" placeholder="Username"
                                                               value={this.state.email}
                                                               onChange={this.handleUserInput}/>

                                                    </div>

                                                    <div
                                                        className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                                        <input type="password" name="password" id="password"
                                                               tabindex="2"
                                                               className="form-control" placeholder="Password"
                                                               value={this.state.password}
                                                               onChange={this.handleUserInput}/>

                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-sm-6 col-sm-offset-3">

                                                                <input type="submit" name="login-submit"
                                                                       id="login-submit"
                                                                       tabindex="4"
                                                                       className="form-control btn btn-login"
                                                                       value="Log In" disabled={!this.state.formValid}
                                                                       onClick={() => this.handleLogin(this.state)}/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <br/><br/> <h5 style={{color: 'Red',textAlign:'center'}}>{this.props.message}</h5>
                                                    <div className="panel panel-default">
                                                        <FormErrors formErrors={this.state.formErrors}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Route exact path="/SignUp" render={SignUp}/>
                    <Route exact path="/Home" render={() => (
                        <Home email={this.state.email} message={this.state.message}
                              handleLogout={this.handleLogout}/>
                    )}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
