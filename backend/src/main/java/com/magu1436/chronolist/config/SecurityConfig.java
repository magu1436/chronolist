package com.magu1436.chronolist.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.magu1436.chronolist.CustomFailureHandler;
import com.magu1436.chronolist.CustomSuccessHandler;
import com.magu1436.chronolist.JsonLoginFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    
    private final AuthenticationConfiguration authenticationConfiguration;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder); // フィールドを使用
        return authProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception {
        http
            // CORSの設定
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // CSRFの無効化
            .csrf(csrf -> csrf.disable())
            // フィルターの追加
            .addFilterAt(jsonLoginFilter(), UsernamePasswordAuthenticationFilter.class)

            .authorizeHttpRequests(auth -> auth
                // 各ページへのアクセス許可設定
                .requestMatchers( "/login", "/public/**", "/error", "/").permitAll()
                .requestMatchers("/general/**", "/api/**").authenticated()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                // ログイン成功時のリダイレクト先を指定
                .defaultSuccessUrl("/")
                // ログイン失敗時のリダイレクト先を指定
                .failureUrl("/login?error")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // フロントエンドのURLを指定
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        
        // 許可するHTTPメソッド
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // 許可するヘッダー
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        
        // Cookieなどの認証情報の共有を許可
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public JsonLoginFilter jsonLoginFilter() throws Exception {
        JsonLoginFilter filter = new JsonLoginFilter();
        
        // フィルタに「誰が認証するか（Manager）」と「出口の案内係（Handler）」を教える
        filter.setAuthenticationManager(authenticationManager());
        filter.setAuthenticationSuccessHandler(new CustomSuccessHandler());
        filter.setAuthenticationFailureHandler(new CustomFailureHandler());
        
        // ログインを受け付けるURLを指定
        filter.setFilterProcessesUrl("/api/login");
        
        return filter;
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}