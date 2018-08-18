{
	"difficulty":"1",
	"submit_num":"43192",
	"show_id":"594",
	"leetcode_id":"594",
	"answers":[
		{
			"lc_ans_id":"103497",
			"view":"7200",
			"top":"0",
			"title":"Simple Java HashMap Solution",
			"vote":"33",
			"content":"- The idea is to keep a count of all the numbers, and eventually for each of the numbers, check if there's any adjacent number. If it's present, then add the count of both - since these two numbers form subsequence in the array. \\n\\n**Update : from @harkness comment, we don't need to check both +1 and -1;**\\n\\n    public int findLHS(int[] nums) {\\n        Map<Long, Integer> map = new HashMap<>();\\n        for (long num : nums) {\\n            map.put(num, map.getOrDefault(num, 0) + 1);\\n        }\\n        int result = 0;\\n        for (long key : map.keySet()) {\\n            if (map.containsKey(key + 1)) {\\n                result = Math.max(result, map.get(key + 1) + map.get(key));\\n            }\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"103534",
			"view":"2773",
			"top":"1",
			"title":"Python, Straightforward with Explanation",
			"vote":"14",
			"content":"Let ```count[x]``` be the number of ```x```'s in our array.\\nSuppose our longest subsequence ```B``` has ```min(B) = x``` and ```max(B) = x+1```.\\nEvidently, it should use all occurrences of ```x``` and ```x+1``` to maximize it's length, so ```len(B) = count[x] + count[x+1]```.\\nAdditionally, it must use ```x``` and ```x+1``` atleast once, so ```count[x]``` and ```count[x+1]``` should both be positive.\\n\\n```\\ndef findLHS(self, A):\\n    count = collections.Counter(A)\\n    ans = 0\\n    for x in count:\\n        if x+1 in count:\\n            ans = max(ans, count[x] + count[x+1])\\n    return ans\\n```\\n\\nAlternatively, we can count values in a straightforward way using a dictionary: replacing our first line of ```count = collections.Counter(A)``` with:\\n\\n```\\ncount = {}\\nfor x in A:\\n    count[x] = count.get(x, 0) + 1\\n```"
		},
		{
			"lc_ans_id":"103499",
			"view":"531",
			"top":"2",
			"title":"two C++ Solution run time with explanation",
			"vote":"6",
			"content":"1. run time O(n)  space O(n) use unordered_map\\n     First loop through all elements and count each number appearance. Then loop through unordered_map, to find if the key - 1 is in the unordered map. If key - 1 and key both in the map, update the result\\n````\\n    int findLHS(vector<int>& nums) {\\n        unordered_map<int,int>m;\\n        for(auto i: nums)\\n            m[i]++;\\n        int res = 0;\\n        for(auto it:m)\\n            if(m.count(it.first-1)>0)\\n                res = max(res, it.second+m[it.first-1]);\\n        return res;\\n    }\\n````\\n\\n2. O(nlogn) running time ,space O(1)  using sort\\nThe idea is to loop through each elements and update the result. The start position is used for counting purpose and new start is used for whenever come across different number\\n\\nWhen the number is different from previous number, update the new start position. When difference between current position and start position is bigger than 1 then update start position. \\n\\n````\\n       int findLHS(vector<int>& nums) {\\n        sort(nums.begin(),nums.end());\\n        int len = 0;\\n        for(int i = 1, start = 0, new_start = 0; i<nums.size(); i++)\\n        {\\n\\n            if (nums[i] - nums[start] > 1)    \\n                start = new_start;\\n            if (nums[i] != nums[i-1]) \\n                new_start = i;\\n            if(nums[i] - nums[start] == 1)\\n                len = max(len, i-start+1);\\n        }\\n        return len;\\n````"
		},
		{
			"lc_ans_id":"103541",
			"view":"1513",
			"top":"3",
			"title":"Java Solution, HashMap",
			"vote":"5",
			"content":"```\\npublic class Solution {\\n    public int findLHS(int[] nums) {\\n        int max = 0;\\n        Map<Integer, Integer> map = new HashMap<>();\\n        \\n        for (int num : nums) {\\n            map.put(num, map.getOrDefault(num, 0) + 1);\\n        }\\n        \\n        for (int num : map.keySet()) {\\n            if (map.containsKey(num + 1)) {\\n                max = Math.max(max, map.get(num) + map.get(num + 1));\\n            }\\n        }\\n        \\n        return max;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103505",
			"view":"1462",
			"top":"4",
			"title":"Simple Java Sort Solution (beat 97.9%)",
			"vote":"4",
			"content":"\\n    public int findLHS(int[] nums) {\\n        if (nums.length == 0) {\\n            return 0;\\n        }\\n        Arrays.sort(nums);\\n        int start = 0;\\n        int nextstart = 0;\\n        for (int i = 1; i < nums.length; i++) {\\n            if (nums[i] - nums[start] == 1) {\\n                if (nums[nextstart] < nums[i]) {\\n                    nextstart = i;\\n                }\\n                res = Math.max(res, i - start + 1);\\n            } else if (nums[i] - nums[start] > 1) {\\n                start = start == nextstart ? i : nextstart;\\n                i--;\\n            }\\n        }\\n        return res;\\n    }\\n\\nThanks all for the comments. I revised the code to make it easier to read and adjusted the percentage."
		},
		{
			"lc_ans_id":"103496",
			"view":"908",
			"top":"5",
			"title":"Short Python using Counter",
			"vote":"3",
			"content":"```\\nclass Solution(object):\\n    def findLHS(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        count = collections.Counter(nums)\\n        return max([count[x] + count[x+1] for x in count if count[x+1]] or [0])\\n```"
		},
		{
			"lc_ans_id":"103538",
			"view":"2188",
			"top":"6",
			"title":"C++ Solution",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    int findLHS(vector<int>& nums) {\\n        map<int, int> freqs;\\n        for (int n : nums) {\\n            freqs[n]++;\\n        }\\n\\n        int longest = 0;\\n        int lastNum = 0;\\n        int lastFreq = 0;\\n        for (pair<int, int> p : freqs) {\\n            int freq2 = 0;\\n            if (lastFreq && p.first == lastNum + 1) {\\n                freq2 = p.second + lastFreq;\\n            }\\n            longest = max(longest, freq2);\\n            lastNum = p.first;\\n            lastFreq = p.second;\\n        }\\n        return longest;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103552",
			"view":"339",
			"top":"7",
			"title":"C++ One Pass with Hash Table",
			"vote":"2",
			"content":"The idea is that if current element's min(element-1) / max(element+1) exist before which imply there is a harmonious subsequence, we could calculate the length of the subsequence by simply adding freq. of min/max and current element. \\n```\\npublic:\\n    int findLHS(vector<int>& nums) {\\n        \\n        unordered_map<int, int> map;\\n        auto max = 0;\\n        \\n        for(auto element : nums){\\n            \\n            map[element]++;\\n            if (map.count(element-1) > 0) {\\n                max = std::max(max, map[element-1] + map[element] );\\n            }\\n            if (map.count(element+1) > 0) {\\n                max = std::max(max, map[element+1] + map[element] );\\n            }\\n        }\\n        return max;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103528",
			"view":"444",
			"top":"8",
			"title":"C++ 6 lines (sort)",
			"vote":"2",
			"content":"As an alternative to the map-based solution, we can also sort the numbers and then track the number of i and i + 1 elements, as they will be next to each other.\\n```\\nint findLHS(vector<int>& nums) {\\n    sort(nums.begin(), nums.end());\\n    for (auto i = 0, lhs = 0, cnt1 = 0, cnt2 = 0; i <= nums.size(); ++i) {\\n        if (i == nums.size()) return lhs;\\n        if (i == 0 || nums[i] == nums[i - 1]) ++cnt1;\\n        else cnt2 = (nums[i - 1] + 1 == nums[i]) ? cnt1 : 0, cnt1 = 1;\\n        if (cnt1 > 0 && cnt2 > 0) lhs = max(lhs, cnt1 + cnt2);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103511",
			"view":"82",
			"top":"9",
			"title":"Simple Java Solution with two pointers - 48ms",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int findLHS(int[] nums) {\\n        int len = nums.length;\\n        Arrays.sort(nums);\\n        int left = 0;\\n        int result = 0;\\n        for (int i = 0; i < len; i++) {\\n            while (left < i && (long) (nums[i] - nums[left]) > 1L) {\\n                left++;\\n            }\\n            if (nums[i] == nums[left]) {\\n                continue;\\n            }\\n            result = Math.max(i - left + 1, result);\\n        }\\n        return result;\\n    }\\n}\\n```"
		}
	],
	"id":"573",
	"title":"Longest Harmonious Subsequence",
	"content":"<p>We define a harmonious array is an array where the difference between its maximum value and its minimum value is <b>exactly</b> 1.</p>\r\n\r\n<p>Now, given an integer array, you need to find the length of its longest harmonious subsequence among all its possible <a href=\"https://en.wikipedia.org/wiki/Subsequence\">subsequences</a>.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,3,2,2,5,2,3,7]\r\n<b>Output:</b> 5\r\n<b>Explanation:</b> The longest harmonious subsequence is [3,2,2,2,3].\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe length of the input array will not exceed 20,000.\r\n</p>\r\n\r\n",
	"frequency":"196",
	"ac_num":"17783"
}