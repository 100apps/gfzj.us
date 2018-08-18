{
	"difficulty":"1",
	"submit_num":"8699",
	"show_id":"597",
	"leetcode_id":"597",
	"answers":[
		{
			"lc_ans_id":"103580",
			"view":"2063",
			"top":"0",
			"title":"1-liner with explanation",
			"vote":"4",
			"content":"It passed all the test case, but I am not sure if I understand the problem in the correct way. What I did is simply using the number of distinct records `(requester_id,accepter_id)` in `request_accepted` divided by the number of distinct records `(sender_id,send_to_id)` in `friend_request`\\n```\\nselect ifnull(round((select count(distinct requester_id,accepter_id) from request_accepted)/(select count(distinct sender_id, send_to_id) from friend_request),2),0) accept_rate\\n```"
		},
		{
			"lc_ans_id":"103586",
			"view":"377",
			"top":"1",
			"title":"Strange test case...",
			"vote":"2",
			"content":"Accepted solution:\\n```\\nSELECT ROUND(IFNULL(COUNT(DISTINCT requester_id , accepter_id) / COUNT(DISTINCT sender_id, send_to_id), 0), 2) AS accept_rate\\nFROM friend_request, request_accepted\\n```\\nBut there is a test case:\\n```\\nInput: {\\n\\t\"headers\": {\\n\\t\\t\"friend_request\":[\"sender_id\",\"send_to_id\",\"request_date\"],\\n\\t\\t\"request_accepted\":[\"requester_id\",\"accepter_id\",\"accept_date\"]\\n\\t},\\n \\t\"rows\":{\\n \\t\\t\"friend_request\":[[1,2,\"2016/06/01\"],[1,3,\"2016/06/01\"],[1,4,\"2016/06/01\"],[2,3,\"2016/06/02\"]],\\n\\t\\t\"request_accepted\":[[1,2,\"2016/06/03\"],[1,3,\"2016/06/08\"],[2,3,\"2016/06/08\"],[3,4,\"2016/06/09\"]]\\n\\t}\\n}\\n```\\nI think it should output 0.75 while the expected answer is 1.00"
		},
		{
			"lc_ans_id":"103583",
			"view":"67",
			"top":"2",
			"title":"one possible answer for question 2 cumulative sums by day.",
			"vote":"1",
			"content":"```\\nselect \\ns.date, \\nifnull(round(sum(case when t.ind = 'a' then t.cnt else 0 end)/sum(case when t.ind = 'r' then t.cnt else 0 end),2),0) as accept_rate\\n\\nfrom \\n(select distinct x.request_date as date from friend_request as x \\nunion \\n select distinct y.accept_date as date from request_accepted as y \\n) as s \\nleft join \\n(select v.request_date as date, count(*) as cnt,'r' as ind from friend_request as v group by v.request_date\\nunion all\\n select w.accept_date as date, count(*) as cnt,'a' as ind from request_accepted as w group by w.accept_date\\n) as t \\non s.date >= t.date \\ngroup by s.date\\n```"
		},
		{
			"lc_ans_id":"103579",
			"view":"1378",
			"top":"3",
			"title":"Following up questions. Solved Q1 how to solve Q2?",
			"vote":"1",
			"content":"Following up question 1. But I don't know how to solve Q2. do we need some function to do it cumulatively?\\n```\\nselect if(d.req =0, 0.00, round(c.acp/d.req,2)) as accept_rate, c.month from \\n(select count(distinct requester_id, accepter_id) as acp, Month(accept_date) as month from request_accepted) c, \\n(select count(distinct sender_id, send_to_id) as req, Month(request_date) as month from friend_request) d \\nwhere c.month = d.month \\ngroup by c.month\\n```"
		},
		{
			"lc_ans_id":"103588",
			"view":"1946",
			"top":"4",
			"title":"Simply query",
			"vote":"1",
			"content":"```\\nselect if( f.ct = 0, 0.00, cast(r.ct/f.ct as decimal(4,2) ) ) as accept_rate\\nfrom\\n(select count(distinct sender_id, send_to_id) as ct\\nfrom friend_request) as f\\njoin\\n(select count(distinct requester_id, accepter_id) as ct\\nfrom request_accepted) as r\\n```"
		},
		{
			"lc_ans_id":"103592",
			"view":"313",
			"top":"5",
			"title":"My Accepted Answer",
			"vote":"1",
			"content":"``` select case when (select count(distinct sender_id, send_to_id) from friend_request)=0 then 0.00 ```\\n```      else round(count(distinct requester_id, accepter_id)/(select count(distinct sender_id, send_to_id) from friend_request), 2) end as accept_rate ```\\n```from request_accepted  ```"
		},
		{
			"lc_ans_id":"103593",
			"view":"224",
			"top":"6",
			"title":"hint for getting correct solution",
			"vote":"1",
			"content":"You have to count the number of non duplicate rows in each table and divide them and round them, also null should be converted to 0. You can use ifnull, round , count functions as well."
		},
		{
			"lc_ans_id":"103581",
			"view":"141",
			"top":"7",
			"title":"Easy no subquery AC solution",
			"vote":"0",
			"content":"\\n\\tselect \\n\\tifnull((select round(count(distinct requester_id,accepter_id)/count(distinct sender_id, send_to_id),2)\\n\\tfrom request_accepted, friend_request),0)\\n\\tas accept_rate"
		},
		{
			"lc_ans_id":"103584",
			"view":"93",
			"top":"8",
			"title":"Use COUNT DISTINCT",
			"vote":"0",
			"content":"```\\nSELECT ROUND(IFNULL(\\n    (SELECT COUNT(DISTINCT requester_id, accepter_id) FROM request_accepted AS tmp1)\\n    /\\n    (SELECT COUNT(DISTINCT sender_id, send_to_id) FROM friend_request AS tmp2),0),2) AS accept_rate\\n\\n\\n```"
		},
		{
			"lc_ans_id":"103585",
			"view":"58",
			"top":"9",
			"title":"My try at follow up question 2 in Oracle. Can someone please validate?",
			"vote":"0",
			"content":"\"\"\"select coalesce(accept_date,request_date),(cum_acc_count/cum_req_count) as cum_acc_rate\\nfrom(\\nselect req.request_date,acc.accept_date,req.daily_req_count,acc.daily_acc_count,\\n(acc.daily_acc_count/req.daily_req_count) as daily_accept_rate,\\nsum(req.daily_req_count) over(order by req.request_date rows between unbounded preceding and current row) as cum_req_count,\\nsum(acc.daily_acc_count) over(order by acc.accept_date rows between unbounded preceding and current row) as cum_acc_count\\nfrom\\n(select request_date,count(*) as daily_req_count\\nfrom(\\nselect sender_id,send_to_id,min(request_date) as request_date\\nfrom friend_request\\ngroup by sender_id,send_to_id)\\ngroup by request_date) req full join\\n(select accept_date,count(*) as daily_acc_count\\nfrom(\\nselect requester_id,accepter_id,min(accept_date) as accept_date\\nfrom request_accepted\\ngroup by requester_id,accepter_id)\\ngroup by accept_date) acc\\non req.request_date = acc.accept_date)\\norder by 1\"\"\""
		}
	],
	"id":"576",
	"title":"Friend Requests I: Overall Acceptance Rate",
	"content":"In social network like Facebook or Twitter, people send friend requests and accept others’ requests as well. Now given two tables as below:</p>\n\nTable: <code>friend_request</code>\n<pre>\n| sender_id | send_to_id |request_date|\n|-----------|------------|------------|\n| 1         | 2          | 2016_06-01 |\n| 1         | 3          | 2016_06-01 |\n| 1         | 4          | 2016_06-01 |\n| 2         | 3          | 2016_06-02 |\n| 3         | 4          | 2016-06-09 |\n</pre></p>\n\nTable: <code>request_accepted</code>\n<pre>\n| requester_id | accepter_id |accept_date |\n|--------------|-------------|------------|\n| 1            | 2           | 2016_06-03 |\n| 1            | 3           | 2016-06-08 |\n| 2            | 3           | 2016-06-08 |\n| 3            | 4           | 2016-06-09 |\n| 3            | 4           | 2016-06-10 |\n</pre></p>\n\nWrite a query to find the overall acceptance rate of requests rounded to 2 decimals, which is the number of acceptance divide the number of requests.</p>\n\nFor the sample data above, your query should return the following result.</p>\n<pre>\n|accept_rate|\n|-----------|\n|       0.80|\n</pre></p>\n\n<b>Note:</b>\n<li>The accepted requests are not necessarily from the table <code>friend_request</code>. In this case, you just need to simply count the total accepted requests (no matter whether they are in the original requests), and divide it by the number of requests to get the acceptance rate.</li>\n<li>It is possible that a sender sends multiple requests to the same receiver, and a request could be accepted more than once. In this case, the ‘duplicated’ requests or acceptances are only counted once.</li>\n<li>If there is no requests at all, you should return 0.00 as the accept_rate. </li>\n</p>\n\n<b>Explanation:</b> There are 4 unique accepted requests, and there are 5 requests in total. So the rate is 0.80.</p>\n\n<b>Follow-up:</b></br>\n<li>Can you write a query to return the accept rate but for every month?</li>\n<li>How about the cumulative accept rate for every day?</li>",
	"frequency":"87",
	"ac_num":"3376"
}