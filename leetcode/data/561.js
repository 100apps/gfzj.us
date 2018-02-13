{
	"difficulty":"2",
	"submit_num":"7258",
	"show_id":"580",
	"leetcode_id":"580",
	"answers":[
		{
			"lc_ans_id":"103045",
			"view":"1071",
			"top":"0",
			"title":"Accepted Easy Solution Using Right Join",
			"vote":"2",
			"content":"\\n```\\nSELECT d.dept_name, COUNT(s.student_id) AS student_number\\nFROM student s RIGHT JOIN department d ON s.dept_id = d.dept_id\\nGROUP BY d.dept_name \\nORDER BY student_number DESC, d.dept_name;\\n\\n```\\n\"ORDER BY d.dept_name\" is needed as well (according to the problem description), otherwise you will get a wrong answer."
		},
		{
			"lc_ans_id":"103049",
			"view":"255",
			"top":"1",
			"title":"My solution using coalesce",
			"vote":"1",
			"content":"``` \\nSELECT department.dept_name, COALESCE(student_number, 0) AS student_number\\nFROM department\\nLEFT JOIN\\n(SELECT count(student_id) as student_number, dept_id\\n    FROM student\\n    GROUP BY dept_id ) t1 \\n ON t1.dept_id = department.dept_id\\nORDER BY t1.student_number DESC, department.dept_name ```"
		},
		{
			"lc_ans_id":"103046",
			"view":"138",
			"top":"2",
			"title":"Why group by d.dept_id, but not s.dept_id?",
			"vote":"0",
			"content":"Can someone please explain why grouping by d.dept_id works, but s.dept_id failed with the following test case?  Thanks for your time.\\n```\\n{\"headers\":{\"student\":[\"student_id\",\"student_name\",\"gender\",\"dept_id\"],\"department\":[\"dept_id\",\"dept_name\"]},\"rows\":{\"student\":[[1,\"Will\",\"F\",7],[2,\"Jane\",\"M\",5],[3,\"Alex\",\"F\",4],[4,\"Bill\",\"M\",4],[8,\"Bezalel\",\"M\",3],[9,\"Parto\",\"F\",9]],\"department\":[[1,\"Architecture\"],[2,\"Art\"],[3,\"Biotechnology\"],[4,\"East Asian Studies\"],[5,\"Engineering\"],[7,\"Law\"],[9,\"Politics\"]]}}\\n```\\n#passed\\nSELECT dept_name, COUNT(student_id) AS student_number \\nFROM student s\\nRIGHT OUTER JOIN department d\\nON s.dept_id = d.dept_id\\nGROUP BY d.dept_id\\nORDER BY student_number DESC, dept_name\\n\\n#failed: it shows  [\"Architecture\", 0], but not [\"Art\", 0]]\\nSELECT dept_name, COUNT(student_id) AS student_number \\nFROM student s\\nRIGHT OUTER JOIN department d\\nON s.dept_id = d.dept_id\\nGROUP BY s.dept_id\\nORDER BY student_number DESC, dept_name\\n\\n```"
		},
		{
			"lc_ans_id":"103048",
			"view":"211",
			"top":"3",
			"title":"simple answer without subquery",
			"vote":"0",
			"content":"```\\nselect dept_name, count(student.dept_id) as student_number\\nfrom department left join student on student.dept_id = department.dept_id\\ngroup by department.dept_id\\norder by 2 desc,1;\\n\\n```"
		},
		{
			"lc_ans_id":"103047",
			"view":"245",
			"top":"4",
			"title":"why counting distinct student is wrong?",
			"vote":"0",
			"content":"My code below is almost the same as the editorial solution except that I used count(distinct student_name). I think duplicate students should not be counted.\\n\\n```\\nselect d.dept_name, count(distinct s.student_name) as student_number from department d\\nleft join student s on d.dept_id=s.dept_id\\ngroup by d.dept_name \\norder by student_number desc, d.dept_name\\n```"
		},
		{
			"lc_ans_id":"103051",
			"view":"254",
			"top":"5",
			"title":"Left join",
			"vote":"0",
			"content":"```\\n\\nSELECT\\nd.dept_name\\n,CASE WHEN s.student_number > 0 then s.student_number else 0 end as student_number\\nFROM department d\\nLEFT JOIN\\n    (SELECT dept_id, count(student_id) as student_number FROM student GROUP BY dept_id) s\\nON s.dept_id = d.dept_id\\nORDER BY s.student_number DESC, d.dept_name\\n```"
		},
		{
			"lc_ans_id":"103050",
			"view":"398",
			"top":"6",
			"title":"Right join",
			"vote":"0",
			"content":"```\\nSELECT D.dept_name AS dept_name, COUNT(S.student_id) AS student_number FROM student AS S\\nRIGHT JOIN department AS D ON S.dept_id = D.dept_id\\nGROUP BY D.dept_name\\nORDER BY student_number DESC\\n```"
		}
	],
	"id":"561",
	"title":"Count Student Number in Departments",
	"content":"<p>A university uses 2 data tables, <b><i>student</b></i> and <b><i>department</b></i>, to store data about its students and the departments associated with each major. </p>\r\n\r\n<p>Write a query to print the respective department name and number of students majoring in each department for all departments in the <b><i>department</b></i> table (even ones with no current students).</p>\r\n\r\n<p>Sort your results by descending number of students; if two or more departments have the same number of students, then sort those departments alphabetically by department name.</p>\r\n\r\n<p>The <b><i>student</b></i> is described as follow:</p>\r\n\r\n<pre>\r\n| Column Name  | Type      |\r\n|--------------|-----------|\r\n| student_id   | Integer   |\r\n| student_name | String    |\r\n| gender       | Character |\r\n| dept_id      | Integer   |\r\n</pre>\r\n\r\n<p>where student_id is the student's ID number, student_name is the student's name, gender is their gender, and dept_id is the department ID associated with their declared major.</p>\r\n\r\n<p>And the <b><i>department</b></i> table is described as below:</p>\r\n<pre>\r\n| Column Name | Type    |\r\n|-------------|---------|\r\n| dept_id     | Integer |\r\n| dept_name   | String  |\r\n</pre>\r\n\r\n<p>where dept_id is the department's ID number and dept_name is the department name.</p>\r\n\r\n<p>Here is an example <b>input</b>:</br>\r\n\r\n<b><i>student</b></i> table:</p>\r\n\r\n<pre>\r\n| student_id | student_name | gender | dept_id |\r\n|------------|--------------|--------|---------|\r\n| 1          | Jack         | M      | 1       |\r\n| 2          | Jane         | F      | 1       |\r\n| 3          | Mark         | M      | 2       |\r\n</pre>\r\n\r\n<p><b><i>department</b></i> table:</p>\r\n<pre>\r\n| dept_id | dept_name   |\r\n|---------|-------------|\r\n| 1       | Engineering |\r\n| 2       | Science     |\r\n| 3       | Law         |\r\n</pre>\r\n\r\n<p>The <b>Output</b> should be:</p>\r\n<pre>\r\n| dept_name   | student_number |\r\n|-------------|----------------|\r\n| Engineering | 2              |\r\n| Science     | 1              |\r\n| Law         | 0              |\r\n</pre>",
	"frequency":"76",
	"ac_num":"2816"
}