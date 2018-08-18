{
	"difficulty":"2",
	"submit_num":"3304",
	"show_id":"612",
	"leetcode_id":"612",
	"answers":[
		{
			"lc_ans_id":"104214",
			"view":"933",
			"top":"0",
			"title":"My easy understood solution",
			"vote":"2",
			"content":"```\\nselect ROUND(SQRT(min((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y))),2) as shortest\\nfrom point_2d p1,point_2d p2\\nwhere p1.x <> p2.x or p1.y <> p2.y;\\n```"
		},
		{
			"lc_ans_id":"104213",
			"view":"113",
			"top":"1",
			"title":"Simple solution beating 90%",
			"vote":"0",
			"content":"\"\"\"\\nselect round(min(sqrt(power((t1.x-t2.x), 2)+power((t1.y-t2.y),2))) , 2) as shortest from  point_2d t1 join point_2d t2 on t1.x !=t2.x or t1.y!=t2.y\\n\"\"\""
		},
		{
			"lc_ans_id":"104215",
			"view":"357",
			"top":"2",
			"title":"A simple Euclidian distance solution!",
			"vote":"0",
			"content":"```\\n# Write your MySQL query statement below\\nselect round(SQRT(min(pow(P1.y-P2.y,2)+pow(P1.x-P2.x,2))),2) as shortest\\nfrom point_2d P1,point_2d P2\\nwhere P1.x <> P2.x or P1.y <> P2.y\\n````"
		}
	],
	"id":"591",
	"title":"Shortest Distance in a Plane",
	"content":"Table <code>point_2d</code> holds the coordinates (x,y) of some unique points (more than two) in a plane.</p>\r\nWrite a query to find the shortest distance between these points rounded to  2 decimals.</p>\r\n \r\n<pre>\r\n| x  | y  |\r\n|----|----|\r\n| -1 | -1 |\r\n| 0  | 0  |\r\n| -1 | -2 |\r\n</pre></p>\r\n \r\nThe shortest distance is 1.00 from point (-1,-1) to (-1,2). So the output should be:</p>\r\n<pre>\r\n| shortest |\r\n|----------|\r\n| 1.00     |\r\n</pre></p>\r\n \r\n<b>Note:</b> The longest distance among all the points are less than 10000.</p>",
	"frequency":"39",
	"ac_num":"1745"
}