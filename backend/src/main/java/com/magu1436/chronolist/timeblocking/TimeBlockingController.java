package com.magu1436.chronolist.timeblocking;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.magu1436.chronolist.timeblocking.entity.TimeBlock;
import com.magu1436.chronolist.timeblocking.entity.TimeTable;
import com.magu1436.chronolist.timeblocking.mapper.TemplateBlockMapper;
import com.magu1436.chronolist.timeblocking.mapper.TimeBlockMapper;
import com.magu1436.chronolist.timeblocking.mapper.TimeTableMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




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
    @GetMapping("timeTable/getByDate")
    public ResponseEntity<TimeTable> getByDate(@RequestParam LocalDate date){
        TimeTable taskGotByDate = timeTableMapper.getTimeTableByDate(date);

        if(taskGotByDate == null){return ResponseEntity.status(HttpStatus.NOT_FOUND).build();}

        return ResponseEntity.ok(taskGotByDate);
    }

    /** 
     * タイムテーブル作成
     * 新しいタイムテーブルを作成し,データベースに登録する
     * @param TimeTable
     * @return 成功時:Status.CREATEDと登録したタイムテーブルのID
     * @author milk0924 
     */
    @PostMapping("timeTable/createAt")
    public ResponseEntity<Integer> createAt(@RequestParam TimeTable timeTable){
        timeTableMapper.insertTimeTable(timeTable);
        Integer idFromCreatedTimeTable = timeTable.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(idFromCreatedTimeTable);
    }
    
    /**
     * ブロック登録
     * 新しくブロックをデータベースに保存し,登録する
     * @param TimeBlock
     * @return 成功時:Status.CREATEDと登録したタイムブロックのID
     * @author milk0924
     */
    @PostMapping("timeBlock/register")
    public ResponseEntity<Integer> register(@RequestBody TimeBlock timeBlock){
        timeBlockMapper.insertTimeBlock(timeBlock);
        Integer idFromCreatedTimeBlock = timeBlock.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(idFromCreatedTimeBlock);
    }

    /**
     * ブロック更新
     * データベースに保存されている,ブロックのデータを更新する
     * @param TimeBlock
     * @return 成功時:Status.OK
     * @return 対応するIDのデータが見つからなかった時:Status.NOT_FOUND
     * @author milk0924
     */
    @PutMapping("timeBlock/update")
    public ResponseEntity<Void> update(@RequestBody TimeBlock timeBlock){
        Integer idFromCurrentTimeBlock = timeBlock.getId();

        if(idFromCurrentTimeBlock == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        return ResponseEntity.ok().build();
    }
    /**
     * 返ってくるのがVoidのため，判別が難しそう？
     */

    /**
     * ブロックステータス更新
     * 受け取ったIDに対応するタイムブロックのステータスを更新する
     * @param TimeBlock
     * @return 成功時:Status.OK
     * @return 対応するIDが見つからなかった時:Status.NOT_Found
     * @author milk0924
     */
    @PutMapping("timeBlock/update/status")
    public ResponseEntity<Void> statusUpdate(@RequestBody TimeBlock timeBlock){
        Integer idFromCurrentTimeBlock = timeBlock.getId();

        if(idFromCurrentTimeBlock == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok().build();
    }

    /**
     * 上記と同じ問題を抱える
     */

    /**
     * ブロック開始時刻更新
     * ブロックの開始時刻のみを更新する．ブロックの移動のたびに呼ばれる．
     * @param TimeBlock
     * @return 成功時:Status.OK
     * @return 対応するIDが見つからなかった時:Status.NOT_FOUND
     * @author milk0924
     */


    /**
     * 上記と同じ問題を抱える
     */
    
}

