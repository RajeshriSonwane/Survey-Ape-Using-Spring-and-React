package cmpe275.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import cmpe275.entity.Question;
import cmpe275.entity.Survey;
import cmpe275.service.QuestionService;
import cmpe275.service.SurveyService;


import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@CrossOrigin(origins = "http://localhost:3000")

public class Surveys {
	
    @Autowired
    private SurveyService surveyService;
    
    @Autowired
    private QuestionService questionService;
	
	// call sessions from Users class
	Users obj=new Users();
	@Autowired 
	HttpSession session=obj.session;
	
	// create general survey
    @PostMapping(path="/creategeneral",consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<?> createGeneralSurvey(@RequestBody Newsurvey ns) throws IOException {
    //	Integer uid=Integer.parseInt((session.getAttribute("userid")).toString());
    	Integer uid=1;
    	Survey s=new Survey(uid,ns.getTitle(),1);
    Survey s1=surveyService.addSurvey(s);
    	String[] arr=ns.getQuestions();
    	int l= arr.length;
    	for(int i=0;i<l;i++) {
    		Question q=new Question(arr[i],s1.getSurveyId());
    		questionService.addQuestion(q);
    	}
        return new ResponseEntity(1,HttpStatus.CREATED);
    }
    
    // provide general survey
    @GetMapping(path="/generalsurvey/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGeneralSurvey(@PathVariable long id) {
	   return null;
    }
    
}


class Newsurvey{
	String title;
	String questions[];
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String[] getQuestions() {
		return questions;
	}
	public void setQuestions(String[] questions) {
		this.questions = questions;
	}
}
