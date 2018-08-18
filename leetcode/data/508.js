{
	"difficulty":"2",
	"submit_num":"122021",
	"show_id":"523",
	"leetcode_id":"523",
	"answers":[
		{
			"lc_ans_id":"99499",
			"view":"27899",
			"top":"0",
			"title":"Java O(n) time O(k) space",
			"vote":"156",
			"content":"We iterate through the input array exactly once, keeping track of the running sum mod k of the elements in the process. If we find that a running sum value at index j has been previously seen before in some earlier index i in the array, then we know that the sub-array (i,j] contains a desired sum.\\n\\n```\\npublic boolean checkSubarraySum(int[] nums, int k) {\\n    Map<Integer, Integer> map = new HashMap<Integer, Integer>(){{put(0,-1);}};;\\n    int runningSum = 0;\\n    for (int i=0;i<nums.length;i++) {\\n        runningSum += nums[i];\\n        if (k != 0) runningSum %= k; \\n        Integer prev = map.get(runningSum);\\n        if (prev != null) {\\n            if (i - prev > 1) return true;\\n        }\\n        else map.put(runningSum, i);\\n    }\\n    return false;\\n}\\n```"
		},
		{
			"lc_ans_id":"99503",
			"view":"6610",
			"top":"1",
			"title":"Need to pay attention to a lot of corner cases...",
			"vote":"18",
			"content":"This problem contributed a lot of bugs to my contest score... Let's read the description again, pay attention to ```red``` sections:\\n\\nGiven a list of ```non-negative``` numbers and a target integer k, write a function to check if the array has a ```continuous subarray``` of size ```at least 2``` that sums up to the ```multiple``` of k, that is, sums up to n*k where n is also an ```integer```.\\n\\nSome ```damn it!``` test cases:\\n1. [0], 0 -> false;\\n2. [5, 2, 4], 5 -> false;\\n3. [0, 0], 100 -> true;\\n4. [1,5], -6 -> true;\\netc...\\n```\\npublic class Solution {\\n    public boolean checkSubarraySum(int[] nums, int k) {\\n        // Since the size of subarray is at least 2.\\n        if (nums.length <= 1) return false;\\n        // Two continuous \"0\" will form a subarray which has sum = 0. 0 * k == 0 will always be true.\\n        for (int i = 0; i < nums.length - 1; i++) {\\n            if (nums[i] == 0 && nums[i + 1] == 0) return true;\\n        }\\n\\n        // At this point, k can't be \"0\" any longer.\\n        if (k == 0) return false;\\n        // Let's only check positive k. Because if there is a n makes n * k = sum, it is always true -n * -k = sum.\\n        if (k < 0) k = -k;\\n\\n        Map<Integer, Integer> sumToIndex = new HashMap<>();\\n        int sum = 0;\\n        sumToIndex.put(0, -1);\\n\\n        for (int i = 0; i < nums.length; i++) {\\n            sum += nums[i];\\n            // Validate from the biggest possible n * k to k\\n            for (int j = (sum / k) * k; j >= k; j -= k) {\\n                if (sumToIndex.containsKey(sum - j) && (i - sumToIndex.get(sum - j) > 1)) return true;\\n            }\\n            if (!sumToIndex.containsKey(sum)) sumToIndex.put(sum, i);\\n        }\\n\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99506",
			"view":"4993",
			"top":"2",
			"title":"Concise C++ solution, use set instead of map",
			"vote":"16",
			"content":"There is really no need to use map, the required length is at least 2, so we just need to insert the mod one iteration later.\\n```\\nclass Solution {\\npublic:\\n    bool checkSubarraySum(vector<int>& nums, int k) {\\n        int n = nums.size(), sum = 0, pre = 0;\\n        unordered_set<int> modk;\\n        for (int i = 0; i < n; ++i) {\\n            sum += nums[i];\\n            int mod = k == 0 ? sum : sum % k;\\n            if (modk.count(mod)) return true;\\n            modk.insert(pre);\\n            pre = mod;\\n        }\\n        return false;\\n    }\\n};"
		},
		{
			"lc_ans_id":"99545",
			"view":"1150",
			"top":"3",
			"title":"Share my O(n) C++ accumulation-modulo solution with thinking process and explanation",
			"vote":"10",
			"content":"---\\n## 1. Problem\\n\\n---\\nGiven a list of **non-negative** numbers and a target **integer** k, write a function to check if the array has a continuous subarray of size **at least 2** that sums up to the multiple of **k**, that is, sums up to n*k where n is also an **integer**\\n\\n---\\n## 2. Thinking process\\n\\n---\\n#### 2.1 Calculate the summation of a continuous subarray\\n\\n---\\nAs we know **the summation of series**\\n\\n>#### **S(n) = a(1) + a(2) + ... + a(n), n \\u2265 1**\\n\\nwhich has a **recursion formula**\\n\\n>#### **S(n) = a(1), n = 1**\\n>#### **S(n) = a(n) + S(n - 1), n > 1**\\n\\nSuppose **the summation** of a **subarray** from **a(i)** to **a(j)** is\\n\\n>#### **T(i, j) = a(i) + a(i + 1) + ... + a(j - 1) + a(j), 1\\u2264 i < j \\u2264 n.**\\n\\nIt can be inferred that \\n\\n>#### **T(i, j) = S(j), i = 1.**\\n>#### **T(i, j) = S(j) - S(i - 1), i > 1.**\\n\\n---\\n#### 2.2 Define the multiple of k (k \\u2260 0) by modulo\\n\\n---\\nThe problem is to find a continuous subarray of size **at least 2** that sums up to the multiple of **k**, which means\\n\\n>#### **T(i, j) = n \\xd7 k, 1\\u2264 i < j \\u2264 n.**\\n\\nThat is to say\\n\\n>#### **S(j) = n \\xd7 k , 1 = i < j.**\\n>#### **S(j) - S(i - 1) = n \\xd7 k, 1 < i < j.**\\n\\nBy doing the modulo, we get\\n\\n>#### **S(j) \\u2261 0 mod k , 1 = i < j.**\\n>#### **S(j) \\u2261 S(i - 1) mod k, 1 < i < j.**\\n\\n---\\n## 3. Algorithm\\n\\n---\\n#### 3.1. Special cases\\n\\n---\\n**A. The size of array < 2**\\n\\n- Since the size of subarray is **at least 2**, **return false**.\\n\\n---\\n**B. k = 0**\\n\\n>#### **T(i, j) = a(i) + a(i + 1) + ... + a(j - 1) + a(j) = 0.**\\n\\nAs the array only contains **non-negative** numbers, that is to say\\n\\n>#### **a(i) = a(i + 1) = ... = a(j - 1) = a(j) = 0.**\\n\\nSince the size of subarray is **at least 2**, \\n\\n- if there are **2 adjacent zeros** in the array, **return true.**\\n\\n- **If not, return false.**\\n\\n---\\n#### 3.2 Normal situation\\n---\\n**Step 1:  Summation**\\n\\n---\\n\\nDo iteration by using the recursion formula\\n\\n>#### **S(n) = a(1), n = 1**\\n>#### **S(n) = a(n) + S(n - 1), n > 1.**\\n\\n---\\n**Step 2: Modulo operation**\\n\\n---\\nThere are **2 situations**:\\n\\n>#### **S(j) \\u2261 0 mod k , 1 = i < j.**\\n\\n>#### **S(j) \\u2261 S(i - 1) mod k, 1 < i < j.**\\n\\nWhen **doing iteration from j = 1 to j = n**, we need to judge\\n\\n**A. When j > 1 and S(j) \\u2261 0 mod k, return true.**\\n\\n**B. Use a hash table (the key is S(i) mod k) to record THE FIRST i. If a same key appears twice (means S(j) \\u2261 S(i) mod k) and j - i > 1, return true.**\\n\\n(At first I didn't notice that the size is **at least 2**, thanks to @BavariaKing1822 )\\n\\n**C. After the iteration, return false.**\\n\\n---\\n## 4. Complexity analysis\\n\\n---\\n#### 4.1 Time complexity\\n\\n---\\nAs **Step 1 and Step 2** in **Section 3** can be merged to **a single iteration from j = 1 to j = n**.\\n\\n> #### **The time complexity is O(n)**.\\n\\n---\\n#### 4.2 Space complexity\\n\\n---\\nAs the **hash table's key** is **a remainder from division based on integer k**, the **probable maximum size** of the hash table is **|k|**.\\n\\n>#### **The space complexity is O(|k|)**.\\n\\n---\\n## 5. Code\\n\\n---\\n```\\nclass Solution {\\npublic:\\n    bool checkSubarraySum(vector<int>& nums, int k) {\\n        if(nums.size() < 2) return false;\\n        if(k == 0)\\n        {\\n            for(int i = 1; i < nums.size(); i++)\\n            {\\n                if(nums[i] == 0 && nums[i - 1] == 0) return true;\\n            }\\n            return false;\\n        }else{\\n            int i = 0;\\n            map<int, int> res;\\n            while(true)\\n            {\\n                if(i != 0 && nums[i] % k == 0)\\n                {\\n                    return true;\\n                }else{\\n                    if(res.find(nums[i] % k) == res.end())\\n                    { \\n                         res[nums[i] % k] = i;\\n                    }else{\\n                         if(i - res[nums[i] % k] > 1) return true;\\n                    }\\n                }\\n                i++;\\n                if(i == nums.size()) return false;\\n                nums[i] += nums[i - 1];\\n            }\\n        }\\n    }\\n};\\n```\\n---"
		},
		{
			"lc_ans_id":"99512",
			"view":"5051",
			"top":"4",
			"title":"Python with explanation.  62ms  Time O(min(n, k)) mostly",
			"vote":"10",
			"content":"- ```if k == 0```  \\n   If there are two continuous zeros in ```nums```, return ```True```\\n   ###### Time O(n).\\n- ```if n >= 2k and k > 0```\\n      There will be at least three numbers in ```sum``` with the same remainder divided by ```k```. So I can return True without any extra calculation.\\n     ###### Time O(1).\\n- ```if n < 2k and k > 0```\\n     If I can find two numbers in ```sum``` with the same remainder divided by ```k``` and the distance of them is greater than or equal to 2\\uff0c return ```True```.\\n   ###### Time O(n) <= O(k).\\n- ```k < 0```\\nsame as ```k > 0```.\\n\\n```\\nclass Solution(object):\\n    def checkSubarraySum(self, nums, k):\\n\\n        \\n        if k == 0:\\n            # if two continuous zeros in nums, return True\\n            # time O(n)\\n            for i in range(0, len(nums) - 1):\\n                if nums[i] == 0 and nums[i+1] == 0:\\n                    return True\\n            return False\\n        \\n        k = abs(k)\\n        if len(nums) >= k * 2:\\n            return True\\n        \\n        #if n >= 2k: return True\\n        #if n < 2k:  time O(n) is O(k)  \\n\\n        sum = [0]\\n        for x in nums:\\n            sum.append((sum[-1] + x) % k)\\n        \\n        Dict = {}\\n        for i in range(0, len(sum)):\\n            if Dict.has_key(sum[i]):\\n                if i - Dict[sum[i]] > 1:\\n                    return True\\n            else:\\n                Dict[sum[i]] = i\\n        \\n        return False\\n```"
		},
		{
			"lc_ans_id":"99518",
			"view":"3714",
			"top":"5",
			"title":"Not smart solution, but easy to understand",
			"vote":"8",
			"content":"```\\npublic class Solution {\\n    public boolean checkSubarraySum(int[] nums, int k) {\\n        if (nums == null || nums.length == 0)   return false;\\n        \\n        int[] preSum = new int[nums.length+1];\\n        \\n        for (int i = 1; i <= nums.length; i++) {\\n            preSum[i] = preSum[i-1] + nums[i-1];\\n        }\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            for (int j = i+2; j <= nums.length; j++) {\\n                if (k == 0) {\\n                    if (preSum[j] - preSum[i] == 0) {\\n                        return true;\\n                    }\\n                } else if ((preSum[j] - preSum[i]) % k == 0) {\\n                    return true;\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99575",
			"view":"1274",
			"top":"6",
			"title":"Python Simple (Prefix sum)",
			"vote":"7",
			"content":"Since we are interested in quantities of the form A[L] + A[L+1] + ... + A[R], let's use a standard technique of keeping a prefix sum P[i] = sum(A[:i]), so that we can quickly query A[L] + A[L+1] + ... + A[R] = P[R+1] - P[L].\\n\\nNow, we would like to know if P[R+1] - P[L] = 0 (mod k) is solvable with 0 <= L < R < len(A).  This means: For any 0 <= L < len(A), we would like to know if there is some L + 2 <= X < len(A) with P[X] = P[L].  \\n\\nThis can be solved in linear time: at decreasing time i, we've now seen in total all elements in P[i+2:], and we want to know if P[i] is something we've seen before.  If we have, then indeed P[i] = P[j] for j >= i + 2 as desired.\\n\\nOf course, there is the pesky \"mod k\" part.  When k is zero, the modulus should be ignored, otherwise we should consider values of P modulo abs(k).\\n```\\ndef checkSubarraySum(self, A, k):\\n    P = [0] #P[i] = sum(A[:i]), mod abs(k) if k != 0\\n    for x in A:\\n        v = P[-1] + x\\n        if k: v %= abs(k)\\n        P.append(v)\\n    \\n    seen = set()\\n    for i in xrange(len(P) - 3, -1, -1):\\n        seen.add(P[i+2])\\n        if P[i] in seen:\\n            return True\\n    return False\\n```"
		},
		{
			"lc_ans_id":"99511",
			"view":"216",
			"top":"7",
			"title":"My CPP solution using unordered_map, O(n) time and O(k) space",
			"vote":"4",
			"content":"```\\nclass Solution {\\npublic:\\n    bool checkSubarraySum(vector<int>& nums, int k) {\\n        if (nums.size() < 2) return false;\\n        if (k == 0) k = INT_MAX;\\n        int sum = 0;\\n        unordered_map<int, int> map;\\n        map[0] = -1;\\n        for (int i = 0; i < nums.size(); i++) {\\n            sum += nums[i];\\n            if (map.find(sum % k) == map.end()) {\\n                map[sum % k] = i;\\n            } else {\\n                if (i - map[sum % k] > 1) {\\n                    return true;\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99566",
			"view":"374",
			"top":"8",
			"title":"Simple Python (10 lines) with Explanation 58ms O(n) time - O(k) space",
			"vote":"4",
			"content":"1. If `k == 0`, then search for any consecutive pair of 0s.\\n2. Else, we will keep track of indices of the cumulative sum (or prefix sum) mod by k in a dictionary. We will return True if we've seen a `cumulative sum % k` at least 2 indices before.\\n* This means that there is a subarray that has a `sum(subarray) % k == 0` and that subarray contains at least 2 elements.\\n\\n```\\nclass Solution(object):\\n    def checkSubarraySum(self, nums, k):\\n        if k == 0:\\n            return any(nums[i] == 0 and nums[i + 1] == 0 for i in xrange(len(nums) - 1))\\n        mods, cum_sum_mod_k = {0: -1}, 0\\n        for i, n in enumerate(nums):\\n            cum_sum_mod_k = (cum_sum_mod_k + n) % k\\n            if cum_sum_mod_k in mods and i - mods[cum_sum_mod_k] > 1:\\n                return True\\n            if cum_sum_mod_k not in mods:\\n                mods[cum_sum_mod_k] = i\\n        return False\\n```"
		},
		{
			"lc_ans_id":"99516",
			"view":"521",
			"top":"9",
			"title":"Python 89ms O(n) time",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def checkSubarraySum(self, nums, k):\\n        a = set([0, nums[0]])\\n        for i in xrange(1, len(nums)):\\n            nums[i] += nums[i - 1]\\n            if nums[i] == k == 0 or k and nums[i] % k in a:\\n                return True\\n            k and a.add(nums[i] % k)\\n        return False\\n```"
		}
	],
	"id":"508",
	"title":"Continuous Subarray Sum",
	"content":"<p>\r\nGiven a list of <b>non-negative</b> numbers and a target <b>integer</b> k, write a function to check if the array has a continuous subarray of size at least 2 that sums up to the multiple of <b>k</b>, that is, sums up to n*k where n is also an <b>integer</b>.\r\n</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [23, 2, 4, 6, 7],  k=6\r\n<b>Output:</b> True\r\n<b>Explanation:</b> Because [2, 4] is a continuous subarray of size 2 and sums up to 6.\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [23, 2, 6, 4, 7],  k=6\r\n<b>Output:</b> True\r\n<b>Explanation:</b> Because [23, 2, 6, 4, 7] is an continuous subarray of size 5 and sums up to 42.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of the array won't exceed 10,000.</li>\r\n<li>You may assume the sum of all the numbers is in the range of a signed 32-bit integer.</li>\r\n</ol>\r\n</p>",
	"frequency":"112",
	"ac_num":"28484"
}