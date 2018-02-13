{
	"difficulty":"2",
	"submit_num":"4595",
	"show_id":"608",
	"leetcode_id":"608",
	"answers":[
		{
			"lc_ans_id":"104111",
			"view":"1458",
			"top":"0",
			"title":"AC Solution",
			"vote":"6",
			"content":"```\\nselect T.id, \\nIF(isnull(T.p_id), 'Root', IF(T.id in (select p_id from tree), 'Inner', 'Leaf')) Type \\nfrom tree T\\n```"
		},
		{
			"lc_ans_id":"104112",
			"view":"686",
			"top":"1",
			"title":"Solution with explanation: CASE + LEFT JOIN",
			"vote":"3",
			"content":"![0_1499271537059_2c061b42-ed70-421a-8bd2-88f20a257d6d-image.png](/assets/uploads/files/1499271536894-2c061b42-ed70-421a-8bd2-88f20a257d6d-image.png) \\n\\n````\\nSELECT DISTINCT t1.id, (\\n    CASE\\n    WHEN t1.p_id IS NULL  THEN 'Root'\\n    WHEN t1.p_id IS NOT NULL AND t2.id IS NOT NULL THEN 'Inner'\\n    WHEN t1.p_id IS NOT NULL AND t2.id IS NULL THEN 'Leaf'\\n    END\\n) AS Type \\nFROM tree t1\\nLEFT JOIN tree t2\\nON t1.id = t2.p_id\\n````"
		},
		{
			"lc_ans_id":"104113",
			"view":"72",
			"top":"2",
			"title":"Question about \"not in\" here",
			"vote":"0",
			"content":"select t.id, \\n\\n(case \\n when t.p_id is null then \"Root\" \\n when t.id not in (select t2.p_id from tree t2) then \"Leaf\" \\n else \"Inner\" \\n end) type\\n\\nfrom tree t\\n![0_1508378733989_c4fa22d6-9c35-4247-874c-9db00dfc77d8-image.png](/assets/uploads/files/1508378733992-c4fa22d6-9c35-4247-874c-9db00dfc77d8-image-resized.png) \\n\\n\"not in\" is useless in this condition, I have no idea about this."
		},
		{
			"lc_ans_id":"104115",
			"view":"63",
			"top":"3",
			"title":"Easy Solution using case Statement",
			"vote":"0",
			"content":"select id,\\ncase\\nwhen p_id is null then 'Root' \\nwhen id  in(select distinct p_id from tree)\\nthen 'Inner'\\nelse 'Leaf' end as Type\\nfrom tree;"
		},
		{
			"lc_ans_id":"104114",
			"view":"221",
			"top":"4",
			"title":"why return 'Inner' when using when id not in (select a.p_id from tree a) then 'Leaf'",
			"vote":"0",
			"content":"```\\nselect id,\\n       (case\\n         when p_id is NULL then 'Root'\\n         when id not in (select a.p_id from tree a) then 'Leaf'\\n         else 'Inner'\\n        end) as Type\\nfrom tree\\norder by id\\n```\\nI thought the code above would be better than using the following because 1 is also in the p_id but it is a root. \\ncase\\n         when p_id is NULL then 'Root'\\n         when id in (select a.p_id from tree a) then 'Inner'\\n         else 'Leaf'\\n        end"
		},
		{
			"lc_ans_id":"104117",
			"view":"394",
			"top":"5",
			"title":"AC solution using case",
			"vote":"0",
			"content":"\\n\\n**select** t.id **as** id,\\n(**case**\\n**when** t.p_id **is** null** **then** 'Root'\\n**when** t.id **in** (**select** p_id **from** tree) **then** 'Inner'\\n**else** 'Leaf'\\n**end**\\n) Type\\n**from** tree t;"
		}
	],
	"id":"587",
	"title":"Tree Node",
	"content":"<p>\r\nGiven a table <code>tree</code>, <b>id</b> is identifier of the tree node and <b>p_id</b> is its parent node's <b>id</b>.\r\n</p>\r\n \r\n<pre>\r\n+----+------+\r\n| id | p_id |\r\n+----+------+\r\n| 1  | null |\r\n| 2  | 1    |\r\n| 3  | 1    |\r\n| 4  | 2    |\r\n| 5  | 2    |\r\n+----+------+\r\n</pre>\r\n \r\nEach node in the tree can be one of three types:</br>\r\n<li>Leaf: if the node is a leaf node.</li>\r\n<li>Root: if the node is the root of the tree.</li>\r\n<li>Inner: If the node is neither a leaf node nor a root node.</li></p>\r\n \r\nWrite a query to print the node id and the type of the node. Sort your output by the node id. The result for the above sample is:</p>\r\n \r\n<pre>\r\n+----+------+\r\n| id | Type |\r\n+----+------+\r\n| 1  | Root |\r\n| 2  | Inner|\r\n| 3  | Leaf |\r\n| 4  | Leaf |\r\n| 5  | Leaf |\r\n+----+------+\r\n</pre>\r\n</p>\r\n \r\n<p>\r\n<b>Explanation</b>\r\n</p>\r\n<p>\r\n<li>Node '1' is root node, because its parent node is NULL and it has child node '2' and '3'.</li>\r\n<li>Node '2' is inner node, because it has parent node '1' and child node '4' and '5'.</li>\r\n<li>Node '3', '4' and '5' is Leaf node, because they have parent node and they don't have child node.</li>\r\n</br>\r\nAnd here is the image of the sample tree as below:\r\n</p>\r\n<pre>\r\n\t\t\t  1\r\n\t\t\t/   \\\r\n                      2       3\r\n                    /   \\\r\n                  4       5\r\n</pre>\r\n\r\n<p>\r\n<b>Note</b>\r\n</p>\r\n<p>\r\nIf there is only one node on the tree, you only need to output its root attributes.\r\n</p>\r\n",
	"frequency":"98",
	"ac_num":"2502"
}