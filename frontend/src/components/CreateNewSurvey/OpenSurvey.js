import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class OpenSurvey extends Component {
    state={
        surveyTitle:'',
        questions:[]
    };

    createNewSurvey(){
    }

    nextQuestion(){
        console.log(this.state.questions);
        this.refs.ques.value="";
    }


    render() {
        return (
            <div className="w3-container">
                <br/><br/>

                <h3 align="center">Create Open Survey</h3>

                <form>
                Survey Title: <input type="text" id="surveytitle" onChange={(event)=>{
                                         this.setState({surveyTitle: event.target.value});}}/>
                <br/><br/>

                Enter question:
                <input type="text" id="question" ref="ques" onBlur={(event)=>{
                                         this.setState({questions: this.state.questions.concat(event.target.value)});}}/>
                <button className="btn btn-default btn-sm" type="button" onClick={() => this.nextQuestion()}>Add next question</button>
                <br/><br/>

                Save Survey: <button className="btn btn-info" type="button" onClick={() => this.createNewSurvey(this.state)}>Save</button>
                </form>

            </div>
        );
    }
}

export default OpenSurvey;
