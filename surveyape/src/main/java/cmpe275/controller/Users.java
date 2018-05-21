package cmpe275.controller;

import cmpe275.entity.Guest;
import cmpe275.entity.User;
import cmpe275.service.GuestService;
import cmpe275.service.UserService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.List;

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

    @Autowired
    private SendInvitation sendInvitation;
    
    String urlip="54.245.167.26";

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
            session.setAttribute("notlogged",0);
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
            sendInvitation.sendEmail(user.getEmail(), "Verify Email ID", "Click on the following link to validate " + user.getValidCode());
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
                    sendInvitation.sendEmail(jsonObject.getString("email"), "Email ID verification Successful", "Congralutaions! Account validated");
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
        Guest ng=new Guest(jsonObject.getString("email"),Integer.parseInt(jsonObject.get("surId").toString()), 0);
        int gid = guestService.addGuest(ng).getGuestId();
        String QR_CODE_IMAGE_PATH = "./MyQRCode.png";
        String QRCodeURL = "http://"+urlip+":3000/home/giveOpenSurvey?id=" + jsonObject.get("surId")+ "&guest=" + gid;
        try {
            generateQRCodeImage(QRCodeURL, 250, 250, QR_CODE_IMAGE_PATH);
        } catch (WriterException e) {
            System.out.println("Could not generate QR Code, WriterException :: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Could not generate QR Code, IOException :: " + e.getMessage());
        }

        try {
            sendInvitation.sendQREmail(jsonObject.getString("email"), "Inviation for survey", "Click on the following link to give the survey: http://"+urlip+":3000/home/giveOpenSurvey?id=" + jsonObject.get("surId")+ "&guest=" + gid);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity(HttpStatus.OK);
    }
    
    // check session
    @GetMapping(path = "/checksession", consumes = MediaType.APPLICATION_JSON_VALUE) // Map
    public @ResponseBody ResponseEntity<?> checkSession() {
    	if (session.getAttribute("sess_userid") == null) {
            return new ResponseEntity(false, HttpStatus.FOUND);
        }
    	System.out.println("check session: "+session.getAttribute("sess_userid"));
    	Integer uid=Integer.parseInt(session.getAttribute("sess_userid").toString());
    	User u=userService.getUserById(uid);
        return new ResponseEntity(u,HttpStatus.FOUND);
    }

    // QR code
    private static void generateQRCodeImage(String text, int width, int height, String filePath)
            throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        Path path = FileSystems.getDefault().getPath(filePath);

        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        System.out.println("QR code generated");
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
