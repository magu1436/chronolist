package com.magu1436.chronolist.timeblocking;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.magu1436.chronolist.scheduler.mapper.SchedulerMapper;
import com.magu1436.chronolist.timeblocking.entity.TemplateBlock;
import com.magu1436.chronolist.timeblocking.entity.TimeBlock;
import com.magu1436.chronolist.timeblocking.entity.TimeTable;
import com.magu1436.chronolist.timeblocking.mapper.TemplateBlockMapper;
import com.magu1436.chronolist.timeblocking.mapper.TimeBlockMapper;
import com.magu1436.chronolist.timeblocking.mapper.TimeTableMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;




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
    private final SchedulerMapper schedulerMapper;

    /**
     * タイムテーブル取得API
     * 指定の日付のタイムテーブルを取得して返す
     * @param LocalDate 
     * @return 成功時:Status.OKと該当のタイムテーブル
     * @return 見つからなかった場合:Status.NOT_FOUND
     * @author milk0924
     */
    @GetMapping("timeTable/getByDate")
    public ResponseEntity<TimeTable> getByDate(@RequestBody LocalDate date){
        TimeTable taskGotByDate = timeTableMapper.getTimeTableByDate(date);

        if(taskGotByDate == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

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
    public ResponseEntity<Integer> createAt(@RequestBody TimeTable timeTable){
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
     * @return 成功時:Status.NO_CONTENT
     * @return 対応するIDのデータが見つからなかった時:Status.NOT_FOUND
     * @author milk0924
     */
    @PutMapping("timeBlock/update")
    public ResponseEntity<Void> update(@RequestBody TimeBlock timeBlock){
        if(ExistsTimeBlockById(timeBlock.getId())){
            timeBlockMapper.updateTimeBlock(timeBlock);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }

    /**
     * ブロックステータス更新
     * 受け取ったIDに対応するタイムブロックのステータスを更新する
     * @param TimeBlock
     * @return 成功時:Status.NO_CONTENT
     * @return 対応するIDが見つからなかった時:Status.NOT_FOUND
     * @author milk0924
     */
    @PutMapping("timeBlock/update/status")
    public ResponseEntity<Void> statusUpdate(@RequestBody TimeBlock timeBlock){
        if(ExistsTimeBlockById(timeBlock.getId())){
            TimeBlock updatedTimeBlock = timeBlockMapper.getTimeBlockById(timeBlock.getId());
            timeBlockMapper.updateTimeBlock(updatedTimeBlock);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }
   
    /**
     * ブロック開始時刻更新
     * ブロックの開始時刻のみを更新する．ブロックの移動のたびに呼ばれる．
     * @param TimeBlock
     * @return 成功時:Status.NO_CONTENT
     * @return 対応するIDが見つからなかった時:Status.NOT_FOUND
     * @author milk0924
     */
    @PutMapping("timeBlock/update/startAt")
    public ResponseEntity<Void> startAtUpdate(@RequestBody TimeBlock timeBlock){
        if(ExistsTimeBlockById(timeBlock.getId())){
            TimeBlock updatedTimeBlock = timeBlockMapper.getTimeBlockById(timeBlock.getId());
            timeBlockMapper.updateTimeBlock(updatedTimeBlock);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    // あってる？

    /**
     * ブロック削除
     * 受け取ったIDのブロックをデータベースから削除する．
     * また，紐づけられたタスクデータもデータベースから削除する．
     * さらに，relatedScheduleを持っていた場合，該当のScheduleをデータベースから削除する．
     * @param TimeBlock
     * @return 成功時：Status.NO_CONTENT
     * @return 対応するIDが見つからなかった時：Status.NOT_FOUND
     * @author milk0924
     */
    @DeleteMapping("timeBlock/delete")
    public ResponseEntity<Void> delete(@RequestBody TimeBlock timeBlock){
        if(ExistsTimeBlockById(timeBlock.getId())){
            // relatedScheduleの削除
            Integer scheduleId = timeBlock.getRelatedSchedule().getId();
            schedulerMapper.deleteSchedule(scheduleId);
            // TimeBlockの削除
            timeBlockMapper.deleteTimeBlock(timeBlock.getId());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * 全テンプレートブロック取得
     * データベースに保存されたテンプレートブロックを取得し，返却する．
     * @param null
     * @return 成功時：すべてのテンプレートブロック
     * @return 成功時：Status.OK
     * @author milk0924
     */
    @GetMapping("templateBlock/getAll")
    public ResponseEntity<List<TemplateBlock>> getAllTemplateBlocks(){
        List<TemplateBlock> allTemplateBlock = templateBlockMapper.getAllTemplateBlocks();
        return ResponseEntity.ok(allTemplateBlock);
    }

    /**
     * テンプレートブロック登録
     * 受け取ったデータを持つ新しいテンプレートブロックをデータベースに保存する
     * @param TemplateBlock
     * @return 成功時：Status.Created
     * @return 成功時：割り当てられたID
     * @author milk0924
     */
    @PutMapping("templateBlock/register")
    public ResponseEntity<Integer> registerNewTemplateBlock(@RequestBody TemplateBlock templateBlock){
        templateBlockMapper.insertTemplateBlock(templateBlock);
        return ResponseEntity.status(HttpStatus.CREATED).body(templateBlock.getId());
    }

    /**
     * テンプレートブロック更新
     * 受けとったIDのテンプレートブロックの情報を受け取ったデータに変更してデータベースに反映する．
     * @param TemplateBlock
     * @return 成功時：Status.NO_CONTENT
     * @return 対応するIDが見つからなかった時：Status.NOT_FOUND
     * @author milk0924
     */
    @PutMapping("templateBlock/update")
    public ResponseEntity<Void> updateTemplateBlock(@RequestBody TemplateBlock templateBlock){
        if(ExistsTemplateBlock(templateBlock.getId())){
            templateBlockMapper.updateTemplateBlock(templateBlock);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * テンプレートブロック削除ID
     * テンプレートブロックデータベースから削除する
     * @param TemplateBlock
     * @return 成功時：Status.NO_CONTENT
     * @return 対応するIDが見つからなかった時：Status.NOT_FOUND
     * @author milk0924
     */
    @DeleteMapping("templateBlock/delete")
    public ResponseEntity<Void> deleteTemplateBlock(@RequestBody TemplateBlock templateBlock){
        if(ExistsTemplateBlock(templateBlock.getId())){
            templateBlockMapper.deleteTemplateBlock(templateBlock.getId());
            return  ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


    /**
     * TimeBlockの存在をIDによって確かめるメソッド
     * @param id
     * @return boolean
     */
    private boolean ExistsTimeBlockById(Integer id){
        TimeBlock timeBlockGotById = timeBlockMapper.getTimeBlockById(id);
        return timeBlockGotById != null;
    }

    /**
     * TemplateBlockの存在を確かめるメソッド
     * @param id
     * @return boolean
     */
    private boolean ExistsTemplateBlock(Integer id){
        TemplateBlock templateBlockGotById = templateBlockMapper.getTemplateBlockById(id);
        return templateBlockGotById != null;
    }

    /** 
     *  3.docコメント書き直し．慣例とか例とかいろいろ確認する
     **/
    
}

