package org.example.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lastname;

    private String firstname;

    private String jobTitle;

    private int age;

    @Column(unique = true,nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private PasswordTempory passwordTemporary = PasswordTempory.ENABLE;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

//    @JsonManagedReference
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<WorkTime> workTimes;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.name()));
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

