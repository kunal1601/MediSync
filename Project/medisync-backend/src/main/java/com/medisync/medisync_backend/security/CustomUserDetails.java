package com.medisync.medisync_backend.security;

import com.medisync.medisync_backend.entity.Admin;
import com.medisync.medisync_backend.entity.Pharmacist;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class CustomUserDetails implements UserDetails {

    private final Long id;
    private final String username; // The login identifier (Username or Email)
    private final String password;
    private final String role; // "ROLE_ADMIN" or "ROLE_PHARMACIST"
    private final Collection<? extends GrantedAuthority> authorities;

    // 🌟 Constructor for Admin accepting the identifier used during login
    public CustomUserDetails(Admin admin, String loginIdentifier) {
        this.id = admin.getId();
        this.username = (loginIdentifier != null) ? loginIdentifier : admin.getUsername();
        this.password = admin.getPassword();
        this.role = "ROLE_ADMIN";
        this.authorities = List.of(new SimpleGrantedAuthority(this.role));
    }

    // Default constructor fallback for Admin
    public CustomUserDetails(Admin admin) {
        this(admin, admin.getUsername());
    }

    // 🌟 Constructor for Pharmacist accepting the identifier used during login
    public CustomUserDetails(Pharmacist pharmacist, String loginIdentifier) {
        this.id = pharmacist.getId();
        this.username = (loginIdentifier != null) ? loginIdentifier : pharmacist.getUsername();
        this.password = pharmacist.getPassword();
        this.role = "ROLE_PHARMACIST";
        this.authorities = List.of(new SimpleGrantedAuthority(this.role));
    }

    // Default constructor fallback for Pharmacist
    public CustomUserDetails(Pharmacist pharmacist) {
        this(pharmacist, pharmacist.getUsername());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}