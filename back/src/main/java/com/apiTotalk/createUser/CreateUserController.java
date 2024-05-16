package com.apiTotalk.createUser;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;

@Path("/users")
public class CreateUserController {

    @Inject
    CreateUserService userService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public User createUser(CreateUserDto createUserDto) {
        return userService.createUser(createUserDto);
    }
}
