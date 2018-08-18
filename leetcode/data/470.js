{
	"difficulty":"2",
	"submit_num":"59072",
	"show_id":"477",
	"leetcode_id":"477",
	"answers":[
		{
			"lc_ans_id":"96226",
			"view":"21019",
			"top":"0",
			"title":"Java O(n) time O(1) Space",
			"vote":"106",
			"content":"For each bit position 1-32 in a 32-bit integer, we count the number of integers in the array which have that bit set. Then, if there are n integers in the array and k of them have a particular bit set and (n-k) do not, then that bit contributes k*(n-k) hamming distance to the total.\\n\\n```\\npublic int totalHammingDistance(int[] nums) {\\n    int total = 0, n = nums.length;\\n    for (int j=0;j<32;j++) {\\n        int bitCount = 0;\\n        for (int i=0;i<n;i++) \\n            bitCount += (nums[i] >> j) & 1;\\n        total += bitCount*(n - bitCount);\\n    }\\n    return total;\\n}\\n```"
		},
		{
			"lc_ans_id":"96243",
			"view":"7877",
			"top":"1",
			"title":"Share my O(n) C++ bitwise solution with thinking process and explanation",
			"vote":"52",
			"content":"---\\n## 1. Problem\\n\\n---\\nThe problem is to find the total Hamming distance between all pairs of the given numbers.\\n\\n---\\n## 2. Thinking process\\n\\n---\\n#### 2.1 For one pair\\n\\n---\\nWhen you calculate Hamming distance between x and y, you just\\n\\n---\\n1. calculate p = x ^ y;\\n2. count the number of 1's in p\\n\\n---\\n**The distance from x to y is as same as y to x.**\\n\\n---\\n#### 2.2 Trivial approach\\n\\n---\\nFor a series of number: a1, a2, a3,..., an\\n\\nUse the approach in 2.1\\n(suppose distance(x, y) is the Hamming distance between x and y):\\n\\nFor a1, calculate S(1) = distance(a1, a2)+distance(a1, a3)+ ... +distance(a1, an)\\nFor a2, calculate S(2) = distance(a2, a3)+distance(a2, a4)+ ... +distance(a2, an)\\n......\\nFor a(n - 1), calculate S(n - 1) = distance(a(n - 1), a(n))\\n\\nFinally , **S = S(1) + S(2) + ... + S(n - 1)**.\\n\\nThe function distance is called **1 + 2 + ... + (n - 1) = n(n - 1)/2** times! That's too much!\\n\\n---\\n#### 2.3 New idea\\n\\n---\\nThe total Hamming distance is constructed **bit by bit** in this approach.\\n\\nLet's take a series of number: **a1, a2, a3,..., an**\\n\\nJust think about all the **Least Significant Bit (LSB)** of a(k) (1 \\u2264 k \\u2264 n).\\n\\n**How many Hamming distance will they bring to the total?**\\n\\n1. If a pair of number has same LSB, the total distance will get 0.\\n\\n2. If a pair of number has different LSB, the total distance will get 1.\\n\\n---\\nFor all number **a1, a2, a3,..., a(n)**, if there are **p** numbers have **0 as LSB (put in set M)**, and **q** numbers have **1 for LSB (put in set N)**. \\n\\nThere are **2 situations**:\\n\\n**Situation 1**. If the **2 number in a pair both comes from M (or N)**, the total will get **0**.\\n\\n**Situation 2**. If the **1 number in a pair comes from M, the other comes from N**, the total will get **1**.\\n\\nSince **Situation 1** will add **NOTHING** to the total, we only need to think about **Situation 2**\\n\\n**How many pairs are there in Situation 2?** \\n\\nWe choose **1 number from M (p possibilities)**, and **1 number from N (q possibilities)**.\\n\\nThe total possibilities is **p \\xd7 q = pq**, which means\\n\\n>#### **The total Hamming distance will get pq from LSB.**\\n\\n---\\nIf we **remove the LSB of all numbers (right logical shift)**, the same idea can be used **again and again until all numbers becomes zero**\\n\\n---\\n#### 2.4 Time complexity\\n\\n---\\nIn each loop, we need to **visit all numbers in nums** to **calculate how many numbers has 0 (or 1) as LSB**.\\n\\nIf the biggest number in nums[] is K, **the total number of loop is [logK] + 1**.\\n\\nSo, **the total time complexity of this approach is O(n)**.\\n\\n---\\n## 3. Code\\n---\\n```\\nclass Solution {\\npublic:\\n    int totalHammingDistance(vector<int>& nums) {\\n        int size = nums.size();\\n        if(size < 2) return 0;\\n        int ans = 0;\\n        int *zeroOne = new int[2];\\n        while(true)\\n        {\\n            int zeroCount = 0;\\n            zeroOne[0] = 0;\\n            zeroOne[1] = 0;\\n            for(int i = 0; i < nums.size(); i++)\\n            {\\n                if(nums[i] == 0) zeroCount++;\\n                zeroOne[nums[i] % 2]++;\\n                nums[i] = nums[i] >> 1;\\n            }\\n            ans += zeroOne[0] * zeroOne[1];\\n            if(zeroCount == nums.size()) return ans;\\n        }\\n    }\\n};\\n```\\n---"
		},
		{
			"lc_ans_id":"96229",
			"view":"4353",
			"top":"2",
			"title":"Python via Strings",
			"vote":"30",
			"content":"\\n    def totalHammingDistance(self, nums):\\n        return sum(b.count('0') * b.count('1') for b in zip(*map('{:032b}'.format, nums)))"
		},
		{
			"lc_ans_id":"96222",
			"view":"4929",
			"top":"3",
			"title":"Java Solution with Explanation",
			"vote":"18",
			"content":"The first solution came to my mind is brute forcely iterate through each pair, then sum all ```Integer.bitCount(x ^ y)``` like what I mentioned here https://discuss.leetcode.com/topic/72093/java-1-line-solution-d But as you can imagine, it TLE...\\n\\nLet's think about this problem another way. We can separate the calculation to do one bit at a time. For example, look at the rightmost bit of all the numbers in ```nums```. Suppose that ```i``` numbers have a rightmost ```0```-bit, and ```j``` numbers have a ```1```-bit. Then out of the pairs, ```i * j``` of them will have 1 in the rightmost bit of the ```XOR```. This is because there are ```i * j``` ways to choose one number that has a ```0```-bit and one that has a ```1```-bit. These bits will therefore contribute ```i * j``` towards the total of all the XORs.\\n\\nApply above algorithm to each bit (```31``` bits in total as specified in the problem), sum them together then we get the answer.\\n\\nReference: http://stackoverflow.com/questions/21388448/sum-of-xor-values-of-all-pairs\\n\\n```\\npublic class Solution {\\n    public int totalHammingDistance(int[] nums) {\\n        int n = 31;\\n        int len = nums.length;\\n        int[] countOfOnes = new int[n];\\n        for (int i = 0; i < len; i++) {\\n            for (int j = 0; j < n; j++) {\\n                countOfOnes[j] += (nums[i] >> j) & 1;\\n            }\\n        }\\n        int sum = 0;\\n        for (int count: countOfOnes) {\\n            sum += count * (len - count);\\n        }\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96228",
			"view":"2932",
			"top":"4",
			"title":"Python Explanation",
			"vote":"11",
			"content":"Notice the total hamming distance is the sum of the total hamming distance for each of the i-th bits separately.\\n\\nSo, let's consider the i-th column, which consists of numbers chosen from {0, 1}.  The total hamming distance would be the number of pairs of numbers that are different.  That is, \\n\\nTotal hamming distance for the i-th bit = \\n (the number of zeros in the i-th position) * \\n (the number of ones in the i-th position).\\n\\nWe then add all of these together to get our answer.\\n\\nCode:\\n```\\nbits = [ [0,0] for _ in xrange(32) ]\\nfor x in A:\\n  for i in xrange(32):\\n    bits[i][x%2] += 1\\n    x /= 2\\nreturn sum( x*y for x,y in bits )\\n```"
		},
		{
			"lc_ans_id":"96253",
			"view":"330",
			"top":"5",
			"title":"Simple example for the \"Java O(n) time O(1) Space\" Solution",
			"vote":"6",
			"content":"The idea is same as https://discuss.leetcode.com/topic/72092/java-o-n-time-o-1-space \\nAssuming we have an array of five integers ```a, b, c, d, e``` as follow. \\nWe examine the digits one by one from the last digit. \\nCount the number of integers whose last digit is 1, assign the value to ```ones```\\n```\\n    a = 0 0 0 1 0\\n    b = 1 0 0 1 1\\n    c = 0 1 0 0 1\\n    d = 1 0 0 1 0\\n    e = 0 0 0 1 0\\n                \\u2191\\n    ones: b, c\\n    zeros: a, d, e\\n    \\n    pairs that make distance are:\\n    b: a, d, e\\n    c: a, d, e\\n\\n    So we have 2 ones and 5 - 2 = 3 zeros\\n    Total distance = 2 * 3\\n    then we move the pointer one position left, i.e. all the numbers right shift by 1 (num >>> 1)\\n```\\nThe code is as follows.\\n```\\npublic int totalHammingDistance(int[] nums) {\\n        int res = 0, len = nums.length;\\n        for(int i = 0; i < 32; i++) { //32 digits in integers\\n            int ones = 0; \\n            for(int j = 0; j < len; j++) {\\n                if((nums[j] & 1) == 1) ones++;\\n                nums[j] = nums[j] >>> 1;\\n            }\\n            res = res + ones * (len - ones);\\n        }\\n        return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"96250",
			"view":"1202",
			"top":"6",
			"title":"C++ O(n) runtime, O(1) space",
			"vote":"6",
			"content":"My approach is counting the hamming distance bitwise. If you generate all possible pairs of input array, there will be three kinds of pairs\\n* LSB is `1/0` for both numbers - for these kind of pairs they will not contribute in the final result\\n* LSB is different - these pairs will contribute at final result\\n\\nDivide all the numbers into two sets `p` & `q`.\\n`p` - contains numbers whose LSB is `1`\\n`q` - numbers whose LSB is `0`\\n\\nThe pairs obtained from elements of only `p` or only `q` will be the pairs of the first type given above.\\nSo only the pairs obtained from combination of `p` and `q` will contribute at the result. And the contribution will be \\n`\\n|p| * |q| = |p| - (|n| - |q|); \\n|p| = size of set p, \\n|q| = size of set q,\\n|n| = size of input array,\\n`\\n\\nAnd we need to do the same process for all the 32 bits of all numbers and sum the each bits hamming contribution. \\n\\nRuntime will be `O(32*n) = O(n) `\\n```\\nclass Solution {\\npublic:\\n    int totalHammingDistance(vector<int>& nums) {\\n        if (nums.size() <= 0) return 0;\\n        \\n        int res = 0;\\n        \\n        for(int i=0;i<32;i++) {\\n            int setCount = 0;\\n            for(int j=0;j<nums.size();j++) {\\n                if ( (nums[j] & (1 << i)) != 0) setCount++;\\n            }\\n            \\n            res += setCount * (nums.size() - setCount);\\n        }\\n        \\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"96252",
			"view":"872",
			"top":"7",
			"title":"Python O(nlogV) time",
			"vote":"2",
			"content":"Just calculate combinations vertically.\\n```\\nclass Solution(object):\\n    def totalHammingDistance(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        ans = 0\\n        mask = 1\\n        for j in range(0, 32):\\n            ones = zeros = 0\\n            for num in nums:\\n                if num & mask:\\n                    ones += 1\\n                else:\\n                    zeros += 1\\n            ans += ones * zeros\\n            mask = mask << 1\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"96287",
			"view":"485",
			"top":"8",
			"title":"Java Easy solution with explanation",
			"vote":"2",
			"content":"Hi there! Here the strightforward idea is to calculate haming distances between each pair and then sum them up. But that algorithm runs for O(31 * n^2). We have to make it faster. \\n``` ```Actually we don't need to consider each pair. Let's simplify the problem, such that each number consists of single bit. How could we solve then? This case we know, that haming distance between two numbers can be either 1 or 0. Well, 1 if bits are different and 0 otherwise. It means, the answer is the number of pairs with different bits. The latter is equals to the product of # of zero bits and # of set bits. \\n``` ```Our problem is the same. You can prove by yourselves that sum of haming distances is equals to the sum of pairs with different bits for each bit position from 1 to 31. Thus we come up with solution that works for O(1) space and O(31*n) time.\\n```\\npublic class Solution {\\n    public int totalHammingDistance(int[] nums) {\\n        int ans= 0 ;\\n        int bit = 1;\\n        for(int i = 0;i<31;i++){\\n            int zero = 0, one = 0;\\n            for(int j =  0;j<nums.length;j++){\\n                if((nums[j]&bit) == 0){\\n                    zero++;\\n                } else {\\n                    one++;\\n                }\\n            }\\n            ans+=zero*one;\\n            bit<<=1;\\n        }\\n        return ans;\\n    }\\n}"
		},
		{
			"lc_ans_id":"96284",
			"view":"814",
			"top":"9",
			"title":"8-lines DP solution by one pass with explanation",
			"vote":"2",
			"content":" It's really a straight forward method. To sum the distances of every pair, you can make it with element one by one. For example, you check first element and second one, then check the coming third one with first and second element as: (1,2), (1,3), (2,3)...So the only thing you need to do is check how many more distances come with a new element nums[k] with passed elements nums[0],nums[1],...,nums[k-1].\\n\\nI used a matrix(O(1) space) to store total amounts of 0's and 1's at every bit of already passed numbers.\\n**(x>>i)&1** gets the ith bit of current number.\\n**((x>>i)&1)^1** gets the opposite of ith bit of current number, which makes the total Hamming distances between current number and passed numbers.\\n```\\n    public int totalHammingDistance(int[] nums) {\\n        int[][] dp = new int[31][2];\\n        int res = 0;\\n        for (int x : nums)\\n            for (int i=0; i<31; ++i) {\\n                ++dp[i][(x>>i)&1];\\n                res += dp[i][((x>>i)&1)^1];\\n            }\\n        return res;\\n    }\\n````"
		}
	],
	"id":"470",
	"title":"Total Hamming Distance",
	"content":"<p>The <a href=\"https://en.wikipedia.org/wiki/Hamming_distance\" target=\"_blank\">Hamming distance</a> between two integers is the number of positions at which the corresponding bits are different.</p>\r\n\r\n<p>Now your job is to find the total Hamming distance between all pairs of the given numbers.</p\u0010\u0010\u0010\u0010>\r\n\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> 4, 14, 2\r\n\r\n<b>Output:</b> 6\r\n\r\n<b>Explanation:</b> In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just\r\nshowing the four bits relevant in this case). So the answer will be:\r\nHammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>Elements of the given array are in the range of <code>0 </code> to <code>10^9</code>\r\n<li>Length of the array will not exceed <code>10^4</code>. </li>\r\n</ol>\r\n</p>",
	"frequency":"177",
	"ac_num":"28224"
}