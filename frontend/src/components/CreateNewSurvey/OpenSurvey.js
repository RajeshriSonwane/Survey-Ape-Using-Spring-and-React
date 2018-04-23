import React, {Component} from 'react';
import * as API from '../../api/API';
const queryString = require('query-string');

class OpenSurvey extends Component {
    state={
        surveyTitle:'',
        questions:[]
    };

    componentWillMount() {
        const parsed = queryString.parse(window.location.search);
        console.log(parsed);
    }

    createNewSurvey(){
    }

    nextQuestion(){
        console.log(this.state.questions);
        this.refs.ques.value="";
    }


    render() {
        return (
            <div className="w3-container">
                <br/><br/>

                <h3 align="center">Create Open Survey</h3>




            </div>
        );
    }
}

export default OpenSurvey;
