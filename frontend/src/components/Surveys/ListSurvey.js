import React, {Component} from 'react';
import * as API from '../../api/API';
import GiveOpenSurveys from "./GiveOpenSurveys";
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
const queryString = require('query-string');

class ListSurvey extends Component {
    state = {
        surveys: [],
        responses: [],
        surveyId : "",
        visible1:false
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

    handleView = function (s) {
      console.log("id: "+s.surveyId+" type: "+s.type);
      this.setState({visible1:!this.state.visible1});
      this.setState({viewsurvey: s});
        // API.getGeneral(surveyId)
        //     .then((output) => {
        //         console.log(JSON.stringify(output))
        //         this.setState({
        //             sur: output,
        //             questions: output.questions
        //         });
        //         this.setState({surveyId: ""});
        //         this.setState({surveyId: surveyId});
        //     });
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



                            {
                              s.responses[0].completedStatus==false ?
                              (<div>
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                                    <button className="btn btn-info" type="button"
                                            onClick={() => this.handleEdit(s.surveyId, s.type)}>Continue
                                    </button>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                                    <button className="btn btn-success" type="button" disabled={true}
                                            onClick={() => this.handleView(s)}>View
                                    </button>
                                </div>

                            </div>
                              )

                              : (<div>
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                                    <button className="btn btn-info" type="button" disabled={true}
                                            onClick={() => this.handleEdit(s.surveyId, s.type)}>Continue
                                    </button>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                                    <button className="btn btn-success" type="button"
                                            onClick={() => this.handleView(s)}>View
                                    </button>
                                </div>

                            </div>
                              )
                            }
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

                <div>
                  {
                    this.state.visible1
                      ? <ViewSurvey viewsurvey={this.state.viewsurvey}/>
                      : null
                  }
                </div>

            </div>
        );
    }
}

export default ListSurvey;



class ViewSurvey extends Component {


  state = {
      surveyId: '',
      surveyTitle: '',
      questions: [],
      surveyJSON: [],
      survey: []
  };

  createSurveyJson(questions) {
      console.log(questions);

      var surveyJSON = {};
      surveyJSON.questions = [];
      surveyJSON.elements = [];
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
          else if(value.type == "rating"){

              surveyJSON.questions.push({type: value.type, name: value.questionId, title: value.description, minRateDescription: "Not Satisfied",
                  maxRateDescription: "Completely satisfied"})
          }
          else
              surveyJSON.questions.push({type: value.type, name: value.questionId, title: value.description})
      });
      console.log("SurveyJSON: " + JSON.stringify(surveyJSON));
      return surveyJSON;
  }

  componentWillMount() {
    console.log("View props: "+this.props.viewsurvey.surveyId);
    this.setState({surveyId: this.props.viewsurvey.surveyId});
    this.setState({surveyTitle: this.props.viewsurvey.surveyTitle});
    this.setState({questions: this.props.viewsurvey.questions});
    this.setState({survey: this.createSurveyJson(this.props.viewsurvey.questions)});

    //API to retrieve completed responses

  }


  render() {
      var json = { title: this.state.surveyTitle, showProgressBar: "top", pages: [
          {questions: this.state.survey.questions},
          {elements: this.state.survey.elements}
      ]};
      console.log(JSON.stringify(json));
      Survey
          .StylesManager
          .applyTheme("winterstone");
      var model = new Survey.Model(json);

      return (
        <div className="w3-container w3-panel">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Survey.Survey model={model} onComplete={false} onValueChanged={false} mode ="display"/>
                    </div>
                </div>
            </div>
        </div>

      );
  }
}
