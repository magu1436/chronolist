package com.magu1436.chronolist.login.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.magu1436.chronolist.login.entity.Users;

@Mapper
public interface LoginMapper {
    Users getUsersByLoginId(String loginId);
}
