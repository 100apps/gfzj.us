{
	"difficulty":"1",
	"submit_num":"5112",
	"show_id":"584",
	"leetcode_id":"584",
	"answers":[
		{
			"lc_ans_id":"103279",
			"view":"894",
			"top":"0",
			"title":"Simple solution",
			"vote":"3",
			"content":"```sql\\nselect c.name from customer c where c.id not in (select id from customer where referee_id = 2);\\n```"
		},
		{
			"lc_ans_id":"103284",
			"view":"309",
			"top":"1",
			"title":"Fast Solution using IFNULL",
			"vote":"2",
			"content":"`SELECT name FROM customer WHERE IFNULL(referee_id,0) <> 2;`"
		},
		{
			"lc_ans_id":"103280",
			"view":"331",
			"top":"2",
			"title":"Simple and easy solution",
			"vote":"1",
			"content":"```\\nSELECT name \\nFROM customer\\nWHERE referee_id <> 2 OR referee_id IS NULL\\n```"
		},
		{
			"lc_ans_id":"103278",
			"view":"22",
			"top":"3",
			"title":"simple solution using `coalesce`",
			"vote":"0",
			"content":"use `coalesce` to cast `null` to 0.\\n\\n```\\nselect name \\nfrom customer\\nwhere coalesce(referee_id, 0) <> 2\\n```"
		},
		{
			"lc_ans_id":"103281",
			"view":"34",
			"top":"4",
			"title":"Simple Solution",
			"vote":"0",
			"content":"```\\nselect c.name\\nfrom customer c\\nwhere c.referee_id != 2 or c.referee_id is NULL\\n```"
		},
		{
			"lc_ans_id":"103282",
			"view":"26",
			"top":"5",
			"title":"I think there is a bug here",
			"vote":"0",
			"content":"I think the following code should work for this question but it showed errors only because the order difference of output .\\n'''\\nselect c.name from customer c where c.referee_id != 2\\nunion\\nselect c.name from customer c where c.referee_id is null\\n'''"
		},
		{
			"lc_ans_id":"103283",
			"view":"92",
			"top":"6",
			"title":"Concise solution",
			"vote":"0",
			"content":"```\\nSELECT  name\\nFROM    customer\\nWHERE   referee_id <> 2 \\n    OR  referee_id IS NULL\\n```"
		},
		{
			"lc_ans_id":"103286",
			"view":"254",
			"top":"7",
			"title":"Simple solution using LEFT JOIN",
			"vote":"0",
			"content":"```\\nSELECT c1.name\\nFROM customer c1 \\nLEFT JOIN customer c2\\nON c1.id = c2.referee_id\\nWHERE c2.name <> 'Jane'"
		},
		{
			"lc_ans_id":"103285",
			"view":"588",
			"top":"8",
			"title":"My First SQL Solution, comments welcomed",
			"vote":"0",
			"content":"select name\\nfrom customer \\nwhere referee_id <> 2 or referee_id is NULL"
		}
	],
	"id":"565",
	"title":"Find Customer Referee",
	"content":"<p>Given a table <code>customer</code> holding customers information and the referee.</p>\r\n\r\n<pre>\r\n+------+------+-----------+\r\n| id   | name | referee_id|\r\n+------+------+-----------+\r\n|    1 | Will |      NULL |\r\n|    2 | Jane |      NULL |\r\n|    3 | Alex |         2 |\r\n|    4 | Bill |      NULL |\r\n|    5 | Zack |         1 |\r\n|    6 | Mark |         2 |\r\n+------+------+-----------+\r\n</pre>\r\n\r\n<p>Write a query to return the list of customers <b>NOT</b> referred by the person with id '2'.</p>\r\n\r\n<p>For the sample data above, the result is:</p>\r\n<pre>\r\n+------+\r\n| name |\r\n+------+\r\n| Will |\r\n| Jane |\r\n| Bill |\r\n| Zack |\r\n+------+\r\n</pre>",
	"frequency":"3",
	"ac_num":"3152"
}