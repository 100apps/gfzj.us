{
	"difficulty":"2",
	"submit_num":"21918",
	"show_id":"536",
	"leetcode_id":"536",
	"answers":[
		{
			"lc_ans_id":"100355",
			"view":"7371",
			"top":"0",
			"title":"Java Recursive Solution",
			"vote":"29",
			"content":"```\\npublic TreeNode str2tree(String s) {\\n    if (s == null || s.length() == 0) return null;\\n    int firstParen = s.indexOf(\"(\");\\n    int val = firstParen == -1 ? Integer.parseInt(s) : Integer.parseInt(s.substring(0, firstParen));\\n    TreeNode cur = new TreeNode(val);\\n    if (firstParen == -1) return cur;\\n    int start = firstParen, leftParenCount = 0;\\n    for (int i=start;i<s.length();i++) {\\n        if (s.charAt(i) == '(') leftParenCount++;\\n        else if (s.charAt(i) == ')') leftParenCount--;\\n        if (leftParenCount == 0 && start == firstParen) {cur.left = str2tree(s.substring(start+1,i)); start = i+1;}\\n        else if (leftParenCount == 0) cur.right = str2tree(s.substring(start+1,i));\\n    }\\n    return cur;\\n}\\n```"
		},
		{
			"lc_ans_id":"100359",
			"view":"4297",
			"top":"1",
			"title":"Java stack solution",
			"vote":"16",
			"content":"```\\npublic class Solution {\\n    public TreeNode str2tree(String s) {\\n        Stack<TreeNode> stack = new Stack<>();\\n        for(int i = 0, j = i; i < s.length(); i++, j = i){\\n            char c = s.charAt(i);\\n            if(c == ')')    stack.pop();\\n            else if(c >= '0' && c <= '9' || c == '-'){\\n                while(i + 1 < s.length() && s.charAt(i + 1) >= '0' && s.charAt(i + 1) <= '9') i++;\\n                TreeNode currentNode = new TreeNode(Integer.valueOf(s.substring(j, i + 1)));\\n                if(!stack.isEmpty()){\\n                    TreeNode parent = stack.peek();\\n                    if(parent.left != null)    parent.right = currentNode;\\n                    else parent.left = currentNode;\\n                }\\n                stack.push(currentNode);\\n            }\\n        }\\n        return stack.isEmpty() ? null : stack.peek();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100357",
			"view":"2573",
			"top":"2",
			"title":"Verbose Java Solution, Recursion",
			"vote":"13",
			"content":"```\\npublic class Solution {\\n    public TreeNode str2tree(String s) {\\n        // Base case\\n        if (s.length() == 0) return null;\\n        \\n        // Create root\\n        int i = 0, j = 0;\\n        while (j < s.length() && (Character.isDigit(s.charAt(j)) || s.charAt(j) == '-')) j++;\\n        TreeNode root = new TreeNode(Integer.parseInt(s.substring(i, j)));\\n        \\n        // Left child\\n        if (j < s.length()) {\\n            i = j;\\n            int count = 1;\\n            while (j + 1 < s.length() && count != 0) {\\n                j++;\\n                if (s.charAt(j) == ')') count--;\\n                if (s.charAt(j) == '(') count++;\\n            }\\n            root.left = str2tree(s.substring(i + 1, j));\\n        }\\n        \\n        j++;\\n        // Right child\\n        if (j < s.length()) {\\n            root.right = str2tree(s.substring(j + 1, s.length() - 1));\\n        }\\n        \\n        return root;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100404",
			"view":"1282",
			"top":"3",
			"title":"Python hack",
			"vote":"11",
			"content":"I change a string like `'4(2(3)(1))(6(5))'` to `'t(4,t(2,t(3),t(1)),t(6,t(5)))'` and then just let Python evaluate that (with the help of my TreeNode constructor).\\n\\n    def str2tree(self, s):\\n        def t(val, left=None, right=None):\\n            node, node.left, node.right = TreeNode(val), left, right\\n            return node\\n        return eval('t(' + s.replace('(', ',t(') + ')') if s else None"
		},
		{
			"lc_ans_id":"100422",
			"view":"794",
			"top":"4",
			"title":"Python, Straightforward with Explanation",
			"vote":"9",
			"content":"We perform a recursive solution.  There are four cases for what the string might look like:\\n1. empty\\n2. [integer] \\n3. [integer] ( [tree] ) \\n4. [integer] ( [tree] ) ( [tree] )\\n\\nWhen there is no '(', we are in one of the first two cases and proceed appropriately.\\nElse, we find the index \"jx\" of the ')' character that marks the end of the first tree.  We do this by keeping a tally of how many left brackets minus right brackets we've seen.  When we've seen 0, we must be at the end of the first tree.  The second tree is going to be the expression S[jx + 2: -1], which might be empty if we are in case #3.\\n\\n```\\ndef str2tree(self, S):\\n    ix = S.find('(')\\n    if ix < 0:\\n        return TreeNode(int(S)) if S else None\\n        \\n    bal = 0\\n    for jx, u in enumerate(S):\\n        if u == '(': bal += 1\\n        if u == ')': bal -= 1\\n        if jx > ix and bal == 0:\\n            break\\n\\n    root = TreeNode(int(S[:ix]))\\n    root.left = self.str2tree(S[ix+1:jx])\\n    root.right = self.str2tree(S[jx+2:-1])\\n    return root\\n```"
		},
		{
			"lc_ans_id":"100378",
			"view":"951",
			"top":"5",
			"title":"[C++] Clean Code",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    TreeNode* str2tree(string s) {\\n        int i = 0;\\n        return s.size() == 0 ? nullptr : build(s, i);\\n    }\\n\\nprivate:\\n    TreeNode* build(string& s, int& i) {\\n        int start = i;\\n        if (s[i] == '-') {\\n            i++;\\n        }\\n        while (isdigit(s[i])) {\\n            i++;\\n        }\\n        \\n        int num = stoi(s.substr(start, i - start));\\n        TreeNode* node = new TreeNode(num);\\n        if (s[i] == '(') {\\n            node->left = build(s, ++i);\\n            i++;    // )\\n        }\\n        if (s[i] == '(') {\\n            node->right = build(s, ++i);\\n            i++;    // )\\n        }\\n        return node;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100372",
			"view":"188",
			"top":"6",
			"title":"Java Recursive beats 90%, like solving Post-order DFS problems, with explanations.",
			"vote":"3",
			"content":"Since the problem guarantees that the input string is always syntactically valid, so we don't need to take care of the possible invalid scenarios, like \"4)(1)\", which needs us to raise exceptions, i.e. ValueError. \\nPosted below is a one-pass solution, we use the index \"i\" to track the position of current char of the string. The \"i\" is initially set to 0.\\nJust like the Post-order DFS tree traversal problem,\\nwhen we meet '(', it means there's a new child to add. So we create a new stack by using recursion. When we meet ')' following numbers or i == s.length(), it means we need to return the current stack. Remember that a node can have at most two children, so when left node returned, we need to look for the next '(' to add the right node. \\n\\nReading the code might be easier for you to understand, \\n```\\npublic class Solution {\\n    private int i = 0; // make i global\\n    public TreeNode str2tree(String s) {\\n        if (s.equals(\"\"))    return null;\\n        return dfs(s);\\n    }\\n    \\n    private TreeNode dfs(String s){\\n        TreeNode root = null;\\n        if (s.charAt(i) != '(') {\\n            root = new TreeNode(getIntVal(s));\\n        }\\n        \\n        TreeNode leftNode = null, rightNode = null;\\n        if (i < s.length() && s.charAt(i) == '(') { // for the possible leftNode, if '(' met.\\n            i++;\\n            leftNode = dfs(s);\\n        }\\n        if (i < s.length() && s.charAt(i) == '(') { // for the possible rightNode, if '(' met.\\n            i++;\\n            rightNode = dfs(s);\\n        }\\n        // if not '(' it must be ')' or i==s.length()\\n        // so we return the current stack\\n        root.left = leftNode;\\n        root.right = rightNode;\\n        i++;\\n        return root;\\n    }\\n    \\n    private int getIntVal(String s) {\\n        StringBuilder sb = new StringBuilder();\\n        while (i < s.length()) {\\n            if (s.charAt(i) == '(' || s.charAt(i) == ')')\\n                    break;\\n            sb.append(s.charAt(i));\\n            i++;\\n        }\\n        int val = Integer.valueOf(sb.toString());\\n        return val;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100387",
			"view":"191",
			"top":"7",
			"title":"C++ stack solution",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    TreeNode* str2tree(string s) {\\n        stack<TreeNode*> stk;\\n        for (int i = 0, sz = s.size(); i < sz; ++i) {\\n            char ch = s[i];\\n            if ( ch == '(') continue;\\n            \\n            if (isdigit(ch) || ch == '-') {\\n                int v = 0, sig = 1;\\n                if (ch == '-') { sig = -1; ++i;}\\n                while (i < sz && isdigit(s[i])) {\\n                    v = v * 10 + s[i++] - '0';\\n                }\\n                stk.emplace(new TreeNode(v*sig)); --i;\\n            } else { // ')'\\n                TreeNode *t = stk.top(); stk.pop(); // child\\n                TreeNode *p = stk.top();            // parent    \\n                !p->left ? p->left = t : p->right = t;\\n            }\\n        }\\n        return stk.empty() ? nullptr:stk.top();\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100409",
			"view":"908",
			"top":"8",
			"title":"Short O(N) solution",
			"vote":"3",
			"content":"This is a pretty common approach with static index variable.\\n```\\nlet i = 0;\\n\\nvar construct = function (s) {\\n    let numStr = [];\\n\\n    while (s[i] === '-' || s[i] >= '0' && s[i] <= '9')\\n        numStr.push(s[i++]);\\n\\n    if (numStr.length === 0)\\n        return null;\\n\\n    let node = new TreeNode(Number(numStr.join('')));\\n    if (s[i] === '(')\\n        i++, node.left = construct(s), i++;\\n    if (s[i] === '(')\\n        i++, node.right = construct(s), i++;\\n    return node;\\n}\\n\\nvar str2tree = function(s) {\\n    i = 0;\\n    return construct(s);\\n};\\n```"
		},
		{
			"lc_ans_id":"100412",
			"view":"353",
			"top":"9",
			"title":"Easy Understand and Clear Java Solution with explanation",
			"vote":"2",
			"content":"Very Easy understand Solution from shawloatrchen's thought.\\n* split string to three substring to ```List<String>```\\n  1. ```root.val```\\n  2. left subtree\\n  3. right subtree if have\\n\\nFinally, do recursive. ^_^\\n```\\npublic TreeNode str2tree(String s) {\\n        if (s == null || s.length() == 0) return null;\\n        List<String> temp = findChildren(s);\\n        int len = temp.size(); \\n        // 1 -> root \\n        // 2 -> root + left \\n        // 3 -> root + left + right\\n        TreeNode root = null;\\n\\n        if (len > 0) root = new TreeNode(Integer.parseInt(temp.get(0)));\\n        if (len > 1) root.left = str2tree(temp.get(1));\\n        if (len > 2) root.right = str2tree(temp.get(2));\\n        return root;\\n    }\\n    private List<String> findChildren(String s) {\\n        List<String> res = new ArrayList<>();\\n        int isNeg = 1, count = 0, start = 0, num = 0;\\n        \\n        for (int i = 0; i < s.length(); i++) {\\n            char c = s.charAt(i);\\n            if (c == '(') {\\n                if (count++ == 0) start = i;\\n                    if (res.size() == 0) res.add(isNeg * num + \"\");\\n            } else if (c == ')') {\\n                if (--count == 0) res.add(s.substring(start + 1, i));\\n            } else if (c == '-') {\\n                isNeg = -1;\\n            } else {\\n                num = num * 10 + c - '0';\\n            }\\n        }\\n        if (res.isEmpty()) res.add(isNeg * num + \"\");\\n        return res;\\n    }\\n```"
		}
	],
	"id":"520",
	"title":"Construct Binary Tree from String",
	"content":"<p>You need to construct a binary tree from a string consisting of parenthesis and integers. </p>\r\n\r\n<p>The whole input represents a binary tree. It contains an integer followed by zero, one or two pairs of parenthesis. The integer represents the root's value and a pair of parenthesis contains a child binary tree with the same structure. </p>\r\n\r\n<p>You always start to construct the <b>left</b> child node of the parent first if it exists.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> \"4(2(3)(1))(6(5))\"\r\n<b>Output:</b> return the tree root node representing the following tree:\r\n\r\n       4\r\n     /   \\\r\n    2     6\r\n   / \\   / \r\n  3   1 5   \r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>There will only be <code>'('</code>,  <code>')'</code>,  <code>'-'</code> and  <code>'0'</code> ~ <code>'9'</code> in the input string.</li>\r\n<li>An empty tree is represented by <code>\"\"</code> instead of <code>\"()\"</code>.</li>\r\n</ol>\r\n</p>",
	"frequency":"38",
	"ac_num":"9415"
}