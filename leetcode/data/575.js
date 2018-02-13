{
	"difficulty":"1",
	"submit_num":"40381",
	"show_id":"596",
	"leetcode_id":"596",
	"answers":[
		{
			"lc_ans_id":"103571",
			"view":"2960",
			"top":"0",
			"title":"All the same",
			"vote":"5",
			"content":"sql is always no more flexible\\n```\\nselect class from courses group by class having count(distinct student) >= 5;\\n```"
		},
		{
			"lc_ans_id":"103575",
			"view":"1123",
			"top":"1",
			"title":"my solution",
			"vote":"5",
			"content":"In fact, this is a \"no primary key\" table ,so it is possible to have same line like \\u201cA - math\\u201d \\u201cA - math\\u201d;\\nand in this case, you query should count 1 instead of 2.\\nhere is my query:\\n\\nselect class\\nfrom courses\\ngroup by class\\nhaving count(distinct student)>=5;"
		},
		{
			"lc_ans_id":"103574",
			"view":"890",
			"top":"2",
			"title":"General Solution....",
			"vote":"1",
			"content":"The key of this problem is the student key is not primary, so the table may have two identical rows. \\nUsing `DISTINCT` would solve this problem.\\n```\\nSELECT class\\nFROM (\\nSELECT DISTINCT student, class\\nFROM courses\\n) AS C\\nGROUP BY class\\nHAVING COUNT(*) >=5\\n```"
		},
		{
			"lc_ans_id":"103572",
			"view":"710",
			"top":"3",
			"title":"if \"count(student)>=5\"  is right ?",
			"vote":"1",
			"content":"Re: [my solution](/topic/89956/my-solution)\\n\\n**select class from courses group by class having count(student)>=5;**\\n\\n When i run this sql on my PC ,\\n the result is right.\\n But when i submit this sql to the website,\\n it says that it is a wrong answer."
		},
		{
			"lc_ans_id":"103569",
			"view":"17",
			"top":"4",
			"title":"The table may has the same row",
			"vote":"0",
			"content":"So the Solution should be:\\nselect a.class from (select distinct student, class from courses) a group by a.class having count(*) >= 5"
		},
		{
			"lc_ans_id":"103570",
			"view":"153",
			"top":"5",
			"title":"easy understanding solution, beat 99%",
			"vote":"0",
			"content":"select class from (\\nselect count(distinct student) as num,class from courses\\ngroup by class) as temp\\nwhere num>=5"
		},
		{
			"lc_ans_id":"103576",
			"view":"2310",
			"top":"6",
			"title":"simple solution",
			"vote":"0",
			"content":"```\\nSELECT class\\nFROM courses\\nGROUP BY class HAVING COUNT(DISTINCT student)>4\\n```"
		},
		{
			"lc_ans_id":"103578",
			"view":"641",
			"top":"7",
			"title":"it should be >=5",
			"vote":"0",
			"content":"having count >=5"
		},
		{
			"lc_ans_id":"103577",
			"view":"1060",
			"top":"8",
			"title":"\"More than\" or \"no less than\"??",
			"vote":"0",
			"content":"From the test case, I think it should be \"no less than\"."
		}
	],
	"id":"575",
	"title":"Classes More Than 5 Students",
	"content":"<p>\r\nThere is a table <code>courses</code> with columns: <b>student</b> and <b>class</b>\r\n</p><p>\r\nPlease list out all classes which have more than or equal to 5 students.\r\n</p>\r\n<p>\r\nFor example, the table:\r\n</p>\r\n<pre>\r\n+---------+------------+\r\n| student | class      |\r\n+---------+------------+\r\n| A       | Math       |\r\n| B       | English    |\r\n| C       | Math       |\r\n| D       | Biology    |\r\n| E       | Math       |\r\n| F       | Computer   |\r\n| G       | Math       |\r\n| H       | Math       |\r\n| I       | Math       |\r\n+---------+------------+\r\n</pre>\r\n<p>\r\nShould output:\r\n<pre>\r\n+---------+\r\n| class   |\r\n+---------+\r\n| Math    |\r\n+---------+\r\n</pre>\r\n</p>\r\n<p>\r\n<b>Note:</b><br>\r\nThe students should not be counted duplicate in each course.\r\n</p>",
	"frequency":"201",
	"ac_num":"11623"
}