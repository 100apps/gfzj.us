{
	"difficulty":"1",
	"submit_num":"185754",
	"show_id":"175",
	"leetcode_id":"175",
	"answers":[
		{
			"lc_ans_id":"52928",
			"view":"28523",
			"top":"0",
			"title":"Its a simple question of Left Join. My solution attached",
			"vote":"38",
			"content":"    SELECT Person.FirstName, Person.LastName, Address.City, Address.State from Person LEFT JOIN Address on Person.PersonId = Address.PersonId;"
		},
		{
			"lc_ans_id":"52930",
			"view":"8545",
			"top":"1",
			"title":"Comparative solution between LEFT JOIN, LEFT JOIN USING and NATURAL LEFT JOIN",
			"vote":"26",
			"content":"basic left join: 902ms.\\n\\n    SELECT FirstName, LastName, City, State\\n    FROM Person\\n    LEFT JOIN Address\\n    ON Person.PersonId = Address.PersonId;\\n\\nleft join + using: 907ms\\n\\n    SELECT FirstName, LastName, City, State\\n    FROM Person\\n    LEFT JOIN Address\\n    USING(PersonId);\\n\\nnatural left join: 940ms\\n\\n    SELECT FirstName, LastName, City, State\\n    FROM Person\\n    NATURAL LEFT JOIN Address;\\n\\nleft join is the fastest compare to the two others."
		},
		{
			"lc_ans_id":"52931",
			"view":"6263",
			"top":"2",
			"title":"Why cannot using where",
			"vote":"11",
			"content":"    select p.FirstName, p.LastName, a.City, a. State\\n    from Person p, Address a \\n    where p.PersonId = a.PersonId;\\n\\ndidnt using sql for two years, might be a stupid question"
		},
		{
			"lc_ans_id":"52932",
			"view":"625",
			"top":"3",
			"title":"My Solution And Question With Union",
			"vote":"1",
			"content":"Just come up with this idea to do it. Does anyone have any advises to make it better?\\nBy the way, besides using join, does anybody have any idea to do it by using CASE? \\n```\\nSELECT per.FirstName, per.LastName, addr.City, addr.State\\nFROM Person per, Address addr\\nWHERE per.PersonId = addr.PersonId\\nUNION\\nSELECT per.FirstName, per.LastName, NULL as City, NULL as State\\nFROM Person per\\nWHERE per.PersonId NOT IN (SELECT PersonId from Address);\\n```"
		},
		{
			"lc_ans_id":"52936",
			"view":"148",
			"top":"4",
			"title":"So watch your capitalization carefully\\uff01",
			"vote":"1",
			"content":"\\n```\\nSELECT person.firstname,person.lastname,address.city,address.state \\nFROM person \\nLEFT JOIN address \\nON person.personid=address.personid\\nORDER BY person.personid;\\n```\\n\\u200bWRONG!!!\\n#\\u6ce8\\u610f\\u5927\\u5c0f\\u5199\\uff01\\uff01\\uff01\\n\\u200b\\n```\\nSELECT Person.FirstName,Person.LastName,Address.City,Address.State \\nFROM Person \\nLEFT JOIN Address \\nON Person.PersonId=Address.PersonId\\nORDER BY Person.PersonId;\\n```\\nRIGHT!!!"
		},
		{
			"lc_ans_id":"52927",
			"view":"41",
			"top":"5",
			"title":"Right Join Solution",
			"vote":"0",
			"content":"```\\nSELECT Person.Firstname, Person.Lastname, Address.City, Address.State\\nFROM Address\\nRIGHT JOIN\\nPerson ON Person.PersonId = Address.PersonId\\n```"
		},
		{
			"lc_ans_id":"52929",
			"view":"86",
			"top":"6",
			"title":"Another workaround for combining two tables",
			"vote":"0",
			"content":"I don`t like using the JOIN function, so I figured out how to solve this problem that is easier, plus it provides the additional values of City & State. \\nThis is an improved answer. \\n\\n\\n```\\nSELECT P.FirstName, P.LastName, A.City, A.State FROM Person P, Address A WHERE p.PersonId = A.AddressId; \\n\\n```"
		},
		{
			"lc_ans_id":"52933",
			"view":"115",
			"top":"7",
			"title":"left outer join versus left join",
			"vote":"0",
			"content":"I heard they are same but my query is failing with left outer join because of TLE -\\n\\n    select FirstName, LastName, City, State\\n    from Person\\n    left outer join Address\\n    on Person.PersonId = Address.PersonId;\\n\\nThe query with left join passes -\\n    \\n    select FirstName, LastName, City, State\\n    from Person\\n    left join Address\\n    on Person.PersonId = Address.PersonId;\\n\\nCan you help me understand?"
		},
		{
			"lc_ans_id":"52935",
			"view":"107",
			"top":"8",
			"title":"Left join",
			"vote":"0",
			"content":"```\\nselect p.FirstName, p.LastName, a.City, a.State\\nfrom Person p left join Address a on p.PersonId = a.PersonId\\n```"
		},
		{
			"lc_ans_id":"52934",
			"view":"347",
			"top":"9",
			"title":"I don't understand why my solution is wrong",
			"vote":"0",
			"content":"This is my solution:\\nselect Persons.FirstName,Persons.LastName,Adresses.City,Adresses.State\\nfrom Persons\\nleft join Adresses on (Persons.PersonId=Adresses.PersonId)\\n\\nI getrun time error:\\nTable 'test.Persons' doesn't exist"
		}
	],
	"id":"175",
	"title":"Combine Two Tables",
	"content":"<p>\r\nTable: <code>Person</code></p>\r\n\r\n<pre>\r\n+-------------+---------+\r\n| Column Name | Type    |\r\n+-------------+---------+\r\n| PersonId    | int     |\r\n| FirstName   | varchar |\r\n| LastName    | varchar |\r\n+-------------+---------+\r\nPersonId is the primary key column for this table.\r\n</pre>\r\n\r\n<p>\r\nTable: <code>Address</code></p>\r\n<pre>\r\n+-------------+---------+\r\n| Column Name | Type    |\r\n+-------------+---------+\r\n| AddressId   | int     |\r\n| PersonId    | int     |\r\n| City        | varchar |\r\n| State       | varchar |\r\n+-------------+---------+\r\nAddressId is the primary key column for this table.\r\n</pre>\r\n\r\n<br />\r\n<p>\r\nWrite a SQL query for a report that provides the following information for \r\neach person in the Person table, regardless if there is an address for each \r\nof those people:\r\n</p>\r\n\r\n<pre>\r\nFirstName, LastName, City, State\r\n</pre>",
	"frequency":"621",
	"ac_num":"75937"
}