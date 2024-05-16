package com.apiTotalk.createUser;
import io.quarkus.hibernate.orm.panache.PanacheRepository;


public interface CreateUserRepository extends PanacheRepository<User> {
    User findByEmail(String email);
    User save(User user) ;
}
