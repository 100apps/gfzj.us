{
	"difficulty":"1",
	"submit_num":"5166",
	"show_id":"607",
	"leetcode_id":"607",
	"answers":[
		{
			"lc_ans_id":"104100",
			"view":"88",
			"top":"0",
			"title":"No subquery, simple select from where with right join:)",
			"vote":"1",
			"content":"    select salesperson.name\\n    from orders o join company c on (o.com_id = c.com_id and c.name = 'RED')\\n    right join salesperson on salesperson.sales_id = o.sales_id\\n    where o.sales_id is null"
		},
		{
			"lc_ans_id":"104101",
			"view":"687",
			"top":"1",
			"title":"NOT IN subquery + Left JOIN",
			"vote":"1",
			"content":"```\\nSELECT name\\nFROM salesperson\\nWHERE sales_id NOT IN (\\n    SELECT sales_id\\n    FROM orders LEFT JOIN company \\n    ON orders.com_id = company.com_id\\n    WHERE company.name = 'RED'\\n)\\nORDER BY name\\n```"
		},
		{
			"lc_ans_id":"104099",
			"view":"15",
			"top":"2",
			"title":"Without JOIN",
			"vote":"0",
			"content":"select s.name\\nfrom salesperson s\\nwhere s.sales_id NOT in (select o.sales_id from orders o where o.com_id in (select c.com_id from company c where c.name = 'RED'));"
		},
		{
			"lc_ans_id":"104103",
			"view":"40",
			"top":"3",
			"title":"Simple Solution: Left Join and in subquery beats 92%",
			"vote":"0",
			"content":"select distinct name from\\nsalesperson where name not in\\n(select distinct k.name from\\n(select o.com_id,s.name\\nfrom salesperson s\\nleft join\\norders o\\non s.sales_id = o.sales_id)k\\nwhere k.com_id in(select distinct com_id from company where name='RED'))"
		},
		{
			"lc_ans_id":"104104",
			"view":"51",
			"top":"4",
			"title":"Accepted solution using NOT EXISTS",
			"vote":"0",
			"content":"```\\nSELECT  s.name\\nFROM    salesperson s\\nWHERE   NOT EXISTS (\\n    SELECT  s.name\\n    FROM    company c, orders o\\n    WHERE   s.sales_id = o.sales_id \\n        AND c.com_id = o.com_id\\n        AND c.name = 'RED'\\n    );\\n```"
		},
		{
			"lc_ans_id":"104105",
			"view":"64",
			"top":"5",
			"title":"One normal accepted solution",
			"vote":"0",
			"content":"```\\n\\nSELECT salesperson.name\\nFROM salesperson\\nWHERE salesperson.sales_id NOT IN (\\nSELECT orders.sales_id\\nFROM orders\\nWHERE orders.com_id = (SELECT com_id FROM company WHERE company.name = 'RED'))\\n\\n```"
		},
		{
			"lc_ans_id":"104106",
			"view":"84",
			"top":"6",
			"title":"Simple solution no subquery",
			"vote":"0",
			"content":"```\\nselect S.name\\nfrom company C\\nleft join orders O\\non C.com_id = O.com_id\\nright join salesperson S\\non S.sales_id = O.sales_id\\ngroup by S.name\\nhaving sum(if(C.name = 'RED',1,0)) =0\\n```"
		},
		{
			"lc_ans_id":"104107",
			"view":"161",
			"top":"7",
			"title":"UNION to replace LEFT JOIN",
			"vote":"0",
			"content":"SELECT s.name\\nFROM salesperson s\\nJOIN orders o\\nUSING (sales_id)\\nWHERE s.sales_id NOT IN (\\n    SELECT o.sales_id\\n    FROM orders o, company c\\n    WHERE o.com_id = c.com_id AND c.name='RED'\\n)\\nUNION \\nSELECT s.name\\nFROM salesperson s\\nWHERE s.sales_id NOT IN (\\n    SELECT o.sales_id\\n    FROM orders o\\n)"
		},
		{
			"lc_ans_id":"104102",
			"view":"285",
			"top":"8",
			"title":"Anyone have better idea not using subquery?",
			"vote":"0",
			"content":"```\\nselect s.name from salesperson s\\nwhere s.sales_id not in (\\nselect distinct o.sales_id \\nfrom orders o, company c\\nwhere c.com_id = o.com_id\\nand c.name ='RED')\\n```\\n\\nI firstly want to join salesperson to the subquery where c.name != 'RED'. but it turns out not working. Any one know why?\\n\\nAll comments appreciate."
		},
		{
			"lc_ans_id":"104108",
			"view":"386",
			"top":"9",
			"title":"not sure what goes wrong with this query",
			"vote":"0",
			"content":"```\\nselect distinct s.name\\nfrom salesperson s\\nwhere s.sales_id not in \\n    (select distinct o.sales_id from orders o where o.com_id = 1)\\n```\\n\\nI was trying to use this query which didn't take 'RED' into consideration. It didn't pass some of test cases. I was wondering why. Is it because there could be more than one company named 'RED'?"
		}
	],
	"id":"586",
	"title":"Sales Person",
	"content":"<p><b>Description</b></p>\n<p>\nGiven three tables: <code>salesperson</code>, <code>company</code>, <code>orders</code>.</br>\nOutput all the <b>names</b> in the table <code>salesperson</code>, who didn’t have sales to company 'RED'.\n<p>\n<b>Example</b><br />\n<b>Input</b>\n<p>\nTable: <code>salesperson</code>\n</p>\n<pre>\n+----------+------+--------+-----------------+-----------+\n| sales_id | name | salary | commission_rate | hire_date |\n+----------+------+--------+-----------------+-----------+\n|   1      | John | 100000 |     6           | 4/1/2006  |\n|   2      | Amy  | 120000 |     5           | 5/1/2010  |\n|   3      | Mark | 65000  |     12          | 12/25/2008|\n|   4      | Pam  | 25000  |     25          | 1/1/2005  |\n|   5      | Alex | 50000  |     10          | 2/3/2007  |\n+----------+------+--------+-----------------+-----------+\n</pre>\nThe table <code>salesperson</code> holds the salesperson information. Every salesperson has a <b>sales_id</b> and a <b>name</b>.</br>\n<p>\nTable: <code>company</code>\n</p>\n<pre>\n+---------+--------+------------+\n| com_id  |  name  |    city    |\n+---------+--------+------------+\n|   1     |  RED   |   Boston   |\n|   2     | ORANGE |   New York |\n|   3     | YELLOW |   Boston   |\n|   4     | GREEN  |   Austin   |\n+---------+--------+------------+\n</pre>\nThe table <code>company</code> holds the company information. Every company has a <b>com_id</b> and a <b>name</b>.</br>\n<p>\nTable: <code>orders</code>\n</p>\n<pre>\n+----------+----------+---------+----------+--------+\n| order_id |  date    | com_id  | sales_id | amount |\n+----------+----------+---------+----------+--------+\n| 1        | 1/1/2014 |    3    |    4     | 100000 |\n| 2        | 2/1/2014 |    4    |    5     | 5000   |\n| 3        | 3/1/2014 |    1    |    1     | 50000  |\n| 4        | 4/1/2014 |    1    |    4     | 25000  |\n+----------+----------+---------+----------+--------+\n</pre>\nThe table <code>orders</code> holds the sales record information, salesperson and customer  company are represented by <b>sales_id</b> and <b>com_id</b>.</br>\n\n<p>\n<b>output</b> \n</p>\n<pre>\n+------+\n| name | \n+------+\n| Amy  | \n| Mark | \n| Alex |\n+------+\n</pre>\n<p>\n<b>Explanation</b>\n<p>\nAccording to order '3' and '4' in table <code>orders</code>, it is easy to tell only salesperson 'John' and 'Alex' have sales to company 'RED',</br>so we need to output all the other <b>names</b> in table <code>salesperson</code>.\n</p>",
	"frequency":"51",
	"ac_num":"2625"
}