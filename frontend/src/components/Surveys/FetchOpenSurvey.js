import React, {Component} from 'react';
import * as API from '../../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import RegisterForSurvey from './RegisterForSurvey';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

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
                       sur: res,
                        questions: res.questions,
                        surId: sid
                    });
                    console.log("question: ", this.state.questions);
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
                <div className="w3-container" style={{marginLeft: "500px"}}>

                    <div className="col-xxs-12 col-xs-12 mt">
                        <div className="col-sm-6 col-md-3 col-lg-3 col-xs-3 mt">
                            <h4 style={{color: "brown"}}>Survey Title</h4>
                        </div>
                    </div>
                    <br/><br/>
                    <br/>

                    {this.state.surveys.map(s => {
                        return (
                            <div className="col-xxs-12 col-xs-12 mt" key={Math.random()}>
                                <div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
                                    <b>{(s.surveyTitle)}</b>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
                                    <button className="btn btn-primary"
                                        onClick={() => this.giveOSurvey(s.surveyId, s.surveyId)}>Start</button>
                                </div>

                                <br/><br/>
                            </div>
                        )
                    })
                    }
                </div>
                {this.state.islogged ?
                    (this.state.questions.length > 0 && <GiveOpenSurveys survey={this.state.sur} questions={this.state.questions}/>)
                    :
                    (this.state.questions.length > 0 && <RegisterForSurvey surId={this.state.surId}/>)}
            </div>
        );
    }
}

// class GiveOpenSurveys extends Component {
//     state = {
//         questions: []
//     };
//
//     static propTypes = {
//         questions: PropTypes.array.isRequired
//     };
//
//     constructor(props) {
//         super(props);
//         console.log(props);
//         this.setState = {
//             questions: this.props.questions
//
//         }
//         console.log("constructor inside giveopen survey", this.props.questions);
//     }
//
//     render() {
//         return (
//             <div style={{marginLeft: "800px"}}>
//                 <br/><br/><br/><br/><br/>
//                 <form>
//                     <h4 style={{marginLeft: "250px"}}>Answer Survey</h4>
//                     <hr/>
//
//                     {this.props.questions.length > 0 && this.props.questions.map((question, index) =>
//                         (
//                             <div className="col-xxs-12 col-xs-12 mt">
//                                 <div className="col-sm-1 col-md-1 col-lg-3 col-xs-1 mt">
//                                     <b>{question.questionId}</b>
//                                 </div>
//                                 <div className="col-sm-1 col-md-1 col-lg-3 col-xs-1 mt">
//                                     <b>{question.description}</b>
//                                 </div>
//                                 <div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
//                                     <input></input>
//                                 </div>
//                                 <br/><br/>
//                             </div>
//                         ))
//                     }
//
//                     <button className="btn btn-info" type="button" style={{marginLeft: "600px"}}>Submit Survey</button>
//                 </form>
//
//             </div>
//         );
//     }
// }


class GiveOpenSurveys extends Component {
    state = {
        surveyId: '',
        surveyTitle: '',
        questions: [],
        surveyJSON: []
    };

    componentWillMount() {
      this.setState({surveyId: this.props.survey.surveyId});
      this.setState({surveyTitle: this.props.survey.surveyTitle, questions: this.props.questions});
      this.setState({survey: this.createSurveyJson(this.props.questions)});
      console.log("state in get open: "+this.state);
    }
    createSurveyJson(questions) {
        console.log(questions);

        var surveyJSON = {};
        surveyJSON.questions = [];
        questions.forEach(function (value) {

            if(value.type == "checkbox")
            {
                var choices1 = [];
                value.options.forEach(function(option){
                    choices1.push(option.description);
                });
                surveyJSON.questions.push({type: value.type, name: value.questionId, title: value.description, colCount: 4, choices: choices1})

            }
            else if(value.type == "radiogroup"){
                var choices1 = [];
                value.options.forEach(function(option){
                    choices1.push(option.description);
                });
                surveyJSON.questions.push({type: value.type, name: value.questionId, title: value.description, isRequired: true,colCount: 4, choices: choices1})

            }
            else
                surveyJSON.questions.push({type: value.type, name: value.questionId, title: value.description})
        });
        console.log("SurveyJSON" + JSON.stringify(surveyJSON.questions));
        return surveyJSON.questions;
    }

    surveySendResult = function (sender) {

        var data = {
            surveyId: this.state.surveyId
        };
        API.saveSurvey(data)
            .then((output) => {
                console.log("CHECK THIS: " + output);
            });

    };

    surveyValueChanged = function (sender, options) {
        var mySurvey = sender;
        var questionName = options.name;
        var newValue = options.value;
        console.log(questionName + " "+ newValue);
        if(options.value){
        var data = {
            surveyId: this.state.surveyId,
            questions: options.name,
            response: options.value.toString()
        }

        API.saveOpenResponse(data)
            .then((output) => {
                console.log("CHECK THIS: " + output);
            });
}
    };



    render() {
        var json = { title: this.state.surveyTitle, showProgressBar: "top", pages: [
            {questions: this.state.survey}
        ]};
        Survey
            .StylesManager
            .applyTheme("winterstone");
        var model = new Survey.Model(json);



        return (
            <div className="w3-container w3-panel">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Survey.Survey model={model} onComplete={this.surveySendResult.bind(this)} onValueChanged={this.surveyValueChanged.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default withRouter(FetchOpenSurvey);
