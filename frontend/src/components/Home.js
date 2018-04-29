import React, {Component} from 'react';
import {Route, Link, Switch,withRouter} from 'react-router-dom';
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
        message: ''
    };

    componentWillMount() {
        this.setState({
            email: this.props.email
        });
    }

    handleLogout = (userdata) => {
        this.props.handleLogout(userdata);
    };

    render() {
        return (
            <div className="w3-container">
                <br/>

            </div>
        );
    }
}

export default withRouter(Home);
