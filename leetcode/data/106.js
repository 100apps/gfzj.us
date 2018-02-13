{
	"difficulty":"2",
	"submit_num":"304362",
	"show_id":"106",
	"leetcode_id":"106",
	"answers":[
		{
			"lc_ans_id":"34782",
			"view":"25820",
			"top":"0",
			"title":"My recursive Java code with O(n) time and O(n) space",
			"vote":"73",
			"content":"The the basic idea is to take the last element in postorder array as the root, find the position of the root in the inorder array; then locate the range for left sub-tree and right sub-tree and do recursion. Use a HashMap to record the index of root in the inorder array.\\n\\n    public TreeNode buildTreePostIn(int[] inorder, int[] postorder) {\\n    \\tif (inorder == null || postorder == null || inorder.length != postorder.length)\\n    \\t\\treturn null;\\n    \\tHashMap<Integer, Integer> hm = new HashMap<Integer,Integer>();\\n    \\tfor (int i=0;i<inorder.length;++i)\\n    \\t\\thm.put(inorder[i], i);\\n    \\treturn buildTreePostIn(inorder, 0, inorder.length-1, postorder, 0, \\n                              postorder.length-1,hm);\\n    }\\n    \\n    private TreeNode buildTreePostIn(int[] inorder, int is, int ie, int[] postorder, int ps, int pe, \\n                                     HashMap<Integer,Integer> hm){\\n    \\tif (ps>pe || is>ie) return null;\\n    \\tTreeNode root = new TreeNode(postorder[pe]);\\n    \\tint ri = hm.get(postorder[pe]);\\n    \\tTreeNode leftchild = buildTreePostIn(inorder, is, ri-1, postorder, ps, ps+ri-is-1, hm);\\n    \\tTreeNode rightchild = buildTreePostIn(inorder,ri+1, ie, postorder, ps+ri-is, pe-1, hm);\\n    \\troot.left = leftchild;\\n    \\troot.right = rightchild;\\n    \\treturn root;\\n    }"
		},
		{
			"lc_ans_id":"34803",
			"view":"6993",
			"top":"1",
			"title":"Sharing my straightforward recursive solution",
			"vote":"32",
			"content":"    TreeNode *buildTree(vector<int> &inorder, vector<int> &postorder) {\\n        return create(inorder, postorder, 0, inorder.size() - 1, 0, postorder.size() - 1);\\n    }\\n    \\n    TreeNode* create(vector<int> &inorder, vector<int> &postorder, int is, int ie, int ps, int pe){\\n        if(ps > pe){\\n            return nullptr;\\n        }\\n        TreeNode* node = new TreeNode(postorder[pe]);\\n        int pos;\\n        for(int i = is; i <= ie; i++){\\n            if(inorder[i] == node->val){\\n                pos = i;\\n                break;\\n            }\\n        }\\n        node->left = create(inorder, postorder, is, pos - 1, ps, ps + pos - is - 1);\\n        node->right = create(inorder, postorder, pos + 1, ie, pe - ie + pos, pe - 1);\\n        return node;\\n    }\\n\\nActually, this problem is pretty similar as the previous one. \\n\\n[Here is a like to that solution. ][1]\\n\\n\\n  [1]: https://oj.leetcode.com/discuss/18101/sharing-my-straightforward-recursive-solution"
		},
		{
			"lc_ans_id":"34849",
			"view":"14582",
			"top":"2",
			"title":"My comprehension of O(n) solution from @hongzhi",
			"vote":"32",
			"content":"Below is the O(n) solution from @hongzhi but that discuss is closed now 'cause @hongzhi says little about his code. \\n\\nhttps://oj.leetcode.com/discuss/6334/here-is-my-o-n-solution-is-it-neat\\n\\nI've modified some of and tried this code and got AC.\\nJust share about some comprehension about his code.\\n\\nI've modified vtn(vector) to stn(stack) in that **stack** is probably what this algs means and needs.\\n\\nWhat matters most is the meaning of *stn*. \\n\\nOnly nodes whoes left side **hasn't been** handled will be pushed into *stn*.\\n\\nAnd inorder is organized as (inorder of left) root (inorder of right),\\n\\nAnd postorder is as (postorder of left) (postorder of right) root.\\n\\nSo at the very begin, we only have root in stn and we check if *inorder.back() == root->val* and in most cases it's **false**(see Note 1). Then we make this node root's right sub-node and push it into stn. \\n\\n**Note 1: this is actually *(inorder of right).back() == (postorder of right).back()*, so if only there's no right subtree or the answer will always be false.**\\n\\n**Note 2: we delete one node from *postorder* as we push one into stn.**\\n\\nNow we have [root, root's right] as stn and we check *inorder.back() == stn.top()->val* again. \\n\\n - **true** means *inorder.back()* is the root node and needs handled left case.\\n - **false** means *inorder.back()* is the next right sub-node\\n\\nSo when we encounter a true, we will cache *stn.top()* as p and **delete both nodes from inorder and stn**. \\n\\nThen we check inorder.size(), if there's no nodes left, it means p has no left node. \\n\\nElse the next node in inorder could be *p's left node* or *p's father* which equals to the now *stn.top()* (remember we popped *p* from *stn* above). \\n\\nIf the latter happens, it means *p* has **no left node** and we need to move on to *p's father(stn.top())*.\\n\\nIf the former happens, it means *p* has one left node and it's *postorder.back()*, so we put it to p's left and delete it from the *postorder* and push the left node into *stn* 'cause **it** should be the next check node as the *postorder* is organized as above.\\n\\nThat's all of it. The algs just build a binary tree. :)\\n\\nInform me if there's anything vague or wrong, I'm open to any suggestions.\\n\\n    class Solution {\\n    public:\\n        TreeNode *buildTree(vector<int> &inorder, vector<int> &postorder) {\\n            if(inorder.size() == 0)return NULL;\\n            TreeNode *p;\\n            TreeNode *root;\\n            stack<TreeNode *> stn;\\n            \\n            root = new TreeNode(postorder.back()); \\n            stn.push(root); \\n            postorder.pop_back(); \\n            \\n            while(true)\\n            {\\n                if(inorder.back() == stn.top()->val) \\n                {\\n                    p = stn.top();\\n                    stn.pop(); \\n                    inorder.pop_back(); \\n                    if(inorder.size() == 0) break;\\n                    if(stn.size() && inorder.back() == stn.top()->val)\\n                        continue;\\n                    p->left = new TreeNode(postorder.back()); \\n                    postorder.pop_back();\\n                    stn.push(p->left);\\n                }\\n                else \\n                {\\n                    p = new TreeNode(postorder.back());\\n                    postorder.pop_back();\\n                    stn.top()->right = p; \\n                    stn.push(p); \\n                }\\n            }\\n            return root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"34814",
			"view":"4815",
			"top":"3",
			"title":"A Python recursive solution",
			"vote":"28",
			"content":"    # Definition for a  binary tree node\\n    # class TreeNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.left = None\\n    #         self.right = None\\n    \\n    class Solution:\\n        # @param inorder, a list of integers\\n        # @param postorder, a list of integers\\n        # @return a tree node\\n        # 12:00\\n        def buildTree(self, inorder, postorder):\\n            if not inorder or not postorder:\\n                return None\\n            \\n            root = TreeNode(postorder.pop())\\n            inorderIndex = inorder.index(root.val)\\n    \\n            root.right = self.buildTree(inorder[inorderIndex+1:], postorder)\\n            root.left = self.buildTree(inorder[:inorderIndex], postorder)\\n    \\n            return root"
		},
		{
			"lc_ans_id":"34807",
			"view":"6797",
			"top":"4",
			"title":"Java iterative solution with explanation",
			"vote":"24",
			"content":"\\n    public TreeNode buildTree(int[] inorder, int[] postorder) {\\n        if (inorder.length == 0 || postorder.length == 0) return null;\\n        int ip = inorder.length - 1;\\n        int pp = postorder.length - 1;\\n        \\n        Stack<TreeNode> stack = new Stack<TreeNode>();\\n        TreeNode prev = null;\\n        TreeNode root = new TreeNode(postorder[pp]);\\n        stack.push(root);\\n        pp--;\\n        \\n        while (pp >= 0) {\\n            while (!stack.isEmpty() && stack.peek().val == inorder[ip]) {\\n                prev = stack.pop();\\n                ip--;\\n            }\\n            TreeNode newNode = new TreeNode(postorder[pp]);\\n            if (prev != null) {\\n                prev.left = newNode;\\n            } else if (!stack.isEmpty()) {\\n                TreeNode currTop = stack.peek();\\n                currTop.right = newNode;\\n            }\\n            stack.push(newNode);\\n            prev = null;\\n            pp--;\\n        }\\n        \\n        return root;\\n    }\\n\\nThis is my iterative solution, think about \"Constructing Binary Tree from inorder and preorder array\", the idea is quite similar. Instead of scanning the preorder array from beginning to end and using inorder array as a kind of mark, in this question, the key point is to scanning the postorder array from end to beginning and also use inorder array from end to beginning as a mark because the logic is more clear in this way. ***The core idea is: Starting from the last element of the postorder and inorder array, we put elements from postorder array to a stack and each one is the right child of the last one until an element in postorder array is equal to the element on the inorder array. Then, we pop as many as elements we can from the stack and decrease the mark in inorder array until the peek() element is not equal to the mark value or the stack is empty. Then, the new element that we are gonna scan from postorder array is the left child of the last element we have popped out from the stack.***"
		},
		{
			"lc_ans_id":"34801",
			"view":"1260",
			"top":"5",
			"title":"Python short solution (recursively).",
			"vote":"17",
			"content":"        \\n    def buildTree(self, inorder, postorder):\\n        if inorder:\\n            ind = inorder.index(postorder.pop())\\n            root = TreeNode(inorder[ind])\\n            root.right = self.buildTree(inorder[ind+1:], postorder)\\n            root.left = self.buildTree(inorder[:ind], postorder)\\n            return root"
		},
		{
			"lc_ans_id":"34787",
			"view":"2233",
			"top":"6",
			"title":"Simple and clean Java solution with comments, recursive.",
			"vote":"16",
			"content":"    \\n    public TreeNode buildTree(int[] inorder, int[] postorder) {\\n        return buildTree(inorder, inorder.length-1, 0, postorder, postorder.length-1);\\n    }\\n\\n\\tprivate TreeNode buildTree(int[] inorder, int inStart, int inEnd, int[] postorder,\\n\\t\\t\\tint postStart) {\\n\\t\\tif (postStart < 0 || inStart < inEnd)\\n\\t\\t\\treturn null;\\n\\t\\t\\n\\t\\t//The last element in postorder is the root.\\n\\t\\tTreeNode root = new TreeNode(postorder[postStart]);\\n\\t\\t\\n\\t\\t//find the index of the root from inorder. Iterating from the end.\\n\\t\\tint rIndex = inStart;\\n\\t\\tfor (int i = inStart; i >= inEnd; i--) {\\n\\t\\t\\tif (inorder[i] == postorder[postStart]) {\\n\\t\\t\\t\\trIndex = i;\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t//build right and left subtrees. Again, scanning from the end to find the sections.\\n\\t\\troot.right = buildTree(inorder, inStart, rIndex + 1, postorder, postStart-1);\\n\\t\\troot.left = buildTree(inorder, rIndex - 1, inEnd, postorder, postStart - (inStart - rIndex) -1);\\n\\t\\treturn root;\\n\\t}"
		},
		{
			"lc_ans_id":"34963",
			"view":"4925",
			"top":"7",
			"title":"Here is my O(n) solution. Is it neat?",
			"vote":"15",
			"content":"    class Solution {\\n    public:\\n        TreeNode *buildTree(vector<int> &inorder, vector<int> &postorder) {\\n            if(inorder.size() == 0)return NULL;\\n            TreeNode* p;\\n            TreeNode* root;\\n            vector<int> vint;\\n            vector<TreeNode*> vtn;\\n            root = new TreeNode(postorder.back());\\n            vtn.push_back(root);\\n            postorder.pop_back();\\n            while(true)\\n            {\\n                if(inorder.back() == vtn.back()->val)\\n                {\\n                    p = vtn.back();\\n                    vtn.pop_back();\\n                    inorder.pop_back();\\n                    if(inorder.size() == 0) break;\\n    \\t\\t\\t\\tif(vtn.size())\\n    \\t\\t\\t\\t\\tif(inorder.back() == vtn.back()->val)continue;\\n                    p->left = new TreeNode(postorder.back());\\n    \\t\\t\\t\\tpostorder.pop_back();\\n                    vtn.push_back(p->left);\\n                }\\n                else\\n                {\\n                    p = new TreeNode(postorder.back());\\n                    postorder.pop_back();\\n                    vtn.back()->right = p;\\n                    vtn.push_back(p);\\n                }\\n            }\\n    \\t\\treturn root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"34911",
			"view":"2448",
			"top":"8",
			"title":"My C++ Solution",
			"vote":"12",
			"content":"    class Solution {\\n    \\n    public:\\n        TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {\\n            \\n            return helper(inorder,0,inorder.size(),postorder,0,postorder.size());\\n        }\\n    private:\\n        TreeNode* helper(vector<int>& inorder,int i,int j,vector<int>& postorder,int ii,int jj)\\n        {\\n            // \\u6bcf\\u6b21\\u53d6postorder\\u7684\\u6700\\u540e\\u4e00\\u4e2a\\u503cmid\\uff0c\\u5c06\\u5176\\u4f5c\\u4e3a\\u6811\\u7684\\u6839\\u8282\\u70b9\\n            // \\u7136\\u540e\\u4eceinroder\\u4e2d\\u627e\\u5230mid\\uff0c\\u5c06\\u5176\\u5206\\u5272\\u6210\\u4e3a\\u4e24\\u90e8\\u5206\\uff0c\\u5de6\\u8fb9\\u4f5c\\u4e3amid\\u7684\\u5de6\\u5b50\\u6811\\uff0c\\u53f3\\u8fb9\\u4f5c\\u4e3amid\\u7684\\u53f3\\u5b50\\u6811\\n            // tree:     8 4 10 3 6 9 11\\n            // Inorder   [3 4 6] 8 [9 10 11]\\n            // postorder [3 6 4]   [9 11 10] 8\\n    \\n            if(i >= j || ii >= jj)\\n                return NULL;\\n            \\n            int mid = postorder[jj - 1];\\n            \\n            auto f = find(inorder.begin() + i,inorder.begin() + j,mid);\\n            \\n            int dis = f - inorder.begin() - i;\\n            \\n            TreeNode* root = new TreeNode(mid);\\n            root -> left = helper(inorder,i,i + dis,postorder,ii,ii + dis);\\n            root -> right = helper(inorder,i + dis + 1,j,postorder,ii + dis,jj - 1);\\n            \\n            return root;\\n            \\n        }\\n    };"
		},
		{
			"lc_ans_id":"34799",
			"view":"891",
			"top":"9",
			"title":"C++ O(n) DFS solution beath 91% submissions",
			"vote":"11",
			"content":"Example\\n\\n           13\\n         /    \\\\\\n        2      3\\n       / \\\\    /\\n      5   6  7\\n            / \\\\\\n           8   9\\n                \\\\\\n                10\\n                /\\n              12\\n\\n    5,  2,  6,  13,  8,  7,  9,  12,  10,  3\\n    ---left--- root  ---------right---------\\n    \\n    5,  6,  2,  8,  12,  10,  9,  7,  3,  13\\n    ---left---\\t---------right---------- root \\n\\nCode\\n\\n    class Solution {\\n    private:\\n            unordered_map<int, int> inm; // inorder map [inorder[i], i]\\n    \\n    public:\\n        TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {\\n            int n = inorder.size(), i = 0;\\n            for(auto val: inorder) inm[val] = i++; // build inm for dfs \\n            \\n            return dfs(inorder, 0, n - 1, postorder, 0, n - 1);\\n        }\\n        \\n        TreeNode* dfs(vector<int>& inorder, int ileft, int iright, vector<int>& postorder, int pleft, int pright) {\\n            if(ileft > iright) return nullptr;\\n            \\n            int val = postorder[pright]; // root value\\n            TreeNode *root = new TreeNode(val);\\n            if(ileft == iright) return root;\\n            \\n            int iroot = inm[val];\\n            int nleft = iroot - ileft; // length of left subtree\\n            root->right = dfs(inorder, iroot + 1, iright, postorder, pleft + nleft, pright - 1);\\n            root->left = dfs(inorder, ileft, iroot - 1, postorder, pleft, pleft + nleft - 1);\\n            \\n            return root;\\n        }\\n    };"
		}
	],
	"id":"106",
	"title":"Construct Binary Tree from Inorder and Postorder Traversal",
	"content":"<p>Given inorder and postorder traversal of a tree, construct the binary tree.</p>\r\n\r\n<p><strong>Note:</strong><br />\r\nYou may assume that duplicates do not exist in the tree.</p>\r\n\r\n<p>For example, given</p>\r\n\r\n<pre>\r\ninorder =&nbsp;[9,3,15,20,7]\r\npostorder = [9,15,7,20,3]</pre>\r\n\r\n<p>Return the following binary tree:</p>\r\n\r\n<pre>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7\r\n</pre>\r\n",
	"frequency":"324",
	"ac_num":"99948"
}