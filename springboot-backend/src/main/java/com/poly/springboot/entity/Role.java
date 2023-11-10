package com.poly.springboot.entity;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.poly.springboot.entity.Permission.ADMIN_CREATE;
import static com.poly.springboot.entity.Permission.ADMIN_DELETE;
import static com.poly.springboot.entity.Permission.ADMIN_READ;
import static com.poly.springboot.entity.Permission.ADMIN_UPDATE;
import static com.poly.springboot.entity.Permission.STAFF_READ;
import static com.poly.springboot.entity.Permission.STAFF_DELETE;
import static com.poly.springboot.entity.Permission.STAFF_CREATE;
import static com.poly.springboot.entity.Permission.STAFF_UPDATE;

@RequiredArgsConstructor
public enum Role {

    USER(Collections.emptySet()),
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    STAFF_READ,
                    STAFF_UPDATE,
                    STAFF_DELETE,
                    STAFF_CREATE
            )
    ),
    STAFF(
            Set.of(
                    STAFF_READ,
                    STAFF_UPDATE,
                    STAFF_DELETE,
                    STAFF_CREATE
            )
    )

    ;

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
