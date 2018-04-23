package cmpe275.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Question;
import cmpe275.repository.QuestionRepository;


@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;
    
    public void addQuestion(Question q){
    	questionRepository.save(q);
    }
}