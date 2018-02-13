{
	"difficulty":"1",
	"submit_num":"53396",
	"show_id":"645",
	"leetcode_id":"645",
	"answers":[
		{
			"lc_ans_id":"105507",
			"view":"7221",
			"top":"0",
			"title":"Java O(n) Time O(1) Space",
			"vote":"27",
			"content":"```\\npublic static int[] findErrorNums(int[] nums) {\\n    int[] res = new int[2];\\n    for (int i : nums) {\\n        if (nums[Math.abs(i) - 1] < 0) res[0] = Math.abs(i);\\n\\telse nums[Math.abs(i) - 1] *= -1;\\n    }\\n    for (int i=0;i<nums.length;i++) {\\n        if (nums[i] > 0) res[1] = i+1;\\n    }\\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"105515",
			"view":"2373",
			"top":"1",
			"title":"[C++] 6 lines solution with explanation",
			"vote":"11",
			"content":"The idea is using array indexing, that is putting  each ```nums[i]``` into the position with index ```nums[i] - 1```. Then, the array becomes [1,2,3,4,5...,n]. So we can find the duplicate number  when ```nums[i] != i+1```. \\n```\\nvector<int> findErrorNums(vector<int>& nums) {\\n        for(int i = 0; i<nums.size(); i++){\\n            while(nums[i] != nums[nums[i] - 1])swap(nums[i], nums[nums[i] - 1]);\\n        }\\n        for(int i = 0; i<nums.size() ; i++){\\n            if(nums[i] != i + 1)return {nums[i], i + 1};\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"105513",
			"view":"1719",
			"top":"2",
			"title":"XOR, one pass",
			"vote":"10",
			"content":"The idea is based on: \\n```(1 ^ 2 ^ 3 ^ .. ^ n) ^ (1 ^ 2 ^ 3 ^ .. ^ n) = 0```\\nSuppose we change 'a' to 'b', then all but 'a' and 'b' are XORed exactly 2 times. The result is then\\n```0 ^ a ^ b ^ b ^ b = a ^ b```\\nLet ```c = a ^ b```, if we can find 'b' which appears 2 times in the original array, 'a' can be easily calculated by ```a = c ^ b```.\\n\\n```\\n    public int[] findErrorNums(int[] nums) {\\n        int n = nums.length;\\n        int[] count = new int[n];\\n        int[] ans = {0,0};\\n        for(int i = 0; i < n; i++) {\\n            ans[1] ^= (i+1) ^ nums[i];\\n            if (++count[nums[i]-1] == 2)\\n                ans[0] = nums[i];\\n        }\\n        ans[1] ^= ans[0];\\n        return ans;\\n    }\\n```\\nO(0) space:\\n```\\n    public int[] findErrorNums(int[] nums) {\\n        int[] ans = new int[2];\\n        for(int i = 0; i < nums.length; i++) {\\n            int val = Math.abs(nums[i]);\\n            ans[1] ^= (i+1) ^ val;\\n            if (nums[val-1] < 0) ans[0] = val;\\n            else nums[val-1] = -nums[val-1];\\n        }\\n        ans[1] ^= ans[0];\\n        return ans;\\n    }\\n```"
		},
		{
			"lc_ans_id":"105552",
			"view":"2400",
			"top":"3",
			"title":"Python, Straightforward with Explanation",
			"vote":"10",
			"content":"Count each element.  We know the original elements must have been ```1, 2, ..., len(A)```.\\nOnce we have the counts, it is easy to scan through and see which element must have occurred twice, and which one never occurred.  \\n\\nIn our implementation, we could also use ```collections.Counter(A)```.\\n\\n```\\ndef findErrorNums(self, A):\\n    N = len(A)\\n    count = [0] * (N+1)\\n    for x in A:\\n      count[x] += 1\\n    for x in xrange(1, len(A)+1):\\n        if count[x] == 2:\\n            twice = x\\n        if count[x] == 0:\\n            never = x\\n    return twice, never\\n```\\n\\n<hr>\\n\\nBonus solution: Say ```(x, y)``` is the desired answer.  We know ```sum(A) - x + y = sum([1, 2, ..., N])```, and ```sum(x*x for x in A) - x*x + y*y = sum([1*1, 2*2, ..., N*N])```.  So we know ```x-y``` and ```x*x-y*y```.  Dividing the latter by ```x-y```, we know ```x+y```.  Hence, we know ```x``` and ```y```.\\n\\n```\\ndef findErrorNums(self, A):\\n    N = len(A)\\n    alpha = sum(A) - N*(N+1)/2\\n    beta = (sum(x*x for x in A) - N*(N+1)*(2*N+1)/6) / alpha\\n    return (alpha + beta) / 2, (beta - alpha) / 2\\n```"
		},
		{
			"lc_ans_id":"105528",
			"view":"4283",
			"top":"4",
			"title":"Simple Java O(n) solution - HashSet",
			"vote":"10",
			"content":"Idea is to compute the sum mathematically first, and subtracting the elements from it. \\nFind the duplicate element, and add that to sum. \\n\\n    public int[] findErrorNums(int[] nums) {\\n        Set<Integer> set = new HashSet<>();\\n        int duplicate = 0, n = nums.length;\\n        long sum = (n * (n+1)) / 2;\\n        for(int i : nums) {\\n            if(set.contains(i)) duplicate = i;\\n            sum -= i;\\n            set.add(i);\\n        }\\n        return new int[] {duplicate, (int)sum + duplicate};\\n    }"
		},
		{
			"lc_ans_id":"105520",
			"view":"1080",
			"top":"5",
			"title":"Java solution, array swap",
			"vote":"6",
			"content":"Because numbers are from ```1``` to ```n```, after we put number ```i``` to index ```i - 1``` there's only 1 ```mis-matching``` which is the answer. Time complexity O(n). Space complexity O(1).\\n\\n```\\npublic class Solution {\\n    public int[] findErrorNums(int[] nums) {\\n        int[] result = new int[2];\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            while (nums[i] - 1 != i && nums[nums[i] - 1] != nums[i]) {\\n                swap(nums, i, nums[i] - 1);\\n            }\\n        }\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] - 1 != i) {\\n                result[0] = nums[i];\\n                result[1] = i + 1;\\n                break;\\n            }\\n        }\\n        \\n        return result;\\n    }\\n    \\n    private void swap(int[] nums, int i, int j) {\\n        int temp = nums[i];\\n        nums[i] = nums[j];\\n        nums[j] = temp;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105505",
			"view":"1049",
			"top":"6",
			"title":"Very Simple - Using Array and Bit",
			"vote":"4",
			"content":"Using Array Indexing:\\n```\\npublic int[] findErrorNums(int[] nums) {\\n      int[] arr = new int[nums.length+1];\\n      int a=0,b=arr.length;       \\n      for(int i: nums) arr[i]++;\\n        \\n      for(int j=1;j<arr.length;j++){\\n          if(arr[j]==2) a=j;\\n          if(arr[j]==0) b=j;            \\n      }\\n      return new int[]{a,b};\\n}\\n```\\nUsing Bit:\\n```\\npublic int[] findErrorNums(int[] nums) {\\n    BitSet bs = new BitSet(nums.length+1);\\n    int a=0;\\n    for(int i:nums){\\n          if(bs.get(i)) a=i;\\n          bs.set(i);            \\n    }\\n    return new int[]{a,bs.nextClearBit(1)};\\n}"
		},
		{
			"lc_ans_id":"105578",
			"view":"352",
			"top":"7",
			"title":"Java Two methods, using sign and swap",
			"vote":"2",
			"content":"Method 1 is to put each element k to the k-1th position unless the k-1th is already occupied by k. In that case we know k is a duplicate. In a second pass, we look for the ith position where its value is not i+1, we know i+1 is the missing value.\\n```\\n    private void swap(int[] nums, int i, int j) {\\n        int tmp = nums[i];\\n        nums[i] = nums[j];\\n        nums[j] = tmp;\\n    }\\n\\n    public int[] findErrorNums(int[] nums) {\\n        for (int i = 0; i < nums.length; i++) {\\n            while (nums[nums[i]-1] != nums[i]) {\\n                swap(nums, i, nums[i]-1);\\n            }\\n        }\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] != i+1) return new int[]{nums[i], i+1};\\n        }\\n        return null;\\n    }\\n```\\n\\nMethod 2: when we encounter a value k, we set the k-1th element negative. If k-1th is already negative we know k is the duplicate. In the second pass we look for ith position where it's value is positive so we know i+1 is the missing one.\\n```\\n    public int[] findErrorNums(int[] nums) {\\n        for (int i = 0; i < nums.length; i++) {\\n            while (nums[nums[i]-1] != nums[i]) {\\n                swap(nums, i, nums[i]-1);\\n            }\\n        }\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] != i+1) return new int[]{nums[i], i+1};\\n        }\\n        return null;\\n    }\\n```"
		},
		{
			"lc_ans_id":"105558",
			"view":"547",
			"top":"8",
			"title":"Oneliner Python",
			"vote":"2",
			"content":"Just comparing sums...\\n\\n    def findErrorNums(self, nums):\\n        return [sum(nums) - sum(set(nums)), sum(range(1, len(nums)+1)) - sum(set(nums))]"
		},
		{
			"lc_ans_id":"105522",
			"view":"59",
			"top":"9",
			"title":"So the length of the array is n and the elements in array are continuous?",
			"vote":"1",
			"content":"Please, give more details of this question"
		}
	],
	"id":"622",
	"title":"Set Mismatch",
	"content":"<p>\r\nThe set <code>S</code> originally contains numbers from 1 to <code>n</code>. But unfortunately, due to the data error, one of the numbers in the set got duplicated to <b>another</b> number in the set, which results in repetition of one number and loss of another number. \r\n</p>\r\n\r\n<p>\r\nGiven an array <code>nums</code> representing the data status of this set after the error. Your task is to firstly find the number occurs twice and then find the number that is missing. Return them in the form of an array.\r\n</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> nums = [1,2,2,4]\r\n<b>Output:</b> [2,3]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The given array size will in the range [2, 10000].</li>\r\n<li>The given array's numbers won't have any order.</li>\r\n</ol>\r\n</p>",
	"frequency":"196",
	"ac_num":"21327"
}