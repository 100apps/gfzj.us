{
	"difficulty":"2",
	"submit_num":"381702",
	"show_id":"80",
	"leetcode_id":"80",
	"answers":[
		{
			"lc_ans_id":"27976",
			"view":"28439",
			"top":"0",
			"title":"3-6 easy lines, C++, Java, Python, Ruby",
			"vote":"427",
			"content":"Same simple solution written in several languages. Just go through the numbers and include those in the result that haven't been included twice already.\\n\\n**C++**\\n\\n    int removeDuplicates(vector<int>& nums) {\\n        int i = 0;\\n        for (int n : nums)\\n            if (i < 2 || n > nums[i-2])\\n                nums[i++] = n;\\n        return i;\\n    }\\n\\n**Java**\\n\\n    public int removeDuplicates(int[] nums) {\\n        int i = 0;\\n        for (int n : nums)\\n            if (i < 2 || n > nums[i-2])\\n                nums[i++] = n;\\n        return i;\\n    }\\n\\n**Python**\\n\\n    def removeDuplicates(self, nums):\\n        i = 0\\n        for n in nums:\\n            if i < 2 or n > nums[i-2]:\\n                nums[i] = n\\n                i += 1\\n        return i\\n\\n**Ruby**\\n\\n    def remove_duplicates(nums)\\n        i = 0\\n        nums.each { |n| nums[(i+=1)-1] = n if i < 2 || n > nums[i-2] }\\n        i\\n    end"
		},
		{
			"lc_ans_id":"27970",
			"view":"12047",
			"top":"1",
			"title":"Share my O(N) time and O(1) solution when duplicates are allowed at most K times",
			"vote":"107",
			"content":"I think both Remove Duplicates from Sorted Array I and II could be solved in a consistent and more general way by allowing the duplicates to appear k times (k = 1 for problem I and k = 2 for problem II). Here is my way: we need a count variable to keep how many times the duplicated element appears, if we encounter a different element, just set counter to 1, if we encounter a duplicated one, we need to check this count, if it is already k, then we need to skip it, otherwise, we can keep this element. The following is the implementation and can pass both OJ:\\n\\n    int removeDuplicates(int A[], int n, int k) {\\n    \\n                if (n <= k) return n;\\n    \\n                int i = 1, j = 1;\\n                int cnt = 1;\\n                while (j < n) {\\n                    if (A[j] != A[j-1]) {\\n                        cnt = 1;\\n                        A[i++] = A[j];\\n                    }\\n                    else {\\n                        if (cnt < k) {\\n                            A[i++] = A[j];\\n                            cnt++;\\n                        }\\n                    }\\n                    ++j;\\n                }\\n                return i;\\n    }\\n\\n\\nFor more details, you can also see this post: [LeetCode Remove Duplicates from Sorted Array I and II: O(N) Time and O(1) Space][1]\\n\\n\\n  [1]: http://tech-wonderland.net/blog/leetcode-remove-duplicates-from-sorted-array-i-and-ii.html"
		},
		{
			"lc_ans_id":"27987",
			"view":"7109",
			"top":"2",
			"title":"Short and Simple Java solution (easy to understand)",
			"vote":"52",
			"content":"Question wants us to return the length of new array after removing duplicates and that we don't care about what we leave beyond new length , hence we can use `i` to keep track of the position and update the array. \\n\\n \\n----------\\n\\n\\nRemove Duplicates from Sorted Array(no duplicates) :\\n\\n    public int removeDuplicates(int[] nums) {\\n        int i = 0;\\n        for(int n : nums)\\n            if(i < 1 || n > nums[i - 1]) \\n                nums[i++] = n;\\n        return i;\\n    }\\n\\n\\nRemove Duplicates from Sorted Array II (allow duplicates up to 2):\\n\\n    public int removeDuplicates(int[] nums) {\\n       int i = 0;\\n       for (int n : nums)\\n          if (i < 2 || n > nums[i - 2])\\n             nums[i++] = n;\\n       return i;\\n    }"
		},
		{
			"lc_ans_id":"28004",
			"view":"3662",
			"top":"3",
			"title":"My C++ solution. 16ms, 5 lines",
			"vote":"21",
			"content":"    int removeDuplicates(vector<int>& nums) {\\n        int n = nums.size(), count = 0;\\n        for (int i = 2; i < n; i++)\\n            if (nums[i] == nums[i - 2 - count]) count++;\\n            else nums[i - count] = nums[i];\\n        return n - count;\\n    }"
		},
		{
			"lc_ans_id":"28067",
			"view":"1026",
			"top":"4",
			"title":"O(N) Time and O(1) Java Solution When Allowed at Most K times of Duplicates",
			"vote":"9",
			"content":"Share my general solution for \"Remove Duplicates Problem\".\\n\\nIf anyone could think of a better solution please let me know.    \\n\\n    public int removeDuplicates(int[] nums) {\\n        \\t\\t//define at most k times of duplicate numbers\\n        \\t\\tfinal int k = 2;\\n    \\n        \\t\\t//check if it is an empty array\\n        \\t\\tif(nums.length == 0) return 0;\\n    \\n        \\t\\t//start pointer of new array\\n        \\t\\tint m = 1;\\n    \\n        \\t\\t// count the time of duplicate numbers occurence\\n        \\t\\tint count = 1;\\n    \\n        \\t\\tfor(int i = 1; i < nums.length; ++i) {\\n        \\t\\t\\tif(nums[i] == nums[i - 1]) {\\n        \\t\\t\\t\\tif(count < k) {\\n        \\t\\t\\t\\t\\tnums[m++] = nums[i];\\n        \\t\\t\\t\\t}\\n        \\t\\t\\t\\tcount++;\\n        \\t\\t\\t} else {\\n        \\t\\t\\t\\tcount = 1;\\n        \\t\\t\\t\\tnums[m++] = nums[i];\\n        \\t\\t\\t}\\n        \\t\\t}\\n        \\t\\treturn m;\\n        \\t}"
		},
		{
			"lc_ans_id":"27974",
			"view":"2202",
			"top":"5",
			"title":"C++ simple AC solution in 10 lines 21ms",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        int removeDuplicates(int A[], int n) {\\n            if (n <= 2)\\n                return n;\\n            int rear = 1;\\n            for(int i = 2; i < n; i++){\\n                if(!(A[i] == A[rear] && A[i] == A[rear -1])){\\n                    A[++rear] = A[i];\\n                }\\n            }\\n            return rear+1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"28053",
			"view":"503",
			"top":"6",
			"title":"Share my O(N) time and O(1) space , short and simple solution when duplicates are allowed at most K times .",
			"vote":"6",
			"content":"This is my **short and easy to understand** solution for the problem where **duplicates are allowed at most k times.**  My approach is to remain first k elements as it is . Now start from `k'th index`  and check if the element at the position `current index - k` this is the same as new arriving element then skip this element and continue with next element .\\nhere the condition `nums[j-k]!=nums[i]`  is very important because if i will use `i` in place of `j` i.e. `nums[i-k]!=nums[i]` then it will give wrong answer because we have to look `k` steps backward in **new updated array.**\\n\\nplease comment if any test case fails.\\n\\n     int removeDuplicates(vector<int>& nums,int k) {\\n            if(nums.size()<k) return nums.size(); // if array size is less than k then return the same\\n            int i,j;\\n             for(i=k,j=k ; i<nums.size();i++)\\n                 if(nums[j-k]!=nums[i]) nums[j++]=nums[i];\\n             return j;\\n        \\n        }"
		},
		{
			"lc_ans_id":"28120",
			"view":"571",
			"top":"7",
			"title":"C++ code, quite standard",
			"vote":"5",
			"content":"You only need to change K to allow K repetitions.\\nOne common mistake one can make is \" if(nums[i] != nums[i-K])\" : it is wrong since nums[i-k] can be overwritten in a previous iteration.\\n\\n    class Solution {\\n    public:\\n        int removeDuplicates(vector<int>& nums) {\\n            int len=nums.size(), i, K=2, last = K;\\n            if(len<=K) return len;\\n            for(i=K; i<len; ++i)\\n            {\\n                if(nums[i] != nums[last-K]) nums[last++] = nums[i]; // note it is last-K\\n            }\\n            return last;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"28175",
			"view":"1056",
			"top":"8",
			"title":"O(N) in place solution",
			"vote":"5",
			"content":"    int removeDuplicates(int A[], int n) {\\n        if (n <= 2) return n;\\n        int repeat = 0, count = 1;\\n        for (int i = 1; i < n; ++i) {\\n            if (A[i] == A[i-1] && repeat < 1) {\\n                A[count++] = A[i];\\n                repeat++;\\n            }\\n            else if (A[i] > A[i-1]) {\\n                A[count++] = A[i];\\n                repeat = 0;\\n            }\\n        }\\n        \\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"27967",
			"view":"739",
			"top":"9",
			"title":"Clean python solution",
			"vote":"4",
			"content":"    class Solution(object):\\n        def removeDuplicates(self, nums):\\n            tail = 0\\n            for num in nums:\\n                if tail < 2 or num != nums[tail - 1] or num != nums[tail - 2]:\\n                    nums[tail] = num\\n                    tail += 1\\n            return tail"
		}
	],
	"id":"80",
	"title":"Remove Duplicates from Sorted Array II",
	"content":"<p>\r\nFollow up for \"Remove Duplicates\":<br />\r\nWhat if duplicates are allowed at most <i>twice</i>?</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven sorted array <i>nums</i> = <code>[1,1,1,2,2,3]</code>,\r\n</p>\r\n<p>\r\nYour function should return length = <code>5</code>, with the first five elements of <i>nums</i> being <code>1</code>, <code>1</code>, <code>2</code>, <code>2</code> and <code>3</code>. It doesn't matter what you leave beyond the new length.\r\n</p>",
	"frequency":"351",
	"ac_num":"139775"
}