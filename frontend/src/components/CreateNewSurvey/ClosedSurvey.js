import React, {Component} from 'react';
import * as API from '../../api/API';
import { Base64 } from 'js-base64';
import ReactFileReader from 'react-file-reader';

const queryString = require('query-string');

class ClosedSurvey extends Component {
    state = {
        surveyTitle: '',
        questions: [],
        participants: [],
        options: [],
        surveyid: '2',
        formValid: false,
        qtype: [],
        newq: false,
        newp: false,
        newo: false,
        newimg: false,
        endtime: ''
    };

    createNewSurvey() {
        var data = {
            title: this.state.surveyTitle, questions: this.state.questions, endtime: this.state.endtime,
            options: this.state.options, qtype: this.state.qtype, participants: this.state.participants
        };
        API.createClosed(data)
            .then((output) => {
                console.log("CHECK THIS: " + output);
                alert("Survey created!");
            });
    }

    nextQuestion() {
        this.setState({questions: this.state.questions.concat(this.refs.ques.value)});
        this.setState({qtype: this.state.qtype.concat(this.refs.qt.value)});
        console.log("ch: " + this.refs.qt.value);
        this.setState({options: this.state.options.concat("BREAK")});
        console.log(this.state.questions);
        console.log(this.state.qtype);
        this.setState({newq: false});
        this.refs.ques.value = "";
        this.refs.opt.value = "";
    }

    nextOption() {
        this.setState({options: this.state.options.concat(this.refs.opt.value)});
        console.log(this.state.options);
        this.setState({newo: false});
        this.refs.opt.value = "";
    }

    nextImage() {
        var imgname = (this.refs.img.value).substring((this.refs.img.value).lastIndexOf("\\") + 1);
        console.log("New file name: "+imgname);
        imgname="/Users/anjana/Desktop/cmpe275_SurveyApe/uploads/"+imgname;
        this.setState({options: this.state.options.concat(imgname)});
        console.log(this.state.options);
        this.setState({newimg: false});
        this.refs.img.value = "";
    }

    nextUser() {
        this.setState({participants: this.state.participants.concat(this.refs.users.value)});
        console.log(this.state.participants);
        this.setState({newp: false});
        this.refs.users.value = "";
    }

    validateField(value) {
        this.setState({formValid: value.length !== 0});
    }

    validateQues(value, type) {
        this.setState({newq: value.length !== 0});
    }

    validatePar(value) {
        this.setState({newp: value.length !== 0});
    }

    validateOpt(value) {
        this.setState({newo: value.length !== 0});
    }

    handleUpload = (event) => {
      this.setState({newimg: event.target.files.length !== 0});
      const payload=new FormData();
      payload.append('file', event.target.files[0]);
        API.uploadimage(payload)
            .then((output) => {
                if (output === 1) {
                  this.setState({uploadstatus: 'File uploaded.'});
                    console.log("File uploaded");
                } else {
                  this.setState({uploadstatus: 'File not uploaded.'});
                    console.log("File not uploaded");
                }
            });
    };

    importQuestions= files => {
      var contentString = Base64.decode(files.base64);
      contentString=contentString.substring(contentString.indexOf('['))
      console.log("file string: "+contentString);
      var contentJson=JSON.parse(contentString);
      console.log("file json len: "+contentJson.length);
      for(var i=0;i<contentJson.length;i++){
        console.log(contentJson[i].description);
        this.setState({questions: this.state.questions.concat(contentJson[i].description)});
        this.setState({qtype: this.state.qtype.concat(contentJson[i].type)});
        for(var j=0;j<(contentJson[i].options).length;j++){
          this.setState({options: this.state.options.concat(contentJson[i].options[j].description)});
        }
        if((contentJson[i].options).length>0)
        this.setState({options: this.state.options.concat("BREAK")});
      }
      console.log("options: "+this.state.options);
      console.log("question: "+this.state.questions);
      console.log("question: "+this.state.qtype);
    }

    render() {
        return (
            <div className="w3-container">
                <br/><br/><br/>
                <div className="container containerCss">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 align="center">Create Closed Survey</h3>
                            <br/><br/>
                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Survey
                                        Title: </label>
                                    <div className="col-sm-10">
                                        <input type="text" id="surveytitle" onChange={(event) => {
                                            const value = event.target.value
                                            this.setState({surveyTitle: event.target.value}, () => {
                                                this.validateField(value)
                                            });
                                        }}/>
                                    </div>
                                </div>
                                <br/>


                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Enter end: </label>
                                    <div className="col-sm-10">
                                        <input id="datetime" type="datetime-local"
                                               onChange={(event) => {
                                                   this.setState({endtime: event.target.value});
                                               }}/>
                                    </div>
                                </div>
                                <br/><br/>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Enter question:</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="question" ref="ques" onChange={(event) => {
                                            const value = event.target.value
                                            this.setState(() => {
                                                this.validateQues(value)
                                            });
                                        }}/>

                                        <select ref="qt" className="questionType">
                                            <option value="text" defaultValue>Text</option>
                                            <option value="checkbox">Checkbox</option>
                                            <option value="radiogroup">Radio</option>
                                            <option value="comment">Text Area</option>
                                            <option value="dropdown">Dropdown</option>
                                            <option value="barrating">Ratings</option>
                                            <option value="image">Image</option>
                                            <option value="personalDetails">Surveyee details</option>
                                            <option value="yesNo">Yes/No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Enter options:</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="option" ref="opt" onChange={(event) => {
                                            const value = event.target.value
                                            this.setState(() => {
                                                this.validateOpt(value)
                                            });
                                        }}/>
                                        <button disabled={!this.state.newo} className="btn btn-default btn-sm addNextBuutonClosed"
                                                type="button" onClick={() => this.nextOption()}>Save & Add next option
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Upload image:</label>
                                    <div className="col-sm-2">
                                    <input id="newfile" ref="img" type="file" name="file" onChange={this.handleUpload}/>
                                    </div>
                                    <div className="col-sm-8">
                                        <button disabled={!this.state.newimg} className="btn btn-default btn-sm addNextBuuton" type="button"
                                                onClick={() => this.nextImage()}>Save & Add next image
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <button disabled={!this.state.newq} className="btn btn-default btn-sm"
                                                type="button"
                                                onClick={() => this.nextQuestion()}>Save & Add next
                                        </button>

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-2 col-md-2">
                                    <ReactFileReader fileTypes={[".txt"]} base64={true} multipleFiles={true} handleFiles={this.importQuestions}>
                                    <a>Import questions</a></ReactFileReader>
                                    </div>
                                </div>
                                <br/><br/>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Enter Participant:</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="users" ref="users" onChange={(event) => {
                                            const value = event.target.value
                                            this.setState(() => {
                                                this.validatePar(value)
                                            });
                                        }}/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <button disabled={!this.state.newp} className="btn btn-default btn-sm"
                                                type="button" onClick={() => this.nextUser()}>Save & Add next participant
                                        </button>
                                    </div>
                                </div>

                                <br/>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <button disabled={!this.state.formValid} className="btn btn-success" type="button"
                                                onClick={() => this.createNewSurvey(this.state)}>Save Survey
                                        </button>

                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ClosedSurvey;
