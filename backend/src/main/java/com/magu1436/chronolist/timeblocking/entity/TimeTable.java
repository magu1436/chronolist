package com.magu1436.chronolist.timeblocking.entity;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TimeTableエンティティの情報を保持するクラス
 * @author magu1436
 */
@Data
@NoArgsConstructor
public class TimeTable {
    private int id;
    private LocalDate date;
    private List<TimeBlock> timeBlocks;
}
