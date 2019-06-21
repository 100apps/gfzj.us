{
	"difficulty":"3",
	"submit_num":"51479",
	"show_id":"410",
	"leetcode_id":"410",
	"answers":[
		{
			"lc_ans_id":"89817",
			"view":"23237",
			"top":"0",
			"title":"Clear Explanation: 8ms Binary Search Java",
			"vote":"123",
			"content":"1. The answer is between maximum value of input array numbers and sum of those numbers.\\n2. Use binary search to approach the correct answer. We have ``` l = max number of array; r = sum of all numbers in the array;```Every time we do ```mid = (l + r) / 2;```\\n3. Use greedy to narrow down left and right boundaries in binary search.\\n    3.1 Cut the array from left.\\n    3.2 Try our best to make sure that the sum of numbers between each two cuts (inclusive) is large enough but still less than ```mid```.\\n   3.3 We'll end up with two results: either we can divide the array into more than m subarrays or we cannot.\\n         **If we can**, it means that the ```mid ``` value we pick is too small because we've already tried our best to make sure each part holds as many non-negative numbers as we can but we still have numbers left. So, it is impossible to cut the array into m parts and make sure each parts is no larger than ```mid```. We should increase m. This leads to ```l = mid + 1;```\\n        **If we can't**, it is either we successfully divide the array into m parts and the sum of each part is less than ```mid```, or we used up all numbers before we reach m. Both of them mean that we should lower ```mid``` because we need to find the minimum one. This leads to ```r = mid - 1;```\\n```\\npublic class Solution {\\n    public int splitArray(int[] nums, int m) {\\n        int max = 0; long sum = 0;\\n        for (int num : nums) {\\n            max = Math.max(num, max);\\n            sum += num;\\n        }\\n        if (m == 1) return (int)sum;\\n        //binary search\\n        long l = max; long r = sum;\\n        while (l <= r) {\\n            long mid = (l + r)/ 2;\\n            if (valid(mid, nums, m)) {\\n                r = mid - 1;\\n            } else {\\n                l = mid + 1;\\n            }\\n        }\\n        return (int)l;\\n    }\\n    public boolean valid(long target, int[] nums, int m) {\\n        int count = 1;\\n        long total = 0;\\n        for(int num : nums) {\\n            total += num;\\n            if (total > target) {\\n                total = num;\\n                count++;\\n                if (count > m) {\\n                    return false;\\n                }\\n            }\\n        }\\n        return true;\\n    }\\n}\\n```\\n* list item"
		},
		{
			"lc_ans_id":"89819",
			"view":"8611",
			"top":"1",
			"title":"[C++ / Fast / Very clear explanation / Clean Code] Solution with Greedy Algorithm and Binary Search",
			"vote":"89",
			"content":"First thing first, below is the code:\\n```\\nclass Solution {\\nprivate:\\n    bool doable (const vector<int>& nums, int cuts, long long max) {\\n        int acc = 0;\\n        for (num : nums) {\\n            // This step is unnecessary for this problem. I didn't discard this line because I want doable function more generalized.\\n            if (num > max) return false;\\n            else if (acc + num <= max) acc += num;\\n            else {\\n                --cuts;\\n                acc = num;\\n                if (cuts < 0) return false;\\n            }\\n        }\\n        return true;\\n    }\\n    \\npublic:\\n    int splitArray(vector<int>& nums, int m) {\\n        long long left = 0, right = 0;\\n        for (num : nums) {\\n            left = max(left, (long long)num);\\n            right += num;\\n        }\\n        \\n        while (left < right) {\\n            long long mid = left + (right - left) / 2;\\n            if (doable(nums, m - 1, mid)) right = mid;\\n            else left = mid + 1;\\n        }\\n        return left;\\n    }\\n};\\n```\\n---------------\\nIntroduction to this problem:\\n---------------\\n\\nWe can break this problem into two smaller problems:\\n* Given an array (*A*), number of cuts (*CUTS*), and the **Largest sum of sub-arrays** (*MAX*). **Can you use at most *CUTS* cuts to segment array *A* into *CUTS + 1* sub-arrays, such that the sum of each sub-array is smaller or equal to *MAX***?\\n* Given a lower bound (*left*), an upper bound (*right*), an unknown bool array (*B*), and an API uses *i* as input and tells you whether *B[i]* is true. If we know there exists an index *k*, **that *B[i]* is false when i < k, and *B[i]* is true when i >= k**. What is the fastest way to **find this *k* (the lower bound)?**\\n-------------\\nSolution to the first sub-problem (Skip this part if you already knew how to solve 1st sub-problem):\\n-------------\\nFor the first question, we can follow these steps:\\n* For each element in the array, if its value is larger than *MAX*, we know it's not possible to cut this array into groups that the sum of all groups are smaller than *MAX*. (Reason is straightforward, if *A* is [10, 2, 3, 5] and *MAX* is 6, even you have 3 cuts by which you can cut *A* as [[10], [2], [3], [5]], the group containing 10 will still be larger than 6).\\n* Use **greedy algorithm** to cut *A*. Use an **accumulator *ACC*** to store the sum of the currently processed group, and process elements in *A* one by one. For each element *num*, if we add *num* with *ACC* and the new sum is still no larger than *MAX*, we **update *ACC* to *ACC + num***, which means we can **merge *num* into the current group**. If not, we must **use a cut before *num* to segment this array**, then *num* will be the first element in the new group.\\n* If we **didn't go through *A* but already used up all cuts**, then it's not possible only using *CUTS* cuts to segment this array into groups to make sure **sum of each sub-array** is smaller than *MAX*. Otherwise, if we can reach the end of *A* with cuts left (or use exactly *CUTS* cuts). It's possible to do so.\\n\\nThen the first question is solved.\\n\\nSolution to the second sub-problem(Skip this part if you already knew how to solve 2nd sub-problem):\\n-------------\\n* The array *B* will be something like [false, false, ..., false, true, true, ..., true]. We want to find **the index of the first true**.\\n* Use **binary search** to find this *k*. Keep a value *mid*, **mid = (left + right) / 2**. If B[mid] = false, then move the search range to the upper half of the original search range, a.k.a **left = mid + 1**, otherwise move search range to the lower half, a.k.a **right = mid**. \\n--------------\\nWhy this algorithm is correct...\\n--------------\\n* No matter how we cut the array *A*, the **Largest sum of sub-arrays** will fall into a range [left, right]. ***Left* is the value of the largest element in this array. *right* is the sum of this array.** (e.g., Given array [1, 2, 3, 4, 5], if we have 4 cuts and cut it as [[1], [2], [3], [4], [5]], the **Largest sum of sub-arrays** is 5, it cannot be smaller. And if we have 0 cut, and the only sub-array is [[1, 2, 3, 4, 5]], the **Largest sum of sub-arrays** is 15, it cannot be larger).\\n* However, we cannot decide the number of cuts (*CUTS*), this is an given constraint. But we know there must be a magic number *k*, which is the smallest value of the **Largest sum of sub-arrays** when given *CUTS* cuts. When the **Largest sum of sub-arrays** is larger than *k*, we can always find a way to cut *A* within *CUTS* cuts. When the **Largest sum of sub-arrays** is smaller than *k*, there is no way to do this.\\n\\nExample\\n------\\nFor example, given array *A* **[1, 2, 3, 4, 5]**. We can use **2** cuts.\\n* No matter how many cuts are allowed, the range of the possible value of the **Largest sum of sub-arrays** is [5, 15].\\n* When given 2 cuts, we can tell the magic number *k* here is 6, the result of segmentation is [[1, 2, 3], [4], [5]].\\n* When **Largest sum of sub-arrays** is in range [6, 15], we can always find a way to cut this array within two cuts. You can have a try.\\n* However, when **Largest sum of sub-arrays** is in range [5, 5], there is no way to do this.\\n* This mapped this problem into the second sub-problem. Bool array *B* here is [5:false, 6:true, 7:true, 8:true, ..., 15:true]. We want to find the **index *i* of the first true in *B*, which is the answer of this entire question**, and by solving the first sub-problem, we have an API that can tell us **given an *i* (*Largest sum of sub-arrays*), whether *B[i]* is true (whether we can find a way to cut *A* to satisfy the constraint)**.\\n\\n**Below is the code with comment, just in case you don't have time to read the explanations above.**\\n```\\nclass Solution {\\nprivate:\\n    /* \\n        Params:\\n            nums - The input array; \\n            cuts - How many cuts are available (cuts = #groups - 1); \\n            max - The maximum of the (sum of elements in one group);\\n        Rtn:\\n            Whether we can use at most 'cuts' number of cuts to segment the entire array, \\n            such that the sum of each group will not exceed 'max'.\\n     */\\n    bool doable (const vector<int>& nums, int cuts, long long max) {\\n        \\n        // 'acc' is the temporary accumulator for the currently processed group.\\n        \\n        int acc = 0;\\n        for (num : nums) {\\n            \\n            // If the current processed element in this array is larger than 'max', we cannot segment the array.\\n            // (Reason is straightforward, if 'nums' is [10, 2, 3, 5] and 'max' is 6, even you can have 3 cuts\\n            // (by which you can cut array as [[10], [2], [3], [5]]), the group containing 10 will be larger than 6, \\n            //  there is no way to do this).\\n            // Ps: This step is unnecessary in this solution. Because 'left' in the splitArray() function can assure \\n            // 'max' will be larger than every single element. I just want to write a generalized doable() function :)\\n            \\n            if (num > max) return false;\\n            \\n            // If the (sum of the currently processed group) + (current element) is smaller than max, we can add current \\n            // element into this group.\\n            \\n            else if (acc + num <= max) acc += num;\\n            \\n            // If not, we will make a cut before this element, and this element will be the first element in the new group.\\n            \\n            else {\\n                --cuts;\\n                acc = num;\\n                \\n                // If we've used up all cuts, this means this 'max' is not doable.\\n                if (cuts < 0) return false;\\n            }\\n        }\\n        \\n        // If we can reach here, this means we've used at most 'cuts' cut to segment the array, and the sum of each groups is\\n        // not larger than 'max'. Yeah!\\n        return true;\\n    }\\n    \\npublic:\\n    int splitArray(vector<int>& nums, int m) {\\n        // Use long long to avoid overflow.\\n        long long left = 0, right = 0;\\n        // The smallest possible value ('left') is the the value of the largest element in this array.\\n        // The largest possible value ('right') is the sum of all elements in this array.\\n        for (num : nums) {\\n            left = max(left, (long long)num);\\n            right += num;\\n        }\\n        \\n        // Use binary search, find the lower bound of the possible (minimum sum of groups within m - 1 cuts).\\n        while (left < right) {\\n            long long mid = left + (right - left) / 2;\\n            if (doable(nums, m - 1, mid)) right = mid;\\n            else left = mid + 1;\\n        }\\n        return left;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"89835",
			"view":"7559",
			"top":"2",
			"title":"Java easy binary search solution 8ms",
			"vote":"30",
			"content":"1. Given a result, it is easy to test whether it is valid or not.\\n2. The max of the result is the sum of the input nums.\\n3. The min of the result is the max num of the input nums.\\nGiven the 3 conditions above we can do a binary search. (need to deal with overflow) \\n```\\npublic class Solution {\\n    public int splitArray(int[] nums, int m) {\\n        long sum = 0;\\n        int max = 0;\\n        for(int num: nums){\\n            max = Math.max(max, num);\\n            sum += num;\\n        }\\n        return (int)binary(nums, m, sum, max);\\n    }\\n    \\n    private long binary(int[] nums, int m, long high, long low){\\n        long mid = 0;\\n        while(low < high){\\n            mid = (high + low)/2;\\n            if(valid(nums, m, mid)){\\n                //System.out.println(mid);\\n                high = mid;\\n            }else{\\n                low = mid + 1;\\n            }\\n        }\\n        return high;\\n    }\\n    \\n    private boolean valid(int[] nums, int m, long max){\\n        int cur = 0;\\n        int count = 1;\\n        for(int num: nums){\\n            cur += num;\\n            if(cur > max){\\n                cur = num;\\n                count++;\\n                if(count > m){\\n                    return false;\\n                }\\n            }\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"89816",
			"view":"9421",
			"top":"3",
			"title":"DP Java",
			"vote":"26",
			"content":"DP solution. This is obviously not as good as the binary search solutions; but it did pass OJ.\\n\\n`dp[s,j]` is the solution for splitting subarray `n[j]...n[L-1]` into `s` parts.\\n\\n`dp[s+1,i] = min{ max(dp[s,j], n[i]+...+n[j-1]) }, i+1 <= j <= L-s` \\n\\nThis solution does not take advantage of the fact that the numbers are non-negative (except to break the inner loop early). That is a loss. (On the other hand, it can be used for the problem containing arbitrary numbers)\\n\\n    public int splitArray(int[] nums, int m)\\n    {\\n        int L = nums.length;\\n        int[] S = new int[L+1];\\n        S[0]=0;\\n        for(int i=0; i<L; i++)\\n            S[i+1] = S[i]+nums[i];\\n\\n        int[] dp = new int[L];\\n        for(int i=0; i<L; i++)\\n            dp[i] = S[L]-S[i];\\n\\n        for(int s=1; s<m; s++)\\n        {\\n            for(int i=0; i<L-s; i++)\\n            {\\n                dp[i]=Integer.MAX_VALUE;\\n                for(int j=i+1; j<=L-s; j++)\\n                {\\n                    int t = Math.max(dp[j], S[j]-S[i]);\\n                    if(t<=dp[i])\\n                        dp[i]=t;\\n                    else\\n                        break;\\n                }\\n            }\\n        }\\n\\n        return dp[0];\\n    }"
		},
		{
			"lc_ans_id":"89821",
			"view":"1521",
			"top":"4",
			"title":"Python solution dp and binary search",
			"vote":"9",
			"content":"First i try dp, while got TLE:(while if using java to implement dp, u may get AC...)\\n```\\nimport sys\\nclass Solution(object):\\n    def splitArray(self, nums, m):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type m: int\\n        :rtype: int\\n        \"\"\"\\n        dp = [[sys.maxint]*(m) for _ in range(len(nums)+1)]\\n        acc = 0\\n        dp[0][0] = 0\\n        for i in range(1, len(nums)+1):\\n            acc += nums[i - 1]\\n            dp[i][0] = acc\\n\\n        for j in range(m):\\n            dp[0][j] = 0\\n\\n        for i in range(1, len(nums)+1):\\n            for i_ in range(i):\\n                for j in range(1, m):\\n                    dp[i][j] = min(dp[i][j], max(dp[i_][j-1], dp[i][0]-dp[i_][0]))\\n        #print dp\\n        return dp[len(nums)][m-1]\\n```\\nThen by binary search, got AC:\\n```\\nclass Solution(object):\\n    def splitArray(self, nums, m):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type m: int\\n        :rtype: int\\n        \"\"\"\\n        def valid(mid):\\n            cnt = 0\\n            current = 0\\n            for n in nums:\\n                current += n\\n                if current>mid:\\n                    cnt += 1\\n                    if cnt>=m:\\n                        return False\\n                    current = n\\n            return True\\n\\n        l = max(nums)\\n        h = sum(nums)\\n\\n        while l<h:\\n            mid = l+(h-l)/2\\n            if valid(mid):\\n                h = mid\\n            else:\\n                l = mid+1\\n        return l\\n```"
		},
		{
			"lc_ans_id":"89873",
			"view":"2848",
			"top":"5",
			"title":"Binary Search C++ Solution",
			"vote":"9",
			"content":"Obviously, the final result is in the interval [left, right] (where left is the maximal number in the array, right is sum of all numbers). \\nSo, what we need to do is to find out the first element in [left, right], which exactly we cannot split the array into m subarrays whose sum is no greater than that element. Then its previous one is the final result. The progress is much similar to lower_bound in C++.\\n```\\nclass Solution {\\npublic:\\n    using ll = long long;\\n\\n    bool canSplit(vector<int>& nums, int m, ll sum) {\\n        int c = 1;\\n        ll s = 0;\\n        for (auto& num : nums) {\\n            s += num;\\n            if (s > sum) {\\n                s = num;\\n                ++c;\\n            }\\n        }\\n        return c <= m;\\n    }\\n\\n    int splitArray(vector<int>& nums, int m) {\\n        ll left = 0, right = 0;\\n        for (auto& num : nums) {\\n            left = max(left, (ll)num);\\n            right += num;\\n        }\\n        while (left <= right) {\\n            ll mid = left + (right-left)/2;\\n            if (canSplit(nums, m, mid))\\n                right = mid-1;\\n            else\\n                left = mid+1;\\n        }\\n        return left;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"89820",
			"view":"2171",
			"top":"6",
			"title":"Explanation + Ruby 11-liner",
			"vote":"7",
			"content":"I really like Ruby for binary search...\\n```\\ndef split_array(nums, m)\\n  (nums.max .. nums.inject(:+)).bsearch { |cap|\\n    subarrays = 0\\n    sum = cap\\n    nums.each { |num|\\n      if (sum += num) > cap\\n        sum = num\\n        subarrays += 1\\n      end\\n    }\\n    subarrays <= m\\n  }\\nend\\n```\\nIf we can do it with a certain cap like 9 in the example, we can of course also do it with any larger cap. Meaning we can use binary search. And we want to know the smallest cap possible.\\n\\nFor the binary search, we just need to be able to determine for a certain cap whether it's ok. Meaning whether we can split the array into m subarrays so that no subarray's sum is over this cap. To do that, we determine the **minimum** number of subarrays we can do with this cap. If it's smaller than or equal to m, this cap is ok. Wait, aren't we supposed to create **exactly** m subarrays? Yeah, but if we can do it with fewer, we can just split some up so we have exactly m.\\n\\nSo how to find the minimum number of subarrays we can do with a certain cap? We can do that greedily. Of course it's smart to stuff as many numbers into the first subarray as we can - then we don't need to try to fit them into the remaining subarrays. Same for the remaining subarrays - always stuff as many numbers into them as we can, only start a new subarray when the current number doesn't still fit into the previous subarray.\\n\\nThe initial range for possible caps is from the maximum in `nums` (because with a lower cap, we couldn't fit that number into any subarray) to the sum of `nums` (a larger cap would be useless - we'll never need more room than all numbers combined)."
		},
		{
			"lc_ans_id":"89846",
			"view":"251",
			"top":"7",
			"title":"Python solution with detailed explanation",
			"vote":"3",
			"content":"**Solution**\\n\\n**Split Array Largest Sum** https://leetcode.com/problems/split-array-largest-sum/\\n\\n**BruteForce**\\n```\\nclass Solution(object):\\n    def helper(self, nums, m):\\n        if nums == []:\\n            return 0\\n        elif m == 1:\\n            return sum(nums)\\n        else:\\n            min_result = float('inf')\\n            for j in range(1,len(nums)+1):\\n                left, right = sum(nums[:j]), self.helper(nums[j:], m-1)\\n                min_result = min(min_result, max(left, right))\\n            return min_result\\n    \\n    def splitArray(self, nums, m):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type m: int\\n        :rtype: int\\n        \"\"\"\\n        return self.helper(nums, m)\\n```\\n\\n**Memoization**\\n```\\nfrom collections import defaultdict    \\nclass Solution(object):\\n    def helper(self, i, nums, m, cache):\\n        if i == len(nums):\\n            return 0\\n        elif m == 1:\\n            return sum(nums[i:])\\n        else:\\n            if i in cache and m in cache[i]:\\n                return cache[i][m]\\n            cache[i][m] = float('inf')\\n            for j in xrange(1,len(nums)+1):\\n                left, right = sum(nums[i:i+j]), self.helper(i+j, nums, m-1, cache)\\n                cache[i][m] = min(cache[i][m], max(left, right))\\n                if left > right:\\n                    break\\n            return cache[i][m]\\n    \\n    def splitArray(self, nums, m):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type m: int\\n        :rtype: int\\n        \"\"\"\\n        cache = defaultdict(dict)\\n        return self.helper(0, nums, m, cache)\\n```\\n\\n**Memoization + Cumulative Sum**\\n```\\nfrom collections import defaultdict            \\nclass Solution(object):\\n    def helper(self, i, nums, m, cache, cums):\\n        if i == len(nums):\\n            return 0\\n        elif m == 1:\\n            return sum(nums[i:])\\n        else:\\n            if i in cache and m in cache[i]:\\n                return cache[i][m]\\n            cache[i][m] = float('inf')\\n            for j in range(1,len(nums)+1):\\n                left, right = cums[i+j] - cums[i], self.helper(i+j, nums, m-1, cache, cums)\\n                cache[i][m] = min(cache[i][m], max(left, right))\\n                if left > right:\\n                    break\\n            return cache[i][m]\\n    \\n    def splitArray(self, nums, m):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type m: int\\n        :rtype: int\\n        \"\"\"\\n        cums = [0]\\n        for x in nums:\\n            cums.append(cums[-1]+x)\\n        cache = defaultdict(dict)            \\n        return self.helper(0, nums, m, cache, cums)\\n```\\n\\n**Binary Search Based Solution**\\n* Imagine we split an array into m different sub-arrays. There can be several ways to do this split. Let us assume we take one possible split.\\n* In this particular split, we take the sum of each subarray j and call it S(j) where j is from 1 to m. Then we figure out the sub-array which has the maximum sum from all of these m different sums and call it max_sum(array, m). \\n* What is the least possible value of max_sum(array, m)? Answer will be max(array) - this must be obvious. The max(array) value must be in one of the m sub-arrays. The least possible amongst all possible m different sub-arrays would be a sub-array with a single element as the max(array).\\n* What is the maximum possible value of max_sum(array, m)? Answer will be sum(array) - a subarray with all elements.\\n* So the range of max_sum(array, m) is max(array) to sum(array).\\n* We now have a search problem - we need to search within the range max(array) to sum(array) such that  we find the minimum value in this range with which we can form at-most m sub-arrays such no sub-array has sum more than this value. To efficiently search a sorted range we use binary search.\\n* Imagine we pick a value mid and find that we could make more sub-arrays than m. This means we picked too small value (check the code to understand this). We should set low = mid + 1.\\n* Imagine we pick a value mid and find we could make less sub-arrays than m. Now we can easily split those sub-arrays to increase the count and still make sure that the maximum sum of those sub-arrays is less than mid (splitting will only decrease mid). In this case, we record a potential solution and make high = mid-1, hoping to get an even better solution later.\\n* Lets use an example: [7,2,5,10,8] and 2\\n* max_sum([7,2,5,10,8], 2) will be in the range [10, 32] - i.e. any split of the array into 2 sub-array will have sum of the sub-array between [10, 32].\\n* Now we want to find the minimum value in this range with which we can form 2 sub-arrays. Lets do this linearly. Can we use 10? Using 10, we can form [7, 2]; [5]; [10]; [8] - 4 subarrays. We clearly need to increase the minimum value so that we can reduce from 4 subarrays. \\n* What if we used binary search and started with mid = (10+32)/2 = 21. This gives us [7,2,5]; [10,8] - This is valid solution. Can we do better? We record 21 and reduce our range to [10, 20].\\n* This gives us mid as 15. [7,2,5]; [10]; [8] - Invalid! we got more than 2 sub-arrays. We need to increase low to mid+1 and search in the range [16, 20].\\n* [16, 20] gives us 18. [7,2,5]; [10,8] - This is a valid solution. Can we do better than 18? Let us search in the range [16,17]\\n* [16,17] gives mid as 16. [7,2,5]; [10]; [8]. This is invalid and we need to increase range. New range is [17,17]. This again gives [7,2,5]; [10]; [8] and we get the new range as [18,17].\\n* [18,17] breaks the while loop! We have recorded 18 as the last answer and return it.\\n\\n```\\nclass Solution(object):\\n    def is_valid(self, nums, m, mid):\\n        # assume mid is < max(nums)\\n        cuts, curr_sum  = 0, 0\\n        for x in nums:\\n            curr_sum += x\\n            if curr_sum > mid:\\n                cuts, curr_sum = cuts+1, x\\n        subs = cuts + 1\\n        return (subs <= m)\\n    \\n    def splitArray(self, nums, m):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type m: int\\n        :rtype: int\\n        \"\"\"\\n        low, high, ans = max(nums), sum(nums), -1\\n        while low <= high:\\n            mid = (low+high)//2\\n            if self.is_valid(nums, m, mid): # can you make at-most m sub-arrays with maximum sum atmost mid \\n                ans, high = mid, mid-1\\n            else:\\n                low = mid + 1\\n        return ans\\n```\\n\\nhttps://discuss.leetcode.com/topic/61395/c-fast-very-clear-explanation-clean-code-solution-with-greedy-algorithm-and-binary-search/2\\nhttps://discuss.leetcode.com/topic/61315/java-easy-binary-search-solution-8ms"
		},
		{
			"lc_ans_id":"89825",
			"view":"952",
			"top":"8",
			"title":"JAVA recursive DP. Having trouble in Iterative DP.",
			"vote":"2",
			"content":"I solved this by recursion that will go TLE :( But I am having trouble in converting it into iterative version. Please help!\\n\\n\\tpublic int splitArray(int[] nums, int m) {\\n\\t\\tif (nums.length == 0 || nums == null || m == 0)\\n\\t\\t\\treturn Integer.MAX_VALUE;\\n\\t\\treturn splitArray(nums, m, 0);\\n\\t}\\n\\n\\tpublic int splitArray(int[] nums, int m, int start) {\\n\\t\\tif (nums.length == 0 || nums == null || m == 0)\\n\\t\\t\\treturn Integer.MAX_VALUE;\\n\\t\\tif (start > nums.length)\\n\\t\\t\\treturn Integer.MAX_VALUE;\\n\\t\\tif (m == 1) {\\n\\t\\t\\tint sum = 0;\\n\\t\\t\\tfor (int i = start; i < nums.length; i++)\\n\\t\\t\\t\\tsum += nums[i];\\n\\t\\t\\treturn sum;\\n\\t\\t}\\n\\t\\tint sum = 0;\\n\\t\\tint split = 0;\\n\\t\\tint min = Integer.MAX_VALUE;\\n\\t\\tfor (int i = start; i < nums.length; i++) {\\n\\t\\t\\tsum += nums[i];\\n\\t\\t\\tsplit = Math.max(sum, splitArray(nums, m - 1, i + 1));\\n\\t\\t\\tmin = Math.min(min, split);\\n\\t\\t}\\n\\t\\treturn min;\\n\\t}"
		},
		{
			"lc_ans_id":"89843",
			"view":"236",
			"top":"9",
			"title":"Clear and easy method using DP in C++",
			"vote":"1",
			"content":"```\\n// The method, in DP idea, costs lots of time, but the logic is very eary and clear.\\n//\\u7528\\u65f6\\u86ee\\u957f\\u7684\\uff0c\\u4f46\\u601d\\u8def\\u6bd4\\u8f83\\u6e05\\u6670 \\n// f[m][i] means if we could split the array [0, i] in m subarray, the minimal value of the largest sum among these m subarrays we could get.\\n//f[m][i]\\u8868\\u793am\\u5200\\uff0c\\u5728[0, i]\\u7684\\u6700\\u5c0f\\u5316subarray\\u7684\\u6700\\u5927\\u503c\\n// Then, f[m][i] = min (maxf[m-1][j], sum(nums[from j + 1 to i])), where j = [0, i - 1];\\n//\\u9012\\u5f52\\u5f0f\\u5b50\\uff1af[m][i] = min(max(f[m-1][j], sum(nums[j+1 - i])) \\u5176\\u4e2d\\uff0cj = [0, i - 1];\\n// The complexity is O(n^3)\\n//\\u8fd9\\u6837\\u5904\\u7406\\u7684\\u8bdd\\uff0c\\u5c31\\u662f\\u4e09\\u91cd\\u5faa\\u73af\\u4e86\\n\\nclass Solution {\\npublic:\\n    int splitArray(vector<int>& nums, int m) {\\n        int len = nums.size();\\n        vector<vector<long>> arr(m, vector<long>(len, 0));\\n        arr[0][0] = nums[0];\\n        for(int i = 1; i<len; i++)\\n        {\\n            arr[0][i] = arr[0][i - 1] + nums[i];\\n        }\\n        \\n        for(int k = 1; k<m; k++)\\n        {\\n            for(int i = 0; i<len; i++)\\n            {\\n                long minVal = arr[0][i];\\n                for(int j = i-1; j>= 0; j--)\\n                {\\n                    long tmpVal = max(arr[0][i] - arr[0][j], arr[k - 1][j]);\\n                    minVal = min(minVal, tmpVal);\\n                }\\n                arr[k][i] = minVal;\\n            }\\n        }\\n        return arr[m-1][len - 1];\\n    }\\n};\\n\\n```"
		}
	],
	"id":"410",
	"title":"Split Array Largest Sum",
	"content":"<p>Given an array which consists of non-negative integers and an integer <i>m</i>, you can split the array into <i>m</i> non-empty continuous subarrays. Write an algorithm to minimize the largest sum among these <i>m</i> subarrays.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\nIf <i>n</i> is the length of array, assume the following constraints are satisfied:\r\n<ul>\r\n<li>1 &le; <i>n</i> &le; 1000</li>\r\n<li>1 &le; <i>m</i> &le; min(50, <i>n</i>)</li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Examples: </b>\r\n<pre>\r\nInput:\r\n<b>nums</b> = [7,2,5,10,8]\r\n<b>m</b> = 2\r\n\r\nOutput:\r\n18\r\n\r\nExplanation:\r\nThere are four ways to split <b>nums</b> into two subarrays.\r\nThe best way is to split it into <b>[7,2,5]</b> and <b>[10,8]</b>,\r\nwhere the largest sum among the two subarrays is only 18.\r\n</pre>\r\n</p>",
	"frequency":"240",
	"ac_num":"20135"
}