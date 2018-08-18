{
	"difficulty":"2",
	"submit_num":"299360",
	"show_id":"95",
	"leetcode_id":"95",
	"answers":[
		{
			"lc_ans_id":"31494",
			"view":"41960",
			"top":"0",
			"title":"A simple recursive solution",
			"vote":"156",
			"content":"I start by noting that 1..n is the in-order traversal for any BST with nodes 1 to n. So if I pick i-th node as my root, the left subtree will contain elements 1 to (i-1), and the right subtree will contain elements (i+1) to n. I use recursive calls to get back all possible trees for left and right subtrees and combine them in all possible ways with the root. \\n\\n\\n\\n    public class Solution {\\n        public List<TreeNode> generateTrees(int n) {\\n            \\n            return genTrees(1,n);\\n        }\\n            \\n        public List<TreeNode> genTrees (int start, int end)\\n        {\\n    \\n            List<TreeNode> list = new ArrayList<TreeNode>();\\n    \\n            if(start>end)\\n            {\\n                list.add(null);\\n                return list;\\n            }\\n            \\n            if(start == end){\\n                list.add(new TreeNode(start));\\n                return list;\\n            }\\n            \\n            List<TreeNode> left,right;\\n            for(int i=start;i<=end;i++)\\n            {\\n                \\n                left = genTrees(start, i-1);\\n                right = genTrees(i+1,end);\\n                \\n                for(TreeNode lnode: left)\\n                {\\n                    for(TreeNode rnode: right)\\n                    {\\n                        TreeNode root = new TreeNode(i);\\n                        root.left = lnode;\\n                        root.right = rnode;\\n                        list.add(root);\\n                    }\\n                }\\n                    \\n            }\\n            \\n            return list;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"31493",
			"view":"25736",
			"top":"1",
			"title":"Java Solution with DP",
			"vote":"115",
			"content":"Here is my java solution with DP:\\n\\n\\n    public static List<TreeNode> generateTrees(int n) {\\n        List<TreeNode>[] result = new List[n + 1];\\n        result[0] = new ArrayList<TreeNode>();\\n        if (n == 0) {\\n            return result[0];\\n        }\\n\\n        result[0].add(null);\\n        for (int len = 1; len <= n; len++) {\\n            result[len] = new ArrayList<TreeNode>();\\n            for (int j = 0; j < len; j++) {\\n                for (TreeNode nodeL : result[j]) {\\n                    for (TreeNode nodeR : result[len - j - 1]) {\\n                        TreeNode node = new TreeNode(j + 1);\\n                        node.left = nodeL;\\n                        node.right = clone(nodeR, j + 1);\\n                        result[len].add(node);\\n                    }\\n                }\\n            }\\n        }\\n        return result[n];\\n    }\\n\\n    private static TreeNode clone(TreeNode n, int offset) {\\n        if (n == null) {\\n            return null;\\n        }\\n        TreeNode node = new TreeNode(n.val + offset);\\n        node.left = clone(n.left, offset);\\n        node.right = clone(n.right, offset);\\n        return node;\\n    }\\n\\n\\n\\n**result[i]** stores the result until length **i**. For the result for length i+1, select the root node j from 0 to i, combine the result from left side and right side. Note for the right side we have to clone the nodes as the value will be offsetted by **j**."
		},
		{
			"lc_ans_id":"31508",
			"view":"11831",
			"top":"2",
			"title":"Divide-and-conquer.  F(i) = G(i-1) * G(n-i)",
			"vote":"77",
			"content":"This problem is a variant of the problem of [Unique Binary Search Trees][1]. \\n\\nI provided a solution along with explanation for the above problem, in the question [\"DP solution in 6 lines with explanation\"][2] \\n\\nIt is intuitive to solve this problem by following the same algorithm. Here is the code in a divide-and-conquer style. \\n\\n    public List<TreeNode> generateTrees(int n) {\\n    \\treturn generateSubtrees(1, n);\\n    }\\n \\n\\tprivate List<TreeNode> generateSubtrees(int s, int e) {\\n\\t\\tList<TreeNode> res = new LinkedList<TreeNode>();\\n\\t\\tif (s > e) {\\n\\t\\t\\tres.add(null); // empty tree\\n\\t\\t\\treturn res;\\n\\t\\t}\\n\\n\\t\\tfor (int i = s; i <= e; ++i) {\\n\\t\\t\\tList<TreeNode> leftSubtrees = generateSubtrees(s, i - 1);\\n\\t\\t\\tList<TreeNode> rightSubtrees = generateSubtrees(i + 1, e);\\n\\n\\t\\t\\tfor (TreeNode left : leftSubtrees) {\\n\\t\\t\\t\\tfor (TreeNode right : rightSubtrees) {\\n\\t\\t\\t\\t\\tTreeNode root = new TreeNode(i);\\n\\t\\t\\t\\t\\troot.left = left;\\n\\t\\t\\t\\t\\troot.right = right;\\n\\t\\t\\t\\t\\tres.add(root);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn res;\\n\\t}\\n\\n  [1]: https://oj.leetcode.com/problems/unique-binary-search-trees/\\n  [2]: https://oj.leetcode.com/discuss/24282/dp-solution-in-6-lines-with-explanation-f-i-g-i-1-g-n-i"
		},
		{
			"lc_ans_id":"31495",
			"view":"8105",
			"top":"3",
			"title":"Should-be-6-Liner",
			"vote":"49",
			"content":"If only LeetCode had a `TreeNode(val, left, right)` constructor... sigh. Then I wouldn't need to provide my own and my solution would be six lines instead of eleven.\\n\\n    def generateTrees(self, n):\\n        def node(val, left, right):\\n            node = TreeNode(val)\\n            node.left = left\\n            node.right = right\\n            return node\\n        def trees(first, last):\\n            return [node(root, left, right)\\n                    for root in range(first, last+1)\\n                    for left in trees(first, root-1)\\n                    for right in trees(root+1, last)] or [None]\\n        return trees(1, n)\\n\\nOr even just **four** lines, if it's not forbidden to add an optional argument:\\n\\n    def node(val, left, right):\\n        node = TreeNode(val)\\n        node.left = left\\n        node.right = right\\n        return node\\n    \\n    class Solution:\\n        def generateTrees(self, last, first=1):\\n            return [node(root, left, right)\\n                    for root in range(first, last+1)\\n                    for left in self.generateTrees(root-1, first)\\n                    for right in self.generateTrees(last, root+1)] or [None]\\n\\nJust another version, using loops instead of list comprehension:\\n\\n    def generateTrees(self, n):\\n        def generate(first, last):\\n            trees = []\\n            for root in range(first, last+1):\\n                for left in generate(first, root-1):\\n                    for right in generate(root+1, last):\\n                        node = TreeNode(root)\\n                        node.left = left\\n                        node.right = right\\n                        trees += node,\\n            return trees or [None]\\n        return generate(1, n)"
		},
		{
			"lc_ans_id":"31516",
			"view":"13334",
			"top":"4",
			"title":"Share a C++ DP solution with O(1) space",
			"vote":"49",
			"content":"The basic idea is that we can construct the result of n node tree just from the result of n-1 node tree.\\nHere's how we do it: only 2 conditions: 1)  The nth node is the new root, so `newroot->left = oldroot;`\\n2) the nth node is not root, we traverse the old tree, every time the node in the old tree has a right child, we can perform: `old node->right = nth node, nth node ->left = right child;` and when we reach the end of the tree, don't forget we can also add the nth node here.\\nOne thing to notice is that every time we push a TreeNode in our result, I push the clone version of the root, and I recover what I do to the old node immediately. This is because you may use the old tree for several times.\\n   \\n\\n     class Solution {\\n        public:\\n            TreeNode* clone(TreeNode* root){\\n                if(root == nullptr)\\n                    return nullptr;\\n                TreeNode* newroot = new TreeNode(root->val);\\n                newroot->left = clone(root->left);\\n                newroot->right = clone(root->right);\\n                return newroot;\\n            }\\n            vector<TreeNode *> generateTrees(int n) {\\n                vector<TreeNode *> res(1,nullptr);\\n                for(int i = 1; i <= n; i++){\\n                    vector<TreeNode *> tmp;\\n                    for(int j = 0; j<res.size();j++){\\n                        TreeNode* oldroot = res[j];\\n                        TreeNode* root = new TreeNode(i);\\n                        TreeNode* target = clone(oldroot);\\n                        root->left = target;\\n                        tmp.push_back(root);\\n                       \\n                        if(oldroot!=nullptr){\\n                            TreeNode* tmpold = oldroot;\\n                            while(tmpold->right!=nullptr){\\n                                TreeNode* nonroot = new TreeNode(i);\\n                                TreeNode *tright = tmpold->right;\\n                                tmpold->right = nonroot;\\n                                nonroot->left = tright;\\n                                TreeNode *target = clone(oldroot);\\n                                tmp.push_back(target);\\n                                tmpold->right = tright;\\n                                tmpold = tmpold->right;\\n                            }\\n                            tmpold->right = new TreeNode(i);\\n                            TreeNode *target = clone(oldroot);\\n                            tmp.push_back(target);\\n                            tmpold->right = nullptr;\\n                        }\\n                    }\\n                    res=tmp;\\n                }\\n                return res;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"31552",
			"view":"6323",
			"top":"5",
			"title":"JAVA DP Solution and Brute Force Recursive Solution.",
			"vote":"39",
			"content":"The first method that came to mind was the brute force solution as below. \\n\\n     public List<TreeNode> generateTrees(int n) {\\n         return generateTrees(1,n);\\n     }\\n    \\n    public List<TreeNode> generateTrees(int start,int end){             \\n        List<TreeNode> trees = new ArrayList<TreeNode>();\\n        if(start>end){  trees.add(null); return trees;}\\n    \\n        for(int rootValue=start;rootValue<=end;rootValue++){\\n            List<TreeNode> leftSubTrees=generateTrees(start,rootValue-1);\\n            List<TreeNode> rightSubTrees=generateTrees(rootValue+1,end);\\n    \\n            for(TreeNode leftSubTree:leftSubTrees){\\n                for(TreeNode rightSubTree:rightSubTrees){\\n                    TreeNode root=new TreeNode(rootValue);\\n                    root.left=leftSubTree;\\n                    root.right=rightSubTree;\\n                    trees.add(root);\\n                }\\n            }\\n        }\\n        return trees;\\n    }\\n\\n\\n\\nThen @6219221 reminded me it is unnecessary to create the BSTs with all brand new nodes. \\nAssume you have a list of all BSTs with values from 1 to n-1, every possible way to insert value n only involves changing the right tree (root inclusive) because n is always greater than root.val and the left subtree structure is fixed. So all we gotta do is to create a new copy of the right part of the tree and point the new root.left to the original left subtree. This way we reuse the left tree, which saves time and space.\\n\\nHow to insert Node n into the right subtree?\\nGiven any BST on the n - 1 level, it will be only valid to put n on the root.right, root.right.right or root.right.....right locations and then move the right subtree of n.right...right to become the left child of n, in order to keep n on the right-most position as the greatest value in the tree.\\n\\nHere is my implementation. Note that I do the dp from [n] back to [n to 1]. Therefore all the right subtree structures are fixed and new values are inserted into the left side, opposite to making BSTs from 1 to [1 to n].\\n\\n        public List<TreeNode> generateTrees(int n) {\\n            List<TreeNode> res = new ArrayList<>();\\n            res.add(null);\\n            for(; n > 0; n--) {\\n                List<TreeNode> next = new ArrayList<>();\\n                for(TreeNode node: res) {\\n                    //the special case when Node(n) is root of new tree\\n                    TreeNode root = new TreeNode(n); \\n                    root.right = node;\\n                    next.add(root);\\n                   //while loop inserts new value to every possible position into the left tree side\\n                    while(node != null) {\\n                        TreeNode cRoot = new TreeNode(root.right.val);\\n                        //clone left subtree\\n                        cRoot.left = copyTree(root.right.left);\\n                        //reusing - point new root.right to the original right subtree\\n                        cRoot.right = root.right.right;\\n                        //curr is the cutoff node whose right child will be replaced by the new n \\n                        TreeNode curr = getValNode(cRoot, node.val); \\n                        //place n as curr's right child, make curr's original right child as the left child of n.\\n                        TreeNode tmp = curr.left;\\n                        curr.left = new TreeNode(n);\\n                        curr.left.right = tmp;\\n\\n                        next.add(cRoot);\\n                        node = node.left;\\n                    }\\n                }\\n                res = next;\\n            }\\n            return res;\\n        }\\n        private TreeNode getValNode(TreeNode n, int val) { //find the cutoff node in the new tree\\n            while(n != null) {\\n                if(n.val == val) break;\\n                n = n.left;\\n            }\\n            return n;\\n        }\\n\\n        private TreeNode copyTree(TreeNode root) { //clone the right subtree\\n            if(root == null) return null;\\n            TreeNode cRoot = new TreeNode(root.val);\\n            cRoot.left = copyTree(root.left);\\n            cRoot.right = copyTree(root.right);\\n            return cRoot;\\n        }"
		},
		{
			"lc_ans_id":"31563",
			"view":"5093",
			"top":"6",
			"title":"My Accepted C++ solution (recursive, less than 30 lines)",
			"vote":"24",
			"content":"**explaination:**\\nGiven a tree which n nodes, it has the follwing form: \\n(0)root(n-1)\\n(1)root(n-2)\\n(2)root(n-3)\\nwhere (x) denotes the trees with x  nodes.\\n\\nNow take n=3 for example. Given n=3, we have [1 2 3] in which each of them can be used as the tree root.\\n\\nwhen root=1: [1 # 2 # 3]; [1 # 3 2];\\nwhen root=2: [2 1 3]; \\nwhen root=3: (similar with the situations when root=1.)\\n\\nThus, if we write a recursive function who generates a group of trees in which the numbers range from *f* to *t*, we have to generate the left trees and right trees of each tree in the vector. \\n\\nI give the following recursive code and expect to see non-recursive ones. please! \\n\\n**code:**\\n\\n    vector<TreeNode *> generateTree(int from, int to)\\n    {\\n        vector<TreeNode *> ret;\\n        if(to - from < 0) ret.push_back(0);\\n        if(to - from == 0) ret.push_back(new TreeNode(from));\\n        if(to - from > 0)\\n        {\\n            for(int i=from; i<=to; i++)\\n            {\\n                vector<TreeNode *> l = generateTree(from, i-1);\\n                vector<TreeNode *> r = generateTree(i+1, to);\\n\\n                for(int j=0; j<l.size(); j++)\\n                {\\n                    for(int k=0; k<r.size(); k++)\\n                    {\\n                        TreeNode * h = new TreeNode (i);\\n                        h->left = l[j];\\n                        h->right = r[k];\\n                        ret.push_back(h);\\n                    }\\n                }\\n            }\\n        }\\n        return ret;\\n    }\\n    \\n    vector<TreeNode *> generateTrees(int n) {\\n        return generateTree(1, n);\\n    }"
		},
		{
			"lc_ans_id":"31597",
			"view":"2351",
			"top":"7",
			"title":"30 ms c++ solution",
			"vote":"16",
			"content":"    /**\\n     * Definition for binary tree\\n     * struct TreeNode {\\n     *     int val;\\n     *     TreeNode *left;\\n     *     TreeNode *right;\\n     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n     * };\\n     */\\n    class Solution {\\n    public:\\n        vector<TreeNode *> generateTrees(int n) {\\n            return helper(1,n);\\n        }\\n        \\n        vector<TreeNode*> helper(int s, int e) {\\n            if (s > e) {\\n                 return vector<TreeNode*>(1,NULL);\\n            }\\n            \\n            vector<TreeNode*> result;\\n            for (int i=s; i <= e; ++i) {\\n                vector<TreeNode*> left, right;\\n                    left = helper(s,i-1);\\n                    right = helper(i+1,e);\\n                    for (int j = 0; j < left.size(); ++j) {\\n                        for (int k = 0; k < right.size(); ++k) {\\n                            TreeNode* root = new TreeNode(i);\\n                            root->left = left[j];\\n                            root->right = right[k];\\n                            result.push_back(root);\\n                        }\\n                    }\\n            }\\n            \\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"31592",
			"view":"2136",
			"top":"8",
			"title":"Recursive python solution",
			"vote":"15",
			"content":"    class Solution(object):\\n        def generateTrees(self, n):\\n            \"\"\"\\n            :type n: int\\n            :rtype: List[TreeNode]\\n            \"\"\"\\n            if n == 0:\\n                return [[]]\\n            return self.dfs(1, n+1)\\n            \\n        def dfs(self, start, end):\\n            if start == end:\\n                return None\\n            result = []\\n            for i in xrange(start, end):\\n                for l in self.dfs(start, i) or [None]:\\n                    for r in self.dfs(i+1, end) or [None]:\\n                        node = TreeNode(i)\\n                        node.left, node.right  = l, r\\n                        result.append(node)\\n            return result\\n\\nUse start/end instead of actual nodes to bosst the program."
		},
		{
			"lc_ans_id":"31575",
			"view":"1040",
			"top":"9",
			"title":"24ms c++ easy understanding solution",
			"vote":"11",
			"content":"    class Solution {\\n    private:\\n        vector<TreeNode*> helper(int start, int end){\\n            vector<TreeNode*> res;\\n            if(start > end) {\\n                res.push_back(NULL);\\n                return res;\\n            }\\n            for(int i = start; i <= end; i++){\\n                vector<TreeNode*> lefts = helper(start, i - 1);\\n                vector<TreeNode*> rights = helper(i + 1, end);\\n                for(int j = 0; j < (int)lefts.size(); j++){\\n                    for(int k = 0; k < (int)rights.size(); k++){\\n                        TreeNode* root = new TreeNode(i);\\n                        root->left = lefts[j];\\n                        root->right = rights[k];\\n                        res.push_back(root);\\n                    }\\n                }\\n            }\\n            return res;\\n        }\\n    public:\\n        vector<TreeNode*> generateTrees(int n) {\\n            if(n == 0) return vector<TreeNode*>(0);\\n            return helper(1,n);\\n        }\\n    };"
		}
	],
	"id":"95",
	"title":"Unique Binary Search Trees II",
	"content":"<p>Given an integer <i>n</i>, generate all structurally unique <b>BST's</b> (binary search trees) that store values 1...<i>n</i>.</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <i>n</i> = 3, your program should return all 5 unique BST's shown below.\r\n\r\n<pre>\r\n   1         3     3      2      1\r\n    \\       /     /      / \\      \\\r\n     3     2     1      1   3      2\r\n    /     /       \\                 \\\r\n   2     1         2                 3\r\n</pre>\r\n</p>",
	"frequency":"347",
	"ac_num":"95778"
}