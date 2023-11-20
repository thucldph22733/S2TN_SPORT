//package com.poly.springboot.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.Builder;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.sql.Date;
//import java.util.Collection;
//import java.util.List;
//import java.util.Set;
//
//@Setter
//@Getter
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Builder
//@Table(name = "users")
//public class User extends BaseEntity  implements UserDetails{
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "user_name")
//    private String userName;
//
//    @Column(name = "phone_number",unique = true,nullable = false) //unique= tre ko dc trung lap, nullable = false ko dc de trong
//    private String phoneNumber;
//
//    @Column(name = "email",unique = true,nullable = false)
//    private String email;
//
//    @Column(name = "gender")
//    private Boolean gender;
//
//    @Column(name = "birth_of_day")
//    private Date birthOfDay;
//
//    @Column(name = "_password")
//    private String password;
//
//    @Enumerated(EnumType.STRING)
//    private Role role;
//
//    @OneToMany(mappedBy = "users")
//    private List<Token> tokens;
//
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "user_address",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "address_id")
//    )
//    private Set<Address> address;
//
//    @OneToOne(mappedBy = "users")
//    @JsonIgnore
//    private Cart cart;
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return role.getAuthorities();
//    }
//
//    @Override
//    public String getPassword() {
//        return this.password;
//    }
//
//    @Override
//    public String getUsername() {
//        return this.email;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
