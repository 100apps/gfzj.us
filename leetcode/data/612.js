{
	"difficulty":"2",
	"submit_num":"8594",
	"show_id":"634",
	"leetcode_id":"634",
	"answers":[
		{
			"lc_ans_id":"104982",
			"view":"2805",
			"top":"0",
			"title":"[Java] 5 lines O(1) space solution",
			"vote":"11",
			"content":"Details can be found from wiki:\\n[https://en.wikipedia.org/wiki/Derangement#Counting_derangements](https://en.wikipedia.org/wiki/Derangement#Counting_derangements)\\n```    \\n    private static final int M = 1000000007;\\n    public int findDerangement(int n) {\\n        long ans = 1;\\n        for (int i = 1; i <= n; i++) \\n            ans = (i * ans % M + (i % 2 == 0 ? 1 : -1)) % M;\\n        return (int) ans;\\n    }\\n    \\n```"
		},
		{
			"lc_ans_id":"104980",
			"view":"1700",
			"top":"1",
			"title":"Java Solution With Explanation By Using Staggered formula",
			"vote":"8",
			"content":"The Staggered formula is **D(n) = (n-1) [D(n-2) + D(n-1)]\\uff1a**\\n\\nFor the k th element, it has k-1 positions and there are two possibilities for its position\\n\\n* 1.It's not in the first element, so it's going to be the same thing as D(n - 1) \\n\\n* 2.It's in the position of the first element,so there are two elements in the deranged position.\\nSo it's going to be the same thing as D(n - 2) \\n\\nso    **res = ((i-1)*(dn1+dn2))%1000000007;**\\nwhy we use long not int:\\n*a(11) = 14684570\\na(12) = 176214841\\na(13) = 12 * (a(12)  + a(11))  = 2290792932 > Integer.MAX_VALUE*\\n\\n```\\n public int findDerangement(int n) {\\n        long dn2 = 0, dn1 = 1;\\n        long res = n==1 ? 0 : 1; \\n        for (int i = 3; i <= n; i++){\\n            res = ((i-1) * (dn1+dn2))%1000000007;\\n            dn2 = dn1;\\n            dn1 = res;           \\n        }\\n        return (int) res;\\n    }"
		},
		{
			"lc_ans_id":"104986",
			"view":"1206",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"5",
			"content":"```\\ndef findDerangement(self, N):\\n    MOD = 10**9 + 7\\n    X, Y = 1, 0\\n    for n in xrange(2, N+1):\\n        X, Y = Y, (n - 1) * (X + Y) % MOD\\n    return Y\\n```\\n\\nLet ```D(N)``` be the required answer.  The recursion for the number of derangements of N is: ```D(N) = (N-1) * (D(N-1) + D(N-2))```.  With this recursion in hand, the problem becomes similar to finding the N-th fibonacci number.\\n\\nTo prove it, suppose there are people and hats labelled ```1...N```.  We want the number of ways to put a hat on each person such that no person is wearing their hat.  The first person has N-1 choices to put on a hat, say he wears hat X.  Now consider what hat person X is wearing.  Either he takes hat 1, and we have ```D(N-2)``` ways to arrange the remaining hats among people; or he doesn't take hat 1, which if we relabelled it as hat X, would have ```D(N-1)``` ways to arrange the remaining hats."
		},
		{
			"lc_ans_id":"104988",
			"view":"138",
			"top":"3",
			"title":"Python concise solution",
			"vote":"2",
			"content":"Ref: https://en.wikipedia.org/wiki/Derangement\\n````\\ndef findDerangement(self, n):\\n        ret = 0\\n        for i in range(2, n + 1):\\n            ret = (ret * i + (-1 if i & 1 else 1)) % (10**9 + 7)\\n        return ret\\n````\\nMake it 1 line if you like:\\n````    \\ndef findDerangement(self, n, mod=10**9 + 7):\\n        return reduce(lambda x, i: (x * i + (-1) ** i) % mod, range(2, n + 1), 0)"
		},
		{
			"lc_ans_id":"104989",
			"view":"399",
			"top":"4",
			"title":"Java DP solution with explanation",
			"vote":"2",
			"content":"For <code>ith</code> element, we have switch it with one of the previous numbers <code>1,2,...,i-1</code>, and for each picked number j, for the positions left except the one take by <code>i</code>, j can take anyone of them. So there are <code>dp[i - 2]</code> permutation if <code>j</code> can take the original position of <code>i</code>, and <code>dp[i - 1]</code> permutations if <code>j</code> can not take the original position of <code>i</code>.\\n```\\npublic int findDerangement(int n) {\\n        if(n <= 1) return 0;\\n        long[] dp = new long[n + 1];\\n        long mod = 1000000007;\\n        dp[2] = 1;\\n        for(int i = 3; i < dp.length; i++){\\n            dp[i] = (long)(i - 1) * (dp[i - 1] + dp[i - 2]) % mod;\\n        }\\n        return (int)dp[dp.length - 1];\\n    }\\n```"
		},
		{
			"lc_ans_id":"105002",
			"view":"808",
			"top":"5",
			"title":"O(n) Short Java Code",
			"vote":"2",
			"content":"Recursion Formula:\\nD(n) = (n-1) [D(n-2) + D(n-1)]\\n```\\npublic class Solution {\\n    public int findDerangement(int n) {\\n        if (n<2) return 0;\\n        long f[]=new long[n+1];\\n        f[1]=0;f[2]=1;\\n        for (int i=3;i<=n;i++) f[i]=(f[i-1]+f[i-2])*(i-1)%1000000007;\\n        return (int)f[n];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104983",
			"view":"108",
			"top":"6",
			"title":"Very easy to understand C++ with explanation",
			"vote":"1",
			"content":"The **subfactorial function** can be used to calculate the amount of derangements as follows:\\n\\n```!n=(n-1)( !(n-1) + !(n-2) )```\\n\\nLet's break this formula down into individual parts for simple and easy understanding:\\n\\n**Part 0:** ```!n```=(n-1)( !(n-1) + !(n-2) )\\n\\nThis part of the equation is basically just the way we refer to the subfactorial function of N.  Let's create a function name d(n) such that d(n)=!n, then we can write this formula as follows with the same meaning, but instead of a leading \"!\", we have a leading function name \"d\":\\n\\nd(n)=(n-1)( d(n-1) + d(n-2) )\\n\\n**Part 1:** d(n)=```(n-1)```( d(n-1) + d(n-2) )\\n\\nWe know by definition of a derangement, there are (N-1) possible repositions available for any arbitrary i-th position in an array from 1 to N inclusive: [1,2,3,...,N-2,N-1,N].  This is because there are N numbers, and any arbitrary i-th position is allowed to be repositioned into any of those N positions EXCEPT for the i-th position.\\n\\nLet's stop here and look at a simple example where N=2.  For N=2, there are two elements in the array [1,2].  There are (N-1) possible repositions available.  For N=2, (N-1)=(2-1)=1.  That 1 position is available for each of these N numbers.  That is the reason why this formula multiples by (N-1).  1 can be moved into 2's position, and 2 can be moved into 1's position:\\n\\nBefore derangement: [1,2]\\nAfter derangement: [2,1]\\n\\nThere is only one derangement when N=2.  We will build the base case from this example of N=2 after describing the recursive case in Part 2 below.  This will soon be referred to as ```d(2)``` when discussing the base cases in part 3 below.\\n\\n**Part 2 - Recursive Cases:** d(n)=(n-1)```( d(n-1) + d(n-2) )```\\n\\nThis section describes the recursive case.  After we have chosen an arbitrary i-th position, that i-th position can either **1)** be repositioned into the **first position**, or it can **2)** be repositioned into any other position ***EXCEPT* the first position**.\\n\\nCase 1: if the i-th position is repositioned into the first position, then this can be done by swapping position 1 with position i:\\n\\nBefore swap: [ 1, . . . , i, . . . , N ]\\nAfter swap: [ i, . . . , 1, . . . , N ]\\n\\nSo for this case, there are 2 set positions, position 1 is set to i, and position i is set to 1.  Then there are N-2 positions to be deranged leftover, since 1 and i are already in their respective deranged positions for this use case.  1 and i are a total of 2 unique positions.  N without these two positions ( 1 and i ) is formulated as N-2.  These leftover N-2 positions still need to be deranged and are written in the formula as follows:\\n\\nd(n)=(n-1)( d(n-1) + ```d(n-2)``` )\\n\\nCase 2: if the i-th position is repositioned into any other position EXCEPT the first position, then we have N-1 positions to choose from (all N positions, EXCEPT for the first position).  We subtract one from N, since the first position is NOT a possibility for this use case.  Those N-1 positions still need to be deranged ( these N-1 positions include the arbitrary i-th position where 2<=i<=N ):\\n\\nd(n)=(n-1)( ```d(n-1)``` + d(n-2) )\\n\\nThese two use cases are then added together in order to include all possible use cases in the return count of derangements.\\n\\nd(n)=(n-1)```( d(n-1) + d(n-2) )```\\n\\nThen the (N-1) possible repositions available for each use case is multiplied by the sum of these two use cases.  This is the complete formula.  All possible repositions (N-1) multiplied by the sum of all possible use cases for each reposition ( d(n-1) + d(n-2) ).\\n\\nd(n)=```(n-1)( d(n-1) + d(n-2) )```\\n\\n**Part 3 - Base Cases:**\\n\\n```d(0) = 1```\\n```d(1) = 0```\\n\\nThis is strange, right?  To simply explain this, let's first take a look at ```d(1)``` more closely.  How many possible ways can we derange an array of one: [ 1 ]?  There are none.  We cannot move 1 to another position other than it's original position.  Therefore, ```d(1) = 0```.\\n\\nThen why does ```d(0) = 1```?  **Short answer:** because this works and makes sense, similar to why 0 factorial = 1.  **Long answer:** let's take a look back at our previous ```d(2)``` example:\\n\\nd(n)=(n-1)( d(n-1) + d(n-2) )\\n\\n**N=2**\\nd(2)=(2-1)( d(2-1) + d(2-2) )\\nd(2)=(1)( d(1) + d(0) )\\nd(2)=d(1) + d(0)\\n\\nWe know there is 1 derangement for an array of 2:\\n\\nOriginal arrangement: [1,2]\\nAfter 1 derangement: [2,1]\\n\\nTherefore, ```d(2) = 1```, and we also know from above that ```d(1) = 0```.  Since we know ```d(2)```, and we know ```d(1)```, we can derive ```d(0)``` as follows:\\n\\n```d(2) = d(1) + d(0)```\\n```1 = 0 + d(0)```\\n```1 = d(0)```\\n\\n\\n\\n**Part 4 - Simple C++ Solution:** \\n\\nThis solution uses dynamic programming to build from the base cases 0,1, ... until N where curr_n is the current value of N being calculated, dn is the amount of derangements for that current value of N.  And dn_minus_2 and dn_minus_1 are the two previous derangement calculations for dn.\\n\\n```\\nclass Solution{\\npublic:\\n    int findDerangement(int n){\\n        if (n==0) { return 1; }\\n        if (n==1) { return 0; }\\n        int dn=1, dn_minus_1=0, dn_minus_2=1;\\n        for (int curr_n=2; curr_n <= n; curr_n++){\\n            dn=(int)((( curr_n - 1L )*( dn_minus_1 + dn_minus_2 ))%1000000007);\\n            dn_minus_2=dn_minus_1;\\n            dn_minus_1=dn;\\n        }\\n        return dn;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104979",
			"view":"16",
			"top":"7",
			"title":"Java solution with clear explanation",
			"vote":"0",
			"content":"Idea:\\nM[i] represents the number of derangement for i integers from 1 to i;\\nBase case: M[1] = 0; M[2] = 1;\\nInduction rule: M[i] = (i - 1) * (M[i - 1] + M[i - 2]); \\ni-th position has i-1 choices, assume i choose j-th integer;  \\ntwo possibilities: \\nj-th position choose i, there are n - 2 numbers and n - 2 positions to choose;\\nj-th position doesn\\u2019t choose i, label i number as j, now we have n - 1 numbers and n - 1 positions to choose.\\n\\nTime = O(n);\\nSpace = O(n) \\u2192 O(1), only need to keep previous two elements.\\n\\n```\\nclass Solution {\\n    public int findDerangement(int n) {\\n        // sanity check\\n        if (n <= 1) {\\n            return 0;\\n        }\\n        long mod = 1000000007;\\n        long prevprev = 0; // M[1] = 0;\\n        long prev = 1; // M[2] = 1;\\n        for (int i = 3; i <= n; i++) {\\n            long cur = ((i - 1) * (prev + prevprev)) % mod;\\n            prevprev = prev;\\n            prev = cur;\\n        }\\n        return (int) (prev % mod);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104981",
			"view":"47",
			"top":"8",
			"title":"If you don't understand",
			"vote":"0",
			"content":"This is actually a simple DP problem.\\nDP formula is: D(n) = (n-1) [D(n-2) + D(n-1)]\\n\\nI don't understand this at start so I read other discuss, didn't found their explanation very clear, so I'd like to do a more detailed explanation here.\\n\\nlet's consider what D(n) means, it means the number of derangement for an array with index from 1 to n, and value from 1 to n. \\nThen let's think about value n, we know it can not be put on index n, instead, it can be put on index 1 to n-1, so there are n-1 possibilities.\\nFor each of the situation above, let's say value n is put on index i, then we need to discuss about where we put value i:\\n1.if value i is put on index n (looks like value i and value n swapped their positions), then we can just ignore value i, value n, index i, index n, what's left are n-2 different values and n-2 different indexes, the problem becomes D(n-2).\\n2.if value i is not put on index n, then we can only ignore value n and index i, what's left are n-1 different values and n-1 different indexes, each value has an index that it can not be put on. (value i can not be put on index n here) So the problem becomes D(n-1).\\n\\nTherefore, D(n) = (n-1) [D(n-2) + D(n-1)].\\n\\nSimple DP solution:\\n```\\nclass Solution {\\n    public int findDerangement(int n) {\\n        if (n <= 1) return 0;\\n        long dp[] = new long[n + 1];\\n        long mod = 1000000007;\\n        dp[2] = 1;\\n        for (int i = 3; i <= n; i++) {\\n            dp[i] = (i - 1) * (dp[i - 1] + dp[i - 2]) % mod;\\n        }\\n        return (int)dp[n];        \\n    }\\n}\\n```\\nOptimize space to O(1):\\n```\\nclass Solution {\\n    public int findDerangement(int n) {\\n        if (n <= 1) return 0;\\n        if (n == 2) return 1;\\n        long prevPrev = 0, prev = 1, curr = 0;\\n        long mod = 1000000007;\\n        for (int i = 3; i <= n; i++) {\\n            curr = (i - 1) * (prevPrev + prev) % mod;\\n            prevPrev = prev;\\n            prev = curr;\\n        }\\n        return (int)curr;\\n    }    \\n}\\n```"
		},
		{
			"lc_ans_id":"104985",
			"view":"54",
			"top":"9",
			"title":"C++ 8 lines O(1) dp solution",
			"vote":"0",
			"content":"reference: https://en.wikipedia.org/wiki/Derangement\\n```\\n    int findDerangement(int n) {\\n        if(n < 3) return n == 2 ? 1 : 0;\\n        const long limit = 1000000007;\\n        long prepre = 0, pre = 1, cur;\\n        for(int i = 3; i <= n; ++i){\\n            cur = ((i - 1) * (pre + prepre)) % limit;\\n            prepre = pre;\\n            pre = cur;\\n        }\\n        return cur;\\n    }\\n```"
		}
	],
	"id":"612",
	"title":"Find the Derangement of An Array",
	"content":"<p>\r\nIn combinatorial mathematics, a derangement is a permutation of the elements of a set, such that no element appears in its original position.\r\n</p>\r\n\r\n<p>\r\nThere's originally an array consisting of <code>n</code> integers from 1 to <code>n</code> in ascending order, you need to find the number of derangement it can generate.\r\n</p>\r\n\r\n<p>\r\nAlso, since the answer may be very large, you should return the output mod 10<sup>9</sup> + 7.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> 3\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> The original array is [1,2,3]. The two derangements are [2,3,1] and [3,1,2].\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br/>\r\n<code>n</code> is in the range of [1, 10<sup>6</sup>].\r\n</p>",
	"frequency":"78",
	"ac_num":"3040"
}