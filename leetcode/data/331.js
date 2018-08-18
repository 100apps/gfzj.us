{
	"difficulty":"2",
	"submit_num":"115644",
	"show_id":"331",
	"leetcode_id":"331",
	"answers":[
		{
			"lc_ans_id":"78551",
			"view":"30615",
			"top":"0",
			"title":"7 lines Easy Java Solution",
			"vote":"357",
			"content":"Some used stack. Some used the depth of a stack. Here I use a different perspective. In a binary tree, if we consider null as leaves, then\\n\\n* all non-null node provides 2 outdegree and 1 indegree (2 children and 1 parent), except root\\n* all null node provides 0 outdegree and 1 indegree (0 child and 1 parent).\\n\\nSuppose we try to build this tree. During building, we record the difference between out degree and in degree `diff` = `outdegree - indegree`. When the next node comes, we then decrease `diff` by 1, because the node provides an in degree. If the node is not `null`, we increase diff by `2`, because it provides two out degrees. If a serialization is correct, diff should never be negative and diff will be zero when finished.\\n\\n\\n    public boolean isValidSerialization(String preorder) {\\n        String[] nodes = preorder.split(\",\");\\n        int diff = 1;\\n        for (String node: nodes) {\\n            if (--diff < 0) return false;\\n            if (!node.equals(\"#\")) diff += 2;\\n        }\\n        return diff == 0;\\n    }"
		},
		{
			"lc_ans_id":"78566",
			"view":"12646",
			"top":"1",
			"title":"Java intuitive 22ms solution with stack",
			"vote":"68",
			"content":"See detailed comments below. Time complexity is O(n), space is also O(n) for the stack.\\n\\n    public class Solution {\\n        public boolean isValidSerialization(String preorder) {\\n            // using a stack, scan left to right\\n            // case 1: we see a number, just push it to the stack\\n            // case 2: we see #, check if the top of stack is also #\\n            // if so, pop #, pop the number in a while loop, until top of stack is not #\\n            // if not, push it to stack\\n            // in the end, check if stack size is 1, and stack top is #\\n            if (preorder == null) {\\n                return false;\\n            }\\n            Stack<String> st = new Stack<>();\\n            String[] strs = preorder.split(\",\");\\n            for (int pos = 0; pos < strs.length; pos++) {\\n                String curr = strs[pos];\\n                while (curr.equals(\"#\") && !st.isEmpty() && st.peek().equals(curr)) {\\n                    st.pop();\\n                    if (st.isEmpty()) {\\n                        return false;\\n                    }\\n                    st.pop();\\n                }\\n                st.push(curr);\\n            }\\n            return st.size() == 1 && st.peek().equals(\"#\");\\n        }\\n    }"
		},
		{
			"lc_ans_id":"78552",
			"view":"6936",
			"top":"2",
			"title":"JAVA, Counting Indegree and Outdegree, SIMPLE & CLEAR!",
			"vote":"53",
			"content":"     public boolean isValidSerialization(String preorder) {\\n        String[] strs = preorder.split(\",\");\\n        int degree = -1;         // root has no indegree, for compensate init with -1\\n        for (String str: strs) {\\n            degree++;             // all nodes have 1 indegree (root compensated)\\n            if (degree > 0) {     // total degree should never exceeds 0\\n                return false;\\n            }      \\n            if (!str.equals(\"#\")) {// only non-leaf node has 2 outdegree\\n                degree -= 2;\\n            }  \\n        }\\n        return degree == 0;\\n    }"
		},
		{
			"lc_ans_id":"78564",
			"view":"4154",
			"top":"3",
			"title":"The simplest python solution with explanation (no stack, no recursion)",
			"vote":"49",
			"content":"We just need to remember how many empty slots we have during the process. \\n\\nInitially we have one ( for the root ). \\n\\nfor each node we check if we still have empty slots to put it in. \\n\\n - a null node occupies one slot.\\n - a non-null node occupies one slot before he creates two more. the net gain is one. \\n\\n----------\\n    class Solution(object):\\n        def isValidSerialization(self, preorder):\\n            \"\"\"\\n            :type preorder: str\\n            :rtype: bool\\n            \"\"\"\\n            # remember how many empty slots we have\\n            # non-null nodes occupy one slot but create two new slots\\n            # null nodes occupy one slot\\n            \\n            p = preorder.split(',')\\n            \\n            #initially we have one empty slot to put the root in it\\n            slot = 1\\n            for node in p:\\n                \\n                # no empty slot to put the current node\\n                if slot == 0:\\n                    return False\\n                    \\n                # a null node?\\n                if node == '#':\\n                    # ocuppy slot\\n                    slot -= 1\\n                else:\\n                    # create new slot\\n                    slot += 1\\n            \\n            #we don't allow empty slots at the end\\n            return slot==0"
		},
		{
			"lc_ans_id":"78560",
			"view":"5893",
			"top":"4",
			"title":"Simple Python solution using stack. With Explanation.",
			"vote":"36",
			"content":"This is very simple problem if you use stacks. The key here is, when you see two consecutive \"#\" characters on stack, pop both of them and replace the topmost element on the stack with \"#\". For example,\\n\\npreorder = 1,2,3,#,#,#,#\\n\\nPass 1:  stack = [1]\\n\\nPass 2: stack = [1,2]\\n\\nPass 3: stack = [1,2,3]\\n\\nPass 4: stack = [1,2,3,#]\\n\\nPass 5: stack = [1,2,3,#,#] -> two #s on top so pop them and replace top with #. -> stack = [1,2,#]\\n\\nPass 6: stack = [1,2,#,#] -> two #s on top so pop them and replace top with #. -> stack = [1,#]\\n\\nPass 7: stack = [1,#,#] -> two #s on top so pop them and replace top with #. -> stack = [#]\\n\\nIf there is only one # on stack at the end of the string then return True else return False.\\n\\nHere is the code for that,\\n\\n    class Solution(object):\\n    def isValidSerialization(self, preorder):\\n        \"\"\"\\n        :type preorder: str\\n        :rtype: bool\\n        \"\"\"\\n        stack = []\\n        top = -1\\n        preorder = preorder.split(',')\\n        for s in preorder:\\n            stack.append(s)\\n            top += 1\\n            while(self.endsWithTwoHashes(stack,top)):\\n                h = stack.pop()\\n                top -= 1\\n                h = stack.pop()\\n                top -= 1\\n                if top < 0:\\n                    return False\\n                h = stack.pop()\\n                stack.append('#')\\n            #print stack\\n        if len(stack) == 1:\\n            if stack[0] == '#':\\n                return True\\n        return False\\n    \\n    def endsWithTwoHashes(self,stack,top):\\n        if top<1:\\n            return False\\n        if stack[top]=='#' and stack[top-1]=='#':\\n            return True\\n        return False"
		},
		{
			"lc_ans_id":"78554",
			"view":"2836",
			"top":"5",
			"title":"C++ 4ms solution, O(1) space, O(n) time",
			"vote":"25",
			"content":"The capacity is the number of node that can be put in the tree. The initial value is 1, which means there can be a root.\\n\\nWhen adding a node, capacity--;\\n\\nWhen adding  a non-NULL node, it means we obtains two more leafs, then capacity +=2.\\n\\nThe final capacity should be equal to 0\\n\\n\\n    class Solution {\\n    public:\\n    bool isValidSerialization(string preorder) {\\n        if (preorder.empty()) return false;\\n        preorder+=',';\\n        int sz=preorder.size(),idx=0;\\n        int capacity=1;\\n        for (idx=0;idx<sz;idx++){\\n            if (preorder[idx]!=',') continue;\\n            capacity--;\\n            if (capacity<0) return false;\\n            if (preorder[idx-1]!='#') capacity+=2;\\n        }\\n        return capacity==0;\\n    }\\n    };"
		},
		{
			"lc_ans_id":"78722",
			"view":"3382",
			"top":"6",
			"title":"Straight-forward C++ solution with explanation",
			"vote":"19",
			"content":"The idea is simple.\\n\\nDenote the number of null nodes as `nullCnt`, the number of actual nodes as `nodeCnt`.\\n\\nFor a binary tree, the number of null nodes is always the number of actual nodes plus 1. `nullCnt==nodeCnt+1`;\\n\\nSo,\\n\\n 1. if `nullCnt>nodeCnt+1`, the tree is invalid.\\n 2. if `nullCnt<nodeCnt+1`, the tree is incomplete.\\n 3. if `nullCnt==nodeCnt+1`, the tree is complete and can't be extended.\\n\\nWe just need to keep track of `nullCnt` and `nodeCnt` as we go through the sequence and check these conditions above.\\n\\nActually, recording `nullCnt-nodeCnt` is enough, so you can further improve the code.\\n\\n    class Solution {\\n    public:\\n        bool isValidSerialization(string preorder) {\\n            int nodeCnt=0,nullCnt=0;\\n            vector<string> v=splitStr(preorder,',');\\n            for(int i = 0; i<v.size(); i++){\\n                if(v[i]==\"#\") ++nullCnt;\\n                else ++nodeCnt;\\n                if(nullCnt>=nodeCnt+1 && i!=v.size()-1) return false;\\n            }\\n            return nullCnt==nodeCnt+1;\\n        }\\n        \\n        vector<string> splitStr(string str, char delimiter){\\n        \\tvector<string> r;\\n        \\tstring tmpstr;\\n        \\twhile (!str.empty()){\\n        \\t\\tint ind = str.find_first_of(delimiter);\\n        \\t\\tif (ind == -1){\\n        \\t\\t\\tr.push_back(str);\\n        \\t\\t\\tstr.clear();\\n        \\t\\t}\\n        \\t\\telse{\\n        \\t\\t\\tr.push_back(str.substr(0, ind));\\n        \\t\\t\\tstr = str.substr(ind + 1, str.size() - ind - 1);\\n        \\t\\t}\\n        \\t}\\n        \\treturn r;\\n        }\\n    };\\n\\n\\n\\n**Edit:**\\nThe algorithm scans the string **one node at a time from the beginning**, once it finds `nullCnt>nodeCnt+1`, it stops and return false. \\n\\nIf it finds `nullCnt==nodeCnt+1`, that means by now, the tree is valid(otherwise the algorithm would return false before this) and complete, if there are more nodes to come, it returns false; if it's the last node, the algorithm returns true. \\n\\nIf it finds `nullCnt<nodeCnt+1`, that means the tree is incomplete but not invalid(or the algorithm would return false before this) by now, if this is the last node and no more nodes comes after it, the tree is invalid.\\n\\nExample:\\n\\n` \"#,1,#\"`\\t1st node is `#`, `nullCnt==1`, `nodeCnt==0`, `nullCnt==nodeCnt+1`, the tree is complete by now, but there are more nodes after it, so it's invalid.\\n\\n` \"1, #\"`\\t1st node is `1`, `nullCnt==0`, `nodeCnt==1`, `nullCnt<nodeCnt+1`, the tree is incomplete, but there are more nodes after it, so we proceed, 2nd node is `#`, `nullCnt==1`, `nodeCnt==1`, `nullCnt<nodeCnt+1`, the tree is incomplete and there are no more nodes left, so it's invalid.\\n\\n**Edit2:**\\n\\nWhy for a binary tree, `nullCnt==nodeCnt+1`?\\n\\nFor an empty binary tree, `nullCnt=1`, `nodeCnt=0`, `nullCnt==nodeCnt+1`.\\n\\nEach time we add an actual node, we take the place of one null node and create two null nodes, so the net gain of null node is one, which is also the net gain of actual node. Thus, the actual nodes and null nodes will increase by the same amount, which means `nullCnt==nodeCnt+1` will always hold."
		},
		{
			"lc_ans_id":"78692",
			"view":"3690",
			"top":"7",
			"title":"Simple O(n) Solution",
			"vote":"19",
			"content":"Use iterative preorder traversal, actually no need to use stack, just a integer to track the depth of the stack.\\n\\n    public class Solution {\\n        public boolean isValidSerialization(String preorder) {\\n            if (preorder == null || preorder.length() == 0) return false;\\n            String[] strs = preorder.split(\",\");\\n            int depth = 0;\\n            int i = 0; \\n            while (i < strs.length - 1) {\\n                if (strs[i++].equals(\"#\")) {\\n                    if (depth == 0) return false;\\n                    else depth--;\\n                }\\n                else depth++;\\n            }\\n            if (depth != 0) return false;\\n            return strs[strs.length - 1].equals(\"#\");\\n        }\\n    }"
		},
		{
			"lc_ans_id":"78640",
			"view":"3388",
			"top":"8",
			"title":"2 lines Java using Regex",
			"vote":"16",
			"content":"Regex idea from [andrei3's solution](https://leetcode.com/discuss/83896/8-line-regex-solution-without-building-the-tree).\\n\\n    public boolean isValidSerialization(String preorder) {\\n        String s = preorder.replaceAll(\"\\\\\\\\d+,#,#\", \"#\");\\n        return s.equals(\"#\") || !s.equals(preorder) && isValidSerialization(s);\\n    }"
		},
		{
			"lc_ans_id":"78653",
			"view":"2035",
			"top":"9",
			"title":"6 lines Python, 7 lines Java",
			"vote":"14",
			"content":"**Python**\\n\\n    def isValidSerialization(self, preorder):\\n        need = 1\\n        for val in preorder.split(','):\\n            if not need:\\n                return False\\n            need -= ' #'.find(val)\\n        return not need\\n\\n**Java**\\n\\n    public boolean isValidSerialization(String preorder) {\\n        int need = 1;\\n        for (String val : preorder.split(\",\")) {\\n            if (need == 0)\\n                return false;\\n            need -= \" #\".indexOf(val);\\n        }\\n        return need == 0;\\n    }"
		}
	],
	"id":"331",
	"title":"Verify Preorder Serialization of a Binary Tree",
	"content":"<p>One way to serialize a binary tree is to use pre-order traversal. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as <code>#</code>.</p>\r\n\r\n<pre>\r\n     _9_\r\n    /   \\\r\n   3     2\r\n  / \\   / \\\r\n 4   1  #  6\r\n/ \\ / \\   / \\\r\n# # # #   # #\r\n</pre>\r\n\r\n<p>For example, the above binary tree can be serialized to the string <code>\"9,3,4,#,#,1,#,#,2,#,6,#,#\"</code>, where <code>#</code> represents a null node.\r\n</p>\r\n\r\n<p>Given a string of comma separated values, verify whether it is a correct preorder traversal serialization of a binary tree. Find an algorithm without reconstructing the tree.</p>\r\n\r\n<p>Each comma separated value in the string must be either an integer or a character <code>'#'</code> representing <code>null</code> pointer.</p>\r\n\r\n<p>You may assume that the input format is always valid, for example it could never contain two consecutive commas such as <code>\"1,,3\"</code>.</p>\r\n\r\n<p><strong>Example 1:</strong><br>\r\n<code>\"9,3,4,#,#,1,#,#,2,#,6,#,#\"</code><br>\r\nReturn <code>true</code></p>\r\n<p><strong>Example 2:</strong><br>\r\n<code>\"1,#\"</code><br>\r\nReturn <code>false</code></p>\r\n<p><strong>Example 3:</strong><br>\r\n<code>\"9,#,#,1\"</code><br>\r\nReturn <code>false</code></p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"172",
	"ac_num":"42653"
}