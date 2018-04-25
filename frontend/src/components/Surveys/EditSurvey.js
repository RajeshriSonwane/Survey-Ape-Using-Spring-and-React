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
          <h3 align="center">Submit your reponses</h3>
          <br/><br/>
          Survey Title:
          <br/><br/>

          {this.state.surveys.map(s => {
            return ( <div key={Math.random()}>
                    <b>{(s.surveyTitle)}</b>
                    <button className="button1" type="button" onClick={() => this.handleEdit(s.surveyId)}>edit</button>
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
      HELLO {this.props.sid}

      <form>

          Enter question:
          <input type="text" id="question" ref="ques" onBlur={(event)=>{
              this.setState({questions: this.state.questions.concat(event.target.value)});}}/>
          <button className="button1" type="button" onClick={() => this.nextQuestion()}>Add next question</button>
          <br/><br/>

          Enter User:
          <input type="text" id="users" ref="users" onBlur={(event)=>{
              this.setState({participants: this.state.participants.concat(event.target.value)});}}/>
          <button className="button1" type="button" onClick={() => this.nextUser()}>Add next user</button>
          <br/><br/><br/>

          Submit Survey: <button className="button1" type="button" onClick={() => this.editSurvey()}>Submit</button>
      </form>

      </div>
    );
  }
}

export default EditSurvey;
