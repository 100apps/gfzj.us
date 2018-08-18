{
	"difficulty":"1",
	"submit_num":"85902",
	"show_id":"605",
	"leetcode_id":"605",
	"answers":[
		{
			"lc_ans_id":"103898",
			"view":"9734",
			"top":"0",
			"title":"Java - Greedy solution - O(flowerbed) - beats 100%",
			"vote":"29",
			"content":"Greedily place a flower at every vacant spot encountered from left to right!\\n```\\npublic class Solution {\\n    public boolean canPlaceFlowers(int[] flowerbed, int n) {\\n        int count = 0;\\n        for(int i = 0; i < flowerbed.length && count < n; i++) {\\n            if(flowerbed[i] == 0) {\\n\\t     //get next and prev flower bed slot values. If i lies at the ends the next and prev are considered as 0. \\n               int next = (i == flowerbed.length - 1) ? 0 : flowerbed[i + 1]; \\n               int prev = (i == 0) ? 0 : flowerbed[i - 1];\\n               if(next == 0 && prev == 0) {\\n                   flowerbed[i] = 1;\\n                   count++;\\n               }\\n            }\\n        }\\n        \\n        return count == n;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103883",
			"view":"3075",
			"top":"1",
			"title":"[Java] Very easy solution",
			"vote":"15",
			"content":"```\\npublic boolean canPlaceFlowers(int[] flowerbed, int n) {\\n    int count = 1;\\n    int result = 0;\\n    for(int i=0; i<flowerbed.length; i++) {\\n        if(flowerbed[i] == 0) {\\n            count++;\\n        }else {\\n            result += (count-1)/2;\\n            count = 0;\\n        }\\n    }\\n    if(count != 0) result += count/2;\\n    return result>=n;\\n}"
		},
		{
			"lc_ans_id":"103890",
			"view":"3062",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"10",
			"content":"We need to justify a greedy solution.\\n\\nCall a plot ready if the very first flower is allowed to be planted there.\\nConsider the left-most ready plot x (if it exists).  If x+1 is not ready, then we increase our answer strictly by planting at x, since x does not disturb any ready plots.  If x+1 is ready, then planting at x instead of x+1 is atleast as good, since x disturbs only {x, x+1}, whereas x+1 disturbs {x, x+1, x+2}.\\n\\nNow our implementation is trivial.  For each plot from left to right, if we can plant a flower there, then do so.  We can plant a flower if the left neighbor is 0 (or we are on the left edge), AND the right neighbor is 0 (or we are on the right edge).\\n\\n```\\ndef canPlaceFlowers(self, A, N):\\n    for i, x in enumerate(A):\\n        if (not x and (i == 0 or A[i-1] == 0) \\n                and (i == len(A)-1 or A[i+1] == 0)):\\n            N -= 1\\n            A[i] = 1\\n    return N <= 0\\n```"
		},
		{
			"lc_ans_id":"103933",
			"view":"2034",
			"top":"3",
			"title":"simplest c++ code",
			"vote":"6",
			"content":"```\\nclass Solution {\\npublic:\\n    bool canPlaceFlowers(vector<int>& flowerbed, int n) {\\n        flowerbed.insert(flowerbed.begin(),0);\\n        flowerbed.push_back(0);\\n        for(int i = 1; i < flowerbed.size()-1; ++i)\\n        {\\n            if(flowerbed[i-1] + flowerbed[i] + flowerbed[i+1] == 0)\\n            {\\n                --n;\\n                ++i;\\n            }\\n                \\n        }\\n        return n <=0;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103893",
			"view":"2487",
			"top":"4",
			"title":"[C++][Java] Clean Code",
			"vote":"6",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    bool canPlaceFlowers(vector<int>& bed, int n) {\\n        for (int i = 0; i < bed.size(); i++) {\\n            if (!bed[i] && (i == 0 || !bed[i - 1]) && (i == bed.size() - 1 || !bed[i + 1])) {\\n                bed[i] = 1;\\n                n--;\\n            }\\n        }\\n        return n <= 0;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public boolean canPlaceFlowers(int[] bed, int n) {\\n        for (int i = 0; i < bed.length; i++) {\\n            if (bed[i] == 0 && (i == 0 || bed[i - 1] == 0) && (i == bed.length - 1 || bed[i + 1] == 0)) {\\n                bed[i] = 1;\\n                n--;\\n            }\\n        }\\n        return n <= 0;        \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103969",
			"view":"261",
			"top":"5",
			"title":"simple count zero solution, python & c++",
			"vote":"3",
			"content":"python\\n```\\nclass Solution(object):\\n    def canPlaceFlowers(self, flowerbed, n):\\n        zero = 1  # initial has no left limit\\n        for slot in flowerbed:\\n            if slot == 0:\\n                zero += 1\\n            else:\\n                n -= (zero - 1) / 2 if zero else 0\\n                zero = 0\\n        n -= zero / 2  # last has no right limit\\n        return n <= 0\\n```\\nc++\\n```\\nclass Solution {\\npublic:\\n    bool canPlaceFlowers(vector<int>& flowerbed, int n) {\\n        int zero = 1;\\n        for ( int slot : flowerbed ) {\\n            if ( 0 == slot ) {\\n                ++zero;\\n            } else {\\n                n -= zero ? (zero - 1) / 2 : 0;  // use (zero - 1) / 2 if you know -1/2 = 0 in c++\\n                zero = 0;\\n            }\\n        }\\n        n -= zero / 2;\\n        return n <= 0;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103895",
			"view":"320",
			"top":"6",
			"title":"Java DP solution for reference",
			"vote":"2",
			"content":"A Java DP solution runs on\\nK: number of flowers to plant\\nN: length of flower bed\\nO(K) space, O(NK) time\\n\\n    //dp\\n    public boolean canPlaceFlowers(int[] flowerbed, int n) {\\n        //dp[i][j]: can put j flowers in first i place, i, j starting from 1\\n        //dp[i][j] = \\n        //          dp[i-1][j] || dp[i-2][j-1], if flower[i] == 0 \\n        //          dp[i-2][j], if flower[i] == 1\\n        \\n        //nothing to plant\\n        if (n == 0) {\\n            return true; \\n        } \\n        \\n        //no place to plant\\n        if (flowerbed.length == 0) {\\n            return false;\\n        }\\n        \\n        boolean[][] dp = new boolean[3][n+1];\\n        dp[0][0] = true;\\n        \\n        //init: first j flowers put into non-space\\n        for (int j = 1; j <= n; j++) {\\n            dp[0][j] = false;\\n        }\\n        \\n        //init: first j flowers put into first space\\n        for (int j = 1; j <= n; j++) {\\n            dp[1][j] = j == 1 && flowerbed[j-1] == 0;\\n        }\\n        \\n        //init: no flowers put into first i space\\n        for (int i = 1; i < 3; i++) {\\n            dp[i][0] = true;\\n        }\\n        \\n        //dp\\n        for (int i = 2; i <= flowerbed.length; i++) {\\n            for (int j = 1; j <= n; j++) {\\n                if (flowerbed[i-1] == 0) {\\n                    dp[i%3][j] = dp[(i-1)%3][j] || dp[(i-2)%3][j-1] && flowerbed[i-2] == 0;\\n                } else {\\n                    dp[i%3][j] = dp[(i-2)%3][j];\\n                }\\n                \\n                //System.out.println(i + \":\" + j + \": \" + dp[i%3][j]);\\n                \\n            }\\n        }\\n        \\n        return dp[flowerbed.length % 3][n];\\n    }"
		},
		{
			"lc_ans_id":"103968",
			"view":"275",
			"top":"7",
			"title":"Java short solution, beat 100%, 12ms",
			"vote":"1",
			"content":"```java\\n    public boolean canPlaceFlowers(int[] flowerbed, int n) {\\n        int max=0;\\n        for (int i = 0; i < flowerbed.length; i++) {\\n        \\tif((i==0||flowerbed[i-1]==0)&&flowerbed[i]==0&&(i+1==flowerbed.length||flowerbed[i+1]==0)){\\n    \\t\\t\\tflowerbed[i]=1;\\n    \\t\\t\\tmax++;\\n        \\t}\\n\\t}\\n        return  n<=max;\\n    }\\n```"
		},
		{
			"lc_ans_id":"103905",
			"view":"763",
			"top":"8",
			"title":"Short Python",
			"vote":"1",
			"content":"In order to place ```x``` flowers between position ```i``` and position ```j```, we must have ```j - i >= 2*x + 2```. And remember to handle to boundary cases.\\n```\\nclass Solution(object):\\n    def canPlaceFlowers(self, flowerbed, n):\\n        \"\"\"\\n        :type flowerbed: List[int]\\n        :type n: int\\n        :rtype: bool\\n        \"\"\"\\n        have = [-2] + [i for i, x in enumerate(flowerbed) if x] + [len(flowerbed) + 1]\\n        return sum(abs(have[i] - have[i-1] - 2) // 2 for i in range(1, len(have))) >= n\\n```"
		},
		{
			"lc_ans_id":"103976",
			"view":"130",
			"top":"9",
			"title":"Java Solution, IF ELSE...",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public boolean canPlaceFlowers(int[] flowerbed, int n) {\\n        int l = flowerbed.length;\\n        if (l == 0) return false;\\n        if (l == 1) return flowerbed[0] == 0 && n <= 1 || n <= 0 ? true : false;\\n        \\n        for (int i = 0; i < l && n > 0; i++) {\\n            if (flowerbed[i] == 0 && (i == 0 && flowerbed[1] == 0\\n              || i == l - 1 && flowerbed[l - 2] == 0\\n              || i > 0 && i < l - 1 && flowerbed[i - 1] == 0 && flowerbed[i + 1] == 0)) {\\n                flowerbed[i] = 1;\\n                n--;\\n            }\\n        }\\n        \\n        return n <= 0;\\n    }\\n}\\n```"
		}
	],
	"id":"584",
	"title":"Can Place Flowers",
	"content":"<p>Suppose you have a long flowerbed in which some of the plots are planted and some are not. However, flowers cannot be planted in adjacent plots - they would compete for water and both would die.</p>\r\n\r\n<p>Given a flowerbed (represented as an array containing 0 and 1, where 0 means empty and 1 means not empty), and a number <b>n</b>, return if <b>n</b> new flowers can be planted in it without violating the no-adjacent-flowers rule.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> flowerbed = [1,0,0,0,1], n = 1\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> flowerbed = [1,0,0,0,1], n = 2\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The input array won't violate no-adjacent-flowers rule.</li>\r\n<li>The input array size is in the range of [1, 20000].</li>\r\n<li><b>n</b> is a non-negative integer which won't exceed the input array size.</li>\r\n</ol>\r\n</p>",
	"frequency":"186",
	"ac_num":"25902"
}