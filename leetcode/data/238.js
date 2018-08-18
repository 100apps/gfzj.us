{
	"difficulty":"2",
	"submit_num":"266536",
	"show_id":"238",
	"leetcode_id":"238",
	"answers":[
		{
			"lc_ans_id":"65622",
			"view":"68218",
			"top":"0",
			"title":"Simple Java solution in O(n) without extra space",
			"vote":"412",
			"content":"    public class Solution {\\n    public int[] productExceptSelf(int[] nums) {\\n        int n = nums.length;\\n        int[] res = new int[n];\\n        res[0] = 1;\\n        for (int i = 1; i < n; i++) {\\n            res[i] = res[i - 1] * nums[i - 1];\\n        }\\n        int right = 1;\\n        for (int i = n - 1; i >= 0; i--) {\\n            res[i] *= right;\\n            right *= nums[i];\\n        }\\n        return res;\\n    }\\n}"
		},
		{
			"lc_ans_id":"65638",
			"view":"20396",
			"top":"1",
			"title":"My simple Java solution",
			"vote":"126",
			"content":"Use `tmp` to store temporary multiply result by two directions. Then fill it into `result`. Bingo!\\n\\n    public int[] productExceptSelf(int[] nums) {\\n        int[] result = new int[nums.length];\\n        for (int i = 0, tmp = 1; i < nums.length; i++) {\\n            result[i] = tmp;\\n            tmp *= nums[i];\\n        }\\n        for (int i = nums.length - 1, tmp = 1; i >= 0; i--) {\\n            result[i] *= tmp;\\n            tmp *= nums[i];\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"65627",
			"view":"17122",
			"top":"2",
			"title":"O(n) time and O(1) space C++ solution with explanation",
			"vote":"104",
			"content":"First, consider O(n) time and O(n) space solution.\\n\\n    class Solution {\\n    public:\\n        vector<int> productExceptSelf(vector<int>& nums) {\\n            int n=nums.size();\\n            vector<int> fromBegin(n);\\n            fromBegin[0]=1;\\n            vector<int> fromLast(n);\\n            fromLast[0]=1;\\n            \\n            for(int i=1;i<n;i++){\\n                fromBegin[i]=fromBegin[i-1]*nums[i-1];\\n                fromLast[i]=fromLast[i-1]*nums[n-i];\\n            }\\n            \\n            vector<int> res(n);\\n            for(int i=0;i<n;i++){\\n                res[i]=fromBegin[i]*fromLast[n-1-i];\\n            }\\n            return res;\\n        }\\n    };\\n\\nWe just need to change the two vectors to two integers and note that we should do multiplying operations for two related elements of the results vector in each loop.\\n\\n    class Solution {\\n    public:\\n        vector<int> productExceptSelf(vector<int>& nums) {\\n            int n=nums.size();\\n            int fromBegin=1;\\n            int fromLast=1;\\n            vector<int> res(n,1);\\n            \\n            for(int i=0;i<n;i++){\\n                res[i]*=fromBegin;\\n                fromBegin*=nums[i];\\n                res[n-1-i]*=fromLast;\\n                fromLast*=nums[n-1-i];\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"65625",
			"view":"14070",
			"top":"3",
			"title":"Python solution (Accepted), O(n) time, O(1) space",
			"vote":"68",
			"content":"    class Solution:\\n        # @param {integer[]} nums\\n        # @return {integer[]}\\n        def productExceptSelf(self, nums):\\n            p = 1\\n            n = len(nums)\\n            output = []\\n            for i in range(0,n):\\n                output.append(p)\\n                p = p * nums[i]\\n            p = 1\\n            for i in range(n-1,-1,-1):\\n                output[i] = output[i] * p\\n                p = p * nums[i]\\n            return output"
		},
		{
			"lc_ans_id":"65632",
			"view":"12208",
			"top":"4",
			"title":"My solution beats 100% java solutions",
			"vote":"67",
			"content":"The idea is simply. The product basically is calculated using the numbers before the current number and the numbers after the current number. Thus, we can scan the array twice. First, we calcuate the running product of the part before the current number. Second, we calculate the running product of the part after the current number through scanning from the end of the array.\\n\\n    public class Solution {\\n    public int[] productExceptSelf(int[] nums) {\\n        int leng = nums.length;\\n        int[] ret = new int[leng];\\n        if(leng == 0)\\n            return ret;\\n        int runningprefix = 1;\\n        for(int i = 0; i < leng; i++){\\n            ret[i] = runningprefix;\\n            runningprefix*= nums[i];\\n        }\\n        int runningsufix = 1;\\n        for(int i = leng -1; i >= 0; i--){\\n            ret[i] *= runningsufix;\\n            runningsufix *= nums[i];\\n        }\\n        return ret;\\n        \\n    }\\n}"
		},
		{
			"lc_ans_id":"65789",
			"view":"3382",
			"top":"5",
			"title":"Super easy (Java) solution in O(N) time and O(1) space",
			"vote":"36",
			"content":"You traverse twice, applying the appropriate multiplier.\\n      \\n    public int[] productExceptSelf(int[] nums) {\\n    \\n        int len = nums.length;\\n        int [] output = new int[len];\\n        \\n        int leftMult = 1, rightMult = 1;\\n        \\n        for(int i = len-1; i >= 0; i--){\\n            output[i] = rightMult;\\n            rightMult *= nums[i];\\n        }\\n        for(int j = 0; j < len; j++){\\n            output[j] *= leftMult;\\n            leftMult *= nums[j];\\n           \\n        }\\n        \\n        return output; \\n\\n    }"
		},
		{
			"lc_ans_id":"65667",
			"view":"2727",
			"top":"6",
			"title":"My one-pass Java solution without extra spaces",
			"vote":"31",
			"content":"One pass, if don't count the initialization of the 'result'...\\n\\n        int[] result = new int[nums.length];\\n        for (int i = 0; i < result.length; i++) result[i] = 1;\\n        int left = 1, right = 1;\\n        for (int i = 0, j = nums.length - 1; i < nums.length - 1; i++, j--) {\\n            left *= nums[i];\\n            right *= nums[j];\\n            result[i + 1] *= left;\\n            result[j - 1] *= right;\\n        }\\n        return result;\\n\\n-\\n\\nedit 2016/04/05:\\n\\n**EXPLAINATION:**\\n\\nThinking of the 'nums' array [1, 2, 3, 4, 5, 6], and the 'result' array [1, 1, 1, 1, 1, 1]. Every number in 'nums' will be multiplied in 'result' array except itself, then we will get the map below:\\n\\n\\n      1 2 3 4 5 6\\n      -----------\\n    1|  1 1 1 1 1\\n    2|2   2 2 2 2\\n    3|3 3   3 3 3\\n    4|4 4 4   4 4\\n    5|5 5 5 5   5\\n    6|6 6 6 6 6\\n    \\n    (horizontal axis is nums array, vertical axis is multiplied times)\\n\\n\\nNoticed the regular pattern of the upper triangular and lower triangular. Using integers to store the products of the lower and upper triangulars, then we can do it in one pass:\\n\\n- i : left index of the nums array\\n- j : right index of the nums array\\n- left : left products multiplied from nums[0] to nums[i].\\n- right : right products multiplied from nums[j] to nums[nums.length - 1].\\n\\nWe multiply left to result[i + 1] ((i, i + 1) in the uppper triangular),\\n\\nand multiply right to result[j - 1] ((j, j - 1) in the lower triangular),\\n\\nfinally we have calculated the products of the nums except current.\\n\\n-\\n\\nSorry for my poor English...= =!\\nChecking more of my solutions at: https://github.com/dss886/LeetCode/tree/master/src/leetcode"
		},
		{
			"lc_ans_id":"65801",
			"view":"3054",
			"top":"7",
			"title":"Very easy two passes solution",
			"vote":"26",
			"content":"    // two passes, O(2n)\\n    vector<int> productExceptSelf(vector<int>& nums) {\\n        int n = nums.size();\\n        vector<int> ans(n, 1);\\n        \\n        for (int i = 1; i < n; ++i) {\\n            ans[i] = ans[i-1] * nums[i-1];\\n        }\\n        \\n        int m = 1;\\n        for (int i = n-1; i >= 0; --i) {\\n            ans[i] *= m;\\n            m *= nums[i];\\n        }\\n        \\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"65747",
			"view":"3293",
			"top":"8",
			"title":"How from O(N)  to O(1)",
			"vote":"24",
			"content":"Here is the O(N) based C++ implementation\\n\\n    class Solution {\\n    public:\\n        vector<int> productExceptSelf(vector<int>& nums) {\\n            int len=nums.size();\\n            vector<int> left(len, 1);\\n            vector<int> right(len, 1);\\n            vector<int> result(len, 0);\\n            for(int i=1; i<len; i++)  left[i]=left[i-1]*nums[i-1];\\n            for(int i=len-2; i>=0; i--)  right[i]=right[i+1]*nums[i+1];\\n            for(int i=0; i<len; i++) result[i]=left[i]*right[i];\\n            return result;\\n        }\\n    };\\n\\nHow to use O(1) ?\\n\\nBy observing the above code, we can just for every position multiply it to its right position.\\n\\nJust the idea to think reversly !\\n\\n    class Solution {\\n    public:\\n        vector<int> productExceptSelf(vector<int>& nums) {\\n            int n=nums.size();\\n            int left=1, right=1;\\n            vector<int> result(n, 1);\\n            for(int i=0; i<n; i++){\\n                result[i]*=left;\\n                result[n-1-i]*=right;\\n                left*=nums[i];\\n                right*=nums[n-1-i];\\n            }\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"65764",
			"view":"1516",
			"top":"9",
			"title":"Java O(n) without additional space (no temp accumulator vars either)",
			"vote":"19",
			"content":"Uses only return array as accumulator:\\n\\n    public class Solution {\\n        public int[] productExceptSelf(int[] nums) {\\n            int[] res = new int[nums.length];\\n    \\n            res[0] = 1;\\n            for(int i=1; i < nums.length; i++) {\\n                res[i] = res[i-1] * nums[i-1];\\n            }\\n            for(int j = nums.length - 1; j > 0; j--) {\\n                res[j] *= res[0];\\n                res[0] *= nums[j];\\n            }\\n            return res;\\n        }\\n    }"
		}
	],
	"id":"238",
	"title":"Product of Array Except Self",
	"content":"<p>\r\nGiven an array of <i>n</i> integers where <i>n</i> > 1, <code>nums</code>, return an array <code>output</code> such that <code>output[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p>\r\n\r\n<p>Solve it <b>without division</b> and in O(<i>n</i>).</p>\r\n\r\n<p>For example, given <code>[1,2,3,4]</code>, return <code>[24,12,8,6]</code>.\r\n\r\n<p><b>Follow up:</b><br>\r\nCould you solve it with constant space complexity? (Note: The output array <b>does not</b> count as extra space for the purpose of space complexity analysis.)</p>",
	"frequency":"566",
	"ac_num":"133613"
}