{
	"difficulty":"2",
	"submit_num":"18109",
	"show_id":"439",
	"leetcode_id":"439",
	"answers":[
		{
			"lc_ans_id":"92166",
			"view":"7049",
			"top":"0",
			"title":"Very easy 1 pass Stack Solution in JAVA (NO STRING CONCAT)",
			"vote":"61",
			"content":"Iterate the expression from tail, whenever encounter a character before '?', calculate the right value and push back to stack.\\n\\nP.S. this code is guaranteed only if \"the given expression is valid\" base on the requirement.\\n\\n    public String parseTernary(String expression) {\\n        if (expression == null || expression.length() == 0) return \"\";\\n        Deque<Character> stack = new LinkedList<>();\\n\\n        for (int i = expression.length() - 1; i >= 0; i--) {\\n            char c = expression.charAt(i);\\n            if (!stack.isEmpty() && stack.peek() == '?') {\\n\\n                stack.pop(); //pop '?'\\n                char first = stack.pop();\\n                stack.pop(); //pop ':'\\n                char second = stack.pop();\\n\\n                if (c == 'T') stack.push(first);\\n                else stack.push(second);\\n            } else {\\n                stack.push(c);\\n            }\\n        }\\n\\n        return String.valueOf(stack.peek());\\n    }"
		},
		{
			"lc_ans_id":"92165",
			"view":"2181",
			"top":"1",
			"title":"5ms JAVA DFS Solution",
			"vote":"20",
			"content":"```\\npublic class Solution {\\n    public String parseTernary(String expression) {\\n        if(expression == null || expression.length() == 0){\\n            return expression;\\n        }\\n        char[] exp = expression.toCharArray();\\n        \\n        return DFS(exp, 0, exp.length - 1) + \"\";\\n        \\n    }\\n    public char DFS(char[] c, int start, int end){\\n        if(start == end){\\n            return c[start];\\n        }\\n        int count = 0, i =start;\\n        for(; i <= end; i++){\\n            if(c[i] == '?'){\\n                count ++;\\n            }else if (c[i] == ':'){\\n                count --;\\n                if(count == 0){\\n                    break;\\n                }\\n            }\\n        }\\n        return c[start] == 'T'? DFS(c, start + 2, i - 1) : DFS(c, i+1,end);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92164",
			"view":"2447",
			"top":"2",
			"title":"Easy and Concise 5-lines Python/Java Solution",
			"vote":"14",
			"content":"In order to pick out useful \"?\" and \":\", we can always begin with **the last \"?\" and the first \":\" after the chosen \"?\"**.\\n\\nTherefore, directly seek for the last \"?\" (or you can simply put all \"?\" into a stack) and update the string depending on T or F until no more \"?\"s.\\n\\ne.g. \\n\"(F ? 1 : (T ? 4 : 5))\" => \"(F ? 1 : 4)\" => \"4\"\\n\"(T ? (T ? F : 5) : 3)\" => \"(T ? F : 3)\" => \"F\"\\n\\n**EDIT:**\\nRemoved stack, added Java version.\\n\\n**Python**:\\n```\\nclass Solution(object):\\n    def parseTernary(self, expression):\\n        \"\"\"\\n        :type expression: str\\n        :rtype: str\\n        \"\"\"\\n        while len(expression) != 1:\\n            i = expression.rindex(\"?\")    # begin with the last '?'.\\n            tmp = expression[i+1] if expression[i-1] == 'T' else expression[i+3]\\n            expression = expression[:i-1] + tmp + expression[i+4:]\\n        return expression\\n```\\n\\n**Java** (It costs 7-lines):\\n```\\npublic class Solution {\\n    public String parseTernary(String expression) {\\n        while (expression.length() != 1) {\\n            int i = expression.lastIndexOf(\"?\");    // get the last shown '?'\\n            char tmp;\\n            if (expression.charAt(i-1) == 'T') { tmp = expression.charAt(i+1); }\\n            else { tmp = expression.charAt(i+3); }\\n            expression = expression.substring(0, i-1) + tmp + expression.substring(i+4);\\n        }\\n        return expression;\\n    }\\n}\\n\\n\\n```"
		},
		{
			"lc_ans_id":"92185",
			"view":"1160",
			"top":"3",
			"title":"Short Python solutions, one O(n)",
			"vote":"6",
			"content":"## O(n) with stack\\n\\nCollect chars from back to front on a stack, evaluate ternary sub-expressions as soon as possible:\\n\\n    def parseTernary(self, expression):\\n        stack = []\\n        for c in reversed(expression):\\n            stack.append(c)\\n            if stack[-2:-1] == ['?']:\\n                stack[-5:] = stack[-3 if stack[-1] == 'T' else -5]\\n        return stack[0]\\n\\nOriginally my check was `stack[-4::2] == [':', '?']`, but @YJL1228's [is right](https://discuss.leetcode.com/topic/64389/easy-concept-with-7-lines-python-solution), looking for `?` is enough.\\n\\n<br>\\n\\n## O(n<sup>2</sup>), several versions\\n\\nAlways evaluate/replace the last included ternary. So somewhat the same as the stack solution but only O(n<sup>2</sup>). Didn't think of that and instead went right for the stack solution, but now that I saw it from others, I just had to write a few ways myself :-)\\n\\nVersion just working on the string:\\n\\n    def parseTernary(self, s):\\n        while len(s) > 1:\\n            i = s.rfind('?') - 1\\n            s = s[:i] + s[i+2 if s[i] == 'T' else i+4] + s[i+5:]\\n        return s\\n\\nVersion working on a list version of the string because it can be modified (need to reverse it because lists can only tell the first occurrence, not the last):\\n\\n    def parseTernary(self, s):\\n        a = list(s)[::-1]\\n        while len(a) > 1:\\n            i = a.index('?') - 3\\n            a[i:i+5] = a[i+2 if a[i+4] == 'T' else i]\\n        return a[0]\\n\\nVersion using a regular expression (reversing the string because `sub` doesn't support replacing the last occurrence but does support replacing the first):\\n\\n    def parseTernary(self, s):\\n        s = s[::-1]\\n        while len(s) > 1:\\n            s = re.sub('(.):(.)\\\\?(.)', lambda m: m.group(1 + (m.group(3) == 'T')), s, 1)\\n        return s"
		},
		{
			"lc_ans_id":"92173",
			"view":"1249",
			"top":"4",
			"title":"Java O(n) using Binary Tree",
			"vote":"5",
			"content":"We can also use a stack to store the parent node.\\n```\\npublic class Solution {\\n    public String parseTernary(String expression) {\\n        if(expression == null || expression.length() == 0) return \"\";\\n        Node root = buildTree(expression.toCharArray());\\n        return evaluate(root) + \"\";\\n    }\\n    static class Node {\\n        char val;\\n        Node left;\\n        Node right;\\n        Node parent;\\n        \\n        public Node(char c) {\\n            val = c;\\n            left = null;\\n            right = null;\\n            parent = null;\\n        }\\n    }\\n    private static Node buildTree(char[] ch) {\\n        Node root = new Node(ch[0]);\\n        Node node = root;\\n        for(int i = 1; i < ch.length; i++) {\\n            if(ch[i] == '?') {\\n                Node left = new Node(ch[i + 1]);\\n                node.left = left;\\n                left.parent = node;\\n                node = node.left;\\n            }\\n            else if(ch[i] == ':') {\\n                node = node.parent;\\n                while(node.right != null && node.parent != null) {\\n                    node = node.parent;\\n                }\\n                Node right = new Node(ch[i + 1]);\\n                node.right = right;\\n                right.parent = node;\\n                node = node.right;\\n            }\\n        }\\n        return root;\\n    }\\n    \\n    private static char evaluate(Node root) {\\n        while(root.val == 'T' || root.val == 'F') {\\n            if(root.left == null && root.right == null) break;\\n            if(root.val == 'T') root = root.left;\\n            else root = root.right;\\n        }\\n        return root.val;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92171",
			"view":"154",
			"top":"5",
			"title":"[C++] Clean Code",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    string parseTernary(string e) {\\n        int i = 0;\\n        return parse(e, i);\\n    }\\nprivate:\\n    string parse(string& e, int& i) {\\n        int i0 = i;\\n        if (i + 1 < e.size() && e[i + 1] == '?') { // recursion case - only if e[i + 1] == '?'\\n            i += 2;\\n            string a = parse(e, i); // parse both to advance the iterator\\n            string b = parse(e, ++i);\\n            return e[i0] == 'T' ? a : b;\\n        }\\n        return e.substr(i++, 1); // parse digit or boolean result - just eat a bite\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"92239",
			"view":"432",
			"top":"6",
			"title":"Intuitive commented Java solution",
			"vote":"2",
			"content":"Any suggestion is greatly appreciated.\\n```\\n/*\\nSince the input is promised to be valid, life is much easier\\nUse a stack, check from the end of the string to the front.\\n\\nAs long as the next char is not '?', push it to the stack.\\nIf we see a '?', check the next char(left of '?' in the string), \\n    pop the top 3 elements from the stack.\\n    if the next char is T\\n        push the first element of the 3 elements back to stack\\n    else \\n        pusht the 3rd element of the 3 elements back to stack\\npop the only item left in the stack\\n*/\\n\\npublic class Solution {\\n    public String parseTernary(String expression) {\\n        if(expression == null || expression.length() == 0) return \"\";\\n        Stack<Character> s= new Stack<Character>();\\n        for(int i = expression.length() - 1; i > 0; i--){\\n            char element = expression.charAt(i);\\n            if(element != '?'){\\n                s.push(element);\\n            }else{\\n                char first = s.pop();\\n                s.pop();\\n                char second = s.pop();\\n                if(expression.charAt(i-1) == 'T'){\\n                    s.push(first);\\n                }else{\\n                    s.push(second);\\n                }\\n                i--;\\n            }\\n        }\\n        return \"\"+s.pop();\\n    }\\n}````"
		},
		{
			"lc_ans_id":"92240",
			"view":"722",
			"top":"7",
			"title":"5ms C++ Fast Solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    string parseTernary(string& expression, int begin = 0) {\\n        if (begin >= expression.size()) return \"\";\\n        if (begin == expression.size() - 1 || expression[begin + 1] == ':') return expression.substr(begin, 1);\\n        if (expression[begin] == 'T') return parseTernary(expression, begin + 2);\\n        int level = 1, i = begin + 2;\\n        for (; i < expression.size() && level; i++) {\\n            if (expression[i] == '?') level++;\\n            else if (expression[i] == ':') level--;\\n        }\\n        return parseTernary(expression, i);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"92177",
			"view":"100",
			"top":"8",
			"title":"Easy understand recursion solution in Java.",
			"vote":"1",
			"content":"public static String parseTernary(String expression) {\\n        if(!expression.contains(\":\")) return expression;\\n        char c = expression.charAt(0);\\n        int i = 2;\\n        int count = 1;\\n        while (true ){\\n            if(expression.charAt(i) == '?') count++;\\n            else if(expression.charAt(i) == ':') count--;\\n            if(count == 0) break;\\n            i++;\\n        }\\n        if(c == 'T') return parseTernary(expression.substring(2,i));\\n        else return parseTernary(expression.substring(i+1,expression.length()));\\n    }"
		},
		{
			"lc_ans_id":"92212",
			"view":"151",
			"top":"9",
			"title":"Python O(n) DFS",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def parseTernary(self, expression):\\n        \"\"\"\\n        :type expression: str\\n        :rtype: str\\n        \"\"\"\\n        stack = []\\n        d = {}\\n        for i in xrange(0, len(expression)):\\n            if expression[i] == \"?\":\\n                stack.append((\"?\", i))\\n            elif expression[i] == \":\":\\n                _, pos = stack.pop()\\n                d[pos] = i\\n\\n        def dfs(expr, start, end, d):\\n            if end - start + 1 < 5:\\n                return expr[start:end+1]\\n            iSep = d[start + 1]\\n            stmt = expr[start]\\n            return dfs(expr, start + 2, iSep - 1, d) if stmt == \"T\" else dfs(expr, iSep + 1, end, d)\\n        return dfs(expression, 0, len(expression), d)\\n```"
		}
	],
	"id":"433",
	"title":"Ternary Expression Parser",
	"content":"<p>Given a string representing arbitrarily nested ternary expressions, calculate the result of the expression. You can always assume that the given expression is valid and only consists of digits <code>0-9</code>, <code>?</code>, <code>:</code>, <code>T</code> and <code>F</code> (<code>T</code> and <code>F</code> represent True and False respectively).\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>The length of the given string is &le; 10000.</li>\r\n<li>Each number will contain only one digit.</li>\r\n<li>The conditional expressions group right-to-left (as usual in most languages).</li>\r\n<li>The condition will always be either <code>T</code> or <code>F</code>. That is, the condition will never be a digit.</li>\r\n<li>The result of the expression will always evaluate to either a digit <code>0-9</code>, <code>T</code> or <code>F</code>.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\n<b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> \"T?2:3\"\r\n\r\n<b>Output:</b> \"2\"\r\n\r\n<b>Explanation:</b> If true, then result is 2; otherwise result is 3.\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> \"F?1:T?4:5\"\r\n\r\n<b>Output:</b> \"4\"\r\n\r\n<b>Explanation:</b> The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:\r\n\r\n             \"(F ? 1 : (T ? 4 : 5))\"                   \"(F ? 1 : (T ? 4 : 5))\"\r\n          -> \"(F ? 1 : 4)\"                 or       -> \"(T ? 4 : 5)\"\r\n          -> \"4\"                                    -> \"4\"\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Example 3:</b>\r\n<pre>\r\n<b>Input:</b> \"T?T?F:5:3\"\r\n\r\n<b>Output:</b> \"F\"\r\n\r\n<b>Explanation:</b> The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:\r\n\r\n             \"(T ? (T ? F : 5) : 3)\"                   \"(T ? (T ? F : 5) : 3)\"\r\n          -> \"(T ? F : 3)\"                 or       -> \"(T ? F : 5)\"\r\n          -> \"F\"                                    -> \"F\"\r\n</pre>\r\n</p>",
	"frequency":"117",
	"ac_num":"9301"
}