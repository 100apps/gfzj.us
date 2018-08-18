{
	"difficulty":"3",
	"submit_num":"2666",
	"show_id":"569",
	"leetcode_id":"569",
	"answers":[
		{
			"lc_ans_id":"102691",
			"view":"954",
			"top":"0",
			"title":"The improvement to the editorial solution",
			"vote":"3",
			"content":"```\\nselect Id, Company, Salary from\\n(\\nselect e.Id, e.Salary, e.Company,  if( @prev = e.Company , @Rank := @Rank + 1, @Rank := 1) as rank, @prev := e.Company\\nfrom Employee e , (select @Rank := 0, @prev := 0) as temp order by e.Company, e.Salary, e.Id\\n) Ranking\\nINNER JOIN\\n(\\nselect count(*) as totalcount, Company as name from Employee e2 group by e2.Company\\n) companycount\\non companycount.name = Ranking.Company\\nwhere Rank = floor((totalcount+1)/2) or Rank = floor((totalcount+2)/2)\\n```\\nAt this time(6/28/2017) the second one in editorial solution seems to have problem as it didn't declare the temp variable, which cause the rank to be always one, this code is the improvement to the editorial solution, which solve the problem and pass the test case."
		},
		{
			"lc_ans_id":"102693",
			"view":"309",
			"top":"1",
			"title":"Query by Counting Smaller and Larger Elements.",
			"vote":"1",
			"content":"```\\n# Write your MySQL query statement below\\nselect T1.Id, T1.Company, T1.Salary\\nfrom \\n(select count(t2.id) as c1, t1.id, t1.Salary, t1.Company\\nfrom Employee as t1 left join Employee as t2\\non (t1.Salary < t2.Salary or t1.Salary = t2.Salary and t1.Id < t2.Id) and t1.Company = t2.Company\\ngroup by t1.id\\n) as T1 \\njoin\\n(select count(t2.id) as c2, t1.id, t1.Salary, t1.Company\\nfrom Employee as t1 left join Employee as t2\\non (t1.Salary > t2.Salary or t1.Salary = t2.Salary and t1.Id > t2.Id) and t1.Company = t2.Company\\ngroup by t1.id) as T2 \\non T1.id = T2.id\\njoin\\n(select count(id) as c3, Company\\nfrom Employee\\ngroup by Company) as T3 \\non T1.Company = T3.Company\\nwhere T1.c1 <= T3.c3/2 and T2.c2 <= T3.c3/2\\norder by Company, Salary\\n```"
		},
		{
			"lc_ans_id":"102687",
			"view":"67",
			"top":"2",
			"title":"AC solution, similar to LC571",
			"vote":"0",
			"content":"Credit to https://discuss.leetcode.com/topic/104903/easy-peasy\\n\\n>set @a = 0, @b = 0, @c = 0;\\nselect t1.Id,t1.Company,t1.Salary\\nfrom (select @a := @a + 1 as newId,Id,Company,Salary from Employee order by Company,Salary) t1\\nwhere 1>=abs(\\n(select count(*) from (select @b := @b + 1 as newId,Company,Salary from Employee order by Company,Salary) t2 where t1.Company = t2.Company and t1.newId <= t2.newId and t1.Salary<=t2.Salary) -\\n(select count(*) from (select @c := @c + 1 as newId,Company,Salary from Employee order by Company,Salary) t2 where t1.Company = t2.Company and t1.newId >= t2.newId and t1.Salary>=t2.Salary)\\n)\\norder by t1.Company,t1.Salary"
		},
		{
			"lc_ans_id":"102688",
			"view":"256",
			"top":"3",
			"title":"Solution without in-built function",
			"vote":"0",
			"content":"```\\nSET @A = 0;\\nSET @B = 0;\\nSELECT MIN(T1.ID) AS ID, T1.COMPANY AS COMPANY, T1.SALARY\\nFROM (SELECT ID, COMPANY, SALARY, @A := @A + 1 AS VID FROM EMPLOYEE ORDER BY COMPANY ASC, SALARY ASC) T1,\\n     (SELECT ID, COMPANY, SALARY, @B := @B + 1 AS VID FROM EMPLOYEE ORDER BY COMPANY ASC, SALARY DESC) T2\\nWHERE (T1.VID = T2.VID OR T1.VID = T2.VID -1 OR T1.VID = T2.VID + 1) AND T1.ID = T2.ID\\nGROUP BY T1.COMPANY, T1.SALARY\\n```"
		},
		{
			"lc_ans_id":"102690",
			"view":"164",
			"top":"4",
			"title":"7/9 test cases, and stumped",
			"vote":"0",
			"content":"I'm trying to get my intuitive approach correct (prior to having looked at Solution)... can someone help me debug?\\n\\n```\\nSET @rank = 0;\\n\\nSELECT ranked.Id, ranked.Company, ranked.Salary\\nFROM (\\n    SELECT CASE WHEN @rank >= (\\n                        SELECT COUNT(*)\\n                        FROM Employee e2\\n                        WHERE e2.Company = e1.Company\\n                        )\\n            THEN @rank:=1\\n            ELSE @rank:=@rank+1 END AS col_index,\\n        Id, Company, Salary\\n    FROM Employee e1\\n    ORDER BY Company, Salary, Id\\n) ranked\\n\\nLEFT JOIN\\n\\n(SELECT Company, FLOOR((COUNT(*)+1)/2) AS left_index, FLOOR((COUNT(*)+2)/2) AS right_index\\nFROM Employee\\nGROUP BY Company) indexes\\n\\nON indexes.Company = ranked.Company \\nWHERE indexes.left_index = ranked.col_index OR indexes.right_index = ranked.col_index\\n\\n```\\n\\nAs a side note, I think the problem could be better specified. \\n* When a list is even, the median should be the average of the two middle numbers. \\n* What if there are more than two employees in a company with the median salary value? They way this problem is framed, we could not reliably come up with the same Id numbers (unless we sort by Id in the ranking, but this is an uncorrelated field)."
		},
		{
			"lc_ans_id":"102686",
			"view":"1041",
			"top":"5",
			"title":"simple solution",
			"vote":"0",
			"content":"```\\nselect min(id) id, company, salary from (select a.id, a.company, a.salary from employee a, employee b \\nwhere a.company = b.company \\ngroup by a.company, a.salary,a.id having sum(sign(1-sign(a.salary-b.salary))) = floor((count(*)+1)/2) or sum(sign(1-sign(a.salary-b.salary))) = ceil((count(*)+1)/2) ) m group by company, salary\\n```"
		},
		{
			"lc_ans_id":"102692",
			"view":"342",
			"top":"6",
			"title":"By ranking the salary by groups",
			"vote":"0",
			"content":"'''\\nselect c.Id,c.Company, c.Salary from (\\nselect a.Id, a.Salary,b.number,b.Company\\n, (CASE a.Company \\n         WHEN @curType THEN @curRow := @curRow + 1 \\n         ELSE @curRow := 1 AND @curType := a.Company END\\n              ) + 1 AS rank\\n   \\nfrom (select Id, Company, Salary from employee order by Company, Salary, Id) a\\ninner join (SELECT @curRow := 0, @curType := '') r\\ninner join \\n(select Company, count(salary) as number from employee \\ngroup by Company ) b\\non a.Company=b.Company\\n) c\\n\\nwhere case when c.number%2=0 then c.rank=c.number/2 or c.rank=c.number/2+1\\n      else c.rank=round(c.number/2)\\n      end\\n'''"
		},
		{
			"lc_ans_id":"102694",
			"view":"430",
			"top":"7",
			"title":"subqueries counting number of employees below and above",
			"vote":"0",
			"content":"this is pretty slow, but has been accepted. \\nThe idea is that the difference between the number of employees below and above in terms of salary either results in 0 (when odd number of employees work at the company) or 1 (when even number of employees work at the company).\\nAnother key idea is that when you have equal salaries, you still need an ordering to be defined in order to have the numbers add up - the only thing I could use was the Id of the employees as a secondary order.\\n\\n```\\nselect * from Employee a \\nwhere \\n    1 >= abs((select count(*) from Employee b where a.company = b.company and a.salary > b.salary or (a.salary = b.salary and a.id > b.id)) - \\n    (select count(*) from Employee b where a.company = b.company and a.salary < b.salary or (a.salary = b.salary and a.id < b.id)))\\n```"
		},
		{
			"lc_ans_id":"102695",
			"view":"646",
			"top":"8",
			"title":"By using variables",
			"vote":"0",
			"content":"```\\nselect tmp.Id, tmp.Company, tmp.Salary from\\n(\\nselect tmpOrder.Id, tmpOrder.Company, tmpOrder.Salary, IF(@prev=tmpOrder.Company, @rank:=@rank+1, @rank:=1) as Rank,\\n@prev := tmpOrder.Company as prevC,\\ntmpOrder.Cnt\\nfrom (select @rank:=0, @prev:=null) as r,\\n(select b.Id, b.Company, b.Salary,tmpCount.Cnt \\nfrom Employee as b, \\n(select a.Company, count(*) as Cnt\\nfrom Employee as a\\ngroup by a.Company) as tmpCount\\nwhere tmpCount.Company = b.Company\\norder by b.Company,b.Salary) tmpOrder\\n) as tmp\\nwhere Floor((Cnt + 1) / 2) = Rank or Ceil((Cnt + 1) / 2) = Rank\\n```"
		}
	],
	"id":"550",
	"title":"Median Employee Salary",
	"content":"<p>\r\nThe <code>Employee</code> table holds all employees. The employee table has three columns: Employee Id, Company Name, and Salary.</p>\r\n\r\n<pre>\r\n+-----+------------+--------+\r\n|Id   | Company    | Salary |\r\n+-----+------------+--------+\r\n|1    | A          | 2341   |\r\n|2    | A          | 341    |\r\n|3    | A          | 15     |\r\n|4    | A          | 15314  |\r\n|5    | A          | 451    |\r\n|6    | A          | 513    |\r\n|7    | B          | 15     |\r\n|8    | B          | 13     |\r\n|9    | B          | 1154   |\r\n|10   | B          | 1345   |\r\n|11   | B          | 1221   |\r\n|12   | B          | 234    |\r\n|13   | C          | 2345   |\r\n|14   | C          | 2645   |\r\n|15   | C          | 2645   |\r\n|16   | C          | 2652   |\r\n|17   | C          | 65     |\r\n+-----+------------+--------+\r\n</pre>\r\n\r\n<p>Write a SQL query to find the median salary of each company. Bonus points if you can solve it without using any built-in SQL functions.</p>\r\n\r\n<pre>\r\n+-----+------------+--------+\r\n|Id   | Company    | Salary |\r\n+-----+------------+--------+\r\n|5    | A          | 451    |\r\n|6    | A          | 513    |\r\n|12   | B          | 234    |\r\n|9    | B          | 1154   |\r\n|14   | C          | 2645   |\r\n+-----+------------+--------+\r\n</pre>",
	"frequency":"73",
	"ac_num":"959"
}