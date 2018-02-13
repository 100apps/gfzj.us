{
	"difficulty":"1",
	"submit_num":"488347",
	"show_id":"136",
	"leetcode_id":"136",
	"answers":[
		{
			"lc_ans_id":"42997",
			"view":"69336",
			"top":"0",
			"title":"My O(n) solution using XOR",
			"vote":"513",
			"content":"known that A XOR A = 0 and the XOR operator is commutative, the solution will be very straightforward.\\n`\\n\\n    int singleNumber(int A[], int n) {\\n        int result = 0;\\n        for (int i = 0; i<n; i++)\\n        {\\n\\t\\t\\tresult ^=A[i];\\n        }\\n\\t\\treturn result;\\n    }\\n`"
		},
		{
			"lc_ans_id":"43228",
			"view":"21883",
			"top":"1",
			"title":"Easiest way to solve by using bit manipulation.",
			"vote":"170",
			"content":"\\n**Logic:** XOR will return 1 only on two different bits. So if two numbers are the same, XOR will return 0. Finally only one number left.\\nA ^ A = 0 and A ^ B ^ A = B.\\n\\n\\n\\n\\n\\n    class Solution {\\n        public:\\n            int singleNumber(int A[], int n) {\\n                int result=A[0];\\n                for(int i=1;i<n;i++)\\n                {\\n                    result= result^A[i];  /* Get the xor of all elements */\\n                }\\n                return result;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"43201",
			"view":"14927",
			"top":"2",
			"title":"Easy Java solution (tell you why using bitwise XOR)",
			"vote":"109",
			"content":"  \\nwe use bitwise XOR to solve this problem : \\n\\nfirst , we have to know the bitwise XOR in java\\n\\n 1. **0 ^ N = N**\\n 2. **N ^ N = 0**\\n\\n\\nSo..... if N is the single number\\n\\nN1 ^ N1 ^ N2 ^ N2 ^..............^ Nx ^ Nx ^ N  \\n\\n  = (N1^N1) ^ (N2^N2) ^..............^ (Nx^Nx) ^ N\\n\\n  = 0 ^ 0 ^ ..........^ 0 ^ N\\n\\n  = N  \\n\\n\\n  \\n \\n\\n\\n\\n    public int singleNumber(int[] nums) {\\n        int ans =0;\\n        \\n        int len = nums.length;\\n        for(int i=0;i!=len;i++)\\n            ans ^= nums[i];\\n        \\n        return ans;\\n        \\n    }"
		},
		{
			"lc_ans_id":"43216",
			"view":"18493",
			"top":"3",
			"title":"My very simple solution (linear time, no extra memory)",
			"vote":"67",
			"content":"\\nXOR of two equal numbers is 0 : a^a=0. This is the main idea of the algorithm.\\n\\n    class Solution { \\n        public:\\n            int singleNumber(int A[], int n) {\\n                for (int i = 1; i < n; ++i)\\n                    A[0] ^= A[i];\\n                 return A[0];\\n            } \\n        };"
		},
		{
			"lc_ans_id":"43000",
			"view":"11354",
			"top":"4",
			"title":"Python different solutions.",
			"vote":"63",
			"content":"   \\n    def singleNumber1(self, nums):\\n        dic = {}\\n        for num in nums:\\n            dic[num] = dic.get(num, 0)+1\\n        for key, val in dic.items():\\n            if val == 1:\\n                return key\\n    \\n    def singleNumber2(self, nums):\\n        res = 0\\n        for num in nums:\\n            res ^= num\\n        return res\\n        \\n    def singleNumber3(self, nums):\\n        return 2*sum(set(nums))-sum(nums)\\n        \\n    def singleNumber4(self, nums):\\n        return reduce(lambda x, y: x ^ y, nums)\\n        \\n    def singleNumber(self, nums):\\n        return reduce(operator.xor, nums)"
		},
		{
			"lc_ans_id":"43171",
			"view":"10175",
			"top":"5",
			"title":"1ms JAVA solution",
			"vote":"54",
			"content":"public class Solution {\\n    \\n    public int singleNumber(int[] nums) {\\n        int result = 0;\\n        for(int i : nums) {\\n            result ^= i;\\n        }\\n        return result;\\n    }\\n}"
		},
		{
			"lc_ans_id":"43237",
			"view":"5868",
			"top":"6",
			"title":"4 lines of c++ solution",
			"vote":"51",
			"content":"    nt singleNumber(int a[], int n) {\\n         //xor all numbers, the left over number would be the non repeated one\\n         // since the equl numbers cancel out each others bits\\n         int num = 0;\\n         for (int i = 0; i < n; ++i) {\\n             num ^= a[i];\\n         }\\n         return num;\\n        }"
		},
		{
			"lc_ans_id":"43153",
			"view":"2528",
			"top":"7",
			"title":"My Java solution in O(n) time complexity and O(1) space complexity using XOR",
			"vote":"47",
			"content":"    public class Solution {\\n        public int singleNumber(int[] nums) {\\n            int res = 0;\\n            for(int num : nums) {\\n                res ^= num;\\n            }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"43232",
			"view":"3038",
			"top":"8",
			"title":"Simple C++ Solution",
			"vote":"36",
			"content":"The trick is: A^B^A=B\\n\\n    class Solution {\\n    public:\\n        int singleNumber(vector<int>& nums) {\\n            if(nums.empty()) return 0;\\n            int first = nums[0];\\n            for(int i = 1; i<nums.size();i++) {\\n                first = first ^ nums[i];\\n            }\\n            return first;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"43217",
			"view":"3298",
			"top":"9",
			"title":"Java solution with explanation",
			"vote":"28",
			"content":"    public int singleNumber(int[] nums) {\\n        int res = 0;\\n        for (int i = 0; i < nums.length; i++) {\\n            res = res^nums[i];\\n        }\\n        return res;\\n    }\\n\\n\\n----------\\nidea: for every bit, use bit manipulation. 0^0^0 = 0, 1^1^1 = 1, 0^0^1 = 1, 1^1^0 = 0. Thus, after the bit manipulation of XOR, the every bit of result is the bit of single number."
		}
	],
	"id":"136",
	"title":"Single Number",
	"content":"<p>Given an array of integers, every element appears <i>twice</i> except for one. Find that single one.</p>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\nYour algorithm should have a linear runtime complexity. Could you implement it without using extra memory?\r\n</p>",
	"frequency":"625",
	"ac_num":"269640"
}