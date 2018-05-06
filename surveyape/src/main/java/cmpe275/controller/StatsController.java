package cmpe275.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import cmpe275.entity.Survey;
import cmpe275.service.SurveyService;


@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class StatsController {
	
    @Autowired
    private SurveyService surveyService;
	
    @GetMapping(path = "/getsurveydetails/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSurveyDetails(@PathVariable Integer id) {
    	System.out.println("Check: "+id);
        Survey res = surveyService.getSurvey(id);
        System.out.println("Check: "+res.getSurveyTitle());
        if (res!=null)
            return new ResponseEntity(res, HttpStatus.FOUND);
        else
            return new ResponseEntity(false, HttpStatus.FOUND);
  
   }

}
