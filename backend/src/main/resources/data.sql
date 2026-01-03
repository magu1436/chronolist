-- scheduleテーブル, およびcalendar_eventテーブルへの初期データ登録
INSERT INTO schedule (kind, start_at, end_at, start_date, end_date, title)
VALUES
('DATED', '2025-10-31 12:00:00', '2025-10-31 14:00:00', null, null, '会議');
INSERT INTO calendar_event (schedule_id, color, memo)
VALUES
(1, 'RED', '12:00に集合');
INSERT INTO schedule (kind, start_at, end_at, start_date, end_date, title)
VALUES
('ALL_DAY', null, null, '2025-11-01', '2025-11-03', 'バイト');
INSERT INTO calendar_event (schedule_id, color, memo)
VALUES
(2, 'BLUE', '働きたくない');

-- todo_tasksテーブルへの初期データ登録
INSERT INTO todo_tasks (title, priority, due_kind, due_date, due_time, memo)
VALUES
('spring bootの勉強', 'LOW', 'NONE', null, null, 'むずすぎ');
INSERT INTO todo_tasks (title, priority, due_kind, due_date, due_time, memo)
VALUES
('課題提出', 'MIDDLE', 'DATED', '2025-10-22', null, 'めんどくさ');
INSERT INTO todo_tasks (title, priority, due_kind, due_date, due_time, memo)
VALUES
('卒研論文の提出', 'HIGH', 'DATETIME', '2026-01-26', '13:30:00', '教授へ直接手渡しする');

-- time_tablesテーブルへの初期データ登録
INSERT INTO time_tables (date)
VALUES
('2025-12-29');
INSERT INTO time_tables (date)
VALUES
('2025-10-31');

-- time_blocksテーブルへの初期データ登録
INSERT INTO time_blocks (table_id, title, status, schedule_id, width, start_at, color)
VALUES
(1, '基本情報の対策', 'PLACED', null, 90, '11:30:00', 'RED');
INSERT INTO time_blocks (table_id, title, status, schedule_id, width, start_at, color)
VALUES
(1, '映画鑑賞', 'PLACED', null, 120, '16:00:00', 'BLUE');
INSERT INTO time_blocks (table_id, title, status, schedule_id, width, start_at, color)
VALUES
(2, '会議', 'PLACED', 1, 2, '12:00:00', 'RED');

-- time_block_tasksテーブルへの初期データ登録
INSERT INTO time_block_tasks (TimeBlock_id, title)
VALUES
(1, 'データベース分野の復習');
INSERT INTO time_block_tasks (TimeBlock_id, title)
VALUES
(1, 'ネットワーク分野の勉強');
INSERT INTO time_block_tasks (TimeBlock_id, title)
VALUES
(1, '科目Bの勉強');

-- template_blocksテーブルへの初期データ登録
INSERT INTO template_blocks (title, width, color)
VALUES
('バイト', 300, 'GREEN');
INSERT INTO template_blocks (title, width, color)
VALUES
('ゼミ', 200, 'RED');