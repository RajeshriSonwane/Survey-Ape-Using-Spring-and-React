package cmpe275.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Answer;
import cmpe275.repository.AnswerRepository;

@Service
public class AnswerService {
	@Autowired
    private AnswerRepository answerRepository;
    
    public Answer addAnswer(Answer a){
    	return answerRepository.save(a);
    }
    
    public List<Answer> getResponseByResponseIdAndQuestionId(Integer responseId, Integer questionId) {
    	return answerRepository.findByQuestionIdAndResponseId(questionId, responseId);
    }
    
    public Answer getResponseByResponseIdAndOptionId(Integer responseId, Integer optionId) {
    	return answerRepository.findByResponseIdAndOptionId(responseId, optionId);
    }
    
    public Answer getResponseByResponseIdAndQuestionIdAndOptionId(Integer responseId, Integer questionId, Integer optionId) {
    	return answerRepository.findByResponseIdAndQuestionIdAndOptionId(responseId, questionId, optionId);
    }
    
    public void saveAnswer(Answer a){
    	answerRepository.save(a);
   }

    public List<Answer> findByResponseId(Integer r){
    	return answerRepository.findByResponseId(r);
    }
    
    public List<Answer> getAnswerByOptionId(Integer OptionId) {
    	return answerRepository.findByOptionId(OptionId);
    }

}
