package cmpe275.repository;

import org.springframework.data.repository.CrudRepository;
import cmpe275.entity.Response;

public interface ResponseRepository extends CrudRepository<Response, String>{

	Response findByResponseId(Integer id);
	Response findBySurveyIdAndUserId(Integer surveyId, Integer userId);
	
}
