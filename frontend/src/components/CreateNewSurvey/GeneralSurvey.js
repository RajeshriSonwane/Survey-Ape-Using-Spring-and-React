import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class GeneralSurvey extends Component {
  state={
    surveyTitle:'',
    questions:[],
    temp:[],
    options:[],
    qtype:[],
    participants:[],
    formValid:false,
    newq:false,
    newp:false,
    newo:false,
      starttime:'',
    endtime:''
  };

  createNewSurvey(){
    var data={title:this.state.surveyTitle,questions:this.state.questions,
              qtype:this.state.qtype,options:this.state.options,
              participants:this.state.participants,starttime:this.state.starttime,endtime:this.state.endtime};
        API.createGeneral(data)
            .then((output) => {
              console.log("CHECK THIS: "+output);
            });
  }

  nextQuestion(){
    this.setState({options: this.state.options.concat("BREAK")});
    console.log("q: "+this.state.questions);
    console.log("qt: "+this.state.qtype);
    console.log("o: "+this.state.options);
    this.setState({newq:false});
    this.setState({newo:false});
    this.setState({temp:[]});
    this.refs.ques.value="";
    this.refs.opt.value="";
  }

  nextOption(){
    console.log(this.state.options);
    this.setState({newo:false});
    this.refs.opt.value="";
  }

  nextUser(){
      console.log(this.state.participants);
      this.setState({newp:false});
      this.refs.users.value="";
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
          <br/><br/>

          <h3 align="center">Create General Survey</h3>

          <form>
          Survey Title: <input type="text" id="surveytitle" onChange={(event)=>{const value=event.target.value
                                   this.setState({surveyTitle: event.target.value}, () => { this.validateField(value) });}}/>
          <br/><br/><br/>

          Enter start: <input id="datetime" type="datetime-local" onChange={(event)=>{this.setState({starttime: event.target.value});}} />
          <br/><br/>
          Enter end: <input id="datetime1" type="datetime-local" onChange={(event)=>{this.setState({endtime: event.target.value});}} />
          <br/><br/><br/>

          Enter question:
          <input type="text" id="question" ref="ques" onBlur={(event)=>{
                                   this.setState({questions: this.state.questions.concat(event.target.value)});}}
                                   onChange={(event)=>{const value=event.target.value
                                              this.setState(() => { this.validateQues(value) });}}/>
          <select onChange={(event)=>{this.setState({qtype: this.state.qtype.concat(event.target.value)});}}>
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
          <button disabled={!this.state.newq} className="btn btn-default btn-sm" type="button" onClick={() => this.nextQuestion()}>Add next question</button>
          <br/><br/><br/>

          Enter Participant:
          <input type="text" id="users" ref="users" onBlur={(event)=>{
              this.setState({participants: this.state.participants.concat(event.target.value)});}} onChange={(event)=>{const value=event.target.value
                  this.setState(() => { this.validatePar(value) });}}/>
          <button disabled={!this.state.newp} className="btn btn-default btn-sm" type="button" onClick={() => this.nextUser()}>Add next participant</button>
          <br/><br/><br/>

          Save Survey: <button disabled={!this.state.formValid} className="btn btn-info" type="button" onClick={() => this.createNewSurvey(this.state)}>Save</button>
          </form>

         </div>
        );
    }
}

export default GeneralSurvey;
