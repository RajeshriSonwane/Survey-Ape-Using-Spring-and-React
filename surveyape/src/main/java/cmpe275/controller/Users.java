package cmpe275.controller;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;

import cmpe275.entity.Guest;
import cmpe275.entity.User;
import cmpe275.service.GuestService;
import cmpe275.service.UserService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;

import org.json.JSONObject;

@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "/user")
public class Users {

    @Autowired
    private UserService userService;
    
    @Autowired
    private GuestService guestService;

    @Autowired
    private JavaMailSender sender;

    @Autowired
    HttpSession session;


    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user) throws JSONException {
        System.out.println("Login Hit");
        JSONObject jsonObject = new JSONObject(user);

        List<User> b = userService.login(jsonObject.getString("email"), jsonObject.getString("password"));
        if (b.isEmpty()) {
            System.out.println("Login Hit - forbidden");
            return new ResponseEntity(HttpStatus.FORBIDDEN);

        } else {
            System.out.println("Login Hit - ok");
            session.setAttribute("sess_userid", b.get(0).getUserId());
            session.setAttribute("sess_email", jsonObject.getString("email").toString());
            System.out.println("set sess: " + session.getAttribute("sess_userid"));
            return new ResponseEntity(HttpStatus.OK);

        }
    }

    @PostMapping(path = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE) // Map
    public ResponseEntity<?> addNewUser(@RequestBody User user) {
        System.out.println("Signup Hit");
        userService.addUser(user);

        System.out.println("Signup successful");
        try {
            sendEmail(user.getEmail(), "Verify Email ID", "Click on the following link to validate " + user.getValidCode());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping(path = "/verifyUser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> verifyUser(@RequestBody String user) throws JSONException {
        System.out.println("verify Hit");
        JSONObject jsonObject = new JSONObject(user);
        System.out.println(jsonObject.getString("email"));
        System.out.println(jsonObject.getString("password"));
        System.out.println(jsonObject.getString("verificationCode"));

        List<User> b = userService.login(jsonObject.getString("email"), jsonObject.getString("password"));
        System.out.println(b.isEmpty());
        if (b.isEmpty()) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        } else {
            System.out.println(b.get(0).getValidCode());
            System.out.println(jsonObject.getString("verificationCode"));
            int code = Integer.parseInt(jsonObject.getString("verificationCode"));
            if (code == b.get(0).getValidCode()) {
                try {
                    sendEmail(jsonObject.getString("email"), "Email ID verification Successful", "Congratz.. Account validated");
                    session.setAttribute("sess_userid", b.get(0).getUserId());
                    session.setAttribute("sess_email", jsonObject.getString("email").toString());
                    System.out.println("set sess: " + session.getAttribute("sess_userid"));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                User u = userService.getUser(jsonObject.getString("email"));
                u.setIsActive("true");
                userService.addUser(u);
                return new ResponseEntity(HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
        }
    }

    @PostMapping(path = "/registerOpenUser", consumes = MediaType.APPLICATION_JSON_VALUE) // Map
    public ResponseEntity<?> registerOpenUser(@RequestBody String user) {
        System.out.println("registerOpenUser Hit" + user);

        JSONObject jsonObject = new JSONObject(user);
        System.out.println(jsonObject.getString("email"));
        System.out.println(jsonObject.get("surId"));
        Guest ng=new Guest(jsonObject.getString("email"),Integer.parseInt(jsonObject.get("surId").toString()));
        guestService.addGuest(ng);

        try {
            sendEmail(jsonObject.getString("email"), "Inviation for survey", "Click on the following link to give the survey: http://localhost:3000/home/giveOpenSurvey?id=" + jsonObject.get("surId"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public void sendEmail(String to, String subject, String text) throws Exception {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setTo(to);
        helper.setText(text);
        helper.setSubject(subject);
        sender.send(message);
    }

    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println("logout hit");
        System.out.println(session.getAttribute("sess_userid"));
        session.invalidate();
        return new ResponseEntity(HttpStatus.OK);
    }
}
