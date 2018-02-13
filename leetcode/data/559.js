{
	"difficulty":"2",
	"submit_num":"7187",
	"show_id":"578",
	"leetcode_id":"578",
	"answers":[
		{
			"lc_ans_id":"103019",
			"view":"1871",
			"top":"0",
			"title":"My AC solution",
			"vote":"6",
			"content":"```\\nSELECT question_id as survey_log\\nFROM\\n(\\n\\tSELECT question_id, SUM(case when action=\"show\" THEN 1 ELSE 0 END) as num_show,    SUM(case when action=\"answer\" THEN 1 ELSE 0 END) as num_answer\\n\\tFROM survey_log\\n\\tGROUP BY question_id\\n) as tbl\\nORDER BY (num_answer / num_show) DESC LIMIT 1\\n```"
		},
		{
			"lc_ans_id":"103022",
			"view":"99",
			"top":"1",
			"title":"BAD TESTCASE gives random output due to order by NULL values",
			"vote":"1",
			"content":"When i use either of the given two solution approaches to submit, the result is quite weird: it get random acceptance.  if you try to submit same solution for multiple times, you will find it is either accepted  or reject b/c of wrong answer, in a random fashion. I looked into the wrong answer test case it is always the one below: \\n\\n'''{\"headers\": {\"survey_log\": [\"uid\", \"action\", \"question_id\", \"answer_id\", \"q_num\", \"timestamp\"]},\"rows\": {\"survey_log\": [[5, \"answer\", 285, 123, 1, 1], [5, \"answer\", 285, 123, 1, 2], [5, \"answer\", 369, 123, 2, 3], [5, \"skip\", 369, null, 2, 4]]}}'''\\n\\nThis test cases is problematic b/c neither question_id 285 nor 369 has action 'show', so that the ratio defined by (num_answer/num_show) will both give null values for 285 and 369, which means if you order them by this ratio, it will give random order.  \\n\\nYou can check this out using the \"custom testcase\" option and \"run code\" of solution on this test case. you will find both \"your answer\" and \"expected answer\" varies from run to run, which leads to random acceptance of your submission. (here i removed 'limit 1' in the test code to show the full order)\\n![3_1508202669378_output1.png](/assets/uploads/files/1508202670316-output1-resized.png) ![2_1508202669378_output2.png](/assets/uploads/files/1508202670355-output2-resized.png) ![1_1508202669378_output3.png](/assets/uploads/files/1508202670432-output3-resized.png) ![0_1508202669378_output4.png](/assets/uploads/files/1508202670389-output4-resized.png) \\n\\nThis problem needs to remove this testcase or add new rules for case where no 'show' action in any question_id \\n\\nbtw, the provided \"COUNT(IF...)\" approach needs to be corrected: COUNT(IF(action = 'show', 1, 0) ) --->COUNT(IF(action = 'show', 1, null)"
		},
		{
			"lc_ans_id":"103020",
			"view":"516",
			"top":"2",
			"title":"Solution with GROUP BY and simple counting \"answer\"",
			"vote":"1",
			"content":"select t1.question_id as survey_log from\\n(select question_id from survey_log where answer_id IS NOT NULL) as t1\\nGROUP BY t1.question_id\\nORDER BY count(t1.question_id) DESC\\nLIMIT 1;"
		},
		{
			"lc_ans_id":"103027",
			"view":"429",
			"top":"3",
			"title":"Wrong Test Case?",
			"vote":"1",
			"content":"Is it a wrong test case?\\n\\nI've got a wrong answer as below:\\nInput:\\n```json\\n{\"headers\":{\"survey_log\":[\"uid\",\"action\",\"question_id\",\"answer_id\",\"q_num\",\"timestamp\"]},\"rows\":{\"survey_log\":[[5,\"show\",285,null,1,1],[5,\"show\",285,null,1,2],[5,\"answer\",369,123,2,3],[5,\"skip\",369,null,2,4]]}}\\n```\\nOutput:\\n`{\"headers\": [\"survey_log\"], \"values\": [[369]]}`\\nExpected:\\n`{\"headers\": [\"survey_log\"], \"values\": [[285]]}`\\n\\nHowever, according to the input data, the table is like this:\\n\\n| uid | action | question_id | answer_id | q_num | timestamp |\\n|-----|--------|-------------|-----------|-------|-----------|\\n| 5   | show   | 285         |           | 1     | 1         |\\n| 5   | show   | 285         |           | 1     | 2         |\\n| 5   | answer | 369         | 123       | 2     | 3         |\\n| 5   | skip   | 369         |           | 2     | 4         |\\n\\nSo, I think the correct answer should be '369' since its rate is 1/2 = 0.5. For questions '285', the rate is 0 since no one actually answered this question.\\n\\nSo could any one can explain?"
		},
		{
			"lc_ans_id":"103018",
			"view":"21",
			"top":"4",
			"title":"Tips to ace all test cases",
			"vote":"0",
			"content":"As many of you may know that, the test case is generated in random, meaning there could be cases that are not logical. Here are some tips and explanations to ace these test cases.\\nFirst, count answered question by \"answer_id\" column, not by \"action\" column. According to my tests, counting action = \"answer\" is not reliable.\\nSecond, never try to return multiple results even there is a tie. The judge only accept one answer.\\nHere are some sample AC codes:\\n1. Using a subquery\\n```\\nSELECT question_id as survey_log\\nFROM\\n(\\nSELECT question_id,\\n       count(answer_id) as num_answer,\\n       SUM(case when action=\"show\" THEN 1 ELSE 0 END) as num_show    \\nFROM survey_log\\nGROUP BY question_id\\n) as tbl\\nORDER BY (num_answer / num_show) DESC\\nLIMIT 1\\n```\\n2. Using a view\\n```\\ncreate or replace view tbl as (\\nselect question_id, count(answer_id) as num_answer, sum(if(action=\"show\", 1, 0)) as num_show\\nfrom survey_log\\ngroup by question_id\\n);\\n    \\nselect question_id as survey_log\\nfrom tbl\\norder by num_answer / num_show desc\\nlimit 1\\n# where num_answer / num_show = (\\n#     select num_answer / num_show \\n#     from tbl \\n#     order by num_answer / num_show desc\\n#     limit 1\\n# )\\n```\\nYou may notice I commented out some parts in the end because I was trying to return multiple results if there is a tie. It could most likely be a follow-up. But unfortunately, this question does not accept this even if there is a tie.\\n3. Another concise version\\n```\\nselect question_id as survey_log\\nfrom survey_log\\ngroup by question_id\\norder by count(answer_id) / count(case when action=\"show\" then action else null end) desc \\nlimit 1\\n```\\nThe common parts in these three solutions is that they all count answer_id instead of action, and only return one answer. Hope they help."
		},
		{
			"lc_ans_id":"103021",
			"view":"125",
			"top":"5",
			"title":"Simple solution without subquery pass 8/8, with COUNT() and IF()",
			"vote":"0",
			"content":"```\\nSELECT \\n    question_id AS 'survey_log'\\nFROM\\n    survey_log\\nGROUP BY question_id\\nORDER BY COUNT(answer_id) / COUNT(IF(action = 'show' or action = 'skip', 1, 0)) DESC\\nLIMIT 1;\\n```"
		},
		{
			"lc_ans_id":"103025",
			"view":"79",
			"top":"6",
			"title":"My accepted code beats 90%",
			"vote":"0",
			"content":"I think the definition of this question is ambiguous. \\nThere are several special cases we need take into consideration:\\n\\n- we get two id with the same rate. In this case, I will output the one with less Id number\\n\\n- sometimes the show / skip action of a question is zero but answer is not. I add one to the divisor and dividend to avoid this case\\n \\n```\\n# Write your MySQL query statement below\\nSELECT question_id  as survey_log\\nFROM \\n(\\n    SELECT question_id, SUM(case when action=\"show\" OR action=\"skip\" THEN 1 ELSE 0 END) + 1 as num_asked, SUM(case when action=\"answer\" THEN 1 ELSE 0 END) + 1 as num_answered\\n    FROM survey_log\\n    GROUP BY question_id\\n) as target\\nORDER BY (num_answered / num_asked) DESC, question_id ASC\\nLIMIT 1\\n```"
		},
		{
			"lc_ans_id":"103026",
			"view":"173",
			"top":"7",
			"title":"very straightforward and short",
			"vote":"0",
			"content":"```\\nselect question_id as 'survey_log'\\nfrom survey_log\\ngroup by question_id\\norder by (count(answer_id)/count(q_num)) desc\\nlimit 1\\n````"
		},
		{
			"lc_ans_id":"103023",
			"view":"247",
			"top":"8",
			"title":"Straightforward SQL without subselects",
			"vote":"0",
			"content":"```\\nselect question_id as survey_log from survey_log\\nwhere answer_id is not null\\ngroup by question_id\\norder by count(question_id) desc\\nlimit 1\\n```\\nSelect the column question_id from table survey_log and call the result survey_log,\\nfor all rows which answer_id is not null\\ngroup them by question_id\\nand order by count(question_id) in descending order\\nand only return the top 1 result."
		},
		{
			"lc_ans_id":"103024",
			"view":"329",
			"top":"9",
			"title":"straightforward logic but did not pass 3/9 test cases. not sure why? Could someone help?",
			"vote":"0",
			"content":"```\\nselect A.question_id as survey_log from\\n\\n    (select SL1.question_id, count(SL1.action) as numA from survey_log SL1\\n    where SL1.action='answer'\\n    group by SL1.question_id) A join\\n    (select SL2.question_id, count(SL2.action) as numS from survey_log SL2\\n    where SL2.action='show'\\n    group by SL2.question_id) S\\n    on A.question_id=S.question_id\\n    order by (numA/numS) desc\\n    limit 1\\n```"
		}
	],
	"id":"559",
	"title":"Get Highest Answer Rate Question",
	"content":"<p>\r\nGet the highest answer rate question from a table <code>survey_log</code> with these columns:\r\n<b>uid</b>, <b>action</b>, <b>question_id</b>, <b>answer_id</b>, <b>q_num</b>, <b>timestamp</b>.\r\n</p>\r\n\r\n<p>\r\nuid means user id; action has these kind of values: \"show\", \"answer\", \"skip\";\r\nanswer_id is not null when action column is \"answer\", while is null for \"show\" and \"skip\";\r\nq_num is the numeral order of the question in current session.\r\n</p>\r\n\r\n<p>Write a sql query to identify the question which has the highest answer rate.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n+------+-----------+--------------+------------+-----------+------------+\r\n| uid  | action    | question_id  | answer_id  | q_num     | timestamp  |\r\n+------+-----------+--------------+------------+-----------+------------+\r\n| 5    | show      | 285          | null       | 1         | 123        |\r\n| 5    | answer    | 285          | 124124     | 1         | 124        |\r\n| 5    | show      | 369          | null       | 2         | 125        |\r\n| 5    | skip      | 369          | null       | 2         | 126        |\r\n+------+-----------+--------------+------------+-----------+------------+\r\n<b>Output:</b>\r\n+-------------+\r\n| survey_log  |\r\n+-------------+\r\n|    285      |\r\n+-------------+\r\n<b>Explanation:</b>\r\nquestion 285 has answer rate 1/1, while question 369 has 0/1 answer rate, so output 285.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe highest answer rate meaning is: answer number's ratio in show number in the same question.\r\n</p>",
	"frequency":"20",
	"ac_num":"2004"
}