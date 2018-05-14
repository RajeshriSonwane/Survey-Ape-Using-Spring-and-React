package cmpe275.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Controller
public class SendInvitation {

    // SET SENDER EMAIL AND PASSWORD IN application.properties

    @Autowired
    private JavaMailSender sender;

    @RequestMapping("/simpleemail")
    @ResponseBody
    String home() {
        try {
            sendEmail("anjanap1308@gmail.com", "Provide survey", "Click on the following link to give the survey!");
            return "Email Sent!";
        } catch (Exception ex) {
            return "Error in sending email: " + ex;
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

    public void sendQREmail(String to, String subject, String text) throws MessagingException, IOException {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        MimeBodyPart bodyPart = new MimeBodyPart();
        String htmlMessage = "<html>Hello,<br><br><br>";
        htmlMessage += text+"<br/>"+"<br/>"+"<br/>";
        htmlMessage += "Scan the QR code to enter into Survey- <br/> <img src=\"cid:AbcXyz123\" />";
        htmlMessage += "</html>";
        bodyPart.setContent(htmlMessage, "text/html");

        MimeBodyPart imagePart = new MimeBodyPart();
        imagePart.setHeader("Content-ID", "<AbcXyz123>");
        imagePart.setDisposition(MimeBodyPart.INLINE);
        imagePart.attachFile("MyQRCode.png");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(bodyPart);
        multipart.addBodyPart(imagePart);
        message.setContent(multipart);

     //   helper.setText(text);
        helper.setTo(to);
        helper.setSubject(subject);
        sender.send(message);
    }
}
