package cmpe275.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Guest;
import cmpe275.repository.GuestRepository;



@Service
public class GuestService {
	
    @Autowired
    private GuestRepository guestRepository;
    
    public void addGuest(Guest g) {
    	guestRepository.save(g);
    }
    
    public List<Guest> guestBySurveyId(Integer s){
    	return guestRepository.findBySurveyId(s);
    }

}
