{
	"difficulty":"3",
	"submit_num":"2575",
	"show_id":"615",
	"leetcode_id":"615",
	"answers":[
		{
			"lc_ans_id":"104242",
			"view":"513",
			"top":"0",
			"title":"My solution using LEFT JOIN",
			"vote":"2",
			"content":"```\\nSELECT d1.pay_month, d1.department_id, \\nCASE WHEN d1.department_avg > c1.company_avg THEN 'higher'\\n     WHEN d1.department_avg < c1.company_avg THEN 'lower'\\n     ELSE 'same'\\nEND AS 'comparison'\\nFROM ((SELECT LEFT(s1.pay_date, 7) pay_month, e1.department_id, AVG(s1.amount) department_avg\\nFROM salary s1\\nJOIN employee e1 ON s1.employee_id = e1.employee_id\\nGROUP BY pay_month, e1.department_id) d1\\nLEFT JOIN (SELECT LEFT(pay_date, 7) pay_month, AVG(amount) company_avg\\nFROM salary\\nGROUP BY pay_month) c1 ON d1.pay_month = c1.pay_month)\\nORDER BY pay_month DESC, department_id;\\n```"
		},
		{
			"lc_ans_id":"104245",
			"view":"356",
			"top":"1",
			"title":"AC solution using join",
			"vote":"1",
			"content":"```\\nselect A.pay_m pay_month, A.department_id,IF(A.amt=B.amt,'same',if(A.amt>b.amt,'higher','lower') ) comparison from \\n\\n(select pay_m, department_id, avg(amount) amt from (select *,left(pay_date,7) pay_m from \\nsalary) S join employee E on S.employee_id = E.employee_id group by pay_m, department_id)   A\\n\\njoin\\n\\n(select pay_m, avg(amount) amt from (select *,left(pay_date,7) pay_m from salary) T1 group by pay_m) B \\n\\non A.pay_m = B.pay_m\\n```"
		},
		{
			"lc_ans_id":"104241",
			"view":"39",
			"top":"2",
			"title":"Straightforward solution beats 100% with explanation",
			"vote":"0",
			"content":"The idea is straightforward but need carefulness: first create two derived tables: one is (month, company_average) and the other is (month, dept, dept_average). Then, we join these two tables on month, and make selection base on our needs. It is super fast and beats 100%.\\n\\n```\\nselect group_average.pay_month, group_average.department_id, if(group_average.group_avg > company_average.comp_avg, \"higher\", \\n                                                        if(group_average.group_avg < company_average.comp_avg, \"lower\", \"same\"))\\n                                                        as comparison\\nfrom\\n(select pay_month, avg(amount) as comp_avg\\nfrom (select id, employee_id, amount, date_format(pay_date, \"%Y-%m\") as pay_month from salary) as tmp\\ngroup by pay_month) as company_average, \\n(select pay_month, department_id, avg(amount) as group_avg\\nfrom (select id, employee_id, amount, date_format(pay_date, \"%Y-%m\") as pay_month from salary) as s join employee e on s.employee_id = e.employee_id\\ngroup by pay_month, department_id) as group_average\\nwhere company_average.pay_month = group_average.pay_month\\n```"
		},
		{
			"lc_ans_id":"104244",
			"view":"78",
			"top":"3",
			"title":"Why this one can pass only 5/7 ?",
			"vote":"0",
			"content":"select u.pay_date as pay_month, u.department_id, averaged, tt,\\ncase when averaged > tt then \"higher\"\\nwhen averaged < tt then \"lower\"\\nelse \"same\" end as comparison \\nfrom \\n(SELECT pay_date, department_id, AVG(amount) as averaged from \\n(SELECT date_format(s.pay_date, '%Y-%m') as pay_date, e.department_id, s.amount from salary s join employee e \\non s.employee_id=e.employee_id) x\\ngroup by department_id, pay_date order by pay_date DESC, department_id ASC) u,\\n(SELECT date_format(pay_date, '%Y-%m') as pay_date, AVG(amount) as tt from salary group by pay_date) i where u.pay_date = i.pay_date"
		},
		{
			"lc_ans_id":"104243",
			"view":"190",
			"top":"4",
			"title":"My solution + commentary",
			"vote":"0",
			"content":"```\\n# Write your MySQL query statement below\\nSELECT\\n        departments.pay_month, \\n        departments.department_id, \\n        CASE WHEN departments.average > company.average THEN 'higher'\\n            WHEN departments.average = company.average THEN 'same'\\n            ELSE 'lower' END AS comparison\\nFROM (SELECT LEFT(s1.pay_date, 7) AS pay_month,\\n            e1.department_id, \\n            COALESCE(AVG (s1.amount), 0) AS average\\n    FROM salary s1\\n    LEFT JOIN employee e1 ON s1.employee_id = e1.employee_id\\n    GROUP BY pay_month, department_id\\n) departments\\nLEFT JOIN (\\n    SELECT LEFT(pay_date, 7) AS pay_month, AVG(amount) AS average\\n    FROM salary \\n    LEFT JOIN employee \\n        ON salary.employee_id = employee.employee_id\\n    GROUP BY pay_month \\n) company \\nON company.pay_month = departments.pay_month \\nORDER BY pay_month, department_id ASC\\n```\\n\\nIt looks like the output in the problem description does not match the expected output of the test cases. In the problem description, the output appears to be in DESC order."
		}
	],
	"id":"594",
	"title":"Average Salary: Departments VS Company",
	"content":"Given two tables as below, write a query to display the comparison result (higher/lower/same) of the average salary of employees in a department to the company's average salary.</p>\r\n\r\nTable: <code>salary</code>\r\n<pre>\r\n| id | employee_id | amount | pay_date   |\r\n|----|-------------|--------|------------|\r\n| 1  | 1           | 9000   | 2017-03-31 |\r\n| 2  | 2           | 6000   | 2017-03-31 |\r\n| 3  | 3           | 10000  | 2017-03-31 |\r\n| 4  | 1           | 7000   | 2017-02-28 |\r\n| 5  | 2           | 6000   | 2017-02-28 |\r\n| 6  | 3           | 8000   | 2017-02-28 |\r\n</pre></p>\r\n\r\nThe <b>employee_id</b> column refers to the <b>employee_id</b> in the following table <code>employee</code>.</p>\r\n<pre>\r\n| employee_id | department_id |\r\n|-------------|---------------|\r\n| 1           | 1             |\r\n| 2           | 2             |\r\n| 3           | 2             |\r\n</pre></p>\r\n\r\nSo for the sample data above, the result is:</p>\r\n<pre>\r\n| pay_month | department_id | comparison  |\r\n|-----------|---------------|-------------|\r\n| 2017-03   | 1             | higher      |\r\n| 2017-03   | 2             | lower       |\r\n| 2017-02   | 1             | same        |\r\n| 2017-02   | 2             | same        |\r\n</pre></p>\r\n\r\n<b>Explanation</b></p>\r\nIn March, the company's average salary is (9000+6000+10000)/3 = 8333.33...</p>\r\nThe average salary for department '1' is 9000, which is the salary of <b>employee_id</b> '1' since there is only one employee in this department. So the comparison result is 'higher' since 9000 > 8333.33 obviously.</p>\r\nThe average salary of department '2' is (6000 + 10000)/2 = 8000, which is the average of <b>employee_id</b> '2' and '3'. So the comparison result is 'lower' since 8000 < 8333.33.</p>\r\nWith he same formula for the average salary comparison in February, the result is 'same' since both the department '1' and '2' have the same average salary with the company, which is 7000.</p>",
	"frequency":"28",
	"ac_num":"814"
}