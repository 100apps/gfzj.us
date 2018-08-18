{
	"difficulty":"2",
	"submit_num":"5087",
	"show_id":"585",
	"leetcode_id":"585",
	"answers":[
		{
			"lc_ans_id":"103292",
			"view":"1511",
			"top":"0",
			"title":"Here is my simple code",
			"vote":"5",
			"content":"\\n```\\nselect sum(TIV_2016) TIV_2016\\nfrom insurance a\\nwhere 1 = (select count(*) from insurance b where a.LAT=b.LAT and a.LON=b.LON) \\nand 1 < (select count(*) from insurance c where a.TIV_2015=c.TIV_2015)  ;\\n```"
		},
		{
			"lc_ans_id":"103294",
			"view":"584",
			"top":"1",
			"title":"Using GROUP BY and HAVING COUNT(*) to choose the (not) unique data.",
			"vote":"4",
			"content":"Another trick is to represent the location information by concat the LAT and LON.\\n```\\nSELECT SUM(insurance.TIV_2016) AS TIV_2016\\nFROM insurance\\nWHERE insurance.TIV_2015 IN -- meet the creteria #1\\n    (\\n       SELECT TIV_2015\\n        FROM insurance\\n        GROUP BY TIV_2015\\n        HAVING COUNT(*) > 1\\n        )\\nAND CONCAT(LAT, LON) IN -- meet the creteria #2\\n    (\\n      SELECT CONCAT(LAT, LON) -- trick to take the LAT and LON as a pair\\n      FROM insurance\\n      GROUP BY LAT , LON\\n      HAVING COUNT(*) = 1\\n)\\n;\\n```"
		},
		{
			"lc_ans_id":"103288",
			"view":"376",
			"top":"2",
			"title":"My accepted solution using EXISTS",
			"vote":"1",
			"content":"select round(sum(i1.TIV_2016), 2) as TIV_2016\\nfrom insurance i1\\nwhere EXISTS (select *\\n             from insurance i2\\n             where i1.PID <> i2.PID and i1.TIV_2015 = i2.TIV_2015)\\n    and NOT EXISTS(select *\\n                  from insurance i3\\n                  where i1.PID <> i3.PID and i1.LAT = i3.LAT and i1.LON = i3.LON)"
		},
		{
			"lc_ans_id":"103291",
			"view":"310",
			"top":"3",
			"title":"My accepted solution",
			"vote":"1",
			"content":"```\\nselect sum(I.TIV_2016) as TIV_2016\\nFrom Insurance I\\nWhere I.Pid In (select I1.PID\\n    From Insurance I1, Insurance I2\\n    Where I1.TIV_2015 = I2.TIV_2015\\n    and I1.PID <> I2.Pid) \\n\\nand I.Pid Not In (select I1.PID\\n    From Insurance I1, Insurance I2\\n    Where I1.LAT = I2.LAT\\n    and I1.LON = I2.LON\\n    and I1.Pid <> I2.Pid)"
		},
		{
			"lc_ans_id":"103289",
			"view":"104",
			"top":"4",
			"title":"wisely use subquery and beat 98.33%",
			"vote":"0",
			"content":"```\\nselect sum(new.tiv_2016) as TIV_2016\\nfrom\\n(select distinct i1.pid, i1.tiv_2016\\nfrom insurance i1, insurance i2\\nwhere i1.tiv_2015 = i2.tiv_2015 and i1.pid != i2.pid and not exists\\n(select *\\nfrom insurance i3\\nwhere i1.lat = i3.lat and i1.lon = i3.lon and i1.pid != i3.pid)\\n ) as new\\n```"
		},
		{
			"lc_ans_id":"103290",
			"view":"73",
			"top":"5",
			"title":"Can anyone help me figure out why my solution is wrong?",
			"vote":"0",
			"content":"SELECT ROUND(SUM(tt.TIV_2016),2) AS TIV_2016\\nFROM(\\n    SELECT SUM(t.TIV_2016) AS TIV_2016\\n    FROM(\\n        SELECT TIV_2015, TIV_2016\\n        FROM insurance\\n        GROUP BY LAT,LON\\n        HAVING COUNT(*) = 1) AS t\\n    GROUP BY t.TIV_2015\\n    HAVING COUNT(TIV_2016) > 1) AS tt"
		},
		{
			"lc_ans_id":"103287",
			"view":"628",
			"top":"6",
			"title":"my solution using self join",
			"vote":"0",
			"content":"```\\nSELECT sum(distinct i1.TIV_2016) as TIV_2016 FROM insurance i1, insurance i2 where i1.PID != i2.PID AND i1.TIV_2015 = i2.TIV_2015 AND (i1.LAT,i1.LON) NOT IN (\\n    select LAT, LON FROM insurance GROUP BY LAT, LON HAVING count(*) > 1\\n)\\n```"
		},
		{
			"lc_ans_id":"103293",
			"view":"678",
			"top":"7",
			"title":"There is a wrong test case.",
			"vote":"0",
			"content":"For the test case: {\"headers\":{\"insurance\":[\"PID\",\"TIV_2015\",\"TIV_2016\",\"LAT\",\"LON\"]},\"rows\":{\"insurance\":[[1,224.17,952.73,32.4,20.2],[2,224.17,900.66,52.4,32.7],[3,824.61,645.13,72.4,45.2],[4,424.32,323.66,12.4,7.7],[5,424.32,282.9,12.4,7.7],[6,625.05,243.53,52.5,32.8],[7,424.32,968.94,72.5,45.3],[8,624.46,714.13,12.5,7.8],[9,425.49,463.85,32.5,20.3],[10,624.46,776.85,12.4,7.7],[11,624.46,692.71,72.5,45.3],[12,225.93,933,12.5,7.8],[13,824.61,786.86,32.6,20.3],[14,824.61,935.34,52.6,32.8]]}}\\n\\nMy answer is 4220.72, but the test case gives 4934.85.\\n\\nThe difference is the record pid=8, but its location information is not unique (The same as record pid=12)."
		}
	],
	"id":"566",
	"title":"Investments in 2016",
	"content":"<p>Write a query to print the sum of all total investment values in 2016 (<b>TIV_2016</b>), to a scale of 2 decimal places, for all policy holders who meet the following criteria:</p>\r\n\r\n<ol>\r\n<li>Have the same <b>TIV_2015</b> value as one or more other policyholders.</li>\r\n<li>Are not located in the same city as any other policyholder (i.e.: the (latitude, longitude) attribute pairs must be unique).</li>\r\n</ol>\r\n\r\n<p><b>Input Format:</b><br />\r\nThe <b><i>insurance</i></b> table is described as follows:</p>\r\n\r\n<pre>\r\n| Column Name | Type          |\r\n|-------------|---------------|\r\n| PID         | INTEGER(11)   |\r\n| TIV_2015    | NUMERIC(15,2) |\r\n| TIV_2016    | NUMERIC(15,2) |\r\n| LAT         | NUMERIC(5,2)  |\r\n| LON         | NUMERIC(5,2)  |\r\n</pre>\r\n\r\n<p>where <b>PID</b> is the policyholder's policy ID, <b>TIV_2015</b> is the total investment value in 2015, <b>TIV_2016</b> is the total investment value in 2016, <b>LAT</b> is the latitude of the policy holder's city, and <b>LON</b> is the longitude of the policy holder's city.</p>\r\n\r\n<p><b>Sample Input</b></p>\r\n\r\n<pre>\r\n| PID | TIV_2015 | TIV_2016 | LAT | LON |\r\n|-----|----------|----------|-----|-----|\r\n| 1   | 10       | 5        | 10  | 10  |\r\n| 2   | 20       | 20       | 20  | 20  |\r\n| 3   | 10       | 30       | 20  | 20  |\r\n| 4   | 10       | 40       | 40  | 40  |\r\n</pre>\r\n\r\n<p><b>Sample Output</b></p>\r\n<pre>\r\n| TIV_2016 |\r\n|----------|\r\n| 45.00    |\r\n</pre>\r\n\r\n<p><b>Explanation</b></p>\r\n\r\n<pre>\r\nThe first record in the table, like the last record, meets both of the two criteria.\r\nThe <b>TIV_2015</b> value '10' is as the same as the third and forth record, and its location unique.\r\n\r\nThe second record does not meet any of the two criteria. Its <b>TIV_2015</b> is not like any other policyholders.\r\n\r\nAnd its location is the same with the third record, which makes the third record fail, too.\r\n\r\nSo, the result is the sum of <b>TIV_2016</b> of the first and last record, which is 45.</pre>",
	"frequency":"39",
	"ac_num":"2324"
}