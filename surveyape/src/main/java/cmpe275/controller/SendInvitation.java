package cmpe275.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.mail.internet.MimeMessage;

@Controller
public class SendInvitation {
	
	// SET SENDER EMAIL AND PASSWORD IN application.properties
	
    @Autowired
    private JavaMailSender sender;

    @RequestMapping("/simpleemail")
    @ResponseBody
    String home() {
        try {
            sendEmail("anjanap1308@gmail.com","Provide survey","Click on the following link to give the survey!");
            return "Email Sent!";
        }catch(Exception ex) {
            return "Error in sending email: "+ex;
        }
    }

    private void sendEmail(String to, String subject, String text) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);        
        helper.setTo(to);
        helper.setText(text);
        helper.setSubject(subject);       
        sender.send(message);
    }
}
