{
	"difficulty":"2",
	"submit_num":"75216",
	"show_id":"450",
	"leetcode_id":"450",
	"answers":[
		{
			"lc_ans_id":"93296",
			"view":"22275",
			"top":"0",
			"title":"Recursive Easy to Understand Java Solution",
			"vote":"124",
			"content":"Steps:\\n1. Recursively find the node that has the same value as the key, while setting the left/right nodes equal to the returned subtree\\n2. Once the node is found, have to handle the below 4 cases\\n* node doesn't have left or right - return null\\n* node only has left subtree- return the left subtree\\n* node only has right subtree- return the right subtree\\n* node has both left and right - find the minimum value in the right subtree, set that value to the currently found node, then recursively delete the minimum value in the right subtree\\n\\n```\\npublic TreeNode deleteNode(TreeNode root, int key) {\\n    if(root == null){\\n        return null;\\n    }\\n    if(key < root.val){\\n        root.left = deleteNode(root.left, key);\\n    }else if(key > root.val){\\n        root.right = deleteNode(root.right, key);\\n    }else{\\n        if(root.left == null){\\n            return root.right;\\n        }else if(root.right == null){\\n            return root.left;\\n        }\\n        \\n        TreeNode minNode = findMin(root.right);\\n        root.val = minNode.val;\\n        root.right = deleteNode(root.right, root.val);\\n    }\\n    return root;\\n}\\n\\nprivate TreeNode findMin(TreeNode node){\\n    while(node.left != null){\\n        node = node.left;\\n    }\\n    return node;\\n}\\n```"
		},
		{
			"lc_ans_id":"93298",
			"view":"7322",
			"top":"1",
			"title":"Iterative solution in Java, O(h) time and O(1) space",
			"vote":"34",
			"content":"```\\n    private TreeNode deleteRootNode(TreeNode root) {\\n        if (root == null) {\\n            return null;\\n        }\\n        if (root.left == null) {\\n            return root.right;\\n        }\\n        if (root.right == null) {\\n            return root.left;\\n        }\\n        TreeNode next = root.right;\\n        TreeNode pre = null;\\n        for(; next.left != null; pre = next, next = next.left);\\n        next.left = root.left;\\n        if(root.right != next) {\\n            pre.left = next.right;\\n            next.right = root.right;\\n        }\\n        return next;\\n    }\\n    \\n    public TreeNode deleteNode(TreeNode root, int key) {\\n        TreeNode cur = root;\\n        TreeNode pre = null;\\n        while(cur != null && cur.val != key) {\\n            pre = cur;\\n            if (key < cur.val) {\\n                cur = cur.left;\\n            } else if (key > cur.val) {\\n                cur = cur.right;\\n            }\\n        }\\n        if (pre == null) {\\n            return deleteRootNode(cur);\\n        }\\n        if (pre.left == cur) {\\n            pre.left = deleteRootNode(cur);\\n        } else {\\n            pre.right = deleteRootNode(cur);\\n        }\\n        return root;\\n    }\\n```\\nFind the node to be removed and its parent using binary search, and then use deleteRootNode to delete the root node of the subtree and return the new root node. This idea is taken from https://discuss.leetcode.com/topic/67309/an-easy-understanding-o-h-time-o-1-space-java-solution.\\n\\nI'd also like to share my thinkings of the other solutions I've seen. \\n1. There are many solutions that got high votes using recursive approach,  including the ones from the Princeton's Algorithm and Data Structure book. Don't you notice that recursive approach always takes extra space? Why not consider the iterative approach first?\\n2. Some solutions swap the values instead of swapping the nodes. In reality, the value of a node could be more complicated than just a single integer, so copying the contents might take much more time than just copying the reference. \\n3. As for the case when both children of the node to be deleted are not null, I transplant the successor to replace the node to be deleted, which is a bit harder to implement than just transplant the left subtree of the node to the left child of its successor.  The former way is used in many text books too. Why? My guess is that transplanting the successor can keep the height of the tree almost unchanged, while transplanting the whole left subtree could increase the height and thus making the tree more unbalanced."
		},
		{
			"lc_ans_id":"93293",
			"view":"6023",
			"top":"2",
			"title":"Very Concise C++ Solution for General Binary Tree not only BST",
			"vote":"20",
			"content":"```\\nclass Solution {\\npublic:\\n    TreeNode* deleteNode(TreeNode* root, int key) {\\n        if (!root) return nullptr;\\n        if (root->val == key) {\\n            if (!root->right) {\\n                TreeNode* left = root->left;\\n                delete root;\\n                return left;\\n            }\\n            else {\\n                TreeNode* right = root->right;\\n                while (right->left)\\n                    right = right->left;\\n                swap(root->val, right->val);    \\n            }\\n        }\\n        root->left = deleteNode(root->left, key);\\n        root->right = deleteNode(root->right, key);\\n        return root;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"93328",
			"view":"3525",
			"top":"3",
			"title":"Java Easy to Understand Solution",
			"vote":"11",
			"content":"```\\n    public TreeNode deleteNode(TreeNode root, int key) {\\n        if (root == null) return root;\\n        if (root.val > key) root.left = deleteNode(root.left, key);\\n        else if (root.val < key) root.right = deleteNode(root.right, key);\\n        else { // found node to be deleted\\n            if (root.left == null) return root.right;\\n            else if (root.right == null) return root.left;\\n            // node with two children, replace with the inOrder successor(minVal) in the right subtree\\n            root.val = getMin(root.right);\\n            root.right = deleteNode(root.right, root.val);\\n        }\\n        return root;\\n    }\\n    private int getMin(TreeNode root) {\\n        while (root.left != null) {root = root.left;}\\n        return root.val;\\n    }\\n```"
		},
		{
			"lc_ans_id":"93374",
			"view":"757",
			"top":"4",
			"title":"Simple Python Solution With Explanation",
			"vote":"10",
			"content":"```\\n   def deleteNode(root, key):\\n\\tif not root: # if root doesn't exist, just return it\\n\\t\\treturn root\\n\\tif root.val > key: # if key value is less than root value, find the node in the left subtree\\n\\t\\troot.left = deleteNode(root.left, key)\\n\\telif root.val < key: # if key value is greater than root value, find the node in right subtree\\n\\t\\troot.right= deleteNode(root.right, key)\\n\\telse: #if we found the node (root.value == key), start to delete it\\n\\t\\tif not root.right: # if it doesn't have right children, we delete the node then new root would be root.left\\n\\t\\t\\treturn root.left\\n\\t\\tif not root.left: # if it has no left children, we delete the node then new root would be root.right\\n\\t\\t\\treturn root.right\\n               # if the node have both left and right children,  we replace its value with the minmimum value in the right subtree and then delete that minimum node in the right subtree\\n\\t\\ttemp = root.right\\n\\t\\tmini = temp.val\\n\\t\\twhile temp.left:\\n\\t\\t\\ttemp = temp.left\\n\\t\\t\\tmini = temp.val\\n\\t\\troot.val = mini # replace value\\n\\t\\troot.right = deleteNode(root.right,root.val) # delete the minimum node in right subtree\\n\\treturn root\\n\\n```"
		},
		{
			"lc_ans_id":"93391",
			"view":"1499",
			"top":"5",
			"title":"Error in Test Case? : Last executed input: []",
			"vote":"10",
			"content":"Something went wrong in test case with input only \"[]\", should be both root and key."
		},
		{
			"lc_ans_id":"93351",
			"view":"1318",
			"top":"6",
			"title":"Bottom-up Recursive Python Solution. O(log(n)) Time.",
			"vote":"9",
			"content":"Idea:\\n1. When found the node, put right child of the node to the right of the right most leaf node of left child. That way the values are still in order.\\n2. Return the left child of the node(skip root, a.k.a delete it). If the node doesn't have left child, return right child.\\n3. Otherwise do binary search. If key < root.val, change left child to the returned new root. Do right child if key > root.val.\\n\\nThis solution always runs in O(log(n)) time since when it finds the node to delete, it goes to the right most leaf of the left sub-tree to put right sub-tree of the node there.\\n\\n```Python\\nclass Solution(object):\\n    def deleteNode(self, root, key):\\n        \"\"\"\\n        :type root: TreeNode\\n        :type key: int\\n        :rtype: TreeNode\\n        \"\"\"\\n        if not root: return None\\n        \\n        if root.val == key:\\n            if root.left:\\n                # Find the right most leaf of the left sub-tree\\n                left_right_most = root.left\\n                while left_right_most.right:\\n                    left_right_most = left_right_most.right\\n                # Attach right child to the right of that leaf\\n                left_right_most.right = root.right\\n                # Return left child instead of root, a.k.a delete root\\n                return root.left\\n            else:\\n                return root.right\\n        # If left or right child got deleted, the returned root is the child of the deleted node.\\n        elif root.val > key:\\n            root.left = self.deleteNode(root.left, key)\\n        else:\\n            root.right = self.deleteNode(root.right, key)\\n            \\n        return root\\n```"
		},
		{
			"lc_ans_id":"93378",
			"view":"907",
			"top":"7",
			"title":"An easy-understanding O(h) time, O(1) space Java solution.",
			"vote":"9",
			"content":"*If the node is found, delete the node.*\\nWe need a function `deleteRoot` to delete the root from a BST.\\n* If `root==null`, then return `null`\\n* If `root.right==null`, then return `root.left`\\n* If `root.right!=null`, the the new root of the BST is root.right; And what we should do is to put root.left into this new BST. As all nodes in root.left is smaller than the new tree, we just need to find the *left-most* node.\\n\\n\\n```\\npublic class Solution {\\n    public TreeNode deleteNode(TreeNode root, int key) {\\n        if (root==null || root.val==key) return deleteRoot(root);\\n        TreeNode p=root;\\n        \\n        while (true) { // search the node\\n            if (key>p.val) {\\n                if (p.right==null || p.right.val==key) {\\n                    p.right=deleteRoot(p.right);\\n                    break;\\n                }\\n                p=p.right;\\n            }\\n            else {\\n                if (p.left==null || p.left.val==key) {\\n                    p.left=deleteRoot(p.left);\\n                    break;\\n                }\\n                p=p.left;\\n            }\\n        }\\n        return root;\\n    }\\n\\n    private TreeNode deleteRoot(TreeNode root) {\\n        if (root==null) return null;\\n        if (root.right==null) return root.left;\\n        TreeNode x=root.right; // root.right should be the new root\\n        while (x.left!=null) x=x.left; // find the left-most node\\n        x.left=root.left;\\n        return root.right;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"93344",
			"view":"179",
			"top":"8",
			"title":"Simplify corner cases via a dummy parent of the root",
			"vote":"3",
			"content":"We can quite simplify the logic by adding a dummy parent of the root. See the following concise iterative solution.\\n\\n```java\\npublic TreeNode deleteNode(TreeNode root, int key) {\\n    TreeNode dummyRoot = new TreeNode(0), x = root, p = dummyRoot;\\n    dummyRoot.left = root;\\n\\n    while(x != null && x.val != key) {\\n        p = x;\\n        if (key < x.val) x = x.left;\\n        else x = x.right;\\n    }\\n    if (x != null && x.val == key) {\\n        if (x.left != null && x.right != null) {\\n            p = x;\\n            TreeNode y = x.right;\\n            for(; y.left != null; p = y, y = y.left); // empty for-body\\n            x.val = y.val;\\n            x = y; // Instead of deleting x, we delete y.\\n        }\\n\\n        // Now, at least one child of x must be null.\\n        TreeNode child = x.left != null ? x.left : x.right;\\n        if (p.left == x) p.left = child;\\n        else p.right = child;\\n    }\\n    return dummyRoot.left;\\n}\\n```"
		},
		{
			"lc_ans_id":"93394",
			"view":"881",
			"top":"9",
			"title":"Concise and Clear C++ Solution",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    TreeNode* deleteNode(TreeNode* root, int key) {\\n        if (!root) return root;    \\n        if (root->val > key)\\n            root->left = deleteNode(root->left, key);\\n        else if (root->val < key)\\n            root->right = deleteNode(root->right, key);\\n        else {\\n            if (!root->left) {\\n                TreeNode* right = root->right;\\n                delete root;\\n                return right;\\n            }\\n            else if (!root->right) {\\n                TreeNode* left = root->left;\\n                delete root;\\n                return left;\\n            }\\n            else {\\n                TreeNode* successor = findMinNode(root->right); // find the inorder successor (the minimal node in right subtree)\\n                root->val = successor->val;\\n                root->right = deleteNode(root->right, successor->val);\\n            }\\n        }\\n        return root;\\n    }\\nprivate:\\n    TreeNode* findMinNode(TreeNode* root) {\\n        if (root->left) return findMinNode(root->left);\\n        return root;\\n    }\\n};\\n```"
		}
	],
	"id":"444",
	"title":"Delete Node in a BST",
	"content":"<p>Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.</p>\r\n\r\n<p>Basically, the deletion can be divided into two stages:\r\n<ol>\r\n<li>Search for a node to remove.</li>\r\n<li>If the node is found, delete the node.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Note:</b> Time complexity should be O(height of tree).</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nroot = [5,3,6,2,4,null,7]\r\nkey = 3\r\n\r\n    5\r\n   / \\\r\n  3   6\r\n / \\   \\\r\n2   4   7\r\n\r\nGiven key to delete is 3. So we find the node with value 3 and delete it.\r\n\r\nOne valid answer is [5,4,6,2,null,null,7], shown in the following BST.\r\n\r\n    5\r\n   / \\\r\n  4   6\r\n /     \\\r\n2       7\r\n\r\nAnother valid answer is [5,2,6,null,4,null,7].\r\n\r\n    5\r\n   / \\\r\n  2   6\r\n   \\   \\\r\n    4   7\r\n</pre>\r\n</p>",
	"frequency":"233",
	"ac_num":"28192"
}