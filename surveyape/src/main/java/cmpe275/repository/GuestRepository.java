package cmpe275.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import cmpe275.entity.Guest;

public interface GuestRepository extends CrudRepository<Guest, String>{
	List<Guest> findBySurveyId(Integer s);
}
