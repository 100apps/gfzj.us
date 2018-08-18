{
	"difficulty":"2",
	"submit_num":"380854",
	"show_id":"105",
	"leetcode_id":"105",
	"answers":[
		{
			"lc_ans_id":"34538",
			"view":"37990",
			"top":"0",
			"title":"My Accepted Java Solution",
			"vote":"155",
			"content":"Hi guys, this is my Java solution. I read this [post][1], which is very helpful.\\n\\nThe basic idea is here:\\nSay we have 2 arrays, PRE and IN.\\nPreorder traversing implies that PRE[0] is the root node.\\nThen we can find this PRE[0] in IN, say it's IN[5].\\nNow we know that IN[5] is root, so we know that IN[0] - IN[4] is on the left side, IN[6] to the end is on the right side.\\nRecursively doing this on subarrays, we can build a tree out of it :)\\n\\nHope this helps.\\n\\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\\n        return helper(0, 0, inorder.length - 1, preorder, inorder);\\n    }\\n    \\n    public TreeNode helper(int preStart, int inStart, int inEnd, int[] preorder, int[] inorder) {\\n        if (preStart > preorder.length - 1 || inStart > inEnd) {\\n            return null;\\n        }\\n        TreeNode root = new TreeNode(preorder[preStart]);\\n        int inIndex = 0; // Index of current root in inorder\\n        for (int i = inStart; i <= inEnd; i++) {\\n            if (inorder[i] == root.val) {\\n                inIndex = i;\\n            }\\n        }\\n        root.left = helper(preStart + 1, inStart, inIndex - 1, preorder, inorder);\\n        root.right = helper(preStart + inIndex - inStart + 1, inIndex + 1, inEnd, preorder, inorder);\\n        return root;\\n    }\\n\\n\\n  [1]: http://leetcode.com/2011/04/construct-binary-tree-from-inorder-and-preorder-postorder-traversal.html"
		},
		{
			"lc_ans_id":"34555",
			"view":"26788",
			"top":"1",
			"title":"The iterative solution is easier than you think!",
			"vote":"81",
			"content":"I din't find iterative solutions discussed in the old Discuss. So, I thought, I will add my solution in here.\\n\\nThe idea is as follows: \\n\\n1) Keep pushing the nodes from the preorder into a stack (and keep making the tree by adding nodes to the left of the previous node) until the top of the stack matches the inorder. \\n\\n2) At this point, pop the top of the stack until the top does not equal inorder (keep a flag to note that you have made a pop). \\n\\n3) Repeat 1 and 2 until preorder is empty. The key point is that whenever the flag is set, insert a node to the right and reset the flag.\\n\\n\\n    class Solution {\\n    public:\\n        TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder) {\\n            \\n            if(preorder.size()==0)\\n                return NULL;\\n            \\n            stack<int> s;\\n            stack<TreeNode *> st;\\n            TreeNode *t,*r,*root;\\n            int i,j,f;\\n            \\n            f=i=j=0;\\n            s.push(preorder[i]);\\n            \\n            root = new TreeNode(preorder[i]);\\n            st.push(root);\\n            t = root;\\n            i++;\\n            \\n            while(i<preorder.size())\\n            {\\n                if(!st.empty() && st.top()->val==inorder[j])\\n                {\\n                    t = st.top();\\n                    st.pop();\\n                    s.pop();\\n                    f = 1;\\n                    j++;\\n                }\\n                else\\n                {\\n                    if(f==0)\\n                    {\\n                        s.push(preorder[i]);\\n                        t -> left = new TreeNode(preorder[i]);\\n                        t = t -> left;\\n                        st.push(t);\\n                        i++;\\n                    }\\n                    else \\n                    {\\n                        f = 0;\\n                        s.push(preorder[i]);\\n                        t -> right = new TreeNode(preorder[i]);\\n                        t = t -> right;\\n                        st.push(t);\\n                        i++;\\n                    }\\n                }\\n            }\\n            \\n            return root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"34579",
			"view":"7312",
			"top":"2",
			"title":"Python short recursive solution.",
			"vote":"59",
			"content":"        \\n    def buildTree(self, preorder, inorder):\\n        if inorder:\\n            ind = inorder.index(preorder.pop(0))\\n            root = TreeNode(inorder[ind])\\n            root.left = self.buildTree(preorder, inorder[0:ind])\\n            root.right = self.buildTree(preorder, inorder[ind+1:])\\n            return root"
		},
		{
			"lc_ans_id":"34562",
			"view":"12651",
			"top":"3",
			"title":"Sharing my straightforward recursive solution",
			"vote":"52",
			"content":"    TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder) {\\n        return create(preorder, inorder, 0, preorder.size() - 1, 0, inorder.size() - 1);\\n    }\\n    \\n    TreeNode* create(vector<int>& preorder, vector<int>& inorder, int ps, int pe, int is, int ie){\\n        if(ps > pe){\\n            return nullptr;\\n        }\\n        TreeNode* node = new TreeNode(preorder[ps]);\\n        int pos;\\n        for(int i = is; i <= ie; i++){\\n            if(inorder[i] == node->val){\\n                pos = i;\\n                break;\\n            }\\n        }\\n        node->left = create(preorder, inorder, ps + 1, ps + pos - is, is, pos - 1);\\n        node->right = create(preorder, inorder, pe - ie + pos + 1, pe, pos + 1, ie);\\n        return node;\\n    }\\n\\nThe first element in preorder array can divide inorder array into two parts. Then we can divide preorder array into two parts. Make this element a node. And the left sub-tree of this node is the left part, right sub-tree of this node is the right part. This problem can be solved following this logic."
		},
		{
			"lc_ans_id":"34541",
			"view":"4571",
			"top":"4",
			"title":"5ms Java Clean Solution with Caching",
			"vote":"31",
			"content":"In this questions, most of people just loop through `inorder[]` to find the root. However, by caching positions of `inorder[]` indices using a **HashMap**, the run time can drop from `20ms` to `5ms`. \\n\\nHere is my 5ms AC solution:\\n\\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\\n        Map<Integer, Integer> inMap = new HashMap<Integer, Integer>();\\n        \\n        for(int i = 0; i < inorder.length; i++) {\\n            inMap.put(inorder[i], i);\\n        }\\n\\n        TreeNode root = buildTree(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, inMap);\\n        return root;\\n    }\\n    \\n    public TreeNode buildTree(int[] preorder, int preStart, int preEnd, int[] inorder, int inStart, int inEnd, Map<Integer, Integer> inMap) {\\n        if(preStart > preEnd || inStart > inEnd) return null;\\n        \\n        TreeNode root = new TreeNode(preorder[preStart]);\\n        int inRoot = inMap.get(root.val);\\n        int numsLeft = inRoot - inStart;\\n        \\n        root.left = buildTree(preorder, preStart + 1, preStart + numsLeft, inorder, inStart, inRoot - 1, inMap);\\n        root.right = buildTree(preorder, preStart + numsLeft + 1, preEnd, inorder, inRoot + 1, inEnd, inMap);\\n        \\n        return root;\\n    }"
		},
		{
			"lc_ans_id":"34557",
			"view":"3860",
			"top":"5",
			"title":"My neat C++ solution",
			"vote":"25",
			"content":"    class Solution {\\n    \\n    public:\\n        /* from Preorder and Inorder Traversal */\\n        TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\\n    \\n            return helper(preorder,0,preorder.size(),inorder,0,inorder.size());\\n        \\n        }\\n    \\n        TreeNode* helper(vector<int>& preorder,int i,int j,vector<int>& inorder,int ii,int jj)\\n        {\\n            // tree        8 4 5 3 7 3\\n            // preorder    8 [4 3 3 7] [5]\\n            // inorder     [3 3 4 7] 8 [5]\\n    \\n            // \\u6bcf\\u6b21\\u4ece preorder \\u5934\\u90e8\\u53d6\\u4e00\\u4e2a\\u503c mid\\uff0c\\u4f5c\\u4e3a\\u6811\\u7684\\u6839\\u8282\\u70b9\\n            // \\u68c0\\u67e5 mid \\u5728 inorder \\u4e2d \\u7684\\u4f4d\\u7f6e\\uff0c\\u5219 mid \\u524d\\u9762\\u90e8\\u5206\\u5c06\\u4f5c\\u4e3a \\u6811\\u7684\\u5de6\\u5b50\\u6811\\uff0c\\u53f3\\u90e8\\u5206\\u4f5c\\u4e3a\\u6811\\u7684\\u53f3\\u5b50\\u6811\\n    \\n            if(i >= j || ii >= j)\\n                return NULL;\\n    \\n            int mid = preorder[i];\\n            auto f = find(inorder.begin() + ii,inorder.begin() + jj,mid);\\n    \\n            int dis = f - inorder.begin() - ii;\\n    \\n            TreeNode* root = new TreeNode(mid);\\n            root -> left = helper(preorder,i + 1,i + 1 + dis,inorder,ii,ii + dis);\\n            root -> right = helper(preorder,i + 1 + dis,j,inorder,ii + dis + 1,jj);\\n            return root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"34551",
			"view":"5793",
			"top":"6",
			"title":"My O(n)(19ms) solution without recusion. Hope help you!",
			"vote":"23",
			"content":"    class Solution {\\n    public:\\n        TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder) {\\n            TreeNode *root=NULL; stack<TreeNode *> MyData;\\n            if(preorder.empty()) return root;\\n            root = new TreeNode(preorder[0]);\\n            MyData.push(root); int index = 0;\\n           \\tfor(int i=1; i<=preorder.size(); i++) {\\n           \\t\\tTreeNode *cur = MyData.top();\\n           \\t\\tif((MyData.top()->val)!=inorder[index]) {\\n           \\t\\t\\tcur->left = new TreeNode(preorder[i]);\\n           \\t\\t\\tMyData.push(cur->left);\\n           \\t\\t} else {\\n           \\t\\t\\twhile(!MyData.empty() && ((MyData.top()->val)==inorder[index])) {\\n           \\t\\t\\t\\tcur=MyData.top(); MyData.pop(); index++; \\n           \\t\\t\\t}\\n           \\t\\t\\tif(index<inorder.size()) {\\n           \\t\\t\\t\\tcur->right = new TreeNode(preorder[i]);\\n           \\t\\t\\t\\tMyData.push(cur->right);\\n           \\t\\t\\t} \\n           \\t\\t}  \\n           \\t}\\n           \\treturn root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"34744",
			"view":"1575",
			"top":"7",
			"title":"Concise Java Recursive Solution",
			"vote":"17",
			"content":"    public TreeNode buildTree(int[] preorder, int[] inorder) {\\n    \\tif(preorder==null || inorder==null || inorder.length==0 || preorder.length==0) return null;\\n    \\tTreeNode root = new TreeNode(preorder[0]);\\n    \\tif(preorder.length==1) return root;\\n    \\tint breakindex = -1;\\n    \\tfor(int i=0;i<inorder.length;i++) { if(inorder[i]==preorder[0]) { breakindex=i; break;} }\\n    \\tint[] subleftpre  = Arrays.copyOfRange(preorder,1,breakindex+1);\\n    \\tint[] subleftin   = Arrays.copyOfRange(inorder,0,breakindex);\\n    \\tint[] subrightpre = Arrays.copyOfRange(preorder,breakindex+1,preorder.length);\\n    \\tint[] subrightin  = Arrays.copyOfRange(inorder,breakindex+1,inorder.length);\\n    \\troot.left  = buildTree(subleftpre,subleftin);\\n    \\troot.right = buildTree(subrightpre,subrightin);\\n    \\treturn root;\\n    }\\n\\n\\n 1. The Root of the tree is the first element in Preorder Array.\\n 2. Find the position of the Root in Inorder Array.\\n 3. Elements to the left of Root element in Inorder Array are the left\\n    subtree.\\n 4. Elements to the right of Root element in Inorder Array are the right\\n    subtree.\\n 5. Call recursively buildTree on the subarray composed by the elements\\n    in the left subtree. Attach returned left subtree root as left child\\n    of Root node.\\n 6. Call recursively buildTree on the subarray composed by the elements\\n    in the right subtree. Attach returned right subtree root as right\\n    child of Root node.\\n 7. return Root."
		},
		{
			"lc_ans_id":"34543",
			"view":"1926",
			"top":"8",
			"title":"Simple O(n) without map",
			"vote":"15",
			"content":"**Javascript solution:**\\n\\n    var buildTree = function(preorder, inorder) {\\n        p = i = 0\\n        build = function(stop) {\\n            if (inorder[i] != stop) {\\n                var root = new TreeNode(preorder[p++])\\n                root.left = build(root.val)\\n                i++\\n                root.right = build(stop)\\n                return root\\n            }\\n            return null\\n        }\\n        return build()\\n    };\\n\\n**Python solution:**\\n\\n    def buildTree(self, preorder, inorder):\\n        def build(stop):\\n            if inorder and inorder[-1] != stop:\\n                root = TreeNode(preorder.pop())\\n                root.left = build(root.val)\\n                inorder.pop()\\n                root.right = build(stop)\\n                return root\\n        preorder.reverse()\\n        inorder.reverse()\\n        return build(None)\\n\\nNote: See [MissMary's answer](https://leetcode.com/discuss/40381/simple-o-n-without-map?show=44432#a44432) for a possible improvement and my thoughts about it.\\n\\n---\\n\\n**Explanation/Discussion:**\\n\\nConsider this input:\\n\\n    preorder: [1, 2, 4, 5, 3, 6]\\n    inorder: [4, 2, 5, 1, 6, 3]\\n\\nThe obvious way to build the tree is:\\n\\n 1. Use the first element of `preorder`, the `1`, as root.\\n 2. Search it in `inorder`.\\n 3. Split `inorder` by it, here into `[4, 2, 5]` and `[6, 3]`.\\n 4. Split the rest of  `preorder` into two parts as large as the `inorder` parts, here into `[2, 4, 5]` and `[3, 6]`.\\n 5. Use `preorder = [2, 4, 5]` and `inorder = [4, 2, 5]` to add the left subtree.\\n 6. Use `preorder = `[3, 6]` and `inorder = `[6, 3]` to add the right subtree.\\n\\nBut consider the worst case for this: A tree that's not balanced but is just a straight line to the left. Then inorder is the reverse of preorder, and already the cost of step 2, searching in `inorder`, is O(n^2) overall. Also, depending on how you \"split\" the arrays, you're looking at O(n^2) runtime and possibly O(n^2) space for that as well.\\n\\nYou can bring the runtime for searching down to O(n) by building a map from value to index before you start the main work, and I've seen several solutions do that. But that is O(n) additional space, and also the splitting problems remain. To fix those, you can use pointers into `preorder` and `inorder` instead of splitting them. And when you're doing that, you don't need the value-to-index map, either.\\n\\nConsider the example again. Instead of finding the `1` in `inorder`, splitting the arrays into parts and recursing on them, just recurse on the full remaining arrays and **stop** when you come across the `1` in `inorder`. That's what my above solution does. Each recursive call gets told where to stop, and it tells its subcalls where to stop. It gives its own root value as stopper to its left subcall and its parent`s stopper as stopper to its right subcall.\\n\\n**Language details:**\\n\\nSmall trick in my Javascript solution: The top-most call doesn't explicitly get a stopper value, so its `stop` is `undefined`. Which is good, because that's also what `inorder[i]` is when we have consumed all values, i.e., when `i` is `inorder.length`.\\n\\nAbout the Python solution: I'm not sure there's a good way to have those `p` and `i` pointers that I use in my Javascript solution, so instead I opted for popping elements from `preorder` and `inorder`. Since popping from the front with `pop(0)` is expensive O(n), I reverse them before I start so I can use the cheap O(1) popping from the back."
		},
		{
			"lc_ans_id":"34707",
			"view":"2033",
			"top":"9",
			"title":"Recursive solution in Java",
			"vote":"15",
			"content":"    \\n    public class Solution {\\n        public TreeNode buildTree(int[] preorder, int[] inorder) {\\n            if (preorder.length == 0) return null;\\n            return buildTree(preorder, inorder, 0, 0, inorder.length - 1);\\n        }\\n        \\n        private TreeNode buildTree(int[] preorder, int[] inorder, int preorderIndex, int start, int end) {\\n            if (start > end) return null;\\n            TreeNode node = new TreeNode(preorder[preorderIndex]);\\n            int inorderIndex = findInorderIndex(inorder, start, end, preorder[preorderIndex]);\\n            int leftTreeSize = inorderIndex - start;\\n            int rightTreeSize = end - inorderIndex;\\n            node.left = buildTree(preorder, inorder, preorderIndex + 1, start, inorderIndex - 1);\\n            node.right = buildTree(preorder, inorder, preorderIndex + leftTreeSize + 1, inorderIndex + 1, end);\\n            return node;\\n        }\\n        \\n        private int findInorderIndex(int[] inorder, int start, int end, int key) {\\n            for (int i = start; i <= end; i++) {\\n                if (inorder[i] == key) return i;\\n            }\\n            return -1;\\n        }\\n    }\\n\\nThis question is similar to the one using postorder and inorder arrays. Once one notices that the first element of preorder is the root node, the rest is fairly straightforward."
		}
	],
	"id":"105",
	"title":"Construct Binary Tree from Preorder and Inorder Traversal",
	"content":"<p>Given preorder and inorder traversal of a tree, construct the binary tree.</p>\r\n\r\n<p><strong>Note:</strong><br />\r\nYou may assume that duplicates do not exist in the tree.</p>\r\n\r\n<p>For example, given</p>\r\n\r\n<pre>\r\npreorder =&nbsp;[3,9,20,15,7]\r\ninorder = [9,3,15,20,7]</pre>\r\n\r\n<p>Return the following binary tree:</p>\r\n\r\n<pre>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7</pre>\r\n",
	"frequency":"433",
	"ac_num":"126358"
}