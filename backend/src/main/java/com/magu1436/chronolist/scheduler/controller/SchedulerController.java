package com.magu1436.chronolist.scheduler.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.magu1436.chronolist.scheduler.entity.CalendarEvent;
import com.magu1436.chronolist.scheduler.mapper.SchedulerMapper;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SchedulerController {

    private final SchedulerMapper mapper;

    /** 指定期間のカレンダーイベントをDBから取得するAPI */
    @GetMapping("/getEvent")
    public ResponseEntity<List<CalendarEvent>> getEvent(@RequestBody DateRange daterange){
        List<CalendarEvent> calendar_events = mapper.getCalendarEventsFromTo(daterange.getStart_date(), daterange.getEnd_date());
        return new ResponseEntity<>(calendar_events, HttpStatus.OK);
    }

    
}
