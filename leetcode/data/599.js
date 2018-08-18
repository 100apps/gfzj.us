{
	"difficulty":"1",
	"submit_num":"29274",
	"show_id":"620",
	"leetcode_id":"620",
	"answers":[
		{
			"lc_ans_id":"104483",
			"view":"3879",
			"top":"0",
			"title":"My solution",
			"vote":"7",
			"content":"```SELECT * FROM cinema WHERE (id % 2 = 1) AND (description <> 'boring') ORDER BY rating DESC```"
		},
		{
			"lc_ans_id":"104489",
			"view":"1853",
			"top":"1",
			"title":"The problem description could be worded better",
			"vote":"1",
			"content":"Using the word 'line' is confusing.  \\n\\nInstead of \\n>Please write a SQL query to find out the movie in odd line and its description is not 'boring'. And you should output the movies ordered by rating.\\n\\nit should be something like\\n> Write a SQL query to output movies with an odd numbered ID and a description that is not 'boring'.  Order the result by rating."
		},
		{
			"lc_ans_id":"104482",
			"view":"28",
			"top":"2",
			"title":"Easy To Understand Solution",
			"vote":"0",
			"content":"We select all columns, using the MOD() function in SQL and use the NOT,IN operators for checking description.\\n```\\nSELECT * FROM cinema \\nWHERE\\n    MOD(id,2)=1\\n    AND\\n    description NOT IN ('boring')\\nORDER BY\\n    rating DESC\\n```"
		},
		{
			"lc_ans_id":"104484",
			"view":"70",
			"top":"3",
			"title":"Actually bit checking much faster than mod, but not for short sets",
			"vote":"0",
			"content":"select * from cinema where id&1 = 1  and description != 'boring' order by rating desc;\\njust for history here"
		},
		{
			"lc_ans_id":"104485",
			"view":"94",
			"top":"4",
			"title":"Is the system or testcase broken?",
			"vote":"0",
			"content":"Even run `SELECT * FROM cinema;` it returns Internal Error."
		},
		{
			"lc_ans_id":"104486",
			"view":"94",
			"top":"5",
			"title":"Simple solution",
			"vote":"0",
			"content":"```\\nselect id, movie, description, rating\\nfrom cinema\\nwhere description != 'boring'\\n  and mod(id,2) = 1\\norder by rating desc\\n```"
		},
		{
			"lc_ans_id":"104487",
			"view":"113",
			"top":"6",
			"title":"Easy to understand; 1 line solution",
			"vote":"0",
			"content":"```\\nSelect * from cinema where (id%2 !=0) and (description != 'boring') order by rating desc;\\n```"
		},
		{
			"lc_ans_id":"104488",
			"view":"81",
			"top":"7",
			"title":"Description should include \"descending\" to be clearer",
			"vote":"0",
			"content":"I know there is an example to demonstrate the results should be ordered by rating in descending order. But it could be clearer to include that in the wording as well."
		},
		{
			"lc_ans_id":"104490",
			"view":"297",
			"top":"8",
			"title":"Can't test run my query.",
			"vote":"0",
			"content":"Always show a runtime error in any query I used."
		},
		{
			"lc_ans_id":"104491",
			"view":"577",
			"top":"9",
			"title":"131ms",
			"vote":"0",
			"content":"SELECT * FROM cinema WHERE (id & 1) AND (CHAR_LENGTH(description) <> 6 OR description <> \"boring\") ORDER by rating DESC;"
		}
	],
	"id":"599",
	"title":"Not Boring Movies",
	"content":"X city opened a new cinema, many people would like to go to this cinema.\nThe cinema also gives out a poster indicating the movies’ ratings and descriptions. <p/>\n \nPlease write a SQL query to output movies with an odd numbered ID and a description that is not 'boring'. Order the result by rating.\n<p/>\n<p>\nFor example, table <code>cinema</code>:\n<pre>\n+---------+-----------+--------------+-----------+\n|   id    | movie     |  description |  rating   |\n+---------+-----------+--------------+-----------+\n|   1     | War       |   great 3D   |   8.9     |\n|   2     | Science   |   fiction    |   8.5     |\n|   3     | irish     |   boring     |   6.2     |\n|   4     | Ice song  |   Fantacy    |   8.6     |\n|   5     | House card|   Interesting|   9.1     |\n+---------+-----------+--------------+-----------+\n</pre>\nFor the example above, the output should be:\n<pre>\n+---------+-----------+--------------+-----------+\n|   id    | movie     |  description |  rating   |\n+---------+-----------+--------------+-----------+\n|   5     | House card|   Interesting|   9.1     |\n|   1     | War       |   great 3D   |   8.9     |\n+---------+-----------+--------------+-----------+\n</pre>\n</p>",
	"frequency":"230",
	"ac_num":"17387"
}