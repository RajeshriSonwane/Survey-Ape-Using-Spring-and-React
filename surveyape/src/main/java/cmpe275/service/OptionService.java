package cmpe275.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Options;
import cmpe275.repository.OptionRepository;

@Service
public class OptionService {
    @Autowired
    private OptionRepository optionRepository;
    
    public void addOption(Options o){
     optionRepository.save(o);
    }
    
    public Options findByQuestionIdAndDescription(Integer questionId, String description) {
    	return optionRepository.findByQuestionIdAndDescription(questionId, description);
    }
}
