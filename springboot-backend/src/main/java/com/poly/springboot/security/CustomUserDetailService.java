package com.poly.springboot.security;

import com.poly.springboot.entity.Staff;
import com.poly.springboot.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailService implements UserDetailsService {

    private final StaffRepository staffRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return this.mapUserToUserDetail(email);
    }

    //    Phuong thuc chuyen doi thong tin staff sang customUserDetail
    private  CustomUserDetails mapUserToUserDetail(String email) {
        //Tim ra staff theo email
        Optional<Staff> staff = staffRepository.findByEmail(email);
        //  Neu ko thay tra ve loi
        if (staff.isEmpty()) {
            throw new UsernameNotFoundException("Không tìm thấy nhân viên này");
        }
        //  Neu thay tra ve doi tuong customUserDetail
        return new CustomUserDetails(
                staff.get().getEmail(),
                staff.get().getPassword(),
               //  Lay ca quyen tu doi tuong staff
                staff.get().getListRole()
                        .stream().map(role -> new SimpleGrantedAuthority(role.getRoleName().name()))
                        .collect(Collectors.toList()));
    }
}
