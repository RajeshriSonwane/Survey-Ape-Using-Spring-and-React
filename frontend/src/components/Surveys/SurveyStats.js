import React, {Component} from 'react';
import * as API from '../../api/API';

class SurveyStats extends Component {
  state={
    surveyTitle:'',
    questions:[]
  };


    componentWillMount() {
    }


    render() {
        return (
          <div className="w3-container">
          <br/><br/>
          <h3 align="center">Survey Stats</h3>
          <br/><br/>

         </div>
        );
    }
}

export default SurveyStats;
