package cmpe275.repository;
import cmpe275.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long>{
    List<User> findByEmailAndPassword(String email, String password);
}
