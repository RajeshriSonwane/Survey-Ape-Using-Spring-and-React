import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class EditSurvey extends Component {
  state={
    surveys:[]
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
                    &nbsp;&nbsp;&nbsp;<button>edit</button>
                    </div>
                  )
                })
              }

         </div>
        );
    }
}

export default EditSurvey;
