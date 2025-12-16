package com.magu1436.chronolist.timeblocking;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.magu1436.chronolist.timeblocking.entity.TimeTable;
import com.magu1436.chronolist.timeblocking.mapper.TemplateBlockMapper;
import com.magu1436.chronolist.timeblocking.mapper.TimeBlockMapper;
import com.magu1436.chronolist.timeblocking.mapper.TimeTableMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;



@RequestMapping("api/timeblocking/")
@Controller
@RequiredArgsConstructor
public class TimeBlockingController {

    /**
     * 使うマッパー
     */
    private final TemplateBlockMapper templateBlockMapper;
    private final TimeBlockMapper timeBlockMapper;
    private final TimeTableMapper timeTableMapper;

    /**
     * タイムテーブル取得API
     * 指定の日付のタイムテーブルを取得して返す
     * @param LocalDate 
     * @return 成功時:Status.OKと該当のタイムテーブル
     * @return 見つからなかった場合:Status.NOTFOUND
     * @author milk0924
     */
    @GetMapping("timeBlocking/getByDate")
    public ResponseEntity<TimeTable> getbydate(@RequestParam LocalDate date){
        TimeTable taskGotByDate = timeTableMapper.getTimeTableByDate(date);
        if(taskGotByDate != null){
            return ResponseEntity.ok(taskGotByDate);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /** 
     * タイムテーブル作成
     * 新しいタイムテーブルを作成し、データベースに登録する。
     * @param TimeTable
     * @return 成功時:Status.CREATEDと登録したタイムテーブルのID
     * @author milk0924 
     */
    @PostMapping("timeBlocking/createAt")
    public ResponseEntity<Integer> createat(@RequestParam TimeTable timeTable){
        timeTableMapper.insertTimeTable(timeTable);
        Integer idFromCreatedTimeTable = timeTable.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(idFromCreatedTimeTable);
    }
    
    /**
     * ブロック登録
     * 新しくブロックをデータベースに保存し、登録する。
     * @param TimeBlock
     * @return 成功時:Status.CREATEDと登録したタイムブロックのID
     * @author milk0924
     */
    
}

