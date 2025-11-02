package com.magu1436.chronolist.todolist.mapper;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.magu1436.chronolist.todolist.entity.ToDoTask;

@Mapper
public interface ToDoMapper {
    /** ToDoTaskを全件取得 */
    List<ToDoTask> getAllTasks();
    /** idを元にToDoTaskを取得 */
    ToDoTask getTaskById(int id);
    /** priorityを元にToDoTaskを取得 */
    List<ToDoTask> getTasksByPriority(String priority);
    /** 期日を元にToDoTaskを取得 */
    List<ToDoTask> getTasksByDueDate(LocalDate start_date, LocalDate end_date);
    /** 未完了のToDoTaskを取得 */
    List<ToDoTask> getTasksNotCompleted();
    /** タスクの新規登録 */
    int insertTask(ToDoTask todotask);
    /** 指定したタスクの更新 */
    void updateTask(ToDoTask todotask);
    /** idを元にタスクを削除 */
    void deleteTask(int id);
}
