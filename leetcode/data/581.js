{
	"difficulty":"2",
	"submit_num":"6209",
	"show_id":"602",
	"leetcode_id":"602",
	"answers":[
		{
			"lc_ans_id":"103804",
			"view":"1669",
			"top":"0",
			"title":"Shouldn't we use Union instead of Union all?",
			"vote":"11",
			"content":"I think the answer missed the case when A send B a friend request, and B send A a friend request, and both requests got approved. In this case, A or B really just gained one friend. But the answer seems to count this case twice.\\nIsn't union (remove duplicates) should be used instead of union all?\\n```\\nselect id1 as id, count(id2) as num\\nfrom\\n(select requester_id as id1, accepter_id as id2 \\nfrom request_accepted\\nunion\\nselect accepter_id as id1, requester_id as id2 \\nfrom request_accepted) tmp1\\ngroup by id1 \\norder by num desc limit 1\\n```"
		},
		{
			"lc_ans_id":"103812",
			"view":"724",
			"top":"1",
			"title":"Share My Accepted SQL Query using \"union all\", the first Accepted answer of all",
			"vote":"5",
			"content":"```\\nselect id, count(*) num from \\n(\\n      (select requester_id id from request_accepted) \\n      union all \\n      (select accepter_id id from request_accepted)\\n) tb \\ngroup by id order by num desc limit 1\\n```"
		},
		{
			"lc_ans_id":"103811",
			"view":"590",
			"top":"2",
			"title":"Solution with UNION ALL and Aggregation",
			"vote":"3",
			"content":"select t3.id as id, count(t3.id) as num from \\n( \\nselect t1.requester_id as id, t1.accepter_id as friend_id from request_accepted as t1 \\nUNION ALL\\nselect t2.accepter_id as id, t2.requester_id as friend_id from request_accepted as t2\\n) \\nas t3\\nGROUP BY \\nt3.id \\nORDER BY num DESC\\nLIMIT 1;"
		},
		{
			"lc_ans_id":"103805",
			"view":"31",
			"top":"3",
			"title":"Solution beats 99.67%, Group By before Union All",
			"vote":"0",
			"content":"```\\nSELECT id, sum(cnt) num FROM\\n(\\n    SELECT requester_id id, count(*) cnt FROM request_accepted GROUP BY requester_id\\n    UNION ALL\\n    SELECT accepter_id id, count(*) cnt FROM request_accepted GROUP BY accepter_id\\n) AS T1\\nGROUP BY id\\nORDER BY num DESC\\nLIMIT 1;\\n```"
		},
		{
			"lc_ans_id":"103807",
			"view":"37",
			"top":"4",
			"title":"The test case is not correct?",
			"vote":"0",
			"content":"[[14,3,\"2016/11/27\"],\\n[16,2,\"2016/11/22\"],\\n[11,3,\"2017/01/02\"],\\n[12,17,\"2017/01/19\"],\\n[17,1,\"2016/12/12\"],[16,4,\"2016/11/01\"],[12,14,\"2017/02/22\"],[19,3,\"2016/10/28\"],[4,1,\"2017/01/13\"],[9,19,\"2016/11/13\"],[3,12,\"2017/01/11\"],[14,1,\"2017/04/05\"],[12,5,\"2016/10/25\"],[2,1,\"2017/03/10\"],[14,5,\"2017/01/14\"],[9,3,\"2016/11/15\"],[19,17,\"2017/01/20\"],[2,18,\"2016/10/23\"],[19,6,\"2017/03/28\"],[16,13,\"2016/10/28\"],[15,19,\"2016/10/03\"],[11,16,\"2017/02/10\"],[12,13,\"2016/11/28\"],[10,20,\"2017/01/02\"],[9,15,\"2017/01/01\"],[20,4,\"2017/04/05\"],[16,5,\"2016/11/23\"],[9,13,\"2017/01/21\"],[17,7,\"2016/10/01\"],[4,17,\"2016/12/07\"],[19,11,\"2017/02/14\"],[12,7,\"2016/12/21\"],[3,16,\"2016/09/29\"],[8,7,\"2017/03/01\"],[4,13,\"2017/03/14\"],[7,14,\"2017/03/16\"],[12,18,\"2016/10/09\"],[7,20,\"2016/10/20\"],[17,18,\"2016/12/14\"],[14,17,\"2017/01/23\"],[3,7,\"2017/03/02\"],[6,13,\"2016/10/21\"],[19,9,\"2016/11/16\"],[4,8,\"2017/03/22\"],[12,16,\"2017/02/01\"],[7,11,\"2017/01/09\"],[19,10,\"2017/02/11\"],[18,8,\"2017/03/18\"],[19,20,\"2016/11/11\"],[19,4,\"2017/01/13\"],[2,20,\"2016/10/02\"],[7,15,\"2017/01/03\"],[18,12,\"2016/12/08\"],[10,5,\"2016/11/29\"],[12,4,\"2017/01/04\"],[15,4,\"2017/01/08\"],[8,11,\"2016/10/15\"],[16,10,\"2017/03/25\"],[10,6,\"2016/11/03\"],[16,19,\"2016/11/15\"],[2,3,\"2017/02/03\"],[7,12,\"2017/01/01\"],[16,18,\"2016/12/30\"],[12,17,\"2017/03/23\"],[8,15,\"2016/09/29\"],[20,13,\"2016/12/15\"],[11,1,\"2017/03/31\"],[12,4,\"2016/12/24\"],[12,11,\"2016/12/16\"],[10,18,\"2017/02/11\"],[17,16,\"2016/11/07\"],[20,10,\"2017/04/09\"],[18,20,\"2016/11/08\"],[11,14,\"2016/10/25\"],[5,10,\"2016/10/11\"],[15,5,\"2017/03/26\"]]}}\\n\\n\\n(12,17) pair counts twice while the problem claims\\n\"The friend request could only been accepted once, which mean there is no multiple records with the same requester_id and accepter_id value.\"\\nThe UNION ALL solution can't detect such senarios."
		},
		{
			"lc_ans_id":"103808",
			"view":"62",
			"top":"5",
			"title":"Solution Using UNION, ORDER BY and LIMIT",
			"vote":"0",
			"content":"```\\n# Write your MySQL query statement below\\nSELECT\\n    u1.id,\\n    u1.num\\nFROM (\\n    SELECT \\n        u2.id,\\n        (\\n            SELECT COUNT(r.requester_id)\\n            FROM request_accepted r\\n            WHERE r.requester_id = u2.id\\n        ) + (\\n            SELECT COUNT(r.accepter_id)\\n            FROM request_accepted r\\n            WHERE r.accepter_id = u2.id\\n        ) AS \"num\"\\n    FROM ((\\n        SELECT requester_id AS \"id\"\\n        FROM request_accepted \\n    ) UNION (\\n        SELECT accepter_id AS \"id\"\\n        FROM request_accepted\\n    )) u2\\n) u1\\nORDER BY u1.num DESC\\nLIMIT 1;\\n```"
		},
		{
			"lc_ans_id":"103809",
			"view":"69",
			"top":"6",
			"title":"shouldn't we consider the duplicated requests?",
			"vote":"0",
			"content":"just borrow the idea from Friend Request I, there might be a case when two same requests are sent and accepted (as explained in Q I). So I tried to take this into consideration instead of simply count the frequency that a single id occurs (either as a requester_id or accepter_id)\\n\\nbut my code can't pass the test and is announced wrong. I'm confused.Can someone help to point out my mistake? Thanks!\\n```\\nselect id, sum(num)as num from\\n(select requester_id as id, count(distinct requester_id,accepter_id)as num from request_accepted group by requester_id\\nunion all\\nselect accepter_id as id, count(distinct requester_id,accepter_id)as num from request_accepted group by accepter_id)as stat1\\ngroup by id\\norder by num DESC limit 1;\\n```"
		},
		{
			"lc_ans_id":"103810",
			"view":"410",
			"top":"7",
			"title":"My simplest solution",
			"vote":"0",
			"content":"select t.id as id, count(t.id) as num from \\n(select r1.requester_id as id from request_accepted r1 union all select r2.accepter_id as id from request_accepted r2)  t\\ngroup by t.id order by count(t.id) desc limit 1"
		},
		{
			"lc_ans_id":"103806",
			"view":"438",
			"top":"8",
			"title":"my solution using all which can handle tie issues",
			"vote":"0",
			"content":"SELECT id, count(*) as num FROM \\n(select requester_id as id FROM request_accepted \\nUNION ALL\\nselect accepter_id as id FROM request_accepted ) sub\\nGROUP BY id\\nhaving count(*) >= ALL (SELECT count(*) as num FROM \\n(select requester_id as id FROM request_accepted \\nUNION ALL\\nselect accepter_id as id FROM request_accepted ) sub\\nGROUP BY id)"
		}
	],
	"id":"581",
	"title":"Friend Requests II: Who Has the Most Friends",
	"content":"In social network like Facebook or Twitter, people send friend requests and accept others' requests as well.</p>\r\nTable <code>request_accepted</code> holds the data of friend acceptance, while <b>requester_id</b> and <b>accepter_id</b> both are the id of a person.\r\n</p>\r\n<pre>\r\n| requester_id | accepter_id | accept_date|\r\n|--------------|-------------|------------|\r\n| 1            | 2           | 2016_06-03 |\r\n| 1            | 3           | 2016-06-08 |\r\n| 2            | 3           | 2016-06-08 |\r\n| 3            | 4           | 2016-06-09 |\r\n</pre>\r\n \r\nWrite a query to find the the people who has most friends and the most friends number. For the sample data above, the result is:\r\n<pre>\r\n| id | num |\r\n|----|-----|\r\n| 3  | 3   |\r\n</pre>\r\n \r\n<b>Note:</b>\r\n<li>It is guaranteed there is only 1 people having the most friends.</li>\r\n<li>The friend request could only been accepted once, which mean there is no multiple records with the same <b>requester_id</b> and <b>accepter_id</b> value.\r\n</p>\r\n \r\n<b>Explanation:</b></br>\r\nThe person with id '3' is a friend of people '1', '2' and '4', so he has 3 friends in total, which is the most number than any others.</p>\r\n \r\n<b>Follow-up:</b></br> In the real world, multiple people could have the same most number of friends, can you find all these people in this case?\r\n",
	"frequency":"7",
	"ac_num":"2642"
}