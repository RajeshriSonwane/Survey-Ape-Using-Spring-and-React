import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import NewSurvey from './CreateNewSurvey/NewSurvey';
import GiveSurvey from './Surveys/GiveSurvey';
import EditSurvey from './Surveys/EditSurvey';
import PublishSurvey from './Surveys/PublishSurvey';


class Home extends Component {
    render() {
        return (
          <div className="w3-container">
          <br/>

          <div className="row">
          <div className="col-sm-1 col-md-1 col-lg-1"></div>
          <div className="col-sm-2 col-md-2 col-lg-2"><h5>Welcome {this.props.user}</h5></div>
          <div> <Link to='/'></Link></div>
          <div className="col-sm-2 col-md-2 col-lg-2"><Link to='/newsurvey'>Create Survey</Link></div>
          <div className="col-sm-2 col-md-2 col-lg-2"><Link to='/editsurvey'>Edit Survey</Link></div>
          <div className="col-sm-2 col-md-2 col-lg-2"><Link to='/publishsurvey'>Publish/Unpublish</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/givesurvey'></Link></div>
          <div className="col-sm-2 col-md-2 col-lg-2"><button className="w3-btn w3-white w3-border w3-border-blue w3-round" onClick={() => this.props.handleLogout()}>Logout</button></div>
          </div>

          <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/newsurvey" component={() => <NewSurvey data={this.props.user}/>}/>
          <Route exact path="/givesurvey" component={() => <GiveSurvey data={this.props.user}/>}/>
          <Route exact path="/editsurvey" component={() => <EditSurvey data={this.props.user}/>}/>
          <Route exact path="/publishsurvey" component={() => <PublishSurvey data={this.props.user}/>}/>
          </Switch>

         </div>
        );
    }
}

export default Home;
