{
	"difficulty":"1",
	"submit_num":"4825",
	"show_id":"613",
	"leetcode_id":"613",
	"answers":[
		{
			"lc_ans_id":"104216",
			"view":"1576",
			"top":"0",
			"title":"Self join",
			"vote":"4",
			"content":"```\\nSELECT MIN(ABS(P1.x - P2.x)) AS shortest FROM point AS P1\\nJOIN point AS P2 ON P1.x <> P2.x\\n```"
		},
		{
			"lc_ans_id":"104217",
			"view":"457",
			"top":"1",
			"title":"The real no join solution that beats 99.71% submissions",
			"vote":"3",
			"content":"To speed up, no join is allowed. The \"no join\" posts actually use self join by doing ```select ... from point p1, point p2```.\\n\\nThe trick is the follow-up: when the points are sorted, the min distance must come from adjacent points. Since the distance of adjacent points is equivalent to the difference between two rows, we can use user-defined variable to keep the value from the previous row to do the calculation.\\n\\nThe code below runs in O(3n), comparing to the O(n^2) join methods \\uff08if merge join is used\\uff09.\\n```\\n# Initialize the prev variable to a big negative number so that the first value of difference will never get selected\\nset @prev := -100000000; \\nselect min(diff) as shortest\\nfrom (select (x - @prev) as diff, @prev := x \\n      from (select * from point order by x) t\\n     ) tt\\n;\\n```"
		},
		{
			"lc_ans_id":"104221",
			"view":"536",
			"top":"2",
			"title":"Solution for the follow-up question",
			"vote":"1",
			"content":"Since the `point` table is already sorted and has an `id` column, the only thing we need to do is to find out the minimum difference between 2 adjacent x values in the table. \\n\\n```\\nSELECT MIN(P1.x - P2.x) AS shortest \\nFROM point P1 JOIN point P2 ON P1.id = P2.id + 1 \\nWHERE P1.id > 1;\\n```"
		},
		{
			"lc_ans_id":"104218",
			"view":"38",
			"top":"3",
			"title":"Short beats 97.5% self join and min",
			"vote":"0",
			"content":"select min(p1.x - p2.x) as shortest\\nfrom point p1 inner join point p2\\non p1.x-p2.x>0;"
		},
		{
			"lc_ans_id":"104220",
			"view":"95",
			"top":"4",
			"title":"My solution without using join",
			"vote":"0",
			"content":"```\\nSELECT  MIN(Distance.distance) AS shortest\\nFROM    (\\n    SELECT  ABS(p1.x - p2.x) AS distance\\n    FROM    point p1, point p2\\n    WHERE   p1.x != p2.x\\n) Distance\\n```"
		},
		{
			"lc_ans_id":"104222",
			"view":"102",
			"top":"5",
			"title":"Similar Self Join Solution",
			"vote":"0",
			"content":"For the original question:\\n```\\nSELECT ABS(p1.x - p2.x) AS shortest\\nFROM point p1\\nJOIN point p2 ON p1.x <> p2.x\\nORDER BY shortest\\nLIMIT 1;\\n```\\nFor the follow up, we only need to compare adjacent points, because the table is sorted:\\n```\\nSELECT p2.x - p1.x AS shortest\\nFROM point p1\\nJOIN point p2 ON p1.id + 1 = p2.id\\nORDER BY shortest\\nLIMIT 1;\\n```"
		},
		{
			"lc_ans_id":"104219",
			"view":"295",
			"top":"6",
			"title":"no join",
			"vote":"0",
			"content":"```\\nselect min(abs(p1.x-p2.x)) as shortest from point p1, point p2\\nwhere p1.x<>p2.x;\\n```"
		},
		{
			"lc_ans_id":"104223",
			"view":"240",
			"top":"7",
			"title":"similar",
			"vote":"0",
			"content":"\\nselect abs(p1.x - p2.x) as shortest\\nfrom point p1, point p2\\nwhere p1.x > p2.x\\norder by 1\\nlimit 1;"
		},
		{
			"lc_ans_id":"104224",
			"view":"593",
			"top":"8",
			"title":"min() function",
			"vote":"0",
			"content":"select min(p1.x-p2.x) as shortest\\nfrom point p1, point p2\\nwhere p1.x-p2.x>0"
		}
	],
	"id":"592",
	"title":"Shortest Distance in a Line",
	"content":"Table <code>point</code> holds the x coordinate of some points on x-axis in a plane, which are all integers.</p>\r\nWrite a query to find the shortest distance between two points in these points.</p>\r\n \r\n<pre>\r\n| x   |\r\n|-----|\r\n| -1  |\r\n| 0   |\r\n| 2   |\r\n</pre></p>\r\n \r\nThe shortest distance is '1' obviously, which is from point '-1' to '0'. So the output is as below:</p>\r\n<pre>\r\n| shortest|\r\n|---------|\r\n| 1       |\r\n</pre></p>\r\n \r\n<b>Note:</b> Every point is unique, which means there is no duplicates in table <code>point</code>.</p>\r\n \r\n<b>Follow-up:</b> What if all these points have an id and are arranged from the left most to the right most of x axis?</p>",
	"frequency":"106",
	"ac_num":"3390"
}