{
	"difficulty":"1",
	"submit_num":"4612",
	"show_id":"610",
	"leetcode_id":"610",
	"answers":[
		{
			"lc_ans_id":"104162",
			"view":"1013",
			"top":"0",
			"title":"Using CASE WHEN",
			"vote":"5",
			"content":"```\\nSELECT x, y, z,\\nCASE WHEN x+y<=z OR\\n          x+z<=y OR\\n          y+z<=x\\n     THEN 'No'\\n     ELSE 'Yes'\\nEND AS 'triangle'\\nFROM triangle;\\n```"
		},
		{
			"lc_ans_id":"104161",
			"view":"281",
			"top":"1",
			"title":"Simple and straightforward",
			"vote":"0",
			"content":"```\\nselect x, y, z,\\n      case \\n        when x+y>z and x+z>y and z+y>x then 'Yes' else 'No'\\n      end as triangle\\nfrom triangle\\n```"
		},
		{
			"lc_ans_id":"104163",
			"view":"739",
			"top":"2",
			"title":"Simple Answer Using IF() Function",
			"vote":"0",
			"content":"```\\nSELECT *, IF(x+y>z and x+z>y and y+z>x, 'Yes', 'No') as triangle FROM triangle\\n```"
		}
	],
	"id":"589",
	"title":"Triangle Judgement",
	"content":"A pupil Tim gets homework to identify whether three line segments could possibly form a triangle.</p> However, this assignment is very heavy because there are hundreds of records to calculate.</p>\r\n \r\nCould you help Tim by writing a query to judge whether these three sides can form a triangle, assuming table <code>triangle</code> holds the length of the three sides x, y and z.</p>\r\n \r\n<pre>\r\n| x  | y  | z  |\r\n|----|----|----|\r\n| 13 | 15 | 30 |\r\n| 10 | 20 | 15 |\r\n</pre>\r\n \r\nFor the sample data above, your query should return the follow result:\r\n<pre>\r\n| x  | y  | z  | triangle |\r\n|----|----|----|----------|\r\n| 13 | 15 | 30 | No       |\r\n| 10 | 20 | 15 | Yes      |\r\n</pre>",
	"frequency":"36",
	"ac_num":"2704"
}