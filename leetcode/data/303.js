{
	"difficulty":"1",
	"submit_num":"277141",
	"show_id":"303",
	"leetcode_id":"303",
	"answers":[
		{
			"lc_ans_id":"75192",
			"view":"22713",
			"top":"0",
			"title":"Java simple O(n) init and O(1) query solution",
			"vote":"124",
			"content":"public class NumArray {\\n\\n    int[] nums;\\n    \\n    public NumArray(int[] nums) {\\n        for(int i = 1; i < nums.length; i++)\\n            nums[i] += nums[i - 1];\\n        \\n        this.nums = nums;\\n    }\\n\\n    public int sumRange(int i, int j) {\\n        if(i == 0)\\n            return nums[j];\\n        \\n        return nums[j] - nums[i - 1];\\n    }\\n}"
		},
		{
			"lc_ans_id":"75184",
			"view":"9773",
			"top":"1",
			"title":"5-lines C++, 4-lines Python",
			"vote":"34",
			"content":"The idea is fairly straightforward: create an array `accu` that stores the accumulated sum for `nums` such that `accu[i] = nums[0] + ... + nums[i - 1]` in the initializer of `NumArray`. Then just return `accu[j + 1] - accu[i]` in `sumRange`. You may try the example in the problem statement to convince yourself of this idea.\\n\\nThe code is as follows.\\n\\n----------\\n**C++**\\n\\n    class NumArray {\\n    public:\\n        NumArray(vector<int> &nums) {\\n            accu.push_back(0);\\n            for (int num : nums)\\n                accu.push_back(accu.back() + num);\\n        }\\n    \\n        int sumRange(int i, int j) {\\n            return accu[j + 1] - accu[i];\\n        }\\n    private:\\n        vector<int> accu;\\n    };\\n    \\n    \\n    // Your NumArray object will be instantiated and called as such:\\n    // NumArray numArray(nums);\\n    // numArray.sumRange(0, 1);\\n    // numArray.sumRange(1, 2); \\n\\n----------\\n**Python**\\n\\n    class NumArray(object):\\n        def __init__(self, nums):\\n            \"\"\"\\n            initialize your data structure here.\\n            :type nums: List[int]\\n            \"\"\"\\n            self.accu = [0]\\n            for num in nums: \\n                self.accu += self.accu[-1] + num,\\n    \\n        def sumRange(self, i, j):\\n            \"\"\"\\n            sum of elements nums[i..j], inclusive.\\n            :type i: int \\n            :type j: int\\n            :rtype: int \\n            \"\"\"\\n            return self.accu[j + 1] - self.accu[i]\\n    \\n    \\n    # Your NumArray object will be instantiated and called as such:\\n    # numArray = NumArray(nums)\\n    # numArray.sumRange(0, 1)\\n    # numArray.sumRange(1, 2)"
		},
		{
			"lc_ans_id":"75303",
			"view":"6030",
			"top":"2",
			"title":"C++ O(1) queries - just 2 extra lines of code",
			"vote":"26",
			"content":"    class NumArray {\\n    public:\\n        NumArray(vector<int> &nums) : psum(nums.size()+1, 0) {\\n            partial_sum( nums.begin(), nums.end(), psum.begin()+1);\\n        }\\n    \\n        int sumRange(int i, int j) {\\n            return psum[j+1] - psum[i];\\n        }\\n    private:\\n        vector<int> psum;    \\n    };"
		},
		{
			"lc_ans_id":"75190",
			"view":"5666",
			"top":"3",
			"title":"My java 3ms solution",
			"vote":"19",
			"content":"    public class NumArray {\\n        private int[] sums;\\n    \\n        public NumArray(int[] nums) {\\n            if(nums.length != 0){\\n                sums = new int[nums.length];\\n            \\n                sums[0] = nums[0];\\n                for(int i=1; i<nums.length; i++){\\n                    sums[i] = nums[i] + sums[i-1];\\n                }\\n            }\\n        }\\n    \\n        public int sumRange(int i, int j) {\\n            return i==0 ? sums[j] : sums[j]-sums[i-1];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"75200",
			"view":"3526",
			"top":"4",
			"title":"A very short Python solution",
			"vote":"18",
			"content":"    class NumArray(object):\\n        def __init__(self, nums):\\n            self.dp = nums\\n            for i in xrange(1, len(nums)):\\n                self.dp[i] += self.dp[i-1]\\n    \\n        def sumRange(self, i, j):\\n            return self.dp[j] - (self.dp[i-1] if i > 0 else 0)"
		},
		{
			"lc_ans_id":"75278",
			"view":"1795",
			"top":"5",
			"title":"My 3ms clean Java DP solution may help u",
			"vote":"13",
			"content":"    public class NumArray {\\n        \\n        private static int[] sum;\\n    \\n    \\tpublic NumArray(int[] nums) {\\n    \\t\\tfor (int i = 1; i < nums.length; ++i)\\n    \\t\\t\\tnums[i] += nums[i - 1];\\n    \\t\\tthis.sum = nums;\\n    \\t}\\n    \\n    \\tpublic int sumRange(int i, int j) {\\n    \\t\\treturn sum[j] - (i == 0 ? 0 : sum[i - 1]);\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"75315",
			"view":"1745",
			"top":"6",
			"title":"C++ simple solution, O(n) to build, O(1) to query",
			"vote":"10",
			"content":"Use a vector to store the sum from 0 to i.\\n\\n    class NumArray {\\n    public:\\n        vector<int> memo = {0};\\n        NumArray(vector<int> &nums) {\\n            int summ = 0;\\n            for (int n : nums) {\\n                summ += n;\\n                memo.push_back(summ);\\n            }\\n        }\\n    \\n        int sumRange(int i, int j) {\\n            return memo[j+1] - memo[i];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"75265",
			"view":"899",
			"top":"7",
			"title":"Java: concise solution without \"if\"",
			"vote":"9",
			"content":"    public class NumArray {\\n\\t\\n\\tint[] table;\\n\\n    public NumArray(int[] nums) {\\n        int sum = 0;\\n        table = new int[nums.length + 1];\\n        for(int i = 0; i < nums.length; i++)\\n        {\\n        \\tsum = sum + nums[i];\\n        \\ttable[i + 1] = sum;\\n        }\\n    }\\n\\n    public int sumRange(int i, int j) {\\n        return table[j + 1] - table[i];\\n    }\\n    }"
		},
		{
			"lc_ans_id":"75309",
			"view":"1951",
			"top":"8",
			"title":"Java solution using sum array built in constructor.",
			"vote":"9",
			"content":"    public class NumArray {\\n        int[] sum;\\n        public NumArray(int[] nums) {\\n            sum = new int[nums.length];\\n            if(nums.length>0)sum[0]=nums[0];\\n            for(int i=1; i<nums.length; i++){\\n                sum[i]=sum[i-1]+nums[i];\\n            }\\n        }\\n    \\n        public int sumRange(int i, int j) {\\n            if(i==0)return sum[j];\\n            return sum[j]-sum[i-1];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"75314",
			"view":"1256",
			"top":"9",
			"title":"Solutions using Binary Indexed Tree and Segment Tree",
			"vote":"7",
			"content":" Binary Indexed Tree, O(lgn) modify, O(lgn) query\\n\\n    public class NumArray {\\n        \\n        int[] tree;\\n        \\n        public NumArray(int[] nums) {\\n            tree = new int[nums.length + 1];\\n            for (int i = 0; i < nums.length; i++) {\\n                int j = i + 1;\\n                while (j < nums.length + 1) {\\n                    tree[j] += nums[i];\\n                    j += lowBit(j);\\n                }\\n            }\\n        }\\n        \\n        public int sumRange(int i, int j) {\\n            return getSum(j + 1) - getSum(i);\\n        }\\n        \\n        private int getSum(int i) {\\n            int sum = 0;\\n            while (i > 0) {\\n                sum += tree[i];\\n                i -= lowBit(i);\\n            }\\n            return sum;\\n        }\\n        \\n        private int lowBit(int x) {\\n            return x&(-x);\\n        }\\n    }\\n\\n\\nSegment Tree, O(n) build, O(lgn) modify, O(lgn) query\\n\\n    public class NumArray {\\n    \\n        SegmentTreeNode root;\\n        public NumArray(int[] nums) {\\n            if (nums.length == 0) return;\\n            root = buildTree(nums, 0, nums.length - 1);\\n        }\\n    \\n        public int sumRange(int i, int j) {\\n            return query(root, i, j);\\n        }\\n        \\n        private int query(SegmentTreeNode node, int start, int end) {\\n            int mid = node.start + ((node.end - node.start) >> 1);\\n            if (start <= node.start && end >= node.end) {\\n                return node.sum;\\n            } else if (end <= mid) {\\n                return query(node.left, start, end);\\n            } else if (start > mid) {\\n                return query(node.right, start, end);\\n            } else if (start <= mid && end > mid) {\\n                return query(node.left, start, mid) + query(node.right, mid + 1, end);\\n            }\\n            return 0;\\n        }\\n        \\n        private SegmentTreeNode buildTree(int[] nums, int l, int r) {\\n            if (l == r) {\\n                return new SegmentTreeNode(l, r, nums[l]);\\n            }\\n            int mid = l + ((r - l) >> 1);\\n            SegmentTreeNode leftNode = buildTree(nums, l, mid);\\n            SegmentTreeNode rightNode = buildTree(nums, mid + 1, r);\\n            SegmentTreeNode node = new SegmentTreeNode(l, r, leftNode.sum + rightNode.sum);\\n            node.left = leftNode;\\n            node.right = rightNode;\\n            return node;\\n        }\\n        \\n        class SegmentTreeNode {\\n            int start, end, sum;\\n            SegmentTreeNode left, right;\\n            public SegmentTreeNode(int s, int e, int val) {\\n                start = s;\\n                end = e;\\n                sum = val;\\n            }\\n        }\\n    }"
		}
	],
	"id":"303",
	"title":"Range Sum Query - Immutable",
	"content":"<p>Given an integer array <i>nums</i>, find the sum of the elements between indices <i>i</i> and <i>j</i> (<i>i</i> &le; <i>j</i>), inclusive.</p>\r\n\r\n<p><b>Example:</b><br>\r\n<pre>\r\nGiven nums = [-2, 0, 3, -5, 2, -1]\r\n\r\nsumRange(0, 2) -> 1\r\nsumRange(2, 5) -> -1\r\nsumRange(0, 5) -> -3\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You may assume that the array does not change.</li>\r\n<li>There are many calls to <i>sumRange</i> function.</li>\r\n</ol>\r\n</p>",
	"frequency":"444",
	"ac_num":"87313"
}