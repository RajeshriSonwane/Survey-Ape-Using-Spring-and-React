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
        surveyJSON: []
    };

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
        console.log("DONE"+  JSON.stringify(sender.data));
        console.log(sender.data[0]);
        var data = {
            surveyId: this.state.surveyId,
            questions: [],
            response: [sender.data]
        };
        API.saveOpenResponse(data)
            .then((output) => {
                console.log("CHECK THIS: " + output);
            });
    };

    surveyValueChanged = function (sender, options) {
        var mySurvey = sender;
        var questionName = options.name;
        var newValue = options.value;
        console.log(questionName + " "+ newValue);
        var data = {
            surveyId: this.state.surveyId,
            questions: options.name,
            response: [options.value]
        }
        API.saveOpenResponse(data)
            .then((output) => {
                console.log("CHECK THIS: " + output);
            });

    };

    componentWillMount() {
        const parsed = queryString.parse(window.location.search);
        console.log("open qstring id: "+parsed.id);
        console.log("open qstring guest: "+parsed.guest);
            API.giveOpenSurvey(parsed.id,parsed.guest)
                .then((output) => {
                    console.log("CHECK THIS: " + output.surveyId);
                    if (output) {
                        this.setState({surveyId: output.surveyId});
                        this.setState({surveyTitle: output.surveyTitle});
                        this.setState({questions: output.questions});
                        this.setState({survey: this.createSurveyJson(output.questions)});
                        console.log("state: "+this.state);
                    } else {
                        console.log("No data");
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
