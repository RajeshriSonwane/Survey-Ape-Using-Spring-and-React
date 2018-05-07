import React, {Component} from 'react';
import * as API from '../../api/API';

const queryString = require('query-string');

class GeneralSurvey extends Component {
    state = {
        surveyTitle: '',
        questions: [],
        temp: [],
        options: [],
        qtype: [],
        participants: [],
        formValid: false,
        newq: false,
        newp: false,
        newo: false,
        endtime: ''
    };

    createNewSurvey() {
        var data = {
            title: this.state.surveyTitle, questions: this.state.questions,
            qtype: this.state.qtype, options: this.state.options,
            participants: this.state.participants, endtime: this.state.endtime
        };
        API.createGeneral(data)
            .then((output) => {
                console.log("CHECK THIS: " + output);
                alert("Survey created!");
            });
    }

    nextQuestion() {
        this.setState({qtype: this.state.qtype.concat(this.refs.qt.value)});
        console.log("ch: "+this.refs.qt.value);
        this.setState({options: this.state.options.concat("BREAK")});
        console.log("q: " + this.state.questions);
        console.log("qt: " + this.state.qtype);
        console.log("o: " + this.state.options);
        this.setState({newq: false});
        this.setState({newo: false});
        this.setState({temp: []});
        this.refs.ques.value = "";
        this.refs.opt.value = "";
    }

    nextOption() {
        console.log(this.state.options);
        this.setState({newo: false});
        this.refs.opt.value = "";
    }

    nextUser() {
        console.log(this.state.participants);
        this.setState({newp: false});
        this.refs.users.value = "";
    }

    validateField(value) {
        this.setState({formValid: value.length !== 0});
    }

    validateQues(value) {
        this.setState({newq: value.length !== 0});
    }

    validatePar(value) {
        this.setState({newp: value.length !== 0});
    }

    validateOpt(value) {
        this.setState({newo: value.length !== 0});
    }


    render() {
        return (
            <div className="w3-container">
                <br/><br/><br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 align="center">Create General Survey</h3>
<br/><br/>
                            <form>
                                <div class="form-group row">
                                    <label for="staticSurveyTitle" class="col-sm-2 col-form-label">Survey Title: </label>
                                    <div class="col-sm-10">
                                        <input type="text" id="surveytitle" onChange={(event) => {
                                            const value = event.target.value
                                            this.setState({surveyTitle: event.target.value}, () => {
                                                this.validateField(value)
                                            });
                                        }}/>
                                    </div>
                                </div>
                                <br/>

                                <div class="form-group row">
                                    <label for="staticEndDate" class="col-sm-2 col-form-label">Enter end: </label>
                                    <div class="col-sm-10">
                                        <input id="datetime" type="datetime-local" onChange={(event) => {
                                            this.setState({endtime: event.target.value});
                                        }}/>
                                    </div>
                                </div>
                                <br/><br/>

                                <div class="form-group row">
                                    <label for="staticQuest" class="col-sm-2 col-form-label">Enter question:</label>
                                    <div class="col-sm-10">
                                        <input type="text" id="question" ref="ques" onBlur={(event) => {
                                            this.setState({questions: this.state.questions.concat(event.target.value)});
                                        }}
                                               onChange={(event) => {
                                                   const value = event.target.value
                                                   this.setState(() => {
                                                       this.validateQues(value)
                                                   });
                                               }}/>
                                        <select ref="qt">
                                            <option value="text" defaultValue>Text</option>
                                            <option value="checkbox">Checkbox</option>
                                            <option value="radiogroup">Radio</option>
                                        </select>

                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="staticEndDate" class="col-sm-2 col-form-label">Enter options:</label>
                                    <div class="col-sm-10">
                                        <input type="text" id="option" ref="opt" onBlur={(event) => {
                                            this.setState({options: this.state.options.concat(event.target.value)});
                                        }}
                                               onChange={(event) => {
                                                   const value = event.target.value
                                                   this.setState(() => {
                                                       this.validateOpt(value)
                                                   });
                                               }}/>
                                        <button disabled={!this.state.newo} className="btn btn-default btn-sm" type="button"
                                                onClick={() => this.nextOption()}>Add next option
                                        </button>
                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label for="staticButton" class="col-sm-2 col-form-label"></label>
                                    <div class="col-sm-10">
                                        <button disabled={!this.state.newq} className="btn btn-default btn-sm" type="button"
                                                onClick={() => this.nextQuestion()}>Save & Add next
                                        </button>
                                    </div>
                                </div>

                                <br/><br/>

                                <div class="form-group row">
                                    <label for="staticParticipant" class="col-sm-2 col-form-label">Enter Participant:</label>
                                    <div class="col-sm-10">

                                        <input type="text" id="users" ref="users" onInput={(event) => {
                                            this.setState({participants: this.state.participants.concat(event.target.value)});
                                        }} onChange={(event) => {
                                            const value = event.target.value
                                            this.setState(() => {
                                                this.validatePar(value)
                                            });
                                        }}/>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="staticButton" class="col-sm-2 col-form-label"></label>
                                    <div class="col-sm-10">
                                        <button disabled={!this.state.newp} className="btn btn-default btn-sm" type="button"
                                                onClick={() => this.nextUser()}>Add next participant
                                        </button>
                                    </div>
                                </div>
<br/>
                                <div class="form-group row">
                                    <label for="staticButton" class="col-sm-2 col-form-label"></label>
                                    <div class="col-sm-10">
                                        <button disabled={!this.state.formValid} className="btn btn-info" type="button"
                                                onClick={() => this.createNewSurvey(this.state)}>Save Survey
                                        </button>
                                    </div>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default GeneralSurvey;
