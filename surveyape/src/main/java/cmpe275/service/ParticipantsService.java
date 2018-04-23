package cmpe275.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Participants;
import cmpe275.repository.ParticipantsRepository;

@Service
public class ParticipantsService {
    @Autowired
    private ParticipantsRepository participantsRepository;
    
    public void addParticipant(Participants p){
    	participantsRepository.save(p);
    }

}
