package com.magu1436.chronolist.todolist.mapper;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.magu1436.chronolist.todolist.entity.ToDoTask;

@Mapper
public interface ToDoMapper {
    /** 指定のユーザーIDをもつToDoTaskを全件取得 */
    List<ToDoTask> getAllTasks(int userId);
    /** idを元にToDoTaskを取得 */
    ToDoTask getTaskById(int id);
    /** ユーザーIDとpriorityを元にToDoTaskを取得 */
    List<ToDoTask> getTasksByPriority(int userId, String priority);
    /** ユーザーIDと期日を元にToDoTaskを取得 */
    List<ToDoTask> getTasksByDueDate(int userId, LocalDate start_date, LocalDate end_date);
    /** 指定のユーザーIDをもち未完了のToDoTaskを取得 */
    List<ToDoTask> getTasksNotCompleted(int userId);
    /** タスクの新規登録 */
    int insertTask(ToDoTask todotask);
    /** 指定したタスクの更新 */
    void updateTask(ToDoTask todotask);
    /** idを元にタスクを削除 */
    void deleteTask(int id);
}
