package cmpe275.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import cmpe275.entity.Response;

public interface ResponseRepository extends CrudRepository<Response, String>{

	Response findByResponseId(Integer id);
	List<Response> findBySurveyIdAndUserId(Integer surveyId, Integer userId);
	List<Response> findBySurveyId(Integer surveyId);
	List<Response> findByUserId(Integer userId);
	Response findBySurveyIdAndUserIdAndCompletedStatus(Integer surveyId, Integer userId, boolean completedStatus);
	Response findBySurveyIdAndUserIdAndCounter(Integer surveyId, Integer userId, Integer counter);
}
