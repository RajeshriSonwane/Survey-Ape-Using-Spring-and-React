import React, {Component} from 'react';
import * as API from '../../api/API';

class SurveyStats extends Component {
  state={
    surveys:[]
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


    render() {
        return (
          <div className="w3-container">
          <br/><br/>
          <h3 align="center">Survey Stats</h3>
          <br/><br/>

          // Select survey:
          // <select onChange={(event)=>{this.getChartData({"year":"",type:"usertracking","userid":event.target.value})}}>
          // <option value="" disabled selected>Select User</option>
          // {this.state.users.map(s =>
          //   <option key={s.surveyId} value={id.user_id}>{s.title }</option>
          // )};
          // </select>

         </div>
        );
    }
}

export default SurveyStats;
