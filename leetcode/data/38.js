{
	"difficulty":"1",
	"submit_num":"480987",
	"show_id":"38",
	"leetcode_id":"38",
	"answers":[
		{
			"lc_ans_id":"16015",
			"view":"52614",
			"top":"0",
			"title":"Please change the misleading description",
			"vote":"345",
			"content":"It seems not only me misunderstood the question. Please modify the description, since it's frustrating if you are solving a \"different\" question. Thanks."
		},
		{
			"lc_ans_id":"15995",
			"view":"33176",
			"top":"1",
			"title":"Examples of nth sequence",
			"vote":"126",
			"content":"At the beginning, I got confusions about what is the nth sequence. Well, my solution is accepted now, so I'm going to give some examples of nth sequence here. The following are sequence from n=1 to n=10:\\n\\n     1.     1\\n     2.     11\\n     3.     21\\n     4.     1211\\n     5.     111221 \\n     6.     312211\\n     7.     13112221\\n     8.     1113213211\\n     9.     31131211131221\\n     10.   13211311123113112211\\n\\nFrom the examples you can see, the (i+1)th sequence is the \"count and say\" of the ith sequence!\\n\\nHope this helps!"
		},
		{
			"lc_ans_id":"16000",
			"view":"38197",
			"top":"2",
			"title":"Show an Answer in Java",
			"vote":"53",
			"content":"I found nobody answered this question in Java. Actually I got some trouble even this question is not so hard.\\n\\nMaybe many other people had some trouble too. So I put my answer here.\\n\\n\\n\\n    public class Solution {\\n        public String countAndSay(int n) {\\n    \\t    \\tStringBuilder curr=new StringBuilder(\"1\");\\n    \\t    \\tStringBuilder prev;\\n    \\t    \\tint count;\\n    \\t    \\tchar say;\\n    \\t        for (int i=1;i<n;i++){\\n    \\t        \\tprev=curr;\\n    \\t \\t        curr=new StringBuilder();       \\n    \\t \\t        count=1;\\n    \\t \\t        say=prev.charAt(0);\\n    \\t \\t        \\n    \\t \\t        for (int j=1,len=prev.length();j<len;j++){\\n    \\t \\t        \\tif (prev.charAt(j)!=say){\\n    \\t \\t        \\t\\tcurr.append(count).append(say);\\n    \\t \\t        \\t\\tcount=1;\\n    \\t \\t        \\t\\tsay=prev.charAt(j);\\n    \\t \\t        \\t}\\n    \\t \\t        \\telse count++;\\n    \\t \\t        }\\n    \\t \\t        curr.append(count).append(say);\\n    \\t        }\\t       \\t        \\n    \\t        return curr.toString();\\n            \\n        }\\n    }\\n\\n@code StringBuilder.append() is the default way to append one string to another. While I have tried String.cancate(),which is not working properly.\\n\\nAny comment is welcomed."
		},
		{
			"lc_ans_id":"15999",
			"view":"9254",
			"top":"3",
			"title":"4-5 lines Python solutions",
			"vote":"45",
			"content":"**Solution 1** ... using a regular expression\\n\\n    def countAndSay(self, n):\\n        s = '1'\\n        for _ in range(n - 1):\\n            s = re.sub(r'(.)\\\\1*', lambda m: str(len(m.group(0))) + m.group(1), s)\\n        return s\\n\\n---\\n\\n**Solution 2** ... using a regular expression\\n\\n    def countAndSay(self, n):\\n        s = '1'\\n        for _ in range(n - 1):\\n            s = ''.join(str(len(group)) + digit\\n                        for group, digit in re.findall(r'((.)\\\\2*)', s))\\n        return s\\n\\n---\\n\\n**Solution 3** ... using `groupby`\\n\\n    def countAndSay(self, n):\\n        s = '1'\\n        for _ in range(n - 1):\\n            s = ''.join(str(len(list(group))) + digit\\n                        for digit, group in itertools.groupby(s))\\n        return s"
		},
		{
			"lc_ans_id":"16043",
			"view":"18531",
			"top":"4",
			"title":"C++ solution easy-understand",
			"vote":"41",
			"content":"    string countAndSay(int n) {\\n        if (n == 0) return \"\";\\n        string res = \"1\";\\n        while (--n) {\\n            string cur = \"\";\\n            for (int i = 0; i < res.size(); i++) {\\n                int count = 1;\\n                 while ((i + 1 < res.size()) && (res[i] == res[i + 1])){\\n                    count++;    \\n                    i++;\\n                }\\n                cur += to_string(count) + res[i];\\n            }\\n            res = cur;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"16328",
			"view":"7246",
			"top":"5",
			"title":"I suggest we should add the description: The \"1\" is the 1st string, and calculate the n th string.",
			"vote":"39",
			"content":"Because usually we start from the 0 th item, so add this description to avoid misunderstanding."
		},
		{
			"lc_ans_id":"16040",
			"view":"7640",
			"top":"6",
			"title":"Straightforward Java Solution",
			"vote":"28",
			"content":"     public class Solution {\\n        public String countAndSay(int n) {\\n            String s = \"1\";\\n            for(int i = 1; i < n; i++){\\n                s = countIdx(s);\\n            }\\n            return s;\\n        }\\n        \\n        public String countIdx(String s){\\n            StringBuilder sb = new StringBuilder();\\n            char c = s.charAt(0);\\n            int count = 1;\\n            for(int i = 1; i < s.length(); i++){\\n                if(s.charAt(i) == c){\\n                    count++;\\n                }\\n                else\\n                {\\n                    sb.append(count);\\n                    sb.append(c);\\n                    c = s.charAt(i);\\n                    count = 1;\\n                }\\n            }\\n            sb.append(count);\\n            sb.append(c);\\n            return sb.toString();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"16044",
			"view":"4480",
			"top":"7",
			"title":"Simple Python Solution",
			"vote":"19",
			"content":"Idea here is keep track of the first letter in the sequence and count consecutive occurances.  Once you encounter a new letter you add the previous count and letter to the chain.  Repeat n-1 times (since we seeded the initial '1' case).  We always update temp after the inner loop since we will never have already added the last sequence.\\n\\n         def countAndSay(self, n):\\n            s = '1'\\n            for _ in range(n-1):\\n                let, temp, count = s[0], '', 0\\n                for l in s:\\n                    if let == l:\\n                        count += 1\\n                    else:\\n                        temp += str(count)+let\\n                        let = l\\n                        count = 1\\n                temp += str(count)+let\\n                s = temp\\n            return s"
		},
		{
			"lc_ans_id":"16113",
			"view":"5867",
			"top":"8",
			"title":"How to proof the COUNT is always less than 10?",
			"vote":"14",
			"content":"At first, I solved this problem with the considering of the cases when COUNT is greater than 9, which can not be handled using:`curString +=count+'0';`, since it is more than one digit. And I solved it using `itoa`. But when I thinked about the problem, it seems that the COUNT is always less than 10, even 4. Then I re-writed the solution and also accepted by OJ.\\n\\nCan you guys help me proof it?\\nMy code:\\n\\n    class Solution {\\n    public:\\n        string countAndSay(int n) {\\n    \\t\\tstring prevString;\\n    \\t\\tstring curString = \"1\";\\n    \\t\\tfor (int i = 1; i<n; ++i){\\n    \\t\\t\\tprevString = curString;\\n    \\t\\t\\tcurString = \"\";\\n    \\t\\t\\tint count = 1;\\n    \\t\\t\\tchar digit = prevString[0];\\n    \\t\\t\\tfor (int j = 1; j<prevString.length(); ++j){\\n    \\t\\t\\t\\tif (prevString[j] == digit){\\n    \\t\\t\\t\\t\\t++count;\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t\\telse{\\n    \\t\\t\\t\\t\\t\\n    \\t\\t\\t\\t\\tcurString +=count+'0'; //myItoa(count);\\n    \\t\\t\\t\\t\\tcurString += digit;\\n    \\t\\t\\t\\t\\tdigit = prevString[j];\\n    \\t\\t\\t\\t\\tcount = 1;\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\t\\t\\tcurString += count+'0';//myItoa(count);\\n    \\t\\t\\tcurString += digit;\\n    \\t\\t}\\n    \\t\\treturn curString;\\n        }\\n    /*private:\\n    \\tstring myItoa(int i){\\n    \\t\\tstring str;\\n    \\t\\twhile (i){\\n    \\t\\t\\tstr += i%10+'0';\\n    \\t\\t\\ti /=10;\\n    \\t\\t}\\n    \\t\\treverse(str.begin(), str.end());\\n    \\t\\treturn str;\\n    \\t}*/\\n    };"
		},
		{
			"lc_ans_id":"16354",
			"view":"5313",
			"top":"9",
			"title":"C++ solution, runtime O(n), space O(n)",
			"vote":"12",
			"content":"Please see the comments in the code. \\nThe solution is quite straight-forward. We generate k-th string, and from k-th string we generate k+1-th string, until we generate n-th string.\\nWe use string-helper to save temporary result, \\nI'm sure there is a way for in-place solution also.\\n\\n    class Solution {\\n    public:\\n    \\n        std::string countAndSay(int n) {\\n        \\n        \\tif (0 == n) return \"\";  \\n        \\tif (1 == n) return \"1\";\\n        \\t\\n        \\tstd::string res=\"1\";\\n        \\tstd::string s;\\n        \\n        \\tfor (int i = 1; i < n; i++){    // run from starting to generate second string\\n        \\n        \\t\\tint len = res.size();\\n                \\n                //cheack all digits in the string\\n        \\t\\tfor (int j = 0; j < len; j++){  \\n        \\t\\t    \\n        \\t\\t    int count=1; // we have at least 1 occourence of each digit\\n        \\n                    // get the number of times same digit occurred (be carefull with the end of the string)\\n    \\t\\t\\t\\twhile ((j + 1 < len) && (res[j] == res[j + 1])){\\n    \\t\\t\\t\\t\\tcount++;    \\n    \\t\\t\\t\\t\\tj++;        // we need to keep increasing the index inside of the string\\n    \\t\\t\\t\\t}\\n                    \\n                    // add to new string \"count\"+\"digit itself\"\\n        \\t\\t\\ts += std::to_string(count) + res[j];\\n        \\t\\t}\\n        \\n                // save temporary result\\n        \\t\\tres = s;\\n        \\t\\t\\n        \\t\\t// clean our string-helper\\n        \\t\\ts.clear();\\n        \\n        \\t}\\n        \\n        \\treturn res;\\n        }\\n    };"
		}
	],
	"id":"38",
	"title":"Count and Say",
	"content":"<p>The count-and-say sequence is the sequence of integers with the first five terms as following:</p>\r\n<pre>\r\n1.     1\r\n2.     11\r\n3.     21\r\n4.     1211\r\n5.     111221\r\n</pre>\r\n\r\n<p>\r\n<code>1</code> is read off as <code>\"one 1\"</code> or <code>11</code>.<br />\r\n<code>11</code> is read off as <code>\"two 1s\"</code> or <code>21</code>.<br />\r\n<code>21</code> is read off as <code>\"one 2</code>, then <code>one 1\"</code> or <code>1211</code>.<br />\r\n</p>\r\n\r\n<p>\r\nGiven an integer <i>n</i>, generate the <i>n</i><sup>th</sup> term of the count-and-say sequence.\r\n</p>\r\n\r\n<p>\r\nNote: Each term of the sequence of integers will be represented as a string.\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> 1\r\n<b>Output:</b> \"1\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> 4\r\n<b>Output:</b> \"1211\"\r\n</pre>\r\n</p>",
	"frequency":"583",
	"ac_num":"174237"
}