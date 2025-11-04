package com.magu1436.chronolist.todolist.entity;

import java.time.LocalDate;

import jakarta.persistence.Enumerated;

public class Due {
    /** テストでStringをもちいる->Duekindクラス定義後変更 */
    @Enumerated
    private DueKind dueKind;
    /** dateの設定 */
    private LocalDate Date;
    /** timeの設定 */
    private LocalDate Time;
}
