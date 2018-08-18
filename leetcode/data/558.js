{
	"difficulty":"1",
	"submit_num":"6378",
	"show_id":"577",
	"leetcode_id":"577",
	"answers":[
		{
			"lc_ans_id":"103016",
			"view":"1294",
			"top":"0",
			"title":"Accepted Solution",
			"vote":"3",
			"content":"**SELECT** name, bonus\\n**FROM** Employee **LEFT** **JOIN** Bonus\\n**ON** Employee.empID=Bonus.empID\\n**WHERE** bonus<1000 **OR** bonus **IS** **NULL**"
		},
		{
			"lc_ans_id":"103012",
			"view":"73",
			"top":"1",
			"title":"Definition",
			"vote":"0",
			"content":"Maybe the content could be changed from \\n\\n\"Select all employee's name and bonus whose bonus is < 1000.\"\\n\\nto\\n\\n\"Select all employee's name and bonus whose bonus is < 1000. (People have no bonus records are also needed to be considered)\""
		},
		{
			"lc_ans_id":"103013",
			"view":"160",
			"top":"2",
			"title":"Accepted Solution with LEFT JOIN",
			"vote":"0",
			"content":"```\\nSELECT e.name, b.bonus\\nFROM Employee e\\nLEFT JOIN Bonus b\\nON e.empId = b.empId\\nWHERE b.bonus < 1000 OR b.bonus IS NULL\\n\\n```"
		},
		{
			"lc_ans_id":"103015",
			"view":"241",
			"top":"3",
			"title":"Questions about AC code and Another version...",
			"vote":"0",
			"content":"I'm obviously not good at SQL and I know the correct solution is \\n```\\nSELECT\\n    Employee.name, Bonus.bonus\\nFROM\\n    Employee\\n        LEFT JOIN\\n    Bonus ON Employee.empid = Bonus.empid\\nWHERE\\n    bonus < 1000 OR bonus IS NULL\\n```\\n\\nBut at first, I wrote \\n```\\nSELECT Employee.name, Bonus.bonus\\nFROM Employee, Bonus\\nWHERE Employee.empId = Bonus.empId\\nAND bonus < 1000 OR bonus IS NULL\\n```\\nAnd it didn't return the null record. \\n\\nCan someone explain why? Thank you"
		},
		{
			"lc_ans_id":"103017",
			"view":"361",
			"top":"4",
			"title":"Accepted but some issues",
			"vote":"0",
			"content":"Accepted Query - \\n\\n(select name as 'name',null as 'bonus'\\nfrom Employee\\nwhere empId NOT IN (select empId from bonus))\\nunion\\n(select e.name as 'name',b.bonus as 'bonus'\\nfrom Employee e\\ninner join Bonus b\\nON e.empId  = b.empId\\nwhere b.bonus < 1000);\\n\\n\\nI tried the below left join but it doesn't work as expected. It doesn't return null for non-matched rows whereas it should.[This](http://www.mysqltutorial.org/mysql-left-join.aspx) link explains the left join. Correct me if I am wrong.\\n\\n\\nselect e.name as 'name',b.bonus as 'bonus'\\nfrom Employee e\\nleft join Bonus b\\nON e.empId  = b.empId\\nwhere b.bonus < 1000;"
		}
	],
	"id":"558",
	"title":"Employee Bonus",
	"content":"<p>\r\nSelect all employee's name and bonus whose bonus is < 1000.\r\n</p>\r\n<p>\r\nTable:<code>Employee </code>\r\n</p>\r\n\r\n<pre>\r\n+-------+--------+-----------+--------+\r\n| empId |  name  | supervisor| salary |\r\n+-------+--------+-----------+--------+\r\n|   1   | John   |  3        | 1000   |\r\n|   2   | Dan    |  3        | 2000   |\r\n|   3   | Brad   |  null     | 4000   |\r\n|   4   | Thomas |  3        | 4000   |\r\n+-------+--------+-----------+--------+\r\nempId is the primary key column for this table.\r\n</pre>\r\n\r\n<p>\r\nTable: <code>Bonus</code></p>\r\n<pre>\r\n+-------+-------+\r\n| empId | bonus |\r\n+-------+-------+\r\n| 2     | 500   |\r\n| 4     | 2000  |\r\n+-------+-------+\r\nempId is the primary key column for this table.\r\n</pre>\r\n<p>\r\nExample ouput: \r\n</p>\r\n<pre>\r\n+-------+-------+\r\n| name  | bonus |\r\n+-------+-------+\r\n| John  | null  |\r\n| Dan   | 500   |\r\n| Brad  | null  |\r\n+-------+-------+\r\n</pre>",
	"frequency":"24",
	"ac_num":"3278"
}