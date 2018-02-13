{
	"difficulty":"2",
	"submit_num":"106313",
	"show_id":"402",
	"leetcode_id":"402",
	"answers":[
		{
			"lc_ans_id":"88660",
			"view":"16086",
			"top":"0",
			"title":"A greedy method using stack, O(n) time and O(n) space",
			"vote":"70",
			"content":"~~~~\\npublic class Solution {\\n    public String removeKdigits(String num, int k) {\\n        int digits = num.length() - k;\\n        char[] stk = new char[num.length()];\\n        int top = 0;\\n        // k keeps track of how many characters we can remove\\n        // if the previous character in stk is larger than the current one\\n        // then removing it will get a smaller number\\n        // but we can only do so when k is larger than 0\\n        for (int i = 0; i < num.length(); ++i) {\\n            char c = num.charAt(i);\\n            while (top > 0 && stk[top-1] > c && k > 0) {\\n                top -= 1;\\n                k -= 1;\\n            }\\n            stk[top++] = c;\\n        }\\n        // find the index of first non-zero digit\\n        int idx = 0;\\n        while (idx < digits && stk[idx] == '0') idx++;\\n        return idx == digits? \"0\": new String(stk, idx, digits - idx);\\n    }\\n}\\n~~~~"
		},
		{
			"lc_ans_id":"88708",
			"view":"10341",
			"top":"1",
			"title":"Straightforward Java Solution Using Stack",
			"vote":"53",
			"content":"```\\npublic class Solution {\\n    public String removeKdigits(String num, int k) {\\n        int len = num.length();\\n        //corner case\\n        if(k==len)        \\n            return \"0\";\\n            \\n        Stack<Character> stack = new Stack<>();\\n        int i =0;\\n        while(i<num.length()){\\n            //whenever meet a digit which is less than the previous digit, discard the previous one\\n            while(k>0 && !stack.isEmpty() && stack.peek()>num.charAt(i)){\\n                stack.pop();\\n                k--;\\n            }\\n            stack.push(num.charAt(i));\\n            i++;\\n        }\\n        \\n        // corner case like \"1111\"\\n        while(k>0){\\n            stack.pop();\\n            k--;            \\n        }\\n        \\n        //construct the number from the stack\\n        StringBuilder sb = new StringBuilder();\\n        while(!stack.isEmpty())\\n            sb.append(stack.pop());\\n        sb.reverse();\\n        \\n        //remove all the 0 at the head\\n        while(sb.length()>1 && sb.charAt(0)=='0')\\n            sb.deleteCharAt(0);\\n        return sb.toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88678",
			"view":"4753",
			"top":"2",
			"title":"Two algorithms with detailed explaination",
			"vote":"26",
			"content":"The first algorithm is straight-forward. Let's think about the simplest case: how to remove 1 digit from the number so that the new number is the smallest possible\\uff1f Well, one can simply scan from left to right, and remove the first \"peak\" digit; the peak digit is larger than its right neighbor.  One can repeat this procedure k times, and obtain the first algorithm:\\n```\\nstring removeKdigits(string num, int k) {\\n        while (k > 0) {\\n            int n = num.size();\\n            int i = 0;\\n            while (i+1<n && num[i]<=num[i+1])  i++;\\n            num.erase(i, 1);\\n            k--;\\n        }\\n        // trim leading zeros\\n        int s = 0;\\n        while (s<(int)num.size()-1 && num[s]=='0')  s++;\\n        num.erase(0, s);\\n        \\n        return num==\"\" ? \"0\" : num;\\n    }\\n```\\nThe above algorithm is a bit inefficient because it frequently remove a particular element from a string and has complexity O(k*n).\\n\\nOne can simulate the above procedure by using a stack, and obtain a O(n) algorithm. Note, when the result stack (i.e. res) pop a digit, it is equivalent as remove that \"peak\" digit.\\n```\\nstring removeKdigits(string num, int k) {\\n        string res;\\n        int keep = num.size() - k;\\n        for (int i=0; i<num.size(); i++) {\\n            while (res.size()>0 && res.back()>num[i] && k>0) {\\n                res.pop_back();\\n                k--;\\n            }\\n            res.push_back(num[i]);\\n        }\\n        res.erase(keep, string::npos);\\n        \\n        // trim leading zeros\\n        int s = 0;\\n        while (s<(int)res.size()-1 && res[s]=='0')  s++;\\n        res.erase(0, s);\\n        \\n        return res==\"\" ? \"0\" : res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"88668",
			"view":"4310",
			"top":"3",
			"title":"Short Python, one O(n) and one RegEx",
			"vote":"21",
			"content":"## O(n) Solution\\n\\nGo through the digits from left to right, remove previous digits if that makes the number smaller (and if we still have to remove digits). Almost the same as the `prep` function from [my solution to an earlier problem](https://discuss.leetcode.com/topic/32298/short-python-ruby-c), which did basically the same except it **maximized** the number.\\n\\n    def removeKdigits(self, num, k):\\n        out = []\\n        for d in num:\\n            while k and out and out[-1] > d:\\n                out.pop()\\n                k -= 1\\n            out.append(d)\\n        return ''.join(out[:-k or None]).lstrip('0') or '0'\\n\\n## Regex Solution\\n\\nk times remove the leftmost digit followed by a smaller digit (or remove the last digit). Didn't think this would be fast enough, but it is :-)\\n\\n    def removeKdigits(self, num, k):\\n        sub = re.compile('1[0]|2[01]|3[0-2]|4[0-3]|5[0-4]|6[0-5]|7[0-6]|8[0-7]|9[0-8]|.$').sub\\n        for _ in range(k):\\n            num = sub(lambda m: m.group()[1:], num, 1)\\n        return num.lstrip('0') or '0'"
		},
		{
			"lc_ans_id":"88781",
			"view":"2855",
			"top":"4",
			"title":"6ms Java Solution with detailed comment",
			"vote":"11",
			"content":"```\\npublic class Solution {\\n    public String removeKdigits(String num, int k) {\\n        int remain = num.length() - k;\\n        char[] numArray = num.toCharArray(), res = new char[remain];\\n        int index = 0;\\n        for(int i = 0; i < numArray.length; i++) {\\n            // (1)  (n - i > remain - index): have enough remaining digits to be compared\\n            // (2)  (res[index - 1] > nums[i]): at this time, the (index-1) is the newest added digit,\\n            //      compare this digit with the current num, if the res is greater and you have enough \\n            //      remaining digits to be compared, decrease the index(it ensures that the future added digit is \\n            //      always smaller than before and the size is remain) until get the right and 'safe' position\\n            while((numArray.length - i > remain - index) && (index > 0 && numArray[i] < res[index - 1])) index--;\\n            if(index < remain) res[index++] = numArray[i];\\n        }\\n        \\n        // check leading zeroes\\n        index = -1;\\n        while(++index < remain) {\\n            if(res[index] != '0') break;\\n        }\\n        String s = new String(res).substring(index);\\n        \\n        return s.length() == 0 ? \"0\" : s;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88680",
			"view":"1237",
			"top":"5",
			"title":"My Easy Understandable C++ Solution",
			"vote":"8",
			"content":"k is the number of char needs dropping, 'keep' is the number of char that should keep. \\nWe need to remove the beginning zeroes, and finally check if the result is empty of not.\\n\\n```\\nclass Solution {\\npublic:\\n    string removeKdigits(string num, int k) {\\n        string res = \"\";\\n        int n = num.size(), keep = n - k;\\n        for (char c : num) {\\n            while (k && res.size() && res.back() > c) {\\n                res.pop_back();\\n                --k;\\n            }\\n            res.push_back(c);\\n        }\\n        res.resize(keep);\\n        while (!res.empty() && res[0] == '0') res.erase(res.begin());\\n        return res.empty() ? \"0\" : res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88743",
			"view":"1806",
			"top":"6",
			"title":"C++ 6ms 10 lines solution with comments",
			"vote":"6",
			"content":"```\\nstring removeKdigits(string num, int k) {\\n       string ans = \"\";                                         // treat ans as a stack in below for loop\\n       \\n       for (char c : num) {\\n           while (ans.length() && ans.back() > c && k) {\\n               ans.pop_back();                                  // make sure digits in ans are in ascending order\\n               k--;                                             // remove one char\\n           }\\n           \\n           if (ans.length() || c != '0') { ans.push_back(c); }  // can't have leading '0'\\n       }\\n       \\n       while (ans.length() && k--) { ans.pop_back(); }          // make sure remove k digits in total\\n       \\n       return ans.empty() ? \"0\" : ans;\\n}\\n```"
		},
		{
			"lc_ans_id":"88762",
			"view":"1011",
			"top":"7",
			"title":"Short 10 lines O(n) Java Code",
			"vote":"5",
			"content":"Basically remove those digits start descending\\nO(n) Time O(n) space\\n\\n```\\npublic class Solution {\\n    public static String removeKdigits(String num, int k) {\\n        StringBuilder sb = new StringBuilder();\\n        for(char c : num.toCharArray()) {\\n            while(k > 0 && sb.length() != 0 && sb.charAt(sb.length() - 1) > c) {\\n                sb.setLength(sb.length() - 1);\\n                k--;\\n            }\\n            if(sb.length() != 0 || c != '0') sb.append(c);  // Only append when it is not leading zero\\n        }\\n        if(k >= sb.length()) return \"0\";\\n        sb.setLength(sb.length() - k);  // use all remaining k\\n        return sb.toString();  \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88661",
			"view":"474",
			"top":"8",
			"title":"Easy python solution",
			"vote":"4",
			"content":"```\\nclass Solution(object):\\n    def removeKdigits(self, num, k):\\n        \"\"\"\\n        :type num: str\\n        :type k: int\\n        :rtype: str\\n        \"\"\"\\n        while k > 0:\\n            k -= 1\\n            i = 0\\n            while i < len(num)-1:\\n                if num[i] > num[i+1]:\\n                    break\\n                i += 1\\n            num = num[:i] + num[i+1:]\\n        \\n        if len(num) == 0:\\n            return \"0\"\\n        else:\\n            return str(int(num))\\n```\\nfind the first pair where num[i] > num[i+1], remove num[i]\\nif cannot find, remove num[-1]\\ndone."
		},
		{
			"lc_ans_id":"88794",
			"view":"890",
			"top":"9",
			"title":"My simple O(N) idea",
			"vote":"4",
			"content":"Scan from start to end, then check if\\n\\n - s[i]>s[i+1], delete s[i];\\n - s[i]<=s[i+1], don't delete s[i] continue;\\n\\nIf we still need to delete, delete from the end.\\n\\nTotal: O(N).\\n\\nCorrectness: we only delete if there is \"descending\". The reason is, if there is an \"ascending\", say s[i]<=s[i+1], and we delete s[i], then since s[i+1]>s[i], the result can't be the minimal."
		}
	],
	"id":"402",
	"title":"Remove K Digits",
	"content":"<p>Given a non-negative integer <i>num</i> represented as a string, remove <i>k</i> digits from the number so that the new number is the smallest possible.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ul>\r\n<li>The length of <i>num</i> is less than 10002 and will be &ge; <i>k</i>.</li>\r\n<li>The given <i>num</i> does not contain any leading zero.</li>\r\n</ul>\r\n</b>\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\nInput: num = \"1432219\", k = 3\r\nOutput: \"1219\"\r\nExplanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\nInput: num = \"10200\", k = 1\r\nOutput: \"200\"\r\nExplanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b>\r\n<pre>\r\nInput: num = \"10\", k = 2\r\nOutput: \"0\"\r\nExplanation: Remove all the digits from the number and it is left with nothing which is 0.\r\n</pre>\r\n</p>",
	"frequency":"116",
	"ac_num":"27722"
}