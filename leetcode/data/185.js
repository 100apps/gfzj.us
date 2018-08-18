{
	"difficulty":"3",
	"submit_num":"102304",
	"show_id":"185",
	"leetcode_id":"185",
	"answers":[
		{
			"lc_ans_id":"53692",
			"view":"17607",
			"top":"0",
			"title":"Accepted solution without group by or order by",
			"vote":"55",
			"content":"    select d.Name Department, e1.Name Employee, e1.Salary\\n    from Employee e1 \\n    join Department d\\n    on e1.DepartmentId = d.Id\\n    where 3 > (select count(distinct(e2.Salary)) \\n                      from Employee e2 \\n                      where e2.Salary > e1.Salary \\n                      and e1.DepartmentId = e2.DepartmentId\\n                      );"
		},
		{
			"lc_ans_id":"53699",
			"view":"11687",
			"top":"1",
			"title":"My tidy solution",
			"vote":"28",
			"content":"    select D.Name as Department, E.Name as Employee, E.Salary as Salary \\n      from Employee E, Department D\\n       where (select count(distinct(Salary)) from Employee \\n               where DepartmentId = E.DepartmentId and Salary > E.Salary) in (0, 1, 2)\\n             and \\n               E.DepartmentId = D.Id \\n             order by E.DepartmentId, E.Salary DESC;"
		},
		{
			"lc_ans_id":"53701",
			"view":"8831",
			"top":"2",
			"title":"Simple solution, easy to understand",
			"vote":"23",
			"content":"    Select dep.Name as Department, emp.Name as Employee, emp.Salary from Department dep, \\n    Employee emp where emp.DepartmentId=dep.Id and \\n    (Select count(distinct Salary) From Employee where DepartmentId=dep.Id and Salary>emp.Salary)<3"
		},
		{
			"lc_ans_id":"53748",
			"view":"3642",
			"top":"3",
			"title":"Simple Solution for 1112 ms",
			"vote":"8",
			"content":"        \\n    SELECT\\n        d.Name Department, e.Name Employee, e.Salary Salary\\n    FROM\\n        (\\n            SELECT DepartmentId, Name, Salary \\n            FROM Employee \\n            WHERE 3 > (\\n                SELECT COUNT(e1.Salary)\\n                FROM (\\n                    SELECT DISTINCT Salary, DepartmentId \\n                    FROM Employee \\n                ) e1\\n                WHERE\\n                    Employee.DepartmentId = e1.DepartmentId \\n                AND\\n                    Employee.Salary < e1.Salary\\n            )\\n            ORDER BY DepartmentId ASC, Salary DESC\\n        ) e \\n    LEFT JOIN\\n        Department d\\n    ON \\n        e.DepartmentId = d.Id\\n    WHERE\\n        d.Name IS NOT NULL"
		},
		{
			"lc_ans_id":"53713",
			"view":"4303",
			"top":"4",
			"title":"Solution: Using 3 variables to rank Salaries within each Department",
			"vote":"6",
			"content":"One variable is to limit the ranking in department, and second to handle salary ties, the third to assign a rank to each row, and we will use this rank to get top n salaries.\\n\\nThe 2nd variable, @PrevSalary, could be avoided by first doing a DISTINCT on Employee table, but then will need to join Employee table back to get the name, which makes the SQL more complex than this approach.\\n\\n    SELECT d.Name AS Department, se.Name AS Employee, se.Salary \\n    FROM Department d,\\n     ( SELECT e.Name, e.DepartmentId, e.Salary,\\n              @Rank := (CASE \\n\\t\\t\\t\\t\\t\\tWHEN @PrevDept != e.DepartmentId THEN 1\\n                        WHEN @PrevSalary = e.Salary THEN @Rank\\n\\t\\t\\t\\t\\t\\tELSE @Rank + 1 END) AS Rank, \\n\\t\\t\\t  @PrevDept := e.DepartmentId,\\n              @PrevSalary := e.Salary\\n\\t\\tFROM Employee e, (SELECT @Rank := 0, @PrevDept := 0, @PrevSalary := 0) r\\n \\t\\tORDER BY DepartmentId ASC, Salary DESC\\n\\t  ) se\\n    WHERE d.Id = se.DepartmentId AND se.Rank <= 3\\n\\n\\nQuestions, comments are always welcome."
		},
		{
			"lc_ans_id":"53688",
			"view":"1262",
			"top":"5",
			"title":"Query with 2 variables beats 99% of submissions (737 ms)",
			"vote":"5",
			"content":" Note: for each department, if there exists duplicate 1st/2nd/3rd highest salaries, all entries should be returned.\\n```\\nselect d.Name as Department, e.Name as Employee, computed.Salary as Salary\\nfrom Employee e, \\n\\t(\\n\\t\\tselect Salary, DepartmentId, @row := IF(DepartmentId=@did, @row + 1,1) as Rank , @did:=DepartmentId\\n\\t\\tfrom (\\n\\t\\t\\tselect distinct Salary, DepartmentId\\n\\t\\t\\tfrom Employee\\n\\t\\t\\torder by DepartmentId, Salary desc\\n\\t\\t\\t) ordered, (select @row:=0, @did:=0) variables\\n\\t) computed,\\n\\tDepartment d\\nwhere e.Salary=computed.Salary \\nand e.DepartmentId=computed.DepartmentId \\nand computed.DepartmentId=d.Id\\nand computed.Rank<=3\\norder by computed.DepartmentId, Salary desc\\n```"
		},
		{
			"lc_ans_id":"53758",
			"view":"1898",
			"top":"6",
			"title":"My solution without fancy syntax",
			"vote":"3",
			"content":"    select d.Name, r.Name, r.Salary \\n    from (\\n      select DepartmentId, Name, Salary,(\\n        select count(*)+1 from (\\n          select distinct salary, DepartmentId from Employee \\n          ) as uniq\\n         where DepartmentId = e.DepartmentId and Salary > e.Salary   \\n        ) as rank\\n      from Employee e\\n      ) as r, Department d\\n    where r.DepartmentId = d.Id and r.rank <= 3"
		},
		{
			"lc_ans_id":"53702",
			"view":"109",
			"top":"7",
			"title":"Clear simple solution, beat 90%",
			"vote":"1",
			"content":"```\\nSELECT D.Name as Department, E1.Name as Employee, E1.Salary\\nFROM Employee E1\\nINNER JOIN Employee E2 ON E1.DepartmentId = E2.DepartmentId\\nINNER JOIN Department D ON E1.DepartmentId = D.Id\\nWHERE E1.Salary <= E2.Salary\\nGROUP BY E1.Id\\nHAVING count(DISTINCT E2.Salary) < 4;\\n```"
		},
		{
			"lc_ans_id":"53710",
			"view":"611",
			"top":"8",
			"title":"The expectation on test case 18 is wrong",
			"vote":"1",
			"content":"Input:\\n`\\n{\"headers\": {\"Employee\": [\"Id\"\\n\"Name\"\\n\"Salary\"\\n\"DepartmentId\"]\\n\"Department\": [\"Id\"\\n\"Name\"]}\\n\"rows\": {\"Employee\": [[1\\n\"Joe\"\\n60000\\n1]\\n[2\\n\"Ralph\"\\n50000\\n1]\\n[3\\n\"Joel\"\\n60000\\n1]\\n[4\\n\"Tracy\"\\n75000\\n1]]\\n\"Department\": [[1\\n\"IT\"]]}}`\\n\\nOutput:\\n`\\n{\"headers\": [\"Department\", \"Employee\", \"Salary\"], \"values\": [[\"IT\", \"Tracy\", 75000], [\"IT\", \"Joe\", 60000], [\"IT\", \"Joel\", 60000]]}\\n`\\n\\nExpected:\\n`\\n{\"headers\": [\"Department\", \"Employee\", \"Salary\"], \"values\": [[\"IT\", \"Tracy\", 75000], [\"IT\", \"Joe\", 60000], [\"IT\", \"Joel\", 60000], [\"IT\", \"Ralph\", 50000]]}\\n`\\n\\nThe expectation is 4 rows under 'IT' department, which should be top 3. Isn't it?"
		},
		{
			"lc_ans_id":"53734",
			"view":"609",
			"top":"9",
			"title":"Don't take the test too seriously",
			"vote":"1",
			"content":"select d.Name as Department, e.Name as Employee, e.Salary\\nfrom Employee e, Employee e2, Department d\\nwhere e.DepartmentId = e2.DepartmentId\\nand e.Salary <= e2.Salary\\nand e.DepartmentId = d.Id\\ngroup by e.Id, e.Name, e.Salary, e.DepartmentId, d.Name\\nhaving count(*) <=3\\norder by e.DepartmentId, e.Salary desc;\\n\\n\\n----------\\n\\n\\nThe above is definitely a correct answer and works on MySQL. It should also work for Oracle as well. I tried to use standard SQL only.\\n\\nIt works fine in my database. But when I submit, I got 'Wrong Answer'\\nI figured out some of tests cases try to test top 4, some tried to test top 3. So it will not satisfy all cases."
		}
	],
	"id":"185",
	"title":"Department Top Three Salaries",
	"content":"<p>\r\nThe <code>Employee</code> table holds all employees. Every employee has an Id, and there is also a column for the department Id.</p>\r\n\r\n<pre>\r\n+----+-------+--------+--------------+\r\n| Id | Name  | Salary | DepartmentId |\r\n+----+-------+--------+--------------+\r\n| 1  | Joe   | 70000  | 1            |\r\n| 2  | Henry | 80000  | 2            |\r\n| 3  | Sam   | 60000  | 2            |\r\n| 4  | Max   | 90000  | 1            |\r\n| 5  | Janet | 69000  | 1            |\r\n| 6  | Randy | 85000  | 1            |\r\n+----+-------+--------+--------------+\r\n</pre>\r\n\r\n<p>\r\nThe <code>Department</code> table holds all departments of the company.</p>\r\n<pre>\r\n+----+----------+\r\n| Id | Name     |\r\n+----+----------+\r\n| 1  | IT       |\r\n| 2  | Sales    |\r\n+----+----------+\r\n</pre>\r\n\r\n<p>Write a SQL query to find employees who earn the top three salaries in each of the department. For the above tables, your SQL query should return the following rows.</p>\r\n\r\n<pre>\r\n+------------+----------+--------+\r\n| Department | Employee | Salary |\r\n+------------+----------+--------+\r\n| IT         | Max      | 90000  |\r\n| IT         | Randy    | 85000  |\r\n| IT         | Joe      | 70000  |\r\n| Sales      | Henry    | 80000  |\r\n| Sales      | Sam      | 60000  |\r\n+------------+----------+--------+\r\n</pre>",
	"frequency":"488",
	"ac_num":"19336"
}