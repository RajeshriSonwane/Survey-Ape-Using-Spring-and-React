import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import NewSurvey from './CreateNewSurvey/NewSurvey';
import GiveSurvey from './Surveys/GiveSurvey';
import EditSurvey from './Surveys/EditSurvey';
import PublishSurvey from './Surveys/PublishSurvey';
import * as API from '../api/API';
import PropTypes from 'prop-types';

class Home extends Component {
    static propTypes = {
        email: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        handleLogout: PropTypes.func.isRequired
    };

    state = {
        email: '',
        message: '',

    };

    componentWillMount() {
        this.setState({
            email: this.props.email
        });
    }

    constructor() {
        super();
    }

    render() {
        return (
            <div className="w3-container">
                <br/>

                <div className="row">
                    <div className="col-sm-2 col-md-2 col-lg-2"><Link to='#'></Link></div>
                    <div className="col-sm-2 col-md-2 col-lg-2"><Link to='/home/newsurvey'>Create Survey</Link></div>
                    <div className="col-sm-2 col-md-2 col-lg-2"><Link to='/home/editsurvey'>Edit Survey</Link></div>
                    <div className="col-sm-2 col-md-2 col-lg-2"><Link to='/home/publishsurvey'>Publish/Unpublish</Link>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/home/givesurvey'></Link></div>
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <button className="w3-btn w3-white w3-border w3-border-blue w3-round"
                                onClick={() => this.props.handleLogout()}>Logout
                        </button>
                    </div>
                </div>


            </div>
        );
    }
}

export default Home;
