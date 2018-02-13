{
	"difficulty":"1",
	"submit_num":"3746",
	"show_id":"603",
	"leetcode_id":"603",
	"answers":[
		{
			"lc_ans_id":"103822",
			"view":"1163",
			"top":"0",
			"title":"Accepted Answer",
			"vote":"6",
			"content":"```\\nselect C1.seat_id from cinema C1  where \\nC1.free=1 \\nand \\n(\\n    C1.seat_id+1 in (select seat_id from cinema where free=1) \\n    or \\n    C1.seat_id-1 in (select seat_id from cinema where free=1) \\n) \\norder by C1.seat_id\\n```"
		},
		{
			"lc_ans_id":"103815",
			"view":"555",
			"top":"1",
			"title":"AC using self join",
			"vote":"2",
			"content":"```\\nselect distinct a.seat_id\\nfrom cinema a\\njoin cinema b\\non abs(a.seat_id - b.seat_id) = 1\\nand a.free=true and b.free=true\\norder by a.seat_id;\\n```"
		},
		{
			"lc_ans_id":"103816",
			"view":"165",
			"top":"2",
			"title":"Simple answer using join",
			"vote":"1",
			"content":"Join two tables of left and right seats and check for the conditions where middle and left or right are empty.\\n\\n```sql\\nSELECT middle_seat.seat_id\\nFROM cinema middle_seat\\nLEFT JOIN cinema left_seat\\n    ON middle_seat.seat_id - left_seat.seat_id = 1\\nLEFT JOIN cinema right_seat\\n    ON right_seat.seat_id - middle_seat.seat_id = 1\\nWHERE middle_seat.free = 1 AND (left_seat.free = 1 OR right_seat.free = 1)\\nORDER BY middle_seat.seat_id\\n;\\n```"
		},
		{
			"lc_ans_id":"103819",
			"view":"211",
			"top":"3",
			"title":"Wrong test case",
			"vote":"1",
			"content":"Output for test case \\n{\"headers\":{\"cinema\":[\"seat_id\",\"free\"]},\"rows\":{\"cinema\":[[1,1],[2,1],[3,0],[4,1],[5,1]]}} is \\n{\"headers\": [\"seat_id\"], \"values\": [[1], [2], [4], [5]]}, which is weird since the description says \"Consecutive available seats are **more than 2 seats** consecutively available.\""
		},
		{
			"lc_ans_id":"103813",
			"view":"18",
			"top":"4",
			"title":"\\u7f8e\\u56fd\\u7559\\u5b66\\u751f\\u671f\\u672b\\u6210\\u7ee9\\u4e0d\\u53ca\\u683c/GPA\\u4f4e/\\u6302\\u79d1\\u6d88\\u9664\\u4fee\\u6539\\u54a8\\u8be2\\u6263\\uff1a972412767",
			"vote":"0",
			"content":"\\u8fd1\\u5e74\\u6765,\\u4e2d\\u56fd\\u7ecf\\u6d4e\\u53d1\\u5c55\\u8fc5\\u901f\\uff0c\\u6709\\u8d8a\\u6765\\u8d8a\\u591a\\u7684\\u5bb6\\u5ead\\u5e0c\\u671b\\u628a\\u5b69\\u5b50\\u9001\\u5230\\u7f8e\\u56fd\\u6765\\u6df1\\u9020\\uff0c\\u56e0\\u6b64\\u5bfc\\u81f4\\u7f8e\\u56fd\\u7559\\u5b66\\u6108\\u6765\\u6108\\u70ed\\uff0c\\u5728\\u7f8e\\u7559\\u5b66\\u7684\\u4e2d\\u56fd\\u7559\\u5b66\\u751f\\u4eba\\u6570\\u4e5f\\u76f4\\u7ebf\\u4e0a\\u5347\\u3002\\u7f8e\\u56fd\\u5927\\u5b66\\u4e5f\\u975e\\u5e38\\u559c\\u6b22\\u4e2d\\u56fd\\u7559\\u5b66\\u751f\\u5165\\u6821\\u5b66\\u4e60\\u3002\\u56e0\\u4e3a\\u5bf9\\u4ed6\\u4eec\\u6765\\u8bf4\\u4e2d\\u56fd\\u5b66\\u751f\\u4e0d\\u4ec5\\u6210\\u7ee9\\u597d\\u800c\\u4e14\\u8fd8\\u4f1a\\u4e3a\\u4ed6\\u4eec\\u5e26\\u6765\\u4e00\\u7b14\\u5f88\\u53ef\\u89c2\\u7684\\u6536\\u5165\\u3002\\u53ef\\u662f\\u968f\\u7740\\u7559\\u5b66\\u751f\\u7684\\u4eba\\u6570\\u589e\\u591a\\uff0c\\u4e5f\\u6709\\u540c\\u6837\\u7684\\u88ab\\u5b66\\u6821\\u5f00\\u9664\\uff0cI-20\\u88ab\\u5173\\u7684\\u5b66\\u751f\\u4e5f\\u8d8a\\u6765\\u8d8a\\u591a\\u3002\\n\\u9762\\u5bf9\\u7f8e\\u56fd\\u7684\\u9ad8\\u7b49\\u9662\\u6821\\uff0c\\u6559\\u5b66\\u8d28\\u91cf\\u826f\\u83a0\\u4e0d\\u9f50\\u3002\\u6709\\u4e00\\u4e9b\\u5e74\\u7ea7\\u5c1a\\u8f7b\\u7684\\u5c0f\\u7559\\u5b66\\u751f\\u521d\\u5230\\u7f8e\\u56fd\\uff0c\\u8fd8\\u4e0d\\u719f\\u6089\\u7f8e\\u56fd\\u7684\\u6559\\u5b66\\u73af\\u5883\\u5df2\\u7ecf\\u6559\\u5b66\\u5236\\u5ea6\\uff0c\\u603b\\u662f\\u7981\\u4e0d\\u4f4f\\u597d\\u5947\\u5fc3\\u7684\\u9a71\\u4f7f\\uff0c\\u559c\\u6b22\\u5230\\u5904\\u53bb\\u8d70\\u8d70\\u770b\\u770b\\uff0c\\u50cf\\u5728\\u56fd\\u5185\\u4e00\\u6837\\u65f7\\u65f7\\u8bfe\\uff0c\\u7761\\u4e2a\\u61d2\\u89c9\\uff0c\\u4ece\\u800c\\u5bfc\\u81f4GPA\\uff0c\\u548c\\u51fa\\u52e4\\u7387\\u7684\\u4e0b\\u964d\\u3002\\u5728\\u56fd\\u5185\\u770b\\u6765\\uff0c\\u8fd9\\u4e9b\\u90fd\\u662f\\u5fae\\u4e0d\\u8db3\\u9053\\u7684\\u5c0f\\u4e8b\\u3002\\u4f46\\u662f\\uff0c\\u5728\\u7f8e\\u56fd\\u7684\\u6559\\u80b2\\u4f53\\u5236\\u5185\\uff0c\\u51fa\\u52e4\\u7387\\u4e0d\\u8db3\\uff0c\\u4ee5\\u53caGPA\\u8fc7\\u4f4e\\u90fd\\u4f1a\\u5bfc\\u81f4\\u5b66\\u751f\\u88ab\\u5f00\\u9664\\u3002\\u636e\\u4e0d\\u5b8c\\u5168\\u7edf\\u8ba1\\uff0c\\u53bb\\u5e74\\u88ab\\u5f00\\u9664\\u7684\\u4e2d\\u56fd\\u5b66\\u751f\\u7ea6\\u67098000\\u4eba\\uff0c\\u8fd9\\u4e2a\\u6570\\u5b57\\u89e6\\u76ee\\u60ca\\u5fc3\\uff0c\\u540c\\u65f6\\u4e5f\\u53cd\\u6620\\u51fa\\u4e2d\\u56fd\\u7559\\u5b66\\u751f\\u4e0d\\u9002\\u5e94\\u7f8e\\u56fd\\u6559\\u5b66\\u4f53\\u5236\\u7684\\u79cd\\u79cd\\u95ee\\u9898\\u3002\\u5728\\u88ab\\u5f00\\u9664\\u7684\\u4eba\\u4e2d\\uff0c\\u56e0\\u5b66\\u672f\\u4e0d\\u8bda\\u5b9e\\u6216\\u5b66\\u672f\\u8868\\u73b0\\u5dee\\u800c\\u88ab\\u5f00\\u9664\\u7684\\u5b66\\u751f\\u5360\\u88ab\\u5f00\\u9664\\u603b\\u4eba\\u6570\\u768480.55%\\u3002\\u503c\\u5f97\\u6ce8\\u610f\\u7684\\u662f\\uff0c\\u88ab\\u5f00\\u9664\\u7684\\u5b66\\u751f\\u4e5f\\u5e76\\u4e0d\\u5168\\u662f\\u5dee\\u751f\\uff0c\\u6765\\u81ea\\u6392\\u540d\\u524d100\\u7684\\u540d\\u6821\\u751f\\u8d85\\u8fc7\\u4e8660%\\u3002\\u6709\\u80fd\\u529b\\u8fdb\\u5165\\u6392\\u540d\\u524d100\\u7684\\u5b66\\u6821\\u672c\\u6765\\u5c31\\u8bf4\\u660e\\u5b66\\u751f\\u672c\\u8eab\\u7684\\u7d20\\u8d28\\u5e76\\u4e0d\\u5dee\\uff0c\\u4f46\\u662f\\u7531\\u4e8e\\u79cd\\u79cd\\u539f\\u56e0\\u5b66\\u751f\\u9762\\u4e34\\u88ab\\u5b66\\u6821\\u5f00\\u9664\\u7684\\u56f0\\u6270\\uff0c\\u8fd9\\u5bf9\\u4e8e\\u5b66\\u751f\\u548c\\u5b66\\u751f\\u5bb6\\u957f\\u6765\\u8bf4\\u65e0\\u7591\\u662f\\u4e00\\u4e2a\\u6674\\u5929\\u9739\\u96f3\\u3002\\n\\u5bf9\\u4e8e\\u56fd\\u9645\\u7559\\u5b66\\u751f\\u6765\\u8bf4\\uff0c\\u88ab\\u5b66\\u6821\\u5f00\\u9664\\u8fd9\\u70b9\\u51e0\\u4e4e\\u662f\\u81f4\\u547d\\u7684\\uff0c\\u56e0\\u4e3a\\u4e00\\u65e6\\u5b66\\u6821\\u5c06\\u4f60\\u4ece\\u5b66\\u6821\\u7cfb\\u7edf\\u9664\\u540d\\uff0c\\u4f60\\u7684I-20\\u5c31\\u4f1a\\u88ab\\u5173\\uff08terminated\\uff09\\uff0c\\u5b66\\u6821\\u5c06\\u4f1a\\u7ed9\\u4f60\\u63d0\\u4f9b15\\u5929\\u7684\\u65f6\\u95f4\\u79bb\\u5883\\u3002\\u5982\\u679c15\\u5929\\u53ea\\u6709\\u4f60\\u4f9d\\u7136\\u8fd8\\u5728\\u7f8e\\u56fd\\u90a3\\u4f60\\u5c31\\u5df2\\u7ecf\\u53d8\\u6210\\u4e00\\u4f4d\\u9ed1\\u6237\\u4e86\\u3002\\u8fd9\\u5c06\\u5bf9\\u60a8\\u4ee5\\u540e\\u518d\\u6765\\u7f8e\\u7559\\u5b66\\u6216\\u65c5\\u6e38\\u90fd\\u9020\\u6210\\u5f88\\u5927\\u7684\\u4e0d\\u5229\\u3002\\u4e0d\\u8fc7I-20\\u88ab\\u5173\\u4e5f\\u4e0d\\u4ee3\\u8868\\u5b66\\u751f\\u4e0d\\u518d\\u6709\\u4efb\\u4f55\\u7559\\u5728\\u7f8e\\u56fd\\u5ff5\\u4e66\\u7684\\u673a\\u4f1a\\u3002\\u4e0b\\u9762\\u5c31\\u8ba9\\u6211\\u6765\\u4e3a\\u5927\\u5bb6\\u4ecb\\u7ecd\\u4e00\\u4e0b\\u6709\\u5173I-20\\u88ab\\u9ed1\\uff0c \\u8eab\\u4efd\\u6062\\u590d \\u7684\\u95ee\\u9898\\u3002\\u8054\\u7cfb\\u817e\\u8baf\\u6263\\u6263972412767\\n\\u9996\\u5148\\u8ba9\\u6211\\u4eec\\u5148\\u6765\\u4e86\\u89e3\\u4e00\\u4e0b\\u4ec0\\u4e48\\u662fI-20\\u4ee5\\u53ca\\u5b83\\u7684\\u4f5c\\u7528\\u6709\\u591a\\u5927\\u5462\\uff1fI-20\\u662f\\u7f8e\\u56fd\\u79fb\\u6c11\\u5c40\\u4e0b\\u53d1\\u7ed9\\u56fd\\u9645\\u7559\\u5b66\\u751f\\u4ee5\\u53ca\\u8bfb\\u8bed\\u8a00\\u5b66\\u6821\\u7684\\u5b66\\u751f\\u7528\\u6765\\u7533\\u8bf7\\u7f8e\\u56fd\\u7b7e\\u8bc1\\u8fdb\\u5165\\u7f8e\\u56fd\\u7684\\u901a\\u884c\\u8bc1\\u3002\\u6bcf\\u4e2a\\u7533\\u8bf7\\u6765\\u7f8e\\u7559\\u5b66\\u7684\\u5b66\\u751f\\u80af\\u5b9a\\u90fd\\u77e5\\u9053\\u3002 \\u5728\\u63a5\\u5230\\u5b66\\u6821\\u7684\\u5f55\\u53d6\\u901a\\u77e5\\uff08offer/admission\\uff09\\u7684\\u540c\\u65f6\\uff0c\\u7f8e\\u56fd\\u5b66\\u6821\\u8fd8\\u4f1a\\u7ed9\\u4f60\\u5bc4\\u6765\\u4e00\\u4efdI-20\\u3002\\u8fd9\\u5f20I-20\\u4e0a\\u9762\\u5c06\\u4f1a\\u8bb0\\u8f7d\\u4f60\\u5728\\u8be5\\u5b66\\u6821\\u4e0a\\u5b66\\u65f6\\u6240\\u6709\\u7684\\u51fa\\u5883\\u5165\\u5883\\u8bb0\\u5f55\\u3002 \\u4ee5\\u53ca\\u4f60\\u5728\\u7f8e\\u6c42\\u5b66\\u9636\\u6bb5\\u7684\\u8eab\\u4efd\\u72b6\\u6001\\u3002\\u4e00\\u65e6I-20\\u88ab\\u7f8e\\u56fd\\u79fb\\u6c11\\u5c40\\u5173\\u95ed\\uff0c\\u4f60\\u5728\\u7f8e\\u7684\\u5408\\u6cd5\\u8eab\\u4efd\\u5c06\\u7acb\\u5373\\u5931\\u6548\\u3002\\u7f8e\\u56fd\\u79fb\\u6c11\\u5c40\\u4f1a\\u8981\\u6c42\\u4f60\\u5728\\u9650\\u671f15\\u5929\\u4e4b\\u5185\\u79bb\\u5883\\u3002\\n\\u9996\\u5148\\uff0c\\u4e0d\\u8981\\u614c\\u5f20\\uff0c I-20\\u88ab\\u5173\\u4f60\\u4e5f\\u4e0d\\u4e00\\u5b9a\\u5c31\\u4f1a\\u88ab\\u5f3a\\u5236\\u9063\\u8fd4\\u56de\\u56fd\\u3002 \\u4f60\\u53ea\\u9700\\u8981\\u5728\\u77ed\\u65f6\\u95f4\\u5185\\u5728\\u7f8e\\u56fd\\u5883\\u5185\\u627e\\u5230\\u4e00\\u6240\\u613f\\u610f\\u63a5\\u6536\\u4f60\\u7684\\u5b66\\u6821\\u6765\\u5feb\\u901f\\u6062\\u590d\\u4f60\\u7684\\u8eab\\u4efd\\uff0c\\u5c31\\u80fd\\u7ee7\\u7eed\\u5408\\u6cd5\\u5c45\\u7559\\u5728\\u7f8e\\u56fd\\u751f\\u6d3b\\u5b66\\u4e60\\u3002\\u901a\\u8fc7\\u7533\\u8bf7\\u5b66\\u6821\\u6765\\u6062\\u590d\\u8eab\\u4efd\\u6709\\u4e24\\u79cd\\u9014\\u5f84\\u3002\\u4e00\\u79cd\\u662f\\u4e00\\u5929\\u5feb\\u901f\\u6062\\u590d\\u8eab\\u4efd\\u3002\\u8fd9\\u79cd\\u65b9\\u6cd5\\u7b80\\u5355\\u5feb\\u6377\\u3002\\u5b66\\u751f\\u5f53\\u5929\\u5c31\\u53ef\\u4ee5\\u6062\\u590d\\u5408\\u6cd5\\u8eab\\u4efd\\u3002\\u4f46\\u662f\\u8fd9\\u4e00\\u79cd\\u65b9\\u6cd5\\u8981\\u6c42\\u7559\\u5b66\\u751f\\u672c\\u4eba\\u5fc5\\u987b\\u4eb2\\u81ea\\u53bb\\u7f8e\\u56fd\\u4f4d\\u4e8e\\u5723\\u5730\\u4e9a\\u54e5\\u7684\\u79fb\\u6c11\\u5c40\\u4e00\\u8d9f\\uff0c\\u624d\\u80fd\\u987a\\u5229\\u529e\\u7406\\u3002\\u53e6\\u4e00\\u79cd\\u65b9\\u6cd5\\u662f\\u5411\\u79fb\\u6c11\\u5c40\\u7533\\u8bf7\\u91cd\\u65b0\\u6062\\u590d\\u5b66\\u751f\\u8eab\\u4efd(Reinstatement) \\u3002\\u8fd9\\u79cd\\u65b9\\u6cd5\\u6307\\u7684\\u662f\\u7559\\u5b66\\u751f\\u53ef\\u4ee5\\u5728I-20\\u88ab\\u5173\\u7684\\u4e94\\u4e2a\\u6708\\u5185\\u7533\\u8bf7\\u7f8e\\u56fd\\u5883\\u5185\\u5b66\\u6821\\u6765\\u6062\\u590d\\u8eab\\u4efd\\u3002\\u53ea\\u8981\\u4f60\\u7684\\u6848\\u5b50\\u4e00\\u7ecf\\u79fb\\u6c11\\u5c40\\u53d7\\u7406\\uff0c\\u5904\\u4e8epending\\u72b6\\u6001\\uff0c\\u4f60\\u5c31\\u53ef\\u4ee5\\u5408\\u6cd5\\u5728\\u7f8e\\u56fd\\u5c45\\u4f4f\\u3002\\u4f46\\u662f\\uff0c\\u5728\\u6b64\\u671f\\u95f4\\uff0c\\u7559\\u5b66\\u751f\\u4e0d\\u80fd\\u51fa\\u5883\\uff0c\\u56e0\\u4e3a\\u4e00\\u65e6\\u51fa\\u5883\\u518d\\u8fdb\\u5173\\u65f6\\uff0c\\u6d77\\u5173\\u4f1a\\u67e5\\u4f60\\u7684I-20\\uff0c\\u4f46\\u6b64\\u65f6\\u4f60\\u539f\\u6765\\u7684I-20\\u5df2\\u7ecf\\u8fc7\\u671f\\uff0c\\u4f60\\u5c31\\u4e0d\\u80fd\\u5728\\u5165\\u5883\\u7f8e\\u56fd\\u4e86\\u3002\\u4f46\\u662f\\uff0cI-20\\u88ab\\u5173\\u5c31\\u771f\\u7684\\u610f\\u5473\\u7740\\u4f60\\u8981\\u88ab\\u9063\\u8fd4\\u4e86\\u561b\\uff1f\\u9762\\u5bf9\\u8fd9\\u79cd\\u68d8\\u624b\\u7684\\u95ee\\u9898\\u4f60\\u5e94\\u8be5\\u600e\\u4e48\\u529e\\u5462\\uff1f \\u8054\\u7cfb\\u817e\\u8baf\\u6263\\u6263972412767"
		},
		{
			"lc_ans_id":"103814",
			"view":"19",
			"top":"5",
			"title":"Using Union",
			"vote":"0",
			"content":"Union takes care of duplicates\\n```\\nselect c1.seat_id from cinema c1, cinema c2\\nwhere c1.seat_id+1 = c2.seat_id \\nand c1.free = true \\nand c2.free = true\\nunion \\nselect c1.seat_id from cinema c1, cinema c2\\nwhere c1.seat_id = c2.seat_id+1\\nand c1.free = true \\nand c2.free = true\\norder by 1\\n```"
		},
		{
			"lc_ans_id":"103817",
			"view":"78",
			"top":"6",
			"title":"Accepted Solution without using join or in",
			"vote":"0",
			"content":"```\\nSELECT  c1.seat_id\\nFROM    cinema c1\\nWHERE   c1.free = 1 \\n    AND EXISTS (\\n        SELECT *\\n        FROM   cinema c2\\n        WHERE  (c1.seat_id = c2.seat_id - 1\\n            OR  c1.seat_id = c2.seat_id + 1)\\n            AND c2.free = 1\\n        )\\nORDER BY c1.seat_id\\n\\n```"
		},
		{
			"lc_ans_id":"103818",
			"view":"90",
			"top":"7",
			"title":"Inner Join solution",
			"vote":"0",
			"content":"```\\nSELECT DISTINCT t1.seat_id\\nFROM cinema t1\\n    INNER JOIN cinema t2 ON (\\n                (t2.seat_id = t1.seat_id + 1)\\n                OR\\n                (t1.seat_id = t2.seat_id + 1)\\n            )\\n            AND t1.free = 1 AND t2.free = 1\\nORDER BY t1.seat_id ASC\\n```"
		},
		{
			"lc_ans_id":"103820",
			"view":"110",
			"top":"8",
			"title":"Using self join and abs()",
			"vote":"0",
			"content":"```\\nselect distinct a.seat_id from\\ncinema a, cinema b\\nwhere (a.free=1 and b.free=1) and (abs(a.seat_id-b.seat_id)=1 )\\norder by a.seat_id\\n```"
		},
		{
			"lc_ans_id":"103821",
			"view":"398",
			"top":"9",
			"title":"Using 2 tables",
			"vote":"0",
			"content":"```\\nSELECT DISTINCT c1.seat_id\\nFROM cinema c1, cinema c2\\nWHERE (c1.seat_id = c2.seat_id -1 OR c1.seat_id = c2.seat_id +1)\\nAND c1.free = 1 AND c2.free = 1\\nORDER BY c1.seat_id;\\n```"
		}
	],
	"id":"582",
	"title":"Consecutive Available Seats",
	"content":"Several friends at a cinema ticket office would like to reserve consecutive available seats.</br>\r\nCan you help to query all the consecutive available seats order by the seat_id using the following <code>cinema</code> table?\r\n\r\n<pre>\r\n| seat_id | free |\r\n|---------|------|\r\n| 1       | 1    |\r\n| 2       | 0    |\r\n| 3       | 1    |\r\n| 4       | 1    |\r\n| 5       | 1    |\r\n</pre></p>\r\n\r\nYour query should return the following result for the sample case above.</p>\r\n<pre>\r\n| seat_id |\r\n|---------|\r\n| 3       |\r\n| 4       |\r\n| 5       |\r\n</pre>\r\n\r\n<b>Note</b>:\r\n<li>The seat_id is an auto increment int, and free is bool ('1' means free, and '0' means occupied.).</li>\r\n<li>Consecutive available seats are more than 2(inclusive) seats consecutively available.</li>\r\n</p>",
	"frequency":"9",
	"ac_num":"2070"
}