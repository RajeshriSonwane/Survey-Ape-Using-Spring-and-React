import React, {Component} from 'react';
import * as API from '../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import SignUp from './SignUp';
import Home from './Home';
import MainPage from './MainPage';


class Login extends Component {

    state = {
        email: '',
        password: '',
        islogged: '',
        user: '',
        message: ''
    };

    componentWillMount() {
        this.setState({
            email: '',
            password: '',
            islogged: '',
            user: '',
            message: ''
        });
    }

    handleLogin = (userdata) => {
        this.props.handleLogin(userdata);
    };

    componentWillMount() {
        this.setState({email: '', password: '', islogged: 'false', message: ''});
    }

    render() {
        return (
            <div>
                <div className="w3-container w3-panel">
                    <div class="container">
                        <div class="row">
                            <br/><br/>
                            <div class="col-md-6 col-md-offset-3">
                                <div class="panel panel-login">
                                    <div class="panel-heading">
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <a href="/Login" class="active">Login</a>
                                            </div>
                                            <div class="col-xs-6">
                                                <Link to='/SignUp'>Register</Link>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-lg-12">

                                                <div class="form-group">
                                                    <input type="text" name="username" id="username"
                                                           tabindex="1"
                                                           class="form-control" placeholder="Username"
                                                           value={this.state.email} onChange={(event) => {
                                                        this.setState({
                                                            email: event.target.value
                                                        });
                                                    }}/>
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" name="password" id="password"
                                                           tabindex="2"
                                                           class="form-control" placeholder="Password"
                                                           value={this.state.password} onChange={(event) => {
                                                        this.setState({
                                                            password: event.target.value
                                                        });
                                                    }}/>
                                                </div>
                                                <div class="form-group text-center">
                                                    <input type="checkbox" tabindex="3" class="" name="remember"
                                                           id="remember"/>
                                                    <label for="remember"> Remember Me</label>
                                                </div>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-sm-6 col-sm-offset-3">
                                                            <input type="submit" name="login-submit"
                                                                   id="login-submit"
                                                                   tabindex="4"
                                                                   class="form-control btn btn-login"
                                                                   value="Log In"
                                                                   onClick={() => this.handleLogin(this.state)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="text-center">
                                                                <a href="https://phpoll.com/recover"
                                                                   tabindex="5"
                                                                   class="forgot-password">Forgot Password?</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/><br/> <h3 style={{color: 'Red'}}>{this.state.message}</h3>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Route exact path="/SignUp" render={SignUp}/>
                    <Route exact path="/Home" render={() => (
                        <Home email={this.state.email} message={this.state.message} handleLogout={this.handleLogout}/>
                    )}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
