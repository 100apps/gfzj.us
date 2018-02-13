{
	"difficulty":"2",
	"submit_num":"242398",
	"show_id":"89",
	"leetcode_id":"89",
	"answers":[
		{
			"lc_ans_id":"29881",
			"view":"33439",
			"top":"0",
			"title":"An accepted three line solution in JAVA",
			"vote":"138",
			"content":"    public List<Integer> grayCode(int n) {\\n        List<Integer> result = new LinkedList<>();\\n        for (int i = 0; i < 1<<n; i++) result.add(i ^ i>>1);\\n        return result;\\n    }\\n\\nThe idea is simple. G(i) = i^ (i/2)."
		},
		{
			"lc_ans_id":"29891",
			"view":"14835",
			"top":"1",
			"title":"Share my solution",
			"vote":"105",
			"content":"My idea is to generate the sequence iteratively. For example, when n=3, we can get the result based on n=2. \\n00,01,11,10 -> (000,001,011,010 ) (110,111,101,100). The middle two numbers only differ at their highest bit, while the rest numbers of part two are exactly symmetric of part one. It is easy to see its correctness.\\nCode is simple:\\n\\n----------\\n\\n    public List<Integer> grayCode(int n) {\\n        List<Integer> rs=new ArrayList<Integer>();\\n        rs.add(0);\\n        for(int i=0;i<n;i++){\\n            int size=rs.size();\\n            for(int k=size-1;k>=0;k--)\\n                rs.add(rs.get(k) | 1<<i);\\n        }\\n        return rs;\\n    }"
		},
		{
			"lc_ans_id":"29884",
			"view":"28255",
			"top":"2",
			"title":"What is the best solution for Gray Code problem? No extra space used and no recursion?",
			"vote":"61",
			"content":"  I have a solution here which takes O(1) on space and no recursion used. Is this the best possible solution?  (I combined the base cases in the loop as mike3 does. Thanks mike3!)\\n\\n    vector<int> grayCode(int n) \\n    {         \\n        vector<int> result(1, 0);        \\n        for (int i = 0; i < n; i++) {\\n            int curCount = result.size();\\n            // push back all element in result in reverse order\\n            while (curCount) {\\n                curCount--;\\n                int curNum = result[curCount];\\n                curNum += (1<<i);\\n                result.push_back(curNum);\\n            } \\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"29893",
			"view":"5565",
			"top":"3",
			"title":"One-liner Python solution (with demo in comments)",
			"vote":"38",
			"content":"All you need is a bit of careful thought.\\n\\nBtw, it's extremely useful to write down your thought/demo in comments before you actually start to write the code, especially during interview. \\n\\nEven if you do not solve the problem finally, the interviewer at least get to know what you're thinking. \\n\\nAnd if you don't get the problem right, he/she will have a chance to correct you.\\n\\n    class Solution:\\n        # @return a list of integers\\n        '''\\n        from up to down, then left to right\\n        \\n        0   1   11  110\\n                10  111\\n                    101\\n                    100\\n                    \\n        start:      [0]\\n        i = 0:      [0, 1]\\n        i = 1:      [0, 1, 3, 2]\\n        i = 2:      [0, 1, 3, 2, 6, 7, 5, 4]\\n        '''\\n        def grayCode(self, n):\\n            results = [0]\\n            for i in range(n):\\n                results += [x + pow(2, i) for x in reversed(results)]\\n            return results"
		},
		{
			"lc_ans_id":"29882",
			"view":"11497",
			"top":"4",
			"title":"What if I have no knowledge over Gray Code before?",
			"vote":"27",
			"content":"A simple Google search will reveal the secret behind Gray Code, of course. Knowing the formula, this question can be solved within 5 minutes. But what if I've never known anything about Gray Code? Is it feasible for someone to derive the formula during an interview? I think I would just get stuck for 45 minutes trying to figure out how to generate an algorithm for it. Is this question intended to test one's knowledge base?"
		},
		{
			"lc_ans_id":"30045",
			"view":"7037",
			"top":"5",
			"title":"Share my simple way of this problem^_^",
			"vote":"24",
			"content":"    class Solution {\\n    public:\\n        vector<int> grayCode(int n) {\\n            int N(1 << n), tmp;\\n            vector<int> result;\\n            for(int i(0); i < N; i++)\\n            {\\n                tmp = i << 1;\\n                result.push_back((tmp^i) >> 1);\\n            }\\n            return result;\\n        }\\n    };\\n\\nAs we known:\\n\\n    Gi = Bi+1 xor Bi\\n\\nFor example, trans binay '001' to gray code:\\n\\n    tmp = 001 << 1\\n\\nthen,\\n\\n    bin 0 0 0 1\\n    tmp 0 0 1 0\\n    -xor------------\\n        0 0 1 1\\nand the gray code is:\\n\\n    0 0 1 1 >> 1 (ignore last bit) => 0 0 1"
		},
		{
			"lc_ans_id":"29880",
			"view":"3288",
			"top":"6",
			"title":"Backtracking C++ solution",
			"vote":"20",
			"content":"    class Solution {\\n        void utils(bitset<32>& bits, vector<int>& result, int k){\\n            if (k==0) {\\n                result.push_back(bits.to_ulong());\\n            }\\n            else {\\n                utils(bits, result, k-1);\\n                bits.flip(k-1);\\n                utils(bits, result, k-1);\\n            }\\n        }\\n    public:\\n        vector<int> grayCode(int n) {\\n            bitset<32> bits;\\n            vector<int> result;\\n            utils(bits, result, n);\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"30028",
			"view":"2372",
			"top":"7",
			"title":"4 lines C++ code.",
			"vote":"19",
			"content":"You can also view more solution on [Github](https://github.com/flexwang/CodeTest)\\n\\n    class Solution {\\n    public:\\n        vector<int> grayCode(int n) {\\n            vector<int> ans(1<<n);\\n            for (int i=0; i<(1<<n); i++) \\n                ans[i] = i^(i>>1);\\n            return ans;\\n        }\\n    };\\n\\nI try to give a simple proof here. Let's denote i^(i>>1) as f(i). To proof f(i) is the ith gray code, we only need to prove the following statements:\\n\\n 1. f(0) = 0\\n 2. (i) and f(i+1) only differs in one digit\\n 3. f(i) is bijective, e.g. f(i) = f(j) if and only if i = j.\\n\\nThe first one is obvious. \\n\\nFor the second , f(i) ^ f(i+1) = i^(i>>1)^(i+1)^((i+1)>>1) = (i^(i+1)) ^ ((i^(i+1)) >> 1). Let's denote g(i) = i^(i+1), g(i) has the form of 0000111...111. So f(i) ^ f(i+1) = g(i) ^ g(i)>>1 = 00001000...000.\\n\\nThe third part can be proved alike."
		},
		{
			"lc_ans_id":"30084",
			"view":"2640",
			"top":"8",
			"title":"4ms simple iterative solution",
			"vote":"19",
			"content":"    vector<int> grayCode(int n) {\\n        vector<int> result = { 0 };\\n        int t = 1;\\n        for(int i = 0; i<n; i++) {\\n            for(int j = result.size() - 1; j >= 0; j--)\\n                result.push_back(result[j]^t);\\n            t <<= 1;\\n        }\\n        \\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"29887",
			"view":"1032",
			"top":"9",
			"title":"When n = 0, it should return []",
			"vote":"17",
			"content":"n = 0 mean the length is 0, so the program should return [].\\n\\nGo fix the test case please."
		}
	],
	"id":"89",
	"title":"Gray Code",
	"content":"<p>The gray code is a binary numeral system where two successive values differ in only one bit.</p>\r\n\r\n<p>Given a non-negative integer <i>n</i> representing the total number of bits in the code, print the sequence of gray code. A gray code sequence must begin with 0.</p>\r\n\r\n<p>For example, given <i>n</i> = 2, return <code>[0,1,3,2]</code>. Its gray code sequence is:</p>\r\n<pre>\r\n00 - 0\r\n01 - 1\r\n11 - 3\r\n10 - 2\r\n</pre>\r\n\r\n<p><b>Note:</b><br />\r\nFor a given <i>n</i>, a gray code sequence is not uniquely defined.\r\n</p>\r\n<p>For example, <code>[0,2,3,1]</code> is also a valid gray code sequence according to the above definition.</p>\r\n\r\n<p>For now, the judge is able to judge based on one instance of gray code sequence. Sorry about that.</p>",
	"frequency":"474",
	"ac_num":"102097"
}