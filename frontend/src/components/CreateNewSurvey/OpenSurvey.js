import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class OpenSurvey extends Component {
    state={
        surveyTitle:'',
        questions:[],
        formValid:false,
        qtype:[],
        newq:false
    };

    createNewSurvey(){
    }

    nextQuestion(){
        console.log(this.state.questions);
        this.refs.ques.value="";
    }

    validateField(value) {
      this.setState({formValid: value.length !== 0});
    }

    validateQues(value,type) {
      this.setState({newq: value.length !== 0});
    }

    validatePar(value) {
      this.setState({newp: value.length !== 0});
    }


    render() {
        return (
            <div className="w3-container">
                <br/><br/>

                <h3 align="center">Create Open Survey</h3>

                <form style={{marginLeft: "750px",  marginTop: "50px"}}>
                Survey Title: <input type="text" id="surveytitle" onChange={(event)=>{const value=event.target.value
                                         this.setState({surveyTitle: event.target.value}, () => { this.validateField(value) });}}/>
                <br/><br/>

                Enter question:
                <input type="text" id="question" ref="ques" onBlur={(event)=>{
                                         this.setState({questions: this.state.questions.concat(event.target.value)});}} onChange={(event)=>{const value=event.target.value
                                                    this.setState(() => { this.validateQues(value) });}}/>
                <select onChange={(event)=>{this.setState({qtype: this.state.qtype.concat(event.target.value)})}}>
                <option value="text" selected>Text</option>
                <option value="check">Checkbox</option>
                <option value="radio">Radio</option>
                </select>
                <button disabled={!this.state.newq} className="btn btn-default btn-sm" type="button" onClick={() => this.nextQuestion()}>Add next question</button>
                <br/><br/>

                Save Survey: <button disabled={!this.state.formValid} className="btn btn-info" type="button" onClick={() => this.createNewSurvey(this.state)}>Save</button>
                </form>

            </div>
        );
    }
}

export default OpenSurvey;
