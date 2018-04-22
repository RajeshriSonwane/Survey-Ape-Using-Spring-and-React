package cmpe275.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import cmpe275.entity.Survey;
import cmpe275.service.SurveyService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@CrossOrigin(origins = "http://localhost:3000")

public class Surveys {
	
    @Autowired
    private SurveyService surveyService;
	
	// call sessions from Users class
	Users obj=new Users();
	@Autowired 
	HttpSession session=obj.session;
	
	// create general survey
    @PostMapping(path="/creategeneral",consumes = MediaType.APPLICATION_JSON_VALUE) 
    public  ResponseEntity<?> createGeneralSurvey(@RequestBody String stitle) {
    //	Integer uid=Integer.parseInt((session.getAttribute("userid")).toString());
    	Integer uid=1;
    	System.out.println("New: "+stitle);
    	Survey s=new Survey(uid,stitle,1);
    	surveyService.addSurvey(s);
        return new ResponseEntity(1,HttpStatus.CREATED);
    }
    
    // provide general survey
    @GetMapping(path="/generalsurvey/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGeneralSurvey(@PathVariable long id) {
	   return null;
    }
    
}
