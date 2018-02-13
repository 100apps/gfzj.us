{
	"difficulty":"1",
	"submit_num":"6120",
	"show_id":"586",
	"leetcode_id":"586",
	"answers":[
		{
			"lc_ans_id":"103297",
			"view":"885",
			"top":"0",
			"title":"Simple Solution using group by",
			"vote":"3",
			"content":"```\\nselect customer_number from orders\\ngroup by customer_number\\norder by count(*) desc limit 1;\\n```"
		},
		{
			"lc_ans_id":"103295",
			"view":"1045",
			"top":"1",
			"title":"subquery solution (handle  more than one numbers occurring the same number of max times)",
			"vote":"1",
			"content":"I think this can handle more than one numbers occurring the same number of max times:\\n```\\nSELECT customer_number FROM orders\\nGROUP BY customer_number\\nhaving count(distinct order_number) IN\\n(SELECT MAX(countn) FROM (select count(distinct order_number) as countn FROM orders GROUP BY customer_number) sub)\\n```"
		},
		{
			"lc_ans_id":"103296",
			"view":"503",
			"top":"2",
			"title":"Solution with GROUP BY and ORDER BY",
			"vote":"0",
			"content":"```\\nSELECT  customer_number\\nFROM    orders\\nGROUP BY customer_number\\nORDER BY COUNT(order_number) DESC \\nLIMIT 1\\n```"
		},
		{
			"lc_ans_id":"103298",
			"view":"1004",
			"top":"3",
			"title":"Solution",
			"vote":"0",
			"content":"select customer_number from(select customer_number ,count(*) cnt from test.orders group by customer_number order by cnt desc limit 1) a ;"
		}
	],
	"id":"567",
	"title":"Customer Placing the Largest Number of Orders",
	"content":"<p>Query the <b>customer_number</b> from the <b><i>orders</i></b> table for the customer who has placed the largest number of orders.</p>\r\n\r\n<p>It is guaranteed that exactly one customer will have placed more orders than any other customer.</p>\r\n\r\n<p>The <b><i>orders</i></b> table is defined as follows:</p>\r\n\r\n<pre>\r\n| Column            | Type      |\r\n|-------------------|-----------|\r\n| order_number (PK) | int       |\r\n| customer_number   | int       |\r\n| order_date        | date      |\r\n| required_date     | date      |\r\n| shipped_date      | date      |\r\n| status            | char(15)  |\r\n| comment           | char(200) |\r\n</pre>\r\n\r\n<p><b>Sample Input</b></p>\r\n<pre>\r\n| order_number | customer_number | order_date | required_date | shipped_date | status | comment |\r\n|--------------|-----------------|------------|---------------|--------------|--------|---------|\r\n| 1            | 1               | 2017-04-09 | 2017-04-13    | 2017-04-12   | Closed |         |\r\n| 2            | 2               | 2017-04-15 | 2017-04-20    | 2017-04-18   | Closed |         |\r\n| 3            | 3               | 2017-04-16 | 2017-04-25    | 2017-04-20   | Closed |         |\r\n| 4            | 3               | 2017-04-18 | 2017-04-28    | 2017-04-25   | Closed |         |\r\n</pre>\r\n\r\n<p><b>Sample Output</b></p>\r\n<pre>\r\n| customer_number |\r\n|-----------------|\r\n| 3               |\r\n</pre>\r\n\r\n<p><b>Explanation</b></p>\r\n<pre>\r\nThe customer with number '3' has two orders, which is greater than either customer '1' or '2' because each of them  only has one order. </br>So the result is customer_number '3'.\r\n</pre>\r\n\r\n<p><i><b>Follow up:</b> What if more than one customer have the largest number of orders, can you find all the customer_number in this case?</i></p>",
	"frequency":"60",
	"ac_num":"3602"
}