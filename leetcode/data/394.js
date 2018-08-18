{
	"difficulty":"2",
	"submit_num":"110436",
	"show_id":"394",
	"leetcode_id":"394",
	"answers":[
		{
			"lc_ans_id":"87543",
			"view":"16595",
			"top":"0",
			"title":"0ms simple C++ solution",
			"vote":"71",
			"content":"```\\nclass Solution {\\npublic:\\n    string decodeString(const string& s, int& i) {\\n        string res;\\n        \\n        while (i < s.length() && s[i] != ']') {\\n            if (!isdigit(s[i]))\\n                res += s[i++];\\n            else {\\n                int n = 0;\\n                while (i < s.length() && isdigit(s[i]))\\n                    n = n * 10 + s[i++] - '0';\\n                    \\n                i++; // '['\\n                string t = decodeString(s, i);\\n                i++; // ']'\\n                \\n                while (n-- > 0)\\n                    res += t;\\n            }\\n        }\\n        \\n        return res;\\n    }\\n\\n    string decodeString(string s) {\\n        int i = 0;\\n        return decodeString(s, i);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87534",
			"view":"24751",
			"top":"1",
			"title":"Simple Java Solution using Stack",
			"vote":"56",
			"content":"```\\npublic class Solution {\\n    public String decodeString(String s) {\\n        String res = \"\";\\n        Stack<Integer> countStack = new Stack<>();\\n        Stack<String> resStack = new Stack<>();\\n        int idx = 0;\\n        while (idx < s.length()) {\\n            if (Character.isDigit(s.charAt(idx))) {\\n                int count = 0;\\n                while (Character.isDigit(s.charAt(idx))) {\\n                    count = 10 * count + (s.charAt(idx) - '0');\\n                    idx++;\\n                }\\n                countStack.push(count);\\n            }\\n            else if (s.charAt(idx) == '[') {\\n                resStack.push(res);\\n                res = \"\";\\n                idx++;\\n            }\\n            else if (s.charAt(idx) == ']') {\\n                StringBuilder temp = new StringBuilder (resStack.pop());\\n                int repeatTimes = countStack.pop();\\n                for (int i = 0; i < repeatTimes; i++) {\\n                    temp.append(res);\\n                }\\n                res = temp.toString();\\n                idx++;\\n            }\\n            else {\\n                res += s.charAt(idx++);\\n            }\\n        }\\n        return res;\\n    }\\n}"
		},
		{
			"lc_ans_id":"87556",
			"view":"10402",
			"top":"2",
			"title":"Java short and easy-understanding solution using stack",
			"vote":"44",
			"content":"```\\npublic class Solution {\\n    public String decodeString(String s) {\\n        Stack<Integer> count = new Stack<>();\\n        Stack<String> result = new Stack<>();\\n        int i = 0;\\n        result.push(\"\");\\n        while (i < s.length()) {\\n            char ch = s.charAt(i);\\n            if (ch >= '0' && ch <= '9') {\\n                int start = i;\\n                while (s.charAt(i + 1) >= '0' && s.charAt(i + 1) <= '9') i++;\\n                count.push(Integer.parseInt(s.substring(start, i + 1)));\\n            } else if (ch == '[') {\\n                result.push(\"\");\\n            } else if (ch == ']') {\\n                String str = result.pop();\\n                StringBuilder sb = new StringBuilder();\\n                int times = count.pop();\\n                for (int j = 0; j < times; j += 1) {\\n                    sb.append(str);\\n                }\\n                result.push(result.pop() + sb.toString());\\n            } else {\\n                result.push(result.pop() + ch);\\n            }\\n            i += 1;\\n        }\\n        return result.pop();\\n    }\\n}\\n```\\nQuite clear, isn't it?"
		},
		{
			"lc_ans_id":"87563",
			"view":"5967",
			"top":"3",
			"title":"Share my Python Stack Simple Solution (Easy to understand)",
			"vote":"38",
			"content":"```\\nclass Solution(object):\\n    def decodeString(self, s):\\n        stack = []\\n        stack.append([\"\", 1])\\n        num = \"\"\\n        for ch in s:\\n            if ch.isdigit():\\n              num += ch\\n            elif ch == '[':\\n                stack.append([\"\", int(num)])\\n                num = \"\"\\n            elif ch == ']':\\n                st, k = stack.pop()\\n                stack[-1][0] += st*k\\n            else:\\n                stack[-1][0] += ch\\n        return stack[0][0]\\n```"
		},
		{
			"lc_ans_id":"87536",
			"view":"6624",
			"top":"4",
			"title":"3 lines Python, 2 lines Ruby, regular expression",
			"vote":"27",
			"content":"## Python\\n\\n    def decodeString(self, s):\\n        while '[' in s:\\n            s = re.sub(r'(\\\\d+)\\\\[([a-z]*)\\\\]', lambda m: int(m.group(1)) * m.group(2), s)\\n        return s\\n\\nSubmitted once, got accepted in 32 ms.\\n\\n## Ruby\\n\\n```\\ndef decode_string(s)\\n  1 while s.gsub!(/(\\\\d+)\\\\[([a-z]*)\\\\]/) { $2 * $1.to_i }\\n  s\\nend\\n```"
		},
		{
			"lc_ans_id":"87662",
			"view":"1413",
			"top":"5",
			"title":"Python solution using stack",
			"vote":"20",
			"content":"```\\nclass Solution(object):\\n    def decodeString(self, s):\\n        stack = []; curNum = 0; curString = ''\\n        for c in s:\\n            if c == '[':\\n                stack.append(curString)\\n                stack.append(curNum)\\n                curString = ''\\n                curNum = 0\\n            elif c == ']':\\n                num = stack.pop()\\n                prevString = stack.pop()\\n                curString = prevString + num*curString\\n            elif c.isdigit():\\n                curNum = curNum*10 + int(c)\\n            else:\\n                curString += c\\n        return curString\\n```"
		},
		{
			"lc_ans_id":"87567",
			"view":"2927",
			"top":"6",
			"title":"Java Simple Recursive solution",
			"vote":"12",
			"content":"the run time is 3 ms. And the method is really straight-forward: every time when you meet a number, it must be followed by [...], we just need to recursively call our method to decode \"...\", then repeat the result \"num\" times.\\n\\n'''\\npublic class Solution {\\n    public String decodeString(String s) {\\n\\n        if (s.length() == 0) return \"\";\\n        StringBuilder sb = new StringBuilder();\\n        for (int i = 0; i < s.length(); i ++) {\\n            char c = s.charAt(i);\\n            if (Character.isDigit(c)) {\\n                int digit_begin = i;\\n                while (s.charAt(i) != '[') i++;\\n                int num = Integer.valueOf(s.substring(digit_begin, i));\\n                int count = 1;\\n                int str_begin = i+1;\\n                i ++;\\n                while (count != 0) {\\n                    if (s.charAt(i) == '[') count ++;\\n                    else if (s.charAt(i) == ']') count --;\\n                    i ++;\\n                }\\n                i--;\\n                String str = decodeString(s.substring(str_begin, i));\\n                for (int j = 0; j < num; j ++) {\\n                    sb.append(str);\\n                }\\n            } else {\\n                sb.append(c);\\n            }\\n        }\\n        return sb.toString();\\n    }\\n}\\n'''"
		},
		{
			"lc_ans_id":"87544",
			"view":"1456",
			"top":"7",
			"title":"Clean C++ Recursive Solution with Explanation",
			"vote":"11",
			"content":"Every time we meet a '[', we treat it as a subproblem so call our recursive function to get the content in that '[' and ']'. After that, repeat that content for 'num' times.\\nEvery time we meet a ']', we know a subproblem finished and just return the 'word' we got in this subproblem.\\nPlease notice that the 'pos' is passed by reference, use it to record the position of the original string we are looking at.\\n\\n```\\nclass Solution {\\npublic:\\n    string decodeString(string s) {\\n        int pos = 0;\\n        return helper(pos, s);\\n    }\\n    \\n    string helper(int& pos, string s) {\\n        int num=0;\\n        string word = \"\";\\n        for(;pos<s.size(); pos++) {\\n            char cur = s[pos];\\n            if(cur == '[') {\\n                string curStr = helper(++pos, s);\\n                for(;num>0;num--) word += curStr;\\n            } else if (cur >= '0' && cur <='9') {\\n                num = num*10 + cur - '0';\\n            } else if (cur == ']') {\\n                return word;\\n            } else {    // Normal characters\\n                word += cur;\\n            }\\n        }\\n        return word;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87615",
			"view":"455",
			"top":"8",
			"title":"Simple Java DFS Solution",
			"vote":"6",
			"content":"```\\npublic class Solution {\\n    private int pos = 0;\\n    public String decodeString(String s) {\\n        StringBuilder sb = new StringBuilder();\\n        String num = \"\";\\n        for (int i = pos; i < s.length(); i++) {\\n            if (s.charAt(i) != '[' && s.charAt(i) != ']' && !Character.isDigit(s.charAt(i))) {\\n                sb.append(s.charAt(i));\\n            } else if (Character.isDigit(s.charAt(i))) {\\n                num += s.charAt(i);\\n            } else if (s.charAt(i) == '[') {\\n                pos = i + 1;\\n                String next = decodeString(s);\\n                for (int n = Integer.valueOf(num); n > 0; n--) sb.append(next);\\n                num = \"\";\\n                i = pos;\\n            } else if (s.charAt(i) == ']') {\\n                pos = i;\\n                return sb.toString();\\n            }\\n        }\\n        return sb.toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"87651",
			"view":"953",
			"top":"9",
			"title":"C++ simple and clear solution",
			"vote":"6",
			"content":"```\\nclass Solution {\\npublic:\\n    string decodeString(string s) {\\n        stack<string> chars;\\n        stack<int> nums;\\n        string res;\\n        int num = 0;\\n        for(char c : s) {\\n            if(isdigit(c)) {\\n                num = num*10 + (c-'0');                              \\n            }\\n            else if(isalpha(c)) {\\n                res.push_back(c);                \\n            }\\n            else if(c == '[') {\\n                chars.push(res);\\n                nums.push(num);\\n                res = \"\";\\n                num = 0;\\n            }\\n            else if(c == ']') {\\n                string tmp = res;\\n                for(int i = 0; i < nums.top()-1; ++i) {\\n                    res += tmp;\\n                }\\n                res = chars.top() + res;\\n                chars.pop(); nums.pop();\\n            }\\n        }\\n        return res;\\n     }\\n};\\n```"
		}
	],
	"id":"394",
	"title":"Decode String",
	"content":"<p>\r\nGiven an encoded string, return it's decoded string.\r\n</p>\r\n<p>\r\nThe encoding rule is: <code>k[encoded_string]</code>, where the <i>encoded_string</i> inside the square brackets is being repeated exactly <i>k</i> times. Note that <i>k</i> is guaranteed to be a positive integer.</p>\r\n\r\n<p>\r\nYou may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.</p>\r\n\r\n<p>Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, <i>k</i>. For example, there won't be input like <code>3a</code> or <code>2[4]</code>.\r\n</p>\r\n\r\n<p><b>Examples:</b>\r\n<pre>\r\ns = \"3[a]2[bc]\", return \"aaabcbc\".\r\ns = \"3[a2[c]]\", return \"accaccacc\".\r\ns = \"2[abc]3[cd]ef\", return \"abcabccdcdcdef\".\r\n</pre>\r\n</p>",
	"frequency":"330",
	"ac_num":"46402"
}