package com.magu1436.chronolist.timeblocking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.magu1436.chronolist.timeblocking.entity.TimeBlock;

/**
 * タイムブロッキングにおける {@link TimeBlock} の
 * データベース操作を行う MyBatis マッパー。
 *
 * @author magu1436
 * @see TimeBlock
 */
@Mapper
public interface TimeBlockMapper {

    /**
     * 指定した ID の {@link TimeBlock} を取得する。
     *
     * @param id 取得対象の TimeBlock の ID
     * @return 対応する {@link TimeBlock}。存在しない場合は {@code null} を返す。
     */
    TimeBlock getTimeBlockById(int id);

    /**
     * ステータスが {@code HOLD} の {@link TimeBlock} をすべて取得する。
     * <p>
     * {@code HOLD} はタイムテーブルに配置されていない保持状態のブロックであり、
     * 配置前の素材として表示される。
     * </p>
     *
     * @return {@code HOLD} 状態の {@link TimeBlock} の一覧。  
     *         該当がない場合でも空のリストを返す。
     */
    List<TimeBlock> getHeldTimeBlocks();

    /**
     * 新しい {@link TimeBlock} をデータベースに登録する。
     * <p>
     * 登録時に生成された ID は、引数の {@link TimeBlock} に設定される。
     * </p>
     *
     * @param timeBlock 登録する {@link TimeBlock}
     */
    void insertTimeBlock(TimeBlock timeBlock);

    /**
     * 既存の {@link TimeBlock} を更新する。
     * <p>
     * 更新対象は、引数で受け取った {@link TimeBlock} の ID によって特定される。
     * </p>
     *
     * @param timeBlock 更新内容を保持した {@link TimeBlock}
     */
    void updateTimeBlock(TimeBlock timeBlock);

    /**
     * 指定した ID の {@link TimeBlock} を削除する。
     *
     * @param id 削除する TimeBlock の ID
     */
    void deleteTimeBlock(int id);
}