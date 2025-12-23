package com.magu1436.chronolist.scheduler.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;

import com.magu1436.chronolist.scheduler.entity.CalendarEvent;
import com.magu1436.chronolist.scheduler.entity.Schedule;
import com.magu1436.chronolist.scheduler.entity.ScheduleKind;

@MybatisTest
class SchedulerMapperTest {

    @Autowired
    private SchedulerMapper mapper;

    @Test
    void getSchedulesFromTo_returnsTimedAndAllDayEventsWithinRange() {
        LocalDate startDate = LocalDate.of(2025, 10, 30);
        LocalDate endDate = LocalDate.of(2025, 11, 2);

        List<Schedule> schedules = mapper.getSchedulesFromTo(startDate, endDate);

        assertThat(schedules)
                .extracting(Schedule::getTitle)
                .containsExactlyInAnyOrder("会議", "バイト");
    }

    @Nested
    class ScheduleCrudTests {

        @Test
        void getSchedulesByDate_supportsTimedAndAllDayEvents() {
            List<Schedule> timedSchedules = mapper.getSchedulesByDate(LocalDate.of(2025, 10, 31));
            List<Schedule> allDaySchedules = mapper.getSchedulesByDate(LocalDate.of(2025, 11, 2));

            assertThat(timedSchedules)
                    .singleElement()
                    .extracting(Schedule::getTitle, s -> s.getKind())
                    .containsExactly("会議", ScheduleKind.DATED);

            assertThat(allDaySchedules)
                    .singleElement()
                    .extracting(Schedule::getTitle, s -> s.getKind())
                    .containsExactly("バイト", ScheduleKind.ALL_DAY);
        }

        @Test
        void insertUpdateAndDeleteSchedule_savesChangesInDatabase() {
            Schedule schedule = Schedule.builder()
                    .kind(ScheduleKind.DATED)
                    .startAt(LocalDateTime.of(2025, 12, 24, 9, 0))
                    .endAt(LocalDateTime.of(2025, 12, 24, 10, 0))
                    .title("面談")
                    .build();

            int rowsInserted = mapper.insertSchedule(schedule);
            Schedule inserted = mapper.getScheduleById(schedule.getId());

            assertThat(rowsInserted).isOne();
            assertThat(inserted)
                    .extracting(Schedule::getTitle, s -> s.getKind())
                    .containsExactly("面談", ScheduleKind.DATED);

            inserted.setTitle("オンライン面談");
            mapper.updateSchedule(inserted);
            Schedule updated = mapper.getScheduleById(inserted.getId());
            assertThat(updated.getTitle()).isEqualTo("オンライン面談");

            mapper.deleteSchedule(inserted.getId());
            assertThat(mapper.getScheduleById(inserted.getId())).isNull();
        }
    }

    @Nested
    class CalendarEventCrudTests {

        @Test
        void calendarEventQueriesJoinScheduleInformation() {
            List<CalendarEvent> events = mapper.getCalendarEventsFromTo(LocalDate.of(2025, 10, 31), LocalDate.of(2025, 11, 2));

            assertThat(events)
                    .extracting(CalendarEvent::getTitle)
                    .containsExactlyInAnyOrder("会議", "バイト");
        }

        @Test
        void insertUpdateAndDeleteCalendarEvent_handlesRelatedSchedule() {
            Schedule schedule = Schedule.builder()
                    .kind(ScheduleKind.ALL_DAY)
                    .startDate(LocalDate.of(2026, 1, 1))
                    .endDate(LocalDate.of(2026, 1, 2))
                    .title("年始休暇")
                    .build();
            mapper.insertSchedule(schedule);

            CalendarEvent calendarEvent = new CalendarEvent();
            calendarEvent.setScheduleId(schedule.getId());
            calendarEvent.setKind(schedule.getKind());
            calendarEvent.setStartDate(schedule.getStartDate());
            calendarEvent.setEndDate(schedule.getEndDate());
            calendarEvent.setTitle(schedule.getTitle());
            calendarEvent.setColor("GREEN");
            calendarEvent.setMemo("社内カレンダーに表示");

            int rowsInserted = mapper.insertCalendarEvent(calendarEvent);
            CalendarEvent inserted = mapper.getCalendarEventById(calendarEvent.getId());

            assertThat(rowsInserted).isOne();
            assertThat(inserted)
                    .extracting(CalendarEvent::getTitle, CalendarEvent::getColor)
                    .containsExactly("年始休暇", "GREEN");

            inserted.setColor("YELLOW");
            inserted.setMemo("予定変更の可能性あり");
            mapper.updateCalendarEvent(inserted);

            CalendarEvent updated = mapper.getCalendarEventById(inserted.getId());
            assertThat(updated.getColor()).isEqualTo("YELLOW");
            assertThat(updated.getMemo()).contains("変更");

            mapper.deleteCalendarEvent(updated.getId());
            mapper.deleteSchedule(schedule.getId());
            assertThat(mapper.getCalendarEventById(updated.getId())).isNull();
        }
    }
}
