{
	"difficulty":"2",
	"submit_num":"6157",
	"show_id":"574",
	"leetcode_id":"574",
	"answers":[
		{
			"lc_ans_id":"102855",
			"view":"696",
			"top":"0",
			"title":"my accepted solution",
			"vote":"1",
			"content":"```\\nSelect distinct c.Name As Name\\nfrom Candidate c\\nwhere c.id = (Select CandidateId \\nfrom Vote\\nGroup by CandidateId  \\norder by count(CandidateId) desc\\nlimit 1)\\n\\n\\n\\n\\n\\n\\n\\n\\n```"
		},
		{
			"lc_ans_id":"102846",
			"view":"17",
			"top":"1",
			"title":"Simple accepted solution",
			"vote":"0",
			"content":"'''\\nSELECT Name FROM Candidate WHERE Id = (SELECT CandidateId FROM Vote GROUP BY CandidateId ORDER BY COUNT(id) DESC LIMIT 1)\\n\\n'''"
		},
		{
			"lc_ans_id":"102847",
			"view":"38",
			"top":"2",
			"title":"Why the result is [[]], for the following dataset?",
			"vote":"0",
			"content":"{\"headers\": {\"Candidate\": [\"id\", \"Name\"], \"Vote\": [\"id\", \"CandidateId\"]}, \"rows\": {\"Candidate\": [[3, \"C\"]], \"Vote\": [[1, 2],[2, 4],[3, 3],[4, 2],[5, 5]]}}\\n\\nshouldn't the winner be C?"
		},
		{
			"lc_ans_id":"102848",
			"view":"35",
			"top":"3",
			"title":"version not support limit",
			"vote":"0",
			"content":"select name from candidate where id in (select candidateid from vote limit 1), can i use this when interviewing? i got the error \"This version of MySQL doesn't yet support 'LIMIT & IN/ALL/ANY/SOME subquery'\""
		},
		{
			"lc_ans_id":"102849",
			"view":"95",
			"top":"4",
			"title":"AC solution using groupby & order",
			"vote":"0",
			"content":"\\n         select name from \\n         (select CandidateId from Vote\\n          group by CandidateId\\n          order by count(*) desc limit 0,1) as c,\\n          Candidate\\n          where c.CandidateId = Candidate.id"
		},
		{
			"lc_ans_id":"102850",
			"view":"162",
			"top":"5",
			"title":"Why doesn't this work?",
			"vote":"0",
			"content":"# Write your MySQL query statement below\\n\\nSELECT c.Name\\nFROM Candidate c\\nINNER JOIN Vote v ON c.id = v.CandidateId\\nGROUP BY 1\\nORDER BY COUNT(*) DESC\\nLIMIT 1"
		},
		{
			"lc_ans_id":"102851",
			"view":"390",
			"top":"6",
			"title":"My simplest accepted solution",
			"vote":"0",
			"content":"select Name from Candidate where id = (select candidateid from Vote group by candidateid order by count(candidateid) desc limit 1)"
		},
		{
			"lc_ans_id":"102852",
			"view":"154",
			"top":"7",
			"title":"why left join doesn't work in my solution?",
			"vote":"0",
			"content":"SELECT t2.Name AS Name  \\n  (SELECT t1.n1 AS n2, COUNT(t1.c1) AS cnt2\\n   FROM\\n     (SELECT Vote.id AS v1, Vote.CandidateId AS c1, Candidate.Name AS n1 \\n       FROM Vote LEFT JOIN Candidate\\n       ON Vote.CandidateId = Candidate.id\\n       ORDER BY Vote.id ASC\\n     ) t1\\n     GROUP BY t1.c1\\n     ORDER BY COUNT(t1.c1) DESC\\n     LIMIT 1\\n) t2"
		},
		{
			"lc_ans_id":"102845",
			"view":"782",
			"top":"8",
			"title":"Why left join doesn't work here",
			"vote":"0",
			"content":"I came up a solution using left join, but it didn't pass the last two cases. \\nI cannot see the test case completely, so I don't know why this solution is wrong. \\n```\\nSELECT Name \\nFROM Candidate AS A\\nLEFT JOIN Vote AS B\\nON A.id = B.CandidateId\\nGROUP BY A.id\\nORDER BY Count(A.id) DESC\\nLIMIT 1; \\n```"
		},
		{
			"lc_ans_id":"102853",
			"view":"263",
			"top":"9",
			"title":"100% 1400ms",
			"vote":"0",
			"content":"\\nselect Name from candidate \\nwhere \\nid = (select candidateid from (select candidateid from vote group by candidateid order by count(*) desc limit 1) t)"
		}
	],
	"id":"555",
	"title":"Winning Candidate",
	"content":"<p>Table: <code>Candidate</code></p>\r\n<pre>\r\n+-----+---------+\r\n| id  | Name    |\r\n+-----+---------+\r\n| 1   | A       |\r\n| 2   | B       |\r\n| 3   | C       |\r\n| 4   | D       |\r\n| 5   | E       |\r\n+-----+---------+  \r\n</pre>\r\n<p>Table: <code>Vote</code></p>\r\n<pre>\r\n+-----+--------------+\r\n| id  | CandidateId  |\r\n+-----+--------------+\r\n| 1   |     2        |\r\n| 2   |     4        |\r\n| 3   |     3        |\r\n| 4   |     2        |\r\n| 5   |     5        |\r\n+-----+--------------+\r\nid is the auto-increment primary key,\r\nCandidateId is the id appeared in Candidate table.\r\n</pre>\r\n\r\n<p>Write a sql to find the name of the winning candidate, the above example will return the winner <code>B</code>.</p>\r\n\r\n<pre>\r\n+------+\r\n| Name |\r\n+------+\r\n| B    |\r\n+------+\r\n</pre>\r\n\r\n<p><b>Notes:</b><br />\r\n<ol>\r\n<li>You may assume <b>there is no tie</b>, in other words there will be <b>at most one</b> winning candidate.</li>\r\n</ol></p>",
	"frequency":"59",
	"ac_num":"2045"
}