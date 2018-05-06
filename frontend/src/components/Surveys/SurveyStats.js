import React, {Component} from 'react';
import * as API from '../../api/API';

class SurveyStats extends Component {
  state={
    surveys:[],
    currentsur:'',
    visible1:false,
    survey:{}
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

getSurveyData(id){
  this.setState({currentsur:id});
  alert(id);
  API.getSurveyDetails(id)
      .then((output) => {
          if (output!=false) {

              this.setState({survey: output});
              this.setState({visible1:true});
          } else {
              console.log("No data");
              alert("No surveys found!");
          }
      });
}

    render() {
        return (
          <div className="w3-container">
          <br/><br/>
          <h3 align="center">Survey Stats</h3>
          <br/><br/>

          <select onChange={(event)=>{this.getSurveyData(event.target.value)}}>
          <option value="" disabled selected>Select Survey</option>
          {this.state.surveys.map(s =>
            <option key={s.surveyId} value={s.surveyId}>{s.surveyTitle }</option>
          )};
          </select>

          {
            this.state.visible1 ?
          <StatDetails sid={this.state.currentsur} sur={this.state.survey}/> : null }

         </div>
        );
    }
}




class StatDetails extends Component {
  state={

  };

  render() {
    console.log("ID: "+this.props.sid);
    return (
      <div>
       <div>Details</div>
       TITLE: {this.props.sur.surveyTitle}<br/>
       START: {this.props.sur.startDate}<br/>
       END: {this.props.sur.endDate}<br/>
      </div>
    );
  }
}


export default SurveyStats;
