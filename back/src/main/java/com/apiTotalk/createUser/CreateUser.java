package com.apiTotalk.createUser;


public class CreateUser {
    private final CreateUserRepository createUser;
    private User user;
    public CreateUser(CreateUserRepository createUser) {
        this.createUser = createUser;
    }

    public User getUser() {
        return user;
    }

    public void execute(CreateUserDto data) {
        User userAlreadyExist = createUser.findByEmail(data.getEmail());
        if (userAlreadyExist ==null) {
           User user = new User(data.getName(),data.getEmail(), data.getPassword());
           this.user= createUser.save(user);
        }
    }
}
