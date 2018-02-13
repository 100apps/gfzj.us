{
	"difficulty":"2",
	"submit_num":"75301",
	"show_id":"396",
	"leetcode_id":"396",
	"answers":[
		{
			"lc_ans_id":"87853",
			"view":"15188",
			"top":"0",
			"title":"Java O(n) solution with explanation",
			"vote":"114",
			"content":"```\\nF(k) = 0 * Bk[0] + 1 * Bk[1] + ... + (n-1) * Bk[n-1]\\nF(k-1) = 0 * Bk-1[0] + 1 * Bk-1[1] + ... + (n-1) * Bk-1[n-1]\\n       = 0 * Bk[1] + 1 * Bk[2] + ... + (n-2) * Bk[n-1] + (n-1) * Bk[0]\\n```\\nThen,\\n```\\nF(k) - F(k-1) = Bk[1] + Bk[2] + ... + Bk[n-1] + (1-n)Bk[0]\\n              = (Bk[0] + ... + Bk[n-1]) - nBk[0]\\n              = sum - nBk[0]\\n```\\nThus,\\n```\\nF(k) = F(k-1) + sum - nBk[0]\\n```\\n\\nWhat is Bk[0]?\\n```\\nk = 0; B[0] = A[0];\\nk = 1; B[0] = A[len-1];\\nk = 2; B[0] = A[len-2];\\n...\\n```\\n```java\\nint allSum = 0;\\nint len = A.length;\\nint F = 0;\\nfor (int i = 0; i < len; i++) {\\n    F += i * A[i];\\n    allSum += A[i];\\n}\\nint max = F;\\nfor (int i = len - 1; i >= 1; i--) {\\n    F = F + allSum - len * A[i];\\n    max = Math.max(F, max);\\n}\\nreturn max;   \\n```"
		},
		{
			"lc_ans_id":"87842",
			"view":"8689",
			"top":"1",
			"title":"Java Solution O(n) with non mathametical explaination",
			"vote":"80",
			"content":"Consider we have 5 coins A,B,C,D,E\\n\\nAccording to the problem statement \\nF(0) = (0*A)  +  (1*B) +  (2*C) + (3*D) + (4*E)\\nF(1) = (4*A)  +  (0*B) +  (1*C) + (2*D) + (3*E)\\nF(2) = (3*A)  +  (4*B) +  (0*C) + (1*D) + (2*E)\\n\\nThis problem at a glance seem like a difficult problem. I am not very strong in mathematics, so this is how I visualize this problem \\n\\nWe can construct F(1) from F(0) by two step:\\nStep 1. taking away one count of each coin from F(0), this is done by subtracting \"sum\" from \"iteration\" in the code below\\nafter step 1 F(0) = (-1*A)  +  (0*B) +  (1*C) + (2*D) + (3*E)\\n\\nStep 2. Add n times the element which didn't contributed in F(0), which is A. This is done by adding \"A[j-1]*len\" in the code below.\\nafter step 2 F(0) = (4*A)  +  (0*B) +  (1*C) + (2*D) + (3*E)  \\n\\nAt this point F(0) can be considered as F(1) and F(2) to F(4) can be constructed by repeating the above steps. \\n\\nHope this explanation helps, cheers!\\n\\n  \\n```\\n    public int maxRotateFunction(int[] A) {\\n        if(A.length == 0){\\n            return 0;\\n        }\\n        \\n        int sum =0, iteration = 0, len = A.length;\\n        \\n        for(int i=0; i<len; i++){\\n            sum += A[i];\\n            iteration += (A[i] * i);\\n        }\\n        \\n        int max = iteration;\\n        for(int j=1; j<len; j++){\\n            // for next iteration lets remove one entry value of each entry and the prev 0 * k\\n            iteration = iteration - sum + A[j-1]*len;\\n            max = Math.max(max, iteration);\\n        }\\n        \\n        return max;\\n    }\\n```"
		},
		{
			"lc_ans_id":"87916",
			"view":"2685",
			"top":"2",
			"title":"Java solution",
			"vote":"16",
			"content":"```\\npublic class Solution {\\n\\n\\tpublic int maxRotateFunction(int[] A) {\\n\\t\\tint n = A.length;\\n\\t\\tint sum = 0;\\n\\t\\tint candidate = 0;\\n\\n\\t\\tfor (int i = 0; i < n; i++) {\\n\\t\\t\\tsum += A[i];\\n\\t\\t\\tcandidate += A[i] * i;\\n\\t\\t}\\n\\t\\tint best = candidate;\\n\\n\\t\\tfor (int i = n - 1; i > 0; i--) {\\n\\t\\t\\tcandidate = candidate + sum - A[i] * n;\\n\\t\\t\\tbest = Math.max(best, candidate);\\n\\t\\t}\\n\\t\\treturn best;\\n\\t}\\n}\\n```"
		},
		{
			"lc_ans_id":"87917",
			"view":"2249",
			"top":"3",
			"title":"C++ solution",
			"vote":"8",
			"content":"```\\n\\tint maxRotateFunction(vector<int>& A) {\\n\\t\\tif (A.size() == 0) return 0;\\n\\n\\t\\tlong long allsum = 0;\\n\\t\\tlong long sum2 = 0;\\n\\t\\tfor (int i = 0; i < A.size(); i++) {\\n\\t\\t\\tallsum += A[i] * i;\\n\\t\\t\\tsum2 += A[i];\\n\\t\\t}\\n\\n\\t\\tlong long result = allsum;\\n\\t\\tfor (int i = 0; i < A.size(); i++) {\\n\\t\\t\\tallsum -= sum2;\\n\\t\\t\\tallsum += A[i];\\n\\t\\t\\tallsum += A[i] * int(A.size() - 1);\\n\\t\\t\\tresult = max(allsum, result);\\n\\t\\t}\\n\\n\\t\\treturn result;\\n\\t}\\n```"
		},
		{
			"lc_ans_id":"87861",
			"view":"1865",
			"top":"4",
			"title":"My O(n) Simple C++ Solution",
			"vote":"6",
			"content":"```\\nclass Solution {\\npublic:\\n    int maxRotateFunction(vector<int>& A) {\\n        int F = 0, sum = 0, n = A.size();\\n        for (int i = 0; i < n; ++i){\\n            F += i * A[i];\\n            sum += A[i];\\n        }\\n        int m = F;\\n        for (int i = n - 1; i >= 0; --i){\\n            F = F + sum - n * A[i];\\n            m = max(m, F);\\n        }\\n        return m;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87914",
			"view":"1383",
			"top":"5",
			"title":"Python 59ms simple solution",
			"vote":"6",
			"content":"```\\nclass Solution(object):\\n    def maxRotateFunction(self, A):\\n        \"\"\"\\n        :type A: List[int]\\n        :rtype: int\\n        \"\"\"\\n        if len(A) == 0:\\n            return 0\\n        totalSum = sum(A)\\n        lMax = 0 \\n        for i in range(len(A)):\\n            lMax += i * A[i]\\n        gMax = lMax\\n        for i in range(len(A)-1, 0, -1):\\n            lMax += (totalSum - A[i] * len(A))\\n            gMax = max(gMax, lMax)\\n        return gMax\\n```"
		},
		{
			"lc_ans_id":"87878",
			"view":"279",
			"top":"6",
			"title":"C# - same solution but different take on explaination",
			"vote":"5",
			"content":"To me it is easier to see the solution if you leave the array as is and rotate the factors left (same result as rotating array right).\\n\\nFor simplicity take an array with 4 elements\\n[a,b,c,d]\\n\\nf(0) = 0a + 1b + 2c +3d\\nf(1) = 3a + 0b + 1c +2d\\nf(2) = 2a + 3b + 0c +1d\\nf(3) = 1a + 2b + 3c +0d\\n\\nNow look what happens when you take difference between f(k) - f(k-1)\\nf(1) - f(0) = 3a - b - c - d = 4a - (a + b + c + d) = length * a - sum\\nf(2) - f(1) = -a + 3b - c - d = 4b - (a + b + c + d) = length * b - sum\\nf(3) - f(2) = -a - b +3c - d = 4c - (a + b + c + d) = length * c - sum\\n\\nYou can see if you calculate (manually) f(0) you can get f(1) by adding length * a and subtracting the sum.\\n\\nSo initially you need to compute the sum and f(0) then just iterate through and get the value of f(i) for each i and record the max.\\n\\nHope that helps!\\n\\n\\n    public int MaxRotateFunction(int[] A) {\\n        \\n        int sum = 0;\\n        for (int i = 0; i < A.Length; i++) sum += A[i];\\n        \\n        int prev = 0;\\n        for (int i = 0; i < A.Length; i++) prev += i * A[i];\\n        \\n        int max = prev;\\n        for (int i = 1; i < A.Length; i++)\\n        {\\n            int curr = prev - sum + A[i-1]*A.Length;\\n            max = curr > max ? curr : max;\\n            prev = curr;\\n        }\\n        \\n        return max;\\n    }"
		},
		{
			"lc_ans_id":"87870",
			"view":"318",
			"top":"7",
			"title":"matrix is a good way to understand this problem",
			"vote":"4",
			"content":"The function is a product of matrices ,like:\\n  F(k) =   [k,  k+1...n-2,n-1,0,....k-1] * A[n]\\n  F(k+1) = [k+1,k+2...n-1,0,  1,.....k] * A[n]\\n so \\n  F(k+1) - F(k) = [1,1,1...-n+1,1,1,1] * A[n] = sum(A[n]) - n * A[n - 1 - k];"
		},
		{
			"lc_ans_id":"87868",
			"view":"977",
			"top":"8",
			"title":"Java Solution",
			"vote":"3",
			"content":"This is essentially a Math problem.\\nConsider the array [ A, B, C, D ] with very simple coefficients as following:\\n\\nf(0) = 0A + 1B + 2C + 3D\\nf(1) = 3A + 0B + 1C + 2D\\nf(2) = 2A + 3B + 0C + 1D\\nf(3) = 1A + 2B + 3C + 0D\\n\\nWe can see from above that:\\nf(0) -> f(1) -> f(2) -> f(3)\\nf(i) = f(i - 1) - SUM(A -> D) + N * A[i - 1]\\n\\n```\\npublic class Solution {\\n    public int maxRotateFunction(int[] A) {\\n        int n = A.length;\\n\\tint sum = 0;\\n\\tint candidate = 0;\\n\\n\\tfor (int i = 0; i < n; i++) {\\n\\t\\tsum += A[i];\\n\\t\\tcandidate += A[i] * i;\\n\\t}\\n\\tint best = candidate;\\n\\n\\tfor (int i = 1; i < n; i++) {\\n\\t\\tcandidate = candidate - sum + A[i - 1] * n;\\n\\t\\tbest = Math.max(best, candidate);\\n\\t}\\n\\treturn best;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"87871",
			"view":"822",
			"top":"9",
			"title":"Python O(n), Math with explaination",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def maxRotateFunction(self, A):\\n        sumA=sum(A)\\n        temp=0\\n        for i,c in enumerate(A):\\n            temp+=i*c\\n        maxx=temp\\n        for j in xrange(len(A)):\\n            temp+=(len(A)*A[j]-sumA)\\n            maxx=max(temp,maxx)\\n        return maxx\\n```\\nFirst you get the temp by multiplyng each index and value. Then for each time you rotate index by clockwise, it's interesting to see the sum increases by len(A)*A[j]-sum. And you just need to find the max one.\\nFor instance, you have INDEX of [0,1,2,3,4,5], next it changes to [5,0,1,2,3,4], the temp increases by 5*first index's value i by 5*A[j] - the rest numbers' sum, which means the temp increses by 6(the length of A) * A[j] - the total number's sum. Because other numbers' index just \"decreased\" by one, expect the one whose \"last\" index was 0."
		}
	],
	"id":"396",
	"title":"Rotate Function",
	"content":"<p>\r\nGiven an array of integers <code>A</code> and let <i>n</i> to be its length.\r\n</p>\r\n\r\n<p>\r\nAssume <code>B<sub>k</sub></code> to be an array obtained by rotating the array <code>A</code> <i>k</i> positions clock-wise, we define a \"rotation function\" <code>F</code> on <code>A</code> as follow:\r\n</p>\r\n\r\n<p>\r\n<code>F(k) = 0 * B<sub>k</sub>[0] + 1 * B<sub>k</sub>[1] + ... + (n-1) * B<sub>k</sub>[n-1]</code>.</p>\r\n\r\n<p>Calculate the maximum value of <code>F(0), F(1), ..., F(n-1)</code>. \r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<i>n</i> is guaranteed to be less than 10<sup>5</sup>.\r\n</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nA = [4, 3, 2, 6]\r\n\r\nF(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25\r\nF(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16\r\nF(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23\r\nF(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26\r\n\r\nSo the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.\r\n</pre>\r\n</p>",
	"frequency":"276",
	"ac_num":"25348"
}