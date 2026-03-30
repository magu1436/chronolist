package com.magu1436.chronolist.login;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class LoginUser extends User{
private final Integer id;

    public LoginUser(Integer id,
        String loginId,
        String password,
        Collection<? extends GrantedAuthority> authorities){
            super(loginId, password, authorities);
            this.id = id;
    }

    public Integer getId(){
        return this.id;
    }
}
