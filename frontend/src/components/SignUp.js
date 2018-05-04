import React, {Component} from 'react';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormErrors} from './FormErrors';

class SignUp extends Component {

    static propTypes = {
        message: PropTypes.string.isRequired,
        handleSignUp: PropTypes.func.isRequired
    };

    state = {
        firstname: '',
        lastname: '',
        phoneNo: '',
        email: '',
        password: '',
        message: ''
    };

    componentWillMount() {
        this.setState({
            firstname: '',
            lastname: '',
            phoneNo: '',
            email: '',
            password: '',
            message: ''
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            formErrors: {email: '', password: '', firstname: '', lastname: '', phoneNo: ''},
            emailValid: false,
            passwordValid: false,
            firstnameValid: false,
            lastnameValid: false,
            phoneValid: false,
            formValid: false
        }
    }

    handleSignUp = (userdata) => {
        this.props.handleSignUp(userdata);
    };

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
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let phoneValid = this.state.phoneValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'firstname':
                firstnameValid = value.match(/^([\w]{5,})$/i);
                fieldValidationErrors.firstname = firstnameValid ? '' : ' is invalid';
                break;
            case 'lastname':
                lastnameValid = value.match(/^([\w]{1,})$/i);
                fieldValidationErrors.lastname = lastnameValid ? '' : ' is invalid';
                break;
            case 'phoneNo':
                phoneValid = value.match(/^([2-9]\d{2}-\d{3}-\d{4})$/i);
                fieldValidationErrors.phoneNo = phoneValid ? '' : ' is invalid';
                break;
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
            firstnameValid: firstnameValid,
            lastnameValid: lastnameValid,
            phoneValid: phoneValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid && this.state.phoneValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }


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
                                            <div
                                                className={`form-group ${this.errorClass(this.state.formErrors.firstname)}`}>
                                                <input type="text" name="firstname" tabindex="1"
                                                       class="form-control" label="First Name"
                                                       placeholder="First Name" value={this.state.firstname}
                                                       onChange={this.handleUserInput}/>
                                            </div>
                                            <div
                                                className={`form-group ${this.errorClass(this.state.formErrors.lastname)}`}>
                                                <input type="text" name="lastname" tabindex="1"
                                                       class="form-control" label="Last Name"
                                                       placeholder="Last Name" value={this.state.lastname}
                                                       onChange={this.handleUserInput}/>
                                            </div>
                                            <div
                                                className={`form-group ${this.errorClass(this.state.formErrors.phoneNo)}`}>
                                                <input type="text" name="phoneNo" tabindex="1"
                                                       class="form-control" label="Phone Number "
                                                       placeholder="Phone Number" value={this.state.phoneNo}
                                                       onChange={this.handleUserInput}/>
                                            </div>
                                            <div
                                                className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                                <input type="text" name="email" tabindex="1"
                                                       class="form-control" label="Email" placeholder="Email ID"
                                                       value={this.state.email}
                                                       onChange={this.handleUserInput}/>
                                            </div>
                                            <div
                                                className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                                <input type="password" name="password" id="password" tabindex="2"
                                                       class="form-control" label="password"
                                                       placeholder="Password" value={this.state.password}
                                                       onChange={this.handleUserInput}/>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="register-submit"
                                                               id="register-submit" tabindex="4"
                                                               class="form-control btn btn-register"
                                                               value="Register Now"
                                                               disabled={!this.state.formValid}
                                                               onClick={() => this.handleSignUp(this.state)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/><br/> <h5
                                            style={{color: 'Red', textAlign: 'center'}}>{this.props.message}</h5>
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
        );
    }
}

export default withRouter(SignUp);
