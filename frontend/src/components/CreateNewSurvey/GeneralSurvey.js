import React, {Component} from 'react';
import * as API from '../../api/API';

class GeneralSurvey extends Component {
  state={
    surveyTitle:''
  }

  createNewSurvey()
  {
    var x=this.state.surveyTitle;
        API.createGeneral(x)
            .then((output) => {
              console.log("CHECK THIS: "+output);
            });
  }



    render() {
        return (
          <div className="w3-container">
          <br/><br/>

          <h3 align="center">Create General Survey</h3>

          <form>
          Survey Title: <input type="text" id="surveytitle" onChange={(event)=>{
                                   this.setState({surveyTitle: event.target.value});}}/><br/>
          <button className="button1" type="button" onClick={() => this.createNewSurvey(this.state)}>Submit</button>
          </form>

         </div>
        );
    }
}

export default GeneralSurvey;
