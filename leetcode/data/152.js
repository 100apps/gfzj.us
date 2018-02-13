{
	"difficulty":"2",
	"submit_num":"481298",
	"show_id":"152",
	"leetcode_id":"152",
	"answers":[
		{
			"lc_ans_id":"48230",
			"view":"42467",
			"top":"0",
			"title":"Possibly simplest solution with O(n) time complexity",
			"vote":"326",
			"content":"```\\nint maxProduct(int A[], int n) {\\n    // store the result that is the max we have found so far\\n    int r = A[0];\\n\\n    // imax/imin stores the max/min product of\\n    // subarray that ends with the current number A[i]\\n    for (int i = 1, imax = r, imin = r; i < n; i++) {\\n        // multiplied by a negative makes big number smaller, small number bigger\\n        // so we redefine the extremums by swapping them\\n        if (A[i] < 0)\\n            swap(imax, imin);\\n\\n        // max/min product for the current number is either the current number itself\\n        // or the max/min by the previous number times the current one\\n        imax = max(A[i], imax * A[i]);\\n        imin = min(A[i], imin * A[i]);\\n\\n        // the newly computed max value is a candidate for our global result\\n        r = max(r, imax);\\n    }\\n    return r;\\n}\\n```"
		},
		{
			"lc_ans_id":"48252",
			"view":"47993",
			"top":"1",
			"title":"Sharing my solution: O(1) space, O(n) running time",
			"vote":"250",
			"content":"    public int maxProduct(int[] A) {\\n        if (A.length == 0) {\\n            return 0;\\n        }\\n        \\n        int maxherepre = A[0];\\n        int minherepre = A[0];\\n        int maxsofar = A[0];\\n        int maxhere, minhere;\\n        \\n        for (int i = 1; i < A.length; i++) {\\n            maxhere = Math.max(Math.max(maxherepre * A[i], minherepre * A[i]), A[i]);\\n            minhere = Math.min(Math.min(maxherepre * A[i], minherepre * A[i]), A[i]);\\n            maxsofar = Math.max(maxhere, maxsofar);\\n            maxherepre = maxhere;\\n            minherepre = minhere;\\n        }\\n        return maxsofar;\\n    }\\n\\n\\n\\nNote:\\nThere's no need to use O(n) space, as all that you need is a minhere and maxhere. (local max and local min), then you can get maxsofar (which is global max) from them.\\n\\nThere's a chapter in Programming Pearls 2 that discussed the MaxSubArray problem, the idea is similar."
		},
		{
			"lc_ans_id":"48330",
			"view":"17075",
			"top":"2",
			"title":"Simple Java code",
			"vote":"80",
			"content":"Loop through the array, each time remember the max and min value for the previous product, the most important thing is to update the max and min value: we have to compare among max * A[i], min * A[i] as well as A[i], since this is product, a negative * negative could be positive.\\n\\n    public class Solution {\\n        public int maxProduct(int[] A) {\\n            if (A == null || A.length == 0) {\\n                return 0;\\n            }\\n            int max = A[0], min = A[0], result = A[0];\\n            for (int i = 1; i < A.length; i++) {\\n                int temp = max;\\n                max = Math.max(Math.max(max * A[i], min * A[i]), A[i]);\\n                min = Math.min(Math.min(temp * A[i], min * A[i]), A[i]);\\n                if (max > result) {\\n                    result = max;\\n                }\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"48253",
			"view":"11980",
			"top":"3",
			"title":"Share my C++ solution, maybe is the simplest solution",
			"vote":"66",
			"content":"    class Solution {\\n     // author : s2003zy\\n     // weibo : http://weibo.com/574433433\\n     // blog : http://s2003zy.com\\n     // Time : O(n)\\n     // Space : O(1)\\n     public:\\n        int maxProduct(int A[], int n) {\\n        \\tint frontProduct = 1;\\n        \\tint backProduct = 1;\\n      \\t\\tint ans = INT_MIN;\\n      \\t\\tfor (int i = 0; i < n; ++i) {\\n      \\t\\t\\tfrontProduct *= A[i];\\n      \\t\\t\\tbackProduct *= A[n - i - 1];\\n      \\t\\t\\tans = max(ans,max(frontProduct,backProduct));\\n      \\t\\t    frontProduct = frontProduct == 0 ? 1 : frontProduct;\\n      \\t\\t    backProduct = backProduct == 0 ? 1 : backProduct;\\n            }\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"48261",
			"view":"11898",
			"top":"4",
			"title":"Share my DP code that got AC",
			"vote":"43",
			"content":"    public class Solution {\\n      public int maxProduct(int[] A) {\\n        if (A == null || A.length == 0) {\\n            return 0;\\n        }\\n        int[] f = new int[A.length];\\n        int[] g = new int[A.length];\\n        f[0] = A[0];\\n        g[0] = A[0];\\n        int res = A[0];\\n        for (int i = 1; i < A.length; i++) {\\n            f[i] = Math.max(Math.max(f[i - 1] * A[i], g[i - 1] * A[i]), A[i]);\\n            g[i] = Math.min(Math.min(f[i - 1] * A[i], g[i - 1] * A[i]), A[i]);\\n            res = Math.max(res, f[i]);\\n        }\\n        return res;\\n      }\\n    }\\n\\n> f[i] means maximum product that can be achieved ending with i\\n> \\n> g[i] means minimum product that can be achieved ending with i"
		},
		{
			"lc_ans_id":"48418",
			"view":"3018",
			"top":"5",
			"title":"Share C++ code with DP O(1) space O(n) time",
			"vote":"35",
			"content":"    int maxProduct(int A[], int n) {\\n        if(n==1) return A[0];\\n        int pMax=0, nMax=0, m = 0;\\n        for(int i=0; i<n; i++){\\n            if(A[i]<0) swap(pMax, nMax);\\n            pMax = max(pMax*A[i], A[i]);\\n            nMax = min(nMax*A[i], A[i]);\\n            m = max(m, pMax);\\n        }\\n        return m;\\n    }"
		},
		{
			"lc_ans_id":"48243",
			"view":"3855",
			"top":"6",
			"title":"In Python, can it be more concise?",
			"vote":"34",
			"content":"    def maxProduct(nums):\\n        maximum=big=small=nums[0]\\n        for n in nums[1:]:\\n            big, small=max(n, n*big, n*small), min(n, n*big, n*small)\\n            maximum=max(maximum, big)\\n        return maximum"
		},
		{
			"lc_ans_id":"48404",
			"view":"2315",
			"top":"7",
			"title":"Accepted Java solution",
			"vote":"32",
			"content":"    public int maxProduct(int[] a) {\\n      if (a == null || a.length == 0)\\n        return 0;\\n    \\n      int ans = a[0], min = ans, max = ans;\\n      \\n      for (int i = 1; i < a.length; i++) {\\n        if (a[i] >= 0) {\\n          max = Math.max(a[i], max * a[i]);\\n          min = Math.min(a[i], min * a[i]);\\n        } else {\\n          int tmp = max;\\n          max = Math.max(a[i], min * a[i]);\\n          min = Math.min(a[i], tmp * a[i]);\\n        }\\n        \\n        ans = Math.max(ans, max);\\n      }\\n      \\n      return ans;\\n    }"
		},
		{
			"lc_ans_id":"48302",
			"view":"2164",
			"top":"8",
			"title":"2 Passes scan, beats 99%",
			"vote":"27",
			"content":"Here are my observations:\\n1. it's really about odd negative numbers or even negative numbers, if it's odd, either the left end one or the right end one should be counted, so it will be revealed by scanning from left and from right in 2 passes.\\n2. 0 is a kind of delimiter, product accumulation will be reset to 1\\n\\n\\n    public int maxProduct(int[] nums) {\\n        int max = Integer.MIN_VALUE, product = 1;\\n        int len = nums.length;\\n\\n        for(int i = 0; i < len; i++) {\\n            max = Math.max(product *= nums[i], max);\\n            if (nums[i] == 0) product = 1;\\n        }\\n\\n        product = 1;\\n        for(int i = len - 1; i >= 0; i--) {\\n            max = Math.max(product *= nums[i], max);\\n            if (nums[i] == 0) product = 1;\\n        }\\n\\n        return max;\\n    }"
		},
		{
			"lc_ans_id":"48403",
			"view":"1861",
			"top":"9",
			"title":"Simple c++ solution in 8 lines.",
			"vote":"21",
			"content":"    class Solution {\\n    public:\\n        int maxProduct(vector<int>& nums) {\\n            if(nums.size() == 0) return 0;\\n            long long curmax = nums[0], curmin = nums[0], res = nums[0];\\n            for(int i=1; i<nums.size(); ++i){\\n                long long premax = curmax;\\n                curmax = max(curmax*nums[i], max(curmin*nums[i], (long long)nums[i]));\\n                curmin = min(premax*nums[i], min(curmin*nums[i], (long long)nums[i]));\\n                res = max(res, curmax);\\n            }\\n            return int(res);\\n        }\\n    };"
		}
	],
	"id":"152",
	"title":"Maximum Product Subarray",
	"content":"<p>\r\nFind the contiguous subarray within an array (containing at least one number) which has the largest product.\r\n</p>\r\n\r\n<p>\r\nFor example, given the array <code>[2,3,-2,4]</code>,<br />\r\nthe contiguous subarray <code>[2,3]</code> has the largest product = <code>6</code>.\r\n</p>",
	"frequency":"539",
	"ac_num":"127638"
}