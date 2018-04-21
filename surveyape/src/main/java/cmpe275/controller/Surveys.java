package cmpe275.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin(origins = "http://localhost:3000")

public class Surveys {
    @GetMapping(path="/print",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String print() {
	 return "hello world";
    }

}
