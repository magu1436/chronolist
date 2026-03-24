package com.magu1436.chronolist.timeblocking.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.magu1436.chronolist.timeblocking.entity.TimeBlockTask;

/**
 * タイムブロッキングにおける {@link TimeBlockTask} の
 * データベース操作を行う MyBatis マッパー。
 *
 * @author konoma1103
 * @see TimeBlockTask
 */
@Mapper
public interface TimeBlockTaskMapper {

    /**
     * 新しい{@link TimeBlockTask}をデータベースに登録する。
     * <p>
     * 登録時に生成された ID は、引数の {@link TimeBlockTask} に設定される。
     * </p>
     * 
     * @param timeBlockTask 登録する{@link TimeBlockTask}
     */
    void insertTimeBlockTask(TimeBlockTask timeBlockTask);

    /**
     * 引数で指定した{@code id}をもつ{@link TimeBlockTask}をデータベースから削除する
     * 
     * @param id 削除する{@link TimeBlockTask}のID
     */
    void deleteTimeBlockTask(int id); 
}
