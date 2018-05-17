package cmpe275.controller;

import cmpe275.Newsurvey;
import cmpe275.entity.*;
import cmpe275.service.*;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
        if (ns.getEndtime() == "") {
            ns.setEndtime("2038-01-01T01:00");
        }

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
            if(type[i].equalsIgnoreCase("yesNo") == true) {
            	Options yes = new Options("Yes", newq.getQuestionId());
                optionService.addOption(yes);
            	Options no = new Options("No", newq.getQuestionId());
                optionService.addOption(no);
            }
            else if (type[i].equalsIgnoreCase("text") == false) {
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
        String QR_CODE_IMAGE_PATH = "./MyQRCode.png";
        for (int i = 0; i < l; i++) {
            Participants pq = new Participants(participants[i], s1.getSurveyId(), 0);
            participantsService.addParticipant(pq);
            System.out.println("Email check: " + pq.getParticipantEmail());
            String QRCodeURL = "http://localhost:3000/home/givesurvey?id=" + s1.getSurveyId();
            try {
                 generateQRCodeImage(QRCodeURL, 250, 250, QR_CODE_IMAGE_PATH);

            } catch (WriterException e) {
                System.out.println("Could not generate QR Code, WriterException :: " + e.getMessage());
            } catch (IOException e) {
                System.out.println("Could not generate QR Code, IOException :: " + e.getMessage());
            }

            String text = "Click on the follwing link to give the survey: http://localhost:3000/home/givesurvey?id="
                    + s1.getSurveyId();
            String subject = "Inviation for survey";

            sendInvitation.sendQREmail(participants[i], subject, text);
        }
        return new ResponseEntity(1, HttpStatus.CREATED);
    }

    private static void generateQRCodeImage(String text, int width, int height, String filePath)
            throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        Path path = FileSystems.getDefault().getPath(filePath);

        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        System.out.println("QR code generated");
    }

    // create closed survey
    @PostMapping(path = "/createclosed", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createClosedSurvey(@RequestBody Newsurvey ns) throws Exception {
        System.out.println("Check ses: " + session.getAttribute("sess_userid").toString());
        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        System.out.println("Session userid: " + session.getAttribute("sess_userid"));
        if (ns.getEndtime() == "") {
            ns.setEndtime("2038-01-01T01:00");
        }
        LocalDateTime endtime = LocalDateTime.parse(ns.getEndtime());
        Survey s = new Survey(uid, ns.getTitle(), 2, 0, 0, endtime);
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
        System.out.println("check par: " + ns.getParticipants());
        String QR_CODE_IMAGE_PATH = "./MyQRCode.png";
        l = participants.length;
        for (int i = 0; i < l; i++) {
            Participants pq = new Participants(participants[i], s1.getSurveyId(), 0);
            Participants np = participantsService.addParticipant(pq);

            String QRCodeURL = "http://localhost:3000/home/givesurvey?id=" + s1.getSurveyId() + "&user=" + np.getParticipantsId();
            try {
                generateQRCodeImage(QRCodeURL, 250, 250, QR_CODE_IMAGE_PATH);
            } catch (WriterException e) {
                System.out.println("Could not generate QR Code, WriterException :: " + e.getMessage());
            } catch (IOException e) {
                System.out.println("Could not generate QR Code, IOException :: " + e.getMessage());
            }

            String text = "Click on the following link to give the survey: http://localhost:3000/home/givesurvey?id=" + s1.getSurveyId() + "&user=" + np.getParticipantsId();
            String subject = "Inviation for survey";
            sendInvitation.sendQREmail(participants[i], subject, text);
        }
        return new ResponseEntity(1, HttpStatus.CREATED);
    }

    // create open survey
    @PostMapping(path = "/createopen", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createOpenSurvey(@RequestBody Newsurvey ns) throws Exception {
        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        System.out.println("Session userid: " + session.getAttribute("sess_userid"));
        if (ns.getEndtime() == "") {
            ns.setEndtime("2038-01-01T01:00");
        }
        LocalDateTime endtime = LocalDateTime.parse(ns.getEndtime());
        Survey s = new Survey(uid, ns.getTitle(), 3, 0, 0, endtime);
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
        if (session.getAttribute("sess_userid") == null) {
            return new ResponseEntity(false, HttpStatus.FOUND);
        }
        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        System.out.println("session found in general:" + uid);
        User u = userservice.getUserById(uid);
        System.out.println("session's email found in general:" + u.getEmail());
        System.out.println("sessions id: " + uid);


        if (participantslist != null) {
            System.out.println("looking for participant...");
            for (int i = 0; i < participantslist.size(); i++) {
                System.out.println("participants in the list: " + participantslist.get(i).getParticipantEmail());
                if (participantslist.get(i).getParticipantEmail().equals(u.getEmail())) {
                    flag = true;
                    System.out.println("Found participant");
                    break;
                }
            }
        } else {
            System.out.println("participant not found in general:");
            return new ResponseEntity(false, HttpStatus.FOUND);
        }

        if (flag == true) {
            System.out.println("Survey id: " + id);
            Survey s = surveyService.getSurvey(id);
            System.out.println("Survey end time: " + s.getEndDate());
            System.out.println("Current Time: " + LocalDateTime.now());
            if (LocalDateTime.now().isBefore(s.getEndDate())) {
                System.out.println("check: " + s);
                if (s != null && s.getStatus() == 1)
                    return new ResponseEntity(s, HttpStatus.FOUND);
                else
                    return new ResponseEntity(false, HttpStatus.FOUND);
            } else {
                s.setStatus(0);
                return new ResponseEntity(false, HttpStatus.FOUND);
            }
        } else
            return new ResponseEntity(false, HttpStatus.FOUND);


    }

    // get closed survey by id
    @GetMapping(path = "/getsurvey/{id}", params = "user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getClosedSurvey(@PathVariable Integer id, @RequestParam(value = "user") Integer user) {
        if (session.getAttribute("sess_userid") == null) {
            return new ResponseEntity(false, HttpStatus.FOUND);
        }

        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        System.out.println("user id in param: " + user);
        Participants p = participantsService.getByparticipantsIdAndsurveyId(user, id);
        if (p == null) {
            return new ResponseEntity(false, HttpStatus.FOUND);
        }
        User u = userservice.getUserById(uid);
        if (u.getEmail().equals(p.getParticipantEmail())) {
            System.out.println("session and user id is the same!!");
            if (p != null) {
                System.out.println("participant found in closed:");
            }
            if (p.getGiven() == 0) {
                System.out.println("in given ==0");
                List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(id, uid);

                int maxcounter = 0;
                for (int i = 0; i < res1.size(); i++) {
                    if (res1.get(i).getCounter() > maxcounter) {
                        maxcounter = res1.get(i).getCounter();
                    }
                }
                System.out.println("maxcounter:" + maxcounter);
                Response r = responseService.getResponseBySurveyIdAndUserIdAndCounter(id, uid, maxcounter);

                if (r == null) {
                    System.out.println("in r == null");
                    System.out.println("Survey user: " + user);
                    Survey s = surveyService.getSurvey(id);
                    if (s.getStatus() == 1) {
                        if (LocalDateTime.now().isBefore(s.getEndDate())) {
                            return new ResponseEntity(s, HttpStatus.FOUND);
                        } else
                            return new ResponseEntity(false, HttpStatus.FOUND);
                    } else
                        return new ResponseEntity(false, HttpStatus.FOUND);

                }
                if (r.isCompletedStatus() == true) {
                    System.out.println("in completed is true");
                    p.setGiven(1);
                    participantsService.addParticipant(p);
                    return new ResponseEntity(false, HttpStatus.FOUND);
                } else {
                    System.out.println("Survey user: " + user);
                    Survey s = surveyService.getSurvey(id);
                    if (s.getStatus() == 1) {
                        if (LocalDateTime.now().isBefore(s.getEndDate())) {
                            return new ResponseEntity(s, HttpStatus.FOUND);
                        } else
                            return new ResponseEntity(false, HttpStatus.FOUND);
                    } else
                        return new ResponseEntity(false, HttpStatus.FOUND);
                }
            } else {
                System.out.println("in given !=0");
                return new ResponseEntity(false, HttpStatus.FOUND);
            }
        } else
            return new ResponseEntity(false, HttpStatus.FOUND);
    }

    // get open survey for logged in user
    @GetMapping(path = "/getOpenSurveyQuestion/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOpenSurveyQuestion(@PathVariable Integer id) {
        Survey s = surveyService.getSurvey(id);
        if (session.getAttribute("sess_userid") == null) {
            System.out.println("session not found in open logged in");
            return new ResponseEntity(false, HttpStatus.FOUND);
        }

        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        System.out.println("session found in open logged in: " + uid);
        List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(id, uid);

        int maxcounter = 0;
        for (int i = 0; i < res1.size(); i++) {
            if (res1.get(i).getCounter() > maxcounter) {
                maxcounter = res1.get(i).getCounter();
            }
        }
        Response r = responseService.getResponseBySurveyIdAndUserIdAndCounter(id, uid, maxcounter);

        if (r == null) {
            System.out.println("in r == null");
            if (s.getStatus() == 1) {
                if (LocalDateTime.now().isBefore(s.getEndDate())) {

                    return new ResponseEntity(s, HttpStatus.FOUND);
                } else {
                    System.out.println("Sorry survey is closed");
                    return new ResponseEntity(false, HttpStatus.FOUND);
                }
            } else {
                System.out.println("status problem");
                return new ResponseEntity(false, HttpStatus.FOUND);
            }

        } else if (r.isCompletedStatus() != true) {
            System.out.println("Not null but not complete");
            if (s.getStatus() == 1) {
                if (LocalDateTime.now().isBefore(s.getEndDate())) {
                    return new ResponseEntity(s, HttpStatus.FOUND);
                } else
                    return new ResponseEntity(false, HttpStatus.FOUND);
            } else {
                System.out.println("status problem");
                return new ResponseEntity(false, HttpStatus.FOUND);
            }

        } else {
            System.out.println("Done everything");
            return new ResponseEntity(false, HttpStatus.FOUND);
        }
    }


    // get open survey for not logged in user
    @GetMapping(path = "/giveOpenSurvey/{id}", params = "guest", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> giveOpenSurvey(@PathVariable Integer id, @RequestParam(value = "guest") Integer user) {

        Guest g = guestservice.getGuestbyId(user);

        //if survey is not taken
        if (g.getGiven() == 0) {
            List<Response> res1 = responseService.getResponseBySurveyIdAndUserId(id, user);

            int maxcounter = 0;
            for (int i = 0; i < res1.size(); i++) {
                if (res1.get(i).getCounter() > maxcounter) {
                    maxcounter = res1.get(i).getCounter();
                }
            }
            Response r = responseService.getResponseBySurveyIdAndUserIdAndCounter(id, user, maxcounter);

            System.out.println("guest: " + r);
            // response is null
            if (r == null) {
                System.out.println("Survey user: " + user);
                Survey s = surveyService.getSurvey(id);
                if (s.getStatus() == 1) {
                    // if(LocalDateTime.now().isBefore(s.getEndDate())) {
                    return new ResponseEntity(s, HttpStatus.FOUND);
//				 }
//				 else
//					 return new ResponseEntity(false, HttpStatus.FOUND);
                } else
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



	/* ==================== OTHERS ==================== */

    // get all surveys created by a user
    @GetMapping(path = "/getallsurveys", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<?> getAllSurveys() {
        if (session.getAttribute("sess_userid") == null) {
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
    public @ResponseBody
    ResponseEntity<?> getSurveyById(@PathVariable Integer id) {
        if (session.getAttribute("sess_userid") == null) {
            return new ResponseEntity(false, HttpStatus.FOUND);
        }
        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        Response res = null;
        System.out.println("Session userid: " + uid);

        Survey s = surveyService.getSurvey(id);
        Survey temp = s;
        List<Response> r = s.getResponses();
        ArrayList<Response> fin = new ArrayList<Response>();
        for (int i = 0; i < r.size(); i++) {
            res = r.get(i);
            if (res.getUserId() == uid) {
                System.out.println("inside the if");
                fin.add(res);
            }
        }
        temp.setResponses(null);
        temp.setResponses(fin);
        return new ResponseEntity(temp, HttpStatus.FOUND);
    }

    // get all user details for auto populate.
    @GetMapping(path = "/getuserdetails", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<?> getUserDetails() {
        if (session.getAttribute("sess_userid") == null) {
            return new ResponseEntity(false, HttpStatus.FOUND);
        }
        Integer uid = Integer.parseInt(session.getAttribute("sess_userid").toString());
        System.out.println("Session userid: " + uid);
        User u = userservice.getUserById(uid);
        if (u == null)
            return new ResponseEntity(false, HttpStatus.FOUND);
        else
            return new ResponseEntity(u, HttpStatus.FOUND);
    }


    // get all open surveys by id
    @GetMapping(path = "/getOpenSurveys", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Iterable<Survey> getOpenSurveys() {
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
