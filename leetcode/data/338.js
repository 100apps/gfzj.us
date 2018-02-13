{
	"difficulty":"2",
	"submit_num":"163517",
	"show_id":"338",
	"leetcode_id":"338",
	"answers":[
		{
			"lc_ans_id":"79539",
			"view":"36283",
			"top":"0",
			"title":"Three-Line Java Solution",
			"vote":"314",
			"content":"An easy recurrence for this problem is f[i] = f[i / 2] + i % 2.\\n\\n\\n    public int[] countBits(int num) {\\n        int[] f = new int[num + 1];\\n        for (int i=1; i<=num; i++) f[i] = f[i >> 1] + (i & 1);\\n        return f;\\n    }"
		},
		{
			"lc_ans_id":"79527",
			"view":"17065",
			"top":"1",
			"title":"Four lines, C++, time O(n), space O(n)",
			"vote":"144",
			"content":"    class Solution {\\n    public:\\n        vector<int> countBits(int num) {\\n            vector<int> ret(num+1, 0);\\n            for (int i = 1; i <= num; ++i)\\n                ret[i] = ret[i&(i-1)] + 1;\\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"79557",
			"view":"12187",
			"top":"2",
			"title":"How we handle this question on interview [Thinking process + DP solution]",
			"vote":"107",
			"content":"**Question:**\\nGiven a non negative integer number num. For every numbers i in the range 0 \\u2264 i \\u2264 num calculate the number of 1's in their binary representation and return them as an array.\\n\\n**Thinking:**\\n\\n1) We do not need check the input parameter, because the question has already mentioned that the number is non negative.\\n\\n2) How we do this? The first idea come up with is find the pattern or rules for the result. Therefore, we can get following pattern\\n\\n**Index :** 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15\\n\\n**num  :**   **0  1  1  2**  `1  2  2  3`  `1  2  2   3`   **2   3   3   4**\\n\\nDo you find the pattern?\\n\\nObviously, this is overlap sub problem, and we can come up the DP solution. For now, we need find the function to implement DP.\\n\\ndp[0] = 0;\\n\\ndp[1] = dp[0] + 1;\\n\\ndp[2] = dp[0] + 1;\\n\\ndp[3] = dp[1] +1;\\n\\ndp[4] = dp[0] + 1;\\n\\ndp[5] = dp[1] + 1;\\n\\ndp[6] = dp[2] + 1;\\n\\ndp[7] = dp[3] + 1;\\n\\ndp[8] = dp[0] + 1;\\n...\\n\\nThis is the function we get, now we need find the other pattern for the function to get the general function. After we analyze the above function, we can get\\ndp[0] = 0;\\n\\ndp[1] = dp[1-1] + 1;\\n\\ndp[2] = dp[2-2] + 1;\\n\\ndp[3] = dp[3-2] +1;\\n\\ndp[4] = dp[4-4] + 1;\\n\\ndp[5] = dp[5-4] + 1;\\n\\ndp[6] = dp[6-4] + 1;\\n\\ndp[7] = dp[7-4] + 1;\\n\\ndp[8] = dp[8-8] + 1;\\n..\\n\\nObviously, we can find the pattern for above example, so now we get the general function\\n\\n**dp[index] = dp[index - offset] + 1;**\\n\\n**Coding:**\\n\\n    public int[] countBits(int num) {\\n        int result[] = new int[num + 1];\\n        int offset = 1;\\n        for (int index = 1; index < num + 1; ++index){\\n            if (offset * 2 == index){\\n                offset *= 2;\\n            }\\n            result[index] = result[index - offset] + 1;\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"79615",
			"view":"9362",
			"top":"3",
			"title":"Simple Java O(n) solution using two pointers",
			"vote":"62",
			"content":"This uses the hint from the description about using ranges.  Basically, the numbers in one range are equal to 1 plus all of the numbers in the ranges before it.  If you write out the binary numbers, you can see that numbers 8-15 have the same pattern as 0-7 but with a 1 at the front.\\n\\nMy logic was to copy the previous values (starting at 0) until a power of 2 was hit (new range), at which point we just reset the t pointer back to 0 to begin the new range.\\n\\n    public int[] countBits(int num) {\\n        int[] ret = new int[num+1];\\n        ret[0] = 0;\\n        int pow = 1;\\n        for(int i = 1, t = 0; i <= num; i++, t++) {\\n            if(i == pow) {\\n                pow *= 2;\\n                t = 0;\\n            }\\n            ret[i] = ret[t] + 1;\\n        }\\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"79552",
			"view":"5405",
			"top":"4",
			"title":"My C++ solution, 3 lines of code.",
			"vote":"25",
			"content":"     vector<int> countBits(int num) {\\n        vector<int> bits(num+1, 0);\\n        for (int i = 1; i <= num; i++) bits[i] += bits[i & (i-1)] + 1;\\n        return bits;\\n     }"
		},
		{
			"lc_ans_id":"79861",
			"view":"2234",
			"top":"5",
			"title":"Simple and 4 lines",
			"vote":"20",
			"content":"    class Solution {\\n    public:\\n        vector<int> countBits(int num) {\\n    \\n            vector<int> res(num+1,0);\\n           \\n            for(int i = 1; i < res.size();i++)\\n                res[i] = i%2 + res[i/2];\\n    \\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"79812",
			"view":"1843",
			"top":"6",
			"title":"Simple Java Dynamic Programming without any bitwise operation",
			"vote":"17",
			"content":" public int[] countBits(int num) {\\n\\n        int[] bits = new int[num + 1];    \\n        for(int i = 1; i <= num; i++){\\n            bits[i] = bits[i/2];\\n            if(i%2 == 1) bits[i]++; \\n        }\\n        return bits;\\n    }"
		},
		{
			"lc_ans_id":"79740",
			"view":"676",
			"top":"7",
			"title":"Cute lovely simple C++ solution",
			"vote":"14",
			"content":"    class Solution {\\n    public:\\n        vector<int> countBits(int num) {\\n            vector<int> r;\\n            r.push_back(0);\\n            for (int i=1;i<=num;i++){\\n                int x = r[i/2]+ (i%2);\\n                r.push_back(x);\\n            }\\n            return r;\\n        }\\n    };\\n\\nBecause for an integer i, when i/2 equals to the bit representation of i shift right for one bit. \\nSo it's r[i/2]. And we just need to add i%2 which is the most right hand side of the bit set."
		},
		{
			"lc_ans_id":"79791",
			"view":"1323",
			"top":"8",
			"title":"Java 2ms O(n) solution",
			"vote":"14",
			"content":"    public class Solution {\\n        public int[] countBits(int num) {\\n            int arr[] = new int[num+1];\\n            arr[0] = 0;\\n            for (int i = 1; i <= num; ++i) {\\n                arr[i] = arr[i & i-1] + 1;\\n            }\\n            return arr;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"79548",
			"view":"1082",
			"top":"9",
			"title":"Easy Understanding DP & Bit Java Solution",
			"vote":"13",
			"content":"    public class Solution {\\n        public int[] countBits(int num) {\\n            int[] result = new int[num + 1];\\n            result[0] = 0;\\n            for (int i = 1; i <= num; i++) {\\n                result[i] = result[i&(i-1)] + 1;\\n            }\\n            return result;\\n        }\\n    }\\n\\nSimply get the previous result with one less 1 and plus 1 to get the result."
		}
	],
	"id":"338",
	"title":"Counting Bits",
	"content":"<p>Given a non negative integer number <b>num</b>. For every numbers <b>i</b> in the range <b>0 &le; i &le; num</b> calculate the number of 1's in their binary representation and return them as an array.\r\n</p>\r\n<p>\r\n<b>Example:</b></br>\r\nFor <code>num = 5</code> you should return <code>[0,1,1,2,1,2]</code>.\r\n</p>\r\n<p>\r\n<b>Follow up:</b>\r\n<ul>\r\n<li>It is very easy to come up with a solution with run time <b>O(n*sizeof(integer))</b>. But can you do it in linear time <b>O(n)</b> /possibly in a single pass?</li>\r\n<li>Space complexity should be <b>O(n)</b>.</li>\r\n<li>Can you do it like a boss? Do it without using any builtin function like <b>__builtin_popcount</b>  in c++ or in any other language.</li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/syedee\">@ syedee </a> for adding this problem and creating all test cases.</p>",
	"frequency":"548",
	"ac_num":"101353"
}