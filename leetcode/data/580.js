{
	"difficulty":"3",
	"submit_num":"10913",
	"show_id":"601",
	"leetcode_id":"601",
	"answers":[
		{
			"lc_ans_id":"103781",
			"view":"3085",
			"top":"0",
			"title":"A simple solution",
			"vote":"10",
			"content":"```\\nSELECT s1.* FROM stadium AS s1, stadium AS s2, stadium as s3\\n    WHERE \\n    ((s1.id + 1 = s2.id\\n    AND s1.id + 2 = s3.id)\\n    OR \\n    (s1.id - 1 = s2.id\\n    AND s1.id + 1 = s3.id)\\n    OR\\n    (s1.id - 2 = s2.id\\n    AND s1.id - 1 = s3.id)\\n    )\\n    AND s1.people>=100 \\n    AND s2.people>=100\\n    AND s3.people>=100\\n\\n    GROUP BY s1.id\\n```"
		},
		{
			"lc_ans_id":"103775",
			"view":"667",
			"top":"1",
			"title":"I use variable to do it",
			"vote":"2",
			"content":"```\\nSELECT \\n  * \\nFROM\\n  stadium \\nWHERE INSTR(\\n    (SELECT CONCAT(',',GROUP_CONCAT(tmpaa.ids),',') AS ids FROM (SELECT \\n      GROUP_CONCAT(id) AS ids\\n    FROM\\n      (SELECT \\n        id,\\n        CASE\\n          WHEN (\\n            (@prevone := people) < 100 \\n            OR (@prevone >= 100 \\n              AND @prevtwo < 100)\\n          ) \\n          THEN @group := @group + 1 \\n          ELSE @group := @group \\n        END AS groupno,\\n        (@prevtwo := people) AS bb \\n      FROM\\n        stadium,\\n        (SELECT \\n          @group := 0,\\n          @prevone := - 1,\\n          @prevtwo := - 1) init) AS tmp \\n    GROUP BY tmp.groupno \\n    HAVING COUNT(1) >= 3 ) AS tmpaa),\\n    CONCAT(',', id, ',')\\n  ) > 0\\n```"
		},
		{
			"lc_ans_id":"103792",
			"view":"1669",
			"top":"2",
			"title":"solution using join",
			"vote":"2",
			"content":"```\\nSELECT t.* FROM stadium t\\n    LEFT JOIN stadium p1 ON t.id - 1 = p1.id\\n    LEFT JOIN stadium p2 ON t.id - 2 = p2.id\\n    LEFT JOIN stadium n1 ON t.id + 1 = n1.id\\n    LEFT JOIN stadium n2 ON t.id + 2 = n2.id\\nWHERE (t.people >= 100 AND p1.people >= 100 AND p2.people >= 100)\\n     OR (t.people >= 100 AND n1.people >= 100 AND n2.people >= 100)\\n     OR (t.people >= 100 AND n1.people >= 100 AND p1.people >= 100)\\nORDER BY id;\\n```"
		},
		{
			"lc_ans_id":"103787",
			"view":"225",
			"top":"3",
			"title":"A solution with union, join and where",
			"vote":"1",
			"content":"```\\nselect s.* from stadium s inner join\\n(select distinct s1.id as id from stadium s1,stadium s2, stadium s3\\nwhere  s1.id+1=s2.id and s2.id+1=s3.id and s1.people > 99 and s2.people > 99 and s3.people > 99 \\nunion \\nselect distinct s2.id as id from stadium s1,stadium s2, stadium s3\\nwhere  s1.id+1=s2.id and s2.id+1=s3.id and s1.people > 99 and s2.people > 99 and s3.people > 99 \\nunion\\nselect distinct s3.id as id from stadium s1,stadium s2, stadium s3\\nwhere  s1.id+1=s2.id and s2.id+1=s3.id and s1.people > 99 and s2.people > 99 and s3.people > 99 ) a\\non a.id=s.id; \\n```"
		},
		{
			"lc_ans_id":"103773",
			"view":"1259",
			"top":"4",
			"title":"What's wrong with this answer?",
			"vote":"1",
			"content":"10 / 14 test cases passed.\\n```\\nSELECT DISTINCT s1.id, s1.date, s1.people\\nFROM stadium s1, stadium s2, stadium s3\\nWHERE s1.people >= 100\\nAND s2.people >= 100\\nAND s3.people >= 100\\nAND ((DATEDIFF(s2.date, s1.date) = 1 AND DATEDIFF(s3.date, s2.date) = 1)\\nOR (DATEDIFF(s2.date, s1.date) = -1 AND DATEDIFF(s3.date, s1.date) = 1)\\nOR (DATEDIFF(s2.date, s1.date) = -1 AND DATEDIFF(s3.date, s2.date) = -1)\\n)\\nORDER BY s1.date;\\n```"
		},
		{
			"lc_ans_id":"103774",
			"view":"17",
			"top":"5",
			"title":"Very straight forward with union",
			"vote":"0",
			"content":"```\\nselect * from (\\nselect s1.id,s1.date,s1.people from stadium s1,stadium s2,stadium s3\\nwhere  s2.id-s1.id=1 and s3.id-s2.id=1 \\nand s1.people>=100 and s2.people>=100 and s3.people>=100\\nunion \\nselect s2.id,s2.date,s2.people from stadium s1,stadium s2,stadium s3\\nwhere  s2.id-s1.id=1 and s3.id-s2.id=1  \\nand s1.people>=100 and s2.people>=100 and s3.people>=100\\nunion\\nselect s3.id,s3.date,s3.people from stadium s1,stadium s2,stadium s3\\nwhere  s2.id-s1.id=1 and s3.id-s2.id=1  \\nand s1.people>=100 and s2.people>=100 and s3.people>=100\\n) rst\\norder by id"
		},
		{
			"lc_ans_id":"103776",
			"view":"29",
			"top":"6",
			"title":"use some joins",
			"vote":"0",
			"content":"find candidate ids and print out\\n\\nSELECT DISTINCT c.*\\nFROM stadium c\\nINNER JOIN\\n(\\n    SELECT a.id id, MIN(b.people) min_people, COUNT(1) units_around\\n    FROM stadium a\\n    INNER JOIN stadium b\\n      ON a.id - b.id BETWEEN -1 AND 1\\n    GROUP BY a.id\\n) d\\nON c.id - d.id BETWEEN -1 AND 1\\nWHERE d.min_people >= 100 and d.units_around = 3"
		},
		{
			"lc_ans_id":"103777",
			"view":"23",
			"top":"7",
			"title":"An answer using variable and case clause, and it seems running very slow",
			"vote":"0",
			"content":"```\\nset @i = 0;\\nselect distinct s.id, s.date, s.people\\nfrom (\\n    select id\\n        , case when people >= 100 then @i := @i + 1 else @i := 0 end as flag\\n    from stadium s\\n    order by id\\n) tmp\\njoin stadium s on tmp.flag >= 3 and s.id >= tmp.id - 2 and s.id <= tmp.id\\n```"
		},
		{
			"lc_ans_id":"103778",
			"view":"24",
			"top":"8",
			"title":"Why my code doesn't work?(three union wouldn't work but any of the two combination works)",
			"vote":"0",
			"content":"'''\\nSELECT s1.*\\nFROM stadium s1 left join stadium s2 on (s1.id = s2.id-1) left join stadium s3 on (s1.id = s3.id-2)\\nWHERE s1.people>100 and s2.people>100 and s3.people>100\\nUNION \\nSELECT s2.*\\nFROM stadium s1 left join stadium s2 on (s1.id = s2.id-1) left join stadium s3 on (s1.id = s3.id-2)\\nWHERE s1.people>100 and s2.people>100 and s3.people>100\\nUNION\\nSELECT s3.*\\nFROM stadium s1 left join stadium s2 on (s1.id = s2.id-1) left join stadium s3 on (s1.id = s3.id-2)\\nWHERE s1.people>100 and s2.people>100 and s3.people>100\\n\\n'''"
		},
		{
			"lc_ans_id":"103779",
			"view":"29",
			"top":"9",
			"title":"database 601 Human Traffic of Stadium",
			"vote":"0",
			"content":"select distinct id,date,people from (select a.id,a.date,a.people from stadium a\\nleft join stadium b on a.id-1=b.id\\nleft join stadium c on b.id-1=c.id\\nwhere b.id is not null and c.id is not null\\nand a.people>99 and b.people>99 and c.people>99\\nunion all\\nselect a.id,a.date,a.people from stadium a\\nleft join stadium b on a.id+1=b.id\\nleft join stadium c on b.id+1=c.id\\nwhere b.id is not null and c.id is not null\\nand a.people>99 and b.people>99 and c.people>99\\nunion all \\nselect a.id,a.date,a.people from stadium a\\nleft join stadium b on a.id-1=b.id\\nleft join stadium c on a.id+1=c.id\\nwhere b.id is not null and c.id is not null\\nand a.people>99 and b.people>99 and c.people>99)\\nas tmp order by id\\nis runtime too long?"
		}
	],
	"id":"580",
	"title":"Human Traffic of Stadium",
	"content":"<p>X city built a new stadium, each day many people visit it and the stats are saved as these columns: <b>id</b>, <b>date</b>, <b>people</b>\r\n</p><p>\r\nPlease write a query to display the records which have 3 or more consecutive rows and the  amount of people more than 100(inclusive).\r\n</p>\r\n \r\nFor example, the table <code>stadium</code>:\r\n<pre>\r\n+------+------------+-----------+\r\n| id   | date       | people    |\r\n+------+------------+-----------+\r\n| 1    | 2017-01-01 | 10        |\r\n| 2    | 2017-01-02 | 109       |\r\n| 3    | 2017-01-03 | 150       |\r\n| 4    | 2017-01-04 | 99        |\r\n| 5    | 2017-01-05 | 145       |\r\n| 6    | 2017-01-06 | 1455      |\r\n| 7    | 2017-01-07 | 199       |\r\n| 8    | 2017-01-08 | 188       |\r\n+------+------------+-----------+\r\n</pre>\r\n<p>\r\nFor the sample data above, the output is:\r\n</p>\r\n<pre>\r\n+------+------------+-----------+\r\n| id   | date       | people    |\r\n+------+------------+-----------+\r\n| 5    | 2017-01-05 | 145       |\r\n| 6    | 2017-01-06 | 1455      |\r\n| 7    | 2017-01-07 | 199       |\r\n| 8    | 2017-01-08 | 188       |\r\n+------+------------+-----------+\r\n</pre>\r\n<p>\r\n<b>Note:</b><br/>\r\nEach day only have one row record, and the dates are increasing with id increasing.\r\n</p> ",
	"frequency":"212",
	"ac_num":"3770"
}