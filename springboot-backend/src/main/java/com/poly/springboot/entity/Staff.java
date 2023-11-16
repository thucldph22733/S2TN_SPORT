package com.poly.springboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "staffs")
public class Staff extends BaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "staff_name")
    private String staffName;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "phone_number",unique = true,nullable = false) //unique= tre ko dc trung lap, nullable = false ko dc de trong
    private String phoneNumber;

    @Column(name = "email",unique = true,nullable = false)
    private String email;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "birth_of_day")
    private Date birthOfDay;

    @Column(name = "address")
    private String address;

    @Column(name = "_password")
    private String password;

    @Column(name = "staff_status")
    private Boolean status;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "staff")
    private List<Token> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return this.password;
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
