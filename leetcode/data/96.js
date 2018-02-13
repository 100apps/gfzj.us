{
	"difficulty":"2",
	"submit_num":"338650",
	"show_id":"96",
	"leetcode_id":"96",
	"answers":[
		{
			"lc_ans_id":"31666",
			"view":"64843",
			"top":"0",
			"title":"DP Solution in 6 lines with explanation. F(i, n) = G(i-1) * G(n-i)",
			"vote":"1126",
			"content":"The problem can be solved in a dynamic programming way. I\\u2019ll explain the intuition and formulas in the following. \\n\\nGiven a sequence 1\\u2026n, to construct a Binary Search Tree (BST) out of the sequence, we could enumerate each number i in the sequence, and use the number as the root, naturally, the subsequence 1\\u2026(i-1) on its left side would lay on the left branch of the root, and similarly the right subsequence (i+1)\\u2026n lay on the right branch of the root. We then can construct the subtree from the subsequence recursively. Through the above approach, we could ensure that the BST that we construct are all unique, since they have unique roots.\\n\\nThe problem is to calculate the number of unique BST. To do so, we need to define two functions: \\n\\n`G(n)`: the number of unique BST for a sequence of length n. \\n\\n`F(i, n), 1 <= i <= n`: the number of unique BST, where the number i is the root of BST, and the sequence ranges from 1 to n. \\n\\nAs one can see, `G(n)` is the actual function we need to calculate in order to solve the problem. And `G(n)` can be derived from `F(i, n)`, which at the end, would recursively refer to `G(n)`.\\n\\nFirst of all, given the above definitions, we can see that the total number of unique BST `G(n)`, is the sum of BST `F(i)` using each number i as a root. \\n*i.e.* \\n\\n    G(n) = F(1, n) + F(2, n) + ... + F(n, n). \\n\\nParticularly, the bottom cases, there is only one combination to construct a BST out of a sequence of length 1 (only a root) or 0 (empty tree). \\n*i.e.*\\n\\n    G(0)=1, G(1)=1. \\n\\nGiven a sequence 1\\u2026n, we pick a number i out of the sequence as the root, then the number of unique BST with the specified root `F(i)`, is the cartesian product of the number of BST for its left and right subtrees. For example, `F(3, 7)`: the number of unique BST tree with number 3 as its root. To construct an unique BST out of the entire sequence [1, 2, 3, 4, 5, 6, 7] with 3 as the root, which is to say, we need to construct an unique BST out of its left subsequence [1, 2] and another BST out of the right subsequence [4, 5, 6, 7], and then combine them together (*i.e.* cartesian product). The tricky part is that we could consider the number of unique BST out of sequence [1,2] as `G(2)`, and the number of of unique BST out of sequence [4, 5, 6, 7] as `G(4)`. Therefore, `F(3,7) = G(2) * G(4)`.\\n\\n*i.e.*\\n\\n    F(i, n) = G(i-1) * G(n-i)\\t1 <= i <= n \\n\\n\\nCombining the above two formulas, we obtain the recursive formula for `G(n)`. *i.e.*\\n\\n    G(n) = G(0) * G(n-1) + G(1) * G(n-2) + \\u2026 + G(n-1) * G(0) \\n\\nIn terms of calculation, we need to start with the lower number, since the value of `G(n)` depends on the values of `G(0) \\u2026 G(n-1)`. \\n\\nWith the above explanation and formulas, here is the implementation in Java. \\n\\n    public int numTrees(int n) {\\n        int [] G = new int[n+1];\\n        G[0] = G[1] = 1;\\n        \\n        for(int i=2; i<=n; ++i) {\\n        \\tfor(int j=1; j<=i; ++j) {\\n        \\t\\tG[i] += G[j-1] * G[i-j];\\n        \\t}\\n        }\\n\\n        return G[n];\\n    }"
		},
		{
			"lc_ans_id":"31707",
			"view":"10801",
			"top":"1",
			"title":"Fantastic Clean Java DP Solution with Detail Explaination",
			"vote":"69",
			"content":"First note that dp[k] represents the number of BST trees built from 1....k;\\n\\nThen assume we have the number of the first 4 trees: dp[1] = 1 ,dp[2] =2 ,dp[3] = 5, dp[4] =14 , how do we get dp[5] based on these four numbers is the core problem here.\\n\\nThe essential process is: to build a tree, we need to pick a root node, then we need to know how many possible left sub trees and right sub trees can be held under that node, finally multiply them.\\n\\nTo build a tree contains {1,2,3,4,5}. First we pick 1 as root, for the left sub tree, there are none; for the right sub tree, we need count how many possible trees are there constructed from {2,3,4,5}, apparently it's the same number as {1,2,3,4}. So the total number of trees under \"1\" picked as root is dp[0] * dp[4] = 14. (assume dp[0] =1). Similarly, root 2 has dp[1]*dp[3] = 5 trees. root 3 has dp[2]*dp[2] = 4, root 4 has dp[3]*dp[1]= 5 and root  5 has dp[0]*dp[4] = 14. Finally sum the up and it's done.\\n\\nNow, we may have a better understanding of the dp[k], which essentially represents the number of BST trees with k consecutive nodes. It is used as database when we need to know how many left sub trees are possible for k nodes when picking (k+1) as root. \\n\\n     public int numTrees(int n) {\\n        int [] dp = new int[n+1];\\n        dp[0]= 1;\\n        dp[1] = 1;\\n        for(int level = 2; level <=n; level++)\\n            for(int root = 1; root<=level; root++)\\n                dp[level] += dp[level-root]*dp[root-1];\\n        return dp[n];\\n    }"
		},
		{
			"lc_ans_id":"31706",
			"view":"14800",
			"top":"2",
			"title":"Dp problem. 10+ lines with comments",
			"vote":"69",
			"content":"    /**\\n     * Taking 1~n as root respectively:\\n     *      1 as root: # of trees = F(0) * F(n-1)  // F(0) == 1\\n     *      2 as root: # of trees = F(1) * F(n-2) \\n     *      3 as root: # of trees = F(2) * F(n-3)\\n     *      ...\\n     *      n-1 as root: # of trees = F(n-2) * F(1)\\n     *      n as root:   # of trees = F(n-1) * F(0)\\n     *\\n     * So, the formulation is:\\n     *      F(n) = F(0) * F(n-1) + F(1) * F(n-2) + F(2) * F(n-3) + ... + F(n-2) * F(1) + F(n-1) * F(0)\\n     */\\n\\n    int numTrees(int n) {\\n        int dp[n+1];\\n        dp[0] = dp[1] = 1;\\n        for (int i=2; i<=n; i++) {\\n            dp[i] = 0;\\n            for (int j=1; j<=i; j++) {\\n                dp[i] += dp[j-1] * dp[i-j];\\n            }\\n        }\\n        return dp[n];\\n    }"
		},
		{
			"lc_ans_id":"31671",
			"view":"6308",
			"top":"3",
			"title":"A very simple and straight ans based on Math,Catalan Number ,O(N) times,O(1)space",
			"vote":"36",
			"content":"        int numTrees(int n) {\\n        //cantalan\\u6811\\n        //C(2n,n)/(n+1)\\n        long long ans =1;\\n        for(int i=n+1;i<=2*n;i++){\\n            ans = ans*i/(i-n);\\n        }\\n        return ans/(n+1);\\n    }"
		},
		{
			"lc_ans_id":"31714",
			"view":"7642",
			"top":"4",
			"title":"Simple solution with easy explaination",
			"vote":"28",
			"content":"WE can know that by zero we can have 1 bst of null\\nby 1 we have 1 bst of 1\\nand for 2 we can arrange using two ways\\nNow idea is simple for rest numbers. for n=3 make 1 as root node so there will be 0 nodes in left subtree and 2 nodes in right subtree. we know the solution for 2 nodes that they can be used to make 2 bsts.\\nNow making 2 as the root node , there will be 1 in left subtree and 1 node in right subtree. ! node results in 1 way for making a BST. \\nNow making 3 as root node. There will be 2 nodes in left subtree and 0 nodes in right subtree. We know 2 will give 2 BST and zero will give 1 BST.\\nTotalling the result of all the 3 nodes as root will give 5. Same process can be applied for more numbers.\\n        \\n\\n\\n\\n        public int number(int n){\\n    \\tif(n==0)return 1;\\n    \\t\\tif(n==1)return 1;\\n    \\t\\t\\n    \\t\\tint result[]=new int [n+1];\\n    \\t\\tresult[0]=1;\\n    \\t\\tresult[1]=1;\\n    \\t\\tresult[2]=2;\\n    \\t\\tif(n<3){\\n    \\t\\t\\treturn result[n];\\n    \\t\\t}\\n    \\t\\t\\n    \\t\\tfor(int i=3;i<=n;i++){\\n    \\t\\t\\tfor(int k=1;k<=i;k++){\\n  \\n    \\t\\t\\t\\tresult[i]=result[i]+result[k-1]*result[i-k];\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\t\\n    \\t\\t\\n    \\t\\treturn result[n];\\n    \\t}"
		},
		{
			"lc_ans_id":"31809",
			"view":"2123",
			"top":"5",
			"title":"C++ code w/ explanation",
			"vote":"18",
			"content":"    class Solution {\\n    public:\\n        int numTrees(int n) {\\n            vector<int> f;\\n            f.push_back(1);\\n            for (int i = 1; i <= n; ++i) {\\n                int t = 0;\\n                for (int j = 0; j < i; ++j)\\n                    t += f[j] * f[i-j-1];\\n                f.push_back(t);\\n            }\\n            return f.back();\\n        }\\n    };\\n\\n\\nConsider f_i:\\n\\n - choose 1 as the root, we have 0 node for the left tree, i-1 for the\\n   right;\\n - choose 2 as the root, we have 1 node for the left tree, i-2 for the\\n   right;\\n - ...\\n - choose i as the root, we have i-1 nodes for the left tree, 0 for the\\n   right.\\n\\nTherefore, the recursive solution is f_i = \\\\sum_{j=0}^{i-1} f_j f_{i-j-1}"
		},
		{
			"lc_ans_id":"31720",
			"view":"2119",
			"top":"6",
			"title":"A very nice explanation",
			"vote":"17",
			"content":"https://www.quora.com/Given-n-how-many-structurally-unique-BSTs-binary-search-trees-that-store-values-1-to-n-are-there"
		},
		{
			"lc_ans_id":"31826",
			"view":"2332",
			"top":"7",
			"title":"Python solutions (DP + Catalan number)",
			"vote":"16",
			"content":"   \\n    # DP\\n    def numTrees1(self, n):\\n        res = [0] * (n+1)\\n        res[0] = 1\\n        for i in xrange(1, n+1):\\n            for j in xrange(i):\\n                res[i] += res[j] * res[i-1-j]\\n        return res[n]\\n     \\n    # Catalan Number  (2n)!/((n+1)!*n!)  \\n    def numTrees(self, n):\\n        return math.factorial(2*n)/(math.factorial(n)*math.factorial(n+1))"
		},
		{
			"lc_ans_id":"31865",
			"view":"1520",
			"top":"8",
			"title":"It's catalan number",
			"vote":"15",
			"content":"[http://en.wikipedia.org/wiki/Catalan_number][1]\\n\\n![enter image description here][2]\\n\\n\\n  [1]: http://en.wikipedia.org/wiki/Catalan_number\\n  [2]: http://i.imgur.com/hVkEdbp.png"
		},
		{
			"lc_ans_id":"31696",
			"view":"2680",
			"top":"9",
			"title":"Simple Recursion Java Solution with Explanation",
			"vote":"14",
			"content":"The idea is to use each number i as root node, then the left branch will be what's less than i, the right branch will be what's larger than i. The total number of distinct structure is their product. Thus, sum up the product for all numbers. Use a map to memorize the visited number.\\n\\n    public class Solution {\\n        public int numTrees(int n) {\\n            Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n            map.put(0,1);\\n            map.put(1,1);\\n            return numTrees(n, map);\\n        }\\n        \\n        private int numTrees(int n, Map<Integer, Integer> map){\\n            // check memory\\n            if(map.containsKey(n)) return map.get(n);\\n            // recursion\\n            int sum = 0;\\n            for(int i = 1;i <= n;i++)\\n                sum += numTrees(i-1, map) * numTrees(n-i, map);\\n            map.put(n, sum);\\n            return sum;\\n        }\\n    }"
		}
	],
	"id":"96",
	"title":"Unique Binary Search Trees",
	"content":"<p>Given <i>n</i>, how many structurally unique <b>BST's</b> (binary search trees) that store values 1...<i>n</i>?</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <i>n</i> = 3, there are a total of 5 unique BST's.\r\n\r\n<pre>\r\n   1         3     3      2      1\r\n    \\       /     /      / \\      \\\r\n     3     2     1      1   3      2\r\n    /     /       \\                 \\\r\n   2     1         2                 3\r\n</pre>\r\n</p>",
	"frequency":"509",
	"ac_num":"141263"
}