{
	"difficulty":"1",
	"submit_num":"272303",
	"show_id":"176",
	"leetcode_id":"176",
	"answers":[
		{
			"lc_ans_id":"52957",
			"view":"33326",
			"top":"0",
			"title":"Simple query which handles the NULL situation",
			"vote":"73",
			"content":"SELECT max(Salary)\\nFROM Employee\\nWHERE Salary < (SELECT max(Salary) FROM Employee)\\n\\nUsing max() will return a NULL if the value doesn't exist. So there is no need to UNION a NULL. Of course, if the second highest value is guaranteed to exist, using LIMIT 1,1 will be the best answer."
		},
		{
			"lc_ans_id":"52952",
			"view":"21561",
			"top":"1",
			"title":"A Simple Answer",
			"vote":"44",
			"content":"\\n    select (\\n      select distinct Salary from Employee order by Salary Desc limit 1 offset 1\\n    )as second\\n\\nChange the number after 'offset' gives u n-th highest salary"
		},
		{
			"lc_ans_id":"53029",
			"view":"9594",
			"top":"2",
			"title":"Accepted solution",
			"vote":"15",
			"content":"Select MAX(Salary) from Employee\\nwhere Salary < (Select MAX(Salary) from Employee)"
		},
		{
			"lc_ans_id":"52953",
			"view":"9338",
			"top":"3",
			"title":"My tidy soution",
			"vote":"14",
			"content":"    SELECT MAX( Salary)\\n      FROM Employee\\n     WHERE Salary < ( SELECT MAX( Salary) FROM Employee )"
		},
		{
			"lc_ans_id":"53016",
			"view":"4063",
			"top":"4",
			"title":"Simple Solution",
			"vote":"8",
			"content":"**select max(salary) from Employee where salary !=(select max(salary) from Employee)**"
		},
		{
			"lc_ans_id":"52976",
			"view":"4855",
			"top":"5",
			"title":"Based on Count and easy to extend to N",
			"vote":"8",
			"content":"     SELECT MAX(Salary)\\n     FROM (SELECT E1.Salary\\n     FROM Employee as E1 JOIN Employee as E2\\n     ON E1.Salary < E2.Salary\\n     GROUP BY E1.Id HAVING COUNT(E2.Id) = 1\\n     )  AS SecondHighestSalary\\n     ORDER BY Salary DESC LIMIT 1;\\n\\nFor the Nth highest one, \\n\\n     COUNT(E2.Id) = N-1"
		},
		{
			"lc_ans_id":"52994",
			"view":"4181",
			"top":"6",
			"title":"Easy Solution for This",
			"vote":"7",
			"content":"select max(Salary) from Employee where  Salary < \\n(select max(Salary) from Employee) order by Salary desc;"
		},
		{
			"lc_ans_id":"52980",
			"view":"2613",
			"top":"7",
			"title":"Easy to understand solution with best run time",
			"vote":"6",
			"content":"SELECT distinct(Salary) FROM Employee \\nUNION \\nSELECT NULL \\nORDER BY Salary DESC LIMIT 1,1"
		},
		{
			"lc_ans_id":"53008",
			"view":"2563",
			"top":"8",
			"title":"General solution not using MAX",
			"vote":"6",
			"content":"    SELECT Salary FROM Employee GROUP BY Salary \\n    UNION ALL (SELECT null AS Salary)\\n    ORDER BY Salary DESC LIMIT 1 OFFSET 1"
		},
		{
			"lc_ans_id":"52998",
			"view":"1164",
			"top":"9",
			"title":"My solution using limit,as",
			"vote":"5",
			"content":"SELECT distinct(Salary) as SecondHighestSalary FROM Employee  UNION SELECT NULL ORDER BY SecondHighestSalary DESC LIMIT 1,1;"
		}
	],
	"id":"176",
	"title":"Second Highest Salary",
	"content":"<p>\r\nWrite a SQL query to get the second highest salary from the <code>Employee</code> table.\r\n</p>\r\n\r\n<pre>\r\n+----+--------+\r\n| Id | Salary |\r\n+----+--------+\r\n| 1  | 100    |\r\n| 2  | 200    |\r\n| 3  | 300    |\r\n+----+--------+\r\n</pre>\r\n\r\n<p>For example, given the above Employee table, the query should return <code>200</code> as the second highest salary. If there is no second highest salary, then the query should return <code>null</code>.</p>\r\n\r\n<pre>\r\n+---------------------+\r\n| SecondHighestSalary |\r\n+---------------------+\r\n| 200                 |\r\n+---------------------+\r\n</pre>",
	"frequency":"529",
	"ac_num":"60378"
}