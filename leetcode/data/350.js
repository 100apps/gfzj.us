{
	"difficulty":"1",
	"submit_num":"203272",
	"show_id":"350",
	"leetcode_id":"350",
	"answers":[
		{
			"lc_ans_id":"82243",
			"view":"29128",
			"top":"0",
			"title":"Solution to 3rd follow-up question",
			"vote":"101",
			"content":"> What if elements of nums2 are stored on disk, and the memory is\\n> limited such that you cannot load all elements into the memory at\\n> once?\\n\\n- If only nums2 cannot fit in memory, put all elements of nums1 into a HashMap, read chunks of array that fit into the memory, and record the intersections.\\n\\n- If both nums1 and nums2 are so huge that neither fit into the memory, sort them individually (external sort), then read 2 elements from each array at a time in memory, record intersections."
		},
		{
			"lc_ans_id":"82241",
			"view":"24806",
			"top":"1",
			"title":"AC solution using Java HashMap",
			"vote":"72",
			"content":"    public class Solution {\\n        public int[] intersect(int[] nums1, int[] nums2) {\\n            HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();\\n            ArrayList<Integer> result = new ArrayList<Integer>();\\n            for(int i = 0; i < nums1.length; i++)\\n            {\\n                if(map.containsKey(nums1[i])) map.put(nums1[i], map.get(nums1[i])+1);\\n                else map.put(nums1[i], 1);\\n            }\\n        \\n            for(int i = 0; i < nums2.length; i++)\\n            {\\n                if(map.containsKey(nums2[i]) && map.get(nums2[i]) > 0)\\n                {\\n                    result.add(nums2[i]);\\n                    map.put(nums2[i], map.get(nums2[i])-1);\\n                }\\n            }\\n        \\n           int[] r = new int[result.size()];\\n           for(int i = 0; i < result.size(); i++)\\n           {\\n               r[i] = result.get(i);\\n           }\\n        \\n           return r;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"82263",
			"view":"14356",
			"top":"2",
			"title":"C++ hash table solution and sort + two pointers solution with time and space complexity",
			"vote":"58",
			"content":"m: nums1.size     n: nums2.size\\n\\nHash table solution: \\nTime: O(m + n)   Space: O(m + n)\\n\\n    class Solution {\\n    public:\\n        vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {\\n            unordered_map<int, int> dict;\\n            vector<int> res;\\n            for(int i = 0; i < (int)nums1.size(); i++) dict[nums1[i]]++;\\n            for(int i = 0; i < (int)nums2.size(); i++)\\n                if(--dict[nums2[i]] >= 0) res.push_back(nums2[i]);\\n            return res;\\n        }\\n    };\\n\\nHash table solution2:\\nTime: O(m + n)    Space: O(m)\\n\\n    class Solution {\\n    public:\\n        vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {\\n            unordered_map<int, int> dict;\\n            vector<int> res;\\n            for(int i = 0; i < (int)nums1.size(); i++) dict[nums1[i]]++;\\n            for(int i = 0; i < (int)nums2.size(); i++)\\n                if(dict.find(nums2[i]) != dict.end() && --dict[nums2[i]] >= 0) res.push_back(nums2[i]);\\n            return res;\\n        }\\n    };\\n\\nSort and two pointers Solution:\\nTime: O(max(m, n) log(max(m, n)))   Space: O(m + n)\\n\\n    class Solution {\\n    public:\\n        vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {\\n            sort(nums1.begin(), nums1.end());\\n            sort(nums2.begin(), nums2.end());\\n            int n1 = (int)nums1.size(), n2 = (int)nums2.size();\\n            int i1 = 0, i2 = 0;\\n            vector<int> res;\\n            while(i1 < n1 && i2 < n2){\\n                if(nums1[i1] == nums2[i2]) {\\n                    res.push_back(nums1[i1]);\\n                    i1++;\\n                    i2++;\\n                }\\n                else if(nums1[i1] > nums2[i2]){\\n                    i2++;\\n                }\\n                else{\\n                    i1++;\\n                }\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"82240",
			"view":"9863",
			"top":"3",
			"title":"2 lines in Python",
			"vote":"42",
			"content":"    from collections import Counter\\n    \\n    class Solution(object):\\n        def intersect(self, nums1, nums2):\\n            c1, c2 = Counter(nums1), Counter(nums2)\\n            return sum([[num] * min(c1[num], c2[num]) for num in c1 & c2], [])"
		},
		{
			"lc_ans_id":"82269",
			"view":"5600",
			"top":"4",
			"title":"Short Python / C++",
			"vote":"38",
			"content":"Python\\n-\\n\\n    def intersect(self, nums1, nums2):\\n        a, b = map(collections.Counter, (nums1, nums2))\\n        return list((a & b).elements())\\n\\nVariations:\\n\\n    def intersect(self, nums1, nums2):\\n        C = collections.Counter\\n        return list((C(nums1) & C(nums2)).elements())\\n        \\n    def intersect(self, nums1, nums2):\\n        return list((collections.Counter(nums1) & collections.Counter(nums2)).elements())\\n\\n---\\n\\nC++\\n-\\n\\n    vector<int> intersect(vector<int>& a, vector<int>& b) {\\n        sort(a.begin(), a.end());\\n        sort(b.begin(), b.end());\\n        a.erase(set_intersection(a.begin(), a.end(), b.begin(), b.end(), a.begin()), a.end());\\n        return a;\\n    }\\n\\nAnother:\\n\\n    vector<int> intersect(vector<int>& a, vector<int>& b) {\\n        unordered_map<int, int> ctr;\\n        for (int i : a)\\n            ctr[i]++;\\n        vector<int> out;\\n        for (int i : b)\\n            if (ctr[i]-- > 0)\\n                out.push_back(i);\\n        return out;\\n    }"
		},
		{
			"lc_ans_id":"82238",
			"view":"4736",
			"top":"5",
			"title":"4ms java solution",
			"vote":"20",
			"content":"            Arrays.sort(nums1);\\n            Arrays.sort(nums2);\\n            int pnt1 = 0;\\n            int pnt2 = 0;\\n            ArrayList<Integer> myList = new ArrayList<Integer>();\\n            while((pnt1 < nums1.length) &&(pnt2< nums2.length)){\\n                if(nums1[pnt1]<nums2[pnt2]){\\n                    pnt1++;\\n                }\\n                else{\\n                    if(nums1[pnt1]>nums2[pnt2]){\\n                        pnt2++;\\n                    }\\n                    else{\\n                        myList.add(nums1[pnt1]);\\n                        pnt1++;\\n                        pnt2++;\\n                    }\\n                }\\n            }\\n            int[] res = new int[myList.size()];\\n            for(int i = 0; i<res.length; i++){\\n                res[i] = (Integer)myList.get(i);\\n            }\\n            return res;"
		},
		{
			"lc_ans_id":"82373",
			"view":"1674",
			"top":"6",
			"title":"A dictionary based solution in python",
			"vote":"16",
			"content":"class Solution(object):\\n\\n    def intersect(self, nums1, nums2):\\n        \"\"\"\\n        :type nums1: List[int]\\n        :type nums2: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        dict1 = dict()\\n        for i in nums1:\\n            if i not in dict1:\\n                dict1[i] = 1\\n            else:\\n                dict1[i] += 1\\n        ret = []\\n        for i in nums2:\\n            if i in dict1 and dict1[i]>0:\\n                ret.append(i)\\n                dict1[i] -= 1\\n        return ret"
		},
		{
			"lc_ans_id":"82281",
			"view":"3458",
			"top":"7",
			"title":"Two C++ solutions: hashtable & sort+binary search. Time & space complexity analyzed.",
			"vote":"14",
			"content":"Let **m**=nums1.size(), and **n**=nums2.size()\\n\\n**Solution 1: hashtable** (using unordered_map).\\n\\n - time complexity: max(O(m), O(n))\\n - space complexity: choose one O(m) or O(n)   <--- So choose the\\n   smaller one if you can\\n\\n\\n----------\\n\\n\\n    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {\\n        if(nums1.size() > nums2.size()) return intersect(nums2, nums1);\\n        vector<int> ret;\\n        unordered_map<int,int> map1;\\n        for(int num:nums1) map1[num]++;\\n        for(int num:nums2) {\\n            if(map1.find(num)!=map1.end() && map1[num]>0) {\\n                ret.push_back(num);\\n                map1[num]--;\\n            }\\n        }\\n        return ret;\\n    }\\n\\n\\n**Solution 2: sort + binary search**\\n\\n - time complexity: max(O(mlgm), O(nlgn), **O(mlgn)**)  or max(O(mlgm),\\n   O(nlgn), **O(nlgm)**)\\n - O(mlgm) <-- sort first array\\n - O(nlgn) <--- sort second array\\n - O(mlgn) <--- for each element in nums1, do binary search in nums2\\n - O(nlgm) <--- for each element in nums2, do binary search in nums1\\n - space complexity: depends on the space complexity used in your\\n   sorting algorithm, bounded by max(O(m), O(n))\\n\\n----------\\n\\n    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {\\n        vector<int> ret;\\n        if(nums1.empty() || nums2.empty()) return ret;\\n        sort(nums1.begin(), nums1.end());\\n        sort(nums2.begin(), nums2.end());\\n        int j=0;\\n        for(int i=0; i<nums1.size(); ) {\\n            int index = lower_bound(nums2, nums1[i]);\\n            int count2 = 0;\\n            while(index<nums2.size() && nums2[index]==nums1[i]) {\\n                count2++; \\n                index++;\\n            }\\n            int count1 = 0;\\n            while(nums1[j]==nums1[i]) {\\n                count1++;\\n                j++;\\n            }\\n            ret.insert(ret.end(),min(count1,count2),nums1[i]);\\n            i=j;\\n        } \\n        return ret;\\n    }\\n\\n    int lower_bound(const vector<int>& nums, int target) {\\n        int l=0, r=nums.size()-1;\\n        while(l<r) {\\n            int m=l+(r-l)/2;\\n            if(nums[m]<target) {l=m+1;}\\n            else {r=m;}\\n        }\\n        return r;\\n    }\\n\\n\\n----------\\n\\nSo if two arrays are already sorted, and say m is much smaller than n, \\nwe should choose the algorithm that for each element \\nin nums1, do binary search in nums2, \\nso that the complexity is O(mlgn). \\nIn this case, if memory is limited and nums2 is stored \\nin disk, partition it and send portions of nums2 piece \\nby piece. keep a pointer for nums1 indicating the\\ncurrent position, and it should be working fine~"
		},
		{
			"lc_ans_id":"82247",
			"view":"995",
			"top":"8",
			"title":"Three Python Solutions",
			"vote":"11",
			"content":"**two pointers:**\\n\\n    class Solution(object):\\n        def intersect(self, nums1, nums2):\\n\\n            nums1, nums2 = sorted(nums1), sorted(nums2)\\n            pt1 = pt2 = 0\\n            res = []\\n\\n            while True:\\n                try:\\n                    if nums1[pt1] > nums2[pt2]:\\n                        pt2 += 1\\n                    elif nums1[pt1] < nums2[pt2]:\\n                        pt1 += 1\\n                    else:\\n                        res.append(nums1[pt1])\\n                        pt1 += 1\\n                        pt2 += 1\\n                except IndexError:\\n                    break\\n\\n            return res\\n\\n**use `dictionary` to count:**\\n\\n    class Solution(object):\\n        def intersect(self, nums1, nums2):\\n\\n            counts = {}\\n            res = []\\n\\n            for num in nums1:\\n                counts[num] = counts.get(num, 0) + 1\\n\\n            for num in nums2:\\n                if num in counts and counts[num] > 0:\\n                    res.append(num)\\n                    counts[num] -= 1\\n\\n            return res\\n\\n**use `Counter` to make it cleaner:**\\n\\n    class Solution(object):\\n        def intersect(self, nums1, nums2):\\n    \\n            counts = collections.Counter(nums1)\\n            res = []\\n\\n            for num in nums2:\\n                if counts[num] > 0:\\n                    res += num,\\n                    counts[num] -= 1\\n\\n            return res"
		},
		{
			"lc_ans_id":"82319",
			"view":"552",
			"top":"9",
			"title":"JavaScript solution with reduce and filter",
			"vote":"8",
			"content":"```javascript\\nvar intersect = function(nums1, nums2) {\\n    // track how often each number occurs in first list\\n    var store = nums1.reduce(function(map, n) {\\n        map[n] = (map[n] + 1) || 1;\\n        \\n        return map;\\n    }, {});\\n    \\n    // filter out numbers from second list based on\\n    // how often they occurred in the first list\\n    return nums2.filter(function(n) {\\n        if (store[n]) {\\n            store[n]--;\\n            \\n            return true;\\n        } else {\\n            return false;\\n        }\\n    });\\n};\\n```"
		}
	],
	"id":"350",
	"title":"Intersection of Two Arrays II",
	"content":"<p>\r\nGiven two arrays, write a function to compute their intersection.\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\nGiven <i>nums1</i> = <code>[1, 2, 2, 1]</code>, <i>nums2</i> = <code>[2, 2]</code>, return <code>[2, 2]</code>.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ul>\r\n<li>Each element in the result should appear as many times as it shows in both arrays.</li>\r\n<li>The result can be in any order.</li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Follow up:</b><br />\r\n<ul>\r\n<li>What if the given array is already sorted? How would you optimize your algorithm?</li>\r\n<li>What if <i>nums1</i>'s size is small compared to <i>nums2</i>'s size? Which algorithm is better?</li>\r\n<li>What if elements of <i>nums2</i> are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?</li>\r\n</ul>\r\n</p>",
	"frequency":"427",
	"ac_num":"91217"
}