{
	"difficulty":"2",
	"submit_num":"264743",
	"show_id":"222",
	"leetcode_id":"222",
	"answers":[
		{
			"lc_ans_id":"61958",
			"view":"37697",
			"top":"0",
			"title":"Concise Java solutions O(log(n)^2)",
			"vote":"283",
			"content":"**Main Solution** - 572 ms\\n\\n    class Solution {\\n        int height(TreeNode root) {\\n            return root == null ? -1 : 1 + height(root.left);\\n        }\\n        public int countNodes(TreeNode root) {\\n            int h = height(root);\\n            return h < 0 ? 0 :\\n                   height(root.right) == h-1 ? (1 << h) + countNodes(root.right)\\n                                             : (1 << h-1) + countNodes(root.left);\\n        }\\n    }\\n\\n---\\n\\n**Explanation**\\n\\nThe height of a tree can be found by just going left. Let a single node tree have height 0. Find the height `h` of the whole tree. If the whole tree is empty, i.e., has height -1, there are 0 nodes.\\n\\nOtherwise check whether the height of the right subtree is just one less than that of the whole tree, meaning left and right subtree have the same height.\\n\\n- If yes, then the last node on the last tree row is in the right subtree and the left subtree is a full tree of height h-1. So we take the 2^h-1 nodes of the left subtree plus the 1 root node plus recursively the number of nodes in the right subtree.\\n- If no, then the last node on the last tree row is in the left subtree and the right subtree is a full tree of height h-2. So we take the 2^(h-1)-1 nodes of the right subtree plus the 1 root node plus recursively the number of nodes in the left subtree.\\n\\nSince I halve the tree in every recursive step, I have O(log(n)) steps. Finding a height costs O(log(n)). So overall O(log(n)^2).\\n\\n---\\n\\n**Iterative Version** - 508 ms\\n\\nHere's an iterative version as well, with the benefit that I don't recompute `h` in every step.\\n\\n    class Solution {\\n        int height(TreeNode root) {\\n            return root == null ? -1 : 1 + height(root.left);\\n        }\\n        public int countNodes(TreeNode root) {\\n            int nodes = 0, h = height(root);\\n            while (root != null) {\\n                if (height(root.right) == h - 1) {\\n                    nodes += 1 << h;\\n                    root = root.right;\\n                } else {\\n                    nodes += 1 << h-1;\\n                    root = root.left;\\n                }\\n                h--;\\n            }\\n            return nodes;\\n        }\\n    }\\n\\n---\\n\\n**A Different Solution** - 544 ms\\n\\nHere's one based on [victorlee's C++ solution](https://leetcode.com/discuss/38899/easy-short-c-recursive-solution).\\n\\n    class Solution {\\n        public int countNodes(TreeNode root) {\\n            if (root == null)\\n                return 0;\\n            TreeNode left = root, right = root;\\n            int height = 0;\\n            while (right != null) {\\n                left = left.left;\\n                right = right.right;\\n                height++;\\n            }\\n            if (left == null)\\n                return (1 << height) - 1;\\n            return 1 + countNodes(root.left) + countNodes(root.right);\\n        }\\n    }\\n\\nNote that that's basically this:\\n\\n    public int countNodes(TreeNode root) {\\n        if (root == null)\\n            return 0;\\n        return 1 + countNodes(root.left) + countNodes(root.right)\\n\\nThat would be O(n). But... the actual solution has a gigantic optimization. It first walks all the way left and right to determine the height and whether it's a full tree, meaning the last row is full. If so, then the answer is just 2^height-1. And since always at least one of the two recursive calls is such a full tree, at least one of the two calls immediately stops. Again we have runtime O(log(n)^2)."
		},
		{
			"lc_ans_id":"61953",
			"view":"16462",
			"top":"1",
			"title":"Easy short c++ recursive solution",
			"vote":"153",
			"content":"    class Solution {\\n    \\n    public:\\n    \\n        int countNodes(TreeNode* root) {\\n    \\n            if(!root) return 0;\\n    \\n            int hl=0, hr=0;\\n    \\n            TreeNode *l=root, *r=root;\\n    \\n            while(l) {hl++;l=l->left;}\\n    \\n            while(r) {hr++;r=r->right;}\\n    \\n            if(hl==hr) return pow(2,hl)-1;\\n    \\n            return 1+countNodes(root->left)+countNodes(root->right);\\n    \\n        }\\n    \\n    };"
		},
		{
			"lc_ans_id":"61948",
			"view":"18403",
			"top":"2",
			"title":"Accepted Easy Understand Java Solution",
			"vote":"113",
			"content":"\\npublic class Solution {\\n\\n    public int countNodes(TreeNode root) {\\n\\n        int leftDepth = leftDepth(root);\\n\\t\\tint rightDepth = rightDepth(root);\\n\\n\\t\\tif (leftDepth == rightDepth)\\n\\t\\t\\treturn (1 << leftDepth) - 1;\\n\\t\\telse\\n\\t\\t\\treturn 1+countNodes(root.left) + countNodes(root.right);\\n\\n\\t}\\n\\n\\tprivate int rightDepth(TreeNode root) {\\n\\t\\t// TODO Auto-generated method stub\\n\\t\\tint dep = 0;\\n\\t\\twhile (root != null) {\\n\\t\\t\\troot = root.right;\\n\\t\\t\\tdep++;\\n\\t\\t}\\n\\t\\treturn dep;\\n\\t}\\n\\n\\tprivate int leftDepth(TreeNode root) {\\n\\t\\t// TODO Auto-generated method stub\\n\\t\\tint dep = 0;\\n\\t\\twhile (root != null) {\\n\\t\\t\\troot = root.left;\\n\\t\\t\\tdep++;\\n\\t\\t}\\n\\t\\treturn dep;\\n    }\\n}"
		},
		{
			"lc_ans_id":"61967",
			"view":"6595",
			"top":"3",
			"title":"A very clear recursive solution, isn't it?",
			"vote":"53",
			"content":"        /**\\n         * Definition for a binary tree node.\\n         * struct TreeNode {\\n         *     int val;\\n         *     TreeNode *left;\\n         *     TreeNode *right;\\n         *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n         * };\\n         */\\n        class Solution {\\n        public:\\n            int countNodes(TreeNode* root) {\\n                if(!root) return 0;\\n                int lh = height(root->left);\\n                int rh = height(root->right);     \\n                if(lh == rh) \\n                   return (1 << lh) + countNodes(root->right);  /*1(\\u6839\\u8282\\u70b9) + (1<<lh)-1(\\u5b8c\\u5168\\u5de6\\u5b50\\u6811) + # of rightNode */               \\n                else \\n                   return (1 << rh) + countNodes(root->left);  /*1(\\u6839\\u8282\\u70b9) + (1<<rh)-1(\\u5b8c\\u5168\\u53f3\\u5b50\\u6811) + # of leftNode*/\\n            }\\n        private:\\n            int height(TreeNode *root){ //get the height of a complete binary tree.\\n                if(!root) return 0;\\n                return 1 + height(root->left);\\n            }\\n        };"
		},
		{
			"lc_ans_id":"61950",
			"view":"7440",
			"top":"4",
			"title":"My JAVA solution with explanation which beats 99%",
			"vote":"53",
			"content":"Basically my solution contains 2 steps.\\n(1) Firstly, we need to find the height of the binary tree and count the nodes above the last level.\\n(2) Then we should find a way to count the nodes on the last level. \\n\\nHere I used a kind of binary search. We define the \"midNode\" of the last level as a node following the path \"root->left->right->right->...->last level\". \\n\\nIf midNode is null, then it means we should count the nodes on the last level in the left subtree.\\n\\nIf midNode is not null, then we add half of the last level nodes to our result and then count the nodes on the last level in the right subtree.\\n\\nOf course I used some stop condition to make the code more efficient, e.g. when a tree has height 1, it means it only has 3 cases: 1. has right son; 2. only has left son; 3. has no son.\\n\\n    public int countNodes(TreeNode root) {\\n    \\tif (root==null) return 0;\\n    \\tif (root.left==null) return 1;\\n    \\tint height = 0;\\n        int nodesSum = 0;\\n    \\tTreeNode curr = root;\\n        while(curr.left!=null) {\\n        \\tnodesSum += (1<<height);\\n        \\theight++;\\n        \\tcurr = curr.left;\\n        }\\n        return nodesSum + countLastLevel(root, height);\\n    }\\n    \\n\\tprivate int countLastLevel(TreeNode root, int height) {\\n\\t\\tif(height==1) \\n\\t\\t\\tif (root.right!=null) return 2;\\n\\t\\t\\telse if (root.left!=null) return 1;\\n\\t\\t\\telse return 0;\\n\\t\\tTreeNode midNode = root.left;\\n\\t\\tint currHeight = 1;\\n\\t\\twhile(currHeight<height) {\\n\\t\\t\\tcurrHeight++;\\n\\t\\t\\tmidNode = midNode.right;\\n\\t\\t}\\n\\t\\tif (midNode==null) return countLastLevel(root.left, height-1);\\n\\t\\telse return (1<<(height-1)) + countLastLevel(root.right, height-1);\\n\\t}"
		},
		{
			"lc_ans_id":"62041",
			"view":"3733",
			"top":"5",
			"title":"Simple C++ recursive solution",
			"vote":"34",
			"content":"    int getLeftHeight(TreeNode* root) {\\n        int height = 0;\\n        while(root) { \\n            root = root->left;\\n            height++;\\n        }\\n        return height;\\n    }\\n\\n    int countNodes(TreeNode* root) {\\n        if(!root) return 0;\\n        \\n        int left_height = getLeftHeight(root->left);\\n        int right_height = getLeftHeight(root->right);\\n        \\n        if(left_height == right_height) \\n            return pow(2, left_height) + countNodes(root->right);\\n            \\n        return pow(2, right_height) + countNodes(root->left);\\n    }"
		},
		{
			"lc_ans_id":"62056",
			"view":"2787",
			"top":"6",
			"title":"68ms C++ solution using binary search with brief explanation.",
			"vote":"30",
			"content":"The thought is simple. We just consider the lowest level of the tree.\\nThe left child and right child just divide the tree lower than the current node to 2 part.\\nSo what this code do is first check the right most child of the current node's left child.\\nIf this child is exist, we know that there may be more nodes on the right side of the tree. So we move the current node to it's right child. And repeat until we reach the lowest level.\\n\\n     int countNodes(TreeNode* root) {\\n        if(!root) return 0;\\n        TreeNode *temp = root;\\n        int height = 0, count = 0, level;\\n        while(temp) {\\n            temp = temp->left;\\n            height ++;\\n        }\\n        temp = root;\\n        level = height - 2;\\n        while(level >= 0) {\\n            TreeNode *left = temp->left;\\n            for(int i = 0;i < level;i ++) {\\n                left = left->right;\\n            }\\n            if(left) {\\n                temp = temp->right;\\n                count += (1 << level);\\n            } else temp = temp->left;\\n            level --;\\n        }\\n        if(temp) count ++;\\n        return (1 << (height - 1)) + count - 1;\\n    }"
		},
		{
			"lc_ans_id":"62029",
			"view":"3825",
			"top":"7",
			"title":"C++ Solution inspired by couple of good ones.",
			"vote":"27",
			"content":"Concise C++ code I came up with after some inspiration from other solutions.<br>\\nThanks to:<br>\\n1. [Divide & Conquer C++ solution][1]<br>\\n2. [80ms C++ solution][2]\\n\\n    class Solution {\\n    public:\\n        int countNodes(TreeNode* root) {\\n            if (!root)\\n                return 0;\\n            int leftDepth = 0, rightDepth= 0;\\n            for(TreeNode* p=root; p; p=p->left) ++leftDepth;\\n            for(TreeNode* p=root; p; p=p->right) ++rightDepth;\\n            if (leftDepth==rightDepth) {\\n                return (1<< leftDepth) - 1 ;\\n            }\\n            else {\\n                return countNodes(root->left) + countNodes(root->right) + 1 ;\\n            }\\n        }\\n        \\n    };\\n\\n\\n  [1]: https://leetcode.com/discuss/39043/divide-&-conquer-c-solution\\n  [2]: https://leetcode.com/discuss/38929/80ms-c-solution"
		},
		{
			"lc_ans_id":"62088",
			"view":"1942",
			"top":"8",
			"title":"My python solution in O(lgn * lgn) time",
			"vote":"25",
			"content":"   compare the depth between left sub tree and right sub tree.\\nA, If it is equal, it means the left sub tree is a full binary tree\\nB, It it is not , it means the right sub tree is a full binary tree \\n\\n     class Solution:\\n            # @param {TreeNode} root\\n            # @return {integer}\\n            def countNodes(self, root):\\n                if not root:\\n                    return 0\\n                leftDepth = self.getDepth(root.left)\\n                rightDepth = self.getDepth(root.right)\\n                if leftDepth == rightDepth:\\n                    return pow(2, leftDepth) + self.countNodes(root.right)\\n                else:\\n                    return pow(2, rightDepth) + self.countNodes(root.left)\\n        \\n            def getDepth(self, root):\\n                if not root:\\n                    return 0\\n                return 1 + self.getDepth(root.left)"
		},
		{
			"lc_ans_id":"62070",
			"view":"1476",
			"top":"9",
			"title":"72 ms c++ solution",
			"vote":"16",
			"content":"calculate height of right tree, if the same as height, go to right tree(append 1 to binary result), otherwise go to left tree (Append 0 to binary result)\\n\\n    int countNodes(TreeNode* root)\\n    {\\n        int result,height,RTreeHeight;\\n        TreeNode* visit,*p;\\n    \\n        if (root==NULL) return 0;\\n    \\n        p = visit = root;\\n        height = 0;\\n        for(;p;p = p -> left) height++;\\n        result = 1;\\n        \\n        while(--height)\\n        {\\n            result <<= 1;\\n            \\n            RTreeHeight = 0;\\n            p = visit->right;\\n            for(;p;p = p -> left) RTreeHeight++;\\n            \\n            if (RTreeHeight < height) visit = visit->left;\\n            else\\n            {\\n                result |= 1;\\n                visit = visit->right;\\n            }\\n        }\\n        return result;\\n    }"
		}
	],
	"id":"222",
	"title":"Count Complete Tree Nodes",
	"content":"<p>Given a <b>complete</b> binary tree, count the number of nodes.</p>\r\n\r\n<p><b><u>Definition of a complete binary tree from <a href=\"http://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees\" target=\"_blank\">Wikipedia</a>:</u></b><br>\r\nIn a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2<sup>h</sup> nodes inclusive at the last level h.</p>",
	"frequency":"380",
	"ac_num":"73256"
}