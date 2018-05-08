package cmpe275.service;

import cmpe275.entity.User;
import cmpe275.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User getUserById(Integer id) {
        return userRepository.findByUserId(id);
    }

    public List<User> login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
