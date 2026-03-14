package com.magu1436.chronolist;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class LoginUser extends User{
    public LoginUser(String loginId,
        String password,
        Collection<? extends GrantedAuthority> authorities){
            super(loginId, password, authorities);
    }
}
