{
	"difficulty":"2",
	"submit_num":"182450",
	"show_id":"347",
	"leetcode_id":"347",
	"answers":[
		{
			"lc_ans_id":"81602",
			"view":"56563",
			"top":"0",
			"title":"Java O(n) Solution - Bucket Sort",
			"vote":"215",
			"content":"Idea is simple. Build a array of list to be buckets with length 1 to sort.\\n\\n    public List<Integer> topKFrequent(int[] nums, int k) {\\n\\n\\t\\tList<Integer>[] bucket = new List[nums.length + 1];\\n\\t\\tMap<Integer, Integer> frequencyMap = new HashMap<Integer, Integer>();\\n\\n\\t\\tfor (int n : nums) {\\n\\t\\t\\tfrequencyMap.put(n, frequencyMap.getOrDefault(n, 0) + 1);\\n\\t\\t}\\n\\n\\t\\tfor (int key : frequencyMap.keySet()) {\\n\\t\\t\\tint frequency = frequencyMap.get(key);\\n\\t\\t\\tif (bucket[frequency] == null) {\\n\\t\\t\\t\\tbucket[frequency] = new ArrayList<>();\\n\\t\\t\\t}\\n\\t\\t\\tbucket[frequency].add(key);\\n\\t\\t}\\n\\n\\t\\tList<Integer> res = new ArrayList<>();\\n\\n\\t\\tfor (int pos = bucket.length - 1; pos >= 0 && res.size() < k; pos--) {\\n\\t\\t\\tif (bucket[pos] != null) {\\n\\t\\t\\t\\tres.addAll(bucket[pos]);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn res;\\n\\t}"
		},
		{
			"lc_ans_id":"81635",
			"view":"24082",
			"top":"1",
			"title":"3 Java Solution using Array, MaxHeap, TreeMap",
			"vote":"82",
			"content":"    // use an array to save numbers into different bucket whose index is the frequency\\n    public class Solution {\\n        public List<Integer> topKFrequent(int[] nums, int k) {\\n            Map<Integer, Integer> map = new HashMap<>();\\n            for(int n: nums){\\n                map.put(n, map.getOrDefault(n,0)+1);\\n            }\\n            \\n            // corner case: if there is only one number in nums, we need the bucket has index 1.\\n            List<Integer>[] bucket = new List[nums.length+1];\\n            for(int n:map.keySet()){\\n                int freq = map.get(n);\\n                if(bucket[freq]==null)\\n                    bucket[freq] = new LinkedList<>();\\n                bucket[freq].add(n);\\n            }\\n            \\n            List<Integer> res = new LinkedList<>();\\n            for(int i=bucket.length-1; i>0 && k>0; --i){\\n                if(bucket[i]!=null){\\n                    List<Integer> list = bucket[i]; \\n                    res.addAll(list);\\n                    k-= list.size();\\n                }\\n            }\\n            \\n            return res;\\n        }\\n    }\\n    \\n    \\n    \\n    // use maxHeap. Put entry into maxHeap so we can always poll a number with largest frequency\\n    public class Solution {\\n        public List<Integer> topKFrequent(int[] nums, int k) {\\n            Map<Integer, Integer> map = new HashMap<>();\\n            for(int n: nums){\\n                map.put(n, map.getOrDefault(n,0)+1);\\n            }\\n               \\n            PriorityQueue<Map.Entry<Integer, Integer>> maxHeap = \\n                             new PriorityQueue<>((a,b)->(b.getValue()-a.getValue()));\\n            for(Map.Entry<Integer,Integer> entry: map.entrySet()){\\n                maxHeap.add(entry);\\n            }\\n            \\n            List<Integer> res = new ArrayList<>();\\n            while(res.size()<k){\\n                Map.Entry<Integer, Integer> entry = maxHeap.poll();\\n                res.add(entry.getKey());\\n            }\\n            return res;\\n        }\\n    }\\n    \\n    \\n    \\n    // use treeMap. Use freqncy as the key so we can get all freqencies in order\\n    public class Solution {\\n        public List<Integer> topKFrequent(int[] nums, int k) {\\n            Map<Integer, Integer> map = new HashMap<>();\\n            for(int n: nums){\\n                map.put(n, map.getOrDefault(n,0)+1);\\n            }\\n            \\n            TreeMap<Integer, List<Integer>> freqMap = new TreeMap<>();\\n            for(int num : map.keySet()){\\n               int freq = map.get(num);\\n               if(!freqMap.containsKey(freq)){\\n                   freqMap.put(freq, new LinkedList<>());\\n               }\\n               freqMap.get(freq).add(num);\\n            }\\n            \\n            List<Integer> res = new ArrayList<>();\\n            while(res.size()<k){\\n                Map.Entry<Integer, List<Integer>> entry = freqMap.pollLastEntry();\\n                res.addAll(entry.getValue());\\n            }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"81624",
			"view":"17321",
			"top":"2",
			"title":"C++ O(n log(n-k)) unordered_map and priority_queue(maxheap) solution",
			"vote":"49",
			"content":"\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            unordered_map<int,int> map;\\n            for(int num : nums){\\n                map[num]++;\\n            }\\n            \\n            vector<int> res;\\n            // pair<first, second>: first is frequency,  second is number\\n            priority_queue<pair<int,int>> pq; \\n            for(auto it = map.begin(); it != map.end(); it++){\\n                pq.push(make_pair(it->second, it->first));\\n                if(pq.size() > (int)map.size() - k){\\n                    res.push_back(pq.top().second);\\n                    pq.pop();\\n                }\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81631",
			"view":"19317",
			"top":"3",
			"title":"3 ways to solve this problem",
			"vote":"44",
			"content":" using heap\\n\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\\n            unordered_map<int, int> cnt;\\n            for (auto num : nums) cnt[num]++;\\n            for (auto kv : cnt) {\\n                pq.push({kv.second, kv.first});\\n                while (pq.size() > k) pq.pop();\\n            }\\n            vector<int> res;\\n            while (!pq.empty()) {\\n                res.push_back(pq.top().second);\\n                pq.pop();\\n            }\\n            return res;\\n        }\\n    };\\n\\n\\nusing selection algorithm\\n\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            vector<int> res;\\n            if (!nums.size()) return res;\\n            unordered_map<int, int> cnt;\\n            for (auto num : nums) cnt[num]++;\\n            vector<pair<int, int>> num_with_cnt;\\n            for (auto kv : cnt) {\\n                num_with_cnt.push_back({kv.first, kv.second});\\n            }\\n            kselection(num_with_cnt, 0, num_with_cnt.size()-1, k);\\n            for (int i = 0; i < k && i < num_with_cnt.size(); ++i) {\\n                res.push_back(num_with_cnt[i].first);\\n            }\\n            return res;\\n        }\\n    \\n        void kselection(vector<pair<int, int>>& data, int start, int end, int k) {\\n    \\n            if (start >= end) return;\\n            auto pv = data[end];\\n            int i = start;\\n            int j = start;\\n            while (i < end) {\\n                if (data[i].second > pv.second) {\\n                    swap(data[i++], data[j++]);\\n                } else {\\n                    ++i;\\n                }\\n            }\\n            swap(data[j], data[end]);\\n            int num = j - start + 1;\\n            if (num == k) return;\\n            else if (num < k) {\\n                kselection(data, j + 1, end, k - num);\\n            } else {\\n                kselection(data, start, j - 1, k);\\n            }\\n        }\\n    };\\n\\n\\nusing bucket sort\\n\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            vector<int> res;\\n            if (!nums.size()) return res;\\n            unordered_map<int, int> cnt;\\n            for (auto num : nums) cnt[num]++;\\n            vector<vector<int>> bucket(nums.size() + 1);\\n            for (auto kv : cnt) {\\n                bucket[kv.second].push_back(kv.first);\\n            }\\n    \\n            for (int i = bucket.size() - 1; i >= 0; --i) {\\n                for (int j = 0; j < bucket[i].size(); ++j){\\n                    res.push_back(bucket[i][j]);\\n                    if (res.size() == k) return res;\\n                }\\n            }\\n    \\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81733",
			"view":"8456",
			"top":"4",
			"title":"*Java* straightforward O(N + (N-k)lg k) solution",
			"vote":"31",
			"content":"Idea is very straightforward:\\n\\n - build a counter map that maps a num to its frequency\\n - build a heap/priority queue that keeps track of `k` most significant entries\\n - iterate through the final heap and get the keys\\n\\nCode in Java:\\n\\n    public List<Integer> topKFrequent(int[] nums, int k) {\\n        Map<Integer, Integer> counterMap = new HashMap<>();\\n        for(int num : nums) {\\n            int count = counterMap.getOrDefault(num, 0);\\n            counterMap.put(num, count+1);\\n        }\\n        \\n        PriorityQueue<Map.Entry<Integer, Integer>> pq = new PriorityQueue<>((a, b) -> a.getValue()-b.getValue());\\n        for(Map.Entry<Integer, Integer> entry : counterMap.entrySet()) {\\n            pq.offer(entry);\\n            if(pq.size() > k) pq.poll();\\n        }\\n        \\n        List<Integer> res = new LinkedList<>();\\n        while(!pq.isEmpty()) {\\n            res.add(0, pq.poll().getKey());\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"81623",
			"view":"5495",
			"top":"5",
			"title":"Simple C++ solution using hash table and bucket sort",
			"vote":"28",
			"content":"    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            unordered_map<int, int> m;\\n            for (int num : nums)\\n                ++m[num];\\n            \\n            vector<vector<int>> buckets(nums.size() + 1); \\n            for (auto p : m)\\n                buckets[p.second].push_back(p.first);\\n            \\n            vector<int> ans;\\n            for (int i = buckets.size() - 1; i >= 0 && ans.size() < k; --i) {\\n                for (int num : buckets[i]) {\\n                    ans.push_back(num);\\n                    if (ans.size() == k)\\n                        break;\\n                }\\n            }\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81639",
			"view":"4973",
			"top":"6",
			"title":"1-line Python Solution using Counter with explanation",
			"vote":"21",
			"content":"    import collections\\n    \\n    class Solution(object):\\n        def topKFrequent(self, nums, k):\\n            \"\"\"\\n            :type nums: List[int]\\n            :type k: int\\n            :rtype: List[int]\\n            \"\"\"\\n            # Use Counter to extract the top k frequent elements\\n            # most_common(k) return a list of tuples, where the first item of the tuple is the element,\\n            # and the second item of the tuple is the count\\n            # Thus, the built-in zip function could be used to extract the first item from the tuples\\n            return zip(*collections.Counter(nums).most_common(k))[0]"
		},
		{
			"lc_ans_id":"81676",
			"view":"2159",
			"top":"7",
			"title":"C++ O(nlogk) and O(n) solutions",
			"vote":"14",
			"content":"Solution 1: Using a min heap. O(nlogk)\\n\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            unordered_map<int, int> counts;\\n            priority_queue<int, vector<int>, greater<int>> max_k;\\n            for(auto i : nums) ++counts[i];\\n            for(auto & i : counts) {\\n                max_k.push(i.second);\\n                // Size of the min heap is maintained at equal to or below k\\n                while(max_k.size() > k) max_k.pop();\\n            }\\n            vector<int> res;\\n            for(auto & i : counts) {\\n                if(i.second >= max_k.top()) res.push_back(i.first);\\n            }\\n            return res;\\n        }\\n    };\\n\\nSoution 2: Bucket sort. O(n)\\n\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            unordered_map<int, int> counts;\\n            for(auto i : nums) ++counts[i];\\n            \\n            vector<vector<int>> buckets(nums.size() + 1);\\n            for(auto & k : counts) \\n                buckets[k.second].push_back(k.first);\\n            reverse(begin(buckets), end(buckets));\\n            \\n            vector<int> res;\\n            for(auto & bucket: buckets) \\n                for(auto i : bucket) {\\n                    res.push_back(i);\\n                    if(res.size() == k) return res;\\n                }\\n            \\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81827",
			"view":"2100",
			"top":"8",
			"title":"O(n) 32ms Java Solution - Bucket Sort",
			"vote":"13",
			"content":"    public class Solution {\\n        public List<Integer> topKFrequent(int[] nums, int k) {\\n            int n = nums.length;\\n            HashMap<Integer, Integer> h = new HashMap();\\n            for (int i : nums)\\n                if (h.containsKey(i))\\n                    h.put(i, h.get(i) + 1);\\n                else\\n                    h.put(i, 1);\\n            \\n            List<Integer>[] fc = new ArrayList[n + 1];\\n            for (int i : h.keySet()) {\\n                int f = h.get(i);       //System.out.println(f + \" times of \" + i);\\n                if (fc[f] == null) fc[f] = new ArrayList();\\n                fc[f].add(i);\\n            }\\n            \\n            List<Integer> ans = new ArrayList();\\n            for (int i = n, j = 0; k > 0; k--) {\\n                for (; fc[i] == null || j == fc[i].size(); j = 0, i--);\\n                ans.add(fc[i].get(j++));\\n            }\\n            \\n            return ans;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"81707",
			"view":"1196",
			"top":"9",
			"title":"[Regards]  Summary Of 3 Concise C++ Implementations",
			"vote":"11",
			"content":"This problem's C++ solutions rely heavily on different data structure design.\\n\\n First let us check the max-heap (priority_queue) based solutions\\n\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            unordered_map<int,int> map;\\n            for(int num : nums){\\n                map[num]++;\\n            }\\n    \\n            vector<int> res;\\n            /** use the priority queue, like the max-heap , we will keep (size-k) smallest elements in the queue**/\\n            /** pair<first, second>: first is frequency,  second is number **/\\n            priority_queue<pair<int,int>> pq; \\n            for(auto it = map.begin(); it != map.end(); it++){\\n                pq.push(make_pair(it->second, it->first));\\n                /** onece the size bigger than size-k, we will pop the value, which is the top k frequent element value **/\\n                if(pq.size() > (int)map.size() - k){\\n                    res.push_back(pq.top().second);\\n                    pq.pop();\\n                }\\n            }\\n            return res;\\n        }\\n    };\\n\\n Now let us check the frequency-based array method solutions\\n\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            unordered_map<int, int> m;\\n            for (int  num : nums)\\n                ++m[num];\\n            /** as the word frequencies is at most nums.size() **/\\n            vector<vector<int>> buckets(nums.size() + 1);\\n            for (auto p : m) \\n                buckets[p.second].push_back(p.first);\\n            /** we can fetch the top k largest element value from the array **/    \\n            vector<int> ans;\\n            for (int i = buckets.size() - 1; i >= 0 && ans.size() < k; --i)\\n            {\\n                for (int num : buckets[i])\\n                {\\n                    ans.push_back(num);\\n                    if (ans.size() == k)\\n                        break;\\n                }\\n            }\\n            return ans;\\n        }\\n    };\\n\\nThe third solution is based on the C++ API : nth_element() to resort the array to left half and right half.\\n\\n\\n\\n    class Solution {\\n    public:\\n        vector<int> topKFrequent(vector<int>& nums, int k) {\\n            unordered_map<int, int> counts;\\n            for (const auto& i : nums) \\n            {\\n                ++ counts[i];\\n            }\\n            /** pair : (-frequency, key) **/\\n            vector<pair<int, int>> p;\\n            for (auto it = counts.begin(); it != counts.end(); ++ it) \\n            {\\n                p.emplace_back(-(it->second), it->first);\\n            }\\n            /** nth_element() call will put the  (k-1)-th element on its position,\\n             * the left (k-1) element is smaller than the key, the right bigger **/\\n            nth_element(p.begin(), p.begin() + k - 1, p.end());\\n            vector<int> result;\\n            for (int i = 0; i < k; i++) \\n            {\\n                result.emplace_back(p[i].second);\\n            }\\n            return result;\\n        }\\n    };"
		}
	],
	"id":"347",
	"title":"Top K Frequent Elements",
	"content":"<p>\r\nGiven a non-empty array of integers, return the <b><i>k</i></b> most frequent elements.</p>\r\n\r\n<p>For example,<br>\r\nGiven <code>[1,1,1,2,2,3]</code> and k = 2, return <code>[1,2]</code>.\r\n</p>\r\n\r\n<p><b>Note: </b><br>\r\n<ul>\r\n<li>You may assume <i>k</i> is always valid, 1 &le; <i>k</i> &le; number of unique elements.</li>\r\n<li>Your algorithm's time complexity <b>must be</b> better than O(<i>n</i> log <i>n</i>), where <i>n</i> is the array's size.</li>\r\n</ul></p>",
	"frequency":"489",
	"ac_num":"90043"
}