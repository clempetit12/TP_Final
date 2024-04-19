package org.example.api.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Employee {
    @Id
    private Long id;

    private String jobTitle;

    private int age;

    private String email;

    private String password;

    private String imageUrl;

    private Role role;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkTime> workTimes;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
