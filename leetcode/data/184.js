{
	"difficulty":"2",
	"submit_num":"139034",
	"show_id":"184",
	"leetcode_id":"184",
	"answers":[
		{
			"lc_ans_id":"53607",
			"view":"15304",
			"top":"0",
			"title":"Three accpeted solutions",
			"vote":"54",
			"content":"    SELECT D.Name AS Department ,E.Name AS Employee ,E.Salary \\n    FROM\\n    \\tEmployee E,\\n    \\t(SELECT DepartmentId,max(Salary) as max FROM Employee GROUP BY DepartmentId) T,\\n    \\tDepartment D\\n    WHERE E.DepartmentId = T.DepartmentId \\n      AND E.Salary = T.max\\n      AND E.DepartmentId = D.id\\n\\n    SELECT D.Name,A.Name,A.Salary \\n    FROM \\n    \\tEmployee A,\\n    \\tDepartment D   \\n    WHERE A.DepartmentId = D.Id \\n      AND NOT EXISTS \\n      (SELECT 1 FROM Employee B WHERE B.Salary > A.Salary AND A.DepartmentId = B.DepartmentId) \\n\\n    SELECT D.Name AS Department ,E.Name AS Employee ,E.Salary \\n    from \\n    \\tEmployee E,\\n    \\tDepartment D \\n    WHERE E.DepartmentId = D.id \\n      AND (DepartmentId,Salary) in \\n      (SELECT DepartmentId,max(Salary) as max FROM Employee GROUP BY DepartmentId)"
		},
		{
			"lc_ans_id":"53608",
			"view":"7617",
			"top":"1",
			"title":"Simple solution, easy to understand",
			"vote":"26",
			"content":"    SELECT dep.Name as Department, emp.Name as Employee, emp.Salary \\n    from Department dep, Employee emp \\n    where emp.DepartmentId=dep.Id \\n    and emp.Salary=(Select max(Salary) from Employee e2 where e2.DepartmentId=dep.Id)"
		},
		{
			"lc_ans_id":"53670",
			"view":"3568",
			"top":"2",
			"title":"Sharing my simple solution",
			"vote":"18",
			"content":"    Select Department.Name, emp1.Name, emp1.Salary from \\n    Employee emp1 join Department on emp1.DepartmentId = Department.Id\\n    where emp1.Salary = (Select Max(Salary) from Employee emp2 where emp2.DepartmentId = emp1.DepartmentId);"
		},
		{
			"lc_ans_id":"53612",
			"view":"2525",
			"top":"3",
			"title":"GROUP BY HAVING not working for multiple highest salary, why?",
			"vote":"11",
			"content":"`SELECT b.Name as Department, a.Name as Employee, a.Salary\\nFROM Employee a\\nJOIN Department b\\nON a.DepartmentId = b.Id\\nGROUP BY Department\\nHAVING a.Salary = max(a.Salary)`\\n\\nThis way it was not able to return multiple rows with same highest salary. I can't figure why, please help!"
		},
		{
			"lc_ans_id":"53658",
			"view":"2533",
			"top":"4",
			"title":"Easy Solution. No joins. GROUP BY is enough. 916ms",
			"vote":"7",
			"content":"    select\\n    d.Name, e.Name, e.Salary\\n    from\\n    Department d,\\n    Employee e,\\n    (select MAX(Salary) as Salary,  DepartmentId as DepartmentId from Employee GROUP BY DepartmentId) h\\n    where\\n    e.Salary = h.Salary and\\n    e.DepartmentId = h.DepartmentId and\\n    e.DepartmentId = d.Id;"
		},
		{
			"lc_ans_id":"53676",
			"view":"1440",
			"top":"5",
			"title":"Share my simple query using >= ALL",
			"vote":"7",
			"content":"<PRE><CODE>\\nselect Department.Name as Department, e1.Name as Employee, Salary\\nfrom Employee e1, Department\\nwhere e1.DepartmentId = Department.Id \\nand\\nSalary >= ALL (select Salary from Employee e2 where e2.DepartmentId = e1.DepartmentId);\\n</CODE></PRE>"
		},
		{
			"lc_ans_id":"53609",
			"view":"1364",
			"top":"6",
			"title":"Why cannot we just use max() with group by?",
			"vote":"6",
			"content":"    select D.name as Department, E.name as Employee, max(salary) as Salary \\n        from Employee E , Department D \\n        where E.DepartmentId = D.Id  \\n        group by D.id\\n\\nI tried to use something like this, but it did not pass. When two departments has the same max salary, it only outputs one row.\\n\\nHowever, this is not how it works in my local mysql.\\n\\nWhy is this wrong?"
		},
		{
			"lc_ans_id":"53647",
			"view":"796",
			"top":"7",
			"title":"A simple solution use one join",
			"vote":"5",
			"content":"select d.Name Department, e.Name Employee, Salary\\nfrom Department d join Employee e on d.Id=e.DepartmentId\\nwhere (Salary,d.id) in (select max(Salary),DepartmentId from Employee group by DepartmentId);"
		},
		{
			"lc_ans_id":"53610",
			"view":"154",
			"top":"8",
			"title":"My best solution, super clean, no subquery, no Max",
			"vote":"4",
			"content":"Oftentimes those interviewers won't allow you to write subquery~\\n\\n**Return the highest salary for each department**\\n\\n      SELECT D.Name as Department, E.Name as Employee, E.Salary \\n      FROM Department D, Employee E, Employee E2  \\n      WHERE D.ID = E.DepartmentId and E.DepartmentId = E2.DepartmentId and \\n      E.Salary <= E2.Salary\\n      group by D.ID,E.Name having count(distinct E2.Salary) = 1\\n      order by D.Name desc\\n\\n**Follow up, return the secondary salary for each department**\\n\\n       SELECT D.Name as Department, E.Name as Employee, E.Salary \\n       FROM Department D, Employee E, Employee E2  \\n       WHERE D.ID = E.DepartmentId and E.DepartmentId = E2.DepartmentId and \\n       E.Salary < E2.Salary\\n       group by D.ID,E.Name having count(distinct E2.Salary) = 1\\n       order by D.Name desc"
		},
		{
			"lc_ans_id":"53682",
			"view":"655",
			"top":"9",
			"title":"Accepted Solution without using Max() function",
			"vote":"3",
			"content":"    select b.Name Department, a.Name Employee, a.Salary from\\n    (\\n        select a.Name, a.Salary, a.DepartmentId \\n        from Employee a left outer join Employee b\\n        on a.DepartmentId = b.DepartmentId \\n        and a.Salary < b.Salary\\n        where b.Id is null\\n    ) a join Department b\\n    on a.DepartmentId = b.Id;"
		}
	],
	"id":"184",
	"title":"Department Highest Salary",
	"content":"<p>\r\nThe <code>Employee</code> table holds all employees. Every employee has an Id, a salary, and there is also a column for the department Id.</p>\r\n\r\n<pre>\r\n+----+-------+--------+--------------+\r\n| Id | Name  | Salary | DepartmentId |\r\n+----+-------+--------+--------------+\r\n| 1  | Joe   | 70000  | 1            |\r\n| 2  | Henry | 80000  | 2            |\r\n| 3  | Sam   | 60000  | 2            |\r\n| 4  | Max   | 90000  | 1            |\r\n+----+-------+--------+--------------+\r\n</pre>\r\n\r\n<p>\r\nThe <code>Department</code> table holds all departments of the company.</p>\r\n<pre>\r\n+----+----------+\r\n| Id | Name     |\r\n+----+----------+\r\n| 1  | IT       |\r\n| 2  | Sales    |\r\n+----+----------+\r\n</pre>\r\n\r\n<p>Write a SQL query to find employees who have the highest salary in each of the departments. For the above tables, Max has the highest salary in the IT department and Henry has the highest salary in the Sales department.</p>\r\n\r\n<pre>\r\n+------------+----------+--------+\r\n| Department | Employee | Salary |\r\n+------------+----------+--------+\r\n| IT         | Max      | 90000  |\r\n| Sales      | Henry    | 80000  |\r\n+------------+----------+--------+\r\n</pre>",
	"frequency":"342",
	"ac_num":"30490"
}