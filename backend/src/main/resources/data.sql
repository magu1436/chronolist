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