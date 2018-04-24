package cmpe275.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import cmpe275.entity.Participants;
import cmpe275.entity.Question;
import cmpe275.entity.Survey;
import cmpe275.service.ParticipantsService;
import cmpe275.service.QuestionService;
import cmpe275.service.SurveyService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;


@Controller
@CrossOrigin(origins = "http://localhost:3000")

public class Surveys { 
	
    @Autowired
    private SurveyService surveyService;
    
    @Autowired
    private QuestionService questionService;
    
    @Autowired
    private ParticipantsService participantsService;
	
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
    	String[] questions=ns.getQuestions();
    	int l= questions.length;
    	for(int i=0;i<l;i++) {
    		Question q=new Question(questions[i],s1.getSurveyId());
    		questionService.addQuestion(q);
    	}
    	
    	String[] participants = ns.getParticipants();
    	l= participants.length;
    	for(int i=0;i<l;i++) {
    		//int p = Integer.parseInt(participants[i]);	
    		Participants pq= new Participants(participants[i], s1.getSurveyId());
    		participantsService.addParticipant(pq);
    	}
        return new ResponseEntity(1,HttpStatus.CREATED);
    }
    
    // get survey by id
    @GetMapping(path="/getsurvey/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGeneralSurvey(@PathVariable Integer id) {
    //return	surveyService.getSurvey(id);
    	System.out.println("Survey id: "+id);
    	Survey s=surveyService.getSurvey(id);
    	return new ResponseEntity(s,HttpStatus.FOUND);
    }
    
	// create closed survey
    @PostMapping(path="/createclosed",consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<?> createClosedSurvey(@RequestBody Newsurvey ns) throws IOException {
    //	Integer uid=Integer.parseInt((session.getAttribute("userid")).toString());
    	Integer uid=1;
    	Survey s=new Survey(uid,ns.getTitle(),2);
    	Survey s1=surveyService.addSurvey(s);
    	
    	String[] questions = ns.getQuestions();
    	int l= questions.length;
    	for(int i=0;i<l;i++) {
    		Question q=new Question(questions[i],s1.getSurveyId());
    		questionService.addQuestion(q);
    	}
    	String[] participants = ns.getParticipants();
    	System.out.println("check title: "+ns.getTitle());
    	System.out.println("check par: "+ns.getParticipants()[0]);
   	l= participants.length;
    	for(int i=0;i<l;i++) {
    		//int p = Integer.parseInt(participants[i]);	
    		Participants pq= new Participants(participants[i], s1.getSurveyId());
    		participantsService.addParticipant(pq);
    	}
        return new ResponseEntity(1,HttpStatus.CREATED);
    }  
    
    
    
    
    
    // get all surveys created by a user
    @GetMapping(path="/getallsurveys",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<Survey> getAllSurveys() {
    	//Integer uid=Integer.parseInt((session.getAttribute("userid")).toString());
    	Integer uid=1;
    	List<Survey> res=new ArrayList<Survey>();
    	List<Survey> surveylist=surveyService.getAllSurveys();
    	System.out.println("check survey: "+surveylist.get(0).getSurveyTitle());
       	for(int i=0;i<surveylist.size();i++) {
    		Survey temp=surveylist.get(i);
    		if(temp.getUserID()==uid)
    			res.add(temp);
    	}
    //	return new ResponseEntity(res,HttpStatus.FOUND);
       	return res;
    }
}


class Newsurvey{
	String title;
	String questions[];
	String participants[];
	
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
	public String[] getParticipants() {
		return participants;
	}
	public void setParticipants(String[] participants) {
		this.participants = participants;
	}
}
