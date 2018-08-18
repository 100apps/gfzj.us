{
	"difficulty":"2",
	"submit_num":"70207",
	"show_id":"398",
	"leetcode_id":"398",
	"answers":[
		{
			"lc_ans_id":"88072",
			"view":"29962",
			"top":"0",
			"title":"Simple Reservoir Sampling solution",
			"vote":"71",
			"content":"```\\npublic class Solution {\\n\\n    int[] nums;\\n    Random rnd;\\n\\n    public Solution(int[] nums) {\\n        this.nums = nums;\\n        this.rnd = new Random();\\n    }\\n    \\n    public int pick(int target) {\\n        int result = -1;\\n        int count = 0;\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] != target)\\n                continue;\\n            if (rnd.nextInt(++count) == 0)\\n                result = i;\\n        }\\n        \\n        return result;\\n    }\\n}```"
		},
		{
			"lc_ans_id":"88080",
			"view":"14202",
			"top":"1",
			"title":"What on earth is meant by too much memory?",
			"vote":"26",
			"content":"Because I've made a rather naive map-of-index-lists Java solution and it was happily accepted by the OJ. So far I see three types of solutions:\\n\\n1. Like mine, O(N) memory, O(N) init, O(1) pick.\\n\\n2. Like @dettier's [Reservoir Sampling](https://discuss.leetcode.com/topic/58301/simple-reservoir-sampling-solution). O(1) init, O(1) memory, but O(N) to pick.\\n\\n3. Like @chin-heng's [binary search](https://discuss.leetcode.com/topic/58295/share-my-c-solution-o-lg-n-to-pick-o-nlg-n-for-sorting): O(N) memory, O(N lg N) init, O(lg N) pick.\\n\\nAre all three kinds acceptable?"
		},
		{
			"lc_ans_id":"88084",
			"view":"8364",
			"top":"2",
			"title":"Clean, understandable, O(1) momery, O(n) time, JAVA solution",
			"vote":"14",
			"content":"```\\npublic class Solution {\\n    int[] nums;\\n    Random rand;\\n    public Solution(int[] nums) {\\n        this.nums = nums;\\n        this.rand = new Random();\\n    }\\n    public int pick(int target) {\\n        int total = 0;\\n        int res = -1;\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] == target) {\\n                // randomly select an int from 0 to the nums of target. If x equals 0, set the res as the current index. The probability is always 1/nums for the latest appeared number. For example, 1 for 1st num, 1/2 for 2nd num, 1/3 for 3nd num (1/2 * 2/3 for each of the first 2 nums).\\n                int x = rand.nextInt(++total); \\n                res = x == 0 ? i : res;\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88071",
			"view":"2400",
			"top":"3",
			"title":"C++_Time: O(n), Space: O(n)_116ms_96.41%_with clear explanation by probability",
			"vote":"12",
			"content":"Actually, we could first consider following question:\\n\\n**You have a file consisting of characters. The characters in the file can be read sequentially, but the length of the file is unknown. How do you pick a character so that every character in the file has equal probability of being chosen?**\\n\\nFor this problem we can take algorithm like this:\\n\\n* Draw the 1st char. If there is a second char, then we will hold 1st char by prob = 1/2, and replace the 1st char to 2nd char with prob = 1/2. After this step we suppose that the char is X now.\\n\\n* After then, if there is 3rd char, then we will hold the X with prob = 2/3 and replace X to 3rd char with prob = 1/3. Why do they hold the same prob to be picked?\\nBecause:\\n    **Obviously, Prob(the 3rd char is picked) = 1/3;**\\n    **Prob(the 2nd char is picked) = 1 * 1/2 * 2/3 = 1/3;**\\n    **Prob(the 1st char is picked) = 1 * 1/2 * 2/3 = 1/3;**\\n\\n* So we can say that when we now has n chars and there is still another char in the file, we can pick the other char with prob= 1/(n+1), also keep original char with prob = n/(n+1), then we can secure each char is picked with same prob = 1/(n+1), because **prob = 1 * 1/2 * 2/3 * \\xb7\\xb7\\xb7\\xb7 * n/(n+1) = 1/(n+1).**\\n\\n Now, go back to this problem. The thought is the same, when we meet some **nums[i] == target**, we can use above conclusion: **we can pick the other char with prob= 1/(n+1), also keep original char with prob = n/(n+1), then we can secure each char is picked with same prob = 1/(n+1).**\\n\\n**Code:**\\n\\n    class Solution {\\n    vector<int> _nums;\\n    public:\\n    Solution(vector<int> nums) {\\n        _nums = nums;\\n    }\\n    \\n    int pick(int target) {\\n        int n = 0, ans = -1;\\n        for(int i = 0 ; i < _nums.size(); i++){\\n            if(_nums[i] != target) continue;\\n            if(n == 0){ans = i; n++;}\\n            else{\\n                n++;\\n                if(rand() % n == 0){ans = i;}// with prob 1/(n+1) to replace the previous index\\n            }\\n        }\\n        return ans;\\n    }\\n    };\\n\\n![0_1475804025522_F32094D6-140C-47AB-AD65-C4460D0C19AA.png](/uploads/files/1475804029350-f32094d6-140c-47ab-ad65-c4460d0c19aa.png)"
		},
		{
			"lc_ans_id":"88069",
			"view":"2096",
			"top":"4",
			"title":"Simple Python solution",
			"vote":"9",
			"content":"```py\\nclass Solution(object):\\n\\n    def __init__(self, nums):\\n        self.nums = nums\\n        \\n\\n    def pick(self, target):\\n        return random.choice([k for k, v in enumerate(self.nums) if v == target])\\n```"
		},
		{
			"lc_ans_id":"88103",
			"view":"4908",
			"top":"5",
			"title":"Share C++ O(n) Time Solution",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> n;\\n    Solution(vector<int> nums) \\n    {\\n        n = nums;\\n    }\\n    \\n    int pick(int target) \\n    {\\n        int count = 0, res = -1;\\n        for (int i = 0; i < n.size(); ++i)\\n        {\\n            if(n[i] != target) continue;\\n            if(++count == 1) res = i;\\n            else\\n                if(!(rand()%count)) res = i;\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88105",
			"view":"3098",
			"top":"6",
			"title":"Share my C++ solution, O(lg(n)) to pick, O(nlg(n)) for sorting",
			"vote":"6",
			"content":"Pre-process sorting for O(nlg(n))\\nPick in O(lg(n)) using binary search\\nO(n) space to store value/index pairs\\n```\\nclass Solution {\\npublic:\\n    typedef pair<int, int> pp; // <value, index>\\n\\n    static bool comp(const pp& i, const pp& j) { return (i.first < j.first); }\\n\\n    vector<pp> mNums;\\n\\n    Solution(vector<int> nums) {\\n        for(int i = 0; i < nums.size(); i++) {\\n            mNums.push_back(pp({nums[i], i}));\\n        }\\n        sort(mNums.begin(), mNums.end(), comp);\\n    }\\n\\n    int pick(int target) {\\n        pair<vector<pp>::iterator, vector<pp>::iterator> bounds = equal_range(mNums.begin(), mNums.end(), pp({target,0}), comp);\\n        int s = bounds.first - mNums.begin();\\n        int e = bounds.second - mNums.begin();\\n        int r = e - s;\\n        return mNums[s + (rand() % r)].second;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88143",
			"view":"2799",
			"top":"7",
			"title":"O(n) constructor, O(1) pick, two ways",
			"vote":"5",
			"content":"## Update: Second way\\n\\nI found another way. If a number only appears at one index, map the number to that index. Otherwise map it to a list of its indexes. Also got accepted all five times I submitted it.\\n```\\nclass Solution(object):\\n    \\n    def __init__(self, nums):\\n        indexes = self.indexes = {}\\n        for i, num in enumerate(nums):\\n            I = indexes.get(num)\\n            if I is None:\\n                indexes[num] = i\\n            elif isinstance(I, int):\\n                indexes[num] = [I, i]\\n            else:\\n                indexes[num].append(i)\\n\\n    def pick(self, target):\\n        I = self.indexes[target]\\n        return I if isinstance(I, int) else random.choice(I)\\n```\\n\\n## Original:\\nAfter quite a fight, this is my first version of this idea not getting *\"Memory Limit Exceeded\"*. It got accepted all five times I submitted it.\\n```\\nclass Solution(object):\\n    def __init__(self, nums):\\n\\n        count = {}\\n        for num in nums:\\n            count[num] = count.get(num, 0) + 1\\n\\n        start, startstop = 0, count\\n        for num in count:\\n            startstop[num], start = (start << 32) | start, start + count[num]\\n\\n        indexes = [None] * len(nums)\\n        for i, num in enumerate(nums):\\n            indexes[startstop[num] & 0xFFFFFFFF] = i\\n            startstop[num] += 1\\n\\n        self.indexes = indexes\\n        self.startstop = startstop\\n        \\n    def pick(self, target):\\n        ss = self.startstop[target]\\n        return self.indexes[random.randrange(ss >> 32, ss & 0xFFFFFFFF)]\\n```\\nFirst I count each number, then I write each number's indexes consecutively into `indexes`. So that for number `num`, its indexes are stored in `indexes[start:stop]`. And its `start`/`stop` are stored as `startstop[num] = (start << 32) | stop`.\\n\\n---\\n\\nI tried this because the [obvious solution](https://discuss.leetcode.com/post/129742) storing one list of indexes for each number consistently got MLE, with *\"Last executed input\" having `nums = [1,2,3,3,3]`. I believe that that display is wrong, that I actually got MLE for a later case where `nums` has many more different numbers. Each different number having its own list can be expensive, so I came up with the above solution where I only have one list of all indexes, and each different number now has its own `startstop` int instead of its own list. An `int` takes only 24 bytes while even the empty list takes 72 bytes (as you can see with `print sys.getsizeof([])` and `print sys.getsizeof(2**60)`).\\n\\nNote that I reuse the `count` dict as `startstop` instead of creating a new dict. That was the last optimization, the one that finally got me from MLE to Accepted."
		},
		{
			"lc_ans_id":"88126",
			"view":"1663",
			"top":"8",
			"title":"C++ O(n) solution",
			"vote":"4",
			"content":"```\\nclass Solution {\\n    vector<int> nums;\\n    \\npublic:\\n    Solution(vector<int> nums) {\\n        this->nums = nums;\\n        srand(time(NULL));\\n    }\\n    \\n    int pick(int target) {\\n        int cnt = 0;\\n        int index = -1;\\n        for(int i = 0; i<nums.size(); i++) {\\n            if (nums[i] == target) {\\n                cnt++;\\n                if (index == -1)\\n                    index = i;\\n                else {\\n                    if(rand()%cnt == 0) \\n                        index = i;\\n                }\\n            }\\n        }\\n        \\n        return index;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88110",
			"view":"890",
			"top":"9",
			"title":"Why Memory Limit Exceeded?",
			"vote":"3",
			"content":"In test case : Array [1,2,3,3,3] with a long list of [3].\\nI used C++. And I used a map<<int, vector<int>> to do a map from value to it's indexes. As far as I understand, in constructor I built a very small map, with only a few numbers. Then this small structure is queried many times. The huge answer vector is constructed outside my function. And I used none of those memory. So why there is a MLE problem?"
		}
	],
	"id":"398",
	"title":"Random Pick Index",
	"content":"<p>\r\nGiven an array of integers with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nThe array size can be very large. Solution that uses too much extra space will not pass the judge.\r\n</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nint[] nums = new int[] {1,2,3,3,3};\r\nSolution solution = new Solution(nums);\r\n\r\n// pick(3) should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.\r\nsolution.pick(3);\r\n\r\n// pick(1) should return 0. Since in the array only nums[0] is equal to 1.\r\nsolution.pick(1);\r\n</pre>\r\n</p>",
	"frequency":"149",
	"ac_num":"31128"
}