{
	"difficulty":"1",
	"submit_num":"29758",
	"show_id":"697",
	"leetcode_id":"697",
	"answers":[
		{
			"lc_ans_id":"108660",
			"view":"4910",
			"top":"0",
			"title":"Java O(n) Time O(n) Space",
			"vote":"8",
			"content":"1) Get *degree* of array, frequency of all integers in array, and the indices of the first and last occurrence of each integer in the array\\n2) Return the minimum occurrence range of each integer which appears *degree* number of times in the array,  \\n\\n```\\npublic int findShortestSubArray(int[] nums) {\\n    int degree = 0, n = nums.length, minSize = n;\\n    Map<Integer, Integer> map = new HashMap<>();\\n    Map<Integer, Integer[]> map2 = new HashMap<>();\\n    \\n    for (int i=0;i<n;i++) {\\n        map.put(nums[i], map.getOrDefault(nums[i], 0) + 1);\\n        degree = Math.max(degree, map.get(nums[i]));\\n\\n        if (map2.get(nums[i]) == null) map2.put(nums[i], new Integer[2]);\\n        Integer[] numRange = map2.get(nums[i]);\\n        if (numRange[0] == null) numRange[0] = i;\\n        numRange[1] = i;\\n    }\\n\\n    for (Map.Entry<Integer, Integer> entry : map.entrySet()) {\\n        if (entry.getValue() != degree) continue;\\n        Integer[] range = map2.get(entry.getKey());\\n        minSize = Math.min(minSize, range[1] - range[0] + 1);  \\n    }\\n    return minSize;\\n}\\n```"
		},
		{
			"lc_ans_id":"108650",
			"view":"1622",
			"top":"1",
			"title":"Easy understand Java Solution (Beats 100% solutions)",
			"vote":"6",
			"content":"```\\n public int findShortestSubArray(int[] nums) {\\n        if (nums.length == 0 || nums == null) return 0;\\n        Map<Integer, int[]> map = new HashMap<>();\\n        for (int i = 0; i < nums.length; i++){\\n           if (!map.containsKey(nums[i])){\\n               map.put(nums[i], new int[]{1, i, i});  // the first element in array is degree, second is first index of this key, third is last index of this key\\n           } else {\\n               int[] temp = map.get(nums[i]);\\n               temp[0]++;\\n               temp[2] = i;\\n           }\\n        }\\n        int degree = Integer.MIN_VALUE, res = Integer.MAX_VALUE;\\n        for (int[] value : map.values()){\\n            if (value[0] > degree){\\n                degree = value[0];\\n                res = value[2] - value[1] + 1;\\n            } else if (value[0] == degree){\\n                res = Math.min( value[2] - value[1] + 1, res);\\n            } \\n        }\\n        return res;\\n    }\\n````"
		},
		{
			"lc_ans_id":"108674",
			"view":"1245",
			"top":"2",
			"title":"Concise c++ solution using hash map. O(n) time",
			"vote":"4",
			"content":"Using two hash map.\\nOne  records the starting index for the character.\\nThe other records the frequency of the character.\\n\\nOnce a certain character's frequency is bigger than others. we update the variable len. When more than two character have the same frequency, just compare their length, choose the shorter one.\\n\\n\\n```\\nclass Solution {\\npublic:\\n    int findShortestSubArray(vector<int>& nums) {\\n        if (nums.size() < 2) return nums.size();\\n        int res = nums.size();\\n        unordered_map<int, int> startIndex, count;\\n        int len = nums.size(), fre = 0;\\n        for (int i = 0; i < nums.size() ;i++) {\\n            if (startIndex.count(nums[i]) == 0) startIndex[nums[i]] = i;\\n            count[nums[i]]++;\\n            if (count[nums[i]] == fre){\\n                len = min(i - startIndex[nums[i]] + 1, len);\\n            }\\n            if (count[nums[i]] > fre){\\n                len = i - startIndex[nums[i]] + 1;\\n                fre = count[nums[i]];\\n            }\\n        }\\n        return len;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108651",
			"view":"435",
			"top":"3",
			"title":"straightforward c++ solution, 35ms",
			"vote":"4",
			"content":"Just record the index of each number in a hash map and find the degree of the array. Second iteration to find the shortest index range for the number with the largest frequency.\\nHere is the code which is self explained.\\n\\n```\\nclass Solution {\\npublic:\\n    int findShortestSubArray(vector<int>& nums) {\\n        unordered_map<int,vector<int>> mp;\\n        for(int i=0;i<nums.size();i++) mp[nums[i]].push_back(i);\\n        int degree=0;\\n        for(auto it=mp.begin();it!=mp.end();it++) degree=max(degree,int(it->second.size()));\\n        int shortest=nums.size();\\n        for(auto it=mp.begin();it!=mp.end();it++)\\n        {\\n            if(it->second.size()==degree)\\n            {\\n                shortest=min(shortest,it->second.back()-it->second[0]+1);\\n            }\\n        }\\n        return shortest;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108647",
			"view":"347",
			"top":"4",
			"title":"Python O(n) concise with explanation (two approaches)",
			"vote":"4",
			"content":"Firstly, group each num and collect the index it appears into a list. The list with the longest length will be the degree of the array.\\n\\nNext loop through each of the lists, only those lists with the same length as the degree will qualify. We simply take difference between the first and last value of each qualifying lists to find the length of such a possible subarray .\\n\\nFor example if we have `[1, 1, 2, 2, 2, 3, 1]`, after grouping by value:\\n\\n`[1, 1, 2, 2, 2, 3, 1]` => `{ 1: [0, 1, 6], 2: [2, 3, 4], 3: [4] }, degree: 3`\\n\\nOnly have to consider values where the length == degree:\\n- `1: [0, 1, 6]` => subarray length: (6 - 0) + 1 = 7\\n- `2: [2, 3, 4]` => subarray length: (4 - 2) + 1 = 3 (Winner!)\\n\\n```\\nclass Solution(object):\\n    def findShortestSubArray(self, nums):\\n        nums_map, deg, min_len = collections.defaultdict(list), 0, float('inf')\\n        for index, num in enumerate(nums):\\n            nums_map[num].append(index)\\n            deg = max(deg, len(nums_map[num]))\\n        for num, indices in nums_map.items():\\n            if len(indices) == deg:\\n                min_len = min(min_len, indices[-1] - indices[0] + 1)\\n        return min_len\\n```\\n\\nAnother solution that just requires one for loop:\\n\\n```\\nclass Solution(object):\\n    def findShortestSubArray(self, nums):\\n        nums_map, deg, min_len = collections.defaultdict(list), 0, float('inf')\\n        for index, num in enumerate(nums):\\n            nums_map[num].append(index)\\n            if len(nums_map[num]) == deg:\\n                min_len = min(min_len, nums_map[num][-1] - nums_map[num][0] + 1)\\n            elif len(nums_map[num]) > deg:\\n                deg = len(nums_map[num])\\n                min_len = nums_map[num][-1] - nums_map[num][0] + 1\\n        return min_len\\n```\\n\\n*- Yangshun*"
		},
		{
			"lc_ans_id":"108666",
			"view":"2304",
			"top":"5",
			"title":"Python easy and concise solution",
			"vote":"4",
			"content":"````\\ndef findShortestSubArray(self, nums):\\n        c = collections.Counter(nums)\\n        first, last = {}, {}\\n        for i, v in enumerate(nums):\\n            first.setdefault(v, i)\\n            last[v] = i\\n        degree = max(c.values())\\n        return min(last[v] - first[v] + 1 for v in c if c[v] == degree)"
		},
		{
			"lc_ans_id":"108686",
			"view":"843",
			"top":"6",
			"title":"Java very concise and easy Solution(Beats 100% Java Solutions)",
			"vote":"2",
			"content":"```\\nclass Solution {\\n    public int findShortestSubArray(int[] nums) {\\n        int len=nums.length;\\n        if(len==0) return 0;\\n        Map<Integer,Integer> count= new HashMap<>();\\n        Map<Integer,Integer> starts= new HashMap<>();\\n        Map<Integer,Integer> ends= new HashMap<>();\\n        int max=0;\\n        for(int i=0;i<len;i++){\\n            if(!count.containsKey(nums[i])){\\n                count.put(nums[i],0);\\n                starts.put(nums[i],i);\\n            }\\n            ends.put(nums[i],i);\\n            count.put(nums[i],count.get(nums[i])+1);\\n            max=Math.max(count.get(nums[i]),max);\\n        }\\n        int min=Integer.MAX_VALUE;\\n        for(Integer key: count.keySet()){\\n            if(count.get(key)==max){\\n                min=Math.min(min,ends.get(key)-starts.get(key)+1);\\n            }\\n        }\\n        return min;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108662",
			"view":"58",
			"top":"7",
			"title":"O(n) and O(n) space using Hashmap and sliding window",
			"vote":"1",
			"content":"I think the code is self-explanatory\\n```\\nclass Solution {\\n    public int findShortestSubArray(int[] nums) {\\n        //Find maximum frequency \\n        HashMap<Integer,Integer> hmap = new HashMap<>();\\n        int max = 0;\\n        for(int i:nums){\\n            int count = hmap.getOrDefault(i,0)+1;\\n            max = Math.max(max,count);\\n            hmap.put(i,count);\\n        }\\n        //Use sliding window\\n        hmap = new HashMap<>();\\n        int i=0;\\n        int min = Integer.MAX_VALUE;\\n        for(int j=0;j<nums.length;j++){\\n            int count = hmap.getOrDefault(nums[j],0)+1;\\n            hmap.put(nums[j],count);\\n            while(hmap.get(nums[j])==max){\\n                min = Math.min(min,j-i+1);\\n                hmap.put(nums[i],hmap.get(nums[i])-1);\\n                i++;\\n            }\\n            \\n        }\\n        return min;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108675",
			"view":"84",
			"top":"8",
			"title":"My java solution a little bit different",
			"vote":"1",
			"content":"\\n    public int findShortestSubArray(int[] nums)\\n    {\\n        HashMap<Integer, Integer> left = new HashMap();\\n        HashMap<Integer, Integer> right = new HashMap();\\n        HashMap<Integer, Integer> degree = new HashMap();\\n        int res = 50000, maxDegree = 0;\\n        \\n        for(int i = 0; i < nums.length; i++)\\n        {\\n            if(!left.containsKey(nums[i]))\\n            {\\n                left.put(nums[i] , i);\\n                right.put(nums[i] , i);\\n                degree.put(nums[i], 1);\\n            }\\n            else\\n            {\\n                right.put(nums[i] , i);\\n                degree.put(nums[i] , degree.get(nums[i]) + 1);\\n            }\\n            maxDegree = Math.max(maxDegree, degree.get(nums[i]));\\n        }\\n        \\n        Set set = degree.entrySet();\\n        Iterator it = set.iterator();\\n        while(it.hasNext())\\n        {\\n            Map.Entry entry = (Map.Entry)it.next();\\n            if(entry.getValue().equals(maxDegree))\\n            {\\n                int temp = (int)entry.getKey();\\n                res = Math.min(res , right.get(temp) - left.get(temp) + 1);\\n            }\\n        }\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"108696",
			"view":"71",
			"top":"9",
			"title":"C++ solution, unordered_map",
			"vote":"1",
			"content":"vector[0] is used to count the times of the value, vector[0] is the start position and vector[1] is the end position.\\n```\\nclass Solution {\\npublic:\\n    int findShortestSubArray(vector<int>& nums) {\\n        unordered_map<int, vector<int>> mMap;\\n        \\n        int maxTimes =  0;\\n        for(int i = 0;i<nums.size();++i) {\\n            if(mMap[nums[i]].empty()) {\\n                mMap[nums[i]].push_back(1);\\n                mMap[nums[i]].push_back(i);\\n                mMap[nums[i]].push_back(i);\\n            }\\n            else {\\n                mMap[nums[i]][0]++;\\n                mMap[nums[i]][2] = i;\\n            }\\n            maxTimes = max(maxTimes,mMap[nums[i]][0]);\\n        }\\n        if(maxTimes == 1) return 1;\\n        auto retVal = INT_MAX;\\n        for(auto &val:mMap) {\\n            if((val.second)[0]==maxTimes) retVal = min(retVal,(val.second)[2]-(val.second)[1]+1);\\n        }\\n        if(retVal == INT_MAX) retVal = 1;\\n        return retVal;\\n    }\\n};\\n```"
		}
	],
	"id":"674",
	"title":"Degree of an Array",
	"content":"<p>Given a non-empty array of non-negative integers <code>nums</code>, the <b>degree</b> of this array is defined as the maximum frequency of any one of its elements.</p>\r\n<p>Your task is to find the smallest possible length of a (contiguous) subarray of <code>nums</code>, that has the same degree as <code>nums</code>.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1, 2, 2, 3, 1]\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> \r\nThe input array has a degree of 2 because both elements 1 and 2 appear twice.\r\nOf the subarrays that have the same degree:\r\n[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]\r\nThe shortest length is 2. So return 2.\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,2,3,1,4,2]\r\n<b>Output:</b> 6\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li><code>nums.length</code> will be between 1 and 50,000.</li>\r\n<li><code>nums[i]</code> will be an integer between 0 and 49,999.</li>\r\n</p>",
	"frequency":"384",
	"ac_num":"14000"
}