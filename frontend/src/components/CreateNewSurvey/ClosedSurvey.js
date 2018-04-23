import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class ClosedSurvey extends Component {
    state={
        surveyTitle:'',
        questions:[],
        users:[],
        surveyid: '2',
    };

    createNewSurvey(){
        var data={title:this.state.surveyTitle,questions:this.state.questions,users:this.state.users};
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
        console.log(this.state.users);
        this.refs.users.value="";
    }

    componentWillMount() {
        const parsed = queryString.parse(window.location.search);
        console.log(parsed);
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
                    <button className="button1" type="button" onClick={() => this.nextQuestion()}>Add next question</button>
                    <br/><br/>

                    Enter User:
                    <input type="text" id="users" ref="users" onBlur={(event)=>{
                        this.setState({users: this.state.users.concat(event.target.value)});}}/>
                    <button className="button1" type="button" onClick={() => this.nextUser()}>Add next user</button>
                    <br/><br/><br/>

                    Submit Survey: <button className="button1" type="button" onClick={() => this.createNewSurvey(this.state)}>Submit</button>
                </form>

            </div>
        );
    }
}

export default ClosedSurvey;
