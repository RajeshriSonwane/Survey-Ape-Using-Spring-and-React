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
}
