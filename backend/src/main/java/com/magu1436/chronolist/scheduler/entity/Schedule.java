package com.magu1436.chronolist.scheduler.entity;

import java.time.LocalDateTime;
import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class Schedule {
    /** スケジュールID */
    private int id;
    /** スケジュールの種類 */
    private ScheduleKind kind;
    /** 開始時刻 */
    private LocalDateTime startAt;
    /** 終了時刻 */
    private LocalDateTime endAt;
    /** 開始日 */
    private LocalDate startDate;
    /** 終了日 */
    private LocalDate endDate;
    /** タイトル */
    private String title;
}