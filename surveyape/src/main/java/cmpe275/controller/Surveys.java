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
import cmpe275.repository.SurveyRepository;
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
	
	@Autowired
	private SendInvitation sendInvitation;

	@Autowired
	HttpSession session;
	
	
	
	// create general survey
	@PostMapping(path = "/creategeneral", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createGeneralSurvey(@RequestBody Newsurvey ns) throws IOException {
		// Integer uid=Integer.parseInt((session.getAttribute("userid")).toString());
		Integer uid = 1;
		Survey s = new Survey(uid, ns.getTitle(), 1,0);
		Survey s1 = surveyService.addSurvey(s);
		String[] questions = ns.getQuestions();
		int l = questions.length;
		for (int i = 0; i < l; i++) {
			Question q = new Question(questions[i], s1.getSurveyId());
			questionService.addQuestion(q);
		}
		String[] participants = ns.getParticipants();
		l = participants.length;
		for (int i = 0; i < l; i++) {
			Participants pq = new Participants(participants[i], s1.getSurveyId());
			participantsService.addParticipant(pq);
			/*String text="Click on the follwing link to give the survey: http://localhost:3000/givesurvey?id="+s1.getSurveyId();
			String subject="Inviation for survey";
			sendInvitation.sendEmail(participants[i],subject,text);*/
		}
		return new ResponseEntity(1, HttpStatus.CREATED);
	}
	
	
	// create closed survey
	@PostMapping(path = "/createclosed", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createClosedSurvey(@RequestBody Newsurvey ns) throws Exception {
		// Integer uid=Integer.parseInt((session.getAttribute("userid")).toString());
		Integer uid = 1;
		Survey s = new Survey(uid, ns.getTitle(),2,0);
		Survey s1 = surveyService.addSurvey(s);

		String[] questions = ns.getQuestions();
		int l = questions.length;
		for (int i = 0; i < l; i++) {
			Question q = new Question(questions[i], s1.getSurveyId());
			questionService.addQuestion(q);
		}
		String[] participants = ns.getParticipants();
		System.out.println("check title: " + ns.getTitle());
		System.out.println("check par: " + ns.getParticipants()[0]);
		l = participants.length;
		for (int i = 0; i < l; i++) {
			Participants pq = new Participants(participants[i], s1.getSurveyId());
			participantsService.addParticipant(pq);
			/*String text="Click on the following link to give the survey: http://localhost:3000/givesurvey?id="+s1.getSurveyId()+"&user=12";
			String subject="Inviation for survey";
			sendInvitation.sendEmail(participants[i],subject,text);*/
		}
		return new ResponseEntity(1, HttpStatus.CREATED);
	}
	
	
	
	// publish survey
	@PostMapping(path = "/publish", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> publishSurvey(@RequestBody Integer id) throws Exception {
		System.out.println("Survey id: " + id);
		Survey s = surveyService.getSurvey(id);
		s.setStatus(1);
		surveyService.saveSurvey(s);
		return new ResponseEntity(1, HttpStatus.CREATED);
	}

	
	
	// close survey
	@PostMapping(path = "/close", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> closeSurvey(@RequestBody Integer id) throws Exception {
		System.out.println("Survey id: " + id);
		Survey s = surveyService.getSurvey(id);
		s.setStatus(0);
		surveyService.saveSurvey(s);
		return new ResponseEntity(1, HttpStatus.CREATED);
	}
	
	
	// get general survey by id
	@GetMapping(path = "/getsurvey/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getGeneralSurvey(@PathVariable Integer id) {
		// return surveyService.getSurvey(id);
		System.out.println("Survey id: " + id);
		Survey s = surveyService.getSurvey(id);
		System.out.println("check: " + s);
		if(s!=null && s.getStatus()==1)
			return new ResponseEntity(s, HttpStatus.FOUND);
		else
			return new ResponseEntity(false, HttpStatus.FOUND);
	}
	
	
	// get closed survey by id
	@GetMapping(path = "/getsurvey/{id}", params = "user", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getClosedSurvey(@PathVariable Integer id,@RequestParam(value = "user") Integer user) {
		// return surveyService.getSurvey(id);
		System.out.println("Survey user: " + user);
		Survey s = surveyService.getSurvey(id);
		if(s.getStatus()==1)
			return new ResponseEntity(s, HttpStatus.FOUND);
		else
			return new ResponseEntity(false, HttpStatus.FOUND);
	}


	// get all surveys created by a user
	@GetMapping(path = "/getallsurveys", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Iterable<Survey> getAllSurveys() {
		// Integer uid=Integer.parseInt((session.getAttribute("userid")).toString());
		Integer uid = 1;
		List<Survey> res = new ArrayList<Survey>();
		List<Survey> surveylist = surveyService.getAllSurveys();
		System.out.println("check survey: " + surveylist.get(0).getSurveyTitle());
		for (int i = 0; i < surveylist.size(); i++) {
			Survey temp = surveylist.get(i);
			if (temp.getUserID() == uid)
				res.add(temp);
		}
		// return new ResponseEntity(res,HttpStatus.FOUND);
		return res;
	}

	
	// edit survey - add questions and participants
	@PostMapping(path = "/editsurvey/{surId}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> editSurvey(@PathVariable Integer surId, @RequestBody Newsurvey ns) throws IOException {
		System.out.println("edit id: "+surId);
		Survey s = surveyService.getSurvey(surId);
		String[] questions = ns.getQuestions();
		String[] participants = ns.getParticipants();
		int l=questions.length;
		for (int i = 0; i < l; i++) {
			Question q = new Question(questions[i], surId);
			questionService.addQuestion(q);
		}
		l=participants.length;
		for (int i = 0; i < l; i++) {
			Participants pq = new Participants(participants[i], surId);
			participantsService.addParticipant(pq);
			// for general survey
			if(s.getType()==1) {
				/*String text="Click on the follwing link to give the survey: http://localhost:3000/givesurvey?id="+s.getSurveyId();
				String subject="Inviation for survey";
				sendInvitation.sendEmail(participants[i],subject,text);*/
			}
			// for closed survey
			else if(s.getType()==2) {
				/*String text="Click on the following link to give the survey: http://localhost:3000/givesurvey?id="+s1.getSurveyId()+"&user=12";
				String subject="Inviation for survey";
				sendInvitation.sendEmail(participants[i],subject,text);*/
			}
		}
		return new ResponseEntity(1, HttpStatus.CREATED);
	}
}

class Newsurvey {
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
