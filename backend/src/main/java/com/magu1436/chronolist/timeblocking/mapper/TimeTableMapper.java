package com.magu1436.chronolist.timeblocking.mapper;

import java.time.LocalDate;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.magu1436.chronolist.timeblocking.entity.TimeTable;

/**
 * タイムテーブル(TimeTable)に関するデータベース操作を行う MyBatis マッパー。
 *
 * @author magu1436
 * @see TimeTable
 */
@Mapper
public interface TimeTableMapper {

    /**
     * 指定したユーザーIDと日付に対応する {@link TimeTable} を取得する。
     * <p>
     * TimeTable は 1 日につき 1 つのみ存在する想定。
     * </p>
     *
     * @param userId 取得対象のユーザーID
     * @param date 取得対象の日付。
     * @return 指定日の {@link TimeTable}。存在しない場合は {@code null} を返す。
     */
    TimeTable getTimeTableByDate(@Param("userId") int userId, @Param("date") LocalDate date);

    /**
     * 新しい TimeTable をデータベースに登録する。
     * 
     * <p>
     * 登録時に発行された ID は、引数として渡した TimeTable オブジェクトに割り当てられる。
     * </p>
     * <p>
     * {@code timeTable} に {@code timeBlocks} が設定されていても、
     * <strong>それらは登録されずに無視されることに注意</strong>。
     * </p>
     *
     * @param timeTable 登録する TimeTable
     */
    void insertTimeTable(TimeTable timeTable);

    /**
     * 既存の {@link TimeTable} を更新する。
     * <p>
     * 更新対象は引数で受け取った TimeTable の {@code id} によって特定される。
     * </p>
     * <p>
     * {@code timeTable} に {@code timeBlocks} が設定されていても、
     * <strong>それらは登録されずに無視されることに注意</strong>。
     * </p>
     *
     * @param timeTable 更新内容を保持する {@link TimeTable}
     */
    void updateTimeTable(TimeTable timeTable);

    /**
     * 指定した ID の {@link TimeTable} を削除する。
     *
     * @param id 削除対象の TimeTable の ID
     */
    void deleteTimeTable(int id);
}
