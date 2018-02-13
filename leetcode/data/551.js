{
	"difficulty":"2",
	"submit_num":"5082",
	"show_id":"570",
	"leetcode_id":"570",
	"answers":[
		{
			"lc_ans_id":"102697",
			"view":"561",
			"top":"0",
			"title":"Accepted and easy-to-understand solution",
			"vote":"2",
			"content":"```\\nselect name from employee \\nwhere id in \\n(select managerId from Employee\\ngroup by managerId\\nhaving count(managerId)>=5) \\n```"
		},
		{
			"lc_ans_id":"102700",
			"view":"803",
			"top":"1",
			"title":"Simplest solution without unnecessary nesting",
			"vote":"2",
			"content":"```\\nSELECT e1.Name \\nFROM Employee AS e1 INNER JOIN Employee AS e2 \\nON e1.Id = e2.ManagerId \\nGROUP BY e1.Name \\nHAVING Count(e1.Name) >= 5\\n```"
		},
		{
			"lc_ans_id":"102696",
			"view":"27",
			"top":"2",
			"title":"AC solution without Sub Query - Self Join",
			"vote":"0",
			"content":"```\\nselect p2.name from employee p1 join employee p2 on p1.managerid = p2.id group by p1.managerid having count(*) >= 5\\n```"
		},
		{
			"lc_ans_id":"102698",
			"view":"53",
			"top":"3",
			"title":"My left-join solution",
			"vote":"0",
			"content":"SELECT e1.Name FROM Employee e1\\nLEFT JOIN Employee e2 ON e1.Id = e2.ManagerId\\nGROUP BY e1.Id\\nHAVING COUNT(e1.Name) >= 5;"
		},
		{
			"lc_ans_id":"102699",
			"view":"68",
			"top":"4",
			"title":"Share my accept solution",
			"vote":"0",
			"content":"select Name from Employee where Id in ( \\n    select ManagerId from Employee \\n    where ManagerId is not null \\n    group by ManagerId \\n    having count(*)>=5);"
		},
		{
			"lc_ans_id":"102701",
			"view":"88",
			"top":"5",
			"title":"my solution",
			"vote":"0",
			"content":"SELECT t3.n1 AS Name FROM\\n  (SELECT t2.Name AS n1, t1.ManagerId AS m1,COUNT(t1.ManagerId) AS cnt FROM\\n      Employee t1, Employee t2\\n      WHERE t1.ManagerId = t2.Id\\n      GROUP BY t1.ManagerId\\n      ORDER BY COUNT(t1.ManagerId) DESC) AS t3\\n  WHERE t3.cnt >=5"
		},
		{
			"lc_ans_id":"102702",
			"view":"127",
			"top":"6",
			"title":"Simple solution w/ WHERE EXISTS... IN .. subquery",
			"vote":"0",
			"content":"```\\nSELECT t1.Name\\nFROM Employee t1\\nWHERE t1.Id IN (\\n        SELECT ManagerId\\n        FROM Employee\\n        GROUP BY ManagerId\\n        HAVING COUNT(ManagerId) >=5\\n    )\\n ```"
		},
		{
			"lc_ans_id":"102703",
			"view":"214",
			"top":"7",
			"title":"Share my simple solution with explanation",
			"vote":"0",
			"content":"'''# Write your MySQL query statement below\\n# The basic idea is using self-join to find the records with more than at least five times\\n/*\\nThis is the table before the self join\\n+------+----------+-----------+----------+\\n|Id    |Name \\t  |Department |ManagerId |\\n+------+----------+-----------+----------+\\n|101    |John \\t   |A \\t             |null         |\\n|102    |Dan \\t   |A \\t             |101         |\\n|103    |James \\t   |A \\t             |101         |\\n|104    |Amy \\t   |A \\t             |101         |\\n|105    |Anne \\t   |A \\t             |101         |\\n|106    |Ron \\t   |B \\t             |101         |\\n+------+----------+-----------+----------+\\n\\nThis is the table after the self-join, there for we can use the group by to find the count(name) >= 5 which \\nis the result of our question\\n+------+----------+-----------+----------+------+----------+-----------+----------+\\n|Id    |Name \\t  |Department |ManagerId |E2.Id    |E2.Name \\t   |E2.Department |E2.ManagerId |\\n+------+----------+-----------+----------+------+----------+-----------+----------+  \\n|101   |John \\t  |A \\t             |null          |102    |Dan \\t|A \\t          |101         |             \\n|101   |John \\t  |A \\t             |null          |103    |James    |A \\t          |101         |\\n|101   |John \\t  |A \\t             |null          |104    |Amy \\t|A \\t          |101         |\\n|101   |John \\t  |A \\t             |null          |105    |Anne \\t|A \\t          |101         |\\n|101   |John \\t  |A \\t             |null          |106    |Ron \\t|A \\t          |101         |\\n+------+----------+-----------+----------+------+----------+-----------+----------+\\n\\n**/\\nSelect distinct E1.Name\\nfrom Employee E1\\ninner join Employee E2\\non E1.Id = E2.ManagerId\\ngroup by E1.Name\\nhaving (count(E1.Name) >= 5);\\n'''"
		},
		{
			"lc_ans_id":"102704",
			"view":"143",
			"top":"8",
			"title":"Easy SQL",
			"vote":"0",
			"content":"```\\nselect t1.Name\\nfrom Employee t1\\nleft join Employee t2\\n    on t1.Id = t2.ManagerId\\ngroup by t1.Name\\nhaving count(*) >= 5\\n```"
		},
		{
			"lc_ans_id":"102705",
			"view":"154",
			"top":"9",
			"title":"My solution",
			"vote":"0",
			"content":"'''\\nSELECT t2.Name\\nFROM \\n    (SELECT ManagerId, COUNT(Id) AS num_reports FROM Employee\\n    WHERE ManagerId IS NOT NULL\\n    GROUP BY ManagerID \\n    HAVING num_reports >= 5) t1\\n    JOIN Employee t2 ON t1.ManagerId = t2.Id\\n'''"
		}
	],
	"id":"551",
	"title":"Managers with at Least 5 Direct Reports",
	"content":"<p>The <code>Employee</code> table holds all employees including their managers. Every employee has an Id, and there is also a column for the manager Id.</p>\r\n\r\n<pre>\r\n+------+----------+-----------+----------+\r\n|Id    |Name \t  |Department |ManagerId |\r\n+------+----------+-----------+----------+\r\n|101   |John \t  |A \t      |null      |\r\n|102   |Dan \t  |A \t      |101       |\r\n|103   |James \t  |A \t      |101       |\r\n|104   |Amy \t  |A \t      |101       |\r\n|105   |Anne \t  |A \t      |101       |\r\n|106   |Ron \t  |B \t      |101       |\r\n+------+----------+-----------+----------+\r\n</pre>\r\n\r\n<p>Given the <code>Employee</code> table, write a SQL query that finds out managers with at least 5 direct report. For the above table, your SQL query should return:\r\n</p>\r\n\r\n<pre>\r\n+-------+\r\n| Name  |\r\n+-------+\r\n| John  |\r\n+-------+\r\n</pre>\r\n\r\n<p><b>Note:</b><br />\r\nNo one would report to himself.</p>",
	"frequency":"39",
	"ac_num":"2921"
}