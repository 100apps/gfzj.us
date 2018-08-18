{
	"difficulty":"2",
	"submit_num":"433557",
	"show_id":"116",
	"leetcode_id":"116",
	"answers":[
		{
			"lc_ans_id":"37472",
			"view":"41911",
			"top":"0",
			"title":"A simple accepted solution",
			"vote":"353",
			"content":"    void connect(TreeLinkNode *root) {\\n        if (root == NULL) return;\\n        TreeLinkNode *pre = root;\\n        TreeLinkNode *cur = NULL;\\n        while(pre->left) {\\n            cur = pre;\\n            while(cur) {\\n                cur->left->next = cur->right;\\n                if(cur->next) cur->right->next = cur->next->left;\\n                cur = cur->next;\\n            }\\n            pre = pre->left;\\n        }\\n    }\\nyou need two additional pointer."
		},
		{
			"lc_ans_id":"37461",
			"view":"18699",
			"top":"1",
			"title":"Java solution with O(1) memory+ O(n) time",
			"vote":"86",
			"content":"\\n\\n    public class Solution {\\n        public void connect(TreeLinkNode root) {\\n            TreeLinkNode level_start=root;\\n            while(level_start!=null){\\n                TreeLinkNode cur=level_start;\\n                while(cur!=null){\\n                    if(cur.left!=null) cur.left.next=cur.right;\\n                    if(cur.right!=null && cur.next!=null) cur.right.next=cur.next.left;\\n                    \\n                    cur=cur.next;\\n                }\\n                level_start=level_start.left;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"37473",
			"view":"11775",
			"top":"2",
			"title":"My recursive solution(Java)",
			"vote":"63",
			"content":"\\n    public void connect(TreeLinkNode root) {\\n        if(root == null)\\n            return;\\n            \\n        if(root.left != null){\\n            root.left.next = root.right;\\n            if(root.next != null)\\n                root.right.next = root.next.left;\\n        }\\n        \\n        connect(root.left);\\n        connect(root.right);\\n    }"
		},
		{
			"lc_ans_id":"37578",
			"view":"7715",
			"top":"3",
			"title":"My simple non-iterative C++ code with O(1) memory",
			"vote":"53",
			"content":"    void connect(TreeLinkNode *root) {\\n        if(!root)\\n            return;\\n        while(root -> left)\\n        {\\n            TreeLinkNode *p = root;\\n            while(p)\\n            {\\n                p -> left -> next = p -> right;\\n                if(p -> next)\\n                    p -> right -> next = p -> next -> left;\\n                p = p -> next;\\n            }\\n            root = root -> left;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"37484",
			"view":"2811",
			"top":"4",
			"title":"7 lines, iterative, real O(1) space",
			"vote":"35",
			"content":"Simply do it level by level, using the `next`-pointers of the current level to go through the current level and set the `next`-pointers of the next level.\\n\\nI say \"real\" O(1) space because of the many recursive solutions ignoring that recursion management needs space.\\n\\n    def connect(self, root):\\n        while root and root.left:\\n            next = root.left\\n            while root:\\n                root.left.next = root.right\\n                root.right.next = root.next and root.next.left\\n                root = root.next\\n            root = next"
		},
		{
			"lc_ans_id":"37500",
			"view":"6672",
			"top":"5",
			"title":"Hint for O(1) space",
			"vote":"35",
			"content":"If you don't want a solution for O(1) space but just a hint, here it is: you need to make use of the *next* links that you're creating."
		},
		{
			"lc_ans_id":"37603",
			"view":"1755",
			"top":"6",
			"title":"Java solution traversing by level without extra space",
			"vote":"25",
			"content":"    public class Solution {\\n        public void connect(TreeLinkNode root) {\\n            if(root==null) return;\\n            TreeLinkNode cur = root;\\n            TreeLinkNode nextLeftmost = null;\\n\\n            while(cur.left!=null){\\n                nextLeftmost = cur.left; // save the start of next level\\n                while(cur!=null){\\n                    cur.left.next=cur.right;\\n                    cur.right.next = cur.next==null? null : cur.next.left;\\n                    cur=cur.next;\\n                }\\n                cur=nextLeftmost;  // point to next level \\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"37503",
			"view":"1789",
			"top":"7",
			"title":"24ms Easy Iterative and Recursive C++ Solutions",
			"vote":"19",
			"content":"The idea is similar to a level-order traversal and remember to take full advantages of the prefect binary tree assumption in the problem statement.\\n\\nThe code (iterative solution) is as follows.\\n\\n    class Solution {\\n    public:\\n        void connect(TreeLinkNode *root) {\\n            TreeLinkNode* pre = root;\\n            TreeLinkNode* cur = NULL;\\n            while (pre) {\\n                cur = pre;\\n                while (cur && cur -> left) { \\n                    cur -> left -> next = cur -> right;\\n                    if (cur -> next)\\n                        cur -> right -> next = cur -> next -> left;\\n                    cur = cur -> next;\\n                }\\n                pre = pre -> left;\\n            }\\n        } \\n    };\\n\\nThis problem can also be solved recursively.\\n\\n    class Solution {\\n    public:\\n        void connect(TreeLinkNode *root) {\\n            if (!root) return;\\n            if (root -> left) {\\n                root -> left -> next = root -> right;\\n                if (root -> next)\\n                    root -> right -> next = root -> next -> left;\\n            }\\n            connect(root -> left);\\n            connect(root -> right);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"37732",
			"view":"5234",
			"top":"8",
			"title":"\"You may only use constant extra space.\" - So does it mean we cannot use recursion?",
			"vote":"13",
			"content":"Does anyone have an iteration method with constant space solution?"
		},
		{
			"lc_ans_id":"37663",
			"view":"1072",
			"top":"9",
			"title":"An iterative java solution",
			"vote":"12",
			"content":"    public void connect(TreeLinkNode root) {\\n        \\n        TreeLinkNode n = root;\\n        \\n        while(n != null && n.left != null) {\\n            TreeLinkNode pre = null;\\n            \\n            for(TreeLinkNode p = n; p != null; p = p.next) {\\n                if(pre != null) pre.next = p.left;\\n                p.left.next = p.right;\\n                pre = p.right;\\n            }\\n            n = n.left;\\n        }\\n    }"
		}
	],
	"id":"116",
	"title":"Populating Next Right Pointers in Each Node",
	"content":"<p>\r\nGiven a binary tree\r\n<pre>\r\n    struct TreeLinkNode {\r\n      TreeLinkNode *left;\r\n      TreeLinkNode *right;\r\n      TreeLinkNode *next;\r\n    }\r\n</pre>\r\n</p>\r\n\r\n<p>Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to <code>NULL</code>.</p>\r\n\r\n<p>Initially, all next pointers are set to <code>NULL</code>.</p>\r\n\r\n<p>\r\n<b>Note:</b>\r\n<ul>\r\n<li>You may only use constant extra space.</li>\r\n<li>You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).</li>\r\n</ul>\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven the following perfect binary tree,<br />\r\n<pre>\r\n         1\r\n       /  \\\r\n      2    3\r\n     / \\  / \\\r\n    4  5  6  7\r\n</pre>\r\n</p>\r\n<p>\r\nAfter calling your function, the tree should look like:<br />\r\n<pre>\r\n         1 -> NULL\r\n       /  \\\r\n      2 -> 3 -> NULL\r\n     / \\  / \\\r\n    4->5->6->7 -> NULL\r\n</pre>\r\n</p>",
	"frequency":"433",
	"ac_num":"160184"
}