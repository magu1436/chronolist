package com.magu1436.chronolist.todolist.entity;

import jakarta.persistence.Embedded;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToDoTask {
    /** idの設定 */
    private Integer id;
    /** タイトルの設定 */
    private String title;
    /** 期日の設定 */
    @Embedded
    private Due due;
    /** 優先度の設定 
     * StringはPriorityクラスの定義後置き換え
    */
    @Enumerated
    private Priority priority;
    /** メモの設定 */
    private String memo;
    /** 完了済みかどうかの設定 */
    private boolean isCompleted;
    
}
