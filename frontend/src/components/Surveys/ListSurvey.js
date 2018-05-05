import React, {Component} from 'react';
import * as API from '../../api/API';

class ListSurvey extends Component {
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
          <h3 align="center">All Your Surveys</h3>
          <br/><br/>

         </div>
        );
    }
}

export default ListSurvey;
