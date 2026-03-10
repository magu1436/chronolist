package com.magu1436.chronolist;

import java.util.Collections;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.magu1436.chronolist.login.entity.Users;
import com.magu1436.chronolist.login.mapper.LoginMapper;

@Service
@RequiredArgsConstructor
public class LoginUserDatailsServiceImpl implements UserDetailsService{

    private final LoginMapper loginMapper;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException{

        Users authentication = loginMapper.getUsersByUserId(username);

        if (authentication != null){
            return new LoginUser(authentication.getUserId(),
                                    authentication.getPassword(),
                                    Collections.emptyList());
        } else {
            throw new UsernameNotFoundException(username + "→ 指定しているユーザー名は存在しません");
        }
    }
}
