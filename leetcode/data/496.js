{
	"difficulty":"1",
	"submit_num":"56422",
	"show_id":"506",
	"leetcode_id":"506",
	"answers":[
		{
			"lc_ans_id":"98468",
			"view":"16741",
			"top":"0",
			"title":"Easy Java Solution, Sorting.",
			"vote":"31",
			"content":"Basically this question is to find out the ```score``` -> ```ranking``` mapping. The easiest way is to sort those ```scores``` in ```nums```. But we will lose their original order. We can create (```score``` , ```original index```) pairs and sort them by ```score``` decreasingly. Then we will have ```score``` -> ```ranking``` (new index) mapping and we can use ```original index``` to create the result.\\n\\nTime complexity: O(NlgN). Space complexity: O(N). N is the number of scores.\\n```\\nExample:\\n\\nnums[i]    : [10, 3, 8, 9, 4]\\npair[i][0] : [10, 3, 8, 9, 4]\\npair[i][1] : [ 0, 1, 2, 3, 4]\\n\\nAfter sort:\\npair[i][0] : [10, 9, 8, 4, 3]\\npair[i][1] : [ 0, 3, 2, 4, 1]\\n```\\n```\\npublic class Solution {\\n    public String[] findRelativeRanks(int[] nums) {\\n        int[][] pair = new int[nums.length][2];\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            pair[i][0] = nums[i];\\n            pair[i][1] = i;\\n        }\\n        \\n        Arrays.sort(pair, (a, b) -> (b[0] - a[0]));\\n        \\n        String[] result = new String[nums.length];\\n\\n        for (int i = 0; i < nums.length; i++) {\\n            if (i == 0) {\\n                result[pair[i][1]] = \"Gold Medal\";\\n            }\\n            else if (i == 1) {\\n                result[pair[i][1]] = \"Silver Medal\";\\n            }\\n            else if (i == 2) {\\n                result[pair[i][1]] = \"Bronze Medal\";\\n            }\\n            else {\\n                result[pair[i][1]] = (i + 1) + \"\";\\n            }\\n        }\\n\\n        return result;\\n    }\\n}\\n```\\n\\nAlso we can use an one dimension array. This will save a little bit space but space complexity is still O(n).\\n\\n```\\npublic class Solution {\\n    public String[] findRelativeRanks(int[] nums) {\\n        Integer[] index = new Integer[nums.length];\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            index[i] = i;\\n        }\\n        \\n        Arrays.sort(index, (a, b) -> (nums[b] - nums[a]));\\n        \\n        String[] result = new String[nums.length];\\n\\n        for (int i = 0; i < nums.length; i++) {\\n            if (i == 0) {\\n                result[index[i]] = \"Gold Medal\";\\n            }\\n            else if (i == 1) {\\n                result[index[i]] = \"Silver Medal\";\\n            }\\n            else if (i == 2) {\\n                result[index[i]] = \"Bronze Medal\";\\n            }\\n            else {\\n                result[index[i]] = (i + 1) + \"\";\\n            }\\n        }\\n\\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98472",
			"view":"5104",
			"top":"1",
			"title":"Python solution",
			"vote":"19",
			"content":"Use a dictionary mapping scores to ranks.\\n\\n    def findRelativeRanks(self, nums):\\n        sort = sorted(nums)[::-1]\\n        rank = [\"Gold Medal\", \"Silver Medal\", \"Bronze Medal\"] + map(str, range(4, len(nums) + 1))\\n        return map(dict(zip(sort, rank)).get, nums)"
		},
		{
			"lc_ans_id":"98505",
			"view":"6501",
			"top":"2",
			"title":"Simple Sorting O(n log n) solution",
			"vote":"17",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<string> findRelativeRanks(vector<int>& nums) {\\n        vector<int> rank;\\n        for(int i=0; i<nums.size(); ++i) rank.push_back(i);\\n        \\n        sort(rank.begin(), rank.end(), [&](int a, int b){return nums[a] > nums[b];});\\n        vector<string> ranks(nums.size());\\n        \\n        for(int i=3; i<nums.size(); ++i){\\n            ranks[rank[i]] = std::to_string(i+1);\\n        }\\n        \\n        if(nums.size() > 0) ranks[rank[0]] = \"Gold Medal\";\\n        if(nums.size() > 1) ranks[rank[1]] = \"Silver Medal\";\\n        if(nums.size() > 2) ranks[rank[2]] = \"Bronze Medal\";\\n        \\n        return ranks;\\n    }\\n};"
		},
		{
			"lc_ans_id":"98524",
			"view":"4816",
			"top":"3",
			"title":"C++ Easy to Understand",
			"vote":"12",
			"content":"    class Solution {\\n    public:\\n        vector<string> findRelativeRanks(vector<int>& nums) {\\n            priority_queue<pair<int,int> > pq;\\n            for(int i=0;i<nums.size();i++)\\n            {\\n                pq.push(make_pair(nums[i],i));\\n            }\\n            vector<string> res(nums.size(),\"\");\\n            int count = 1;\\n            for(int i=0; i<nums.size();i++)\\n            {\\n                if(count==1) {res[pq.top().second] = \"Gold Medal\"; count++;}\\n                else if(count==2) {res[pq.top().second] = \"Silver Medal\"; count++;}\\n                else if(count==3) {res[pq.top().second] = \"Bronze Medal\"; count++;}\\n                else {res[pq.top().second] = to_string(count); count++;}\\n                pq.pop();\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"98578",
			"view":"1125",
			"top":"4",
			"title":"Simple C++ solution using a map",
			"vote":"7",
			"content":"```\\n    vector<string> findRelativeRanks(vector<int>& nums) {\\n        map<int, int> mp;\\n        for (int i = 0; i < nums.size(); i++) mp[nums[i]] = i;\\n        \\n        vector<string> ans(mp.size(), \"\");\\n        int cnt = 1; \\n        for (map<int, int>::reverse_iterator it = mp.rbegin(); it != mp.rend(); it++, cnt++) {\\n            if (cnt == 1) ans[it->second] = \"Gold Medal\";\\n            else if (cnt == 2) ans[it->second] = \"Silver Medal\";\\n            else if (cnt == 3) ans[it->second] = \"Bronze Medal\";\\n            else ans[it->second] = to_string(cnt);\\n        }\\n        \\n        return ans;\\n```"
		},
		{
			"lc_ans_id":"98574",
			"view":"774",
			"top":"5",
			"title":"JavaScript solution",
			"vote":"6",
			"content":"\\nBasically we can create a new array in the ascending order which can be used to create a mapping for the original nums array.\\n\\nOnce we have the mapping, we can replace the numbers in the original array with relatives rank and return the result.\\n\\nO(n) Space complexity\\nO(n logn ) + O(n) Time complexity \\n\\n```\\n/**\\n * @param {number[]} nums\\n * @return {string[]}\\n */\\nvar findRelativeRanks = function(nums) {\\n  var sortedNums = nums.slice(0).sort(function(a , b){\\n      return b - a;\\n  });\\n  // Create a map to the sorted nums\\n  var sortedNumsMapping = {};\\n  sortedNums.forEach(function(num, index){\\n      sortedNumsMapping[num] = index + 1 + ''; \\n  });\\n\\n  return nums.map(function(num, index) {\\n    if(sortedNumsMapping[num] === '1') return \"Gold Medal\";\\n    else if(sortedNumsMapping[num] === '2' ) return \"Silver Medal\";\\n    else if(sortedNumsMapping[num] === '3' ) return \"Bronze Medal\";\\n    else return (sortedNumsMapping[num]);\\n  });\\n\\n};\\n```"
		},
		{
			"lc_ans_id":"98492",
			"view":"1696",
			"top":"6",
			"title":"Java 6ms solution O(n) without sorting",
			"vote":"4",
			"content":"I know, not the best codestyle, but it's pretty fast, especially on a \"huge\" amount of data.\\n```\\npublic class Solution {\\n    public String[] findRelativeRanks(int[] nums) {\\n        String[] result = new String[nums.length];\\n        int max = 0;\\n        for (int i : nums) {\\n            if (i > max) max = i;\\n        }\\n        int[] hash = new int[max + 1];\\n        for (int i = 0; i < nums.length; i++) {\\n            hash[nums[i]] = i + 1;\\n        }\\n        int place = 1;\\n        for (int i = hash.length - 1; i >= 0; i--) {\\n            if (hash[i] != 0) {\\n                if (place == 1) {\\n                    result[hash[i] - 1] = \"Gold Medal\";\\n                } else if (place == 2) {\\n                    result[hash[i] - 1] = \"Silver Medal\";\\n                } else if (place == 3) {\\n                    result[hash[i] - 1] = \"Bronze Medal\";\\n                } else {\\n                    result[hash[i] - 1] = String.valueOf(place);\\n                }\\n                place++;\\n            }\\n        }\\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98564",
			"view":"1262",
			"top":"7",
			"title":"Java: Easy to understand O(NLogN) solution",
			"vote":"4",
			"content":"    public class Solution {\\n    \\n    public String[] findRelativeRanks(int[] nums) {\\n        if(nums == null || nums.length == 0) return new String[0];\\n        int n = nums.length;\\n        String[] result = new String[n];\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        \\n        for(int i = 0; i < n; ++i){\\n            map.put(nums[i], i);\\n        }\\n        Arrays.sort(nums);\\n        for( int i = 0; i < n/2; ++i ) { \\n            int temp = nums[i]; \\n            nums[i] = nums[n - i - 1]; \\n            nums[n - i - 1] = temp; \\n        }\\n        \\n        result[map.get(nums[0])] = \"Gold Medal\";\\n        if(1 < n) result[map.get(nums[1])] = \"Silver Medal\";\\n        if(2 < n) result[map.get(nums[2])] = \"Bronze Medal\";\\n        for(int j = 3; j < n; ++j){\\n            result[map.get(nums[j])] = String.valueOf(j + 1);\\n        }\\n        return result;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"98554",
			"view":"652",
			"top":"8",
			"title":"Straightforward Java solution",
			"vote":"3",
			"content":"Just use a map to store the rank and score.\\nSpace: O(n)\\nTime: O(nlogn)\\n```\\npublic String[] findRelativeRanks(int[] nums) {\\n        int[] tmp = new int[nums.length];\\n        for (int i = 0; i < nums.length; i++){\\n            tmp[i] = nums[i];\\n        }\\n        Arrays.sort(tmp);\\n        Map<Integer, String> rankMap = new HashMap();\\n        int len = nums.length;\\n        for (int i = len-1; i >= 0; i--){\\n            if (i == len-1) rankMap.put(tmp[i], \"Gold Medal\");\\n            else if (i == len-2) rankMap.put(tmp[i], \"Silver Medal\");\\n            else if (i == len-3) rankMap.put(tmp[i], \"Bronze Medal\");\\n            else rankMap.put(tmp[i], String.valueOf(len-i));\\n        }\\n        String[] result = new String[len];\\n        for (int i = 0; i < len; i++){\\n            result[i] = rankMap.get(nums[i]);\\n        }\\n        return result;\\n    }\\n```\\n\\nAlso viewable [here](https://github.com/fishercoder1534/Leetcode) on Github."
		},
		{
			"lc_ans_id":"98557",
			"view":"523",
			"top":"9",
			"title":"Sorting Python solution",
			"vote":"3",
			"content":"Create a mapping of scores to sorted order indices \\n\\n```python\\nclass Solution(object):\\n    def findRelativeRanks(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: List[str]\\n        \"\"\"\\n        s = {n: i for i, n in enumerate(sorted(nums, reverse=True))}\\n        medals = ['Gold', 'Silver', 'Bronze']\\n        return [str(s[n]+1) if s[n] >= len(medals) else (medals[s[n]] + ' Medal') for n in nums]\\n```"
		}
	],
	"id":"496",
	"title":"Relative Ranks",
	"content":"<p>\r\nGiven scores of <b>N</b> athletes, find their relative ranks and the people with the top three highest scores, who will be awarded medals: \"Gold Medal\", \"Silver Medal\" and \"Bronze Medal\".</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [5, 4, 3, 2, 1]\r\n<b>Output:</b> [\"Gold Medal\", \"Silver Medal\", \"Bronze Medal\", \"4\", \"5\"]\r\n<b>Explanation:</b> The first three athletes got the top three highest scores, so they got \"Gold Medal\", \"Silver Medal\" and \"Bronze Medal\". <br/>For the left two athletes, you just need to output their relative ranks according to their scores.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>N is a positive integer and won't exceed 10,000.</li>\r\n<li>All the scores of athletes are guaranteed to be unique.</li>\r\n</ol>\r\n</p>\r\n",
	"frequency":"285",
	"ac_num":"26411"
}