package cmpe275.controller;

import java.util.ArrayList;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import cmpe275.SurveyResponse;
import cmpe275.entity.*;
import cmpe275.service.AnswerService;
import cmpe275.service.GuestService;
import cmpe275.service.OptionService;
import cmpe275.service.ParticipantsService;
import cmpe275.service.QuestionService;
import cmpe275.service.ResponseService;
import cmpe275.service.SurveyService;
import cmpe275.service.UserService;


@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SurveyeeController {
	
	@Autowired
	private SurveyService surveyService;
	
    @Autowired
    private UserService userservice;
	
    @Autowired
    private GuestService guestservice;

	@Autowired
	private QuestionService questionService;

	@Autowired
	private OptionService optionService;

	@Autowired
	private ParticipantsService participantsService;

	@Autowired
	private ResponseService responseService;

	@Autowired
	private AnswerService answerService;

	@Autowired
	private SendInvitation sendInvitation;

	@Autowired
	private HttpSession session;		
	
	
	// get all surveys started by a user
	@GetMapping(path = "/startedsurveys", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> participantSurveys() {
		if(session.getAttribute("sess_userid")==null) {
			return new ResponseEntity(false, HttpStatus.FOUND);
		}
		Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
		System.out.println("Session surveyee: " + uid);
		List<Survey> res=new ArrayList<Survey>();
		List<Response> responses=responseService.responsesByUserId(uid);
		for(int i=0;i<responses.size();i++) {
			int temp=responses.get(i).getSurveyId();
			Survey s=surveyService.getSurvey(temp);
			res.add(s);
		}	
		if(responses.size()>0)
			return new ResponseEntity(res, HttpStatus.FOUND);
		else
			return new ResponseEntity(false, HttpStatus.FOUND);
	}
		
	
	/* ==================== SAVE RESPONSES ==================== */

    // save responses for general and closed
    @PostMapping(path = "/createResponse", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createResponse(@RequestBody SurveyResponse sr) throws Exception {
        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        System.out.println("Session userid for general/closed: " + session.getAttribute("sess_userid"));
//		Integer uid = 1;
        Integer surveyId = Integer.parseInt(sr.getSurveyId());
        Integer responseId;
        List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(surveyId, uid);

        int maxcounter = 0;
        for (int i = 0; i < res1.size(); i++) {
            if (res1.get(i).getCounter() > maxcounter) {
                maxcounter = res1.get(i).getCounter();
            }
        }
        Response res = responseService.getResponseBySurveyIdAndUserIdAndCounter(surveyId, uid, maxcounter);

        if (res != null && res.isCompletedStatus() != true) {
            System.out.println("FOUND Response");
            responseId = res.getResponseId();
        } else if (res != null && res.isCompletedStatus() == true) {
            System.out.println("Once completed");
            maxcounter++;
            Response r = new Response(surveyId, uid, false, maxcounter);
            Response r1 = responseService.addResponse(r);
            responseId = r1.getResponseId();

        } else {
            System.out.println("First time giving a response");
            Response r = new Response(surveyId, uid, false, 0);
            Response r1 = responseService.addResponse(r);
            responseId = r1.getResponseId();
        }

        Integer questionId = Integer.parseInt(sr.getQuestions());
        String response = sr.getResponse();

        System.out.println("Actual Inputs: " + response + " ,Q: " + questionId);
        String[] arrayRes = response.split(",");
        for (String val : arrayRes) {

            //fetch option ID
            Options op = optionService.findByQuestionIdAndDescription(questionId, val);
            System.out.println("Fetch Option ID for :" + questionId + " & " + val);
            Integer optionId;
            if (op == null) {
                optionId = -1;
            } else {
                optionId = op.getOptionId();
            }

            //fetch answer by response and option ID (if already exists)
            Answer ans = answerService.getResponseByResponseIdAndQuestionIdAndOptionId(responseId, questionId, optionId);
            if (ans == null) {

                System.out.println("Response: " + responseId + " Q: " + questionId + " A: " + val + " O: " + optionId);
                Answer a = new Answer(responseId, questionId, val, optionId);
                answerService.addAnswer(a);

            } else {
                System.out.println("Im here");
                ans.setAnswer(val);
                answerService.saveAnswer(ans);
            }
        }

        return new ResponseEntity(1, HttpStatus.CREATED);
    }

    
    // submit loggedin surveys
    @PostMapping(path = "/completeResponse", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> completeResponse(@RequestBody SurveyResponse sr) throws Exception {
        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        System.out.println("session complete: " + uid);
        String emailId = userservice.getUserById(uid).getEmail();


        Integer surveyId = Integer.parseInt(sr.getSurveyId());
        List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(surveyId, uid);

        int maxcounter = 0;
        for (int i = 0; i < res1.size(); i++) {
            if (res1.get(i).getCounter() > maxcounter) {
                maxcounter = res1.get(i).getCounter();
            }
        }
        Response res = responseService.getResponseBySurveyIdAndUserIdAndCounter(surveyId, uid, maxcounter);

        if (res != null) {
            System.out.println("FOUND Response - submit survey");
            res.setCompletedStatus(true);
            responseService.saveResponse(res);
            //send mail
            String text = "Thank you! :)";
            String subject = "Thank you for completing the survey";
            sendInvitation.sendEmail(emailId, subject, text);
        }

        return new ResponseEntity(1, HttpStatus.CREATED);
    }


    // save responses for open
    @PostMapping(path = "/createOpenResponse", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createOpenResponse(@RequestBody SurveyResponse sr) throws Exception {
        // Integer uid =Integer.parseInt(session.getAttribute("sess_userid").toString());
        // System.out.println("Session userid: " + session.getAttribute("sess_userid"));
        Integer uid;
        if (session.getAttribute("sess_userid") == null) {
            uid = sr.getGuestid();
            System.out.println("open guest: " + uid);
        } else {
            uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
            System.out.println("open loggedin: ");
        }

        Integer surveyId = Integer.parseInt(sr.getSurveyId());
        Integer responseId;
        List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(surveyId, uid);

        int maxcounter = 0;
        for (int i = 0; i < res1.size(); i++) {
            if (res1.get(i).getCounter() > maxcounter) {
                maxcounter = res1.get(i).getCounter();
            }
        }
        Response res = responseService.getResponseBySurveyIdAndUserIdAndCounter(surveyId, uid, maxcounter);

        if (res != null && res.isCompletedStatus() != true) {
            System.out.println("FOUND Response");
            responseId = res.getResponseId();
        } else if (res != null && res.isCompletedStatus() == true) {
            System.out.println("Once completed");
            Response r = new Response(surveyId, uid, false, maxcounter);
            Response r1 = responseService.addResponse(r);
            responseId = r1.getResponseId();

        } else {
            System.out.println("First time giving a response");
            Response r = new Response(surveyId, uid, false, 0);
            Response r1 = responseService.addResponse(r);
            responseId = r1.getResponseId();
        }

        Integer questionId = Integer.parseInt(sr.getQuestions());
        String response = sr.getResponse();

        System.out.println("Actual Inputs: " + response + " ,Q: " + questionId);
        String[] arrayRes = response.split(",");
        for (String val : arrayRes) {

            //fetch option ID
            Options op = optionService.findByQuestionIdAndDescription(questionId, val);
            System.out.println("Fetch Option ID for :" + questionId + " & " + val);
            Integer optionId;
            if (op == null) {
                optionId = -1;
            } else {
                optionId = op.getOptionId();
            }

            //fetch answer by response and option ID (if already exists)
            Answer ans = answerService.getResponseByResponseIdAndQuestionIdAndOptionId(responseId, questionId, optionId);
            if (ans == null) {

                System.out.println("Response: " + responseId + " Q: " + questionId + " A: " + val + " O: " + optionId);
                Answer a = new Answer(responseId, questionId, val, optionId);
                answerService.addAnswer(a);

            } else {
                System.out.println("Im here");
                ans.setAnswer(val);
                answerService.saveAnswer(ans);
            }
        }
        return new ResponseEntity(1, HttpStatus.CREATED);

    }
    
    
    // submit guest open surveys
    @PostMapping(path = "/completeGuestResponse/{guestid}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> completeGuestResponse(@PathVariable Integer guestid, @RequestBody SurveyResponse sr) throws Exception {
        Integer uid = guestid;
        String emailId = guestservice.getGuestbyId(uid).getEmail();
        System.out.println("guest id: " + uid);
        Integer surveyId = Integer.parseInt(sr.getSurveyId());
        List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(surveyId, uid);

        int maxcounter = 0;
        for (int i = 0; i < res1.size(); i++) {
            if (res1.get(i).getCounter() > maxcounter) {
                maxcounter = res1.get(i).getCounter();
            }
        }
        Response res = responseService.getResponseBySurveyIdAndUserIdAndCounter(surveyId, uid, maxcounter);

        if (res != null) {
            System.out.println("FOUND Open Response - submit guest survey: " + emailId);
            res.setCompletedStatus(true);
            responseService.saveResponse(res);
            //send mail
            String text = "Thank you! :)";
            String subject = "Thank you for completing the survey";
            sendInvitation.sendEmail(emailId, subject, text);
        }

        return new ResponseEntity(1, HttpStatus.CREATED);
    }

}
