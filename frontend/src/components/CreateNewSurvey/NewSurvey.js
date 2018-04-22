import React, {Component} from 'react';
import { Route, Link} from 'react-router-dom';
import GeneralSurvey from './GeneralSurvey';


class Home extends Component {

  state={
    visibleGeneral:false,
    visibleClosed:false,
    visibleOpen:false
  }

  generalShow() {
    this.setState({visibleGeneral: !this.state.visible,visibleClosed: false,visibleOpen: false});
  }

  closedShow() {
    this.setState({visibleClosed: !this.state.visible,visibleGeneral: false,visibleOpen: false});
  }

  openShow() {
    this.setState({visibleOpen: !this.state.visible,visibleClosed: false,visibleGeneral: false});
  }



    render() {
        return (
          <div className="w3-container">
          <br/>

          <div className="col-xxs-12 col-xs-12 mt">

          <div className="col-xxs-12 col-xs-3 mt">
          <button type="button" className="btn btn-primary btn-block"
                  value="General" onClick={() => this.generalShow()}>General Survey</button>
          </div>

          <div className="col-xxs-12 col-xs-3 mt">
          <button type="button" className="btn btn-primary btn-block"
                  value="Closed" onClick={() => this.closedShow()}>Closed Survey</button>
          </div>

          <div className="col-xxs-12 col-xs-3 mt">
          <button type="button" className="btn btn-primary btn-block"
                  value="Open" onClick={() => this.openShow()}>Open Survey</button>
          </div>

          </div>

          {/* div to display general survey */}
          <div>
            {
              this.state.visibleGeneral
                ? <GeneralSurvey/>
                : null
            }
          </div>

          {/* div to display closed survey */}
          <div>
          </div>

          {/* div to display open survey */}
          <div>
          </div>

         </div>
        );
    }
}

export default Home;
