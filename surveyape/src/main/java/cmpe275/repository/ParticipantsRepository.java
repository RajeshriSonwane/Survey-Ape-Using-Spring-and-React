package cmpe275.repository;

import org.springframework.data.repository.CrudRepository;

import cmpe275.entity.Participants;


public interface ParticipantsRepository extends CrudRepository<Participants, String> {

}
