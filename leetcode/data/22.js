{
	"difficulty":"2",
	"submit_num":"401763",
	"show_id":"22",
	"leetcode_id":"22",
	"answers":[
		{
			"lc_ans_id":"10100",
			"view":"57121",
			"top":"0",
			"title":"Easy to understand Java backtracking solution",
			"vote":"285",
			"content":"     public List<String> generateParenthesis(int n) {\\n            List<String> list = new ArrayList<String>();\\n            backtrack(list, \"\", 0, 0, n);\\n            return list;\\n        }\\n        \\n        public void backtrack(List<String> list, String str, int open, int close, int max){\\n            \\n            if(str.length() == max*2){\\n                list.add(str);\\n                return;\\n            }\\n            \\n            if(open < max)\\n                backtrack(list, str+\"(\", open+1, close, max);\\n            if(close < open)\\n                backtrack(list, str+\")\", open, close+1, max);\\n        }\\n\\nThe idea here is to only add '(' and ')' that we know will guarantee us a solution (instead of adding 1 too many close). Once we add a '(' we will then discard it and try a ')' which can only close a valid '('. Each of these steps are recursively called."
		},
		{
			"lc_ans_id":"10105",
			"view":"34811",
			"top":"1",
			"title":"Concise recursive C++ solution",
			"vote":"198",
			"content":"The idea is intuitive. Use two integers to count the remaining left parenthesis (n) and the right parenthesis (m) to be added. At each function call add a left parenthesis if n >0 and add a right parenthesis if m>0. Append the result and terminate recursive calls when both m and n are zero.\\n\\n    class Solution {\\n    public:\\n        vector<string> generateParenthesis(int n) {\\n            vector<string> res;\\n            addingpar(res, \"\", n, 0);\\n            return res;\\n        }\\n        void addingpar(vector<string> &v, string str, int n, int m){\\n            if(n==0 && m==0) {\\n                v.push_back(str);\\n                return;\\n            }\\n            if(m > 0){ addingpar(v, str+\")\", n, m-1); }\\n            if(n > 0){ addingpar(v, str+\"(\", n-1, m+1); }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"10127",
			"view":"24769",
			"top":"2",
			"title":"An iterative method.",
			"vote":"167",
			"content":"My method is DP. First consider how to get the result f(n) from previous result f(0)...f(n-1).\\nActually, the result f(n) will be put an extra () pair to f(n-1). Let the \"(\" always at the first position, to produce a valid result, we can only put \")\" in a way that there will be i pairs () inside the extra () and n - 1 - i pairs () outside the extra pair.\\n\\nLet us consider an example to get clear view:\\n\\nf(0):  \"\"\\n\\nf(1):  \"(\"f(0)\")\"\\n\\nf(2): \"(\"f(0)\")\"f(1), \"(\"f(1)\")\"\\n\\nf(3): \"(\"f(0)\")\"f(2), \"(\"f(1)\")\"f(1), \"(\"f(2)\")\"\\n\\nSo f(n) = \"(\"f(0)\")\"f(n-1) , \"(\"f(1)\")\"f(n-2) \"(\"f(2)\")\"f(n-3) ... \"(\"f(i)\")\"f(n-1-i) ... \"(f(n-1)\")\"\\n\\nBelow is my code:\\n\\n    public class Solution\\n    {\\n        public List<String> generateParenthesis(int n)\\n        {\\n            List<List<String>> lists = new ArrayList<>();\\n            lists.add(Collections.singletonList(\"\"));\\n            \\n            for (int i = 1; i <= n; ++i)\\n            {\\n                final List<String> list = new ArrayList<>();\\n                \\n                for (int j = 0; j < i; ++j)\\n                {\\n                    for (final String first : lists.get(j))\\n                    {\\n                        for (final String second : lists.get(i - 1 - j))\\n                        {\\n                            list.add(\"(\" + first + \")\" + second);\\n                        }\\n                    }\\n                }\\n                \\n                lists.add(list);\\n            }\\n            \\n            return lists.get(lists.size() - 1);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"10096",
			"view":"18179",
			"top":"3",
			"title":"4-7 lines Python",
			"vote":"100",
			"content":"`p` is the parenthesis-string built so far, `left` and `right` tell the number of left and right parentheses still to add, and `parens` collects the parentheses.\\n\\n**Solution 1**\\n\\nI used a few \"tricks\"... how many can you find? :-)\\n\\n    def generateParenthesis(self, n):\\n        def generate(p, left, right, parens=[]):\\n            if left:         generate(p + '(', left-1, right)\\n            if right > left: generate(p + ')', left, right-1)\\n            if not right:    parens += p,\\n            return parens\\n        return generate('', n, n)\\n\\n**Solution 2**\\n\\nHere I wrote an actual Python generator. I allow myself to put the `yield q` at the end of the line because it's not that bad and because in \"real life\" I use Python 3 where I just say `yield from generate(...)`.\\n\\n    def generateParenthesis(self, n):\\n        def generate(p, left, right):\\n            if right >= left >= 0:\\n                if not right:\\n                    yield p\\n                for q in generate(p + '(', left-1, right): yield q\\n                for q in generate(p + ')', left, right-1): yield q\\n        return list(generate('', n, n))\\n\\n**Solution 3**\\n\\nImproved version of [this](https://leetcode.com/discuss/25725/7-lines-in-python-44-ms). Parameter `open` tells the number of \"already opened\" parentheses, and I continue the recursion as long as I still have to open parentheses (`n > 0`) and I haven't made a mistake yet (`open >= 0`).\\n\\n    def generateParenthesis(self, n, open=0):\\n        if n > 0 <= open:\\n            return ['(' + p for p in self.generateParenthesis(n-1, open+1)] + \\\\\\n                   [')' + p for p in self.generateParenthesis(n, open-1)]\\n        return [')' * open] * (not n)"
		},
		{
			"lc_ans_id":"10098",
			"view":"15541",
			"top":"4",
			"title":"Java DFS way solution",
			"vote":"42",
			"content":"    public List<String> generateParenthesis(int n) {\\n        List<String> list = new ArrayList<String>();\\n        generateOneByOne(\"\", list, n, n);\\n        return list;\\n    }\\n    public void generateOneByOne(String sublist, List<String> list, int left, int right){\\n        if(left > right){\\n            return;\\n        }\\n        if(left > 0){\\n            generateOneByOne( sublist + \"(\" , list, left-1, right);\\n        }\\n        if(right > 0){\\n            generateOneByOne( sublist + \")\" , list, left, right-1);\\n        }\\n        if(left == 0 && right == 0){\\n            list.add(sublist);\\n            return;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"10337",
			"view":"6798",
			"top":"5",
			"title":"My accepted JAVA solution",
			"vote":"31",
			"content":"For 2, it should place one \"()\" and add another one insert it but none tail it,\\n\\n'(' f(1) ')' f(0)\\n\\nor add none insert it but tail it by another one,\\n\\n'(' f(0) ')' f(1)\\n\\nThus for n,  we can insert f(i) and tail f(j) and i+j=n-1,\\n\\n'(' f(i) ')' f(j)              \\n\\n\\n\\n\\tpublic List<String> generateParenthesis(int n) {\\n\\t\\tList<String> result = new ArrayList<String>();\\n\\t\\tif (n == 0) {\\n\\t\\t\\tresult.add(\"\");\\n\\t\\t} else {\\n\\t\\t\\tfor (int i = n - 1; i >= 0; i--) {\\n\\t\\t\\t\\tList<String> insertSub = generateParenthesis(i);\\n\\t\\t\\t\\tList<String> tailSub = generateParenthesis(n - 1 - i);\\n\\t\\t\\t\\tfor (String insert : insertSub) {\\n\\t\\t\\t\\t\\tfor (String tail : tailSub) {\\n\\t\\t\\t\\t\\t\\tresult.add(\"(\" + insert + \")\" + tail);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn result;\\n\\t}"
		},
		{
			"lc_ans_id":"10110",
			"view":"3204",
			"top":"6",
			"title":"Simple Python DFS solution with explanation",
			"vote":"28",
			"content":"If you have two stacks, one for n \"(\", the other for n \")\", you generate a binary tree from these two stacks of left/right parentheses to form an output string. \\n\\n\\nThis means that whenever you traverse deeper, you pop one parentheses from one of stacks. When two stacks are empty, you form an output string.\\n\\nHow to form a legal string? Here is the simple observation:\\n\\n - For the output string to be right, stack of \")\" most be larger than stack of \"(\". If not, it creates string like \"())\"\\n - Since elements in each of stack are the same, we can simply express them with a number. For example, left = 3 is like a stacks [\"(\", \"(\", \"(\"]\\n\\nSo, here is my sample code in Python:\\n\\n    class Solution:\\n    # @param {integer} n\\n    # @return {string[]}\\n    def generateParenthesis(self, n):\\n        if not n:\\n            return []\\n        left, right, ans = n, n, []\\n        self.dfs(left,right, ans, \"\")\\n        return ans\\n\\n    def dfs(self, left, right, ans, string):\\n        if right < left:\\n            return\\n        if not left and not right:\\n            ans.append(string)\\n            return\\n        if left:\\n            self.dfs(left-1, right, ans, string + \"(\")\\n        if right:\\n            self.dfs(left, right-1, ans, string + \")\")"
		},
		{
			"lc_ans_id":"10367",
			"view":"3532",
			"top":"7",
			"title":"Simple 2ms c++ solution with explanation",
			"vote":"25",
			"content":"class Solution {\\npublic:\\n\\n    vector<string> result;\\n    vector<string> generateParenthesis(int n) {\\n        helper(\"\", n, 0);\\n        return result;\\n    }\\n\\n    /*  this hepler function insert result strings to \"vector<string> result\"\\n   \\t\\tWhen number of '(' less than \"n\", can append '(';\\n   \\t\\tWhen number of '(' is more than number of ')', can append ')';\\n\\n    \\tstring s : current string;\\n    \\tint leftpare_need : number of '(' that have not put into \"string s\";\\n    \\tint moreleft : number of '(' minus number of ')' in the \"string s\";\\n    */\\n\\n    void helper(string s, int leftpare_need, int moreleft)\\n    {\\n    \\tif(leftpare_need == 0 && moreleft == 0)\\n    \\t{\\n    \\t    result.push_back(s);\\n    \\t    return;\\n    \\t}\\n    \\tif(leftpare_need > 0)\\n    \\t\\thelper(s + \"(\", leftpare_need - 1, moreleft+1);\\n    \\tif(moreleft > 0)\\n    \\t\\thelper(s + \")\", leftpare_need, moreleft - 1);\\n    }\\n};"
		},
		{
			"lc_ans_id":"10269",
			"view":"2846",
			"top":"8",
			"title":"2ms AC JAVA Solution using recursive call",
			"vote":"20",
			"content":"    public class Solution {\\n        public List<String> generateParenthesis(int n) {\\n            ArrayList<String> m=new ArrayList<>();\\n            generate(m, \"\", n, n);\\n            return m;\\n        }\\n        public void generate(ArrayList m, String s, int l, int r){\\n            if(l==0 && r==0){ \\n                m.add(s);\\n                return;\\n            }\\n            if(l>0) generate(m, s+\"(\",  l-1,  r);\\n            if(r>l) generate(m, s+\")\",  l,  r-1);\\n        }\\n        \\n        \\n    }"
		},
		{
			"lc_ans_id":"10136",
			"view":"3884",
			"top":"9",
			"title":"Easy java solution",
			"vote":"18",
			"content":"    public class Solution {\\n    private void helper(List<String> res, String present, int left, int right) {\\n        if (right == 0) {\\n            res.add(present);\\n        }\\n        if (left > 0) {\\n            helper(res, present + \"(\", left - 1, right);\\n        }\\n        if (right > left) {\\n            helper(res, present + \")\", left, right - 1);\\n        }\\n    }\\n    public List<String> generateParenthesis(int n) {\\n        List<String> res = new ArrayList<String>();\\n        if (n == 0) {\\n            return res;\\n        }\\n        helper(res, \"\", n, n);\\n        return res;\\n    }\\n}"
		}
	],
	"id":"22",
	"title":"Generate Parentheses",
	"content":"<p>\r\nGiven <i>n</i> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\r\n</p>\r\n\r\n<p>\r\nFor example, given <i>n</i> = 3, a solution set is:\r\n</p>\r\n<pre>\r\n[\r\n  \"((()))\",\r\n  \"(()())\",\r\n  \"(())()\",\r\n  \"()(())\",\r\n  \"()()()\"\r\n]\r\n</pre>",
	"frequency":"549",
	"ac_num":"189443"
}