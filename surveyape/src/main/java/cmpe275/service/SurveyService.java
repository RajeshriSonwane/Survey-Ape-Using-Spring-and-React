package cmpe275.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import cmpe275.entity.Survey;
import cmpe275.repository.SurveyRepository;



@Service
public class SurveyService {
    @Autowired
    private SurveyRepository surveyRepository;
    
    public Survey addSurvey(Survey s){
    	return surveyRepository.save(s);
    }
    
    public void saveSurvey(Survey s){
    	 surveyRepository.save(s);
    }
    
    public Survey getSurvey(Integer id) {
    	return surveyRepository.findBySurveyId(id);
    }
    
    public List<Survey> getAllSurveys() {
    	return surveyRepository.findAll();
    }

}
