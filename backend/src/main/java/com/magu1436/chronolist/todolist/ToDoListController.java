package com.magu1436.chronolist.todolist;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.magu1436.chronolist.todolist.entity.ToDoTask;
import com.magu1436.chronolist.todolist.mapper.ToDoMapper;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/todolist/")
@Controller
@RequiredArgsConstructor
public class ToDoListController {
    
    private final ToDoMapper mapper;

    /**タスクを全取得するAPIの定義 */
    @GetMapping("getAll")
    public ResponseEntity<List<ToDoTask>> getall(){
        List<ToDoTask> tasks = mapper.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    /**タスクを登録するAPIの定義 */
    @PostMapping("register")
    public ResponseEntity<Integer> register(@RequestBody ToDoTask task){
        mapper.insertTask(task);
        Integer id = task.getId();
        return ResponseEntity.ok(id);
    }

    /** データを更新するAPIの定義 */
    @PutMapping("update")
    public ResponseEntity<Void> update(@RequestBody ToDoTask task){

        /** IDが存在しない場合に404を返す */
        ToDoTask existing = mapper.getTaskById(task.getId());
        if (existing == null){
            return ResponseEntity.status(404).build();
        }

        /** Enumに存在しない値が入れられたとき422をかえす */
        /** dueKindに存在しない場合 */
        /**try{
        *    DueKind.valueOf(task.getDueKind().name());
        *}
        *catch(IllegalArgumentException e){
        *    return ResponseEntity.status(422).build();
        *}
        */
        /** Priorityに存在しない場合 */
        /*try{
        *    Priority.valueOf(task.getDueKind().name());
        *}
        *catch(IllegalArgumentException e){
        *    return ResponseEntity.status(422).build();
        *}
        */

        /** タスクの更新を返す */
        mapper.updateTask(task);
        return ResponseEntity.status(201).build();
    }

    /** タスク完了状況更新機能のAPI */
    @PutMapping("update/status")
    public ResponseEntity<Void> update_status(@RequestBody ToDoTask task) {
        /** IDが存在しない場合に404を返す */
        ToDoTask existing = mapper.getTaskById(task.getId());
        if (existing == null){
            return ResponseEntity.status(404).build();
        }

        /** 受け取ったjsonのboolを入力 */
        existing.setCompleted(task.isCompleted());
        /** データベースの更新 */
        mapper.updateTask(existing);

        System.out.println(existing.isCompleted());
        
        return ResponseEntity.status(204).build();
    }



}
