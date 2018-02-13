{
	"difficulty":"1",
	"submit_num":"7227",
	"show_id":"619",
	"leetcode_id":"619",
	"answers":[
		{
			"lc_ans_id":"104466",
			"view":"739",
			"top":"0",
			"title":"Concise MySQL solution with reference",
			"vote":"2",
			"content":"```\\n# Refer to: https://stackoverflow.com/questions/17250243/how-to-return-null-when-result-is-empty\\nselect(\\n  select num\\n  from number\\n  group by num\\n  having count(*) = 1\\n  order by num desc limit 1\\n) as num;\\n```"
		},
		{
			"lc_ans_id":"104469",
			"view":"444",
			"top":"1",
			"title":"MySQL concise solution",
			"vote":"1",
			"content":"Find the max number from the table whose count is 1.\\n\\n```\\n# Write your MySQL query statement below\\nSelect \\n    max(n.num) as num\\nfrom \\n    number n\\nwhere \\n    (Select count(num) from number where num = n.num) = 1;\\n```"
		},
		{
			"lc_ans_id":"104480",
			"view":"685",
			"top":"2",
			"title":"ifnull handle null value- tricky part",
			"vote":"1",
			"content":"first time using ifnull function. the first answer below passed all test cases, but I don't understand why the second way did not. second one outputs empty but not null value when there is no max value with count =1. Can anyone help me understand ifnull function better? Thanks.\\n\\n1. \\n```\\nselect ifnull( (select num from ( select num  \\nfrom number\\ngroup by num\\nhaving count(num) =  1\\norder by num desc \\nlimit 1\\n) as maxnum)  , null) as num\\n```\\n\\n2. \\n```\\nselect ifnull( num, null) as num\\nfrom ( select num  \\nfrom number\\ngroup by num\\nhaving count(num) =  1\\norder by num desc \\nlimit 1) as maxnum \\n```"
		},
		{
			"lc_ans_id":"104481",
			"view":"585",
			"top":"3",
			"title":"Easy to understand solution",
			"vote":"1",
			"content":"```\\nselect max(n.num) as num from number n where n.num not in (select num from number group by num having count(num) > 1);\\n```"
		},
		{
			"lc_ans_id":"104467",
			"view":"33",
			"top":"4",
			"title":"MySQL solution",
			"vote":"0",
			"content":"```\\nselect max(num) as num from (select num from number group by num having count(*) = 1) p;\\n```"
		},
		{
			"lc_ans_id":"104468",
			"view":"36",
			"top":"5",
			"title":"4 solutions",
			"vote":"0",
			"content":"//V1.1 use groupby and max\\n\\n\\tselect max(a.num) as num\\n\\tfrom (select num from number group by num having count(*)=1) as a\\n\\n\\n\\n//V1.2 use groupby with order by limit\\n\\n\\tselect(\\n\\t\\tselect num from number\\n\\t        group by num having count(*) = 1\\n\\t\\torder by num desc limit 0,1\\n\\t) as num;\\n\\t\\n//V2.1 no groupby with max\\t\\n\\t\\n\\tselect max(a.num) as num\\n\\tfrom number a\\n\\twhere (select count(b.num) from number b where b.num = a.num) = 1;\\n\\t\\n//V2.2 no groupby with order by limit\\n\\t\\n\\tselect( \\n\\t        select * from number a\\n\\t\\twhere (select count(b.num) from number b where b.num=a.num) = 1\\n\\t\\torder by a.num desc limit 0,1\\n    ) as num"
		},
		{
			"lc_ans_id":"104470",
			"view":"40",
			"top":"6",
			"title":"My super-simple solution",
			"vote":"0",
			"content":"SELECT MAX(num) AS num\\nFROM (SELECT * FROM number\\n    GROUP BY num\\n    HAVING COUNT(*) = 1) t;"
		},
		{
			"lc_ans_id":"104471",
			"view":"56",
			"top":"7",
			"title":"Solution with Self Join",
			"vote":"0",
			"content":"```\\nSELECT MAX(a.num) AS num\\nFROM (select num, COUNT(*)\\n      FROM number\\n      GROUP BY num\\n      HAVING COUNT(*) = 1) a\\n```"
		},
		{
			"lc_ans_id":"104472",
			"view":"70",
			"top":"8",
			"title":"handles 12/15 cases",
			"vote":"0",
			"content":"\\nselect num  from number group by num having (case when count(num)=1 then num else NULL  END )order by num desc limit 1;"
		},
		{
			"lc_ans_id":"104473",
			"view":"87",
			"top":"9",
			"title":"Why this is not right?",
			"vote":"0",
			"content":"1. \\n\\nselect max(num) from number \\ngroup by num\\nhaving count(num)=1\\norder by num desc\\n\\nOutput:\\n{\"headers\": [\"max(num)\"], \"values\": [[1], [4], [5], [6]]}\\n\\nwhy this is not right?? \\n\\n2. \\n\\nselect num from number \\ngroup by num\\nhaving count(num)=1\\norder by num desc limit 1\\n\\n\\n{\"headers\": [\"num\"], \"values\": []}\\n\\nwhy this couldn't return NULL?"
		}
	],
	"id":"598",
	"title":"Biggest Single Number",
	"content":"<p>\r\nTable <code>number</code> contains many numbers in column <b>num</b> including duplicated ones.<br/>\r\nCan you write a SQL query to find the biggest number, which only appears once.</br>\r\n</p>\r\n<pre>\r\n+---+\r\n|num|\r\n+---+\r\n| 8 |\r\n| 8 |\r\n| 3 |\r\n| 3 |\r\n| 1 |\r\n| 4 |\r\n| 5 |\r\n| 6 | \r\n</pre>\r\nFor the sample data above, your query should return the following result:\r\n<pre>\r\n+---+\r\n|num|\r\n+---+\r\n| 6 |\r\n</pre>\r\n<b>Note:</b><br/> If there is no such number, just output <b>null</b>.</p>",
	"frequency":"29",
	"ac_num":"2600"
}