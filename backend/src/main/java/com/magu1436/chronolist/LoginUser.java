package com.magu1436.chronolist;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class LoginUser extends User{
    public LoginUser(String username,
        String password,
        Collection<? extends GrantedAuthority> authorities){
            super(username, password, authorities);
    }
}
