package com.apiTotalk.createUser;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import java.util.Date;
import java.util.UUID;

@Entity
//@Table(name ="users")
public class User {
    @Id
    private Long id;
    @Column
    private String name;
    @Column
    private Boolean active;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private Date createAt;


    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;

    }



    @PrePersist
    void prePersist() {
        UUID uuid = UUID.randomUUID();
        long mostSignificantBits = uuid.getMostSignificantBits();
        long leastSignificantBits = uuid.getLeastSignificantBits();
        this.id = mostSignificantBits ^ leastSignificantBits;
        this.createAt = new Date();
        this.active =true;
    }
    public User() {}

    public Date getCreateAt() {
        return createAt;
    }

    public String getName() {
        return name;
    }

    public Boolean getActive() {
        return active;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
    public Long getId() {
        return id;
    }

}
