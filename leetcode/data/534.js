{
	"difficulty":"1",
	"submit_num":"61002",
	"show_id":"551",
	"leetcode_id":"551",
	"answers":[
		{
			"lc_ans_id":"101553",
			"view":"7150",
			"top":"0",
			"title":"Java 1-liner",
			"vote":"32",
			"content":"```\\npublic boolean checkRecord(String s) {\\n    return !s.matches(\".*LLL.*|.*A.*A.*\");\\n}\\n```"
		},
		{
			"lc_ans_id":"101556",
			"view":"3051",
			"top":"1",
			"title":"C++ very simple solution",
			"vote":"16",
			"content":"    bool checkRecord(string s) {\\n        int a=0, l=0;\\n        for(int i=0;i<s.size();i++) {\\n            if(s[i]=='A') a++;\\n            if(s[i]=='L') l++;\\n            else l=0;\\n            if(a>=2||l>2) return false;\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"101552",
			"view":"3158",
			"top":"2",
			"title":"Java Simple without Regex 3 lines",
			"vote":"13",
			"content":"\\nSimple by using Java String Functions - \\n```\\npublic class Solution {\\n    public boolean checkRecord(String s) {\\n        if(s.indexOf(\"A\") != s.lastIndexOf(\"A\") || s.contains(\"LLL\"))\\n            return false;\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101599",
			"view":"3436",
			"top":"3",
			"title":"Java O(N) solution - Accepted",
			"vote":"8",
			"content":"````\\npublic boolean checkRecord(String s) {\\n        int countA=0;\\n        int continuosL = 0;\\n        int charA = 'A';\\n        int charL ='L';\\n        for(int i=0;i<s.length();i++){\\n            if(s.charAt(i) == charA){\\n                countA++;\\n                continuosL = 0;\\n            }\\n            else if(s.charAt(i) == charL){\\n                continuosL++;\\n            }\\n            else{\\n                continuosL = 0;\\n            }\\n            if(countA >1 || continuosL > 2 ){\\n                return false;\\n            }\\n        }\\n        return true;\\n\\n    }\\n````"
		},
		{
			"lc_ans_id":"101622",
			"view":"469",
			"top":"4",
			"title":"One line Java solution without Regex",
			"vote":"5",
			"content":"I'm using two simple checks:\\n - String doesn't contains `LLL`.\\n - The first occurrence of `A` is equals to the last occurrence of `A`.\\n```\\npublic boolean checkRecord(String s) {\\n    return !s.contains(\"LLL\") && (s.indexOf(\"A\") == s.lastIndexOf(\"A\"));\\n}\\n```"
		},
		{
			"lc_ans_id":"101607",
			"view":"1739",
			"top":"5",
			"title":"Tiny Ruby, Short Python/Java/C++",
			"vote":"5",
			"content":"Just check that there aren't two 'A' or *three* consecutive 'L' (takes care of all *\"more than two\"* cases). Easiest with a regular expression, though at least Python and Ruby also have nice *\"count A\"* and *\"contains LLL\"* functionality.\\n<br>\\n\\n**Ruby:**\\n```\\ndef check_record(s)\\n  !s[/A.*A|LLL/]\\nend\\n```\\nor\\n```\\ndef check_record(s)\\n  !(s.count(\"A\") > 1 || s.include?(\"LLL\"))\\nend\\n```\\n<br>\\n\\n**Python:**\\n\\n    def checkRecord(self, s):\\n        return not re.search('A.*A|LLL', s)\\n\\nor\\n\\n    def checkRecord(self, s):\\n        return not (s.count('A') > 1 or 'LLL' in s)\\n<br>\\n\\n**Java:**\\n\\n    public boolean checkRecord(String s) {\\n        return !s.matches(\".*(A.*A|LLL).*\");\\n    }\\n<br>\\n\\n**C++:**\\n\\n    bool checkRecord(string s) {\\n        return !regex_search(s, regex(\"A.*A|LLL\"));\\n    }"
		},
		{
			"lc_ans_id":"101613",
			"view":"315",
			"top":"6",
			"title":"Python 1 liner without regex",
			"vote":"4",
			"content":"```\\n    def checkRecord(self, s):\\n        return len(s.split('A'))<=2 and s.find('LLL')==-1\\n```"
		},
		{
			"lc_ans_id":"101594",
			"view":"1413",
			"top":"7",
			"title":"Java 1 line solution",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public boolean checkRecord(String s) {\\n        return !s.matches(\".*A.*A.*\") && !s.matches(\".*LLL.*\");\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101620",
			"view":"214",
			"top":"8",
			"title":"Java - O(n) time and O(1) space solution",
			"vote":"3",
			"content":"Does not use the string.match method, but rather iterates through the String until it hits the conditions for it to return a FALSE.\\n\\nAny feedback is appreciated!\\n\\n```\\npublic boolean checkRecord(String s) {\\n        //Time ~ O(n)\\n        //Space ~ O(1)\\n        // ---> where n is the length of String s\\n        \\n        int countA = 0;\\n        int countL = 0;\\n        \\n        for(int i = 0; i < s.length(); i++){\\n            if(s.charAt(i) == 'A'){\\n                if(countA == 1){\\n                    return false;\\n                } else{\\n                    countA = countA + 1;\\n                }\\n                countL = 0;\\n            } else if(s.charAt(i) == 'L'){\\n                if(countL == 2){\\n                    return false;\\n                } else{\\n                    countL = countL + 1;\\n                }\\n            } else{\\n                countL = 0;\\n            }\\n        }\\n        \\n        return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"101608",
			"view":"358",
			"top":"9",
			"title":"1 line Python",
			"vote":"2",
			"content":"    return s.count('A') <= 1 and s.count('LLL') == 0"
		}
	],
	"id":"534",
	"title":"Student Attendance Record I",
	"content":"You are given a string representing an attendance record for a student. The record only contains the following three characters:\r\n\r\n<p>\r\n<ol>\r\n<li><b>'A'</b> : Absent. </li>\r\n<li><b>'L'</b> : Late.</li>\r\n<li> <b>'P'</b> : Present. </li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\nA student could be rewarded if his attendance record doesn't contain <b>more than one 'A' (absent)</b> or <b>more than two continuous 'L' (late)</b>.    </p>\r\n\r\n<p>You need to return whether the student could be rewarded according to his attendance record.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"PPALLP\"\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"PPALLL\"\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n\r\n\r\n",
	"frequency":"140",
	"ac_num":"27046"
}