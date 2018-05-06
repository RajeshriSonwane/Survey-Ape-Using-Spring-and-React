package cmpe275.repository;

import org.springframework.data.repository.CrudRepository;

import cmpe275.entity.Question;

import java.util.List;

public interface QuestionRepository extends CrudRepository<Question, String>{
    List<Question> findAll();
}
