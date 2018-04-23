import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class GiveSurvey extends Component {
  state={
    surveyTitle:'',
    questions:[]
  };


    componentWillMount() {
        const parsed = queryString.parse(window.location.search);
        console.log(parsed.id);

        API.getGeneral(parsed.id)
            .then((output) => {
                console.log("CHECK THIS: "+output.surveyId);
                if (output) {
                  this.setState({surveyTitle:output.surveyTitle, questions:output.questions});
                } else {
                    console.log("No data");
                }
            });
    }


    render() {
        return (
          <div className="w3-container">
          <br/><br/>
          <h3 align="center">Submit your reponses</h3>
          <br/><br/>
          Survey Title: {this.state.surveyTitle}
          <br/><br/>

          {this.state.questions.map(ques => {
            return ( <div key={Math.random()}>
                    <b>{(ques.description)}</b>
                    </div>
                  )
                })
              }

         </div>
        );
    }
}

export default GiveSurvey;
