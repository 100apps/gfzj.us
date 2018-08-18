{
	"difficulty":"1",
	"submit_num":"76859",
	"show_id":"501",
	"leetcode_id":"501",
	"answers":[
		{
			"lc_ans_id":"98101",
			"view":"32555",
			"top":"0",
			"title":"Proper O(1) space",
			"vote":"112",
			"content":"I've seen several solutions claimed to be O(1) space, but I disagree. They traverse the tree in in-order and keep track of the current set of modes (among other things). But that's not O(1) space, not even when disregarding recursion stack space (as explicitly allowed) and result space (not mentioned but reasonable). The set's contents aren't on stack space, so it can't be disregarded that way. And if the values are for example 1,2,3,4,...,n-2,n-1,n-1 (unique values followed by one double value), the set grows to &Omega;(n) and it can't be disregarded because the result only has size 1.\\n\\nI think the way to do it properly is to do two passes. One to find the highest number of occurrences of any value, and then a second pass to collect all values occurring that often. Any other ideas?\\n\\nHere's a (two-pass) solution that I think can rightfully be called O(1) space. Both passes keep track of the current value etc, and the second pass additionally collects the modes in the result array. I took the value handling out of the in-order traversal into its own function for clarity. Also, this way you could very easily replace my recursive in-order traversal with for example Morris traversal. Then you wouldn't even need to disregard the recursion stack space in order to claim O(1) extra space usage.\\n\\n```\\npublic class Solution {\\n    \\n    public int[] findMode(TreeNode root) {\\n        inorder(root);\\n        modes = new int[modeCount];\\n        modeCount = 0;\\n        currCount = 0;\\n        inorder(root);\\n        return modes;\\n    }\\n\\n    private int currVal;\\n    private int currCount = 0;\\n    private int maxCount = 0;\\n    private int modeCount = 0;\\n    \\n    private int[] modes;\\n\\n    private void handleValue(int val) {\\n        if (val != currVal) {\\n            currVal = val;\\n            currCount = 0;\\n        }\\n        currCount++;\\n        if (currCount > maxCount) {\\n            maxCount = currCount;\\n            modeCount = 1;\\n        } else if (currCount == maxCount) {\\n            if (modes != null)\\n                modes[modeCount] = currVal;\\n            modeCount++;\\n        }\\n    }\\n    \\n    private void inorder(TreeNode root) {\\n        if (root == null) return;\\n        inorder(root.left);\\n        handleValue(root.val);\\n        inorder(root.right);\\n    }\\n}\\n```\\n\\n**Edit:** Here's Morris traversal, just replace my previous `inorder` function with this. I hadn't realized it earlier, but having my separate `handleValue` function doesn't just nicely separate the traversal logic from this problem's logic, but it's also beneficial for Morris traversal because I'm calling `handleValue` from two different places in the code!\\n```\\n    private void inorder(TreeNode root) {\\n        TreeNode node = root;\\n        while (node != null) {\\n            if (node.left == null) {\\n                handleValue(node.val);\\n                node = node.right;\\n            } else {\\n                TreeNode prev = node.left;\\n                while (prev.right != null && prev.right != node)\\n                    prev = prev.right;\\n                if (prev.right == null) {\\n                    prev.right = node;\\n                    node = node.left;\\n                } else {\\n                    prev.right = null;\\n                    handleValue(node.val);\\n                    node = node.right;\\n                }\\n            }\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"98100",
			"view":"15386",
			"top":"1",
			"title":"Java 4ms Beats 100% Extra O(1) solution - No Map",
			"vote":"36",
			"content":"```\\npublic class Solution {\\n    Integer prev = null;\\n    int count = 1;\\n    int max = 0;\\n    public int[] findMode(TreeNode root) {\\n        if (root == null) return new int[0];\\n        \\n        List<Integer> list = new ArrayList<>();\\n        traverse(root, list);\\n        \\n        int[] res = new int[list.size()];\\n        for (int i = 0; i < list.size(); ++i) res[i] = list.get(i);\\n        return res;\\n    }\\n    \\n    private void traverse(TreeNode root, List<Integer> list) {\\n        if (root == null) return;\\n        traverse(root.left, list);\\n        if (prev != null) {\\n            if (root.val == prev)\\n                count++;\\n            else\\n                count = 1;\\n        }\\n        if (count > max) {\\n            max = count;\\n            list.clear();\\n            list.add(root.val);\\n        } else if (count == max) {\\n            list.add(root.val);\\n        }\\n        prev = root.val;\\n        traverse(root.right, list);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98103",
			"view":"8249",
			"top":"2",
			"title":"Java AC Solution",
			"vote":"13",
			"content":"O(n) time O(n) space\\n```\\npublic class Solution {\\n    Map<Integer, Integer> map; \\n    int max = 0;\\n    public int[] findMode(TreeNode root) {\\n        if(root==null) return new int[0]; \\n        this.map = new HashMap<>(); \\n        \\n        inorder(root); \\n        \\n        List<Integer> list = new LinkedList<>();\\n        for(int key: map.keySet()){\\n            if(map.get(key) == max) list.add(key);\\n        }\\n        \\n        int[] res = new int[list.size()];\\n        for(int i = 0; i<res.length; i++) res[i] = list.get(i);\\n        return res; \\n    }\\n    \\n    private void inorder(TreeNode node){\\n        if(node.left!=null) inorder(node.left);\\n        map.put(node.val, map.getOrDefault(node.val, 0)+1);\\n        max = Math.max(max, map.get(node.val));\\n        if(node.right!=null) inorder(node.right); \\n    }\\n}\\n```\\nJust travel the tree and count, find the those with max counts. Nothing much. Spent 10min on figuring out what is mode....\\n\\nIf using this method (hashmap), inorder/preorder/postorder gives the same result. Because essentially you just travel the entire nodes and count. And BST is not necessary. This method works for any tree."
		},
		{
			"lc_ans_id":"98126",
			"view":"7122",
			"top":"3",
			"title":"What does \"mode\" mean?",
			"vote":"13",
			"content":"What does \"mode\" mean?"
		},
		{
			"lc_ans_id":"98107",
			"view":"3537",
			"top":"4",
			"title":"11-liner C++ O(N) time O(1) extra space In-Order Traversal (detailed explanation)",
			"vote":"12",
			"content":"**Key Observation:** Obviously, it is very easy to get modes from a ***sorted array*** since all duplicates are ***consecutive***. \\n\\nAn in-order traversal of BST gives exactly a sorted sequence.\\n\\nNaturally, in-order traversal takes `O(N)` time. To achieve `O(1)` extra space, we cannot store the array of in-order node values. But all modes can be found in two traversals:\\n1. Find max frequency of node values `mfq` by counting and update number of duplicates.\\n2. Store a mode into result `vector<int> modes` whenever the duplicates match `mfq` from first traversal.\\n\\nNote: we can accomplish both traversals by keeping 2 variables `pre` (previous node value) and `cnt` (count of current duplicates):\\n* Update `cnt` by `++(cnt*=(r->val==pre))`, i.e., `r->val==pre? ++cnt : cnt=1;`\\n* Update `pre` by simply copying `pre = r->val;`\\n```cpp\\n    vector<int> modes;\\n    \\n    vector<int> findMode(TreeNode* r) {\\n      int mfq/*max freq*/, pre/*previous val*/, cnt/*duplicates count*/;\\n      getMaxFreq(r, mfq=0, pre, cnt=0); // in-order traversal to get max frequency\\n      getMode(r, mfq, pre, cnt=0);      // in-order traversal to get all modes\\n      return modes;\\n    }\\n    \\n    void getMaxFreq(TreeNode* r, int& mfq, int& pre, int& cnt) {\\n      if (!r) return;\\n      getMaxFreq(r->left, mfq, pre, cnt);\\n      getMaxFreq(r->right, mfq=max(mfq,cnt), pre=r->val, ++(cnt*=(r->val==pre)));\\n    }\\n    \\n    void getMode(TreeNode* r, const int mfq, int& pre, int& cnt) {\\n      if (!r) return;\\n      getMode(r->left, mfq, pre, cnt);\\n      if (mfq == ++(cnt*=(r->val==pre))) modes.push_back(r->val);\\n      getMode(r->right, mfq, pre=r->val, cnt);\\n    }\\n```"
		},
		{
			"lc_ans_id":"98104",
			"view":"3415",
			"top":"5",
			"title":"Simple Python Explanation",
			"vote":"8",
			"content":"Let's first visit every node in the tree and count it's value.  We can traverse the tree with a dfs.\\nAfter we have every value counted, let's look at values with the highest count and return all of them.\\n\\n```\\ncount = collections.Counter()\\n\\ndef dfs(node):\\n    if node:\\n        count[node.val] += 1\\n        dfs(node.left)\\n        dfs(node.right)\\n        \\ndfs(root)\\nmax_ct = max(count.itervalues())\\nreturn [k for k, v in count.iteritems() if v == max_ct]\\n```\\n\\n<hr>\\n\\nIf we are unfamiliar with collections.Counter, we could have also counted the values with a simple dictionary, changing two lines:\\n\\n```\\ncount = {}\\ncount[node.val] = count.get(node.val, 0) + 1\\n```"
		},
		{
			"lc_ans_id":"98165",
			"view":"3634",
			"top":"6",
			"title":"C++, DFS. Time: O(n), Space: O(n).",
			"vote":"6",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> findMode(TreeNode* root) {\\n        unordered_map<int, int> map;\\n        vector<int> result;\\n        int modeCount = getModeCount(root, map);\\n        \\n        for(pair<int,int> p : map) {\\n            if(p.second == modeCount) {\\n                result.push_back(p.first);\\n            }\\n        }\\n        \\n        return result;\\n        \\n    }\\n    \\n    /**\\n     * Traverse the tree using depth first search.\\n     * Return the mode count (i.e. The count of a repeated number that occurs the most.) of the tree.\\n     */\\n    int getModeCount(TreeNode* root, unordered_map<int, int> &map) {\\n        if(root == NULL)\\n            return 0;\\n        \\n        if(map.find(root->val) == map.end()) {\\n            map.insert(pair<int, int>(root->val, 1));\\n        }\\n        else {\\n            map[root->val]++;\\n        }\\n        \\n        return max(map[root->val], max(getModeCount(root->left, map), getModeCount(root->right, map)));\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"98105",
			"view":"199",
			"top":"7",
			"title":"C# - iterative 1 pass - O(1) space - O(n) time - with clear explanation",
			"vote":"4",
			"content":"The idea is that all the same valued nodes will be consecutive if you do an in-order traversal.  So you just need to capture the longest streak of numbers (and any other equally long streaks) as you do your traversal.  Here I do iterative in-order traversal and while \"visiting\" the node I keep the previous value seen and a previously seen count.  If the current value is the same as previous value then the streak continues, else it is a new streak.  Each time check if the streak is a max streak.\\n\\n```\\n    public int[] FindMode(TreeNode root) \\n    {\\n        if (root == null) return new int[0];\\n        \\n        TreeNode node = root;\\n        Stack<TreeNode> stack = new Stack<TreeNode>();\\n        \\n        int currVal = root.val - 1;\\n        int currCnt = 0;\\n        int maxCnt = 0;\\n        HashSet<int> maxVals = new HashSet<int>();\\n        \\n        while (node != null || stack.Count > 0)\\n        {\\n            if (node != null)\\n            {\\n                stack.Push(node);\\n                node = node.left;\\n            }\\n            else\\n            {\\n                TreeNode x = stack.Pop();\\n\\n                // --------------------------------------------\\n                // visit\\n                if (x.val != currVal) currCnt = 0;\\n                \\n                currCnt++;\\n                currVal = x.val;\\n                \\n                if (currCnt == maxCnt)\\n                {\\n                    maxVals.Add(currVal);\\n                }\\n                else if (currCnt > maxCnt)\\n                {\\n                    maxCnt = currCnt;\\n                    maxVals.Clear();\\n                    maxVals.Add(currVal);\\n                }\\n                // end visit\\n                // --------------------------------------------\\n\\n                // go right\\n                node = x.right;\\n            }\\n        }\\n        \\n        return maxVals.ToArray();\\n    }\\n```"
		},
		{
			"lc_ans_id":"98194",
			"view":"1463",
			"top":"8",
			"title":"Python solution with detailed explanation",
			"vote":"3",
			"content":"**Solution**\\n\\n**Find Mode in Binary Search Tree** https://leetcode.com/problems/find-mode-in-binary-search-tree/\\n\\n**O(N) time & O(N) Space**\\n* Use a dictionary to store the frequency of each interger. Then simply find the largest frequency and return all the associated keys.\\n* Note we do not use the property of BST in this solution.\\n\\n```\\nfrom collections import defaultdict\\nclass Solution(object):\\n    def helper(self, root, cache):\\n        if root == None:\\n            return\\n        cache[root.val] += 1\\n        self.helper(root.left, cache)\\n        self.helper(root.right, cache)\\n        return\\n    \\n    def findMode(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: List[int]\\n        \"\"\"\\n        if root == None:\\n            return []\\n        cache = defaultdict(int)\\n        self.helper(root, cache)\\n        max_freq = max(cache.values())\\n        result = [k for k,v in cache.items() if v == max_freq]\\n        return result\\n```\\n\\n**O(N) time and O(1) Space** \\n* Write BST Iterator class which gives the next element in_order. Now the problem reduces to finding mode in a sorted array.\\n* Instead of a BST iterator, we can use a recursive inorder traversal and store a class variable pre to indicate the previous integer.\\n* https://discuss.leetcode.com/topic/77308/4ms-java-solution-beats-100-o-1-space-recursion-stack-space-doesn-t-count\\n\\n**Divide and Conquer**\\n* Mode lies entirely in left subtree, or in right subtree or the middle element is the mode.\\n* Time would be NlogN at best and space O(1)"
		},
		{
			"lc_ans_id":"98196",
			"view":"736",
			"top":"9",
			"title":"4ms Java solution beats 100% O(1) space(recursion stack space doesn't count)",
			"vote":"3",
			"content":"Just simple inorder traversal, whenever current frequency for current number is bigger than max frequency, update the result.\\n```\\npublic class Solution {\\n    List<Integer> ans = new ArrayList<>();\\n    Integer pre;\\n    int maxFreq = 0, curFreq = 0;\\n    public int[] findMode(TreeNode root) {\\n        traverse(root);\\n        int[] res = new int[ans.size()];\\n        for (int i = 0; i < res.length; i++) res[i] = ans.get(i);\\n        return res;\\n    }\\n    \\n    private void traverse(TreeNode root) {\\n        if (root == null) {\\n            return;\\n        }\\n        //inorder traversal\\n        traverse(root.left);\\n        if (pre != null && root.val == pre) {\\n            curFreq++;\\n        } else {\\n            curFreq = 1;\\n        }\\n        if (curFreq == maxFreq) {\\n            ans.add(root.val);\\n        } else if (curFreq > maxFreq) {\\n            maxFreq = curFreq;\\n            ans = new ArrayList<>();\\n            ans.add(root.val);\\n        } \\n\\n        pre = root.val;\\n        traverse(root.right);\\n    }\\n}\\n```"
		}
	],
	"id":"491",
	"title":"Find Mode in Binary Search Tree",
	"content":"<p>Given a binary search tree (BST) with duplicates, find all the <a href=\"https://en.wikipedia.org/wiki/Mode_(statistics)\" target=\"_blank\">mode(s)</a> (the most frequently occurred element) in the given BST.</p>\r\n\r\n<p>\r\nAssume a BST is defined as follows:\r\n<ul>\r\n<li>The left subtree of a node contains only nodes with keys <b>less than or equal to</b> the node's key.</li>\r\n<li>The right subtree of a node contains only nodes with keys <b>greater than or equal to</b> the node's key.</li>\r\n<li>Both the left and right subtrees must also be binary search trees.</li>\r\n</ul>\r\n</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven BST <code>[1,null,2,2]</code>,<br />\r\n<pre>\r\n   1\r\n    \\\r\n     2\r\n    /\r\n   2\r\n</pre>\r\n</p>\r\n<p>\r\nreturn <code>[2]</code>.\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nIf a tree has more than one mode, you can return them in any order.\r\n</p>\r\n\r\n<p><b>Follow up:</b>\r\nCould you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).\r\n</p>",
	"frequency":"209",
	"ac_num":"29033"
}