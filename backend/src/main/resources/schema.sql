-- テーブルが存在したら削除
DROP TABLE IF EXISTS calendar_event;
DROP TABLE IF EXISTS schedule;


-- scheduleテーブルの作成（H2 Database Ver）
CREATE TABLE schedule (
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- user_id INT,            -- 一旦NULL許容で作成
    kind VARCHAR(8),
    start_at TIMESTAMP,
    end_at TIMESTAMP,
    start_date DATE,
    end_date DATE,
    tz varchar(64) NOT NULL DEFAULT 'Asia/Tokyo',
    title VARCHAR(64) NOT NULL,
    -- FOREIGN KEY (id) REFERENCES calendar_event(schedule_id),

    -- kindが「TIMED」か「ALL_DAY」のどちらかをとるための制約
    CONSTRAINT chk_kind_str CHECK (kind IN ('DATED', 'ALL_DAY')),
    
    CONSTRAINT chk_kind_timed
        CHECK (
            -- 「通常予定」のときにstart_atとend_atが必ず値をもつための制約. また開始時刻より終了時刻が後になるための制約
            (kind = 'DATED' and start_at is NOT NULL and end_at is NOT NULL and start_at < end_at)
            or
            -- 「終日予定」のときにstart_dateとend_dateが必ず値をもつための制約. また開始日より終了日が後になるための制約
            (kind = 'ALL_DAY' and start_date is not NULL and end_date is not NULL and start_date < end_date)
        ),

    CONSTRAINT chk_exclusive
        CHECK (
            -- 「通常予定」のときにstart_dateとend_dateが必ずnullを持つための制約
            (kind = 'DATED' and start_date is NULL and end_date is NULL)
            or
            -- 「終日予定」のときにstart_atとend_atが必ずnullを持つための制約
            (kind = 'ALL_DAY' and start_at is NULL and end_at is NULL)
        )
);

-- calendar_eventテーブルの作成（H2 Database Ver）
CREATE TABLE calendar_event (
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- user_id INT,            -- 一旦NULL許容で作成
    schedule_id INT NOT NULL,
    color VARCHAR(16),
    memo TEXT,
    FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);


-- todo_tasksテーブルの作成
CREATE TABLE todo_tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(64) NOT NULL,
    priority VARCHAR(8) NOT NULL,
    due_kind VARCHAR(16) NOT NULL,
    due_date DATE,
    due_time TIME,
    is_completed BOOLEAN DEFAULT FALSE,
    memo TEXT,

    -- priorityがとれる値の制約
    CONSTRAINT chk_priority CHECK (priority IN ('high', 'middle', 'low')),
    -- due_kindがとれる値の制約
    CONSTRAINT chk_due_kind CHECK (due_kind IN ('NONE', 'DATE', 'DATETIME')),
    -- due_kindの値に基づいてdue_dateとdue_timeが値をとっているかの確認
    CONSTRAINT chk_due_date
        CHECK (
            (due_kind = 'NONE' and due_date = NULL and due_time = NULL)
            or
            (due_kind = 'DATE' and due_date is NOT NULL and due_time = NULL)
            or
            (due_kind = 'DATETIME' and due_date is NOT NULL and due_time is NOT NULL)
        )
);