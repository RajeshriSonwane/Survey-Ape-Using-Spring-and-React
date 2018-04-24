package cmpe275.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import cmpe275.entity.Survey;


public interface SurveyRepository extends CrudRepository<Survey, Integer>{
	Survey findBySurveyId(Integer id);
	List<Survey> findAll();
}
