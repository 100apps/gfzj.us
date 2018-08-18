{
	"difficulty":"2",
	"submit_num":"6217",
	"show_id":"614",
	"leetcode_id":"614",
	"answers":[
		{
			"lc_ans_id":"104228",
			"view":"1292",
			"top":"0",
			"title":"Accept without subquery",
			"vote":"5",
			"content":"```\\n# Write your MySQL query statement below\\nSelect f1.follower, count(distinct f2.follower) as num\\nfrom follow f1\\ninner join follow f2 on f1.follower = f2.followee\\nGroup by f1.follower\\n```"
		},
		{
			"lc_ans_id":"104225",
			"view":"238",
			"top":"1",
			"title":"The OJ has a bug! upper and lower case",
			"vote":"3",
			"content":"The table and OJ code use upper and lower case, such as 'B' and 'b' interchangeably. But it requires specific upper or lower case in the output, to be consistent with follower column only!\\n\\nHere is my answer to apply this approach.\\n```\\nselect distinct follower, num\\nfrom follow, \\n(select followee, count(distinct follower) as num from follow \\ngroup by followee) as t\\nwhere follower = t.followee\\norder by follower;\\n```"
		},
		{
			"lc_ans_id":"104227",
			"view":"297",
			"top":"2",
			"title":"Wrong name in the output table?",
			"vote":"1",
			"content":"I think the output table should be called\\n`followee` instead of `follower`, right?\\nBecause we're counting the numbers of followers for each followee, instead of the other way around, right?"
		},
		{
			"lc_ans_id":"104226",
			"view":"11",
			"top":"3",
			"title":"Accept 1125 ms",
			"vote":"0",
			"content":"Select distinct f1.follower AS follower, Count(distinct(f2.follower)) AS num\\nFrom follow f1, follow f2\\nWhere f1.follower = f2.followee\\ngroup by f2.followee\\nhaving Count(distinct(f2.follower)) >= 1"
		},
		{
			"lc_ans_id":"104229",
			"view":"80",
			"top":"4",
			"title":"AC code with Clear Explanation for all corner cases",
			"vote":"0",
			"content":"The first thing we should do is understand the question correctly.\\n\\nin the example\\n```\\n+-------------+------------+\\n| followee    | follower   |\\n+-------------+------------+\\n|     A       |     B      |\\n|     B       |     C      |\\n|     B       |     D      |\\n|     D       |     E      |\\n+-------------+------------+\\n\\n+-------------+------------+\\n| follower    | num        |\\n+-------------+------------+\\n|     B       |  2         |\\n|     D       |  1         |\\n+-------------+------------+\\n```\\nFor A, B, D, they have 1, 2, 1 follower correspondingly.\\nWhile we don't output **A-1**  because A is not in the column follower, which means it is **not** a **Second Degree Follower**\\n\\nSo I came up with code like these(which is **WRONG**)\\n```\\nselect f1.followee as follower, count(f1.follower) as num \\nfrom follow f1 where f1.followee in (select distinct follower from follow) \\ngroup by f1.followee \\norder by follower;\\n```\\nThe reason is that there may be duplicate followee-follower as input\\n```\\n+-------------+------------+\\n| followee    | follower   |\\n+-------------+------------+\\n|     A       |     B      |\\n|     B       |     C      |\\n|     B       |     C      |\\n|     D       |     E      |\\n+-------------+------------+\\n```\\nThe code above output B-2 while we should output B-1\\nWhile it didn't pass when I change the first line into \\n```\\nselect f1.followee as follower, count(distinct f1.follower) as num \\n```\\n\\nAfter a while, I realize that there may be something wrong with the alphabet policy. All my output values were correct, but the followee may change from lower case to upper case (actually I have no idea and MySQL seems to be case insensitive)\\n\\nSo finally I try another answer credit to @xiaxin and get AC.\\n```\\nselect f1.follower, count(distinct f2.follower) as num\\nfrom follow f1\\njoin follow f2 on f1.follower = f2.followee\\ngroup by f1.follower\\norder by f1.follower;\\n```"
		},
		{
			"lc_ans_id":"104233",
			"view":"58",
			"top":"5",
			"title":"My answer",
			"vote":"0",
			"content":"\\nselect f1.followee as follower, count(f1.followee) as num from follow f1\\nwhere f1.followee in (select follower from follow f2)\\ngroup by 1"
		},
		{
			"lc_ans_id":"104234",
			"view":"109",
			"top":"6",
			"title":"easy understand solution",
			"vote":"0",
			"content":"select f1.follower, count(distinct f2.follower) as num FROM follow f1 JOIN follow f2 ON f1.follower = f2.followee GROUP BY f1.follower"
		},
		{
			"lc_ans_id":"104230",
			"view":"476",
			"top":"7",
			"title":"Why this solution can't pass the 11/12 case?",
			"vote":"0",
			"content":"The expected answer and my output of the case is shown as follows, it seems that the different is the upper and lower case difference. Why that difference happened? And I think this should be the correct answer btw.\\n![0_1498884035282_\\u65e0\\u6807\\u9898.png](/assets/uploads/files/1498884036909-\\u65e0\\u6807\\u9898-resized.png) \\nBelow is my code:\\n```\\nselect f1.followee as follower, count(*) as num from \\n(select distinct followee, follower from follow f where f.followee in \\n(select distinct f2.follower from follow f2)) \\nf1 group by f1.followee\\n```"
		},
		{
			"lc_ans_id":"104235",
			"view":"128",
			"top":"8",
			"title":"what's wrong?",
			"vote":"0",
			"content":"select followee as follower, count(followee) as num from follow\\nwhere followee in (select follower as followee from follow)\\ngroup by followee \\norder by follower   \\n\\n\\n\\nnot sure what's wrong with my answer?"
		},
		{
			"lc_ans_id":"104237",
			"view":"111",
			"top":"9",
			"title":"Share my beats 90% mySQL solution",
			"vote":"0",
			"content":"```\\n# Write your MySQL query statement below\\n#| followee    | follower   |\\n#+-------------+------------+\\n#|     A       |     B      |\\n#|     B       |     C      |\\n#|     B       |     D      |\\n#|     D       |     E      |\\n#+-------------+------------+\\n\\nSelect \\n    distinct f.follower follower,\\n    ff.num num\\nfrom\\n    follow f\\ninner join\\n    (\\n    Select \\n        distinct followee followee,\\n        count(distinct follower) num\\n    from \\n        follow\\n    group by\\n        followee) ff\\non \\n    f.follower = ff.followee\\ngroup by\\n    follower;\\n```"
		}
	],
	"id":"593",
	"title":"Second Degree Follower",
	"content":"<p>\nIn facebook, there is a <code>follow</code> table with two columns: <b>followee</b>, <b>follower</b>.\n</p><p>\nPlease write a sql query to get the amount of each follower’s follower if he/she has one.\n</p>\n<p>\nFor example:\n<pre>\n+-------------+------------+\n| followee    | follower   |\n+-------------+------------+\n|     A       |     B      |\n|     B       |     C      |\n|     B       |     D      |\n|     D       |     E      |\n+-------------+------------+\n</pre>\nshould output:\n<pre>\n+-------------+------------+\n| follower    | num        |\n+-------------+------------+\n|     B       |  2         |\n|     D       |  1         |\n+-------------+------------+\n</pre>\n<b>Explaination:</b><br/>\nBoth B and D exist  in the follower list, when as a followee, B's follower is C and D, and D's follower is E.  A does not exist in follower list.\n</p>\n</p>\n<b>Note:</b><br/>\nFollowee would not follow himself/herself in all cases.<br/>\nPlease display the result in follower's alphabet order.\n</p>",
	"frequency":"48",
	"ac_num":"1455"
}