package com.magu1436.chronolist.login.entity;

import lombok.Data;

@Data
public class Users {
    private int id;
    private String username;
    private String password;
    private Role role;
}
