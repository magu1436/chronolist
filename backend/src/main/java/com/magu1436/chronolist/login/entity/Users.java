package com.magu1436.chronolist.login.entity;

import lombok.Data;

@Data
public class Users {
    private int id;
    private String userId;
    private String password;
    private Role role;
}
