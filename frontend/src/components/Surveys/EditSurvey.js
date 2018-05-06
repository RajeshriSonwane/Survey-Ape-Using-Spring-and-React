import React, {Component} from 'react';
import * as API from '../../api/API';

const queryString = require('query-string');

class EditSurvey extends Component {
    state = {
        surveys: [],
        visible: false,
        surId: '',
        surTy: ''
    };


    componentWillMount() {
        API.allSurveys()
            .then((output) => {
                if (output!=false) {
                    this.setState({surveys: output});
                } else {
                    console.log("No data");
                    alert("No surveys found!");
                }
            });
    }

    handleEdit = (sid, ty) => {
        console.log("edit id: " + sid);
        console.log("edit type: " + ty);
        this.setState({surId: sid, surTy: ty});
        this.setState({visible: !this.state.visible});
    };


    render() {
        return (
            <div className="w3-container">
                <br/><br/>
                <h3 align="center">Edit Survey</h3>
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
                                <button className="btn btn-warning" type="button"
                                        onClick={() => this.handleEdit(s.surveyId, s.type)}>Edit
                                </button>
                            </div>
                            <br/><br/>
                        </div>
                    )
                })
                }

                <div>
                    {
                        this.state.visible
                            ? <EditForm sid={this.state.surId} st={this.state.surTy}/>
                            : null
                    }
                </div>

            </div>
        );
    }
}


class EditForm extends Component {
    state = {
        questions: [],
        qtype: [],
        participants: [],
        options:[],
        newq: false,
        newo: false,
        newp: false
    };

    editSurvey() {
        var data = {
            title: '',
            questions: this.state.questions,
            qtype: this.state.qtype,
            options:this.state.options,
            participants: this.state.participants
        };
        API.editSurvey(data, this.props.sid)
            .then((output) => {
                console.log("CHECK THIS: " + output);
            });
    }

    nextQuestion() {
      this.setState({qtype: this.state.qtype.concat(this.refs.qt.value)});
      this.setState({options: this.state.options.concat("BREAK")});

        this.setState({newq: false});
        this.setState({newo: false});
        this.setState({temp: []});
        this.refs.ques.value = "";
        this.refs.opt.value = "";
    }

    nextUser() {
        console.log(this.state.participants);
        this.setState({newp: false});
        this.refs.users.value = "";
    }

    nextOption() {
        console.log(this.state.options);
        this.setState({newo: false});
        this.refs.opt.value = "";
    }

    validatePar(value) {
        this.setState({newp: value.length !== 0});
    }

    validateQues(value) {
        this.setState({newq: value.length !== 0});
    }

    validateOpt(value) {
        this.setState({newo: value.length !== 0});
    }

    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/>
                Add questions/participants
                <br/><br/>
                <form>
                    Enter question:
                    <input type="text" id="question" ref="ques" onBlur={(event) => {
                        this.setState({questions: this.state.questions.concat(event.target.value)});
                    }} onChange={(event) => {
                        const value = event.target.value
                        this.setState(() => {
                            this.validateQues(value)
                        });
                    }}/>
                    <select ref="qt">
                        <option value="text" defaultValue>Text</option>
                        <option value="check">Checkbox</option>
                        <option value="radio">Radio</option>
                    </select>
                    <br/><br/>

                    Enter options:
                    <input type="text" id="option" ref="opt" onBlur={(event)=>{
                                             this.setState({options: this.state.options.concat(event.target.value)});}}
                                             onChange={(event)=>{const value=event.target.value
                                                        this.setState(() => { this.validateOpt(value) });}}/>
                    <button disabled={!this.state.newo} className="btn btn-default btn-sm" type="button" onClick={() => this.nextOption()}>Add next option</button>
                    <br/>

                    <button disabled={!this.state.newq} className="btn btn-default btn-sm" type="button"
                            onClick={() => this.nextQuestion()}>Save & Add next</button>
                    <br/><br/>

                    {
                        this.props.st !== 3 ? (<div>
                            Enter user: <input type="text" id="users" ref="users" onBlur={(event) => {
                            this.setState({participants: this.state.participants.concat(event.target.value)});
                        }} onChange={(event) => {
                            const value = event.target.value
                            this.setState(() => {
                                this.validatePar(value)
                            });
                        }}/>
                            <button disabled={!this.state.newp} className="btn btn-default btn-sm" type="button"
                                    onClick={() => this.nextUser()}>Add next user
                            </button>
                            <br/><br/><br/></div>) : null}


                    Submit Survey:
                    <button className="btn btn-info" type="button" onClick={() => this.editSurvey()}>Save</button>
                </form>

            </div>
        );
    }
}

export default EditSurvey;
