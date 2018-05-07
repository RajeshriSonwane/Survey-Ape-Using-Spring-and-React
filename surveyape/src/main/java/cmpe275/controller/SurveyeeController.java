package cmpe275.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cmpe275.entity.Answer;
import cmpe275.entity.Options;
import cmpe275.entity.Participants;
import cmpe275.entity.Question;
import cmpe275.entity.Response;
import cmpe275.entity.Survey;
import cmpe275.service.AnswerService;
import cmpe275.service.OptionService;
import cmpe275.service.ParticipantsService;
import cmpe275.service.QuestionService;
import cmpe275.service.ResponseService;
import cmpe275.service.SurveyService;


@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SurveyeeController {
	
	@Autowired
	private SurveyService surveyService;

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
	public @ResponseBody Iterable<Survey> participantSurveys() {
		Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
		System.out.println("Session userid: " + uid);
		
		return null;
	}

}
