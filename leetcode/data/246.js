{
	"difficulty":"1",
	"submit_num":"81587",
	"show_id":"246",
	"leetcode_id":"246",
	"answers":[
		{
			"lc_ans_id":"67188",
			"view":"12584",
			"top":"0",
			"title":"4 lines in Java",
			"vote":"167",
			"content":"Just checking the pairs, going inwards from the ends.\\n\\n    public boolean isStrobogrammatic(String num) {\\n        for (int i=0, j=num.length()-1; i <= j; i++, j--)\\n            if (!\"00 11 88 696\".contains(num.charAt(i) + \"\" + num.charAt(j)))\\n                return false;\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"67182",
			"view":"6807",
			"top":"1",
			"title":"Accepted Java solution",
			"vote":"48",
			"content":"    public boolean isStrobogrammatic(String num) {\\n        Map<Character, Character> map = new HashMap<Character, Character>();\\n        map.put('6', '9');\\n        map.put('9', '6');\\n        map.put('0', '0');\\n        map.put('1', '1');\\n        map.put('8', '8');\\n       \\n        int l = 0, r = num.length() - 1;\\n        while (l <= r) {\\n            if (!map.containsKey(num.charAt(l))) return false;\\n            if (map.get(num.charAt(l)) != num.charAt(r))\\n                return false;\\n            l++;\\n            r--;\\n        }\\n        \\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"67203",
			"view":"2777",
			"top":"2",
			"title":"1-liners Python",
			"vote":"12",
			"content":"My maybe best:\\n\\n    def isStrobogrammatic(self, num):\\n        return all(num[i] + num[~i] in '696 00 11 88' for i in range(len(num)/2+1))\\n\\nSome others:\\n\\n    def isStrobogrammatic(self, num):\\n        return all(c + d in '696 00 11 88' for c, d in zip(num, num[::-1]))\\n\\n    def isStrobogrammatic(self, num):\\n        return all(num[i] + num[~i] in '696 00 11 88' for i in range(len(num)))\\n\\n    def isStrobogrammatic(self, num):\\n        return all(map('696 00 11 88'.count, map(operator.add, num, num[::-1])))\\n\\n    def isStrobogrammatic(self, num):\\n        return all(p in '696 00 11 88' for p in map(operator.add, num, num[::-1]))\\n\\n    def isStrobogrammatic(self, num):\\n        return set(map(operator.add, num, num[::-1])) <= set('69 96 00 11 88'.split())\\n\\n    def isStrobogrammatic(self, num):\\n        return set(map(operator.add, num, num[::-1])) <= {'69', '96', '00', '11', '88'}\\n\\n    def isStrobogrammatic(self, num):\\n        return set(map(''.join, zip(num, num[::-1]))) <= {'69', '96', '00', '11', '88'}"
		},
		{
			"lc_ans_id":"67207",
			"view":"2931",
			"top":"3",
			"title":"0ms C++ Solution",
			"vote":"11",
			"content":"The following is the C++ implementation of the suggested solution using a look-up table (implemented as an `unordered_map`). It takes 0 ms. But, I wonder, are there any real applications of strobogrammatic numbers?\\n\\n    class Solution {\\n    public:\\n        bool isStrobogrammatic(string num) {\\n            unordered_map<char, char> lut{{'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}};\\n            int n = num.length();\\n            for (int l = 0, r = n - 1; l <= r; l++, r--)\\n                if (lut.find(num[l]) == lut.end() || lut[num[l]] != num[r])\\n                    return false; \\n            return true; \\n        }\\n    };"
		},
		{
			"lc_ans_id":"67197",
			"view":"672",
			"top":"4",
			"title":"Simple Python Solution",
			"vote":"9",
			"content":"    def isStrobogrammatic(self, num):\\n        \"\"\"\\n        :type num: str\\n        :rtype: bool\\n        \"\"\"\\n        maps = {(\"0\", \"0\"), (\"1\", \"1\"), (\"6\", \"9\"), (\"8\", \"8\"), (\"9\", \"6\")}\\n        i,j = 0, len(num) - 1\\n        while i <= j:\\n            if (num[i], num[j]) not in maps:\\n                return False\\n            i += 1\\n            j -= 1\\n        return True"
		},
		{
			"lc_ans_id":"67190",
			"view":"1261",
			"top":"5",
			"title":"Python solution with dictionary.",
			"vote":"9",
			"content":"        \\n    def isStrobogrammatic1(self, num):\\n        deque = collections.deque(map(int, list(num)))\\n        while len(deque) >= 2:\\n            l, r = deque.popleft(), deque.pop()\\n            for i in [2,3,4,5,7]:\\n                if i in [l, r]:\\n                    return False  \\n            if (l, r) in [(6,6), (9,9)] or (l != r and (l, r) not in [(6,9), (9,6)]):\\n                return False\\n        return not deque or deque.pop() in [0,1,8]\\n        \\n    def isStrobogrammatic(self, num):\\n        dic = {\"0\":\"0\", \"1\":\"1\", \"6\":\"9\", \"8\":\"8\", \"9\":\"6\"}\\n        l, r = 0, len(num)-1\\n        while l <= r:\\n            if num[l] not in dic or dic[num[l]] != num[r]:\\n                return False\\n            l += 1\\n            r -= 1\\n        return True"
		},
		{
			"lc_ans_id":"67205",
			"view":"1554",
			"top":"6",
			"title":"My Concise Java Solution",
			"vote":"7",
			"content":"    public class Solution {\\n        public boolean isStrobogrammatic(String num) {\\n            int start = 0;\\n            int end = num.length() - 1;\\n            while (start <= end) {\\n                switch(num.charAt(start)) {\\n                    case '0':\\n                    case '1':\\n                    case '8':\\n                        if (num.charAt(end) != num.charAt(start)) {\\n                            return false;\\n                        }\\n                        break;\\n                    case '6':\\n                        if (num.charAt(end) != '9') {\\n                            return false;\\n                        }\\n                        break;\\n                    case '9':\\n                        if (num.charAt(end) != '6') {\\n                            return false;\\n                        }\\n                        break;\\n                    default:\\n                        return false;\\n                }\\n                start++;\\n                end--;\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67257",
			"view":"1258",
			"top":"7",
			"title":"5 lines concise and easy understand C++ solution",
			"vote":"4",
			"content":"    class Solution {public:\\n    bool isStrobogrammatic(string num) {\\n        map<char, char> mp{{'0', '0'}, {'1', '1'}, {'8', '8'}, {'6', '9'}, {'9', '6'}};\\n        for(int i = 0; i < num.size(); i++){\\n            if(mp[num[i]] != num[num.size() - i - 1])  return false;\\n        }\\n        return true;\\n    }\\n};"
		},
		{
			"lc_ans_id":"67189",
			"view":"576",
			"top":"8",
			"title":"AC clean Java recursion solution",
			"vote":"4",
			"content":"    public class Solution {\\n        public boolean isStrobogrammatic(String num) {\\n            if (num == null) \\n                return false;\\n                \\n            return helper(num, 0, num.length() - 1);\\n        }\\n        \\n        boolean helper(String num, int lo, int hi) {\\n            if (lo > hi) \\n                return true;\\n            \\n            char c1 = num.charAt(lo), c2 = num.charAt(hi);\\n            \\n            int mul = (c1 - '0') * (c2 - '0');\\n            \\n            if (mul == 1 || mul == 64 || mul == 54 || (mul == 0 && c1 == c2))\\n                return helper(num, lo + 1, hi - 1);\\n            else\\n                return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67212",
			"view":"111",
			"top":"9",
			"title":"C++ one-liner (effectively :-)",
			"vote":"2",
			"content":"The two tricks are using a reverse iterator and using a string instead of an explicit map/hash.\\n```\\n        bool isStrobogrammatic(string num)\\n        { \\n            auto M = (num.size() + 1) / 2;\\n            \\n            auto okay = equal(\\n                num.begin(), num.begin() + M, num.rbegin(),\\n                [](char lhs, char rhs)\\n                { return \"01xxxx9x86\"[lhs - '0'] == rhs; });\\n\\n            return okay;\\n        }\\n```"
		}
	],
	"id":"246",
	"title":"Strobogrammatic Number",
	"content":"<p>A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).</p>\r\n<p>Write a function to determine if a number is strobogrammatic. The number is represented as a string.</p>\r\n<p>For example, the numbers \"69\", \"88\", and \"818\" are all strobogrammatic.</p>",
	"frequency":"166",
	"ac_num":"32784"
}