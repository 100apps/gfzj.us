{
	"difficulty":"2",
	"submit_num":"109634",
	"show_id":"178",
	"leetcode_id":"178",
	"answers":[
		{
			"lc_ans_id":"53094",
			"view":"29347",
			"top":"0",
			"title":"Simple, Short, Fast",
			"vote":"102",
			"content":"These are four different solutions.\\n\\n---\\n**With Variables:** 841 ms\\n\\nFirst one uses two variables, one for the current rank and one for the previous score.\\n\\n    SELECT\\n      Score,\\n      @rank := @rank + (@prev <> (@prev := Score)) Rank\\n    FROM\\n      Scores,\\n      (SELECT @rank := 0, @prev := -1) init\\n    ORDER BY Score desc\\n\\n---\\n\\n**Always Count:** 1322 ms\\n\\nThis one counts, for each score, the number of distinct greater or equal scores.\\n\\n    SELECT\\n      Score,\\n      (SELECT count(distinct Score) FROM Scores WHERE Score >= s.Score) Rank\\n    FROM Scores s\\n    ORDER BY Score desc\\n\\n---\\n\\n**Always Count, Pre-uniqued:** 795 ms\\n\\nSame as the previous one, but faster because I have a subquery that \"uniquifies\" the scores first. Not entirely sure *why* it's faster, I'm guessing MySQL makes `tmp` a temporary table and uses it for every outer Score.\\n\\n    SELECT\\n      Score,\\n      (SELECT count(*) FROM (SELECT distinct Score s FROM Scores) tmp WHERE s >= Score) Rank\\n    FROM Scores\\n    ORDER BY Score desc\\n\\n---\\n\\n**Filter/count Scores^2:** 1414 ms\\n\\nInspired by the attempt in wangkan2001's answer. Finally `Id` is good for something :-)\\n\\n    SELECT s.Score, count(distinct t.score) Rank\\n    FROM Scores s JOIN Scores t ON s.Score <= t.score\\n    GROUP BY s.Id\\n    ORDER BY s.Score desc"
		},
		{
			"lc_ans_id":"53096",
			"view":"11057",
			"top":"1",
			"title":"Accepted solution using InnerJoin and GroupBy",
			"vote":"27",
			"content":"    SELECT Scores.Score, COUNT(Ranking.Score) AS RANK\\n      FROM Scores\\n         , (\\n           SELECT DISTINCT Score\\n             FROM Scores\\n           ) Ranking\\n     WHERE Scores.Score <= Ranking.Score\\n     GROUP BY Scores.Id, Scores.Score\\n     ORDER BY Scores.Score DESC;"
		},
		{
			"lc_ans_id":"53110",
			"view":"4806",
			"top":"2",
			"title":"Accepted Solution with subqueries and group by",
			"vote":"15",
			"content":"# Solution with sub-queries\\n\\nWe just get the rows the distinct rows that are <= that each score, count them and wrap them in an external SELECT for formatting. \\n\\n    SELECT Scores.Score, Q3.Rank\\n    FROM(\\n        SELECT Q1.Score as Score, COUNT(Q1.Score) as Rank\\n        FROM \\n            (SELECT DISTINCT Score from Scores) as Q1,\\n            (SELECT DISTINCT Score from Scores) as Q2\\n        WHERE Q1.Score <= Q2.Score\\n        GROUP BY Q1.Score\\n        ) as Q3, Scores\\n    WHERE Q3.Score = Scores.Score\\n    ORDER BY Scores.Score DESC"
		},
		{
			"lc_ans_id":"53129",
			"view":"1062",
			"top":"3",
			"title":"Maybe the Simpest Solution",
			"vote":"6",
			"content":"Maybe the simplest solution I guess\\n-----------\\n\\nSELECT score,(SELECT COUNT(DISTINCT score) FROM Scores where score > a.score) + 1 rank\\n from Scores a  \\nORDER by score DESC;\\n\\n-----------\\n\\nInspired by Oracle Function row_number()\\uff0crank()\\uff0cdense()"
		},
		{
			"lc_ans_id":"53130",
			"view":"4553",
			"top":"4",
			"title":"My 800ms Simple Solution without variables",
			"vote":"6",
			"content":"    SELECT T2.Score Score, (SELECT COUNT(*) + 1 FROM (SELECT T1.Score FROM Scores T1 GROUP BY Score ORDER BY Score DESC) TEMP WHERE T2.Score < TEMP.Score) Rank FROM Scores T2 ORDER BY Score DESC;"
		},
		{
			"lc_ans_id":"53148",
			"view":"2152",
			"top":"5",
			"title":"Very concise accepted solution without variables. Check it out!",
			"vote":"6",
			"content":"    Select sc.Score,\\n           (Select count(*)+1 from (select distinct (Score) from Scores)\\n            as uniqeScores where Score > sc.Score) as rank \\n    from Scores sc order by sc.Score desc;"
		},
		{
			"lc_ans_id":"53152",
			"view":"2083",
			"top":"6",
			"title":"1169ms solution without variables and union",
			"vote":"5",
			"content":"    SELECT\\n      s2.`Score`,\\n      (SELECT COUNT(DISTINCT s1.`Score`) FROM `Scores` s1 WHERE s1.`Score` >= s2.`Score`)\\n        FROM `Scores` s2\\n          ORDER BY s2.`Score` DESC\\n\\np.s. please share more faster solutions!"
		},
		{
			"lc_ans_id":"53141",
			"view":"1339",
			"top":"7",
			"title":"Runtime: 704 ms ,use two variables",
			"vote":"4",
			"content":"    select Score,Rank from \\n    (\\n    SELECT Score,\\n           CASE\\n               WHEN @dummy <=> Score THEN @Rank := @Rank \\n               ELSE @Rank := @Rank +1\\n    \\tEND AS Rank,@dummy := Score as dummy\\n    FROM\\n      (SELECT @Rank := 0,@dummy := NULL) r,\\n         Scores\\n    ORDER BY Score DESC\\n    ) AS C"
		},
		{
			"lc_ans_id":"53147",
			"view":"857",
			"top":"8",
			"title":"My Accepted solution",
			"vote":"3",
			"content":"# Write your MySQL query statement below\\nselect a.Score, count(b.Score) as Rank\\nfrom Scores as a, \\n    (select distinct Score\\n     from Scores) as b\\nwhere a.Score <= b.Score\\ngroup by a.ID\\norder by a.Score desc\\n;"
		},
		{
			"lc_ans_id":"53101",
			"view":"768",
			"top":"9",
			"title":"Accepted solution with variables",
			"vote":"3",
			"content":"    select Score,\\n      case \\n        when @prevScore = Score then @rank\\n        when (@prevScore := Score) is not null then @rank := @rank+1\\n      end as Rank\\n    from Scores, (select @rank := 0, @prevScore := NULL) a\\n    order by Score desc;"
		}
	],
	"id":"178",
	"title":"Rank Scores",
	"content":"<p>\r\nWrite a SQL query to rank scores. If there is a tie between two scores, both should have the same ranking. Note that after a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no \"holes\" between ranks.\r\n</p>\r\n\r\n<pre>\r\n+----+-------+\r\n| Id | Score |\r\n+----+-------+\r\n| 1  | 3.50  |\r\n| 2  | 3.65  |\r\n| 3  | 4.00  |\r\n| 4  | 3.85  |\r\n| 5  | 4.00  |\r\n| 6  | 3.65  |\r\n+----+-------+\r\n</pre>\r\n\r\n<p>For example, given the above <code>Scores</code> table, your query should generate the following report (order by highest score):</p>\r\n\r\n<pre>\r\n+-------+------+\r\n| Score | Rank |\r\n+-------+------+\r\n| 4.00  | 1    |\r\n| 4.00  | 1    |\r\n| 3.85  | 2    |\r\n| 3.65  | 3    |\r\n| 3.65  | 3    |\r\n| 3.50  | 4    |\r\n+-------+------+\r\n</pre>",
	"frequency":"442",
	"ac_num":"31026"
}