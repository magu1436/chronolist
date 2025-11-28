package com.magu1436.chronolist.scheduler.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.magu1436.chronolist.scheduler.entity.CalendarEvent;
import com.magu1436.chronolist.scheduler.entity.Schedule;
import com.magu1436.chronolist.scheduler.mapper.SchedulerMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/scheduler/")
@Controller
@RequiredArgsConstructor
public class SchedulerController {

    private final SchedulerMapper mapper;

    /** 指定期間のカレンダーイベントをDBから取得するAPI */
    @GetMapping("getEvents")
    public ResponseEntity<List<CalendarEvent>> getEvent(@RequestBody DateRange daterange){
        List<CalendarEvent> calendar_events = mapper.getCalendarEventsFromTo(daterange.getStart_date(), daterange.getEnd_date());
        return new ResponseEntity<>(calendar_events, HttpStatus.OK);
    }

    /** 新しい予定及びカレンダーイベントを登録するAPI */
    @PostMapping("register")
    public ResponseEntity<Integer> insertEvent(@RequestBody CalendarEvent calendarEvent) {
        // 受け取ったCalendarEventを元にScheduleを生成
        Schedule schedule = Schedule.builder()
                                    .kind(calendarEvent.getKind())
                                    .startAt(calendarEvent.getStartAt())
                                    .endAt(calendarEvent.getEndAt())
                                    .startDate(calendarEvent.getStartDate())
                                    .endDate(calendarEvent.getEndDate())
                                    .title(calendarEvent.getTitle())
                                    .build();
        // 生成したScheduleをscheduleテーブルに登録
        mapper.insertSchedule(schedule);
        // 自動生成されたscheduleのidを取得
        int scheduleId = schedule.getId();

        // CalendarEventをcalendar_eventテーブルに登録
        mapper.insertCalendarEvent(scheduleId, calendarEvent.getColor(), calendarEvent.getMemo());
        // 自動生成されたcalendar_eventのidを取得
        int calendarEventId = calendarEvent.getId();
        // 取得したcalendar_eventのidを返す
        return ResponseEntity.status(HttpStatus.CREATED).body(calendarEventId);
    }

    /** スケジュール及びカレンダーイベントを更新するAPI */
    @PutMapping("update")
    public ResponseEntity<Void> updateEvent(@RequestBody CalendarEvent calendarEvent) {
        // 受け取ったCalendarEventを元にScheduleを生成
        Schedule schedule = Schedule.builder()
                                    .kind(calendarEvent.getKind())
                                    .startAt(calendarEvent.getStartAt())
                                    .endAt(calendarEvent.getEndAt())
                                    .startDate(calendarEvent.getStartDate())
                                    .endDate(calendarEvent.getEndDate())
                                    .title(calendarEvent.getTitle())
                                    .build();
        // 生成したScheduleのidを元にscheduleテーブルの更新
        mapper.updateSchedule(schedule);
        // scheduleのidを取得
        int scheduleId = schedule.getId();

        // CalendarEventをcalendar_eventテーブルに登録
        mapper.updateCalendarEvent(calendarEvent.getId(), scheduleId, calendarEvent.getColor(), calendarEvent.getMemo());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    

    
}
