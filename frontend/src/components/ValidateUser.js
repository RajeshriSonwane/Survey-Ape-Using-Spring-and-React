import React, {Component} from 'react';
import * as API from '../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class ValidateUser extends Component {

    static propTypes = {
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        console.log("this.props.email ::",this.props.email);
        this.state = {
            email: this.props.email,
            password:this.props.password,
            verificationCode:'',
            message: ''
        };
    }

    handleVerifyUser = (x) => {
        console.log("state :",this.state);
        API.verifyUser(x)
            .then((output) => {
                if (output === 200) {
                    this.setState({
                        islogged: 'true'
                    });
                    console.log("Success verify= " + this.state.islogged);
                } else {
                    this.setState({
                        islogged: 'false',
                        message: "Invalid credentials. Login again."
                    });
                    console.log("Wrong login: " + this.state.islogged);
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
                                            {this.props.email}
                                            {this.props.password}
                                            <div class="col-lg-12">
                                                <div class="form-group">
                                                    <input type="text" name="username" id="username" tabindex="1"
                                                           class="form-control" label="First Name"
                                                           placeholder="Verification Code " value={this.state.verificationCode}
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

export default ValidateUser;
