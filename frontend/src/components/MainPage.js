import React, {Component} from 'react';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import ValidateUser from "./ValidateUser";
import PropTypes from 'prop-types';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import NewSurvey from './CreateNewSurvey/NewSurvey';
import GiveSurvey from './Surveys/GiveSurvey';
import EditSurvey from './Surveys/EditSurvey';
import PublishSurvey from './Surveys/PublishSurvey';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleSignUp(userdata) {
        console.log("inside singn")
        API.signup(userdata)
            .then((status) => {
                this.setState({
                    email: userdata.email,
                    password: userdata.password,
                    islogged: 'true'
                });
                if (status === 201) {
                } else {
                    this.props.history.push("/ValidateUser");
                }
            });
    }

    handleLogin(userdata) {
        console.log("inside singn")
        API.checklogin(userdata)
            .then((status) => {
                this.setState({
                    email: userdata.email,
                    password: userdata.password,
                    islogged: 'true'
                });
                if (status === 201) {
                } else {
                    this.props.history.push("/Home");
                }
            });
    }

    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if (status === 200) {
                    this.setState({
                        isLogged: false
                    });
                    this.props.history.push("/");
                }
            });
    };

    componentWillMount() {
        this.setState({
            email: 'Guest',
            password: '',
            user: '',
            islogged: 'false',
            message: ''
        });
    }

    render() {
        var partial;
        if (this.state.islogged === "false") {
            partial = <div>
                <div className="col-sm-2 col-md-2 col-lg-1"><Link to='/Login'>Login</Link></div>
                <div className="col-sm-2 col-md-2 col-lg-1"><Link to='/SignUp'>Register</Link>
                </div>
            </div>
        }
        else {
            partial = <div className="col-sm-2 col-md-2 col-lg-1"><Link to='/'>Logout</Link></div>
        }
        return (
            <div className="w3-container w3-panel" style={{}}>
                <div>
                    <h1 align="center">SURVEY APE</h1>
                    <br/><br/>
                    <div className="row">
                        <div className="col-sm-1 col-md-1 col-lg-1"></div>
                        <div className="col-sm-2 col-md-2 col-lg-8"><h5>Welcome {this.state.email}</h5></div>
                        {partial}
                    </div>
                    <div className="row w3-cell-row" style={{marginLeft: "1300px"}}><Link to='#'>Click here to
                        participate in open
                        survey</Link>
                    </div>
                    <hr/>
                </div>

                <Route exact path="/Login" render={() => (
                    <Login handleLogin={this.handleLogin}/>
                )}/>
                <Route exact path="/SignUp" render={() => (
                    <SignUp handleSignUp={this.handleSignUp}/>
                )}/>
                <Route exact path="/ValidateUser" render={() => (
                    <ValidateUser handleVerifyUser={this.handleVerifyUser}
                                  email={this.state.email} password={this.state.password}/>
                )}/>
                <Route exact path="/home" render={() => (
                    <Home email={this.state.email} message={this.state.message} handleLogout={this.handleLogout}/>
                )}/>
                <Route exact path="/home/newsurvey" component={() => <NewSurvey data={this.props.email}/>}/>
                <Route exact path="/home/givesurvey" component={() => <GiveSurvey data={this.props.email}/>}/>
                <Route exact path="/home/editsurvey" component={() => <EditSurvey data={this.props.email}/>}/>
                <Route exact path="/home/publishsurvey" component={() => <PublishSurvey data={this.props.email}/>}/>
            </div>
        );
    }
}

export default withRouter(MainPage);
