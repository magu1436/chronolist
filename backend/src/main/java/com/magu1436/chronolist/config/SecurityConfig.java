package com.magu1436.chronolist.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity

public class SecurityConfig{
    @Bean
    public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception{
        http
            // 認可
            .authorizeHttpRequests(auth -> auth
                // 誰でもアクセス可能
                .requestMatchers("/", "/public/**").permitAll()
                // ログインしていればアクセス可能
                .requestMatchers("/general/**").authenticated()
                // ADMIN専用
                .requestMatchers("/admin/**").hasRole("ADMIN")
                // その他当てはまらないものはすべて認可が必要
                .anyRequest().authenticated()
            )

            /* フロントで動かすとき用の設定
            // 別ポートのアクセス設定を使う
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // CSRFの無効化
            .csrf(csrf -> csrf.disable())
            */
                


            // 認証
            .formLogin(form -> form
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")
                .permitAll()
            );
        return http.build();
    }
}
