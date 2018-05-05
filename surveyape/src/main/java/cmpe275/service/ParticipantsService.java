package cmpe275.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Participants;
import cmpe275.entity.Survey;
import cmpe275.repository.ParticipantsRepository;

@Service
public class ParticipantsService {
    @Autowired
    private ParticipantsRepository participantsRepository;
    
    public void addParticipant(Participants p){
    	participantsRepository.save(p);
    }
    
    public List<Participants> getAllParticipants() {
    	return participantsRepository.findAll();
    }
    
    public List<Participants> getAllParticipantsBySurveryId(Integer s) {
    	return participantsRepository.findBySurveyId(s);
    }
    
    public Participants getParticipantsById(Integer user) {
    	return participantsRepository.findByparticipantsId(user);
    }

}
