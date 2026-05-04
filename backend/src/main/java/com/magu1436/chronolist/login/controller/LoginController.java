package com.magu1436.chronolist.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/")
    public String index() {
        return "index"; // templates/index.html
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // templates/login.html
    }

    // アクセスURL: http://localhost:8080/public/public
    @GetMapping("/public/public")
    public String publicPage() {
        return "public/public"; // templates/public/public.html
    }

    // アクセスURL: http://localhost:8080/general/user
    @GetMapping("/general/user")
    public String userPage() {
        return "general/user"; // templates/general/user.html
    }

    // アクセスURL: http://localhost:8080/admin/admin
    @GetMapping("/admin/admin")
    public String adminPage() {
        return "admin/admin"; // templates/admin/admin.html
    }
}