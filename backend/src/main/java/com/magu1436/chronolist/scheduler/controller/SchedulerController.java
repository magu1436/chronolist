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
    public int insertEvent(@RequestBody CalendarEvent calendar_event) {
        // 受け取ったCalendarEventを元にScheduleを生成
        Schedule schedule = Schedule.builder()
                                    .kind(calendar_event.getKind())
                                    .startAt(calendar_event.getStartAt())
                                    .endAt(calendar_event.getEndAt())
                                    .startDate(calendar_event.getStartDate())
                                    .endDate(calendar_event.getEndDate())
                                    .title(calendar_event.getTitle())
                                    .build();
        // 生成したScheduleをscheduleテーブルに登録
        mapper.insertSchedule(schedule);
        // 自動生成されたscheduleのidを取得
        int schedule_id = schedule.getId();

        // CalendarEventをcalendar_eventテーブルに登録
        mapper.insertCalendarEvent(schedule_id, calendar_event.getColor(), calendar_event.getMemo());
        // 自動生成されたcalendar_eventのidを取得
        int calendar_event_id = calendar_event.getId();
        // 取得したcalendar_eventのidを返す
        return calendar_event_id;
    }

    /** スケジュール及びカレンダーイベントを更新するAPI */
    
    

    
}
