import React, {Component} from 'react';
import * as API from '../../api/API';
//import GiveOpenSurvey from './Surveys/GiveOpenSurvey';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import RegisterForSurvey from './RegisterForSurvey';

const queryString = require('query-string');

class FetchOpenSurvey extends Component {
    static propTypes = {
        islogged: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            surveys: [],
            questions: [],
            surId: '',
            surTy: '',
            islogged: this.props.islogged
        }
        this.giveOSurvey = this.giveOSurvey.bind(this);
        console.log("construcor islogged =", this.state.islogged);
    }

    state = {
        surveys: [],
        visible: false,
        surId: '',
        surTy: '',
        islogged: false
    };

    componentWillMount() {
        API.getOpenSurveys()
            .then((res) => {
                console.log("CHECK THIS: " ,res);
                if (res) {
                    this.setState({surveys: res, surId: res.surId});
                } else {
                    console.log("No data");
                }
            });
    }

    giveOSurvey = (sid, sty) => {
        API.getOpenSurveyQuestion(this.state, sid)
            .then((res) => {
                console.log("CHECK retriev: ", res);
                if (res) {
                    this.setState({
                        questions: res,
                        surId: sid
                    });
                    console.log("give suevey", this.state.questions);
                } else {
                    console.log("No data");
                }
            });
    }


    render() {
        return (
            <div>
                <br/><br/>
                <h3 align="center">Open Survey</h3>
                <br/><br/>
                <div className="w3-container" style={{marginLeft: "700px"}}>

                    <div className="col-xxs-12 col-xs-12 mt">
                        <div className="col-sm-1 col-md-1 col-lg-3 col-xs-1 mt">
                            <h4 style={{color: "brown"}}>Survey ID</h4>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-3 col-xs-3 mt">
                            <h4 style={{color: "brown"}}>Survey Title</h4>
                        </div>
                    </div>
                    <br/><br/>
                    <br/>

                    {this.state.surveys.map(s => {
                        return (
                            <div className="col-xxs-12 col-xs-12 mt" key={Math.random()}>
                                <div className="col-sm-1 col-md-1 col-lg-3 col-xs-1 mt">
                                    <b>{(s.surveyId)}</b>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
                                    <button
                                        onClick={() => this.giveOSurvey(s.surveyId, s.surveyId)}>{(s.surveyTitle)}</button>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">

                                </div>
                                <br/><br/>
                            </div>
                        )
                    })
                    }
                </div>
                {this.state.islogged ?
                    (this.state.questions.length > 0 && <GiveOpenSurveys questions={this.state.questions}/>)
                    :
                    (this.state.questions.length > 0 && <RegisterForSurvey surId={this.state.surId}/>)}
            </div>
        );
    }
}

class GiveOpenSurveys extends Component {
    state = {
        questions: []
    };

    static propTypes = {
        questions: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.setState = {
            questions: this.props.questions

        }
        console.log("constructor inside giveopen survey", this.props.questions);
    }

    render() {
        return (
            <div style={{marginLeft: "800px"}}>
                <br/><br/><br/><br/><br/>
                <form>
                    <h4 style={{marginLeft: "250px"}}>Answer Survey</h4>
                    <hr/>

                    {this.props.questions.length > 0 && this.props.questions.map((question, index) =>
                        (
                            <div className="col-xxs-12 col-xs-12 mt">
                                <div className="col-sm-1 col-md-1 col-lg-3 col-xs-1 mt">
                                    <b>{question.questionId}</b>
                                </div>
                                <div className="col-sm-1 col-md-1 col-lg-3 col-xs-1 mt">
                                    <b>{question.description}</b>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
                                    <input></input>
                                </div>
                                <br/><br/>
                            </div>
                        ))
                    }

                    <button className="btn btn-info" type="button" style={{marginLeft: "600px"}}>Submit Survey</button>
                </form>

            </div>
        );
    }
}


export default withRouter(FetchOpenSurvey);
