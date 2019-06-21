{
	"difficulty":"3",
	"submit_num":"18293",
	"show_id":"689",
	"leetcode_id":"689",
	"answers":[
		{
			"lc_ans_id":"108231",
			"view":"8084",
			"top":"0",
			"title":"C++/Java, DP with explanation, O(n)",
			"vote":"36",
			"content":"The question asks for three non-overlapping intervals with maximum sum of all 3 intervals. If the middle interval is [i, i+k-1], where k <= i <= n-2k, the left interval has to be in subrange [0, i-1], and the right interval is from subrange [i+k, n-1]. \\n\\nSo the following solution is based on DP. \\n```\\nposLeft[i] is the starting index for the left interval in range [0, i];\\nposRight[i] is the starting index for the right interval in range [i, n-1]; \\n```\\nThen we test every possible starting index of middle interval, i.e. k <= i <= n-2k, and we can get the corresponding left and right max sum intervals easily from DP. And the run time is O(n).\\n\\nCaution. In order to get lexicographical smallest order, when there are two intervals with equal max sum, always select the left most one. So in the code, the if condition is \">= tot\" for right interval due to backward searching, and \"> tot\" for left interval. Thanks to @lee215 for pointing this out! \\n```\\nclass Solution {\\npublic:\\n    vector<int> maxSumOfThreeSubarrays(vector<int>& nums, int k) {\\n        int n = nums.size(), maxsum = 0;\\n        vector<int> sum = {0}, posLeft(n, 0), posRight(n, n-k), ans(3, 0);\\n        for (int i:nums) sum.push_back(sum.back()+i);\\n       // DP for starting index of the left max sum interval\\n        for (int i = k, tot = sum[k]-sum[0]; i < n; i++) {\\n            if (sum[i+1]-sum[i+1-k] > tot) {\\n                posLeft[i] = i+1-k;\\n                tot = sum[i+1]-sum[i+1-k];\\n            }\\n            else \\n                posLeft[i] = posLeft[i-1];\\n        }\\n        // DP for starting index of the right max sum interval\\n        // caution: the condition is \">= tot\" for right interval, and \"> tot\" for left interval\\n        for (int i = n-k-1, tot = sum[n]-sum[n-k]; i >= 0; i--) {\\n            if (sum[i+k]-sum[i] >= tot) {\\n                posRight[i] = i;\\n                tot = sum[i+k]-sum[i];\\n            }\\n            else\\n                posRight[i] = posRight[i+1];\\n        }\\n        // test all possible middle interval\\n        for (int i = k; i <= n-2*k; i++) {\\n            int l = posLeft[i-1], r = posRight[i+k];\\n            int tot = (sum[i+k]-sum[i]) + (sum[l+k]-sum[l]) + (sum[r+k]-sum[r]);\\n            if (tot > maxsum) {\\n                maxsum = tot;\\n                ans = {l, i, r};\\n            }\\n        }\\n        return ans;\\n    }\\n};\\n```\\nJava version\\n```\\nclass Solution {\\n    public int[] maxSumOfThreeSubarrays(int[] nums, int k) {\\n        int n = nums.length, maxsum = 0;\\n        int[] sum = new int[n+1], posLeft = new int[n], posRight = new int[n], ans = new int[3];\\n        for (int i = 0; i < n; i++) sum[i+1] = sum[i]+nums[i];\\n        // DP for starting index of the left max sum interval\\n        for (int i = k, tot = sum[k]-sum[0]; i < n; i++) {\\n            if (sum[i+1]-sum[i+1-k] > tot) {\\n                posLeft[i] = i+1-k;\\n                tot = sum[i+1]-sum[i+1-k];\\n            }\\n            else\\n                posLeft[i] = posLeft[i-1];\\n        }\\n        // DP for starting index of the right max sum interval\\n       // caution: the condition is \">= tot\" for right interval, and \"> tot\" for left interval\\n        posRight[n-k] = n-k;\\n        for (int i = n-k-1, tot = sum[n]-sum[n-k]; i >= 0; i--) {\\n            if (sum[i+k]-sum[i] >= tot) {\\n                posRight[i] = i;\\n                tot = sum[i+k]-sum[i];\\n            }\\n            else\\n                posRight[i] = posRight[i+1];\\n        }\\n        // test all possible middle interval\\n        for (int i = k; i <= n-2*k; i++) {\\n            int l = posLeft[i-1], r = posRight[i+k];\\n            int tot = (sum[i+k]-sum[i]) + (sum[l+k]-sum[l]) + (sum[r+k]-sum[r]);\\n            if (tot > maxsum) {\\n                maxsum = tot;\\n                ans[0] = l; ans[1] = i; ans[2] = r;\\n            }\\n        }\\n        return ans;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108238",
			"view":"1175",
			"top":"1",
			"title":"Python o(n) time, o(1) space. Greedy solution.",
			"vote":"13",
			"content":"A greedy solution using three sliding windows where you keep track of the best indexes/sums as you go.\\n\\n**O(n) time**: Since we're only going through the list once and using no complex operations, this is O(n).\\n**O(1) space**: Just a fixed set of temp vars. We don't need the extra arrays that the DP solutions have.\\n\\n```\\nclass Solution:\\n    def maxSumOfThreeSubarrays(self, nums, k):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type k: int\\n        :rtype: List[int]\\n        \"\"\"\\n\\n        # Best single, double, and triple sequence found so far\\n        bestSeq = 0\\n        bestTwoSeq = [0, k]\\n        bestThreeSeq = [0, k, k*2]\\n\\n        # Sums of each window\\n        seqSum = sum(nums[0:k])\\n        seqTwoSum = sum(nums[k:k*2])\\n        seqThreeSum = sum(nums[k*2:k*3])\\n\\n        # Sums of combined best windows\\n        bestSeqSum = seqSum\\n        bestTwoSum = seqSum + seqTwoSum\\n        bestThreeSum = seqSum + seqTwoSum + seqThreeSum\\n\\n        # Current window positions\\n        seqIndex = 1\\n        twoSeqIndex = k + 1\\n        threeSeqIndex = k*2 + 1\\n        while threeSeqIndex <= len(nums) - k:\\n            # Update the three sliding windows\\n            seqSum = seqSum - nums[seqIndex - 1] + nums[seqIndex + k - 1]\\n            seqTwoSum = seqTwoSum - nums[twoSeqIndex - 1] + nums[twoSeqIndex + k - 1]\\n            seqThreeSum = seqThreeSum - nums[threeSeqIndex - 1] + nums[threeSeqIndex + k - 1]\\n            \\n            # Update best single window\\n            if seqSum > bestSeqSum:\\n                bestSeq = seqIndex\\n                bestSeqSum = seqSum\\n\\n            # Update best two windows\\n            if seqTwoSum + bestSeqSum > bestTwoSum:\\n                bestTwoSeq = [bestSeq, twoSeqIndex]\\n                bestTwoSum = seqTwoSum + bestSeqSum\\n\\n            # Update best three windows\\n            if seqThreeSum + bestTwoSum > bestThreeSum:\\n                bestThreeSeq = bestTwoSeq + [threeSeqIndex]\\n                bestThreeSum = seqThreeSum + bestTwoSum\\n\\n            # Update the current positions\\n            seqIndex += 1\\n            twoSeqIndex += 1\\n            threeSeqIndex += 1\\n\\n        return bestThreeSeq\\n```"
		},
		{
			"lc_ans_id":"108230",
			"view":"3330",
			"top":"2",
			"title":"Clean Java DP O(n) Solution. Easy extend to Sum of K Non-Overlapping SubArrays.",
			"vote":"13",
			"content":"This is a more general DP solution, and it is similar to that buy and sell stock problem.\\n\\n\\ndp[i][j] stands for in i th sum, the max non-overlap sum we can have from 0 to j\\nid[i][j] stands for in i th sum, the first starting index for that sum. \\n\\n\\n```\\nclass Solution {\\n    public int[] maxSumOfThreeSubarrays(int[] nums, int k) {\\n        int[][] dp = new int[4][nums.length + 1];\\n        int sum = 0;\\n        int[] accu = new int[nums.length + 1];\\n        for(int i = 0; i < nums.length; i++) {\\n            sum += nums[i];\\n            accu[i] = sum;\\n        }\\n        int[][] id = new int[4][nums.length + 1];\\n        int max = 0, inId = 0;\\n        for(int i = 1; i < 4; i++) {\\n            for(int j = k-1 ; j < nums.length; j++) {\\n                int tmpmax = j - k < 0 ? accu[j] : accu[j] - accu[j-k] + dp[i-1][j-k];\\n                if(j - k >= 0) {\\n                    dp[i][j] = dp[i][j-1];\\n                    id[i][j] = id[i][j-1];\\n                }\\n                if(j > 0 && tmpmax > dp[i][j-1]) {\\n                    dp[i][j] = tmpmax;\\n                    id[i][j] = j-k+1;\\n                }\\n            }\\n        }\\n        int[] res = new int[3];\\n        res[2] = id[3][nums.length-1];\\n        res[1] = id[2][res[2] - 1];\\n        res[0] = id[1][res[1] - 1];        \\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108246",
			"view":"330",
			"top":"3",
			"title":"C++ O(n) time O(n) space concise solution",
			"vote":"3",
			"content":"Let b[i] be contiguous sum of k elements ending with index i. We need to find the max sum of b[x] + b[y] + b[z] where x + 2k <= y + k <= z. We traverse the array, store solutions for cases of 1 sum (delayed by 2*k steps) , 2 sums (delayed by k steps), 3 sums (no delay) and update those each time we visit new element.\\n```\\nclass Solution {\\npublic:\\n    vector<int> maxSumOfThreeSubarrays(vector<int>& a, int k) {\\n        int n = a.size();\\n        vector<int> c[3], m(3); //store optimal solutions for 1 sum, 2 sums, 3 sums.\\n        vector<int> b(n);\\n        int sm = 0;\\n        for (int i = 0; i < n; ++i) {\\n            sm += a[i];\\n            if (i >=k-1) {\\n                b[i] = sm;\\n                sm -= a[i-k+1];\\n                if (i >= 3 * k-1) {\\n                    if (b[i-k-k] > m[0]) { // update 1 sum solution\\n                        m[0] = b[i-k-k];\\n                        c[0] = {i-k-k};\\n                    }\\n                    if (b[i-k] + m[0] > m[1]) { // update 2 sums solution\\n                        m[1] = b[i-k] + m[0];\\n                        c[1] = {c[0][0], i-k};\\n                    }\\n                    if (b[i] + m[1] > m[2]) { //update 3 sums solution\\n                        m[2] = m[1] + b[i];\\n                        c[2] = {c[1][0], c[1][1], i};\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return {c[2][0]-k + 1,c[2][1]-k+1,c[2][2]-k+1};\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108244",
			"view":"965",
			"top":"4",
			"title":"super standard C++ DP solution O(n) with detailed comments/explanations",
			"vote":"2",
			"content":"`dp[i][j]` = the maximum before i with j non-overlapping subarrays (not necessarily ends at i)\\n`dp[i][j] = max { dp[i - k + 1][j - 1], dp[i - 1][j] }` means for every subarray ends at index i, we either select it or not, if we select it, we can only select subarray ends `<= i - k + 1`, and the remaining subarray becomes` j - 1`. Otherwise, we don't select subarray ends at index i, the problem becomes finding 3 subarrays in `[0..i - 1]`\\n`first[i] = dp[i][1], second[i] = dp[i][2], third[i] = dp[i][3]`\\n\\n\\n```\\nclass Solution {\\npublic:\\n    vector<int> maxSumOfThreeSubarrays(vector<int>& nums, int k) {\\n        int n = nums.size(), sum = 0;\\n        vector<int> partial(n), fsum(n), ssum(n), tsum(n); // partial[i] = sum of subarray ends at index i with length k\\n        // first[i] stores the start index of the first subarray \\n        // which gives the maximum sum before i inclusively\\n        // same logic for second and third\\n        vector<vector<int>> first(n), second(n), third(n);\\n        // initialize partial array\\n        for (int i = 0; i < n; i++) {\\n            sum += nums[i];\\n            if (i >= k - 1) {\\n                partial[i] = sum;\\n                sum -= nums[i - k + 1];\\n            }\\n        }\\n        // base case\\n        first[k - 1].push_back(0); \\n        fsum[k - 1] = partial[k - 1];\\n        for (int i = k; i < n; i++) {\\n            int sum = partial[i], curr = i - k + 1; \\n            // current subarray yields larger sum, so we use the current subarray\\n            if (sum > fsum[i - 1]) {\\n                fsum[i] = sum;\\n                first[i].push_back(curr);\\n            }\\n            else { // otherwise, we don't select the current subarray, use the previous one\\n                fsum[i] = fsum[i - 1];\\n                first[i] = first[i - 1];\\n            }\\n            if (fsum[i - k] + sum > ssum[i - 1]) {\\n                ssum[i] = fsum[curr - 1] + sum;\\n                second[i] = first[curr - 1];\\n                second[i].push_back(curr);\\n            }\\n            else {\\n                ssum[i] = ssum[i - 1];\\n                second[i] = second[i - 1];\\n            }\\n            if (ssum[i - k] + sum > tsum[i - 1]) {\\n                tsum[i] = ssum[curr - 1] + sum;\\n                third[i] = second[curr - 1];\\n                third[i].push_back(curr);\\n            }\\n            else {\\n                tsum[i] = tsum[i - 1];\\n                third[i] = third[i - 1];\\n            }\\n        }\\n        return third[n - 1];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108260",
			"view":"629",
			"top":"5",
			"title":"Python O(n) DP",
			"vote":"2",
			"content":"1. Build `sums` array for each `k` size subarray summation\\n2. Compute maximum and index for `[0, i]` and `[j, len(sums)-1]`\\n3. For each value at `i` in `sums`, check the sums of `sums[i] + dp_front[i-k] + dp_back[i+k]` and update maximum and index \\n```\\nclass Solution(object):\\n    def maxSumOfThreeSubarrays(self, nums, k):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type k: int\\n        :rtype: List[int]\\n        \"\"\"\\n        if len(nums) < 3 * k: return []\\n        sums = [0] * (len(nums) - k + 1)\\n        sums[0] = sum(nums[:k])\\n        for i in xrange(1, len(nums)-k+1):\\n            sums[i] = sums[i-1] + nums[i+k-1] - nums[i-1]\\n\\n        dp_front = [[0, 0] for _ in xrange(len(sums))]\\n        dp_back = [[0, 0] for _ in xrange(len(sums))]\\n        dp_front_max, dp_back_max = -sys.maxint, -sys.maxint\\n        for i in xrange(len(sums)):\\n            if sums[i] > dp_front_max:\\n                dp_front[i] = [sums[i], i]\\n                dp_front_max = sums[i]\\n            else:\\n                dp_front[i] = dp_front[i-1]\\n        for i in xrange(len(sums) - 1, -1, -1):\\n            if sums[i] > dp_back_max:\\n                dp_back[i] = [sums[i], i]\\n                dp_back_max = sums[i]\\n            else:\\n                dp_back[i] = dp_back[i+1]\\n\\n        ret, maxval = [], -sys.maxint\\n        for i in xrange(k, len(sums) - k):\\n            if sums[i] + dp_front[i - k][0] + dp_back[i + k][0] > maxval:\\n                ret = [dp_front[i - k][1], i, dp_back[i + k][1]]\\n                maxval = sums[i] + dp_front[i - k][0] + dp_back[i + k][0]\\n        return ret\\n```"
		},
		{
			"lc_ans_id":"108258",
			"view":"109",
			"top":"6",
			"title":"O(n) C++ Solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> maxSumOfThreeSubarrays(vector<int>& nums, int k) {\\n        vector<int> sum(nums.size() + 1);\\n        for (int i = 0; i < (int)nums.size(); i++)\\n            sum[i + 1] = sum[i] + nums[i];\\n        \\n        vector<pair<int,int>> forward(nums.size());\\n        forward[0] = make_pair(sum[k] - sum[0], 0);\\n        for (int i = 1; i <= (int)nums.size() - k; i++) {\\n            int t = sum[i + k] - sum[i];\\n            forward[i] = (forward[i - 1].first >= t) ? forward[i - 1] : make_pair(t, i);\\n        }\\n\\n        vector<pair<int,int>> backward(nums.size());\\n        for (int i = (int)nums.size() - k; i >= 0; i--) {\\n            int t = sum[i + k] - sum[i];\\n            backward[i] = (backward[i + 1].first > t) ? backward[i + 1] : make_pair(t, i);\\n        }\\n        \\n        int ansSum = 0;\\n        vector<int> ans(3);\\n        for (int i = k; i <= (int)nums.size() - k * 2; i++) {\\n            int t = forward[i - k].first + backward[i + k].first + sum[i + k] - sum[i];\\n            if (ansSum < t) {\\n                ansSum = t;\\n                ans = vector<int>{ forward[i - k].second, i, backward[i + k].second };\\n            }\\n        }\\n        \\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108245",
			"view":"811",
			"top":"7",
			"title":"My complex but maybe more structure solution java with memo",
			"vote":"1",
			"content":"To solve this question, I just think about the start index and the number of Non-Overlapping Subarrays.\\nSuch as the first  subarray's index is i, and then later two's start index will be i + k. And we just think about the Maximum Sum of 2 Non-Overlapping Subarrays start from i + k and so on.\\nOne important trick is we at the first time we think about the Maximum Sum of 2 Non-Overlapping Subarrays and Maximum Sum of 1 Non-Overlapping Subarrays their length should be the maximum one so the memo will be useful. And every time later we can get answer from HashMap. So the time complex is o(n)? right?\\n```\\nclass Solution {\\n    HashMap<Integer, Integer> map2 = new HashMap();\\n    HashMap<Integer, int[]> map2Res = new HashMap();\\n    HashMap<Integer, Integer> map1 = new HashMap();\\n    HashMap<Integer, Integer> map1Res = new HashMap();\\n    public int[] maxSumOfThreeSubarrays(int[] nums, int k) {\\n        countOne(nums, 2 * k, k);\\n        int max = 0;\\n        int [] res = new int[3];\\n        for (int i = 0; i <= nums.length - 3 * k; i++) {\\n            int countCur = 0;\\n            for (int j = 0; j < k; j++) {\\n                countCur += nums[i + j];\\n            }\\n            int help = countTwo(nums, i + k, k);\\n            if (countCur + help > max) {\\n                max = countCur + help;\\n                res[0] = i;\\n                res[1] = map2Res.get(i + k)[0];\\n                res[2] = map2Res.get(i + k)[1];\\n            }\\n            // System.out.println(\"index\" + i +\"max\" + max);\\n        }\\n        return res;\\n    }\\n    public int countTwo(int[] nums, int start, int k) {\\n        if (map2.get(start) != null) {\\n            return map2.get(start);\\n        }\\n        int max = 0;\\n        int [] res = new int[2];\\n        for (int i = nums.length - 2 * k; i >= start; i--) {\\n            int countCur = 0;\\n            for (int j = 0; j < k; j++) {\\n                countCur += nums[i + j];\\n            }\\n            int help = countOne(nums, i + k, k);\\n            if (countCur + help >= max) {\\n                res = new int[2];\\n                max = countCur + help;\\n                res[0] = i;\\n                res[1] = map1Res.get(i + k);\\n            }\\n            map2.put(i, max);\\n            map2Res.put(i, res);\\n        }\\n        return max;\\n        \\n    }\\n    public int countOne(int[] nums, int start, int k) {\\n        if (map1.get(start) != null) {\\n            return map1.get(start);\\n        }\\n        int max = 0;\\n        int res = 0;\\n        for (int i = nums.length - k; i >= start; i--) {\\n            int countCur = 0;\\n            for (int j = 0; j < k; j++) {\\n                countCur += nums[i + j];\\n            }\\n            if (countCur >= max) {\\n                max = countCur;\\n                res = i;\\n            }\\n            map1.put(i, max);\\n            map1Res.put(i, res);\\n        }\\n        return max;\\n    }\\n}\\n```\\nHope it helpful"
		},
		{
			"lc_ans_id":"108228",
			"view":"22",
			"top":"8",
			"title":"Non-DP method, Straight forward, Clear explanation.",
			"vote":"0",
			"content":"There are a lot of DP solutions for this problem. Here, I would like to provide another solution which is non-DP.\\nHere are some key points for this solution:\\n1. Since we only care about the sum of the subarray. We can create an array and store the subarray sum starting from each index.\\n2. If we start from the left index, middle index and right index, this will be very slow because the middle index is dependent on the left index and the right index is dependent on the middle index. So the optimization is **Decoupling**. Let left and right index both connect to the middle index. Then, the left and right index can be updated separately. By the way, the range of left, middle and right indices are 0 -> middle-k, k -> nums.length-2k and middle+k -> end \\n3. Updating: we need to check the situations for each middle index. With middle index moving forward, we can figure out the range of left index and right index. The range of the left index increases one while the one of right index decreases one for each iteration. So, this allows us to use the information from the previous iteration.\\nFor left index: we only need to check the sum of the new left index is bigger than the previous max one.\\nFor right index: we only update when the previous max index is no longer in the range.\\nHope you can like this solution.\\n```\\nclass Solution {\\n    public int[] maxSumOfThreeSubarrays(int[] nums, int k) {\\n        int n = nums.length;\\n        int m = n - k + 1;\\n        int[] sum = new int[m];\\n        for(int i = 0; i < k; i++) sum[0] += nums[i];\\n        for(int i = 1; i < m; i++) sum[i] = sum[i-1] + nums[i+k-1] - nums[i-1];\\n        int[] res = new int[]{0, k, 2*k-1};\\n        int[] temp = new int[]{0, k, 2*k-1};\\n        int max = Integer.MIN_VALUE;\\n        for(int middle = k; middle <= n-2*k; middle++) {\\n            temp[1] = middle;\\n            //update the left index (temp[0]) when the new left index.\\n            if(sum[temp[0]] < sum[middle-k]) temp[0] = middle-k;\\n            //update the right index(temp[1]) when previous max index is not in the range.\\n            if(temp[2] < middle+k) {\\n                int tempR = Integer.MIN_VALUE;\\n                for(int right = middle+k; right < m; right++) {\\n                    if(tempR < sum[right]) {\\n                        tempR = sum[right];\\n                        temp[2] = right;\\n                    }\\n                }\\n            }\\n            if(max < sum[temp[0]] + sum[temp[1]] + sum[temp[2]]) {\\n                max = sum[temp[0]] + sum[temp[1]] + sum[temp[2]];\\n                res[0] = temp[0];\\n                res[1] = temp[1];\\n                res[2] = temp[2];\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108229",
			"view":"16",
			"top":"9",
			"title":"7-line Scala solution",
			"vote":"0",
			"content":"```\\nobject Solution {\\n  def maxSumOfThreeSubarrays(nums: Array[Int], k: Int): Array[Int] = {\\n    val presum = nums.scanLeft(0)(_ + _)\\n    val n = nums.length - k\\n    val sub = (0 to n).map(x => presum(x + k) - presum(x))\\n    val left = (1 to n).scanLeft(0) { (i, j) => if (sub(i) >= sub(j)) i else j }\\n    val right = (0 until n).scanRight(n) { (i, j) => if (sub(i) >= sub(j)) i else j }\\n    val mid = (k to n-k).maxBy(x => sub(left(x - k)) + sub(x) + sub(right(x + k)))\\n    Array(left(mid - k), mid, right(mid + k))\\n  }\\n}\\n```"
		}
	],
	"id":"666",
	"title":"Maximum Sum of 3 Non-Overlapping Subarrays",
	"content":"<p>\r\nIn a given array <code>nums</code> of positive integers, find three non-overlapping subarrays with maximum sum.\r\n</p>\r\n<p>\r\nEach subarray will be of size <code>k</code>, and we want to maximize the sum of all <code>3*k</code> entries.\r\n</p>\r\n<p>\r\nReturn the result as a list of indices representing the starting position of each interval (0-indexed).  If there are multiple answers, return the lexicographically smallest one.\r\n</p>\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,1,2,6,7,5,1], 2\r\n<b>Output:</b> [0, 3, 5]\r\n<b>Explanation:</b> Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].\r\nWe could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<li><code>nums.length</code> will be between 1 and 20000.</li>\r\n<li><code>nums[i]</code> will be between 1 and 65535.</li>\r\n<li><code>k</code> will be between 1 and floor(nums.length / 3).</li>\r\n</p>",
	"frequency":"189",
	"ac_num":"7660"
}