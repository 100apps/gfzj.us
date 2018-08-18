{
	"difficulty":"1",
	"submit_num":"56310",
	"show_id":"606",
	"leetcode_id":"606",
	"answers":[
		{
			"lc_ans_id":"103992",
			"view":"10995",
			"top":"0",
			"title":"Java Solution, Tree Traversal",
			"vote":"26",
			"content":"```\\npublic class Solution {\\n    public String tree2str(TreeNode t) {\\n        if (t == null) return \"\";\\n        \\n        String result = t.val + \"\";\\n        \\n        String left = tree2str(t.left);\\n        String right = tree2str(t.right);\\n        \\n        if (left == \"\" && right == \"\") return result;\\n        if (left == \"\") return result + \"()\" + \"(\" + right + \")\";\\n        if (right == \"\") return result + \"(\" + left + \")\";\\n        return result + \"(\" + left + \")\" + \"(\" + right + \")\";\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104000",
			"view":"2870",
			"top":"1",
			"title":"Python, Straightforward with Explanation",
			"vote":"21",
			"content":"We do this recursively.  \\n\\n* If the tree is empty, we return an empty string.\\n* We record each child as '(' + (string of child) + ')'\\n* If there is a right child but no left child, we still need to record '()' instead of empty string.\\n \\n```\\ndef tree2str(self, t):\\n    if not t: return ''\\n    left = '({})'.format(self.tree2str(t.left)) if (t.left or t.right) else ''\\n    right = '({})'.format(self.tree2str(t.right)) if t.right else ''\\n    return '{}{}{}'.format(t.val, left, right)\\n```"
		},
		{
			"lc_ans_id":"104036",
			"view":"3518",
			"top":"2",
			"title":"Java simple recursion",
			"vote":"14",
			"content":"```\\n public String tree2str(TreeNode t) {\\n        StringBuilder sb = new StringBuilder();\\n        helper(sb,t);\\n        return sb.toString();\\n    }\\n    public void helper(StringBuilder sb,TreeNode t){\\n        if(t!=null){\\n            sb.append(t.val);\\n            if(t.left!=null||t.right!=null){\\n                sb.append(\"(\");\\n                helper(sb,t.left);\\n                sb.append(\")\");\\n                if(t.right!=null){\\n                    sb.append(\"(\");\\n                helper(sb,t.right);\\n                sb.append(\")\");\\n                }\\n            }\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"104098",
			"view":"3073",
			"top":"3",
			"title":"[C++] [Java] 1 liner",
			"vote":"14",
			"content":"**C++ 1 liner**\\n```\\nclass Solution {\\npublic:\\n    string tree2str(TreeNode* t) {\\n        return !t ? \"\" : to_string(t->val) + (t->left ? \"(\" + tree2str(t->left) + \")\" : t->right ? \"()\" : \"\")\\n                                           + (t->right ? \"(\" + tree2str(t->right) + \")\" : \"\");\\n    }\\n};\\n```\\n**Java 1 liner**\\n```\\nclass Solution {\\n    public String tree2str(TreeNode t) {\\n        return t == null ? \"\" : t.val + (t.left != null ? \"(\" + tree2str(t.left) + \")\" : t.right != null ? \"()\" : \"\")\\n                                      + (t.right != null ? \"(\" + tree2str(t.right) + \")\" : \"\");\\n    }\\n}\\n```\\n\\n**C++ Cozy**\\n```\\nclass Solution {\\npublic:\\n    string tree2str(TreeNode* t) {\\n        if (!t) return \"\";\\n        string s = to_string(t->val);\\n        if (t->left)  s += \"(\" + tree2str(t->left) + \")\";\\n        else if (t->right) s += \"()\";\\n        if (t->right) s += \"(\" + tree2str(t->right) + \")\";\\n        return s;\\n    }\\n};\\n```\\n\\n**Java Cozy**\\n```\\nclass Solution {\\n    public String tree2str(TreeNode t) {\\n        if (t == null) return \"\";\\n        String s = new String(t.val + \"\");\\n        if (t.left != null) s += \"(\" + tree2str(t.left) + \")\";\\n        else if (t.right != null) s += \"()\";\\n        if (t.right != null) s += \"(\" + tree2str(t.right) + \")\";\\n        return s;\\n    }\\n}\\n```\\n**Java StringBuilder**\\n```\\nclass Solution {\\n    public String tree2str(TreeNode t) {\\n        StringBuilder sb = new StringBuilder(\"\");\\n        tree2str(t, sb);\\n        return sb.toString();\\n    }\\n\\n    private void tree2str(TreeNode t, StringBuilder sb) {\\n        if (t == null) return;\\n        sb.append(t.val + \"\");\\n        if (t.left != null) {\\n            sb.append(\"(\");\\n            tree2str(t.left, sb);\\n            sb.append(\")\");\\n        }\\n        else if (t.right != null) sb.append(\"()\");\\n\\n        if (t.right != null) {\\n            sb.append(\"(\");\\n            tree2str(t.right, sb);\\n            sb.append(\")\");\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104089",
			"view":"1470",
			"top":"4",
			"title":"Easy C++ Solution",
			"vote":"5",
			"content":"```\\n    string tree2str(TreeNode* t) {\\n        if (t == NULL) return \"\";\\n        string s = to_string(t->val);\\n        if (t->left) s += '(' + tree2str(t->left) + ')';\\n        else if (t->right) s += \"()\";\\n        if (t->right) s += '(' + tree2str(t->right) + ')';\\n        return s;\\n    }\\n```"
		},
		{
			"lc_ans_id":"103984",
			"view":"580",
			"top":"5",
			"title":"Python Simple Solution",
			"vote":"4",
			"content":"```\\nclass Solution(object):\\n    def tree2str(self, t):\\n        \"\"\"\\n        :type t: TreeNode\\n        :rtype: str\\n        \"\"\"\\n        if not t:\\n            return \"\"\\n        res = \"\"\\n        left = self.tree2str(t.left)\\n        right = self.tree2str(t.right)\\n        if left or right:\\n            res += \"(%s)\" % left\\n        if right:\\n            res += \"(%s)\" % right\\n        return str(t.val) + res\\n```"
		},
		{
			"lc_ans_id":"104004",
			"view":"177",
			"top":"6",
			"title":"Simple Java Preorder traversal solution",
			"vote":"3",
			"content":"```\\npublic String tree2str(TreeNode t) {\\n            if (t == null) {\\n                return \"\";\\n            }\\n            StringBuilder sb = new StringBuilder();\\n            preorder(t, sb);\\n            return sb.toString();\\n        }\\n\\nprivate void preorder(TreeNode root, StringBuilder sb) {\\n            if (root == null) {\\n                return;\\n            }\\n            sb.append(root.val);\\n            if (root.left != null) {\\n                sb.append(\"(\");\\n                preorder(root.left, sb);\\n                sb.append(\")\");\\n            }\\n            if (root.right != null) {\\n                if (root.left == null) {\\n                    sb.append(\"()\");\\n                }\\n                sb.append(\"(\");\\n                preorder(root.right, sb);\\n                sb.append(\")\");\\n            }\\n        }\\n```\\n\\nAlso, viewable [here](https://github.com/fishercoder1534/Leetcode/) on Github."
		},
		{
			"lc_ans_id":"104050",
			"view":"131",
			"top":"7",
			"title":"Meaning of one to one relationship",
			"vote":"3",
			"content":"**The null node needs to be represented by empty parenthesis pair \"()\". And you need to omit all the empty parenthesis pairs that don't affect the one-to-one mapping relationship between the string and the original binary tree** . Can some one explain the meaning of one to one relationship ? I couldn't understand the concepts even after reading the example given in the question."
		},
		{
			"lc_ans_id":"104015",
			"view":"432",
			"top":"8",
			"title":"Very Straightforward Easy solution",
			"vote":"2",
			"content":"```\\n    public string Tree2str(TreeNode t) {\\n        if(t == null) return \"\";\\n        if(t.left == null && t.right == null) return t.val.ToString();\\n        string s = t.val.ToString() + \"(\" + Tree2str(t.left) + \")\";\\n        s = t.right == null ? s : s + \"(\" + Tree2str(t.right) + \")\";\\n        return s;\\n    }"
		},
		{
			"lc_ans_id":"104096",
			"view":"478",
			"top":"9",
			"title":"Java recursion StringBuilder",
			"vote":"2",
			"content":"```\\npublic static String tree2str(TreeNode t) {\\n        if(t == null) return \"\";\\n        return tree2str1(t).toString();\\n    }\\n\\n    public static StringBuilder tree2str1(TreeNode t) {\\n        if(t == null) return null;\\n\\n        StringBuilder sb = new StringBuilder();\\n        sb.append(t.val);\\n\\n        StringBuilder left = tree2str1(t.left);\\n        StringBuilder right = tree2str1(t.right);\\n\\n        if(right == null && left == null) return sb;\\n        sb.append(\"(\").append(left == null ? \"\" : left).append(\")\");\\n        if(right != null) sb.append(\"(\").append(right).append(\")\");\\n        return sb;\\n    }\\n\\n```"
		}
	],
	"id":"585",
	"title":"Construct String from Binary Tree",
	"content":"<p>You need to construct a string consists of parenthesis and integers from a binary tree with the preorder traversing way.</p>\r\n\r\n<p>The null node needs to be represented by empty parenthesis pair \"()\". And you need to omit all the empty parenthesis pairs that don't affect the one-to-one mapping relationship between the string and the original binary tree.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> Binary tree: [1,2,3,4]\r\n       1\r\n     /   \\\r\n    2     3\r\n   /    \r\n  4     \r\n\r\n<b>Output:</b> \"1(2(4))(3)\"\r\n<br/><b>Explanation:</b> Originallay it needs to be \"1(2(4)())(3()())\", <br/>but you need to omit all the unnecessary empty parenthesis pairs. <br/>And it will be \"1(2(4))(3)\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> Binary tree: [1,2,3,null,4]\r\n       1\r\n     /   \\\r\n    2     3\r\n     \\  \r\n      4 \r\n\r\n<b>Output:</b> \"1(2()(4))(3)\"\r\n<br/><b>Explanation:</b> Almost the same as the first example, <br/>except we can't omit the first parenthesis pair to break the one-to-one mapping relationship between the input and the output.\r\n</pre>\r\n</p>",
	"frequency":"278",
	"ac_num":"28062"
}