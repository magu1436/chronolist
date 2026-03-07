package com.magu1436.chronolist;

import java.util.Collections;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginUserDatailsServiceImpl implements UserDetailsService{
    @Override
    public UserDetails loadUserByUsername(String username)
        throws UsernameNotFoundException{
            if (username.equals("tarou")){
                return new LoginUser("tarou",
                                     "pass",
                                     Collections.emptyList());
            } else {
                throw new UsernameNotFoundException(username + "→ 指定しているユーザー名は存在しません");
            }
        }
}
