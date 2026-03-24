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
import com.magu1436.chronolist.timeblocking.mapper.TimeBlockTaskMapper;
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
    private final TimeBlockTaskMapper timeBlockTaskMapper;
    private final TimeBlockMapper timeBlockMapper;
    private final TimeTableMapper timeTableMapper;
    private final SchedulerMapper schedulerMapper;

    /**
     * 指定の日付のタイムテーブルを取得して返す.
     * <p>このメソッドは,Json形式のデータを受け取り,そのデータに紐づけられた{@code TimeTable}を返す.</p>
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * date: DateString
     * }</pre>
     * @param  date 参照する日付情報.
     * <ul>
     * <li>{@code date}:yyyy-mm-ddで渡される.
     * </ul>
     * @return 該当の{@code TimeTable}とHTTPStatusを返すレスポンス.
     * 正常終了時は{@code 200 OK}を返す.
     * @throws ResponseStatusException 指定された日付から取得したタイムテーブルが{@code Null}だったとき.({@code 404 Not Found})
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
     * 新しいタイムテーブルを作成し,DBに登録した際に割り当てられたIDを返却する.
     * <p>このメソッドは,Json形式のデータを受け取り,そのデータをDBに登録し,登録されたときにそのタイムテーブルに登録されたIDを返却する.</p>
     * <h3>リクエストJsonの形</h3>
     * <pre> {
     * date: DateString
     * }</pre>
     * @param timeTable 渡された日付を元に作成されたタイムテーブル
     * <ul>
     * <li> {@code timeTable} DB登録時に渡されたIDと日付をもつ.TimeBlockの情報に関しては無視される.詳細は{@link TimeTable}を参照.
     * </ul>
     * @return 登録の際に渡された{@code ID(int)}とHTTPStatusを返すレスポンス.
     * 正常終了時は{@code 201 Created}を返す.
     * @author milk0924 
     */
    @PostMapping("timeTable/createAt")
    public ResponseEntity<Integer> createAt(@RequestBody TimeTable timeTable){
        timeTableMapper.insertTimeTable(timeTable);
        Integer idFromCreatedTimeTable = timeTable.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(idFromCreatedTimeTable);
    }
    
    /**
     * 新しく{@code TimeBlock}をDBに保存し,保存時に割り当てられたIDを返却する.
     * <p>このメソッドは,Json形式のデータを受け取り,そのデータを{@code TimeTable}に登録する.返却されるIDは登録された{@code TimeTable}とは無関係.</p>
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * timeTableId: int,
	 * title: String,
	 * status: TimeBlockStatus,
	 * width: int,
	 * startAt: TimeString,
	 * tasks: List<{@link TimeBlockTask}>,
	 * color: String
     * }</pre>
     * @param timeBlock Jsonの内容が入れられた{@code TimeBlock}.{@code int id}は登録のときに自動で渡される.詳細は{@link TimeBlock}.
     * <ul>
     * <li> {@code TimeBlock}:{@code TimeTableId}はこのタイムブロックを保存するタイムテーブルのIDが渡される. </li>
     * </ul>
     * @return 登録の際に割り当てられた{@code ID(int id)}とHTTPStatusを返すレスポンス.
     * 正常終了時は{@code 201 Created}を返す.
     * @author milk0924
     */
    @PostMapping("timeBlock/register")
    public ResponseEntity<Integer> register(@RequestBody TimeBlock timeBlock){
        timeBlockMapper.insertTimeBlock(timeBlock);
        Integer idFromCreatedTimeBlock = timeBlock.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(idFromCreatedTimeBlock);
    }

    /**
     * データベースで保存されている{@code TimeBlock}のデータを更新する
     * <p>このメソッドはJsonの内容を受け取り,ブロックに関する全てのデータを受け取り更新する事ができる.</p>
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * id: int,
	 * timeTableId: int,
	 * status: TimeBlockStatus,
	 * width: int,
	 * startAt: TimeString,
	 * tasks: List<{@link TimeBlockTask}>,
	 * color: String
     * }</pre>
     * @param timeBlock Jsonの内容が入れられた{@code TimeBlock}.詳細は{@link TimeBlock}.
     * <ul>
     * <li> {@code TimeBlock}:{@code TimeTableId}はこのタイムブロックを保存するタイムテーブルのIDが渡される. </li>
     * <li> {@code TimeBlock}:(titeleとrelatedscheduleについて)参照:{@link TimeBlock}</li>
     * </ul>
     * @return 対応するHTTPStatusを返す.
     * 正常終了時は{@code 200 Ok}を返す.
     * @throws ResponseStatusException 指定するIDのデータが見つからないとき({@code 404 Not Found})
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
     * 対象のブロックステータスのみを更新してDBに反映する.
     * <p>このメソッドはJsonの内容を受け取り,指定するIDの{@code status:TimeBlockStatus}のみを渡されたJsonのデータに更新する.</p>
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * id: int,
	 * status: TimeBlockStatus
     * }</pre>
     * @param timmeBlock Jsonの値が保存されている{@code timeBlock}.
     * <ul>
     * <li> {@code timeBlock}:Jsonで渡される以外の情報は持っていない. 参照:{@link TimeBlock}</li>
     * </ul>
     * @return 対応するHTTPStatusを返す.
     * 正常終了時は{@code 200 Ok}を返す.
     * @throws ResponseStatusException 指定するIDのデータが見つからないとき({@code 404 Not Found})
     * @author milk0924
     */
    @PutMapping("timeBlock/update/status")
    public ResponseEntity<Void> statusUpdate(@RequestBody TimeBlock timeBlock){
        if(ExistsTimeBlockById(timeBlock.getId())){
            TimeBlock updatedTimeBlock = timeBlockMapper.getTimeBlockById(timeBlock.getId());
            updatedTimeBlock.setStatus(timeBlock.getStatus());
            timeBlockMapper.updateTimeBlock(updatedTimeBlock);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }
   
    /**
     * ブロックの開始時刻のみを更新してデータベースに反映する.
     * <p>このメソッドはJsonの内容を受け取り,指定するIDの{@code startAt: TimeString}のみを渡されたJsonのデータに更新する.</p>
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * id: int,
	 * startAt: TimeString
     * }</pre>
     * @param timeBlock Jsonの値が保存されている{@code timeBlock}.
     * <ul>
     * <li> {@code timeBlock}:Jsonで渡される以外の情報は持っていない. 参照:{@link TimeBlock}</li>
     * </ul>
     * @return 対応するHTTPStatusを返す.
     * 正常終了時は{@code 200 Ok}を返す.
     * @throws ResponseStatusException 指定するIDのデータが見つからないとき({@code 404 Not Found})
     * @author milk0924
     */
    @PutMapping("timeBlock/update/startAt")
    public ResponseEntity<Void> startAtUpdate(@RequestBody TimeBlock timeBlock){
        if(ExistsTimeBlockById(timeBlock.getId())){
            TimeBlock updatedTimeBlock = timeBlockMapper.getTimeBlockById(timeBlock.getId());
            updatedTimeBlock.setStartAt(timeBlock.getStartAt());
            timeBlockMapper.updateTimeBlock(updatedTimeBlock);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


    /**
     * {@code TimeBlock}をDBから削除する.
     * <p>このメソッドはJsonの内容を受け取り,指定するIDの{@code TimeBlock}を削除する.また,そのブロックに紐づけられたタスクデータ,{@code relatedschedule}がある場合はそれらも削除される.</p>
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * id: int
     * }</pre>
     * @param timeBlock Jsonの値が保存されている{@code timeBlock}.
     * @return 対応するHTTPStatusを返す.
     * 正常終了時は{@code 204 No Content}を返す.
     * @throws ResponseStatusException 指定するIDのデータが見つからないとき({@code 404 Not Found})
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
     * DBに登録されているテンプレートブロックをすべて返却する
     * <p>このメソッドは,DBに保存されているテンプレートブロックを取得し返却する.テンプレートブロックが存在しない場合でも,空のリストを返却する.</p>
     * @return すべてのテンプレートブロックとHTTPStatusを返すレスポンス.
     * 正常終了時は{@code 200 Ok}を返す.
     * @author milk0924
     */
    @GetMapping("templateBlock/getAll")
    public ResponseEntity<List<TemplateBlock>> getAllTemplateBlocks(){
        List<TemplateBlock> allTemplateBlock = templateBlockMapper.getAllTemplateBlocks();
        return ResponseEntity.ok(allTemplateBlock);
    }

    /**
     * 受け取ったデータを持つ新しいテンプレートブロックをDBに保存する.
     * <p>このメソッドはJsonの内容を受け取り,その内容を保存した新しいテンプレートブロックをDBに保存する.</p>
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * title: String,
	 * width: int,
	 * color: String
     * }</pre>
     * @param templateBlock Jsonの内容が保存された{@code templateBlock}.詳細は{@link TemplateBlock}.
     * <ul>
     * <li> {@code TempleBlock}:Jsonに保存されている情報以外は持たない.IDはDBに保存されたときに自動的に割り当てられる.</li>
     * </ul>
     * @return DB登録時に割り当てられたIDとHTTPStatusを返すレスポンス.
     * 正常終了時は{@code 201 Created}を返す.
     * @author milk0924
     */
    @PutMapping("templateBlock/register")
    public ResponseEntity<Integer> registerNewTemplateBlock(@RequestBody TemplateBlock templateBlock){
        templateBlockMapper.insertTemplateBlock(templateBlock);
        return ResponseEntity.status(HttpStatus.CREATED).body(templateBlock.getId());
    }

    /**
     * テンプレートブロックの情報を更新し,そのデータをDBに反映する.
     * <p>このメソッドはJsonの内容を受け取り,その内容を指定のIDに対応するテンプレートブロックに反映する.</p>
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * id: int,
	 * title: String,
	 * width: int,
	 * color: String
     * }</pre>
     * @param templateBlock Jsonの内容が保存された{@code TemplateBlock}.詳細は{@link TemplateBlock}.
     * @return 対応するHTTPStatusを返すレスポンス.
     * 正常終了時は{@code 204 No Content}を返します
     * @throws ResponseStatusException 指定するIDのテンプレートブロックが見つからなかったとき{@code 404 Not Found}
     * @author milk0924
     */
    @PutMapping("templateBlock/update")
    public ResponseEntity<Void> updateTemplateBlock(@RequestBody TemplateBlock templateBlock){
        if(ExistsTemplateBlockById(templateBlock.getId())){
            templateBlockMapper.updateTemplateBlock(templateBlock);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * テンプレートブロックをDBから削除する
     * <h3>リクエストJsonの形:</h3>
     * <pre> {
     * id: int
     * }</pre>
     * @param templateBlock Jsonの内容が保存された{@code TemplateBlock}.詳細は{@link TemplateBlock}.>
     * @return 対応するHTTPStatusを返すレスポンス.
     * 正常終了時は{@code 204 No Content}を返します
     * @throws ResponseStatusException 指定するIDのテンプレートブロックが見つからなかったとき{@code 404 Not Found}
     * @author milk0924
     */
    @DeleteMapping("templateBlock/delete")
    public ResponseEntity<Void> deleteTemplateBlock(@RequestBody TemplateBlock templateBlock){
        if(ExistsTemplateBlockById(templateBlock.getId())){
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
    private boolean ExistsTemplateBlockById(Integer id){
        TemplateBlock templateBlockGotById = templateBlockMapper.getTemplateBlockById(id);
        return templateBlockGotById != null;
    }
}

