{
	"difficulty":"2",
	"submit_num":"154120",
	"show_id":"177",
	"leetcode_id":"177",
	"answers":[
		{
			"lc_ans_id":"53041",
			"view":"29115",
			"top":"0",
			"title":"Accpted Solution for the Nth Highest Salary",
			"vote":"38",
			"content":"    CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\\n    BEGIN\\n    DECLARE M INT;\\n    SET M=N-1;\\n      RETURN (\\n          # Write your MySQL query statement below.\\n          SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT M, 1\\n      );\\n    END"
		},
		{
			"lc_ans_id":"53071",
			"view":"11991",
			"top":"1",
			"title":"My accepted simply solution.Any advising?",
			"vote":"25",
			"content":"    CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\\n    BEGIN\\n        set N=N-1;\\n      RETURN (\\n          select distinct Salary from Employee order by Salary desc limit N,1\\n      );\\n    END"
		},
		{
			"lc_ans_id":"53062",
			"view":"8726",
			"top":"2",
			"title":"No Variable, No Limit X,1, Just one query, 808ms",
			"vote":"22",
			"content":"        CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\\n    BEGIN\\n        \\n      RETURN (\\n          # Write your MySQL query statement below.\\n          \\n        \\n          SELECT e1.Salary\\n          FROM (SELECT DISTINCT Salary FROM Employee) e1\\n          WHERE (SELECT COUNT(*) FROM (SELECT DISTINCT Salary FROM Employee) e2 WHERE e2.Salary > e1.Salary) = N - 1      \\n          \\n          LIMIT 1\\n          \\n          \\n          \\n          \\n      );\\n    END"
		},
		{
			"lc_ans_id":"53036",
			"view":"7104",
			"top":"3",
			"title":"Why using LIMIT N-1,1 will cause error?",
			"vote":"13",
			"content":"    CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\\n    BEGIN\\n    RETURN (\\n          # Write your MySQL query statement below.\\n          SELECT IFNULL((SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT N-1 ,1), NULL)  \\n      );\\n    END\\n\\nThis was my code for the problem, but it seems there's an error near LIMIT N-1,1. Anyone has any idea why?"
		},
		{
			"lc_ans_id":"53078",
			"view":"7081",
			"top":"4",
			"title":"Accepted Solution of Nth Highest Salary",
			"vote":"7",
			"content":"    CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\\n    BEGIN\\n    DECLARE M INT;\\n    SET M=N-1;\\n      RETURN (\\n        # Write your MySQL query statement below.\\n        SELECT IFNULL((SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT M ,1), NULL)\\n      );\\n    END"
		},
		{
			"lc_ans_id":"53072",
			"view":"1223",
			"top":"5",
			"title":"My simple solution with order by and limit",
			"vote":"6",
			"content":"    CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\\n    BEGIN\\n      RETURN (\\n          # Write your MySQL query statement below.\\n          select if(count(*)<N,null,min(s.Salary))\\n          from \\n          (select distinct Salary\\n          from Employee\\n          order by Salary DESC\\n          limit 0,N) s\\n      );\\n    END"
		},
		{
			"lc_ans_id":"53081",
			"view":"1199",
			"top":"6",
			"title":"My accepted solution, 813ms",
			"vote":"3",
			"content":"    select  IF(count(*) >= N, Min(rank.Salary), NULL) salary\\n    from (select distinct salary\\n          from Employee     \\n          order by salary desc\\n          limit N\\n     ) rank"
		},
		{
			"lc_ans_id":"53069",
			"view":"444",
			"top":"7",
			"title":"Comprehensive solution inspired by problem 'rank score'",
			"vote":"2",
			"content":"    CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\\n    BEGIN\\n      RETURN (\\n          # Write your MySQL query statement below.\\n          select distinct s.Salary from \\n            (select a.Salary as Salary, \\n                (select count(distinct b.Salary) + 1 from Employee b where b.Salary > a.Salary) as nth\\n            from Employee a) s where s.nth = N\\n      );\\n    END\\n\\nCreate a ranked table and select nth from it. Remember the 'distinct' in outer selection and no if condition needed."
		},
		{
			"lc_ans_id":"53080",
			"view":"1010",
			"top":"8",
			"title":"Fastest solution without using order by or declaring variables",
			"vote":"1",
			"content":"Often this question would be followed by solving the same problem without order by, rank, or declaring variables. Below are two accepted solutions for that problem. However, both of them are a lot slower than other accepted answers for this question, I think because the faster questions use order by -- what is the fastest way to write this query without order by?\\n\\nsolution 1, correlated subquery, 1311 ms:\\n\\n    select distinct Salary from Employee e1 \\n        where N = (select count(distinct Salary)\\n        from Employee e2\\n        where e1.Salary <= e2.Salary)\\n\\nsolution 2, self join - 1329 ms:\\n\\n         select salary from\\n          ((select N as rank) rank\\n          left join\\n          (select a.salary, count(distinct b.salary) as rank\\n          from Employee a\\n          join Employee b\\n          where a.salary <= b.salary\\n          group by a.salary) salary_rank\\n          on rank.rank = salary_rank.rank)"
		},
		{
			"lc_ans_id":"53086",
			"view":"570",
			"top":"9",
			"title":"Different opinion on the definition of Nth Highest",
			"vote":"1",
			"content":"Shouldn't it like this?\\n\\n    +---------+--------+-------------+\\n    | Row No. | Salary | Nth Highest |\\n    +---------+--------+-------------+\\n    |       1 |    300 |           1 |\\n    |       2 |    300 |           1 |\\n    |       3 |    200 |           3 |\\n    |       4 |    200 |           3 |\\n    |       5 |    100 |           5 |\\n    +---------+--------+-------------+"
		}
	],
	"id":"177",
	"title":"Nth Highest Salary",
	"content":"<p>\r\nWrite a SQL query to get the <i>n</i><sup>th</sup> highest salary from the <code>Employee</code> table.\r\n</p>\r\n\r\n<pre>\r\n+----+--------+\r\n| Id | Salary |\r\n+----+--------+\r\n| 1  | 100    |\r\n| 2  | 200    |\r\n| 3  | 300    |\r\n+----+--------+\r\n</pre>\r\n\r\n<p>For example, given the above Employee table, the <i>n</i><sup>th</sup> highest salary where <i>n</i> = 2 is <code>200</code>. If there is no <i>n</i><sup>th</sup> highest salary, then the query should return <code>null</code>.</p>\r\n\r\n<pre>\r\n+------------------------+\r\n| getNthHighestSalary(2) |\r\n+------------------------+\r\n| 200                    |\r\n+------------------------+\r\n</pre>",
	"frequency":"364",
	"ac_num":"30501"
}