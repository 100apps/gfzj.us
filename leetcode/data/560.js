{
	"difficulty":"3",
	"submit_num":"2994",
	"show_id":"579",
	"leetcode_id":"579",
	"answers":[
		{
			"lc_ans_id":"103034",
			"view":"863",
			"top":"0",
			"title":"Accepted solution",
			"vote":"3",
			"content":"```\\nselect E1.id, E1.month, (ifnull(E1.salary,0) +ifnull(E2.salary,0) + ifnull(E3.salary,0)) as Salary  from \\n(Select id,max(month) as month from Employee group by id having count(*) > 1) as maxmonth\\nleft Join Employee E1 on (maxmonth.id = E1.id and maxmonth.month > E1.month)\\nleft Join Employee E2 on (E1.id = E2.id and E1.month = E2.month + 1)\\nleft Join Employee E3 on (E1.id = E3.id and E1.month = E3.month + 2)\\nOrder by id ASC, month DESC\\n```"
		},
		{
			"lc_ans_id":"103037",
			"view":"1046",
			"top":"1",
			"title":"AC Solution",
			"vote":"3",
			"content":"```\\nSELECT EA.Id, \\n       EA.Month, \\n       Sum(EB.salary) AS Salary \\nFROM   (SELECT E1.* \\n        FROM   employee E1 \\n               LEFT JOIN (SELECT id, \\n                                 Max(month) AS month \\n                          FROM   employee \\n                          GROUP  BY id) E2 \\n                      ON E1.id = E2.id \\n        WHERE  E1.month < E2.month) EA \\n       LEFT JOIN employee EB \\n              ON EA.id = EB.id \\nWHERE  EB.month <= EA.month \\n       AND EB.month >= EA.month - 2 \\nGROUP  BY EA.id, \\n          EA.month \\nORDER  BY EA.id, \\n          month DESC \\n```"
		},
		{
			"lc_ans_id":"103030",
			"view":"1",
			"top":"2",
			"title":"AC solution without join",
			"vote":"0",
			"content":"```\\nSELECT id, \\n       month, \\n       (SELECT Sum(salary) \\n        FROM   employee \\n        WHERE  month <= e.month \\n               AND month >= e.month - 2 \\n               AND id = e.id)AS salary \\nFROM   employee e \\nWHERE  ( id, month ) NOT IN (SELECT id, \\n                                    Max(month) AS month \\n                             FROM   employee \\n                             GROUP  BY id) \\nORDER  BY id ASC, \\n          month DESC; \\n```"
		},
		{
			"lc_ans_id":"103031",
			"view":"15",
			"top":"3",
			"title":"Accepted Solution Using Two Join & Where",
			"vote":"0",
			"content":"```\\nSELECT f1.Id Id, f1.month Month, IFNULL(f1.salary, 0) + IFNULL(f2.salary, 0) + IFNULL(f3.salary, 0) as Salary\\nFROM Employee f1 LEFT JOIN Employee f2 ON f1.month-1 = f2.month AND f1.Id = f2.Id\\n                 LEFT JOIN Employee f3 ON f1.month -2 = f3.month AND f1.Id = f3.Id\\nWHERE (f1.Id, f1.month) NOT IN (select Id, max(month) \\n                              from Employee \\n                              group by Id)\\nORDER BY Id, Month DESC;\\n```"
		},
		{
			"lc_ans_id":"103033",
			"view":"18",
			"top":"4",
			"title":"Kickass solution for my script kiddies!",
			"vote":"0",
			"content":"```#jdrinane\\n\\nselect a.Id, a.month_win_end as month\\n,sum(b.Salary) as Salary\\nfrom \\n(\\n#Generate month ranges for summation\\nselect distinct a.Id,a.Month - 2 as month_win_start, a.month as month_win_end\\nfrom Employee                                                   a\\njoin (select Id,max(Month) as latest_month from Employee group by ID)    b on a.ID = b.ID and a.Month < b.latest_month\\n)               a\\njoin Employee   b   on  a.Id = b.Id and b.month between a.month_win_start and a.month_win_end\\ngroup by a.Id, a.month_win_end \\norder by 1,2 desc```"
		},
		{
			"lc_ans_id":"103035",
			"view":"26",
			"top":"5",
			"title":"AC Solution with nested query",
			"vote":"0",
			"content":"```\\nSELECT t.id, t.month, IFNULL(SUM(e2.salary),0) + t.salary AS Salary\\nFROM (\\n    SELECT id, month, salary\\n    FROM Employee e1\\n    WHERE month < (\\n        SELECT max(month) FROM Employee e2 WHERE e1.id = e2.id\\n        GROUP BY id\\n    )\\n) t \\nLEFT JOIN Employee e2\\n    ON t.id = e2.id AND ( t.month = e2.month +1 OR t.month = e2.month+2)\\n    GROUP BY t.id, t.month\\n    ORDER BY 1, 2 DESC;\\n```"
		},
		{
			"lc_ans_id":"103036",
			"view":"23",
			"top":"6",
			"title":"easy solution using not in",
			"vote":"0",
			"content":"```\\nselect b.id, b.month, sum(a.salary) salary\\nfrom employee a\\njoin employee b\\non a.id = b.id and a.month <= b.month and a.month+2 >= b.month\\ngroup by b.id, b.month\\nhaving (b.id, b.month) not in \\n(select id, max(month) from employee c group by id)\\norder by b.id, b.month desc\\n```"
		},
		{
			"lc_ans_id":"103038",
			"view":"55",
			"top":"7",
			"title":"Does this expected result make sense?",
			"vote":"0",
			"content":"For the 4th test case (for some reason, I cannot see the input), but the expected is as follows. Why are there 4 results for user id =1? I thought it should be at most 3.\\n```\\n{\"headers\": [\"id\", \"month\", \"Salary\"], \"values\": [[1, 4, 130], [1, 3, 90], [1, 2, 50], [1, 1, 20], [2, 1, 20], [3, 3, 100], [3, 2, 40]]}\\n````"
		},
		{
			"lc_ans_id":"103039",
			"view":"113",
			"top":"8",
			"title":"Wrong test case",
			"vote":"0",
			"content":"The test case has some problem, for this case there should be three month output, I don't know why the fourth month get outputted in the expected output. And some people earlier wondering why it is 130 instead of 150, I think if we exclude the fourth month, then the result is 130.\\n![0_1498732747416_a.png](/assets/uploads/files/1498732751155-a-resized.png)"
		},
		{
			"lc_ans_id":"103040",
			"view":"141",
			"top":"9",
			"title":"Wrong Test",
			"vote":"0",
			"content":"```\\nselect t1.Id,t1.Month,\\n(select sum(salary) from Employee  t2 where t2.id = t1.id and t2.month <= t1.month) as Salary\\n from Employee  t1\\nLeft outer join\\n(select max(month) as month,id from employee group by id) t3\\non t1.id = t3.id and t1.month = t3.month\\nwhere t3.id is null\\norder by id, month desc\\n```"
		}
	],
	"id":"560",
	"title":"Find Cumulative Salary of an Employee",
	"content":"<p>The <b>Employee</b> table holds the salary information in a year.</p>\r\n\r\n<p>Write a SQL to get the cumulative sum of an employee's salary over a period of 3 months but exclude the most recent month.</p>\r\n\r\n<p>The result should be displayed by 'Id' ascending, and then by 'Month' descending.</p> \r\n\r\n<p><b>Example</b><br />\r\n<b>Input</b>\r\n<pre>\r\n| Id | Month | Salary |\r\n|----|-------|--------|\r\n| 1  | 1     | 20     |\r\n| 2  | 1     | 20     |\r\n| 1  | 2     | 30     |\r\n| 2  | 2     | 30     |\r\n| 3  | 2     | 40     |\r\n| 1  | 3     | 40     |\r\n| 3  | 3     | 60     |\r\n| 1  | 4     | 60     |\r\n| 3  | 4     | 70     |\r\n</pre>\r\n\r\n<b>Output</b>\r\n<pre>\r\n\r\n| Id | Month | Salary |\r\n|----|-------|--------|\r\n| 1  | 3     | 90     |\r\n| 1  | 2     | 50     |\r\n| 1  | 1     | 20     |\r\n| 2  | 1     | 20     |\r\n| 3  | 3     | 100    |\r\n| 3  | 2     | 40     |\r\n</pre>\r\n</p>\r\n\r\n<b>Explanation</b>\r\n<p>Employee '1' has 3 salary records for the following 3 months except the most recent month '4': salary 40 for month '3', 30 for month '2' and 20 for month '1'</br>\r\nSo the cumulative sum of salary of this employee over 3 months is 90(40+30+20), 50(30+20) and 20 respectively.</p> \r\n<pre>\r\n| Id | Month | Salary |\r\n|----|-------|--------|\r\n| 1  | 3     | 90     |\r\n| 1  | 2     | 50     |\r\n| 1  | 1     | 20     |\r\n</pre>\r\n\r\nEmployee '2' only has one salary record (month '1') except its most recent month '2'.\r\n<pre>\r\n| Id | Month | Salary |\r\n|----|-------|--------|\r\n| 2  | 1     | 20     |\r\n</pre></p>\r\nEmploy '3' has two salary records except its most recent pay month '4': month '3' with 60 and month '2' with 40. So the cumulative salary is as following.\r\n<pre>\r\n| Id | Month | Salary |\r\n|----|-------|--------|\r\n| 3  | 3     | 100    |\r\n| 3  | 2     | 40     |\r\n</pre></p>",
	"frequency":"23",
	"ac_num":"788"
}