import React, {Component} from 'react';
import * as API from '../../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import RegisterForSurvey from './RegisterForSurvey';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

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

export default GiveOpenSurveys;