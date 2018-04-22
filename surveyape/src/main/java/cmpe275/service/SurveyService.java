package cmpe275.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Survey;
import cmpe275.repository.SurveyRepository;


@Service
public class SurveyService {
    @Autowired
    private SurveyRepository surveyRepository;
    
    public void addSurvey(Survey s){
    	surveyRepository.save(s);
    }

}