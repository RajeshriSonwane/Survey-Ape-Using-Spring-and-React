import React, {Component} from 'react';
import * as API from '../../api/API';
import GiveOpenSurveys from "./GiveOpenSurveys";
const queryString = require('query-string');

class ListSurvey extends Component {
    state = {
        surveys: [],
        surveyId : ""
    };


    componentWillMount() {
        API.startedSurveys()
            .then((output) => {
                if (output == false) {
                    console.log("No data");
                    alert("No surveys found!");
                } else {
                    this.setState({surveys: output});
                }
            });
    }

    handleEdit = function (surveyId, type) {
        console.log(surveyId + " " + type);
        API.getGeneral(surveyId)
            .then((output) => {
                console.log(JSON.stringify(output))
                this.setState({
                    sur: output,
                    questions: output.questions
                });
                this.setState({surveyId: ""});
                this.setState({surveyId: surveyId});
            });
    }

    handleView = function (surveyId, type) {
        API.getGeneral(surveyId)
            .then((output) => {
                console.log(JSON.stringify(output))
                this.setState({
                    sur: output,
                    questions: output.questions
                });
                this.setState({surveyId: ""});
                this.setState({surveyId: surveyId});
            });
    }


    render() {
        return (
            <div className="w3-container">
                <br/><br/>
                <h3 align="center">All Given Survey</h3>
                <br/><br/>
                <div className="col-xxs-12 col-xs-12 mt">
                    <div className="col-sm-1 col-md-1 col-lg-1 col-xs-1 mt"></div>
                    <div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
                        <b>Survey Title</b>
                    </div>
                </div>
                <br/><br/>

                {this.state.surveys.map(s => {
                    return (
                        <div className="col-xxs-12 col-xs-12 mt" key={Math.random()}>
                            <div className="col-sm-1 col-md-1 col-lg-1 col-xs-1 mt"></div>
                            <div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
                                <b>{(s.surveyTitle)}</b>
                            </div>
                            <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                                <button className="btn btn-info" type="button"
                                        onClick={() => this.handleEdit(s.surveyId, s.type)}>Continue
                                </button>
                            </div>
                            <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                                <button className="btn btn-success" type="button"
                                        onClick={() => this.handleView(s.surveyId, s.type)}>View
                                </button>
                            </div>
                            <br/><br/>
                        </div>
                    )
                })
                }
                <div>
                    {
                        this.state.surveyId != ""
                            ? <GiveOpenSurveys survey={this.state.sur} questions={this.state.questions}/>
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default ListSurvey;
