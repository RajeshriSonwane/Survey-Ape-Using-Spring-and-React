import React, {Component} from 'react';
import * as API from '../../api/API';
import $ from 'jquery';
import 'jquery-bar-rating';
import 'jquery-bar-rating/dist/themes/css-stars.css';

import * as Survey from 'survey-react';
import 'survey-react/survey.css';

import * as widgets from 'surveyjs-widgets';
window["$"] = window["jQuery"] = $;

const queryString = require('query-string');

class GiveSurvey extends Component {
    state = {
        surveyId: '',
        surveyTitle: '',
        questions: [],
        surveyJSON: [],
        user: [],
        survey: [],
        confimBool:true
    };

    createSurveyJson(questions, user) {
        console.log(questions);

        var surveyJSON = {};
        surveyJSON.questions = [];
        surveyJSON.elements = [];
        var data = {};
        questions.forEach(function (value) {
            var questionID = value.questionId;
            if (value.type == "checkbox") {
                var choices1 = [];

                value.options.forEach(function (option) {
                    choices1.push(option.description);
                });
                surveyJSON.questions.push({
                    type: value.type,
                    name: value.questionId,
                    title: value.description,
                    colCount: 4,
                    choices: choices1
                });
                if(value.answers.length > 0){
                    var answers = [];
                    value.answers.forEach(function (answer) {
                        answers.push(answer.answer);
                    });

                    data[questionID] = answers;
                }
            }
            else if (value.type == "radiogroup") {
                var choices1 = [];
                value.options.forEach(function (option) {
                    choices1.push(option.description);

                });
                surveyJSON.questions.push({
                    type: value.type,
                    name: value.questionId,
                    title: value.description,
                    isRequired: true,
                    colCount: 4,
                    choices: choices1
                });
                if(value.answers.length > 0)
                    data[questionID] = value.answers[0].answer;
            }
            else if (value.type == "rating" ) {

                surveyJSON.questions.push({
                    type: value.type,
                    name: value.questionId,
                    title: value.description,
                    minRateDescription: "Not Satisfied",
                    maxRateDescription: "Completely satisfied"
                });
                if(value.answers.length > 0)
                data[questionID] = value.answers[0].answer;
            }
            else if (value.type == "barrating" ) {

                surveyJSON.questions.push({
                    type: value.type,
                    name: value.questionId,
                    title: value.description,
                    ratingTheme: "css-stars",
                    choices: ["1", "2", "3", "4", "5"]
                });
                if(value.answers.length > 0)
                data[questionID] = value.answers[0].answer;
            }
            else if (value.type == "dropdown") {
                var choices1 = [];
                value.options.forEach(function (option) {
                    choices1.push(option.description);

                });
                surveyJSON.questions.push({
                    type: value.type,
                    name: value.questionId,
                    title: value.description,
                    colCount: 0,
                    choices: choices1
                });
            }
            else if(value.type == "personalDetails"){
                surveyJSON.questions.push({type: "text", name: "firstName", title: "First Name"});
                surveyJSON.questions.push({type: "text", name: "lastName", title: "Last Name"});
                surveyJSON.questions.push({type: "text", name: "emailID", title: "Email Id"});
                surveyJSON.questions.push({type: "text", name: "phoneNo", title: "Phone No."});

                if(user){
                    data["firstName"] = user["firstname"];
                    data["lastName"] = user["lastname"];
                    data["phoneNo"] = user["phoneNo"];
                    data["emailID"] = user["email"];
                }
            }
            else{
                surveyJSON.questions.push({type: value.type, name: value.questionId, title: value.description});
                if (value.answers.length > 0)
                    data[questionID] = value.answers[0].answer;
            }

        });
        /* email confimation*/
            surveyJSON.questions.push({type: "boolean",
            name: "bool", title: "Email confirmation",
            label: "Send confimation mail?",isRequired: true});

        surveyJSON.data = data;
        console.log("SurveyJSON: " + JSON.stringify(surveyJSON));
        return surveyJSON;
    }

    surveySendResult = function (sender) {

        var data = {
            surveyId: this.state.surveyId,
            confimBool: this.state.confimBool
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
        console.log(options.value+" :options value: "+questionName);
        if(questionName!="bool"){
        if (options.value) {
            console.log(questionName + " " + newValue);
            var data = {
                surveyId: this.state.surveyId,
                questions: options.name,
                response: options.value.toString()
            }
            API.saveResponse(data)
                .then((output) => {
                    console.log("CHECK THIS: " + output);
                });
        }
      }
      else{
        this.setState({confimBool: options.value});
        console.log("bool state: "+this.state.confimBool);
      }

    };

    componentWillMount() {
        widgets.jquerybarrating(Survey);
        const parsed = queryString.parse(window.location.search);
        console.log(parsed.id);
        console.log(parsed.user);

        API.getUserDetails()
            .then((output) => {
                console.log("CHECK THIS: " + output.firstname);
                console.log("CHECK THIS: " + output.phoneNo);
                if (output == false) {
                    alert("Login to continue or survey not available");
                    console.log("No data");
                } else {
                    this.setState({user: output});
                }
            });

        if (parsed.user == null) {
            console.log(parsed.user + ": general");
            API.getGeneral(parsed.id)
                .then((output) => {
                    console.log("CHECK THIS: " + output.surveyId);
                    if (output == false) {
                        alert("Login to continue or survey not available");
                        console.log("No data");
                    }
                    else {
                        this.setState({surveyId: output.surveyId});
                        this.setState({surveyTitle: output.surveyTitle});
                        this.setState({questions: output.questions});
                        this.setState({survey: this.createSurveyJson(output.questions, this.state.user)});
                        console.log((this.state));

                    }
                });

        }

        else {
            console.log(parsed.user + ": closed");
            API.getClosed(parsed.id, parsed.user)
                .then((output) => {
                    console.log("CHECK THIS: " + output.surveyId);
                    if (output == false) {
                        alert("Login to continue or survey not available");
                        console.log("No data");
                    } else {
                        this.setState({surveyId: output.surveyId});
                        this.setState({surveyTitle: output.surveyTitle, questions: output.questions});
                        this.setState({survey: this.createSurveyJson(output.questions)});
                    }
                });
        }

    }



    render() {

        var json = {
            title: this.state.surveyTitle, showProgressBar: "top", pages: [
                {questions: this.state.survey.questions},
                {elements: this.state.survey.elements}
            ]
        };

        Survey
            .StylesManager
            .applyTheme("winterstone");
        var model = new Survey.Model(json);

        model.data = this.state.survey.data;
        //model.mode = 'display';
        return (
            <div className="w3-container w3-panel">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Survey.Survey model={model} onComplete={this.surveySendResult.bind(this)}
                                           onValueChanged={this.surveyValueChanged.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default GiveSurvey;
