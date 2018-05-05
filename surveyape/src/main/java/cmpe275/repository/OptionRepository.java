package cmpe275.repository;

import org.springframework.data.repository.CrudRepository;
import cmpe275.entity.Options;

public interface OptionRepository extends CrudRepository<Options, String>{

}