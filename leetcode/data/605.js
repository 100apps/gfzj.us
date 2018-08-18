{
	"difficulty":"1",
	"submit_num":"27836",
	"show_id":"627",
	"leetcode_id":"627",
	"answers":[
		{
			"lc_ans_id":"104713",
			"view":"7783",
			"top":"0",
			"title":"Accept solution with xor",
			"vote":"43",
			"content":"```\\nupdate salary set sex = CHAR(ASCII('f') ^ ASCII('m') ^ ASCII(sex));\\n```"
		},
		{
			"lc_ans_id":"104716",
			"view":"8180",
			"top":"1",
			"title":"Short and Simple",
			"vote":"10",
			"content":"```\\nUPDATE salary\\n    SET sex  = (CASE WHEN sex = 'm' \\n        THEN  'f' \\n        ELSE 'm' \\n        END)\\n```"
		},
		{
			"lc_ans_id":"104722",
			"view":"2064",
			"top":"2",
			"title":"Simple and short with IF",
			"vote":"3",
			"content":"```\\nUPDATE salary SET sex = IF(sex = 'm', 'f', 'm')\\n```"
		},
		{
			"lc_ans_id":"104728",
			"view":"3005",
			"top":"3",
			"title":"Misleading description",
			"vote":"3",
			"content":"Description suggests that we should use UPDATE statement: \"with a single update query and no intermediate temp table\". But it turns out that solution with UPDATE is invalid, and in fact we must use SELECT statement."
		},
		{
			"lc_ans_id":"104723",
			"view":"1673",
			"top":"4",
			"title":"My simple solution",
			"vote":"2",
			"content":"update salary set sex = CASE when sex ='m' then 'f' else 'm' end;"
		},
		{
			"lc_ans_id":"104714",
			"view":"42",
			"top":"5",
			"title":"Help??? Why my code is not right?",
			"vote":"0",
			"content":"select id, name, if(sex='f','m','f') as sex, salary\\nfrom salary\\n\\n\\nI refer the answer for 626. Exchange Seats, which is correct :\\n\\nselect\\nif(id < (select count(*) from seat), if(id mod 2=0, id-1, id+1), if(id mod 2=0, id-1, id)) as id, student\\nfrom seat\\norder by id asc;"
		},
		{
			"lc_ans_id":"104715",
			"view":"35",
			"top":"6",
			"title":"Accepted solution with If function",
			"vote":"0",
			"content":"update salary\\nset sex= if (sex='f','m','f');"
		},
		{
			"lc_ans_id":"104717",
			"view":"98",
			"top":"7",
			"title":"Problem is flawed...",
			"vote":"0",
			"content":"The issue with this problem is that you are not actually switching the salaries, the problem itself is flawed."
		},
		{
			"lc_ans_id":"104718",
			"view":"134",
			"top":"8",
			"title":"Uses If statement",
			"vote":"0",
			"content":"``` \\nUPDATE salary\\nSET sex = IF(sex = 'm', 'f', 'm') \\n```"
		},
		{
			"lc_ans_id":"104719",
			"view":"122",
			"top":"9",
			"title":"With string replace",
			"vote":"0",
			"content":"UPDATE salary SET sex = REPLACE('mf',sex,'')"
		}
	],
	"id":"605",
	"title":"Swap Salary",
	"content":"Given a table <code>salary</code>, such as the one below, that has m=male and  f=female values. Swap all f and m values (i.e., change all f values to m and vice versa) with a single update query and no intermediate temp table.</p>\r\n \r\nFor example:</p>\r\n \r\n<pre>\r\n| id | name | sex | salary |\r\n|----|------|-----|--------|\r\n| 1  | A    | m   | 2500   |\r\n| 2  | B    | f   | 1500   |\r\n| 3  | C    | m   | 5500   |\r\n| 4  | D    | f   | 500    |\r\n</pre>\r\nAfter running your query, the above salary table should have the following rows:\r\n<pre>\r\n| id | name | sex | salary |\r\n|----|------|-----|--------|\r\n| 1  | A    | f   | 2500   |\r\n| 2  | B    | m   | 1500   |\r\n| 3  | C    | f   | 5500   |\r\n| 4  | D    | m   | 500    |\r\n</pre>\r\n",
	"frequency":"495",
	"ac_num":"18676"
}