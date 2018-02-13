{
	"difficulty":"1",
	"submit_num":"342763",
	"show_id":"268",
	"leetcode_id":"268",
	"answers":[
		{
			"lc_ans_id":"69791",
			"view":"33040",
			"top":"0",
			"title":"4 Line Simple Java Bit Manipulate Solution with Explaination",
			"vote":"221",
			"content":"The basic idea is to use XOR operation. We all know that a^b^b =a, which means two xor operations with the same number will eliminate the number and reveal the original number.\\nIn this solution, I apply XOR operation to both the index and value of the array. In a complete array with no missing numbers, the index and value should be perfectly corresponding( nums[index] = index), so in a missing array, what left finally is the missing number.\\n\\n\\n\\n    public int missingNumber(int[] nums) {\\n\\n        int xor = 0, i = 0;\\n\\t\\tfor (i = 0; i < nums.length; i++) {\\n\\t\\t\\txor = xor ^ i ^ nums[i];\\n\\t\\t}\\n\\n\\t\\treturn xor ^ i;\\n    }"
		},
		{
			"lc_ans_id":"69786",
			"view":"29076",
			"top":"1",
			"title":"3 different ideas: XOR, SUM, Binary Search. Java code",
			"vote":"182",
			"content":"1.XOR\\n-----\\n\\n    public int missingNumber(int[] nums) { //xor\\n        int res = nums.length;\\n        for(int i=0; i<nums.length; i++){\\n            res ^= i;\\n            res ^= nums[i];\\n        }\\n        return res;\\n    }\\n\\n2.SUM\\n-----\\n\\n    public int missingNumber(int[] nums) { //sum\\n        int len = nums.length;\\n        int sum = (0+len)*(len+1)/2;\\n        for(int i=0; i<len; i++)\\n            sum-=nums[i];\\n        return sum;\\n    }\\n\\n3.Binary Search\\n---------------\\n\\n    public int missingNumber(int[] nums) { //binary search\\n        Arrays.sort(nums);\\n        int left = 0, right = nums.length, mid= (left + right)/2;\\n        while(left<right){\\n            mid = (left + right)/2;\\n            if(nums[mid]>mid) right = mid;\\n            else left = mid+1;\\n        }\\n        return left;\\n    }\\n\\nSummary:\\n--------\\n\\nIf the array is in order, I prefer `Binary Search` method. Otherwise, the `XOR` method is better."
		},
		{
			"lc_ans_id":"69777",
			"view":"17351",
			"top":"2",
			"title":"C++ solution using bit manipulation",
			"vote":"151",
			"content":"    class Solution {\\n    public:\\n        int missingNumber(vector<int>& nums) {\\n            int result = nums.size();\\n            int i=0;\\n            \\n            for(int num:nums){\\n                result ^= num;\\n                result ^= i;\\n                i++;\\n            }\\n            \\n            return result;\\n        }\\n    };\\n\\nThere are several similar problems in the problem list."
		},
		{
			"lc_ans_id":"69832",
			"view":"12013",
			"top":"3",
			"title":"1+ lines Ruby, Python, Java, C++",
			"vote":"55",
			"content":"Several different solutions, some with O(1) extra space, some with O(n).\\n\\n---\\n\\n**Sum of 0..n minus sum of the given numbers is the missing one.**\\n\\nThese only use O(1) extra space.\\n\\nRuby\\n\\n    def missing_number(nums)\\n      (n = nums.size) * (n+1) / 2 - nums.reduce(:+)\\n    end\\n\\nPython\\n\\n    def missingNumber(self, nums):\\n        n = len(nums)\\n        return n * (n+1) / 2 - sum(nums)\\n\\nJava\\n\\n    public int missingNumber(int[] nums) {\\n        long n = nums.length;\\n        return (int) (n * (n+1) / 2 - IntStream.of(nums).sum());\\n    }\\n\\nC++\\n\\n    int missingNumber(vector<int>& nums) {\\n        long n = nums.size();\\n        return n * (n+1) / 2 - accumulate(begin(nums), end(nums), 0);\\n    }\\n\\nUsing `long` for Java and C++ to prevent overflow (the n*(n+1) overflows ints already for n=46341, and then the /2 causes an actual wrong result).\\n\\n---\\n\\n**Xor-ing the given numbers and 0..n.**\\n\\nThese use O(n) extra space, but I like them anyway.\\n\\nRuby\\n\\n    def missing_number(nums)\\n      nums.zip(1.step).flatten.reduce(:^)\\n    end\\n\\nPython\\n\\n    def missingNumber(self, nums):\\n        return reduce(operator.xor, nums + range(len(nums)+1))\\n\\n---\\n\\n**Xor-ing with O(1) space**\\n\\nSaw this from ts before. Xoring 0..n results in [n, 1, n+1, 0][n % 4]. You can also spot the pattern by looking at xors of such ranges, and it's easy to explain as well.\\n\\nRuby\\n\\n    def missing_number(nums)\\n      n = nums.size\\n      nums.reduce(:^) ^ [n, 1, n+1, 0][n % 4]\\n    end\\n\\nPython\\n\\n    def missingNumber(self, nums):\\n        n = len(nums)\\n        return reduce(operator.xor, nums) ^ [n, 1, n+1, 0][n % 4]\\n\\n---\\n\\n**Sum, without formula.**\\n\\nJava and C++:\\n\\n        int miss = 0, i = 0;\\n        for (int num : nums)\\n            miss += ++i - num;\\n        return miss;\\n\\nIn Java I believe this is safe, overflow might happen but not cause a wrong result (because another overflow will fix it). In C++ I believe it's *probably safe* in the same way, except that that behavior isn't defined in the standard(s) but is a de-facto standard anyway. In any case, I could just use 64-bit ints again to be safe.\\n\\n---\\n\\n**Set/array difference**\\n\\nDon't know about Ruby's runtime, might not be linear. Python's sets are hash sets and the difference is linear time on average. Don't know about its worst case, and apparently neither does the [TimeComplexity page](https://wiki.python.org/moin/TimeComplexity).\\n\\nRuby\\n\\n    def missing_number(nums)\\n      ((0..nums.size).to_a - nums)[0]\\n    end\\n\\nPython\\n\\n    def missingNumber(self, nums):\\n        return (set(range(len(nums)+1)) - set(nums)).pop()"
		},
		{
			"lc_ans_id":"69795",
			"view":"16006",
			"top":"4",
			"title":"Java solution O(1) space and O(n) in time",
			"vote":"52",
			"content":"Pretty simple since we are  told that we are missing only one number in [1,n], we just need to look at the difference between the sum([1,n]) = n * (n+1) / 2 and the sum of nums in our array.  \\n\\n    public class Solution {\\n        public int missingNumber(int[] nums) {\\n            int sum = 0;\\n            for(int num: nums)\\n                sum += num;\\n                \\n            return (nums.length * (nums.length + 1) )/ 2 - sum;\\n        }\\n    }\\n\\n\\nWith a slight mod to the return statement the situation for large n is taken care of.  The needed modification is \\n\\n    return ( (nums.length * (nums.length + 1) ) - 2 * sum ) / 2;"
		},
		{
			"lc_ans_id":"69808",
			"view":"2088",
			"top":"5",
			"title":"Java solution: Time O(n), Space O(1), no XOR, no Gauss' math method",
			"vote":"37",
			"content":"This solution is easy for understanding. Suppose the input is [0,1,3,4], the numbers in the array have indices [0,1,2,3], so the difference of each number between its corresponding index is [0,0,1,1], add up the differences, subtract it from the length of the array, we can get the missing number from which the difference occurs.  Please leave any comments for discussing the solution.\\n\\n    public int missingNumber(int[] nums) {\\n        int sum = 0;\\n        for (int i = 0; i < nums.length; i++)\\n            sum += nums[i] - i;\\n        return nums.length - sum;\\n    }"
		},
		{
			"lc_ans_id":"70020",
			"view":"2091",
			"top":"6",
			"title":"Clear C++ solution that can avoid overflow",
			"vote":"24",
			"content":"    class Solution {\\n    public:\\n        int missingNumber(vector<int>& nums) {\\n            int result = 0;\\n            for (int i = 0; i < nums.size(); i++)\\n                result ^= nums[i]^(i+1);\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"70058",
			"view":"1654",
			"top":"7",
			"title":"Swapping numbers to the same index cell",
			"vote":"22",
			"content":"1.swapping number solution\\n\\n    public int MissingNumber(int[] nums) {\\n        for(int i = 0; i < nums.Length; i++)\\n        {\\n            while(i < nums.Length && nums[i] == i) i++;\\n            while(i < nums.Length && nums[i] != i)\\n            {\\n                if(nums[i] >= nums.Length || nums[i] < 0) break;\\n                nums[i] = nums[i] ^ nums[nums[i]] ^ (nums[nums[i]] = nums[i]);\\n            }\\n        }\\n        for(int i = 0; i < nums.Length; i++)\\n            if(nums[i] != i) return i;\\n        return nums.Length;\\n    }\\n\\n1.2 Another swapping solution by avoiding the 2nd loop. Idea from novostary.\\n\\n    public int MissingNumber(int[] nums) {\\n        int lastIndex = nums.Length;\\n        for(int i = 0; i < nums.Length; )\\n            if(nums[i] == i) i++;\\n            else if(nums[i] < nums.Length)\\n                nums[i] = nums[i] ^ nums[nums[i]] ^ (nums[nums[i]] = nums[i]);\\n            else lastIndex = i++;\\n        return lastIndex;\\n    }\\n\\n2.Bitwise operation solution\\n\\n    public int MissingNumber(int[] nums) {\\n        int xorResult = 0;\\n        for(int i = 0; i < nums.Length; i++)\\n            xorResult ^= nums[i] ^ i;\\n        xorResult ^= nums.Length;\\n        return xorResult;\\n    }\\n\\n3.Math solution by sum total\\n\\n    public int MissingNumber(int[] nums) {\\n        int result = nums.Length * (nums.Length + 1) / 2;\\n        for(int i = 0; i < nums.Length; i++)\\n            result -= nums[i];\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"70056",
			"view":"1796",
			"top":"8",
			"title":"Simple C++ codes",
			"vote":"20",
			"content":"Using bit XOR operatons, just like the \"find missing number (all elements except one occur twice, find the one that occurs once)\" one \\nThe reason I didn't use sum[1..n] - sum(nums) is that calculating sum has potential to cause overflow. XOR bit operation is much safer.\\n\\n    class Solution {\\n    public:\\n        int missingNumber(vector<int>& nums) {\\n            int missing =0;\\n            for(int i=0; i<nums.size();++i) \\n                missing ^= ((i+1)^nums[i]);\\n            return missing;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"69943",
			"view":"2036",
			"top":"9",
			"title":"Java O(N) O(1) solution using math knowledge",
			"vote":"19",
			"content":"From elementary school math, we have a popular math trick which is the sum of 1+2+...+n = n*(n+1)/2, it can be used here.  Since we are finding the missing number, just get the sum of all the n number first using the formula, and the minus it to the sum of all the numbers in the array, we get the missing number.\\n\\n    public class Solution {\\n        public int missingNumber(int[] nums) {\\n            int n = nums.length;\\n            int total = n * (n + 1) / 2;\\n            int sum = 0;\\n            for(int num : nums) {\\n                sum += num;\\n            }\\n            return total - sum;\\n        }\\n    }"
		}
	],
	"id":"268",
	"title":"Missing Number",
	"content":"<p>\r\nGiven an array containing <i>n</i> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\r\n</p>\r\n\r\n<p><b>Example 1</b>\r\n<pre>\r\n<b>Input:</b> [3,0,1]\r\n<b>Output:</b> 2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2</b>\r\n<pre>\r\n<b>Input:</b> [9,6,4,2,3,5,7,0,1]\r\n<b>Output:</b> 8\r\n</pre>\r\n</p>\r\n\r\n<br />\r\n<p>\r\n<b>Note</b>:<br>\r\nYour algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"490",
	"ac_num":"153102"
}