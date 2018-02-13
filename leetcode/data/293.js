{
	"difficulty":"1",
	"submit_num":"52693",
	"show_id":"293",
	"leetcode_id":"293",
	"answers":[
		{
			"lc_ans_id":"73901",
			"view":"10346",
			"top":"0",
			"title":"4 lines in Java",
			"vote":"38",
			"content":"    public List<String> generatePossibleNextMoves(String s) {\\n        List list = new ArrayList();\\n        for (int i=-1; (i = s.indexOf(\"++\", i+1)) >= 0; )\\n            list.add(s.substring(0, i) + \"--\" + s.substring(i+2));\\n        return list;\\n    }"
		},
		{
			"lc_ans_id":"73902",
			"view":"6204",
			"top":"1",
			"title":"Simple solution in Java",
			"vote":"30",
			"content":"We start from `i = 1` and check whether current and previous characters of the input string equals to `+`. If true, then add substring to a list: characters before previous one (concatenating with `--`) and characters after the current character.\\n\\n    public List<String> generatePossibleNextMoves(String s) {\\n        List<String> list = new ArrayList<String>();\\n        for (int i = 1; i < s.length(); i++) {\\n            if (s.charAt(i) == '+' && s.charAt(i - 1) == '+') {\\n                list.add(s.substring(0, i - 1) + \"--\" + s.substring(i + 1, s.length()));\\n            }\\n        }\\n        return list;\\n    }"
		},
		{
			"lc_ans_id":"73946",
			"view":"1417",
			"top":"2",
			"title":"AC Python one line 44 ms solution",
			"vote":"9",
			"content":"    def generatePossibleNextMoves(self, s):\\n        return [s[:i] + \"--\" + s[i + 2:] for i in xrange(len(s) - 1) if s[i:i + 2] == '++']\\n\\n\\n    # 25 / 25 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 44 ms\\n\\n\\nIt is a simple list comprehension and a filter"
		},
		{
			"lc_ans_id":"73905",
			"view":"1243",
			"top":"3",
			"title":"1 line in Python",
			"vote":"7",
			"content":"    class Solution(object):\\n        def generatePossibleNextMoves(self, s):\\n            return [s[:i] + \"--\" + s[i+2:] for i in range(len(s) - 1) if s[i] == s[i + 1] == \"+\"]"
		},
		{
			"lc_ans_id":"73933",
			"view":"1540",
			"top":"4",
			"title":"8-lines C++, 7-lines Python",
			"vote":"5",
			"content":"The idea is quite straightforward: just traverse `s` and each time when we see two consecutive `+`s, convert them to `-`s and add the resulting string to the final result `moves`. But remember to recover the string after that.\\n\\nThe C++ code is as follows.\\n\\n    class Solution {\\n    public:\\n        vector<string> generatePossibleNextMoves(string s) {\\n            vector<string> moves;\\n            int n = s.length();\\n            for (int i = 0; i < n - 1; i++) {\\n                if (s[i] == '+' && s[i + 1] == '+') { \\n                    s[i] = s[i + 1] = '-';\\n                    moves.push_back(s);\\n                    s[i] = s[i + 1] = '+';\\n                }\\n            }\\n            return moves;\\n        }\\n    };\\n\\nWell I also try to write a Python solution since Python supports sequential comparisons, which is quite convenient. But Python does not support modifying a string and I can only use `list` and `join` to do the same thing.\\n\\n    class Solution(object):\\n        def generatePossibleNextMoves(self, s):\\n            \"\"\"\\n            :type s: str\\n            :rtype: List[str]\\n            \"\"\"\\n            moves, n, s = [], len(s), list(s)\\n            for i in xrange(n - 1):\\n                if s[i] == s[i + 1] == '+': \\n                    s[i] = s[i + 1] = '-'\\n                    moves += ''.join(s),\\n                    s[i] = s[i + 1] = '+' \\n            return moves"
		},
		{
			"lc_ans_id":"73909",
			"view":"1696",
			"top":"5",
			"title":"AC simple O(n) JAVA solution",
			"vote":"5",
			"content":"    public List<String> generatePossibleNextMoves(String s) {\\n    \\tList<String> res = new ArrayList<String>();\\n\\n    \\tchar chs[] = s.toCharArray(); \\n    \\tfor (int i = 0; i < s.length() - 1; i++) {\\n    \\t\\tif (chs[i] == chs[i+1] && chs[i] == '+') {\\n    \\t\\t\\tchs[i] = chs[i+1] = '-';\\n    \\t\\t\\tres.add(String.valueOf(chs));    \\t\\t\\t\\n    \\t\\t\\tchs[i] = chs[i+1] = '+';    \\t\\t\\t\\n    \\t\\t}\\n    \\t}    \\t\\n    \\treturn res;\\n    }"
		},
		{
			"lc_ans_id":"73935",
			"view":"833",
			"top":"6",
			"title":"Simple Java 8 functional (declarative) solution",
			"vote":"4",
			"content":"I noticed that Java 8 streams are much slower than loops. Streams make the code declarative but are a huge hit to the performance, unfortunately.\\n\\n    public List<String> generatePossibleNextMoves(String s) {\\n        List<String> res = new ArrayList<>();\\n        IntStream.range(1,s.length()).forEach(i -> \\n            {if (s.charAt(i-1) == '+' && s.charAt(i) == '+') \\n            res.add(s.substring(0,i-1) + \"--\" + s.substring(i+1,s.length()));});\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"73931",
			"view":"853",
			"top":"7",
			"title":"Share my Java solution",
			"vote":"4",
			"content":"I guess my solution might not be the best, but it's straightforward, no fancy stuff.\\n\\nWhen we move the pointer `i` forward, we check substring `s[i...i+1]`, if it's `\"++\"`, change it to `\"--\"` and append it to the list.\\n\\n    public List<String> generatePossibleNextMoves(String s) {\\n      List<String> res = new ArrayList<>();\\n      \\n      if (s == null || s.length() < 2) {\\n        return res;\\n      }\\n      \\n      for (int i = 0; i < s.length() - 1; i++) {\\n        if (s.startsWith(\"++\", i)) {\\n          res.add(s.substring(0, i) + \"--\" + s.substring(i + 2));\\n        }\\n      }\\n      \\n      return res;\\n    }"
		},
		{
			"lc_ans_id":"73921",
			"view":"325",
			"top":"8",
			"title":"Straightforward python",
			"vote":"2",
			"content":"Just iterate the list, and append the valid move to the results.\\n\\n    def generatePossibleNextMoves(self, s):\\n      \\n        if not s:\\n            return []\\n            \\n        res, i = [], 0\\n        while i < len(s)-1:\\n            if s[i:i+2] == \"++\":\\n                res.append(s[:i] + \"--\" + s[i+2:])\\n            i += 1\\n            \\n        return res"
		},
		{
			"lc_ans_id":"73924",
			"view":"505",
			"top":"9",
			"title":"Java concise solution.",
			"vote":"2",
			"content":"        \\n    public List<String> generatePossibleNextMoves(String s) {\\n        List<String> ret = new ArrayList<>();\\n        for (int i=0; i<s.length()-1; i++)\\n            if (s.substring(i,i+2).equals(\"++\"))\\n                ret.add(s.substring(0,i)+\"--\"+s.substring(i+2));\\n        return ret;\\n    }"
		}
	],
	"id":"293",
	"title":"Flip Game",
	"content":"<p>\r\nYou are playing the following Flip Game with your friend: Given a string that contains only these two characters: <code>+</code> and <code>-</code>, you and your friend take turns to flip two <b>consecutive</b> <code>\"++\"</code> into <code>\"--\"</code>. The game ends when a person can no longer make a move and therefore the other person will be the winner.\r\n</p>\r\n\r\n<p>\r\nWrite a function to compute all possible states of the string after one valid move.\r\n</p>\r\n\r\n<p>\r\nFor example, given <code>s = \"++++\"</code>, after one move, it may become one of the following states:\r\n<pre>[\r\n  \"--++\",\r\n  \"+--+\",\r\n  \"++--\"\r\n]\r\n</pre>\r\n</p>\r\n\r\n<p>\r\nIf there is no valid move, return an empty list <code>[]</code>.</p>",
	"frequency":"134",
	"ac_num":"30031"
}