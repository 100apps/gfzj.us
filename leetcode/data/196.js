{
	"difficulty":"1",
	"submit_num":"157741",
	"show_id":"196",
	"leetcode_id":"196",
	"answers":[
		{
			"lc_ans_id":"55553",
			"view":"23062",
			"top":"0",
			"title":"Simple Solution",
			"vote":"121",
			"content":"> DELETE p1  \\nFROM Person p1, Person p2  \\nWHERE p1.Email = p2.Email AND\\n>               p1.Id > p2.Id\\n\\nEXPLANATION:\\n\\n - Take the table in the example\\n \\n**Id | Email**\\n\\n**1 | john@example.com** \\n\\n**2 | bob@example.com** \\n\\n**3 | john@example.com**\\n\\n - Join the table on itself by the Email and you'll get:\\n\\n> FROM Person p1, Person p2  WHERE p1.Email = p2.Email\\n\\n**p1.Id  | p1.Email | p2.Id | p2.Email**\\n\\n**1\\t| john@example.com\\t| 1\\t| john@example.com**\\n\\n**3\\t| john@example.com      | 1\\t| john@example.com**\\n\\n**2\\t| bob@example.com\\t| 2\\t| bob@example.com**\\n\\n**1\\t| john@example.com\\t| 3\\t| john@example.com**\\n\\n**3\\t| john@example.com\\t| 3\\t| john@example.com**\\n\\n - From this results filter the records that have p1.Id>p2.ID, in this case you'll get just one record:\\n\\n> AND           p1.Id > p2.Id\\n\\n**p1.Id  | p1.Email | p2.Id | p2.Email**\\n\\n**3\\t| john@example.com\\t| 1\\t| john@example.com**\\n\\n - This is the record we need to delete, and by saying\\n\\n> DELETE p1\\n\\nin this multiple-table syntax, only matching rows from the tables listed before the FROM clause are deleted, in this case just\\n\\n**p1.Id  | p1.Email**\\n\\n**3\\t| john@example.com**\\n\\nwill be deleted"
		},
		{
			"lc_ans_id":"55614",
			"view":"5216",
			"top":"1",
			"title":"A skillful mysql solution  avoid \" select and update conflict\"",
			"vote":"22",
			"content":"**where we try this clause :**\\n\\n    delete from Person where id not in(select min(id) as id from Person group by email)\\n\\nyou will be noted \" **You can't specify target table 'Person' for update in FROM clause** \",\\nThe solution is using a middle table with select clause:\\n\\n    delete from Person where id not in( \\n        select t.id from (\\n            select min(id) as id from Person group by email\\n        ) t\\n    )"
		},
		{
			"lc_ans_id":"55591",
			"view":"9863",
			"top":"2",
			"title":"Solution in a Single query without any conflicts",
			"vote":"20",
			"content":"    DELETE p from Person p, Person q where p.Id>q.Id AND q.Email=p.Email \\n\\nwill keep the minimum id field"
		},
		{
			"lc_ans_id":"55555",
			"view":"4458",
			"top":"3",
			"title":"I can't believe I get it wrong! What's wrong with my code?",
			"vote":"16",
			"content":"select email,min(id) from Person group by email\\n\\nThis is very simple sql right? How's possible it return duplicate emails?"
		},
		{
			"lc_ans_id":"55568",
			"view":"7138",
			"top":"4",
			"title":"A simple AC solution.",
			"vote":"15",
			"content":"delete from Person where Id not in ( select A.Id from (select min(Id) as Id from Person GROUP BY Email) A )"
		},
		{
			"lc_ans_id":"55588",
			"view":"2353",
			"top":"5",
			"title":"My answer to Delete Duplicate Emails with double nested query.",
			"vote":"9",
			"content":"    delete from Person where Id not in \\n    (select min_id from \\n    (select min(Id) as min_id from Person group by Email) \\n    as Cid) ;\\n\\nRefer here: http://stackoverflow.com/questions/45494/mysql-error-1093-cant-specify-target-table-for-update-in-from-clause"
		},
		{
			"lc_ans_id":"55565",
			"view":"3780",
			"top":"6",
			"title":"~745 ms solution beats 97%+ submissions",
			"vote":"8",
			"content":"    delete from \\n    Person\\n    where  \\n    Id not in (select Id \\n               from \\n                (select min(Id) as Id \\n                 from Person \\n                 group by Email\\n                ) p\\n              );"
		},
		{
			"lc_ans_id":"55592",
			"view":"2552",
			"top":"7",
			"title":"Very easy to understand",
			"vote":"6",
			"content":"    # Write your MySQL query statement below\\nDELETE p2 FROM Person p1, Person p2\\nWHERE p1.Email = p2. Email AND p1.Id < p2.Id"
		},
		{
			"lc_ans_id":"55585",
			"view":"846",
			"top":"8",
			"title":"Why this does not work?",
			"vote":"5",
			"content":"Select min(Id) as Id, Email\\nfrom Person\\ngroup by Email"
		},
		{
			"lc_ans_id":"55595",
			"view":"1493",
			"top":"9",
			"title":"I run the solution in Mysql and get the result expected",
			"vote":"5",
			"content":"delete from Person where id not in (select id from (select min(id) as id from Person group by email) as a);"
		}
	],
	"id":"196",
	"title":"Delete Duplicate Emails",
	"content":"<p>\r\nWrite a SQL query to delete all duplicate email entries in a table named <code>Person</code>, keeping only unique emails based on its <i>smallest</i> <b>Id</b>.</p>\r\n\r\n<pre>\r\n+----+------------------+\r\n| Id | Email            |\r\n+----+------------------+\r\n| 1  | john@example.com |\r\n| 2  | bob@example.com  |\r\n| 3  | john@example.com |\r\n+----+------------------+\r\nId is the primary key column for this table.\r\n</pre>\r\n\r\n<p>For example, after running your query, the above <code>Person</code> table should have the following rows:</p>\r\n<pre>\r\n+----+------------------+\r\n| Id | Email            |\r\n+----+------------------+\r\n| 1  | john@example.com |\r\n| 2  | bob@example.com  |\r\n+----+------------------+\r\n</pre>",
	"frequency":"399",
	"ac_num":"37497"
}