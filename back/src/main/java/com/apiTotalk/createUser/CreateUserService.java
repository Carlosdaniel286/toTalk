package com.apiTotalk.createUser;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CreateUserService {
    @Inject
    CreateUserImplementation implementation;

    User createUser (CreateUserDto createUserDto){
       CreateUser newUser = new CreateUser(implementation);
       newUser.execute(createUserDto);
       return newUser.getUser();
    }




}
