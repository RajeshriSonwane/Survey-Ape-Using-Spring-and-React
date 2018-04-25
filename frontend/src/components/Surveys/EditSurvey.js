import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class EditSurvey extends Component {
  state={
    surveys:[],
    visible:false,
    surId:''
  };


    componentWillMount() {
        API.allSurveys()
            .then((output) => {
                console.log("CHECK THIS: "+output[0].surveyTitle);
                if (output) {
                  this.setState({surveys:output});
                } else {
                    console.log("No data");
                }
            });
    }

    handleEdit = (sid) => {
      console.log("edit id: "+sid);
      this.setState({surId: sid});
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
                    <button className="btn btn-warning" type="button" onClick={() => this.handleEdit(s.surveyId)}>Edit</button>
                    </div><br/><br/>
                    </div>
                  )
                })
              }

              <div>
                {
                  this.state.visible
                    ? <EditForm sid={this.state.surId}/>
                    : null
                }
              </div>

         </div>
        );
    }
}


class EditForm extends Component{
  state={
      questions:[],
      participants:[]
  };

  editSurvey(){
      var data={title:'',questions:this.state.questions,participants:this.state.participants};
      API.editSurvey(data,this.props.sid)
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
      <div>
      <br/><br/><br/><br/><br/>
      Add questions/participants
      <br/><br/>
      <form>
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

          Submit Survey: <button className="btn btn-info" type="button" onClick={() => this.editSurvey()}>Save</button>
      </form>

      </div>
    );
  }
}

export default EditSurvey;
