{
	"difficulty":"1",
	"submit_num":"130813",
	"show_id":"182",
	"leetcode_id":"182",
	"answers":[
		{
			"lc_ans_id":"53528",
			"view":"19499",
			"top":"0",
			"title":"I have this Simple Approach, anybody has some other way",
			"vote":"43",
			"content":"select Email \\nfrom Person \\ngroup by Email \\nhaving count(*) > 1"
		},
		{
			"lc_ans_id":"53553",
			"view":"8018",
			"top":"1",
			"title":"My simple accepted solution",
			"vote":"20",
			"content":"    select Email\\n    from Person\\n    group by Email\\n    having count(*)>1;"
		},
		{
			"lc_ans_id":"53531",
			"view":"6348",
			"top":"2",
			"title":"A solution using a GROUP BY and another one using a self join",
			"vote":"19",
			"content":"914 ms\\n\\n    SELECT Email from Person\\n    Group By Email\\n    Having Count(*) > 1;\\n\\n933 ms\\n\\n    SELECT distinct p1.Email from Person p1\\n    INNER JOIN Person p2\\n    ON p1.Email = p2.Email\\n    WHERE p1.Id <> p2.Id;"
		},
		{
			"lc_ans_id":"53557",
			"view":"3146",
			"top":"3",
			"title":"Share my solution",
			"vote":"15",
			"content":"    Select Email\\n    From Person\\n    GROUP BY Email\\n    Having count(Email)>1"
		},
		{
			"lc_ans_id":"53548",
			"view":"2029",
			"top":"4",
			"title":"Simple solution use Group By",
			"vote":"10",
			"content":"    select Email from Person group by Email having count(Email) > 1;"
		},
		{
			"lc_ans_id":"53551",
			"view":"1255",
			"top":"5",
			"title":"A simple straightforward solution",
			"vote":"4",
			"content":"    select Email from Person group by Email having count(Id) > 1"
		},
		{
			"lc_ans_id":"53546",
			"view":"1104",
			"top":"6",
			"title":"Simple solution (Not bad)",
			"vote":"3",
			"content":"    select distinct(p.Email) \\n    from Person p, Person p1\\n    where (p.Id <> p1.Id and p.Email = p1.Email);"
		},
		{
			"lc_ans_id":"53550",
			"view":"622",
			"top":"7",
			"title":"Standard solution with distinct",
			"vote":"3",
			"content":"    SELECT DISTINCT Person.Email \\n    FROM Person \\n    GROUP BY Person.Email\\n    HAVING COUNT(Person.Email) > 1"
		},
		{
			"lc_ans_id":"53555",
			"view":"728",
			"top":"8",
			"title":"My solution_____",
			"vote":"3",
			"content":"    SELECT Email FROM Person\\n    GROUP BY Email\\n    HAVING COUNT(Email) > 1"
		},
		{
			"lc_ans_id":"53560",
			"view":"872",
			"top":"9",
			"title":"My first accepted SQL solution, using GROUP BY in 845 ms, thank God...",
			"vote":"3",
			"content":"    # Write your MySQL query statement below\\n    select email \\n    from( \\n         select \\n               email, \\n               count(*) as c\\n         from Person\\n         group by email\\n    ) a\\n    where a.c > 1;\\nWe should review and think over other guys' solution frequently, especially for beginners. I think it's significantly helpful~~"
		}
	],
	"id":"182",
	"title":"Duplicate Emails",
	"content":"<p>\r\nWrite a SQL query to find all duplicate emails in a table named <code>Person</code>.</p>\r\n\r\n<pre>\r\n+----+---------+\r\n| Id | Email   |\r\n+----+---------+\r\n| 1  | a@b.com |\r\n| 2  | c@d.com |\r\n| 3  | a@b.com |\r\n+----+---------+\r\n</pre>\r\n\r\n<p>For example, your query should return the following for the above table:</p>\r\n<pre>\r\n+---------+\r\n| Email   |\r\n+---------+\r\n| a@b.com |\r\n+---------+\r\n</pre>\r\n\r\n<p><b>Note</b>: All emails are in lowercase.</p>",
	"frequency":"421",
	"ac_num":"57164"
}