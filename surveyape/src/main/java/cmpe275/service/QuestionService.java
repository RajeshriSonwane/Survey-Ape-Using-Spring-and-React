package cmpe275.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.entity.Question;
import cmpe275.repository.QuestionRepository;

import java.util.List;


@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public Question addQuestion(Question q) {
        return questionRepository.save(q);
    }
    
    public List<Question> getQuestionBySurveyId(Integer s) {
        return questionRepository.findBySurveyId(s);
    }


    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
}