package cmpe275.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import cmpe275.entity.Participants;
import cmpe275.entity.Survey;


public interface ParticipantsRepository extends CrudRepository<Participants, String> {
	List<Participants> findAll();
	List<Participants> findBySurveyId(Integer s);
	Participants findByparticipantsId(Integer user);
	Participants findByParticipantsIdAndSurveyId(Integer participantsId, Integer surveyId);
}
