package cmpe275.controller;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;

import cmpe275.entity.User;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import org.json.JSONObject;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/user")
public class Users {

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender sender;

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session) throws JSONException {
        System.out.println("Login Hit");
        JSONObject jsonObject = new JSONObject(user);
        session.setAttribute("name", jsonObject.getString("email"));

        List<User> b = userService.login(jsonObject.getString("email"), jsonObject.getString("password"));
        if (b.isEmpty()) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        } else {
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
    public ResponseEntity<?> verifyUser(@RequestBody String user, HttpSession session) throws JSONException {
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
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return new ResponseEntity(HttpStatus.OK);
            }
            else{
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
        }
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
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return new ResponseEntity(HttpStatus.OK);
    }

}
