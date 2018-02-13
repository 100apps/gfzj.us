{
	"difficulty":"1",
	"submit_num":"136736",
	"show_id":"197",
	"leetcode_id":"197",
	"answers":[
		{
			"lc_ans_id":"55619",
			"view":"19474",
			"top":"0",
			"title":"Simple Solution",
			"vote":"59",
			"content":"    SELECT wt1.Id \\n    FROM Weather wt1, Weather wt2\\n    WHERE wt1.Temperature > wt2.Temperature AND \\n          TO_DAYS(wt1.DATE)-TO_DAYS(wt2.DATE)=1;\\n\\n\\nEXPLANATION:\\n\\n**TO_DAYS(wt1.DATE)** return the number of days between from year 0 to date DATE\\n**TO_DAYS(wt1.DATE)-TO_DAYS(wt2.DATE)=1** check if wt2.DATE is yesterday respect to wt1.DATE\\n\\nWe select from the joined tables the rows that have \\n\\n**wt1.Temperature > wt2.Temperature** \\n\\nand difference between dates in days of 1 (yesterday):\\n\\n**TO_DAYS(wt1.DATE)-TO_DAYS(wt2.DATE)=1;**"
		},
		{
			"lc_ans_id":"55620",
			"view":"8863",
			"top":"1",
			"title":"My simple solution using inner join",
			"vote":"27",
			"content":"    SELECT t1.Id\\n    FROM Weather t1\\n    INNER JOIN Weather t2\\n    ON TO_DAYS(t1.Date) = TO_DAYS(t2.Date) + 1\\n    WHERE t1.Temperature > t2.Temperatur"
		},
		{
			"lc_ans_id":"55662",
			"view":"5051",
			"top":"2",
			"title":"Two Solutions..........",
			"vote":"21",
			"content":"1.\\n\\n    SELECT a.Id FROM Weather AS a, Weather AS b\\n    WHERE DATEDIFF(a.Date, b.Date)=1 AND a.Temperature > b.Temperature\\n\\n2.\\n\\n    SELECT Id FROM (\\n        SELECT CASE\\n            WHEN Temperature > @prevtemp AND DATEDIFF(Date, @prevdate) = 1 THEN Id ELSE NULL END AS Id,\\n            @prevtemp:=Temperature,\\n            @prevdate:=Date\\n        FROM Weather, (SELECT @prevtemp:=NULL) AS A, (SELECT @prevdate:=NULL) AS B ORDER BY Date ASC\\n    ) AS D WHERE Id IS NOT NULL"
		},
		{
			"lc_ans_id":"55672",
			"view":"2959",
			"top":"3",
			"title":"My simple solution",
			"vote":"10",
			"content":"select w1.id \\nfrom Weather w1, Weather w2 \\nwhere (DATEDIFF(w1.Date, w2.Date) = 1) AND w1.Temperature > w2.Temperature"
		},
		{
			"lc_ans_id":"55649",
			"view":"1148",
			"top":"4",
			"title":"Solution with mysql built-in function",
			"vote":"6",
			"content":"    SELECT \\n        t1.Id\\n    From \\n        Weather t1, Weather t2\\n    WHERE \\n        t1.Temperature > t2.Temperature\\n    AND\\n        subdate(t1.Date, 1) = t2.Date\\n\\nMySQL SUBDATE() subtracts a time value (as interval) from a given date."
		},
		{
			"lc_ans_id":"55629",
			"view":"1823",
			"top":"5",
			"title":"A simple straightforward solution and it's very fast",
			"vote":"6",
			"content":"    select w1.Id Id from Weather w1, Weather w2 where datediff(w1.Date,w2.Date)=1 and w1.Temperature>w2.Temperature"
		},
		{
			"lc_ans_id":"55628",
			"view":"2440",
			"top":"6",
			"title":"Why is subtracting 1 directly from Date not working, but subdate(a.Date,1) works?",
			"vote":"6",
			"content":"Why is subtracting 1 directly from Date not working, but subdate(a.Date,1) works?\\n\\nMy code is \\n\\n    select W1.Id\\n    from Weather as W1, Weather as W2\\n    where W1.Date-1 = W2.Date and W1.Temperature> W2.Temperature\\n\\nit only passed 13/14 cases.\\n\\nHowever, when I changed `W1.Date-1` to `sub(W1.Date,1)` in the where clause, it worked. What is fundamental difference?"
		},
		{
			"lc_ans_id":"55653",
			"view":"2284",
			"top":"7",
			"title":"My first SQL query",
			"vote":"6",
			"content":"select a.Id as Id\\n        from \\n        Weather as a\\n        join\\n        Weather as b\\n        ON\\n        b.Date = subdate(a.Date,1)\\n        where \\n        a.Temperature > b.Temperature;"
		},
		{
			"lc_ans_id":"55646",
			"view":"1359",
			"top":"8",
			"title":"A solusion with time 1025 ms",
			"vote":"4",
			"content":"    select a.Id from (select w2.Id from Weather w1 join Weather w2 on datediff(w2.Date,w1.Date)=1 where w1.Temperature < w2.Temperature) a"
		},
		{
			"lc_ans_id":"55644",
			"view":"1030",
			"top":"9",
			"title":"Simple solution using datediff",
			"vote":"3",
			"content":"    select w1.Id from Weather w1, Weather w2\\n    where w1.Temperature > w2.Temperature \\n    and datediff(w1.Date, w2.Date) = 1;"
		}
	],
	"id":"197",
	"title":"Rising Temperature",
	"content":"<p>Given a <code>Weather</code> table, write a SQL query to find all dates' Ids with higher temperature compared to its previous (yesterday's) dates.</p>\r\n\r\n<pre>\r\n+---------+------------+------------------+\r\n| Id(INT) | Date(DATE) | Temperature(INT) |\r\n+---------+------------+------------------+\r\n|       1 | 2015-01-01 |               10 |\r\n|       2 | 2015-01-02 |               25 |\r\n|       3 | 2015-01-03 |               20 |\r\n|       4 | 2015-01-04 |               30 |\r\n+---------+------------+------------------+\r\n</pre>\r\n\r\nFor example, return the following Ids for the above Weather table:\r\n<pre>\r\n+----+\r\n| Id |\r\n+----+\r\n|  2 |\r\n|  4 |\r\n+----+\r\n</pre>",
	"frequency":"546",
	"ac_num":"41388"
}