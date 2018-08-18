{
	"difficulty":"1",
	"submit_num":"45820",
	"show_id":"595",
	"leetcode_id":"595",
	"answers":[
		{
			"lc_ans_id":"103561",
			"view":"1275",
			"top":"0",
			"title":"Union and OR and the Explanation",
			"vote":"7",
			"content":"Two obvious solutions:\\n```\\n#OR\\nSELECT name, population, area\\nFROM World\\nWHERE area > 3000000 OR population > 25000000\\n```\\nAnd Faster Union\\n```\\n#Union\\nSELECT name, population, area\\nFROM World\\nWHERE area > 3000000 \\n\\nUNION\\n\\nSELECT name, population, area\\nFROM World\\nWHERE population > 25000000\\n```\\n\\nWhy `Union` is faster than `OR`? \\n\\nStrictly speaking, Using ` UNION` is faster when it comes to cases like **scan two different column like this**. \\n\\n(Of course using `UNION ALL` is much faster than `UNION` since we don't need to sort the result. But it violates the requirements)\\n\\n\\nSuppose we are searching `population` and `area`, Given that MySQL usually uses one one index per table in a given query, so when it uses the 1st index rather than 2nd index, it would still have to do a table-scan to find rows that fit the 2nd index. \\n\\nWhen using `UNION`, each sub-query can use the index of its search, then combine the sub-query by `UNION`.\\n\\n\\nI quote from a [benchmark](http://www.sql-server-performance.com/2011/union-or-sql-server-queries/) about `UNION` and `OR`, feel free to check it out:\\n\\n```\\nScenario 3: Selecting all columns for different fields\\n            CPU      Reads        Duration       Row Counts\\nOR           47       1278           443           1228\\nUNION        31       1334           400           1228\\n\\nScenario 4: Selecting Clustered index columns for different fields\\n            CPU      Reads        Duration       Row Counts\\nOR           0         319           366           1228\\nUNION        0          50           193           1228\\n```"
		},
		{
			"lc_ans_id":"103567",
			"view":"6401",
			"top":"1",
			"title":"Easy AC",
			"vote":"6",
			"content":"```\\nSELECT name,population,area \\nFROM World \\nWHERE population>25000000 OR area>3000000;\\n```"
		},
		{
			"lc_ans_id":"103562",
			"view":"886",
			"top":"2",
			"title":"Description and author's solution are inconsistent",
			"vote":"2",
			"content":"A description says, that \\n\\n\"A country is big if it has an area of bigger than 3 million square km or a population of more than 25 million.\"\\n\\nyet an author's solution also think that the country is big if it has _exactly_ 3 million sq. km or 25 million population. There is no test for that case, but perhaps it will be better to update the author's solution to strict comparsion, or rewrite the description like\\n\\n\"A country is big if it has an area of 3 million square km or bigger, or a population of 25 million or more.\""
		},
		{
			"lc_ans_id":"103563",
			"view":"1639",
			"top":"3",
			"title":"For those of you who have a Time Limit Exceed",
			"vote":"1",
			"content":"Submit again. The OJ is unstable occasionally. (This statement is valid by 06/07/2017.)"
		},
		{
			"lc_ans_id":"103566",
			"view":"370",
			"top":"4",
			"title":"Easy and Straightforward Solution",
			"vote":"1",
			"content":"```sql\\nselect name, population, area from world where area > 3000000 or population > 25000000;\\n```"
		},
		{
			"lc_ans_id":"103558",
			"view":"83",
			"top":"5",
			"title":"For those wondering the units",
			"vote":"0",
			"content":"Area is also in square km and population is in person.\\n\\ni.e. An area of 652230 really means 652230 million square km and a population of 78115 really means 78115 people.\\n\\nThis may seem obvious but I guess it's better to state things clear: phrasing the question \"A country is big if it has an area of bigger than 3 million ~~square km~~ or a population of more than 25 million\" would make it clearer."
		},
		{
			"lc_ans_id":"103559",
			"view":"126",
			"top":"6",
			"title":"Dear Admin, I want to know how to deal with this problem that solutions runtime less than 2000ms.",
			"vote":"0",
			"content":"I try 2 method with \\nselect name, population, area from World where population > 25000000 or area > 3000000;\\nand\\nselect name, population, area from World where population > 25000000 union all select name, population, area from World where area > 3000000  ;\\n The solutions runtime is 3115ms and 3217 ms .\\nI see the create table sql don't have index ,so I want to know how to deal .\\nThank you see this.\\nI am Chinese, English is not very good, please be more."
		},
		{
			"lc_ans_id":"103560",
			"view":"519",
			"top":"7",
			"title":"My Easy Solution AC",
			"vote":"0",
			"content":"```\\nSELECT name, population, area\\nFROM World\\nWHERE area > 3000000 OR population > 25000000;\\n```"
		},
		{
			"lc_ans_id":"103568",
			"view":"519",
			"top":"8",
			"title":"My easy solution",
			"vote":"0",
			"content":"```\\nselect t1.name , t1.population , t1.area\\nfrom World t1 \\nwhere t1.population>25000000 or t1.area >3000000\\n```"
		},
		{
			"lc_ans_id":"103564",
			"view":"626",
			"top":"9",
			"title":"Use or clause",
			"vote":"0",
			"content":"```\\nselect name\\n, population\\n, area\\nfrom World\\nwhere (area > 3000000)\\nor (population > 25000000)\\n```"
		}
	],
	"id":"574",
	"title":"Big Countries",
	"content":"<p>There is a table <code>World</code> </p>\r\n<pre>\r\n+-----------------+------------+------------+--------------+---------------+\r\n| name            | continent  | area       | population   | gdp           |\r\n+-----------------+------------+------------+--------------+---------------+\r\n| Afghanistan     | Asia       | 652230     | 25500100     | 20343000      |\r\n| Albania         | Europe     | 28748      | 2831741      | 12960000      |\r\n| Algeria         | Africa     | 2381741    | 37100000     | 188681000     |\r\n| Andorra         | Europe     | 468        | 78115        | 3712000       |\r\n| Angola          | Africa     | 1246700    | 20609294     | 100990000     |\r\n+-----------------+------------+------------+--------------+---------------+\r\n</pre>\r\n<p>\r\nA country is big if it has an area of bigger than 3 million square km or a population of more than 25 million.\r\n</p><p>\r\nWrite a SQL solution to output big countries' name, population and area.\r\n</p>\r\n<p>\r\nFor example, according to the above table, we should output:\r\n<pre>\r\n+--------------+-------------+--------------+\r\n| name         | population  | area         |\r\n+--------------+-------------+--------------+\r\n| Afghanistan  | 25500100    | 652230       |\r\n| Algeria      | 37100000    | 2381741      |\r\n+--------------+-------------+--------------+\r\n</pre>\r\n</p>",
	"frequency":"607",
	"ac_num":"32836"
}