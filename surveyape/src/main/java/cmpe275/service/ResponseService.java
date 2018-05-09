package cmpe275.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Response;
import cmpe275.repository.ResponseRepository;

@Service
public class ResponseService {
	
	@Autowired
    private ResponseRepository responseRepository;
	
	public Response addResponse(Response r){
		return responseRepository.save(r);
    }

	 public void saveResponse(Response s){
		 responseRepository.save(s);
    }
    
    public Response getResponse(Integer id) {
    	return responseRepository.findByResponseId(id);
    }
    
    public List<Response> getResponseBySurveyIdAndUserId(Integer surveyId, Integer userId) {
    	return responseRepository.findBySurveyIdAndUserId(surveyId, userId);
    }
    
    public Response getResponseBySurveyIdAndUserIdAndCounter(Integer surveyId, Integer userId, Integer counter) {
    	return responseRepository.findBySurveyIdAndUserIdAndCounter(surveyId, userId, counter);
    }
    
    public List<Response> responsesBySurveyId(Integer surveyId){
    	return responseRepository.findBySurveyId(surveyId);
    }
    
    public List<Response> responsesByUserId(Integer uid){
    	return responseRepository.findByUserId(uid);
    }
}
