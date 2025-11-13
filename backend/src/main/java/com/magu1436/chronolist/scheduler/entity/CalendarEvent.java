package com.magu1436.chronolist.scheduler.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CalendarEvent {
    /** カレンダーイベントID */
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
    /** 色 */
    private String color;
    /** メモ */
    private String memo;
}
