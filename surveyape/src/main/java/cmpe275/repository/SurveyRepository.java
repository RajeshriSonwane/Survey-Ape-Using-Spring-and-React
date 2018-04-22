package cmpe275.repository;

import org.springframework.data.repository.CrudRepository;

import cmpe275.entity.Survey;


public interface SurveyRepository extends CrudRepository<Survey, String>{

}
