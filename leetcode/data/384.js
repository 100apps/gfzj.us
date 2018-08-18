{
	"difficulty":"2",
	"submit_num":"77508",
	"show_id":"384",
	"leetcode_id":"384",
	"answers":[
		{
			"lc_ans_id":"85958",
			"view":"22994",
			"top":"0",
			"title":"First Accepted Solution - Java",
			"vote":"48",
			"content":"```\\nimport java.util.Random;\\n\\npublic class Solution {\\n    private int[] nums;\\n    private Random random;\\n\\n    public Solution(int[] nums) {\\n        this.nums = nums;\\n        random = new Random();\\n    }\\n    \\n    /** Resets the array to its original configuration and return it. */\\n    public int[] reset() {\\n        return nums;\\n    }\\n    \\n    /** Returns a random shuffling of the array. */\\n    public int[] shuffle() {\\n        if(nums == null) return null;\\n        int[] a = nums.clone();\\n        for(int j = 1; j < a.length; j++) {\\n            int i = random.nextInt(j + 1);\\n            swap(a, i, j);\\n        }\\n        return a;\\n    }\\n    \\n    private void swap(int[] a, int i, int j) {\\n        int t = a[i];\\n        a[i] = a[j];\\n        a[j] = t;\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"86053",
			"view":"5209",
			"top":"1",
			"title":"Python hack",
			"vote":"26",
			"content":"Just for fun.\\n```\\nclass Solution(object):\\n    def __init__(self, nums):\\n        self.reset = lambda: nums\\n        self.shuffle = lambda: random.sample(nums, len(nums))\\n```"
		},
		{
			"lc_ans_id":"86006",
			"view":"4405",
			"top":"2",
			"title":"simple java solution",
			"vote":"16",
			"content":"```\\npublic class Solution {\\n\\n    private int[] nums;\\n    \\n    public Solution(int[] nums) {\\n        this.nums = nums;\\n    }\\n    \\n    /** Resets the array to its original configuration and return it. */\\n    public int[] reset() {\\n        return nums;\\n    }\\n    \\n    /** Returns a random shuffling of the array. */\\n    public int[] shuffle() {\\n        int[] rand = new int[nums.length];\\n        for (int i = 0; i < nums.length; i++){\\n            int r = (int) (Math.random() * (i+1));\\n            rand[i] = rand[r];\\n            rand[r] = nums[i];\\n        }\\n        return rand;\\n    }\\n}\\n\\n/**\\n * Your Solution object will be instantiated and called as such:\\n * Solution obj = new Solution(nums);\\n * int[] param_1 = obj.reset();\\n * int[] param_2 = obj.shuffle();\\n */\\n```"
		},
		{
			"lc_ans_id":"85979",
			"view":"8327",
			"top":"3",
			"title":"Straight-forward C++ solution",
			"vote":"15",
			"content":"Straight-forward solution\\n```\\nclass Solution {\\n    vector<int> nums;\\npublic:\\n    Solution(vector<int> nums) {\\n        this->nums = nums;\\n    }\\n    \\n    /** Resets the array to its original configuration and return it. */\\n    vector<int> reset() {\\n        return nums;\\n    }\\n    \\n    /** Returns a random shuffling of the array. */\\n    vector<int> shuffle() {\\n        vector<int> result(nums);\\n        for (int i = 0;i < result.size();i++) {\\n            int pos = rand()%(result.size()-i);\\n            swap(result[i+pos], result[i]);\\n        }\\n        return result;\\n    }\\n};\\n\\n/**\\n * Your Solution object will be instantiated and called as such:\\n * Solution obj = new Solution(nums);\\n * vector<int> param_1 = obj.reset();\\n * vector<int> param_2 = obj.shuffle();\\n */\\n```"
		},
		{
			"lc_ans_id":"86001",
			"view":"6441",
			"top":"4",
			"title":"C++ solution with Fisher Yates algorithm",
			"vote":"12",
			"content":"Use Fisher Yates algorithm to randomize. Keep an extra idx array to store the original index of each element, so that we can correctly reset each element to its original position. Also note that \"srand(time(NULL))\" must be placed in the constructor, not the shuffle() function. \\n```\\nclass Solution {\\n    vector<int> arr, idx;\\npublic:\\n    Solution(vector<int> nums) {\\n        srand(time(NULL));\\n        arr.resize(nums.size());\\n        idx.resize(nums.size());\\n        for (int i=0;i<nums.size();i++){\\n            arr[i] = nums[i];\\n            idx[i] = nums[i];\\n        }\\n    }\\n    \\n    /** Resets the array to its original configuration and return it. */\\n    vector<int> reset() {\\n        for (int i=0;i<arr.size();i++)\\n            arr[i] = idx[i];\\n        return arr;    \\n    }\\n    \\n    /** Returns a random shuffling of the array. */\\n    vector<int> shuffle() {\\n         int i,j;\\n         for (i = arr.size() - 1; i > 0; i--) {\\n            j = rand() % (i + 1);\\n            swap(arr[i], arr[j]);\\n         }\\n         return arr;    \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"85957",
			"view":"2600",
			"top":"5",
			"title":"easy python solution based on generating random index and swapping",
			"vote":"10",
			"content":"```\\nimport random\\nclass Solution(object):\\n\\n    def __init__(self, nums):\\n        self.nums = nums\\n\\n    def reset(self):\\n        return self.nums\\n\\n    def shuffle(self):\\n        ans = self.nums[:]                     # copy list\\n        for i in range(len(ans)-1, 0, -1):     # start from end\\n            j = random.randrange(0, i+1)    # generate random index \\n            ans[i], ans[j] = ans[j], ans[i]    # swap\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"86026",
			"view":"3127",
			"top":"6",
			"title":"Well explained O(n) Java solution by using random class and swapping current with a random previous index.",
			"vote":"6",
			"content":"```\\nimport java.util.Random; // import Random class from utils package.\\npublic class Solution {\\n    private int[] nums = null;\\n    private Random random = null;\\n    public Solution(int[] nums) {\\n        this.nums = nums;\\n        random = new Random(System.currentTimeMillis());\\n    }\\n    \\n    /** Resets the array to its original configuration and return it. */\\n    public int[] reset() {\\n        return Arrays.copyOf(nums,nums.length); // just return a copy.\\n    }\\n    \\n    /** Returns a random shuffling of the array. */\\n    public int[] shuffle() {\\n        int[] ans = Arrays.copyOf(nums,nums.length); // create a copy\\n        for(int i = 1 ; i < nums.length ; i++){\\n            int swapIndex = random.nextInt(i+1); // generate a random number within visited elements including current index.\\n            swap(ans,i,swapIndex); // swap the index\\n        }\\n        return ans;\\n    }\\n    private void swap(int[] ans, int from , int to){\\n        int temp = ans[from];\\n        ans[from] = ans[to];\\n        ans[to] = temp;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85992",
			"view":"166",
			"top":"7",
			"title":"My straightforward C++ solution",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    Solution(vector<int> nums) :re_input(nums),input(nums){\\n    }\\n    \\n    /** Resets the array to its original configuration and return it. */\\n    vector<int> reset() {\\n        return re_input;\\n    }\\n    \\n    /** Returns a random shuffling of the array. */\\n    vector<int> shuffle() {\\n        random_shuffle(input.begin(),input.end());\\n        return input;\\n    }\\n    vector<int>input;\\n    vector<int>re_input;\\n};\\n```"
		},
		{
			"lc_ans_id":"86017",
			"view":"706",
			"top":"8",
			"title":"Using Fisher\\u2013Yates shuffle, java solution.",
			"vote":"3",
			"content":"refer wikipedia for **Fisher\\u2013Yates shuffle**, here share my solution:\\n```\\npublic class Solution {\\n    private int[] nums;\\n    private int[] copy;\\n\\n    public Solution(int[] nums) {\\n        this.nums = nums;\\n        this.copy = nums.clone();\\n    }\\n\\n    public int[] reset() {\\n        return copy;\\n    }\\n\\n    public int[] shuffle() {\\n        Random random = new Random();\\n        for (int i = nums.length - 1; i > 0; i--) {\\n            int j = random.nextInt(i + 1);\\n            int t = nums[i];\\n            nums[i] = nums[j];\\n            nums[j] = t;\\n        }\\n        return nums;\\n    }\\n}"
		},
		{
			"lc_ans_id":"86000",
			"view":"1778",
			"top":"9",
			"title":"Python. Solution in a few lines",
			"vote":"3",
			"content":"```\\nimport random\\n\\nclass Solution(object):\\n\\n    def __init__(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type size: int\\n        \"\"\"\\n        self._array = nums\\n\\n    def reset(self):\\n        \"\"\"\\n        Resets the array to its original configuration and return it.\\n        :rtype: List[int]\\n        \"\"\"\\n        return self._array\\n        \\n    def shuffle(self):\\n        \"\"\"\\n        Returns a random shuffling of the array.\\n        :rtype: List[int]\\n        \"\"\"\\n        shuffled_array = self._array[:] \\n        random.shuffle(shuffled_array)\\n        return shuffled_array\\n          \\n# Your Solution object will be instantiated and called as such:\\n# obj = Solution(nums)\\n# param_1 = obj.reset()\\n# param_2 = obj.shuffle()\\n```"
		}
	],
	"id":"384",
	"title":"Shuffle an Array",
	"content":"<p>Shuffle a set of numbers without duplicates.\r\n</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n// Init an array with set 1, 2, and 3.\r\nint[] nums = {1,2,3};\r\nSolution solution = new Solution(nums);\r\n\r\n// Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must equally likely to be returned.\r\nsolution.shuffle();\r\n\r\n// Resets the array back to its original configuration [1,2,3].\r\nsolution.reset();\r\n\r\n// Returns the random shuffling of array [1,2,3].\r\nsolution.shuffle();\r\n</pre>\r\n</p>",
	"frequency":"522",
	"ac_num":"36669"
}