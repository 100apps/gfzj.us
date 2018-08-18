{
	"difficulty":"1",
	"submit_num":"142869",
	"show_id":"181",
	"leetcode_id":"181",
	"answers":[
		{
			"lc_ans_id":"53475",
			"view":"20949",
			"top":"0",
			"title":"A straightforward method",
			"vote":"64",
			"content":"    select E1.Name \\n    from Employee as E1, Employee as E2 \\n    where E1.ManagerId = E2.Id and E1.Salary > E2.Salary"
		},
		{
			"lc_ans_id":"53515",
			"view":"7241",
			"top":"1",
			"title":"Sharing my solution~   simple and easy to understand",
			"vote":"28",
			"content":"    SELECT employer.Name\\n        FROM  Employee employer JOIN Employee manager ON (employer.ManagerId = manager.Id )\\n          WHERE employer.Salary > manager.Salary ;"
		},
		{
			"lc_ans_id":"53525",
			"view":"3407",
			"top":"2",
			"title":"Sharing my solution",
			"vote":"10",
			"content":"    Select emp.Name from\\n    Employee emp inner join Employee manager\\n    on emp.ManagerId = manager.Id\\n    where emp.Salary > manager.Salary"
		},
		{
			"lc_ans_id":"53521",
			"view":"2858",
			"top":"3",
			"title":"An easy solution to this question.",
			"vote":"8",
			"content":"select a.Name as Employee from Employee a join Employee b on a.ManagerId=b.Id where a.Salary>b.Salary;"
		},
		{
			"lc_ans_id":"53501",
			"view":"2836",
			"top":"4",
			"title":"Two Straightforward way, using 'where' and 'join'",
			"vote":"7",
			"content":"By the way, 'where' method took about 180 ms less time than 'join' method.\\n\\nWhere:\\n\\n\\n    select \\n    e1.Name\\n    from Employee e1, Employee e2\\n    where e1.ManagerId = e2.Id and e1.Salary > e2.Salary\\nJoin:\\n\\n    select \\n    e1.Name\\n    from Employee e1 join Employee e2\\n    on e1.ManagerId = e2.Id and e1.Salary>e2.Salary"
		},
		{
			"lc_ans_id":"53492",
			"view":"636",
			"top":"5",
			"title":"The new expected output",
			"vote":"3",
			"content":"select t.Name as Employee from Employee t,Employee k where t.ManagerId = k.Id and t.Salary > k.Salary;"
		},
		{
			"lc_ans_id":"53517",
			"view":"616",
			"top":"6",
			"title":"My Solution_____",
			"vote":"2",
			"content":"    SELECT e1.Name AS Employee FROM Employee e1\\n    JOIN Employee e2\\n    ON e1.ManagerId = e2.Id\\n    WHERE e1.Salary > e2.Salary"
		},
		{
			"lc_ans_id":"53523",
			"view":"615",
			"top":"7",
			"title":"Simple solution with inner join",
			"vote":"2",
			"content":"select a.name from Employee a inner join Employee b on a.managerId = b.id  and a.salary>b.salary;"
		},
		{
			"lc_ans_id":"53500",
			"view":"1391",
			"top":"8",
			"title":"Simple solution use where",
			"vote":"1",
			"content":"    select e1.Name from Employee e1, Employee e2 where e1.ManagerId = e2.Id and e1.Salary > e2.Salary;"
		},
		{
			"lc_ans_id":"53507",
			"view":"1341",
			"top":"9",
			"title":"Simple and Fast solution ( & 2 minute tutorial )",
			"vote":"1",
			"content":"My solution to the problem was accepted as fastest , running in 1134 ms beating 100% of submissions. I want to share it with others.\\n\\n    select E.Name\\n    from Employee E , Employee M\\n    where E.ManagerId = M.Id and E.Salary > M.Salary\\n\\nIt is based on discussion on [SQL variables][1] at  @ 3:20\\n\\nPS : How do I submit to \"Discuss\" forum it as a solution ? Is everyone using Ask question form only ? \\n\\n@stefanPochmann : Thanks for pointing it out. It seems that outcome is random. I poked further and found out that SQL query result order is not guaranteed. May be that is a factor to play in.\\n\\n  [1]: https://lagunita.stanford.edu/courses/DB/SQL/SelfPaced/courseware/ch-sql/seq-vid-table_variables_and_set_operators/"
		}
	],
	"id":"181",
	"title":"Employees Earning More Than Their Managers",
	"content":"<p>\r\nThe <code>Employee</code> table holds all employees including their managers. Every employee has an Id, and there is also a column for the manager Id.</p>\r\n\r\n<pre>\r\n+----+-------+--------+-----------+\r\n| Id | Name  | Salary | ManagerId |\r\n+----+-------+--------+-----------+\r\n| 1  | Joe   | 70000  | 3         |\r\n| 2  | Henry | 80000  | 4         |\r\n| 3  | Sam   | 60000  | NULL      |\r\n| 4  | Max   | 90000  | NULL      |\r\n+----+-------+--------+-----------+\r\n</pre>\r\n\r\n<p>Given the <code>Employee</code> table, write a SQL query that finds out employees who earn more than their managers. For the above table, Joe is the only employee who earns more than his manager.</p>\r\n\r\n<pre>\r\n+----------+\r\n| Employee |\r\n+----------+\r\n| Joe      |\r\n+----------+\r\n</pre>",
	"frequency":"496",
	"ac_num":"53688"
}