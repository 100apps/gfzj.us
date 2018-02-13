{
	"difficulty":"2",
	"submit_num":"8674",
	"show_id":"626",
	"leetcode_id":"626",
	"answers":[
		{
			"lc_ans_id":"104707",
			"view":"1846",
			"top":"0",
			"title":"Using two UNION operators",
			"vote":"6",
			"content":"```\\n/* get all the even numbered rows as odd numbered rows */\\nSELECT s1.id - 1 as id, s1.student\\nFROM Seat s1\\nWHERE s1.id MOD 2 = 0\\n\\nUNION\\n\\n/* get all the odd numbered rows as even numbered rows */\\nSELECT s2.id + 1 as id, s2.student\\nFROM Seat s2\\nWHERE s2.id MOD 2 = 1 AND s2.id != (SELECT MAX(id) FROM Seat)\\n/* Just don't get the last row as we will handle it in the next UNION */\\n\\nUNION\\n\\n/* get the last row if odd and don't change the id value */\\nSELECT s3.id, s3.student\\nFROM Seat s3\\nWHERE s3.id MOD 2 = 1 AND s3.id = (SELECT MAX(id) FROM Seat)\\n\\n/* Order the result by id */\\nORDER BY id ASC;\\n```"
		},
		{
			"lc_ans_id":"104702",
			"view":"653",
			"top":"1",
			"title":"A solution without using union and order by",
			"vote":"5",
			"content":"A solution without using union and order by\\u3002\\n\\n```\\nselect id,\\ncase \\n    when id%2 = 0 then (select student from seat where id = (i.id-1) )  \\n    when id%2 != 0 and id<(select count(student) from seat) then (select student from seat where id = (i.id+1) )  \\n    else student\\nend as student\\nfrom seat i \\n```"
		},
		{
			"lc_ans_id":"104698",
			"view":"2059",
			"top":"2",
			"title":"4 line solution using if statement",
			"vote":"5",
			"content":"select \\n    if(id < (select count(*) from seat), if(id mod 2=0, id-1, id+1), if(id mod 2=0, id-1, id)) as id, student \\nfrom seat \\norder by id asc;"
		},
		{
			"lc_ans_id":"104699",
			"view":"1182",
			"top":"3",
			"title":"simple case solution",
			"vote":"3",
			"content":"```\\nSELECT (CASE \\n    WHEN mod(id, 2) != 0 and records != id THEN id + 1\\n    WHEN mod(id, 2) != 0 and records = id THEN id\\n    ELSE id - 1\\nEND) AS id, student\\nFROM seat, (select count(*) as records from seat) as seat_records\\nORDER BY id asc;\\n\\n```"
		},
		{
			"lc_ans_id":"104703",
			"view":"462",
			"top":"4",
			"title":"straightforward solution using 3 joins",
			"vote":"2",
			"content":"nothing fancy but very straightforward, just update the student name by the definition of \"swap\"\\n\\n```\\nselect s1.id,\\ncase when mod(s1.id, 2)=1 then \\n    case when s2.student is null then s1.student else s2.student end\\n    else s3.student end as student\\nfrom seat s1\\nleft join seat s2\\non s1.id=s2.id-1\\nleft join seat s3\\non s1.id=s3.id+1\\norder by s1.id asc\\n```"
		},
		{
			"lc_ans_id":"104692",
			"view":"18",
			"top":"5",
			"title":"Simple Union",
			"vote":"0",
			"content":"'''\\nselect b.id, a.student from seat a, seat b where ((a.id = b.id+1 and b.id%2=1)or(a.id = b.id-1 and a.id%2=1))\\nunion\\nselect seat.* from seat where id = (select count(*) from seat) and id%2=1\\n'''"
		},
		{
			"lc_ans_id":"104693",
			"view":"32",
			"top":"6",
			"title":"Using sample JOIN and CASE, easy to understand",
			"vote":"0",
			"content":"```\\nSELECT s1.id, s2.student FROM seat s1 JOIN seat s2\\nON CASE  WHEN mod(s1.id, 2)=1 AND s1.id <> (select max(id) from seat) THEN s1.id + 1 = s2.id\\n         WHEN mod(s1.id, 2)=0 THEN s1.id = s2.id +1\\n         ELSE s1.id = s2.id  \\n   END\\nORDER BY s1.id\\n```\\nFor the first clause of CASE statement, you can also use\\n```\\nwhen mod(s1.id, 2)=1 and s1.id <> (select count(*) from seat) then s1.id + 1 = s2.id\\n```\\nor\\n```\\nwhen mod(s1.id, 2)=1 and (select student from seat where id = s1.id+1) is not null then s1.id + 1 = s2.id\\n```"
		},
		{
			"lc_ans_id":"104694",
			"view":"38",
			"top":"7",
			"title":"Very simple solution using simple SELECT statement, no joins",
			"vote":"0",
			"content":"```\\nSELECT S1.id, S2.student \\nFROM seat as S1, seat as S2\\nWHERE ((S1.id % 2 = 0) AND (S1.id - S2.id = 1))\\nOR  ((S1.id % 2 = 1) AND (S2.id - S1.id = 1))\\nOR S1.id = (SELECT MAX(id) FROM seat) AND S2.id = (SELECT MAX(id) FROM seat) AND S1.id %2 = 1\\nORDER BY S1.id\\n```\\n\\nas you can see using a clone of the table, you can swap Odd students with even students then put a condition to handle the case of having last record as odd record."
		},
		{
			"lc_ans_id":"104695",
			"view":"26",
			"top":"8",
			"title":"use union",
			"vote":"0",
			"content":"373 ms\\n\\nselect t.id, t.student from (\\nselect s1.id as id, s2.student from seat as s1 inner join seat as s2 on s1.id % 2 = 1 and s2.id % 2 = 0 and s1.id = s2.id - 1\\nUNION\\nselect s1.id as id, s2.student from seat as s1 inner join seat as s2 on s1.id % 2 = 0 and s2.id % 2 = 1 and s1.id = s2.id + 1\\nUNION\\nselect id, student from seat where id = (select max(id) from seat)\\norder by id) as t group by t.id;"
		},
		{
			"lc_ans_id":"104696",
			"view":"38",
			"top":"9",
			"title":"Use two UNION operators and a variable.",
			"vote":"0",
			"content":"\\n```sql\\nset @new_id=0;\\nselect @new_id :=@new_id + 1 as id, t.student \\nfrom (select id-1 as tmpId, student \\n      from seat where id%2 = 0\\n      union \\n      select id+1 as tmpId, student \\n      from seat where id%2 = 1) as t\\norder by t.tmpId\\n```"
		}
	],
	"id":"604",
	"title":"Exchange Seats",
	"content":"<p>Mary is a teacher in a middle school and she has a table <code>seat</code> storing students' names and their corresponding seat ids.</p>\r\nThe column <b>id</b> is continuous increment.</p>\r\nMary wants to change seats for the adjacent students.</p>\r\nCan you write a SQL query to output the result for Mary?</p>\r\n<pre>\r\n+---------+---------+\r\n|    id   | student |\r\n+---------+---------+\r\n|    1    | Abbot   |\r\n|    2    | Doris   |\r\n|    3    | Emerson |\r\n|    4    | Green   |\r\n|    5    | Jeames  |\r\n+---------+---------+\r\n</pre>\r\nFor the sample input, the output is:</p>\r\n<pre>\r\n+---------+---------+\r\n|    id   | student |\r\n+---------+---------+\r\n|    1    | Doris   |\r\n|    2    | Abbot   |\r\n|    3    | Green   |\r\n|    4    | Emerson |\r\n|    5    | Jeames  |\r\n+---------+---------+\r\n</pre>\r\n<p>\r\n<b>Note:</b><br/>\r\nIf the number of students is odd, there is no need to change the last one's seat.\r\n</p>",
	"frequency":"282",
	"ac_num":"4176"
}