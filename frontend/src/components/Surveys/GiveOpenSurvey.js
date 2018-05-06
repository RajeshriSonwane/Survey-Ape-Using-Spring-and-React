import React, {Component} from 'react';
import * as API from '../../api/API';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

const queryString = require('query-string');

class GiveOpenSurvey extends Component {
    state = {
        questions: []
    };

    componentWillMount() {
        const parsed = queryString.parse(window.location.search);
        console.log(parsed.id);

        API.giveOpenSurvey(parsed.id)
            .then((output) => {
                console.log("giveOpenSurvey CHECK THIS: ", output);
                if (output) {
                    this.setState({
                        questions: output.questions
                    });
                } else {
                    console.log("No data");
                }
            });
    };

    render() {

        return (
            <div className="w3-container w3-panel">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.questions}
                            {this.state.questions.map((question, index) =>
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

                            <button className="btn btn-info" type="button" style={{marginLeft: "600px"}}>Submit Survey
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default GiveOpenSurvey;
