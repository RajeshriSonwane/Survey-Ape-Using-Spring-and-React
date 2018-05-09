package cmpe275.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import cmpe275.Newsurvey;
import cmpe275.entity.Answer;
import cmpe275.entity.Guest;
import cmpe275.entity.Options;
import cmpe275.entity.Participants;
import cmpe275.entity.Question;
import cmpe275.entity.Response;
import cmpe275.entity.Survey;
import cmpe275.entity.User;
import cmpe275.service.AnswerService;
import cmpe275.service.OptionService;
import cmpe275.service.ParticipantsService;
import cmpe275.service.QuestionService;
import cmpe275.service.ResponseService;
import cmpe275.service.SurveyService;
import cmpe275.service.UserService;
import cmpe275.service.GuestService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class Surveys {

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
	private GuestService guestservice;
	

	@Autowired
	private SendInvitation sendInvitation;

	@Autowired
	private HttpSession session;
	
	@Autowired
	private UserService userservice;
	
	

	/* ==================== CREATE SURVEYS ==================== */

	// create general survey
	@PostMapping(path = "/creategeneral", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createGeneralSurvey(@RequestBody Newsurvey ns) throws Exception {
		Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
		System.out.println("Session userid: " + session.getAttribute("sess_userid"));
		if(ns.getEndtime() == "") {
			ns.setEndtime("2038-01-01T01:00");
		}
		System.out.println("End: " + ns.getEndtime());
		LocalDateTime endtime = LocalDateTime.parse(ns.getEndtime());
		Survey s = new Survey(uid, ns.getTitle(), 1, 0, 0, endtime);
		Survey s1 = surveyService.addSurvey(s);
		String[] questions = ns.getQuestions();
		String[] options = ns.getOptions();
		String[] type = ns.getQtype();
		
		int l = questions.length;
		System.out.println("check len: " + l);
		int temp = 0;
		for (int i = 0; i < l; i++) {
			Question q = new Question(questions[i], type[i], s1.getSurveyId());
			Question newq = questionService.addQuestion(q);
			if (type[i].equalsIgnoreCase("text") == false) {
				while (temp < options.length && options[temp].equalsIgnoreCase("break") == false) {
					System.out.println(options[temp] + "  " + newq.getQuestionId());
					Options o = new Options(options[temp], newq.getQuestionId());
					optionService.addOption(o);
					temp++;
				}
			}
			temp++;
		}
		String[] participants = ns.getParticipants();
		l = participants.length;
		System.out.println("check len: " + l);
		for (int i = 0; i < l; i++) {
			Participants pq = new Participants(participants[i], s1.getSurveyId(), 0);
			participantsService.addParticipant(pq);
			String text = "Click on the follwing link to give the survey: http://localhost:3000/home/givesurvey?id="
					+ s1.getSurveyId();
			String subject = "Inviation for survey";
			sendInvitation.sendEmail(participants[i], subject, text);
		}
		return new ResponseEntity(1, HttpStatus.CREATED);
	}

	// create closed survey
	@PostMapping(path = "/createclosed", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createClosedSurvey(@RequestBody Newsurvey ns) throws Exception {
		System.out.println("Check ses: " + session.getAttribute("sess_userid").toString());
		Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
		System.out.println("Session userid: " + session.getAttribute("sess_userid")); 
		if(ns.getEndtime() == "") {
			ns.setEndtime("2038-01-01T01:00");
		}
		LocalDateTime endtime = LocalDateTime.parse(ns.getEndtime());
		Survey s = new Survey(uid, ns.getTitle(), 2, 0, 0,endtime);
		Survey s1 = surveyService.addSurvey(s);
		String[] questions = ns.getQuestions();
		String[] options = ns.getOptions();
		String[] type = ns.getQtype();
		int l = questions.length;
		int temp = 0;
		for (int i = 0; i < l; i++) {
			Question q = new Question(questions[i], type[i], s1.getSurveyId());
			Question newq = questionService.addQuestion(q);
			if (type[i].equalsIgnoreCase("text") == false) {
				while (temp < options.length && options[temp].equalsIgnoreCase("break") == false) {
					System.out.println(options[temp] + "  " + newq.getQuestionId());
					Options o = new Options(options[temp], newq.getQuestionId());
					optionService.addOption(o);
					temp++;
				}
			}
			temp++;
		}
		String[] participants = ns.getParticipants();
		System.out.println("check title: " + ns.getTitle());
		System.out.println("check par: " + ns.getParticipants()[0]);
		l = participants.length;
		for (int i = 0; i < l; i++) {
			Participants pq = new Participants(participants[i], s1.getSurveyId(), 0);
			Participants np = participantsService.addParticipant(pq);
			String text = "Click on the following link to give the survey: http://localhost:3000/home/givesurvey?id="+ s1.getSurveyId() + "&user=" + np.getParticipantsId();
			String subject = "Inviation for survey";
			sendInvitation.sendEmail(participants[i], subject, text);
		}
		return new ResponseEntity(1, HttpStatus.CREATED);
	}

	// create open survey
	@PostMapping(path = "/createopen", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createOpenSurvey(@RequestBody Newsurvey ns) throws Exception {
		Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
		System.out.println("Session userid: " + session.getAttribute("sess_userid"));
		if(ns.getEndtime() == "") {
			ns.setEndtime("2038-01-01T01:00");
		}
		LocalDateTime endtime = LocalDateTime.parse(ns.getEndtime());
		Survey s = new Survey(uid, ns.getTitle(), 3, 0, 0,endtime);
		Survey s1 = surveyService.addSurvey(s);
		String[] questions = ns.getQuestions();
		String[] options = ns.getOptions();
		String[] type = ns.getQtype();
		int l = questions.length;
		int temp = 0;
		for (int i = 0; i < l; i++) {
			Question q = new Question(questions[i], type[i], s1.getSurveyId());
			Question newq = questionService.addQuestion(q);
			if (type[i].equalsIgnoreCase("text") == false) {
				while (temp < options.length && options[temp].equalsIgnoreCase("break") == false) {
					System.out.println(options[temp] + "  " + newq.getQuestionId());
					Options o = new Options(options[temp], newq.getQuestionId());
					optionService.addOption(o);
					temp++;
				}
			}
			temp++;
		}
		return new ResponseEntity(1, HttpStatus.CREATED);
	}

	/* ==================== UPDATE SURVEYS STATUS ==================== */

	// publish survey
	@PostMapping(path = "/publish", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> publishSurvey(@RequestBody Integer id) throws Exception {
		System.out.println("Survey id: " + id);
		Survey s = surveyService.getSurvey(id);
		s.setStatus(1);
		if (s.getStartDate() == null)
			s.setStartDate(LocalDateTime.now());
		surveyService.saveSurvey(s);
		return new ResponseEntity(1, HttpStatus.CREATED);
	}

	// unpublish survey
	@PostMapping(path = "/unpublish", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> unpublishSurvey(@RequestBody Integer id) throws Exception {
		System.out.println("Survey id: " + id);
		Survey s = surveyService.getSurvey(id);
		s.setStatus(0);
		surveyService.saveSurvey(s);
		return new ResponseEntity(1, HttpStatus.CREATED);
	}

	// close survey
	@PostMapping(path = "/close", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> closeSurvey(@RequestBody Integer id) throws Exception {
		System.out.println("Closed Survey id: " + id);
		Survey s = surveyService.getSurvey(id);
		s.setClosed(1);
		s.setStatus(0);
		// s.setEndDate(LocalDateTime.now());
		surveyService.saveSurvey(s);
		return new ResponseEntity(1, HttpStatus.CREATED);
	}

	/* ==================== GET SURVEYS BY ID ==================== */

	// get general survey by id
	@GetMapping(path = "/getsurvey/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getGeneralSurvey(@PathVariable Integer id) {
		Boolean flag = false;
		List<Participants> participantslist = participantsService.getAllParticipantsBySurveryId(id);
		if(session.getAttribute("sess_userid")==null) {
			return new ResponseEntity(false, HttpStatus.FOUND);
		}
		 Integer uid=Integer.parseInt(session.getAttribute("sess_userid").toString());
		 System.out.println("session found in general:" + uid);
		 User u = userservice.getUserById(uid);
		 System.out.println("session's email found in general:" + u.getEmail());
		 System.out.println("sessions id: "+uid);

		
		  if(participantslist!=null) { 
			  System.out.println("looking for participant...");
			  for (int i = 0; i < participantslist.size(); i++) { 
				  System.out.println("participants in the list: "+participantslist.get(i).getParticipantEmail());
				  if(participantslist.get(i).getParticipantEmail().equals(u.getEmail()) )
				  { 
					  flag = true; 
					  System.out.println("Found participant");
					  break; 
				  } 
			  } 
		  }
		  else {
			  System.out.println("participant not found in general:");
			  return new ResponseEntity(false, HttpStatus.FOUND);
		  }
		  
		  if(flag == true) {
			  System.out.println("Survey id: " + id); 
			  Survey s = surveyService.getSurvey(id); 
			  System.out.println("Survey end time: " + s.getEndDate());
			  System.out.println("Current Time: " + LocalDateTime.now());
			  if(LocalDateTime.now().isBefore(s.getEndDate())) 
			  { 
				  System.out.println("check: " + s); 
				  if(s!=null && s.getStatus()==1) 
					  return new ResponseEntity(s, HttpStatus.FOUND); 
				  else 
					  return new ResponseEntity(false, HttpStatus.FOUND); 
			  }
			  else 
			  { 
				 s.setStatus(0); 
				 return new ResponseEntity(false, HttpStatus.FOUND); 
			  }
		  } 
		  else 
			  return new ResponseEntity(false, HttpStatus.FOUND);
		 

	}

	// get closed survey by id
		@GetMapping(path = "/getsurvey/{id}", params = "user", produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<?> getClosedSurvey(@PathVariable Integer id, @RequestParam(value = "user") Integer user) {
			if(session.getAttribute("sess_userid")==null) {
				return new ResponseEntity(false, HttpStatus.FOUND);
			}
			
			 Integer uid=Integer.parseInt(session.getAttribute("sess_userid").toString());
			 System.out.println("user id in param: " + user);
			 Participants p = participantsService.getByparticipantsIdAndsurveyId(user, id);
			 if(p == null)
			 {
				 return new ResponseEntity(false, HttpStatus.FOUND); 
			 }
			 User u = userservice.getUserById(uid);
			 if(u.getEmail().equals(p.getParticipantEmail())) {
				 System.out.println("session and user id is the same!!");
				 if(p!=null) {
					 System.out.println("participant found in closed:");
				 }
				 if(p.getGiven() == 0) {
					 System.out.println("in given ==0");
						 List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(id, uid);
							
							int maxcounter = 0;
							for(int i=0;i<res1.size(); i++) {
								if(res1.get(i).getCounter()>maxcounter) {
									maxcounter = res1.get(i).getCounter();
								}
							}
							System.out.println("maxcounter:" + maxcounter);
							Response r = responseService.getResponseBySurveyIdAndUserIdAndCounter(id, uid, maxcounter);

						 if(r == null) {
							 System.out.println("in r == null");
							 System.out.println("Survey user: " + user);
							 Survey s = surveyService.getSurvey(id);
							 if(s.getStatus()==1) {
								 if(LocalDateTime.now().isBefore(s.getEndDate())) {
									 return new ResponseEntity(s, HttpStatus.FOUND);	
								 }
								 else
									 return new ResponseEntity(false, HttpStatus.FOUND);
							 }
							 else
								 return new ResponseEntity(false, HttpStatus.FOUND);
							 
						 }
						 if(r.isCompletedStatus()== true) {
							 System.out.println("in completed is true");
							 p.setGiven(1);
							 participantsService.addParticipant(p);
							 return new ResponseEntity(false, HttpStatus.FOUND);
						 }
						 else {
							 System.out.println("Survey user: " + user);
							 Survey s = surveyService.getSurvey(id);
							 if(s.getStatus()==1) {
								 if(LocalDateTime.now().isBefore(s.getEndDate())) {
									 return new ResponseEntity(s, HttpStatus.FOUND);
								 }
								 else
									 return new ResponseEntity(false, HttpStatus.FOUND);
							 }
							 else
								 return new ResponseEntity(false, HttpStatus.FOUND);
						 }
				 }
				 else
				 {
					 System.out.println("in given !=0");
					 return new ResponseEntity(false, HttpStatus.FOUND);
				 }
			 }
			 else
			 return new ResponseEntity(false, HttpStatus.FOUND);
		}

	// get open survey for logged in user
		@GetMapping(path = "/getOpenSurveyQuestion/{id}",  produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<?> getOpenSurveyQuestion(@PathVariable Integer id) {
			Survey s = surveyService.getSurvey(id);
			if(session.getAttribute("sess_userid")==null) {
				System.out.println("session not found in open logged in");
				return new ResponseEntity(false, HttpStatus.FOUND);
			}
			
			 Integer uid=Integer.parseInt(session.getAttribute("sess_userid").toString());
			 System.out.println("session found in open logged in: " + uid);
			 List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(id, uid);
				
				int maxcounter = 0;
				for(int i=0;i<res1.size(); i++) {
					if(res1.get(i).getCounter()>maxcounter) {
						maxcounter = res1.get(i).getCounter();
					}
				}
				Response r = responseService.getResponseBySurveyIdAndUserIdAndCounter(id, uid, maxcounter);

			 if(r == null) {
				 System.out.println("in r == null");
				 if(s.getStatus()==1) {
					 if(LocalDateTime.now().isBefore(s.getEndDate())) {
						 
						 return new ResponseEntity(s, HttpStatus.FOUND);
					 }
					 else {
						 System.out.println("Sorry survey is closed");
						 return new ResponseEntity(false, HttpStatus.FOUND);
					 }
				 }
				 else {
					 System.out.println("status problem");
					 return new ResponseEntity(false, HttpStatus.FOUND);
				 }
				 
			 }
			 else if(r.isCompletedStatus()!=true) {
				 System.out.println("Not null but not complete");
				 if(s.getStatus()==1) {
					 if(LocalDateTime.now().isBefore(s.getEndDate())) {
						 return new ResponseEntity(s, HttpStatus.FOUND);
					 }
					 else
						 return new ResponseEntity(false, HttpStatus.FOUND);
				 }
				 else {
					 System.out.println("status problem");
					 return new ResponseEntity(false, HttpStatus.FOUND);
				 }
				 
			 }
			 else
			 {
				 System.out.println("Done everything");
				 return new ResponseEntity(false, HttpStatus.FOUND);
			 }
			 }
		

		// get open survey for not logged in user
		@GetMapping(path = "/giveOpenSurvey/{id}", params = "guest", produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<?> giveOpenSurvey(@PathVariable Integer id,@RequestParam(value = "guest") Integer user) {
		 
		Guest g = guestservice.getGuestbyId(user);
		
		//if survey is not taken
		 if(g.getGiven() == 0) {
		 List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(id, user);
			
			int maxcounter = 0;
			for(int i=0;i<res1.size(); i++) {
				if(res1.get(i).getCounter()>maxcounter) {
					maxcounter = res1.get(i).getCounter();
				}
			}
			Response r = responseService.getResponseBySurveyIdAndUserIdAndCounter(id, user, maxcounter);

		 System.out.println("guest: "+r);
		 // response is null
		 if(r==null){
			 System.out.println("Survey user: " + user);
			 Survey s = surveyService.getSurvey(id);
			 if(s.getStatus()==1) {
				// if(LocalDateTime.now().isBefore(s.getEndDate())) {
					 return new ResponseEntity(s, HttpStatus.FOUND);
//				 }
//				 else
//					 return new ResponseEntity(false, HttpStatus.FOUND);
			 }
			 else
				 return new ResponseEntity(false, HttpStatus.FOUND);
		 }
		 // survey taken before: set status
		 else {
			 g.setGiven(1);
			 guestservice.addGuest(g);
			 return new ResponseEntity(false, HttpStatus.FOUND);
		 }
		}
		//if survey is taken
		else
		return new ResponseEntity(false, HttpStatus.FOUND);
			}
	
	

	/* ==================== EDIT CREATION OF SURVEYS ==================== */

	// edit survey - add questions and participants
	@PostMapping(path = "/editsurvey/{surId}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> editSurvey(@PathVariable Integer surId, @RequestBody Newsurvey ns) throws IOException {
		System.out.println("edit id: " + surId);
		Survey s = surveyService.getSurvey(surId);
		String[] questions = ns.getQuestions();
		String[] type = ns.getQtype();
		String[] options = ns.getOptions();
		String[] participants = ns.getParticipants();
		int l = questions.length;
		int temp = 0;
		for (int i = 0; i < l; i++) {
			Question q = new Question(questions[i], type[i], surId);
			Question newq = questionService.addQuestion(q);
			if (type[i].equalsIgnoreCase("text") == false) {
				while (temp < options.length && options[temp].equalsIgnoreCase("break") == false) {
					System.out.println(options[temp] + "  " + newq.getQuestionId());
					Options o = new Options(options[temp], newq.getQuestionId());
					optionService.addOption(o);
					temp++;
				}
			}
			temp++;
		}

		l = participants.length;
		for (int i = 0; i < l; i++) {
			Participants pq = new Participants(participants[i], surId, 0);
			Participants np = participantsService.addParticipant(pq);
			// for general survey
			if (s.getType() == 1) {
				String text = "Click on the follwing link to give the survey: http://localhost:3000/home/givesurvey?id="
						+ s.getSurveyId();
				String subject = "Inviation for survey";
				try {
					sendInvitation.sendEmail(participants[i], subject, text);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			// for closed survey
			else if (s.getType() == 2) {
				String text = "Click on the following link to give the survey: http://localhost:3000/home/givesurvey?id="
						+ s.getSurveyId() + "&user=" + np.getParticipantsId();
				String subject = "Inviation for survey";
				try {
					sendInvitation.sendEmail(participants[i], subject, text);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return new ResponseEntity(1, HttpStatus.CREATED);
	}

	/* ==================== SAVE RESPONSES ==================== */

	// save responses for general and closed
	@PostMapping(path = "/createResponse", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createResponse(@RequestBody SurveyResponse sr) throws Exception {
		Integer uid =Integer.parseInt(session.getAttribute("sess_userid").toString());
		System.out.println("Session userid for general/closed: " + session.getAttribute("sess_userid"));
//		Integer uid = 1;
		Integer surveyId = Integer.parseInt(sr.getSurveyId());
		Integer responseId;
List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(surveyId, uid);
		
		int maxcounter = 0;
		for(int i=0;i<res1.size(); i++) {
			if(res1.get(i).getCounter()>maxcounter) {
				maxcounter = res1.get(i).getCounter();
			}
		}
		Response res = responseService.getResponseBySurveyIdAndUserIdAndCounter(surveyId, uid, maxcounter);
		
		if (res != null && res.isCompletedStatus()!=true) {
			System.out.println("FOUND Response");
			responseId = res.getResponseId();
		}
		else if(res != null && res.isCompletedStatus()==true) {
			System.out.println("Once completed");
			maxcounter++;
			Response r = new Response(surveyId, uid, false,maxcounter);
			Response r1 = responseService.addResponse(r);
			responseId = r1.getResponseId();

		} 
		
		else {
			System.out.println("First time giving a response");
			Response r = new Response(surveyId, uid, false,0);
			Response r1 = responseService.addResponse(r);
			responseId = r1.getResponseId();
		}

		Integer questionId = Integer.parseInt(sr.getQuestions());
		String response = sr.getResponse();
			
		System.out.println("Actual Inputs: "+response+ " ,Q: "+questionId);
		String[] arrayRes = response.split(",");
		for (String val : arrayRes) {
			
			//fetch option ID
			Options op = optionService.findByQuestionIdAndDescription(questionId, val);
			System.out.println("Fetch Option ID for :"+ questionId + " & "+ val);
			Integer optionId;
			if( op == null) {
				optionId = -1;
			}else {
				optionId = op.getOptionId();
			}
			
			//fetch answer by response and option ID (if already exists)
			Answer ans =  answerService.getResponseByResponseIdAndQuestionIdAndOptionId(responseId, questionId, optionId);
			if (ans == null) {
				
					System.out.println("Response: " + responseId + " Q: " + questionId + " A: " + val + " O: "+ optionId);
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
		Integer uid;
		String emailId;
		if(session.getAttribute("sess_userid")==null) {
			uid=481;
			System.out.println("open complete guest: "+uid);
			emailId=guestservice.getGuestbyId(uid).getEmail();
		}
		else {
			uid =Integer.parseInt(session.getAttribute("sess_userid").toString());
			System.out.println("session complete: "+uid);
			emailId=userservice.getUserById(uid).getEmail();
		}
		
		Integer surveyId = Integer.parseInt(sr.getSurveyId());
		List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(surveyId, uid);
		
		int maxcounter = 0;
		for(int i=0;i<res1.size(); i++) {
			if(res1.get(i).getCounter()>maxcounter) {
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
			String subject = "Thank you for completing thesurvey";
			sendInvitation.sendEmail(emailId, subject, text);
		}

		return new ResponseEntity(1, HttpStatus.CREATED);
	}
	
	
	@PostMapping(path = "/completeGuestResponse/{guestid}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> completeGuestResponse(@PathVariable Integer guestid,@RequestBody SurveyResponse sr) throws Exception {
		Integer uid=guestid;
		String emailId=guestservice.getGuestbyId(uid).getEmail();
	System.out.println("guest id: "+uid);
		Integer surveyId = Integer.parseInt(sr.getSurveyId());
		List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(surveyId, uid);
		
		int maxcounter = 0;
		for(int i=0;i<res1.size(); i++) {
			if(res1.get(i).getCounter()>maxcounter) {
				maxcounter = res1.get(i).getCounter();
			}
		}
		Response res = responseService.getResponseBySurveyIdAndUserIdAndCounter(surveyId, uid, maxcounter);

		if (res != null) {
			System.out.println("FOUND Open Response - submit guest survey: "+emailId);
			res.setCompletedStatus(true);
			responseService.saveResponse(res);
			//send mail
			String text = "Thank you! :)";
			String subject = "Thank you for completing thesurvey";
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
		if(session.getAttribute("sess_userid")==null) {

			uid=481;
			uid=sr.getGuestid();
			System.out.println("open guest: "+uid);
		}
		else {
			uid =Integer.parseInt(session.getAttribute("sess_userid").toString());
			System.out.println("open loggedin: ");
		}

		Integer surveyId = Integer.parseInt(sr.getSurveyId());
		Integer responseId;
		List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(surveyId, uid);
		
		int maxcounter = 0;
		for(int i=0;i<res1.size(); i++) {
			if(res1.get(i).getCounter()>maxcounter) {
				maxcounter = res1.get(i).getCounter();
			}
		}
		Response res = responseService.getResponseBySurveyIdAndUserIdAndCounter(surveyId, uid, maxcounter);
		
		if (res != null && res.isCompletedStatus()!=true) {
			System.out.println("FOUND Response");
			responseId = res.getResponseId();
		}
		else if(res != null && res.isCompletedStatus()==true) {
			System.out.println("Once completed");
			Response r = new Response(surveyId, uid, false,maxcounter);
			Response r1 = responseService.addResponse(r);
			responseId = r1.getResponseId();

		} 
		
		else {
			System.out.println("First time giving a response");
			Response r = new Response(surveyId, uid, false,0);
			Response r1 = responseService.addResponse(r);
			responseId = r1.getResponseId();
		}

		Integer questionId = Integer.parseInt(sr.getQuestions());
		String response = sr.getResponse();
			
		System.out.println("Actual Inputs: "+response+ " ,Q: "+questionId);
		String[] arrayRes = response.split(",");
		for (String val : arrayRes) {
			
			//fetch option ID
			Options op = optionService.findByQuestionIdAndDescription(questionId, val);
			System.out.println("Fetch Option ID for :"+ questionId + " & "+ val);
			Integer optionId;
			if( op == null) {
				optionId = -1;
			}else {
				optionId = op.getOptionId();
			}
			
			//fetch answer by response and option ID (if already exists)
			Answer ans =  answerService.getResponseByResponseIdAndQuestionIdAndOptionId(responseId, questionId, optionId);
			if (ans == null) {
				
					System.out.println("Response: " + responseId + " Q: " + questionId + " A: " + val + " O: "+ optionId);
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

	/* ==================== OTHERS ==================== */

	// get all surveys created by a user
	@GetMapping(path = "/getallsurveys", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> getAllSurveys() {
		if(session.getAttribute("sess_userid")==null) {
			return new ResponseEntity(false, HttpStatus.FOUND);
		}
		Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
		System.out.println("Session userid: " + uid);
		List<Survey> res = new ArrayList<Survey>();
		List<Survey> surveylist = surveyService.getAllSurveys();
		for (int i = 0; i < surveylist.size(); i++) {
			Survey temp = surveylist.get(i);
			if ((temp.getUserID()).equals(uid))
				res.add(temp);
		}
		return new ResponseEntity(res, HttpStatus.FOUND);
	}
	
	// get survey by surveyId
	@GetMapping(path = "/getsurveybyid/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> getSurveyById(@PathVariable Integer id) {
		Survey s = surveyService.getSurvey(id);
		return new ResponseEntity(s, HttpStatus.FOUND);
	}
	
	// get all user details for auto populate.
		@GetMapping(path = "/getuserdetails", produces = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody ResponseEntity<?> getUserDetails() {
			if(session.getAttribute("sess_userid")==null) {
				return new ResponseEntity(false, HttpStatus.FOUND);
			}
			Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
			System.out.println("Session userid: " + uid);
			User u = userservice.getUserById(uid);
			if(u == null)
				return new ResponseEntity(false, HttpStatus.FOUND);
			else
			return new ResponseEntity(u, HttpStatus.FOUND);
		}


	// get all open surveys by id
	@GetMapping(path = "/getOpenSurveys", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Iterable<Survey> getOpenSurveys() {
		List<Survey> res = new ArrayList<Survey>();
		List<Survey> surveylist = surveyService.getAllSurveys();
		System.out.println(
				"get open survey: " + surveylist.get(0).getSurveyId() + "-" + surveylist.get(0).getSurveyTitle());
		for (int i = 0; i < surveylist.size(); i++) {
			Survey temp = surveylist.get(i);
			if (temp.getType() == 3)
				res.add(temp);
		}
		return res;
	}

}

class SurveyResponse {
	String surveyId;
	String questions;
	String response;
	Integer guestid;

	public Integer getGuestid() {
		return guestid;
	}

	public void setGuestid(Integer guestid) {
		this.guestid = guestid;
	}

	public String getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(String surveyId) {
		this.surveyId = surveyId;
	}

	public String getQuestions() {
		return questions;
	}

	public void setQuestions(String questions) {
		this.questions = questions;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

}
