{
	"difficulty":"2",
	"submit_num":"49967",
	"show_id":"508",
	"leetcode_id":"508",
	"answers":[
		{
			"lc_ans_id":"98664",
			"view":"12228",
			"top":"0",
			"title":"Verbose Java solution, postOrder traverse, HashMap (18ms)",
			"vote":"28",
			"content":"For sake of saving time during contest, can't write so concise solution :)\\nIdea is ```post-order``` traverse the tree and get sum of every sub-tree, put ```sum``` to ```count``` mapping to a HashMap. Then generate result based on the HashMap.\\n```\\npublic class Solution {\\n    Map<Integer, Integer> sumToCount;\\n    int maxCount;\\n    \\n    public int[] findFrequentTreeSum(TreeNode root) {\\n        maxCount = 0;\\n        sumToCount = new HashMap<Integer, Integer>();\\n        \\n        postOrder(root);\\n        \\n        List<Integer> res = new ArrayList<>();\\n        for (int key : sumToCount.keySet()) {\\n            if (sumToCount.get(key) == maxCount) {\\n                res.add(key);\\n            }\\n        }\\n        \\n        int[] result = new int[res.size()];\\n        for (int i = 0; i < res.size(); i++) {\\n            result[i] = res.get(i);\\n        }\\n        return result;\\n    }\\n    \\n    private int postOrder(TreeNode root) {\\n        if (root == null) return 0;\\n        \\n        int left = postOrder(root.left);\\n        int right = postOrder(root.right);\\n        \\n        int sum = left + right + root.val;\\n        int count = sumToCount.getOrDefault(sum, 0) + 1;\\n        sumToCount.put(sum, count);\\n        \\n        maxCount = Math.max(maxCount, count);\\n        \\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98675",
			"view":"3349",
			"top":"1",
			"title":"Python easy understand solution",
			"vote":"17",
			"content":"I have used a hash-map ```ctr``` to count the sum occurrence.\\n\\nI have wrote a sub function `countSubtreeSum` to travel through a tree and return the sum of the tree.\\n\\nIn `countSubtreeSum`, I will travel through the left node and the right node,  calculate the sum of the tree, increment the  counter  ```ctr```, and return the sum.\\n\\n```\\n  def findFrequentTreeSum(self, root):\\n        if root == None: return []\\n\\n        def getSum(node):\\n            if node == None: return 0\\n            s = node.val + getSum(node.left) + getSum(node.right)\\n            c[s] += 1\\n            return s\\n\\n        c = collections.Counter()\\n        getSum(root)\\n        frequent = max(c.values())\\n        return [s for s in c.keys() if c[s] == frequent]\\n````\\nPlease upvote if it makes sense.\\n\\nUpdate: I have changed a little to make the variable name shorter."
		},
		{
			"lc_ans_id":"98671",
			"view":"4566",
			"top":"2",
			"title":"Short Clean C++ O(n)  Solution",
			"vote":"13",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> findFrequentTreeSum(TreeNode* root) {\\n        unordered_map<int,int> counts;\\n        int maxCount = 0;\\n        countSubtreeSums(root, counts, maxCount);\\n        \\n        \\n        vector<int> maxSums;\\n        for(const auto& x :  counts){\\n            if(x.second == maxCount) maxSums.push_back(x.first);\\n        }\\n        return maxSums;\\n    }\\n    \\n    int countSubtreeSums(TreeNode *r, unordered_map<int,int> &counts, int& maxCount){\\n        if(r == nullptr) return 0;\\n        \\n        int sum = r->val;\\n        sum += countSubtreeSums(r->left, counts, maxCount);\\n        sum += countSubtreeSums(r->right, counts, maxCount);\\n        ++counts[sum];\\n        maxCount = max(maxCount, counts[sum]);\\n        return sum;\\n    }\\n};"
		},
		{
			"lc_ans_id":"98662",
			"view":"5035",
			"top":"3",
			"title":"Short Easy Java",
			"vote":"9",
			"content":"```\\npublic class Solution {\\n    int max = 0;\\n    public int[] findFrequentTreeSum(TreeNode root) {\\n        if(root==null) return new int[0];\\n        Map<Integer, Integer> map = new HashMap<>();\\n        helper(root, map);\\n        List<Integer> res = new LinkedList<>();\\n        for(Map.Entry<Integer, Integer> me: map.entrySet()){\\n            if(me.getValue()==max) res.add(me.getKey());\\n        }\\n        return res.stream().mapToInt(i->i).toArray();\\n    }\\n    \\n    private int helper(TreeNode n, Map<Integer, Integer> map){\\n        int left = (n.left==null) ? 0 : helper(n.left, map);\\n        int right = (n.right==null) ? 0 : helper(n.right, map);\\n        int sum = left + right + n.val;\\n        map.put(sum, map.getOrDefault(sum,0)+1);\\n        max = Math.max(max, map.get(sum));\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98707",
			"view":"1752",
			"top":"4",
			"title":"Java divide and conquer",
			"vote":"7",
			"content":"```\\npublic class Solution {\\n    int maxFreq = 0;\\n    int count = 0;\\n    public int[] findFrequentTreeSum(TreeNode root) {\\n        Map<Integer, Integer> map = new HashMap<>();\\n        traverse(root, map);\\n        int[] res = new int[count];\\n        int i = 0;\\n        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {\\n            if (entry.getValue() == maxFreq) {\\n                res[i++] = entry.getKey();\\n            }\\n        }\\n        return res;\\n    }\\n    \\n    private int traverse(TreeNode root, Map<Integer, Integer> map) {\\n        if (root == null) {\\n            return 0;\\n        }\\n        \\n        int left = traverse(root.left, map);\\n        int right = traverse(root.right, map);\\n        \\n        int sum = left + right + root.val;\\n        map.put(sum, map.getOrDefault(sum, 0) + 1);\\n        if (map.get(sum) > maxFreq) {\\n            maxFreq = map.get(sum);\\n            count = 1;\\n        } else if (map.get(sum) == maxFreq) {\\n            count++;\\n        }\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98749",
			"view":"317",
			"top":"5",
			"title":"Python clean solution beats 97%",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def findFrequentTreeSum(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: List[int]\\n        \"\"\"\\n        def helper(root, d):\\n            if not root:\\n                return 0\\n            left = helper(root.left, d)\\n            right = helper(root.right, d)\\n            subtreeSum = left + right + root.val\\n            d[subtreeSum] = d.get(subtreeSum, 0) + 1\\n            return subtreeSum\\n        \\n        d = {}\\n        helper(root, d)\\n        mostFreq = 0\\n        ans = []\\n        for key in d:\\n            if d[key] > mostFreq:\\n                mostFreq = d[key]\\n                ans = [key]\\n            elif d[key] == mostFreq:\\n                ans.append(key)\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"98751",
			"view":"292",
			"top":"6",
			"title":"C++ unordered_map solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\nprivate:\\n    unordered_map<int, int> m;\\n    int maxCnt = 0;\\n    int getSum(TreeNode *root) {\\n        if (!root) return 0;\\n        int sum = root->val + getSum(root->left) + getSum(root->right);\\n        m[sum]++;\\n        maxCnt = max(maxCnt, m[sum]);\\n        return sum;\\n    }\\npublic:\\n    vector<int> findFrequentTreeSum(TreeNode* root) {\\n        getSum(root);\\n        vector<int> ans;\\n        for (auto p : m) {\\n            if (p.second == maxCnt) ans.push_back(p.first);\\n        }\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"98762",
			"view":"210",
			"top":"7",
			"title":"Easy to Understand DFS solution using C#",
			"vote":"2",
			"content":"```\\n    Dictionary<int,int> counts = new Dictionary<int,int>();\\n\\n    public int[] FindFrequentTreeSum(TreeNode root) {\\n        \\n        FindFrequentSum(root);\\n        \\n        int mode = 0;\\n        int occurence = 0;\\n        foreach (KeyValuePair<int, int> pair in counts)\\n        {\\n\\n            if( pair.Value > occurence)\\n            {\\n                occurence = pair.Value;\\n                mode = pair.Key;\\n            }\\n        }\\n        \\n        return (counts.Where(pair => pair.Value == occurence)\\n                  .Select(pair => pair.Key)).ToArray();\\n    }\\n    \\n    int FindFrequentSum(TreeNode root)\\n    {\\n        if(root== null)\\n            return 0;\\n       if(root.left == null && root.right == null)\\n       {\\n           AddToDictioanry(root.val);\\n           return root.val;\\n       }\\n       int sum = root.val + FindFrequentSum(root.left) + FindFrequentSum(root.right);\\n       AddToDictioanry(sum);\\n       return sum;\\n    }\\n    \\n    void AddToDictioanry(int val)\\n    {\\n        if(counts.ContainsKey(val))\\n            counts[val] ++;\\n        else counts.Add(val,1);\\n    }\\n```"
		},
		{
			"lc_ans_id":"98692",
			"view":"126",
			"top":"8",
			"title":"C solution, hash table, 9ms",
			"vote":"1",
			"content":"```\\n/**\\n * Definition for a binary tree node.\\n * struct TreeNode {\\n *     int val;\\n *     struct TreeNode *left;\\n *     struct TreeNode *right;\\n * };\\n */\\n/**\\n * Return an array of size *returnSize.\\n * Note: The returned array must be malloced, assume caller calls free().\\n */\\nstruct hash_t {\\n\\tint key;\\n\\tint val;\\n\\tUT_hash_handle hh;\\n};\\n\\nstruct hash_t *hash = NULL;\\n\\nstruct hash_t *hash_node_new(int key, int val)\\n{\\n\\tstruct hash_t *s;\\n\\ts = malloc(sizeof(struct hash_t));\\n\\ts->key = key;\\n\\ts->val = val;\\n\\n\\treturn s;\\n}\\n\\nint treeSum(struct TreeNode *root, int *num)\\n{\\n\\tint sum = 0;\\n\\tstruct hash_t *s = NULL;\\n\\tif(!root)\\treturn 0;\\n\\t\\n\\tsum = treeSum(root->left, num) + treeSum(root->right, num) + root->val;\\n\\n\\tHASH_FIND_INT(hash, &sum, s);\\n\\tif(s){\\n\\t\\ts->val += 1;\\n\\t}else{\\n\\t\\ts = hash_node_new(sum, 1);\\n\\t\\tHASH_ADD_INT(hash, key, s);\\n\\t}\\n\\tif(s->val > *num)\\t*num = s->val;\\n\\n\\treturn sum;\\n} \\n\\nint* findFrequentTreeSum(struct TreeNode* root, int* returnSize) {\\n\\tint num = 0, n=0, *ret, i=0;\\n\\n\\ttreeSum(root, &num);\\n\\tstruct hash_t *s;\\n\\n\\tfor(s = hash; s != NULL; s=s->hh.next)\\n\\t{\\n\\t\\tif(s->val == num)\\tn++;\\n\\t}\\n\\t*returnSize = n;\\n\\tret = malloc(sizeof(int) * n);\\n\\tfor(s = hash, i=0; s != NULL; s=s->hh.next)\\n\\t{\\n\\t\\tif(s->val == num)\\tret[i++] = s->key;\\n\\t}\\n\\tHASH_CLEAR(hh, hash);\\n\\n\\treturn ret;\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"98715",
			"view":"91",
			"top":"9",
			"title":"Clean C++ O(n) solution DFS + HashTable",
			"vote":"1",
			"content":"Looks like the easiest way is to collect all subtree sums and get the most frequent sums. A single pass DFS will get us all the sums. Since there are at most N subtrees in the given binary tree, we are essentially using O(n) to collect sums, and another O(n) to go over that.\\n\\nA hashtable keyed by sum and valued by frequency is need for O(1) insertion and lookup.\\n\\n```\\nclass Solution {\\npublic:\\n    vector<int> findFrequentTreeSum(TreeNode* root) {\\n        vector<int> freq;\\n        int maxFreq = 0;\\n        unordered_map<int, int> sums;\\n        collectSum(root, sums);\\n        \\n        for (auto it=sums.begin(); it != sums.end(); it++) {\\n            if (it->second > maxFreq) {\\n                freq = { it->first };\\n                maxFreq = it->second;\\n            } else if (it->second == maxFreq) {\\n                freq.push_back(it->first);\\n            }\\n        }\\n        \\n        return freq;\\n    }\\n    \\n    int collectSum(TreeNode* node, unordered_map<int, int>& sums) {\\n        if (!node) return 0;\\n        if (!node->left && !node->right) {\\n            sums[node->val]++;\\n            return node->val;\\n        }\\n        int left = collectSum(node->left, sums);\\n        int right = collectSum(node->right, sums);\\n        int sum = node->val + left + right;\\n        sums[sum]++;\\n        return sum;\\n    }\\n};\\n```"
		}
	],
	"id":"498",
	"title":"Most Frequent Subtree Sum",
	"content":"<p>\r\nGiven the root of a tree, you are asked to find the most frequent subtree sum. The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself). So what is the most frequent subtree sum value? If there is a tie, return all the values with the highest frequency in any order.\r\n</p>\r\n\r\n<p><b>Examples 1</b><br>\r\nInput:\r\n<pre>\r\n  5\r\n /  \\\r\n2   -3\r\n</pre>\r\nreturn [2, -3, 4], since all the values happen only once, return all of them in any order.\r\n</p>\r\n\r\n<p><b>Examples 2</b><br>\r\nInput:\r\n<pre>\r\n  5\r\n /  \\\r\n2   -5\r\n</pre>\r\nreturn [2], since 2 happens twice, however -5 only occur once.\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nYou may assume the sum of values in any subtree is in the range of 32-bit signed integer.\r\n</p>",
	"frequency":"157",
	"ac_num":"26148"
}