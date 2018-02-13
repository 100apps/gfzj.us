{
	"difficulty":"3",
	"submit_num":"2261",
	"show_id":"571",
	"leetcode_id":"571",
	"answers":[
		{
			"lc_ans_id":"102710",
			"view":"590",
			"top":"0",
			"title":"Easy peasy",
			"vote":"8",
			"content":"My solution, I think, is super simple.\\n```\\nselect  avg(n.Number) median\\nfrom Numbers n\\nwhere n.Frequency >= abs((select sum(Frequency) from Numbers where Number<=n.Number) -\\n                         (select sum(Frequency) from Numbers where Number>=n.Number))\\n```\\nExplanation: \\nLet's take all numbers from left including current number and then do same for right.\\n(select sum(Frequency) from Numbers where Number<=n.Number) as left\\n(select sum(Frequency) from Numbers where Number<=n.Number) as right\\nNow if difference between Left and Right less or equal to Frequency of the current number that means this number is median. \\nOk, what if we get two numbers satisfied this condition? Easy peasy - take AVG(). Ta-da!"
		},
		{
			"lc_ans_id":"102712",
			"view":"190",
			"top":"1",
			"title":"Simple solution, NO join, ONE subquery",
			"vote":"2",
			"content":"```\\nselect avg(number) as median \\nfrom (\\n    select l.number\\n    from numbers l join numbers r\\n    group by 1\\n    having abs(sum(sign(l.number - r.number) * r.frequency)) <= max(l.frequency)\\n) t\\n;\\n```\\n\\nKey is to understand the having clause:\\n```\\nhaving abs(sum(sign(l.number - r.number) * r.frequency)) <= max(l.frequency)\\n```\\n\\nExplain:\\nIf a number is a median, it's frequency must be greater or equal than the diff of total frequency of numbers greater or less than itself.\\n\\nExamples for the sub/inner query:\\n**Example 1:**\\n```\\n+----------+-------------+\\n|  Number  |  Frequency  | \\n+----------+-------------|\\n|  0       |  5          |\\n|  1       |  1          |\\n|  2       |  5          |\\n+----------+-------------+\\nfor 0, greater numbers are 1,2, total frequency is 6, \\n       smaller numbers are    , total frequency is 0,\\n       diff is 6\\n       it's own frequency is 5\\n       5 >= 6 == false\\nfor 1, greater numbers are 2  , total frequency is 5, \\n       smaller numbers are 0  , total frequency is 5,\\n       diff is 0\\n       it's own frequency is 1\\n       1 >= 0 == true\\nfor 2, same as for 0\\nSo [1] is selected\\n```\\n**Example 2:**\\n```\\n+----------+-------------+\\n|  Number  |  Frequency  | \\n+----------+-------------|\\n|  0       |  4          |\\n|  1       |  1          |\\n|  2       |  5          |\\n+----------+-------------+\\nfor 0, greater numbers are 1,2, total frequency is 6, \\n       smaller numbers are    , total frequency is 0,\\n       diff is 6\\n       it's own frequency is 4\\n       4 >= 6 == false\\nfor 1, greater numbers are 2  , total frequency is 5, \\n       smaller numbers are 0  , total frequency is 4,\\n       diff is 1\\n       it's own frequency is 1\\n       1 >= 1 == true\\nfor 2, greater numbers are    , total frequency is 0, \\n       smaller numbers are 0,1, total frequency is 5,\\n       diff is 5\\n       it's own frequency is 5\\n       5 >= 5 == true\\nSo [1,2] is selected\\n```"
		},
		{
			"lc_ans_id":"102720",
			"view":"1117",
			"top":"2",
			"title":"MySQL solution like the median salary problem",
			"vote":"1",
			"content":"This solution is like the median salary problem\\n```\\nselect FORMAT(avg(n.Number),4)*1.0 as median \\nfrom Numbers n left join\\n(\\nselect Number, @prev := @count as prevNumber, (@count := @count + Frequency) as countNumber\\nfrom Numbers, \\n(select @count := 0, @prev := 0, @total := (select sum(Frequency) from Numbers)) temp order by Number\\n) n2\\non n.Number = n2.Number\\nwhere \\n(prevNumber < floor((@total+1)/2) and countNumber >= floor((@total+1)/2))\\nor \\n(prevNumber < floor((@total+2)/2) and countNumber >= floor((@total+2)/2))\\n```"
		},
		{
			"lc_ans_id":"102723",
			"view":"607",
			"top":"3",
			"title":"MySQL Solution",
			"vote":"1",
			"content":"MySQL solution:\\n\\n```\\n#Write your MySQL query statement below\\n\\nselect avg(number) as median from (\\nselect \\nnumber,frequency,\\n@st_range:=@end_range+1 as st_range,\\n@end_range:=@st_range+frequency-1 as end_range,\\nc.total_sum\\nfrom numbers a, (select @st_range:=0,@end_range:=0) b, (select sum(frequency) as total_sum from numbers )c\\norder by number\\n)a \\nwhere (floor((total_sum+1)/2)>=st_range and floor((total_sum+1)/2)<=end_range) or \\n(floor((total_sum+2)/2)>=st_range and floor((total_sum+2)/2)<=end_range) \\n;\\n```"
		},
		{
			"lc_ans_id":"102708",
			"view":"18",
			"top":"4",
			"title":"6-lines beats 100%",
			"vote":"0",
			"content":"The basic idea is building a new table with `prevCount` and `curCount` for each rows.\\n\\nSo the `n1.curCount` represents the sum of frequency <= current number.\\nand the `@total-n1.prevCount` represents the sum of frequency >= current number.\\n\\nwhen they are all >= the total frequency. The number is one of the medians.\\n\\nAnd use `avg` in case there are two medians.\\n```\\nselect avg(Number) median from(\\n    select Number, @prev := @count as prevCount, (@count := @count + Frequency) as curCount\\n    from Numbers, (select @prev:=0, @count:=0, @total:=(select sum(Frequency) from Numbers)) temp order by Number\\n) n1\\nwhere n1.curCount >= floor((@total+1)/2)\\nand @total-n1.prevCount >=  floor((@total+1)/2)\\n```"
		},
		{
			"lc_ans_id":"102709",
			"view":"37",
			"top":"5",
			"title":"clean & efficient 4 liner",
			"vote":"0",
			"content":"```\\nselect avg(number) median from\\n(select number, frequency from numbers order by number) sub1, \\n(select @tot := (select sum(frequency) from numbers)-1, @med1 := FLOOR(@tot/2), @med2 := CEIL(@tot/2), @freq := 0) sub2\\nwhere (@freq := @freq + frequency)-frequency <= @med2 AND @freq-1 >= @med1\\n```"
		},
		{
			"lc_ans_id":"102711",
			"view":"54",
			"top":"6",
			"title":"Simple and Fast AC solution by Avg Numbers within a range of cumulated frequency",
			"vote":"0",
			"content":"The question is similar to [calculate median number](https://stackoverflow.com/questions/1291152/simple-way-to-calculate-median-with-mysql). Since we already have the frequency of each number, we can first order the numbers and keep a range of cumulated frequency that the number locates, say lower bound (lb) and upper bound (ub). Then median is the average of the numbers which have the median locates in the lb and ub. \\n\\nFor example, given numbers [0,0,1,2,2,2], the [lb, ub] for each number will be {0: [0,2], 1: [2,3], 2:[3,6]}. Since the cumulated frequency for median is 3, which locates in [2,3] and [3,6], we can get the median by average numbers 1 and 2. \\n```\\nSELECT AVG(Number) as median\\nFROM (SELECT Number, @cum_freq AS lb, (@cum_freq:=@cum_freq + Frequency) AS ub\\n     FROM Numbers, (SELECT @cum_freq:=0) init\\n     ORDER BY Number) AS T1,\\n     (SELECT SUM(Frequency) AS total_freq\\n      FROM Numbers) AS T2\\nWHERE lb <= (total_freq/2) AND ub >= (total_freq/2)\\n```"
		},
		{
			"lc_ans_id":"102713",
			"view":"89",
			"top":"7",
			"title":"Solution with no params",
			"vote":"0",
			"content":"```\\nselect sum(num)/2 median\\nfrom\\n(\\nselect min(number) num from\\n(\\nselect number, cumSum\\nfrom\\n(\\nSELECT n1.number, sum(case when n2.number < n1.number then n2.frequency when n2.number = n1.number then n1.frequency else 0 end) cumSum\\nFROM ngram.Numbers n1 join numbers n2\\ngroup by n1.number\\norder by n1.number\\n) cum \\njoin\\n(select sum(frequency),\\ncase \\nwhen sum(frequency) % 2 = 0 then sum(frequency) div 2\\nelse (sum(frequency) div 2) + 1\\nend as idx1\\nfrom numbers\\n) idxs\\nwhere cumSum >= idx1\\n) firstNum\\nunion all\\nselect min(number) num from\\n(\\nselect number, cumSum\\nfrom\\n(\\nSELECT n1.number, sum(case when n2.number < n1.number then n2.frequency when n2.number = n1.number then n1.frequency else 0 end) cumSum\\nFROM ngram.Numbers n1 join numbers n2\\ngroup by n1.number\\norder by n1.number\\n) cum \\njoin\\n(select sum(frequency),\\ncase \\nwhen sum(frequency) % 2 = 0 then (sum(frequency) div 2) + 1\\nelse (sum(frequency) div 2) + 1\\nend as idx2\\nfrom numbers\\n) idxs\\nwhere cumSum >= idx2\\n) secondNum\\n)allNums\\n```"
		},
		{
			"lc_ans_id":"102714",
			"view":"110",
			"top":"8",
			"title":"use definition of median",
			"vote":"0",
			"content":"Use the definition of median:\\nif a number n is median, then\\nfrequency(n)>=abs(frequency(larger_than_n)-frequency(smaller_than_n)).\\n\\nSo I left join the numbers table with itself first to get the frequency(smaller_than_n), then I join it with the total frequency. Therefore, frequency(larger_than_n)=total-frequency(n)-(frequency_smaller_than_n) and we can use the definition.\\n\\nFinally, select the average of the result set as the result can be 1 or 2 records.\\n```\\nselect avg(temp.number) as median\\n    from\\n   (select n1.number, \\n           n1.frequency, \\n           ifnull(sum(n2.frequency),0) as sm_frequency,\\n           tt.total\\n     from numbers n1 \\n     left join numbers n2 on n1.number>n2.number,\\n     (select sum(frequency) as total from numbers n3) tt\\n         group by n1.number \\n         having abs(total-sm_frequency*2-frequency)<=n1.frequency) temp\\n```"
		},
		{
			"lc_ans_id":"102715",
			"view":"115",
			"top":"9",
			"title":"Accepted but quite slow.",
			"vote":"0",
			"content":"1027ms\\n\\nfind the median(s) first.\\n\\nfor a median, cumsum and reverse cumsum should both be greater or equal to n/2 (regardless of odd or even n).\\n\\n```\\nselect avg(n6.Number) median\\nfrom (select n3.Number, n3.Frequency, n3.cumsum, n3.totalcount\\nfrom (select n1.Number, n1.Frequency, @cumsum:=@cumsum + n1.Frequency as cumsum,\\n@rvscumsum:=(Select sum(n5.Frequency) from Numbers n5) - @cumsum + n1.Frequency as rvscumsum,\\n(Select (sum(n2.Frequency))/2 from Numbers n2) as totalcount \\nfrom (SELECT @cumsum:=0) c1, (SELECT @rvscumsum:=sum(n4.Frequency) from Numbers n4) c2, (select * from Numbers order by Number) n1) n3\\nwhere n3.cumsum >= n3.totalcount AND n3.rvscumsum >= n3.totalcount) n6\\n```"
		}
	],
	"id":"552",
	"title":"Find Median Given Frequency of Numbers",
	"content":"<p>\r\nThe <code>Numbers</code> table keeps the value of number and its frequency.\r\n</p>\r\n<pre>\r\n+----------+-------------+\r\n|  Number  |  Frequency  |\r\n+----------+-------------|\r\n|  0       |  7          |\r\n|  1       |  1          |\r\n|  2       |  3          |\r\n|  3       |  1          |\r\n+----------+-------------+\r\n</pre>\r\n<p>\r\nIn this table, the numbers are <code>0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3</code>, so the median is <code>(0 + 0) / 2 = 0</code>.\r\n</p>\r\n\r\n<pre>\r\n+--------+\r\n| median |\r\n+--------|\r\n| 0.0000 |\r\n+--------+\r\n</pre>\r\n\r\n<p>\r\nWrite a query to find the median of all numbers and name the result as <code>median</code>.\r\n</p>",
	"frequency":"108",
	"ac_num":"868"
}