package com.magu1436.chronolist;

import java.util.Collections;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginUserDatailsServiceImpl implements UserDetailsService{

    private final AuthenticationMapper AuthenticationMapper;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException{

        Authentication authentication = authenticationMapper.selectByUsername(username);

        if (authentication != null){
            return new LoginUser(authentication.getUsername(),
                                    authentication.getPassword(),
                                    Collections.emptyList());
        } else {
            throw new UsernameNotFoundException(username + "→ 指定しているユーザー名は存在しません");
        }
    }
}
