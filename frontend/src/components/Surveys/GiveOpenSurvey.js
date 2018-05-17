import React, {Component} from 'react';
import * as API from '../../api/API';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

const queryString = require('query-string');

class GiveOpenSurvey extends Component {
    state = {
        surveyId: '',
        surveyTitle: '',
        questions: [],
        surveyJSON: [],
        guestid:''
    };

    createSurveyJson(questions) {
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
            else if (value.type == "radiogroup" || value.type == "yesNo") {
                var choices1 = [];
                value.options.forEach(function (option) {
                    choices1.push(option.description);

                });
                surveyJSON.questions.push({
                    type: "radiogroup",
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
            else{
                surveyJSON.questions.push({type: value.type, name: value.questionId, title: value.description});
                if(value.answers.length > 0)
                    data[questionID] = value.answers[0].answer;
            }

        });
        surveyJSON.data = data;
        console.log("SurveyJSON: " + JSON.stringify(surveyJSON));
        return surveyJSON.questions;
    }

    surveySendResult = function (sender) {

        var data = {
            surveyId: this.state.surveyId
        };
        API.saveGuestSurvey(data,this.state.guestid)
            .then((output) => {
                console.log("CHECK THIS: " + output);
            });

    };

    surveyValueChanged = function (sender, options) {
        var mySurvey = sender;
        var questionName = options.name;
        var newValue = options.value;
        if(options.value){
            console.log(questionName + " "+ newValue);
            var data = {
                surveyId: this.state.surveyId,
                questions: options.name,
                response: options.value.toString(),
                guestid:this.state.guestid
            }
            API.saveOpenResponse(data)
                .then((output) => {
                    console.log("CHECK THIS: " + output);
                });
        }


    };

    componentWillMount() {
        const parsed = queryString.parse(window.location.search);
        console.log("open qstring id: "+parsed.id);
        console.log("open qstring guest: "+parsed.guest);
        this.setState({guestid:parsed.guest});
            API.giveOpenSurvey(parsed.id,parsed.guest)
                .then((output) => {
                    console.log("CHECK THIS: " + output.surveyId);
                    if (output==false) {
                        console.log("No data");
                        alert("Survey not available!");
                    }
                    else {
                      this.setState({surveyId: output.surveyId});
                      this.setState({surveyTitle: output.surveyTitle});
                      this.setState({questions: output.questions});
                      this.setState({survey: this.createSurveyJson(output.questions)});
                      console.log("state: "+this.state);

                    }
                });
    }


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

export default GiveOpenSurvey;
