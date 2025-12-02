package com.magu1436.chronolist.scheduler.controller;

import java.util.List;
import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    @GetMapping("getEvents/{startDate}/{endDate}")
    public ResponseEntity<List<CalendarEvent>> getEvent(@PathVariable LocalDate startDate, @PathVariable LocalDate endDate){
        List<CalendarEvent> calendarEvent = mapper.getCalendarEventsFromTo(startDate, endDate);
        return new ResponseEntity<>(calendarEvent, HttpStatus.OK);
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
        // 受け取ったcalendarEventがDBに存在するか確認(存在しなかった場合は400レスポンスを返す)
        if(!existsById(calendarEvent.getId())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

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

    /** 特定の予定及びカレンダーイベントを削除するAPI */
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable int calendarEventId){
        // 受け取ったcalendarEventがDBに存在するか確認(存在しなかった場合は400レスポンスを返す)
        if(!existsById(calendarEventId)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        

    }


    /** 指定したidのcalendarEventがDBに存在するか確認するメソッド */
    private boolean existsById(int id){
        CalendarEvent calendarEvent = mapper.getCalendarEventById(id);
        if(calendarEvent != null){
            return true;
        }
        return false;
    }
    

    
}
