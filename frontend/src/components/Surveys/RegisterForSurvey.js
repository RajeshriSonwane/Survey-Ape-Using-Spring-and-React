import React, {Component} from 'react';
import * as API from '../../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../Home';

class RegisterForSurvey extends Component {

    state = {
        email: '',
        surId: this.props.surId
    };

    static propTypes = {
        surId: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        console.log("props in register open ",props);
        this.State = {
            surId: this.props.surId,
            email:''
        }
        //  this.handleRegisterUser = this.handleRegisterUser.bind(this);
        console.log("register for survey ID survey", this.props.surId);
    }

    handleRegisterUser = (userdata) => {
        console.log("inside handle handleRegisterUser user");
        API.registerOpenUser(userdata)
            .then((status) => {
                this.setState({
                    email: userdata.email,
                    message: "Successful !!"
                });
            });
    };

    render() {
        return (
            <div>

                <div className="w3-container w3-panel">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 col-md-offset-3">
                                <div class="panel panel-login" style={{marginTop: "100px"}}>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <h4>Enter your Email ID to register for open Survey</h4>
                                                <div class="form-group" style={{marginTop: "30px"}}>
                                                    <input type="text" tabindex="1" class="form-control"
                                                           placeholder="Email ID "
                                                           value={this.state.email}
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   email: event.target.value
                                                               });
                                                           }}/>
                                                </div>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-sm-6 col-sm-offset-3">
                                                            <input type="submit" name="register-submit"
                                                                   id="register-submit" tabindex="4"
                                                                   class="form-control btn btn-register"
                                                                   value="Register"
                                                                   onClick={() => this.handleRegisterUser(this.state)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.message}
                                            </div>
                                            <div style={{marginLeft: "500px"}}>
                                                <Link to='/MainPage'>Back</Link></div>
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

export default withRouter(RegisterForSurvey);
