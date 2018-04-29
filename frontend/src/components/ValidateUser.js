import React, {Component} from 'react';
import * as API from '../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home';

class ValidateUser extends Component {

    static propTypes = {
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        console.log("this.props.email ::", this.props.email);
        this.state = {
            email: this.props.email,
            password: this.props.password,
            verificationCode: '',
            message: '',
            isValidated: 'false'
        };
    }

    handleVerifyUser = (userdata) => {
        console.log("inside handle verify user");
        API.verifyUser(userdata)
            .then((status) => {
                this.setState({
                    email: userdata.email,
                    //  password: userdata.password
                    islogged: 'true',
                    message: "Successfully vefified !!"
                });
                if (status === 200) {
                    console.log("message result 200 ");
                    this.props.history.push("/Home");
                }
            });
    };

    componentWillMount() {
        this.setState({username: '', message: ''});
    }

    render() {
        return (
            <div>

                <div className="w3-container w3-panel">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 col-md-offset-3">
                                <div class="panel panel-login">
                                    <div class="panel-body">
                                        <div class="row">
                                            <h4 style={{marginLeft: "20px"}}>Username - {this.props.email}</h4>
                                            <div class="col-lg-12">
                                                <div class="form-group">
                                                    <input type="text" name="username" id="username"
                                                           tabindex="1"
                                                           class="form-control" label="First Name"
                                                           placeholder="Verification Code "
                                                           value={this.state.verificationCode}
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   verificationCode: event.target.value
                                                               });
                                                           }}/>
                                                </div>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-sm-6 col-sm-offset-3">
                                                            <input type="submit" name="register-submit"
                                                                   id="register-submit" tabindex="4"
                                                                   class="form-control btn btn-register"
                                                                   value="Validate"
                                                                   onClick={() => this.handleVerifyUser(this.state)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Route exact path="/Home" render={() => (
                    <Home email={this.state.email} message={this.state.message} handleLogout={this.handleLogout}/>
                )}/>
            </div>
        );
    }
}

export default withRouter(ValidateUser);
