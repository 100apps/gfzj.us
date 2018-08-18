{
	"difficulty":"1",
	"submit_num":"245952",
	"show_id":"349",
	"leetcode_id":"349",
	"answers":[
		{
			"lc_ans_id":"81969",
			"view":"42177",
			"top":"0",
			"title":"Three Java Solutions",
			"vote":"137",
			"content":"Use two hash sets\\n\\nTime complexity: O(n)\\n\\n    public class Solution {\\n        public int[] intersection(int[] nums1, int[] nums2) {\\n            Set<Integer> set = new HashSet<>();\\n            Set<Integer> intersect = new HashSet<>();\\n            for (int i = 0; i < nums1.length; i++) {\\n                set.add(nums1[i]);\\n            }\\n            for (int i = 0; i < nums2.length; i++) {\\n                if (set.contains(nums2[i])) {\\n                    intersect.add(nums2[i]);\\n                }\\n            }\\n            int[] result = new int[intersect.size()];\\n            int i = 0;\\n            for (Integer num : intersect) {\\n                result[i++] = num;\\n            }\\n            return result;\\n        }\\n    }\\n\\n\\nSort both arrays, use two pointers\\n\\nTime complexity: O(nlogn)\\n\\n    public class Solution {\\n        public int[] intersection(int[] nums1, int[] nums2) {\\n            Set<Integer> set = new HashSet<>();\\n            Arrays.sort(nums1);\\n            Arrays.sort(nums2);\\n            int i = 0;\\n            int j = 0;\\n            while (i < nums1.length && j < nums2.length) {\\n                if (nums1[i] < nums2[j]) {\\n                    i++;\\n                } else if (nums1[i] > nums2[j]) {\\n                    j++;\\n                } else {\\n                    set.add(nums1[i]);\\n                    i++;\\n                    j++;\\n                }\\n            }\\n            int[] result = new int[set.size()];\\n            int k = 0;\\n            for (Integer num : set) {\\n                result[k++] = num;\\n            }\\n            return result;\\n        }\\n    }\\n\\nBinary search\\n\\nTime complexity: O(nlogn)\\n\\n    public class Solution {\\n        public int[] intersection(int[] nums1, int[] nums2) {\\n            Set<Integer> set = new HashSet<>();\\n            Arrays.sort(nums2);\\n            for (Integer num : nums1) {\\n                if (binarySearch(nums2, num)) {\\n                    set.add(num);\\n                }\\n            }\\n            int i = 0;\\n            int[] result = new int[set.size()];\\n            for (Integer num : set) {\\n                result[i++] = num;\\n            }\\n            return result;\\n        }\\n        \\n        public boolean binarySearch(int[] nums, int target) {\\n            int low = 0;\\n            int high = nums.length - 1;\\n            while (low <= high) {\\n                int mid = low + (high - low) / 2;\\n                if (nums[mid] == target) {\\n                    return true;\\n                }\\n                if (nums[mid] > target) {\\n                    high = mid - 1;\\n                } else {\\n                    low = mid + 1;\\n                }\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"82001",
			"view":"11806",
			"top":"1",
			"title":"8ms concise C++ using unordered_set",
			"vote":"41",
			"content":"    class Solution {\\n    public:\\n        vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\\n            unordered_set<int> m(nums1.begin(), nums1.end());\\n            vector<int> res;\\n            for (auto a : nums2)\\n                if (m.count(a)) {\\n                    res.push_back(a);\\n                    m.erase(a);\\n                }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81974",
			"view":"7120",
			"top":"2",
			"title":"5ms Java Using 1 hashset and time complexity of O(m+n)",
			"vote":"24",
			"content":"    HashSet<Integer> set = new HashSet<Integer>();\\n            ArrayList<Integer> res = new ArrayList<Integer>();\\n            //Add all elements to set from array 1\\n            for(int i =0; i< nums1.length; i++) set.add(nums1[i]);\\n            for(int j = 0; j < nums2.length; j++) {\\n               // If present in array 2 then add to res and remove from set \\n               if(set.contains(nums2[j])) {\\n                    res.add(nums2[j]);\\n                    set.remove(nums2[j]);\\n                }\\n            }\\n            // Convert ArrayList to array\\n            int[] arr = new int[res.size()];\\n            for (int i= 0; i < res.size(); i++) arr[i] = res.get(i);\\n            return arr;"
		},
		{
			"lc_ans_id":"81999",
			"view":"7764",
			"top":"3",
			"title":"Python code, 3 lines using set",
			"vote":"22",
			"content":"    class Solution(object):\\n    def intersection(self, nums1, nums2):\\n        \"\"\"\\n        :type nums1: List[int]\\n        :type nums2: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        nums1=set(nums1)\\n        nums2=set(nums2)\\n        return list(nums1&nums2)"
		},
		{
			"lc_ans_id":"81966",
			"view":"5902",
			"top":"4",
			"title":"Small C++ solution",
			"vote":"21",
			"content":"    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\\n        set<int> s(nums1.begin(), nums1.end());\\n        vector<int> out;\\n        for (int x : nums2)\\n            if (s.erase(x))\\n                out.push_back(x);\\n        return out;\\n    }"
		},
		{
			"lc_ans_id":"82006",
			"view":"2279",
			"top":"5",
			"title":"Four Python solutions with simple explanation",
			"vote":"16",
			"content":"Solution 1:\\n\\nuse set operation in python, one-line solution.\\n\\n    class Solution(object):\\n    def intersection(self, nums1, nums2):\\n        \"\"\"\\n        :type nums1: List[int]\\n        :type nums2: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        return list(set(nums1) & set(nums2))\\n\\n\\nSolution 2:\\n\\nbrute-force searching, search each element of the first list in the second list. (to be more efficient, you can sort the second list and use binary search to accelerate)\\n\\n    class Solution(object):\\n    def intersection(self, nums1, nums2):\\n        \"\"\"\\n        :type nums1: List[int]\\n        :type nums2: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        res = []\\n        for i in nums1:\\n            if i not in res and i in nums2:\\n                res.append(i)\\n        \\n        return res\\n\\nSolution 3:\\n\\nuse dict/hashmap to record all nums appeared in the first list, and then check if there are nums in the second list have appeared in the map.\\n\\n    class Solution(object):\\n    def intersection(self, nums1, nums2):\\n        \"\"\"\\n        :type nums1: List[int]\\n        :type nums2: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        res = []\\n        map = {}\\n        for i in nums1:\\n            map[i] = map[i]+1 if i in map else 1\\n        for j in nums2:\\n            if j in map and map[j] > 0:\\n                res.append(j)\\n                map[j] = 0\\n        \\n        return res\\n\\nSolution 4:\\n\\nsort the two list, and use two pointer to search in the lists to find common elements.\\n\\n    class Solution(object):\\n    def intersection(self, nums1, nums2):\\n        \"\"\"\\n        :type nums1: List[int]\\n        :type nums2: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        res = []\\n        nums1.sort()\\n        nums2.sort()\\n        i = j = 0\\n        while (i < len(nums1) and j < len(nums2)):\\n            if nums1[i] > nums2[j]:\\n                j += 1\\n            elif nums1[i] < nums2[j]:\\n                i += 1\\n            else:\\n                if not (len(res) and nums1[i] == res[len(res)-1]):\\n                    res.append(nums1[i])\\n                i += 1\\n                j += 1\\n        \\n        return res"
		},
		{
			"lc_ans_id":"82003",
			"view":"1962",
			"top":"6",
			"title":"1 line in Python",
			"vote":"13",
			"content":"    class Solution(object):\\n        def intersection(self, nums1, nums2):\\n            return list(set(nums1) & set(nums2))"
		},
		{
			"lc_ans_id":"82187",
			"view":"541",
			"top":"7",
			"title":"JavaScript solution with Set",
			"vote":"10",
			"content":"    function intersection(nums1, nums2) {\\n        const set = new Set(nums1);\\n        return [...new Set(nums2.filter(n => set.has(n)))];\\n    }"
		},
		{
			"lc_ans_id":"82138",
			"view":"2440",
			"top":"8",
			"title":"My C++ solution with sort",
			"vote":"7",
			"content":"    class Solution {\\n    public:\\n        vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\\n            std::sort(nums1.begin(), nums1.end());\\n            std::sort(nums2.begin(), nums2.end());\\n            vector<int> ans;\\n            int i = 0, j = 0;\\n            while (i < nums1.size() && j < nums2.size())\\n            {\\n                if (nums1[i] < nums2[j])\\n                    i++;\\n                else if (nums1[i] > nums2[j])\\n                    j++;\\n                else\\n                {\\n                    if (!ans.size() || ans.back() != nums1[i])\\n                        ans.push_back(nums1[i]);\\n                    i++;\\n                    j++;\\n                }\\n            }\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"82155",
			"view":"1451",
			"top":"9",
			"title":"Java 6ms O(n+m) Solution with two Hashset",
			"vote":"5",
			"content":"The problem asks us to find the same integers in both arrays and return a non-duplicate result array.\\n\\n    public int[] intersection(int[] nums1, int[] nums2) {\\n    \\t\\tif (nums1.length == 0 || nums2.length == 0)\\n    \\t\\t\\treturn new int[0];\\n    \\t\\tSet<Integer> set = new HashSet<>();\\n    \\t\\tSet<Integer> result = new HashSet<>();\\n    \\t\\tfor (int i = 0; i < nums2.length; i++) {\\n    \\t\\t\\tset.add(nums2[i]);\\n    \\t\\t}\\n    \\t\\tfor (int i = 0; i < nums1.length; i++) {\\n    \\t\\t\\tif (set.contains(nums1[i])) {\\n    \\t\\t\\t\\tresult.add(nums1[i]);\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\tint[] intersection = new int[result.size()];\\n    \\t\\tint j = 0;\\n    \\t\\tIterator<Integer> it = result.iterator();\\n    \\t\\twhile(it.hasNext()) {\\n    \\t\\t\\tintersection[j] = it.next();\\n    \\t\\t\\tj++;\\n    \\t\\t}\\n    \\t\\treturn intersection;\\t\\n    \\t}"
		}
	],
	"id":"349",
	"title":"Intersection of Two Arrays",
	"content":"<p>\r\nGiven two arrays, write a function to compute their intersection.\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\nGiven <i>nums1</i> = <code>[1, 2, 2, 1]</code>, <i>nums2</i> = <code>[2, 2]</code>, return <code>[2]</code>.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ul>\r\n<li>Each element in the result must be unique.</li>\r\n<li>The result can be in any order.</li>\r\n</ul>\r\n</p>",
	"frequency":"479",
	"ac_num":"117874"
}