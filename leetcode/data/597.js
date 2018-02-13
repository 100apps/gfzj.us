{
	"difficulty":"3",
	"submit_num":"1557",
	"show_id":"618",
	"leetcode_id":"618",
	"answers":[
		{
			"lc_ans_id":"104465",
			"view":"987",
			"top":"0",
			"title":"Accept solution",
			"vote":"4",
			"content":"```\\nset @a = 0;\\nset @b = 0;\\nset @c = 0;\\n\\nSelect America.name as America, Asia.name as Asia, Europe.name as Europe from \\n(select name, @a := @a + 1 as id from student where continent = 'America' order by name) as America\\nLeft Join \\n(select name, @b := @b + 1 as id from student where continent = 'Asia' order by name) as Asia on America.id = Asia.id\\nLeft Join\\n(select name, @c := @c + 1 as id from student where continent = 'Europe' order by name) as Europe on America.id = Europe.id\\n\\n```"
		},
		{
			"lc_ans_id":"104464",
			"view":"498",
			"top":"1",
			"title":"AC Solution without using join",
			"vote":"3",
			"content":"```\\nset @r1 = 0, @r2 = 0, @r3 = 0;\\nselect min(America) America, min(Asia) Asia, min(Europe) Europe\\nfrom (select case when continent='America' then @r1 :=@r1+1\\n                  when continent='Asia' then @r2 :=@r2+1\\n                  when continent='Europe' then @r3 :=@r3+1 end RowNum,\\n             case when continent='America' then name end America,\\n             case when continent='Asia' then name end Asia,\\n             case when continent='Europe' then name end Europe\\n      from student\\n      order by name) T\\ngroup by RowNum\\n```"
		},
		{
			"lc_ans_id":"104461",
			"view":"84",
			"top":"2",
			"title":"my solution to followup question",
			"vote":"0",
			"content":"SELECT America,Asia,Europe\\nFROM \\n(SELECT name, @m:=@m+1 AS mid\\nFROM student\\nWHERE continent =\\n(SELECT continent\\nFROM student\\nGROUP BY continent\\nORDER BY COUNT(*) DESC\\nLIMIT 1)) AS tbl\\nLEFT JOIN\\n(SELECT name AS Asia, @asia:=@asia+1 AS sid\\nFROM student\\nWHERE continent = 'Asia'\\nORDER BY name) AS a\\nON mid = sid\\nLEFT JOIN\\n(SELECT name AS America, @am:=@am+1 AS aid\\nFROM student\\nWHERE continent = 'America'\\nORDER BY name) AS am\\nON mid=aid\\nLEFT JOIN\\n(SELECT name AS Europe, @euro:=@euro+1 AS eid\\nFROM student\\nWHERE continent = 'Europe'\\nORDER BY name) AS e\\nON mid =eid"
		},
		{
			"lc_ans_id":"104462",
			"view":"158",
			"top":"3",
			"title":"Accepted Solution with splitting the rows into 3 tables and joining them. Worked fine, Trick the second join to join with first table",
			"vote":"0",
			"content":"\\nI used counter to join the three filtered tables. The second join is with the first table not the 'Asia\" table. If Asia is blank and you have a value for america and Europe- the below code still works. Small trick..!!\\n\\n```\\nselect america.name as America,asia.name as Asia,europe.name as Europe from\\n    (select @counter1:= @counter1+1 as id,name from student,(select @counter1 :=0) as temp where continent = 'America' order by name) as america left outer join\\n    (select @counter2:= @counter2+1 as id,name from student,(select @counter2 :=0) as temp where continent = 'Asia' order by name) as asia on\\namerica.id = asia.id\\nleft outer join\\n    (select @counter3:= @counter3+1 as id,name from student,(select @counter3 :=0) as temp where continent = 'Europe' order by name) as europe on (america.id = europe.id )\\n```"
		},
		{
			"lc_ans_id":"104463",
			"view":"225",
			"top":"4",
			"title":"Solution with two variables",
			"vote":"0",
			"content":"Using fixed number of variables. No join.\\n```\\nselect max(america) as america, max(asia) as asia, max(europe) as europe\\nfrom (\\n    select \\n        if(@pre = @pre := continent, @row := @row + 1, @row := 0) as row_count, \\n        if(continent = 'America', name, null) as america,\\n        if(continent = 'Asia', name, null) as asia,\\n        if(continent = 'Europe', name, null) as europe\\n    from student, (select @pre := '0', @row := 0) v\\n    order by continent,name\\n) t\\ngroup by row_count\\norder by row_count\\n;\\n```"
		}
	],
	"id":"597",
	"title":"Students Report By Geography",
	"content":"A U.S graduate school has students from Asia, Europe and America. The students' location information are stored in table <code>student</code> as below.</p>\r\n \r\n<pre>\r\n| name   | continent |\r\n|--------|-----------|\r\n| Jack   | America   |\r\n| Pascal | Europe    |\r\n| Xi     | Asia      |\r\n| Jane   | America   |\r\n</pre></p>\r\n \r\n<a href=\"https://en.wikipedia.org/wiki/Pivot_table\"> Pivot</a> the continent column in this table so that each name is sorted alphabetically and displayed underneath its corresponding continent. The output headers should be America, Asia and Europe respectively. It is guaranteed that the student number from America is no less than either Asia or Europe.</p>\r\n \r\nFor the sample input, the output is:</p>\r\n<pre>\r\n| America | Asia | Europe |\r\n|---------|------|--------|\r\n| Jack    | Xi   | Pascal |\r\n| Jane    |      |        |\r\n</pre></p>\r\n \r\n<b>Follow-up:</b> If it is unknown which continent has the most students, can you write a query to generate the student report?</p>",
	"frequency":"75",
	"ac_num":"670"
}