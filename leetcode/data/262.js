{
	"difficulty":"3",
	"submit_num":"84569",
	"show_id":"262",
	"leetcode_id":"262",
	"answers":[
		{
			"lc_ans_id":"69151",
			"view":"14513",
			"top":"0",
			"title":"Sharing my solution,",
			"vote":"30",
			"content":"    select \\n    t.Request_at Day, \\n    round(sum(case when t.Status like 'cancelled_%' then 1 else 0 end)/count(*),2) Rate\\n    from Trips t \\n    inner join Users u \\n    on t.Client_Id = u.Users_Id and u.Banned='No'\\n    where t.Request_at between '2013-10-01' and '2013-10-03'\\n    group by t.Request_at"
		},
		{
			"lc_ans_id":"69159",
			"view":"5727",
			"top":"1",
			"title":"Solution without join",
			"vote":"26",
			"content":"    SELECT Request_at as Day,\\n           ROUND(COUNT(IF(Status != 'completed', TRUE, NULL)) / COUNT(*), 2) AS 'Cancellation Rate'\\n    FROM Trips\\n    WHERE (Request_at BETWEEN '2013-10-01' AND '2013-10-03')\\n          AND Client_id NOT IN (SELECT Users_Id FROM Users WHERE Banned = 'Yes')\\n    GROUP BY Request_at;"
		},
		{
			"lc_ans_id":"69198",
			"view":"2032",
			"top":"2",
			"title":"Question towards problem description",
			"vote":"9",
			"content":"The question says \"Write a SQL query to find the cancellation rate of requests made by unbanned clients\". Why does the solution need to count the cancellations made by both clients and drivers, considering the the fact that it doesn't ask us to filter out banned drivers?"
		},
		{
			"lc_ans_id":"69204",
			"view":"3159",
			"top":"3",
			"title":"Sharing my solution",
			"vote":"9",
			"content":"    SELECT Trips.Request_at Day,\\n           round(sum(if(status != 'completed', 1, 0)) / sum(1), 2) 'Cancellation Rate'\\n    FROM Trips\\n    JOIN Users\\n      ON Trips.Client_Id = Users.Users_Id\\n    WHERE Users.Banned = 'No' \\n      AND Trips.Request_at between '2013-10-01' AND '2013-10-03'   \\n    GROUP BY Trips.Request_at"
		},
		{
			"lc_ans_id":"69195",
			"view":"1680",
			"top":"4",
			"title":"My solution share",
			"vote":"5",
			"content":"195ms~240ms\\n\\n\\n    SELECT\\n    \\tRequest_at,\\n    \\tround(\\n    \\t\\tcount(\\n    \\n    \\t\\t\\tIF (STATUS != 'completed', TRUE, NULL)\\n    \\t\\t) / count(*),\\n    \\t\\t2\\n    \\t) AS 'Cancellation Rate'\\n    FROM\\n    \\t(\\n    \\t\\tSELECT\\n    \\t\\t\\tRequest_at,\\n    \\t\\t\\tSTATUS\\n    \\t\\tFROM\\n    \\t\\t\\tUsers\\n    \\t\\tJOIN (\\n    \\t\\t\\tSELECT\\n    \\t\\t\\t\\tClient_Id,\\n    \\t\\t\\t\\tRequest_at,\\n    \\t\\t\\t\\tStatus\\n    \\t\\t\\tFROM\\n    \\t\\t\\t\\tTrips\\n    \\t\\t\\tWHERE\\n    \\t\\t\\t\\tRequest_at >= '2013-10-01'\\n    \\t\\t\\tAND Request_at <= '2013-10-03'\\n    \\t\\t) AS a ON Users.Users_Id = a.Client_Id\\n    \\t\\tWHERE\\n    \\t\\t\\tRole = 'client'\\n    \\t\\tAND Banned = 'No'\\n    \\t) b\\n    GROUP BY\\n    \\tRequest_at"
		},
		{
			"lc_ans_id":"69185",
			"view":"1142",
			"top":"5",
			"title":"Simple join + sum function solution",
			"vote":"4",
			"content":"    select t.Request_at as Day,\\n           round(sum(if(t.Status <> 'completed', 1, 0))/sum(1), 2) as 'Cancellation Rate'\\n    from Trips as t\\n    inner join Users as u on t.Client_id = u.Users_id and u.Banned <> 'Yes'\\n    where t.Request_at >= '2013-10-01' and t.Request_at <='2013-10-03'\\n    group by t.Request_at;"
		},
		{
			"lc_ans_id":"69174",
			"view":"690",
			"top":"6",
			"title":"129 ms solution",
			"vote":"2",
			"content":"```\\n# Write your MySQL query statement below\\nselect Day, round(avg(cnt), 2) as \"Cancellation Rate\"\\nfrom \\n(   select a.request_at as Day, \\n    @cnt := IF(a.Status = 'completed', 0, 1) as cnt\\n    from Trips a, Users b\\n    where a.Client_Id = b.Users_Id and b.Banned = 'No'\\n) c\\nwhere Day BETWEEN '2013-10-01' AND '2013-10-03'\\ngroup by Day\\n\\n\\n```"
		},
		{
			"lc_ans_id":"69191",
			"view":"351",
			"top":"7",
			"title":"Share my answer",
			"vote":"1",
			"content":"    select  t.`Request_at` as  Day ,\\n    round(\\n    sum(case when t.Status = 'completed' then 0 else 1 end) / count(1) ) \\n    ,2) as  'Cancellation Rate'\\n    from Trips t \\n    where (select Banned from Users u where t.Client_id = u.Users_id) = 'No' \\n    and (select Banned from Users u where t.Driver_id = u.Users_id) = 'No' \\n    and t.Request_at >= '2013-10-01' and t.Request_at <= '2013-10-03'\\n    group by t.`Request_at`"
		},
		{
			"lc_ans_id":"69186",
			"view":"905",
			"top":"8",
			"title":"My straightforward answer-223ms",
			"vote":"1",
			"content":"SELECT `Trips`.Request_at AS Day , ROUND(SUM(`Trips`.Status LIKE 'cancelled%')/COUNT(*),2) AS CancellationRate FROM `Trips`  JOIN `Users` ON `Users`.Users_id =`Trips`.Client_Id\\nWHERE (`Trips`.Request_at BETWEEN '2013-10-01' AND '2013-10-03') AND `Users`.Banned='No' \\nGROUP BY Day;"
		},
		{
			"lc_ans_id":"69152",
			"view":"17",
			"top":"9",
			"title":"share my simple solution",
			"vote":"0",
			"content":"```\\nselect t.request_at as Day, \\n       round(avg(if(t.status <>'completed',1,0)), 2) as \"Cancellation Rate\"\\nfrom Trips as t join users as u \\non t.client_id=u.users_id and u.banned='No' \\nwhere t.request_at between '2013-10-01' and '2013-10-03'\\ngroup by t.request_at\\n```"
		}
	],
	"id":"262",
	"title":"Trips and Users",
	"content":"<p>\nThe <code>Trips</code> table holds all taxi trips. Each trip has a unique Id, while Client_Id and Driver_Id are both foreign keys to the Users_Id at the <code>Users</code> table. Status is an ENUM type of (‘completed’, ‘cancelled_by_driver’, ‘cancelled_by_client’).</p>\n\n<pre>\n+----+-----------+-----------+---------+--------------------+----------+\n| Id | Client_Id | Driver_Id | City_Id |        Status      |Request_at|\n+----+-----------+-----------+---------+--------------------+----------+\n| 1  |     1     |    10     |    1    |     completed      |2013-10-01|\n| 2  |     2     |    11     |    1    | cancelled_by_driver|2013-10-01|\n| 3  |     3     |    12     |    6    |     completed      |2013-10-01|\n| 4  |     4     |    13     |    6    | cancelled_by_client|2013-10-01|\n| 5  |     1     |    10     |    1    |     completed      |2013-10-02|\n| 6  |     2     |    11     |    6    |     completed      |2013-10-02|\n| 7  |     3     |    12     |    6    |     completed      |2013-10-02|\n| 8  |     2     |    12     |    12   |     completed      |2013-10-03|\n| 9  |     3     |    10     |    12   |     completed      |2013-10-03| \n| 10 |     4     |    13     |    12   | cancelled_by_driver|2013-10-03|\n+----+-----------+-----------+---------+--------------------+----------+\n</pre>\n\n<p>\nThe <code>Users</code> table holds all users. Each user has an unique Users_Id, and Role is an ENUM type of (‘client’, ‘driver’, ‘partner’).</p>\n<pre>\n+----------+--------+--------+\n| Users_Id | Banned |  Role  |\n+----------+--------+--------+\n|    1     |   No   | client |\n|    2     |   Yes  | client |\n|    3     |   No   | client |\n|    4     |   No   | client |\n|    10    |   No   | driver |\n|    11    |   No   | driver |\n|    12    |   No   | driver |\n|    13    |   No   | driver |\n+----------+--------+--------+\n</pre>\n\n<p>Write a SQL query to find the cancellation rate of requests made by unbanned clients between <b>Oct 1, 2013</b> and <b>Oct 3, 2013</b>. For the above tables, your SQL query should return the following rows with the cancellation rate being rounded to <i>two</i> decimal places.</p>\n<pre>\n+------------+-------------------+\n|     Day    | Cancellation Rate |\n+------------+-------------------+\n| 2013-10-01 |       0.33        |\n| 2013-10-02 |       0.00        |\n| 2013-10-03 |       0.50        |\n+------------+-------------------+\n</pre>\n\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/cak1erlizhou\">@cak1erlizhou</a> for contributing this question, writing the problem description and adding part of the test cases.</p>",
	"frequency":"348",
	"ac_num":"15885"
}