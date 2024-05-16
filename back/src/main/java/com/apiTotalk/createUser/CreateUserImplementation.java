package com.apiTotalk.createUser;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CreateUserImplementation implements CreateUserRepository {

    @Override
    public User findByEmail(String email) {
        return find("email", email).firstResult();

    }

    @Override
    public User save(User user) {
        persist(user);
        return user;
    }
}
