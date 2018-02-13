{
	"difficulty":"1",
	"submit_num":"142476",
	"show_id":"183",
	"leetcode_id":"183",
	"answers":[
		{
			"lc_ans_id":"53579",
			"view":"14762",
			"top":"0",
			"title":"Three accepted solutions",
			"vote":"60",
			"content":"    SELECT A.Name from Customers A\\n    WHERE NOT EXISTS (SELECT 1 FROM Orders B WHERE A.Id = B.CustomerId)\\n\\n    SELECT A.Name from Customers A\\n    LEFT JOIN Orders B on  a.Id = B.CustomerId\\n    WHERE b.CustomerId is NULL\\n\\n    SELECT A.Name from Customers A\\n    WHERE A.Id NOT IN (SELECT B.CustomerId from Orders B)"
		},
		{
			"lc_ans_id":"53576",
			"view":"4826",
			"top":"1",
			"title":"A solution using NOT IN and another one using LEFT JOIN",
			"vote":"19",
			"content":"605 ms\\n\\n    SELECT Name as Customers from Customers\\n    LEFT JOIN Orders\\n    ON Customers.Id = Orders.CustomerId\\n    WHERE Orders.CustomerId IS NULL;\\n\\n675ms\\n\\n    SELECT Name as Customers from Customers\\n    WHERE Id NOT IN (SELECT CustomerId from Orders);"
		},
		{
			"lc_ans_id":"53586",
			"view":"2815",
			"top":"2",
			"title":"Here are 3 solutions",
			"vote":"6",
			"content":"select c.Name from Customers c\\nwhere c.Id not in (select customerId from Orders)\\n\\nselect c.Name from Customers c\\nwhere (select count(*) from Orders o where o.customerId=c.id)=0 \\n\\nselect c.Name from Customers c\\nwhere not exists (select * from Orders o where o.customerId=c.id)"
		},
		{
			"lc_ans_id":"53596",
			"view":"1418",
			"top":"3",
			"title":"Share My first DB Answer",
			"vote":"5",
			"content":"I learn database from  a Standford tutorial.\\n\\nhttps://www.youtube.com/watch?v=D-k-h0GuFmE&list=PL6hGtHedy2Z4EkgY76QOcueU8lAC4o6c3\\n\\n    select Name as Customers\\n    from Customers\\n    where Id not in\\n    (select CustomerId as Id from Orders);"
		},
		{
			"lc_ans_id":"53582",
			"view":"771",
			"top":"4",
			"title":"A very simple solutions (Beats 100%/Runtime: 474 ms )",
			"vote":"3",
			"content":"select Name as Customers from Customers where id not in(select CustomerId from Orders);"
		},
		{
			"lc_ans_id":"53575",
			"view":"973",
			"top":"5",
			"title":"Using \"distinct\" beats 99% of the solutions",
			"vote":"3",
			"content":"    select \\n    Name \\n    from \\n    (\\n        select \\n        c.Name, \\n        o.CustomerId\\n        from Customers c \\n        left join (select distinct CustomerId from Orders) o \\n        on c.Id=o.CustomerId \\n    ) t \\n    where t.CustomerId is null\\n    ;"
		},
		{
			"lc_ans_id":"53604",
			"view":"1072",
			"top":"6",
			"title":"Just a solution",
			"vote":"3",
			"content":"    select Name as Customers from Customers where Customers.id not in (select CustomerId from Orders);"
		},
		{
			"lc_ans_id":"53569",
			"view":"26",
			"top":"7",
			"title":"Here is my one line solution.",
			"vote":"1",
			"content":"```\\nSELECT Name AS Customers FROM Customers  WHERE Id NOT IN (SELECT CustomerId FROM Orders);\\n```"
		},
		{
			"lc_ans_id":"53594",
			"view":"484",
			"top":"8",
			"title":"SQL solution using subquery",
			"vote":"1",
			"content":"    SELECT Customers.Name\\n    FROM Customers\\n    WHERE Customers.Id NOT IN\\n      (SELECT Orders.CustomerId\\n      FROM Orders);"
		},
		{
			"lc_ans_id":"53595",
			"view":"545",
			"top":"9",
			"title":"My simple solusion with time 600ms using left outer join",
			"vote":"1",
			"content":"    select a.Name as Customers from Customers a left outer join (select distinct CustomerId from Orders) b on a.Id=b.CustomerId where b.CustomerId is null;"
		}
	],
	"id":"183",
	"title":"Customers Who Never Order",
	"content":"<p>\r\nSuppose that a website contains two tables, the <code>Customers</code> table and the <code>Orders</code> table. Write a SQL query to find all customers who never order anything.</p>\r\n\r\n<p>\r\nTable: <code>Customers</code>.</p>\r\n<pre>\r\n+----+-------+\r\n| Id | Name  |\r\n+----+-------+\r\n| 1  | Joe   |\r\n| 2  | Henry |\r\n| 3  | Sam   |\r\n| 4  | Max   |\r\n+----+-------+\r\n</pre>\r\n\r\n<p>\r\nTable: <code>Orders</code>.</p>\r\n<pre>\r\n+----+------------+\r\n| Id | CustomerId |\r\n+----+------------+\r\n| 1  | 3          |\r\n| 2  | 1          |\r\n+----+------------+\r\n</pre>\r\n\r\n<p>Using the above tables as example, return the following:</p>\r\n<pre>\r\n+-----------+\r\n| Customers |\r\n+-----------+\r\n| Henry     |\r\n| Max       |\r\n+-----------+\r\n</pre>",
	"frequency":"296",
	"ac_num":"50444"
}