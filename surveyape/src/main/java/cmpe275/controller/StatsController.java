package cmpe275.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import cmpe275.AnsDistribution;
import cmpe275.StatDetails;
import cmpe275.entity.Answer;
import cmpe275.entity.Guest;
import cmpe275.entity.Options;
import cmpe275.entity.Participants;
import cmpe275.entity.Question;
import cmpe275.entity.Response;
import cmpe275.entity.Survey;
import cmpe275.service.AnswerService;
import cmpe275.service.GuestService;
import cmpe275.service.OptionService;
import cmpe275.service.ParticipantsService;
import cmpe275.service.QuestionService;
import cmpe275.service.ResponseService;
import cmpe275.service.SurveyService;


@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class StatsController {
	
    @Autowired
    private SurveyService surveyService;
    
	@Autowired
	private ParticipantsService participantsService;
	
	@Autowired
	private OptionService optionservice;
	
	@Autowired
	private ResponseService responseService;
	
	@Autowired
	private GuestService guestService;
	
	@Autowired
	private AnswerService answerService;
	
	@Autowired
	private QuestionService questionService;
	
	
    @GetMapping(path = "/getsurveydetails/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSurveyDetails(@PathVariable Integer id) {
    	    System.out.println("Stat surveyid: "+id);
    	    
        Survey survey = surveyService.getSurvey(id);
        System.out.println("Check title: "+survey.getSurveyTitle());
        
        List<Participants> participants=participantsService.getAllParticipantsBySurveryId(id);
        System.out.println("Check invited: "+participants.size());
        
        List<Response> responses=responseService.responsesBySurveyId(id);
        //System.out.println("Check subm: "+responses.size());
        int respsize = responses.size();
        int count=0;
        for(int i=0;i<responses.size();i++) {
        	if(responses.get(i).isCompletedStatus()==true)
        		count++;
        }
        
        int numpar=responses.size();
        int submissions=responses.size()-count;
        int invited=participants.size();
        
        List<Guest> guests=guestService.guestBySurveyId(id);
        System.out.println("Check subm: "+responses.size());
        int reg=numpar-guests.size();
        
        
        
        
        // create array of JSON of answer distribution [{"question": '', "options": [], "ansCount": []]}
        
        


       
        ArrayList<AnsDistribution> dist=new ArrayList<AnsDistribution>();  
        List<Question> lq = questionService.getQuestionBySurveyId(id);
        for(int i=0;i<lq.size();i++) {
        	Question q = lq.get(i);
        	String questype = q.getType();
        	Integer quesId = q.getQuestionId();
        	List<Options> op = q.getOptions();
        	ArrayList<Integer> anscount = new ArrayList<Integer>();
        	ArrayList<String> optionname = new ArrayList<String>();
        	if(questype.equals("text") || questype.equals("comment") || questype.equals("personalDetails")) {
        		System.out.println("Question type text");
        		List<Answer> ans = answerService.findByQuestionId(quesId);
        		for(int p=0;p<ans.size();p++) {
        			Answer a = ans.get(p);
        			optionname.add(a.getAnswer());
        			anscount.add(1);
        		}
        	}
        	else if(questype.equals("barrating")) {
        		List<Answer> ans = answerService.findByQuestionId(quesId);
        		HashSet<String> h = new HashSet<String>();    
        		for(int p=0;p<ans.size();p++) {
        			Answer a = ans.get(p);
        			h.add(a.getAnswer());
        		}
        		for (String s: h) {
        			  System.out.println("Tree = " + s);
        			  List<Answer> a = answerService.findByAnswer(s);
        			  int x  = a.size();
              		  anscount.add(x); 	
              		  optionname.add(s);
        			}
        	}
        	
        	for(int j=0;j<op.size();j++) {
        		Options o = op.get(j);
        		int oid = o.getOptionId();
        		List<Answer> ans = answerService.getAnswerByOptionId(oid);
        		int x  = ans.size();
        		anscount.add(x); 	
        		optionname.add(o.getDescription());
        	}
        	
        	AnsDistribution temp=new AnsDistribution(q.getDescription(), questype, optionname, anscount);
        	dist.add(temp);
        }
        
        for(int i=0;i<responses.size();i++) {
        	if(responses.get(i).isCompletedStatus()==true) {
        		int resid=responses.get(i).getResponseId();
        		List<Answer> a= answerService.findByResponseId(resid);
        		
        	} 	
        }
        
        
        
        if(respsize<2) {
        	return new ResponseEntity(false, HttpStatus.FOUND);
        }
        else {
        
        StatDetails sd;       
     
        if(survey.getType()==3) // registered users
        		sd=new StatDetails(survey.getSurveyTitle(), survey.getStartDate(), survey.getEndDate(), numpar, submissions,guests.size(),reg,dist);
        
        else // general, closed - registered users=num of participants
        		sd=new StatDetails(survey.getSurveyTitle(), survey.getStartDate(), survey.getEndDate(), numpar, submissions, invited, numpar,dist);
        	
        if (survey!=null)
            return new ResponseEntity(sd, HttpStatus.FOUND);
        else
            return new ResponseEntity(false, HttpStatus.FOUND);
        }
   }

}
