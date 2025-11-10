package com.magu1436.chronolist.todolist;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    /**getallの定義 */
    @GetMapping("getAll")
    public ResponseEntity<List<ToDoTask>> getall(){
        List<ToDoTask> tasks = mapper.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    /**redisterの定義 */
    @PostMapping("register")
    public ResponseEntity<Integer> register(@RequestBody ToDoTask task){
        mapper.insertTask(task);
        Integer id = task.getId();
        return ResponseEntity.ok(id);
    }


}
