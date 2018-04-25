import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class ClosedSurvey extends Component {
    state={
        surveyTitle:'',
        questions:[],
        participants:[],
        surveyid: '2',
    };

    createNewSurvey(){
        var data={title:this.state.surveyTitle,questions:this.state.questions,participants:this.state.participants};
        API.createClosed(data)
            .then((output) => {
                console.log("CHECK THIS: "+output);
            });
    }

    nextQuestion(){
        console.log(this.state.questions);
        this.refs.ques.value="";
    }

    nextUser(){
        console.log(this.state.participants);
        this.refs.users.value="";
    }

    render() {
        return (
            <div className="w3-container">
                <br/><br/>

                <h3 align="center">Create Closed Survey</h3>

                <form>
                    Survey Title: <input type="text" id="surveytitle" onChange={(event)=>{
                    this.setState({surveyTitle: event.target.value});}}/>
                    <br/><br/>

                    Enter question:
                    <input type="text" id="question" ref="ques" onBlur={(event)=>{
                        this.setState({questions: this.state.questions.concat(event.target.value)});}}/>
                    <button className="btn btn-default btn-sm" type="button" onClick={() => this.nextQuestion()}>Add next question</button>
                    <br/><br/>

                    Enter User:
                    <input type="text" id="users" ref="users" onBlur={(event)=>{
                        this.setState({participants: this.state.participants.concat(event.target.value)});}}/>
                    <button className="btn btn-default btn-sm" type="button" onClick={() => this.nextUser()}>Add next user</button>
                    <br/><br/><br/>

                    Save Survey: <button className="btn btn-info" type="button" onClick={() => this.createNewSurvey(this.state)}>Save</button>
                </form>

            </div>
        );
    }
}

export default ClosedSurvey;
