package com.magu1436.chronolist.timeblocking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.magu1436.chronolist.timeblocking.entity.TemplateBlock;

/**
 * テンプレートブロック（{@link TemplateBlock}）に関する
 * データベース操作を行う MyBatis マッパー。
 *
 * @author magu1436
 * @see TemplateBlock
 */
@Mapper
public interface TemplateBlockMapper {

    /**
     * すべての {@link TemplateBlock} を取得する。
     * <p>
     * テンプレートブロックが登録されていない場合でも、
     * 空のリストを返す。
     * </p>
     *
     * @return すべての {@link TemplateBlock} の一覧
     */
    List<TemplateBlock> getAllTemplateBlocks();

    /**
     * 指定した ID の {@link TemplateBlock} を取得する。
     *
     * @param id 取得対象の TemplateBlock の ID
     * @return 対応する {@link TemplateBlock}。存在しない場合は {@code null} を返す。
     */
    TemplateBlock getTemplateBlockById(int id);

    /**
     * 新しい {@link TemplateBlock} をデータベースに登録する。
     * <p>
     * 登録時に生成された ID は、渡された {@code templateBlock} に設定される。
     * </p>
     *
     * @param templateBlock 登録する {@link TemplateBlock}
     */
    void insertTemplateBlock(TemplateBlock templateBlock);

    /**
     * 既存の {@link TemplateBlock} を更新する。
     * <p>
     * 更新対象は引数の {@link TemplateBlock} が持つ ID によって特定される。
     * </p>
     *
     * @param templateBlock 更新内容を保持した {@link TemplateBlock}
     */
    void updateTemplateBlock(TemplateBlock templateBlock);

    /**
     * 指定した ID の {@link TemplateBlock} を削除する。
     *
     * @param id 削除対象の TemplateBlock の ID
     */
    void deleteTemplateBlock(int id);
}