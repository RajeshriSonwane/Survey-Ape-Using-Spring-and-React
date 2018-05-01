import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class PublishSurvey extends Component {
  state={
    surveys:[],
    surId:''
  };

  componentWillMount() {
    API.allSurveys()
        .then((output) => {
            if (output) {
              this.setState({surveys:output});
            } else {
                console.log("No data");
            }
        });
    }

    handlePublish = (sid) => {
      console.log("publish id: "+sid);
      API.publishSurvey(sid)
          .then((output) => {
              console.log("CHECK THIS: "+output);
              alert("Survey published!");
          });
    };

    handleClose = (sid) => {
      console.log("close id: "+sid);
      API.closeSurvey(sid)
          .then((output) => {
              console.log("CHECK THIS: "+output);
              alert("Survey closed!");
          });
    };


    render() {
        return (
          <div className="w3-container">
          <br/><br/>
          <h3 align="center">Publish/Unpublish Survey</h3>
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

                    {
                      s.status===0 ?
                      (<div>
                        <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                        <button className="btn btn-success" type="button" onClick={() => this.handlePublish(s.surveyId)}>PUBLISH</button>
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                        <button disabled={true} className="btn btn-danger" type="button" onClick={() => this.handleClose(s.surveyId)}>CLOSE</button>
                        </div><br/><br/>
                        </div>
                      )
                     :(<div>
                       <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                       <button disabled={true} className="btn btn-success" type="button" onClick={() => this.handlePublish(s.surveyId)}>PUBLISH</button>
                       </div>
                       <div className="col-sm-2 col-md-2 col-lg-2 col-xs-2 mt">
                       <button className="btn btn-danger" type="button" onClick={() => this.handleClose(s.surveyId)}>CLOSE</button>
                       </div><br/><br/>
                       </div>
                     )
                   }

                    </div>
                  )
                })
              }

         </div>
        );
    }
}

export default PublishSurvey;
