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
  API.getSurveyDetails(id)
      .then((output) => {
          if (output!=false) {
              this.setState({survey: output});
              console.log("surtitle: "+ this.state.survey.title);
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
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                      <h3 align="center">Survey Stats</h3>
                      <br/><br/>
                      <div className="row">
                          <div className="col-sm-3 col-md-3 col-lg-3"></div>
                          <div className="col-sm-1 col-md-1 col-lg-1">
                          <label>Select Survey: </label>
                          </div>
                          <div className="col-sm-4">
                          <select onChange={(event)=>{this.getSurveyData(event.target.value)}} style={{width:"100%",height:"37px"}}>
                          <option value="" disabled selected>Select Survey</option>
                          {this.state.surveys.map(s =>
                            <option key={s.surveyId} value={s.surveyId}>{s.surveyTitle }</option>
                          )};
                          </select>
                          </div>
                      </div>

          {
            this.state.visible1 ?
          <StatDetails sid={this.state.currentsur} sur={this.state.survey}/> : null }

          </div>
          </div>
          </div>
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
          <div className="container">
              <br/><br/>
              <h4 align="center">Stat Details</h4>

              <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                      <br/><br/>

                      <div className="row">
                      <div className="col-sm-2 col-md-2 col-lg-2"></div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                      <b>TITLE:</b>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-5">
                      {this.props.sur.title}<br/><br/>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-sm-2 col-md-2 col-lg-2"></div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                      <b>START:</b>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-5">
                      {this.props.sur.starttime}<br/><br/>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-sm-2 col-md-2 col-lg-2"></div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                      <b>END:</b>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-5">
                      {this.props.sur.endtime}<br/><br/>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-sm-2 col-md-2 col-lg-2"></div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                      <b>PARTICIPANTS:</b>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-5">
                      {this.props.sur.numParticipants}<br/><br/>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-sm-2 col-md-2 col-lg-2"></div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                      <b>SUBMISSIONS:</b>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-5">
                      {this.props.sur.submissions}<br/><br/>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-sm-2 col-md-2 col-lg-2"></div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                      <b>INVITED:</b>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-5">
                      {this.props.sur.invited}<br/><br/>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-sm-2 col-md-2 col-lg-2"></div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                      <b>REGISTERED:</b>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-5">
                      {this.props.sur.registered}<br/><br/>
                      </div>
                      </div>

                  </div>
              </div>

              <div className="row">
              <br/>
              <div className="col-sm-2 col-md-2 col-lg-2"></div>
              <b>Answer Distribution</b>
              </div>

          </div>
    );
  }
}


export default SurveyStats;
