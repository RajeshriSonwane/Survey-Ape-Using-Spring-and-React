import React, {Component} from 'react';
import * as API from '../../api/API';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import RegisterForSurvey from './RegisterForSurvey';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import GiveOpenSurveys from './GiveOpenSurveys';

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
            islogged: this.props.islogged,
            regSurid:'',
            visible:false
        }
        this.giveOSurvey = this.giveOSurvey.bind(this);
        console.log("construcor islogged =", this.state.islogged);
    }

    state = {
        surveys: [],
        visible: false,
        surId: '',
        surTy: '',
        islogged: false,
        regSurid:'',
        visible:false
    };

    componentWillMount() {
        API.getOpenSurveys()
            .then((res) => {
                console.log("CHECK THIS: " ,res);
                if (res.length >0) {
                    this.setState({surveys: res, surId: res.surId});
                } else {
                    console.log("No data");
                    alert("Survey not available or unpublished.");
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
                    console.log("sur: ", JSON.stringify(this.state.sur));
                } else {
                    console.log("No data");
                    alert("Survey not available or unpublished.");
                }
            });
    }

    hideshow(i){
      console.log("check s id: "+i);
      this.setState({regSurid:i});
      this.setState({visible: !this.state.visible});
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

                                {this.state.islogged ?
                                    (<div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
                                        <button className="btn btn-primary"
                                                onClick={() => this.giveOSurvey(s.surveyId, s.surveyId)}>Start
                                        </button>
                                    </div>) :

                                    (<div className="col-sm-3 col-md-3 col-lg-3 col-xs-3 mt">
                                        <button className="btn btn-primary"
                                                onClick={() => this.hideshow(s.surveyId)}>Start
                                        </button>
                                    </div>)
                                }

                            </div>
                        )
                    })}
                </div>


            {
                this.state.visible
                    ? <RegisterForSurvey surId={this.state.regSurid}/>
                    : null
            }

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





export default withRouter(FetchOpenSurvey);
