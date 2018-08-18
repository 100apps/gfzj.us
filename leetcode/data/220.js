{
	"difficulty":"2",
	"submit_num":"335404",
	"show_id":"220",
	"leetcode_id":"220",
	"answers":[
		{
			"lc_ans_id":"61645",
			"view":"46749",
			"top":"0",
			"title":"AC O(N) solution in Java using buckets with explanation",
			"vote":"275",
			"content":"As a followup question, it naturally also requires maintaining a window of size k. When t == 0, it reduces to the previous question so we just reuse the solution.\\n\\nSince there is now a constraint on the range of the values of the elements to be considered duplicates, it reminds us of doing a range check which is implemented in tree data structure and would take O(LogN) if a balanced tree structure is used, or doing a bucket check which is constant time. We shall just discuss the idea using bucket here.\\n\\nBucketing means we map a range of values to the a bucket. For example, if the bucket size is 3, we consider 0, 1, 2 all map to the same bucket. However, if t == 3, (0, 3) is a considered duplicates but does not map to the same bucket. This is fine since we are checking the buckets immediately before and after as well. So, as a rule of thumb, just make sure the size of the bucket is reasonable such that elements having the same bucket is immediately considered duplicates or duplicates must lie within adjacent buckets. So this actually gives us a range of possible bucket size, i.e. t and t + 1. We just choose it to be t and a bucket mapping to be *num / t*.\\n\\nAnother complication is that negative ints are allowed. A simple *num / t* just shrinks everything towards 0. Therefore, we can just reposition every element to start from Integer.MIN_VALUE.\\n\\n     public class Solution {\\n        public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {\\n            if (k < 1 || t < 0) return false;\\n            Map<Long, Long> map = new HashMap<>();\\n            for (int i = 0; i < nums.length; i++) {\\n                long remappedNum = (long) nums[i] - Integer.MIN_VALUE;\\n                long bucket = remappedNum / ((long) t + 1);\\n                if (map.containsKey(bucket)\\n                        || (map.containsKey(bucket - 1) && remappedNum - map.get(bucket - 1) <= t)\\n                            || (map.containsKey(bucket + 1) && map.get(bucket + 1) - remappedNum <= t))\\n                                return true;\\n                if (map.entrySet().size() >= k) {\\n                    long lastBucket = ((long) nums[i - k] - Integer.MIN_VALUE) / ((long) t + 1);\\n                    map.remove(lastBucket);\\n                }\\n                map.put(bucket, remappedNum);\\n            }\\n            return false;\\n        }\\n    }\\n\\nEdits:\\n\\nActually, we can use t + 1 as the bucket size to get rid of the case when t == 0. It simplifies the code. The above code is therefore the updated version."
		},
		{
			"lc_ans_id":"61655",
			"view":"27492",
			"top":"1",
			"title":"Java O(N lg K) solution",
			"vote":"148",
			"content":"This problem requires to maintain a window of size k of the previous values that can be queried for value ranges. The best data structure to do that is Binary Search Tree. As a result maintaining the tree of size k will result in time complexity O(N lg K). In order to check if there exists any value of range abs(nums[i] - nums[j]) to simple queries can be executed both of time complexity O(lg K)\\n\\nHere is the whole solution using TreeMap.\\n\\n----------\\n\\n    public class Solution {\\n        public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {\\n            if (nums == null || nums.length == 0 || k <= 0) {\\n                return false;\\n            }\\n    \\n            final TreeSet<Integer> values = new TreeSet<>();\\n            for (int ind = 0; ind < nums.length; ind++) {\\n    \\n                final Integer floor = values.floor(nums[ind] + t);\\n                final Integer ceil = values.ceiling(nums[ind] - t);\\n                if ((floor != null && floor >= nums[ind])\\n                        || (ceil != null && ceil <= nums[ind])) {\\n                    return true;\\n                }\\n    \\n                values.add(nums[ind]);\\n                if (ind >= k) {\\n                    values.remove(nums[ind - k]);\\n                }\\n            }\\n    \\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"61639",
			"view":"18820",
			"top":"2",
			"title":"Java/Python one pass solution, O(n) time O(n) space using buckets",
			"vote":"138",
			"content":"The idea is like the bucket sort algorithm. Suppose we have consecutive buckets covering the range of nums with each bucket a width of (t+1). If there are two item with difference <= t, one of the two will happen:\\n\\n    (1) the two in the same bucket\\n    (2) the two in neighbor buckets\\n\\nFor detailed explanation see my blog [here](http://algobox.org/contains-duplicate-iii/)\\n\\n**Python**\\n\\n    def containsNearbyAlmostDuplicate(self, nums, k, t):\\n        if t < 0: return False\\n        n = len(nums)\\n        d = {}\\n        w = t + 1\\n        for i in xrange(n):\\n            m = nums[i] / w\\n            if m in d:\\n                return True\\n            if m - 1 in d and abs(nums[i] - d[m - 1]) < w:\\n                return True\\n            if m + 1 in d and abs(nums[i] - d[m + 1]) < w:\\n                return True\\n            d[m] = nums[i]\\n            if i >= k: del d[nums[i - k] / w]\\n        return False\\n\\n\\n    # 30 / 30 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 56 ms\\n    # 93.81%\\n\\n\\n**Java**\\n\\n    private long getID(long i, long w) {\\n        return i < 0 ? (i + 1) / w - 1 : i / w;\\n    }\\n\\n    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {\\n        if (t < 0) return false;\\n        Map<Long, Long> d = new HashMap<>();\\n        long w = (long)t + 1;\\n        for (int i = 0; i < nums.length; ++i) {\\n            long m = getID(nums[i], w);\\n            if (d.containsKey(m))\\n                return true;\\n            if (d.containsKey(m - 1) && Math.abs(nums[i] - d.get(m - 1)) < w)\\n                return true;\\n            if (d.containsKey(m + 1) && Math.abs(nums[i] - d.get(m + 1)) < w)\\n                return true;\\n            d.put(m, (long)nums[i]);\\n            if (i >= k) d.remove(getID(nums[i - k], w));\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"61641",
			"view":"17966",
			"top":"3",
			"title":"C++ using set (less 10 lines), with simple explanation.",
			"vote":"105",
			"content":"     bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {\\n        set<int> window; // set is ordered automatically \\n        for (int i = 0; i < nums.size(); i++) {\\n            if (i > k) window.erase(nums[i-k-1]); // keep the set contains nums i j at most k\\n            // |x - nums[i]| <= t  ==> -t <= x - nums[i] <= t;\\n            auto pos = window.lower_bound(nums[i] - t); // x-nums[i] >= -t ==> x >= nums[i]-t \\n            // x - nums[i] <= t ==> |x - nums[i]| <= t    \\n            if (pos != window.end() && *pos - nums[i] <= t) return true;\\n            window.insert(nums[i]);\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"61731",
			"view":"7048",
			"top":"4",
			"title":"O(n) Python using buckets with explanation, 10 lines.",
			"vote":"38",
			"content":"    def containsNearbyAlmostDuplicate(self, nums, k, t):\\n        # Bucket sort. Each bucket has size of t. For each number, the possible\\n        # candidate can only be in the same bucket or the two buckets besides.\\n        # Keep as many as k buckets to ensure that the difference is at most k.\\n        buckets = {}\\n        for i, v in enumerate(nums):\\n            # t == 0 is a special case where we only have to check the bucket\\n            # that v is in.\\n            bucketNum, offset = (v / t, 1) if t else (v, 0)\\n            for idx in xrange(bucketNum - offset, bucketNum + offset + 1):\\n                if idx in buckets and abs(buckets[idx] - nums[i]) <= t:\\n                    return True\\n\\n            buckets[bucketNum] = nums[i]\\n            if len(buckets) > k:\\n                # Remove the bucket which is too far away. Beware of zero t.\\n                del buckets[nums[i - k] / t if t else nums[i - k]]\\n\\n        return False"
		},
		{
			"lc_ans_id":"61764",
			"view":"5704",
			"top":"5",
			"title":"I finally got AC in C++",
			"vote":"27",
			"content":"Using a set container to keep the k+1-length array,which all elements are distinct.Before the container's size reached k+1, we just find the first element that is not less than [nums[i]-t] and judge the element's value whether it is less than [nums[i]+t]. Starting to move forward by erasing the head and adding element at the backend after the container's size reached k+1. The existence of the first element ,which is not less than [nums[i]-t]  and less than [nums[i]+t], is the prerequisite of existing other eligible elements.\\n\\n     bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t)\\n        {\\n        \\t\\tif (!k || t<0 || nums.size()<2)\\n            \\t\\treturn false;\\n            \\tset<int>record;                   \\n            \\tauto nLen = nums.size();\\n            \\tfor (int i = 0; i < nLen;++i)\\n            \\t{\\n            \\t\\tif (i>k)\\n            \\t\\t\\trecord.erase(nums[i - k - 1]);         \\n            \\t\\tset<int>::iterator lower = record.lower_bound(nums[i] - t);\\n            \\t\\tif (lower != record.end() && abs(nums[i] - *lower) <= t)\\n            \\t\\t\\treturn true;\\n            \\n            \\t\\trecord.insert(nums[i]);\\n            \\t}\\n            \\treturn false;\\n        }"
		},
		{
			"lc_ans_id":"61774",
			"view":"5240",
			"top":"6",
			"title":"Accept C++ Solution",
			"vote":"22",
			"content":"My idea is to preserve a sliding window containing nearest k numbers, and check if next number collides to the numbers in the window.\\n\\n    class Solution {\\n    public:\\n        bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {\\n            if (nums.size() < 2 || k == 0)\\n                return false;\\n            deque<int> windows_deq;\\n            multiset<long> windows;\\n            for (int i = 0; i < nums.size(); i++) {\\n                if (windows.size() > k) {\\n                    int num = windows_deq.front();\\n                    windows_deq.pop_front();\\n                    windows.erase(windows.find(num));\\n                }\\n                auto it = windows.lower_bound((long)nums[i] - (long)t);\\n                if (it == windows.end() || *it > (long)nums[i] + (long)t) {\\n                    // not found\\n                    windows_deq.push_back(nums[i]);\\n                    windows.insert(nums[i]);\\n                }\\n                else return true;\\n            }\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"61734",
			"view":"4049",
			"top":"7",
			"title":"AC Java solution without set or dictionary. Sort the nums and record the positions",
			"vote":"20",
			"content":"public class Solution {\\n\\n    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {\\n    \\tif(nums.length<2||k<1||t<0) return false;\\n    \\tValuePosPair[] valPosArr = new ValuePosPair[nums.length];\\n    \\tfor(int i =0;i<nums.length;i++) valPosArr[i] = new ValuePosPair(nums[i],i); \\n    \\tArrays.sort(valPosArr);\\t\\n    \\tfor(int i=0;i<valPosArr.length;i++){\\n    \\t\\tfor(int j=i+1;j<valPosArr.length&&((long)valPosArr[j].val-(long)valPosArr[i].val<=(long)t);j++){\\n    \\t\\t\\tif(Math.abs(valPosArr[j].pos-valPosArr[i].pos)<=k) return true;\\t\\n    \\t\\t}\\n    \\t}\\n    \\treturn false;\\n    }  \\n}\\n\\n    class ValuePosPair implements Comparable<ValuePosPair>{\\n    \\n    \\tint val;\\n    \\tint pos;\\n\\n    \\tValuePosPair(int v, int p) { val = v; pos = p;}\\n\\n    \\tpublic int compareTo(ValuePosPair x){\\n    \\t\\treturn this.val - x.val;\\n    \\t}\\t\\n    }"
		},
		{
			"lc_ans_id":"61756",
			"view":"2401",
			"top":"8",
			"title":"Python OrderedDict",
			"vote":"19",
			"content":"    class Solution:\\n\\n    def containsNearbyAlmostDuplicate(self, nums, k, t):\\n        if k < 1 or t < 0:\\n            return False\\n        dic = collections.OrderedDict()\\n        for n in nums:\\n            key = n if not t else n // t\\n            for m in (dic.get(key - 1), dic.get(key), dic.get(key + 1)):\\n                if m is not None and abs(n - m) <= t:\\n                    return True\\n            if len(dic) == k:\\n                dic.popitem(False)\\n            dic[key] = n\\n        return False"
		},
		{
			"lc_ans_id":"61666",
			"view":"3427",
			"top":"9",
			"title":"Short C++ solution",
			"vote":"15",
			"content":"    class Solution {\\n    public:\\n        bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {\\n            map<long long,int> M;\\n            int l=0;\\n            for (int r=0;r<nums.size();r++) {\\n                if (r-l>k && M[nums[l]]==l)\\n                    M.erase(nums[l++]);\\n                auto it=M.lower_bound(nums[r]-t);\\n                if (it!=M.end() && abs(it->first-nums[r])<=t)\\n                    return true;\\n                M[nums[r]]=r;\\n            }\\n            return false;\\n         }\\n    };"
		}
	],
	"id":"220",
	"title":"Contains Duplicate III",
	"content":"<p>\r\nGiven an array of integers, find out whether there are two distinct indices <i>i</i> and <i>j</i> in the array such that the <b>absolute</b> difference between <b>nums[i]</b> and <b>nums[j]</b> is at most <i>t</i> and the <b>absolute</b> difference between <i>i</i> and <i>j</i> is at most <i>k</i>.\r\n</p>",
	"frequency":"481",
	"ac_num":"63342"
}