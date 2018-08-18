{
	"difficulty":"2",
	"submit_num":"99885",
	"show_id":"180",
	"leetcode_id":"180",
	"answers":[
		{
			"lc_ans_id":"53418",
			"view":"20586",
			"top":"0",
			"title":"Simple solution",
			"vote":"58",
			"content":"    Select DISTINCT l1.Num from Logs l1, Logs l2, Logs l3 \\n    where l1.Id=l2.Id-1 and l2.Id=l3.Id-1 \\n    and l1.Num=l2.Num and l2.Num=l3.Num"
		},
		{
			"lc_ans_id":"53420",
			"view":"7025",
			"top":"1",
			"title":"Solution with user defined variables",
			"vote":"25",
			"content":"    select DISTINCT num FROM\\n    (select num,\\n    \\tcase \\n    \\t\\twhen @record = num then @count:=@count+1\\n    \\t\\twhen @record <> @record:=num then @count:=1 end as n\\n        from \\n    \\t    Logs ,(select @count:=0,@record:=(SELECT num from Logs limit 0,1)) r\\n    ) a\\n    where a.n>=3"
		},
		{
			"lc_ans_id":"53439",
			"view":"7385",
			"top":"2",
			"title":"An ugly solution",
			"vote":"21",
			"content":"`select distinct(a.Num) from Logs a, Logs b,Logs c where a.Id=b.Id+1 and a.Num=b.Num and b.Id=c.Id+1 and b.Num=c.Num`"
		},
		{
			"lc_ans_id":"53460",
			"view":"6103",
			"top":"3",
			"title":"Accepted solution without joins (works in n-consecutive cases with slight modification)",
			"vote":"13",
			"content":"    select distinct Num from (\\n        select\\n            Num,\\n            case\\n                when @prevNum = Num then @count := @count + 1\\n                when (@prevNum := Num) is not null then @count := 1\\n            end n\\n        from Logs, (select @prevNum := NULL) r\\n        order by Id\\n    ) a where n >= 3"
		},
		{
			"lc_ans_id":"53447",
			"view":"4285",
			"top":"4",
			"title":"Simple sql with join, 1484 ms",
			"vote":"8",
			"content":"    select distinct l1.num\\n    from Logs l1 \\n        join Logs l2 on l1.id=l2.id-1 \\n        join Logs l3 on l1.id=l3.id-2\\n    where l1.num=l2.num and l2.num=l3.num"
		},
		{
			"lc_ans_id":"53467",
			"view":"1651",
			"top":"5",
			"title":"Explanation of consecutive numbers problems",
			"vote":"6",
			"content":"    select distinct r.num  from \\n        (select num,\\n            case when @last = num then @count:=@count+1\\n                when @last<>@last:=num then @count:=1\\n                end as n\\n            from Logs\\n        ) r ,(select @count:=0,@last:=(select num from Logs limit 0,1)) temp\\n    where r.n>=3\\n\\nIn MYSQL , The execution order is : *from \\u2014\\u2014> select  \\u2014\\u2014> where \\u2014\\u2014>group by \\u2014\\u2014> order by*  ,\\n\\nin this case , we initialize two variables in *from* clause , then when our *database engine* scan the table row by row ,we change the two variables , when it meet the condition in *where* clause , we keep it !   That is the logic"
		},
		{
			"lc_ans_id":"53464",
			"view":"2126",
			"top":"6",
			"title":"Solution sharing",
			"vote":"4",
			"content":"select distinct t1.num from Logs t1 join Logs t2 on t1.id+1 = t2.id join Logs t3 on t1.id+2=t3.id where t1.num = t2.num and t2.num = t3.num order by t1.num;"
		},
		{
			"lc_ans_id":"53458",
			"view":"1751",
			"top":"7",
			"title":"Be sure to use \"order by id\"",
			"vote":"3",
			"content":"There is a hidden trap: there is no default record ordering in mysql. So if we say \"numbers that appear at least three times consecutively.\", we better to add \"order by id\" here.\\n\\n[http://stackoverflow.com/questions/8746519/sql-what-is-the-default-order-by-of-queries][1]\\n\\nMy solution:\\n\\n    select 0 Num from dual where (@pre := null) is null and (@count := 1) is null\\n        union all\\n    select distinct t.Num from (select * from Logs order by Id) t\\n    where (@count := if(@pre = t.Num, @count + 1, 1)) > -1 and (@pre := t.Num) is not null and @count = 3\\n        union all\\n    select 0 from dual where (@pre := null) is null and (@count := null) is not null;\\n\\n  [1]: http://stackoverflow.com/questions/8746519/sql-what-is-the-default-order-by-of-queries"
		},
		{
			"lc_ans_id":"53442",
			"view":"347",
			"top":"8",
			"title":"Who said the Id increments by +1?",
			"vote":"2",
			"content":"There has been posted many solutions assuming that next row should be identified with Id = Id + 1. As there is no explicit reference in the condition for that, I considered it is fair to give a generic case solution. It is built around a view that identifies the next element:\\n```\\nCREATE VIEW Next AS\\n    SELECT l2.Id, l2.Num, MIN(l1.Id) as Next\\n    FROM Logs l1, Logs l2\\n    WHERE l1.Id > l2.Id\\n    GROUP BY l2.Id ;\\n```\\nWith the original example it'll produce a rather trivial table:\\n```\\n+------+------+------+\\n|  Id  |  Num | Next |\\n+------+------+------+\\n|   1  |   1  |   2  |\\n|   2  |   1  |   3  |\\n|   3  |   1  |   4  |\\n|   4  |   2  |   5  |\\n|   5  |   1  |   6  |\\n|   6  |   2  |   7  |\\n+------+------+------+\\n```\\nAnother view appends a value for the next element:\\n```\\nCREATE VIEW NextNum AS\\n    SELECT n.Id, n.Num, n.Next, l.Num as NextNum\\n    FROM Logs l, Next n\\n    WHERE l.Id = n.Next ;\\n```\\nAnd the last query finally \\n```\\nSELECT DISTINCT n.Num\\nFROM NextNum n, NextNum nn\\nWHERE nn.Id = n.Next AND n.Num = n.NextNum AND n.NextNum = nn.NextNum ;\\n```\\nUnfortunately, creating a view is denied by the OJ: \"CREATE VIEW command denied to user 'student'@'localhost' for table 'Next'\".\\nOtherwise it seems reasonable solution working on my private MySQL DB just fine."
		},
		{
			"lc_ans_id":"53435",
			"view":"526",
			"top":"9",
			"title":"Why Run Time Error",
			"vote":"2",
			"content":"Hi all,\\n\\nI'm new to MySQL. I don't quite understand why below query gives run time error?\\n\\nselect L1.Num as ConsecutiveNums from Logs L1, Logs L2, Logs L3\\nWhere L1.Id=L2.Id-1 and L2.Id=L3.Id-1 \\nand L1.Num=L2.Num and L2.Num=L3.Num\\n\\nThank you!"
		}
	],
	"id":"180",
	"title":"Consecutive Numbers",
	"content":"<p>\r\nWrite a SQL query to find all numbers that appear at least three times consecutively.</p>\r\n\r\n<pre>\r\n+----+-----+\r\n| Id | Num |\r\n+----+-----+\r\n| 1  |  1  |\r\n| 2  |  1  |\r\n| 3  |  1  |\r\n| 4  |  2  |\r\n| 5  |  1  |\r\n| 6  |  2  |\r\n| 7  |  2  |\r\n+----+-----+\r\n</pre>\r\n\r\n<p>For example, given the above <code>Logs</code> table, <code>1</code> is the only number that appears consecutively for at least three times.</p>\r\n\r\n<pre>\r\n+-----------------+\r\n| ConsecutiveNums |\r\n+-----------------+\r\n| 1               |\r\n+-----------------+\r\n</pre>",
	"frequency":"458",
	"ac_num":"26445"
}