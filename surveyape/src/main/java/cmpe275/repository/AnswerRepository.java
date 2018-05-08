package cmpe275.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import cmpe275.entity.Answer;

public interface AnswerRepository extends CrudRepository<Answer, String>{
	
	Answer findByAnswerId(Integer answerId);
	List<Answer> findByQuestionIdAndResponseId(Integer questionId, Integer responseId);
	Answer findByResponseIdAndOptionId(Integer responseId, Integer optionId);
	Answer findByResponseIdAndQuestionIdAndOptionId(Integer responseId, Integer questionId, Integer optionId);

}