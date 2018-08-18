{
	"difficulty":"2",
	"submit_num":"26147",
	"show_id":"698",
	"leetcode_id":"698",
	"answers":[
		{
			"lc_ans_id":"108730",
			"view":"6855",
			"top":"0",
			"title":"[Java/C++]Straightforward dfs solution",
			"vote":"24",
			"content":"**Update:** This question has been changed after the contest. It added the special restriction ```0 < nums[i] < 10000```. My solution here is without that consideration.\\n\\nAssume ```sum``` is the sum of ```nums[]``` . The dfs process is to find a subset of  ```nums[]``` which sum equals to ```sum/k```. We use an array ```visited[]``` to record which element in ```nums[]``` is used. Each time when we get a ```cur_sum = sum/k```, we will start from position ```0``` in ```nums[]``` to look up the elements that are not used yet and find another ```cur_sum = sum/k```.\\n\\nAn corner case is when ```sum = 0```, my method is to use ```cur_num``` to record the number of elements in the current subset. Only if   ```cur_sum = sum/k && cur_num >0```, we can start another look up process.\\n\\nSome test cases may need to be added in:\\n```nums = {-1,1,0,0}, k = 4```\\n```nums = {-1,1}, k = 1```\\n```nums = {-1,1}, k = 2```\\n```nums = {-1,1,0}, k = 2```\\n...\\n\\nJava version:\\n```\\n    public boolean canPartitionKSubsets(int[] nums, int k) {\\n        int sum = 0;\\n        for(int num:nums)sum += num;\\n        if(k <= 0 || sum%k != 0)return false;\\n        int[] visited = new int[nums.length];\\n        return canPartition(nums, visited, 0, k, 0, 0, sum/k);\\n    }\\n    \\n    public boolean canPartition(int[] nums, int[] visited, int start_index, int k, int cur_sum, int cur_num, int target){\\n        if(k==1)return true;\\n        if(cur_sum == target && cur_num>0)return canPartition(nums, visited, 0, k-1, 0, 0, target);\\n        for(int i = start_index; i<nums.length; i++){\\n            if(visited[i] == 0){\\n                visited[i] = 1;\\n                if(canPartition(nums, visited, i+1, k, cur_sum + nums[i], cur_num++, target))return true;\\n                visited[i] = 0;\\n            }\\n        }\\n        return false;\\n    }\\n```\\n\\nC++ version:\\n```\\n    bool canPartitionKSubsets(vector<int>& nums, int k) {\\n        int sum = 0;\\n        for(int num:nums)sum+=num;\\n        if(k <= 0 || sum%k != 0)return false;\\n        vector<int> visited(nums.size(), 0);\\n        return canPartition(nums, visited, 0, k, 0, 0, sum/k);\\n    }\\n    \\n    bool canPartition(vector<int>& nums, vector<int>& visited, int start_index, int k, int cur_sum, int cur_num, int target){\\n        if(k==1)return true;\\n        if(cur_sum == target && cur_num >0 )return canPartition(nums, visited, 0, k-1, 0, 0, target);\\n        for(int i = start_index; i<nums.size(); i++){\\n            if(!visited[i]){\\n                visited[i] = 1;\\n                if(canPartition(nums, visited, i+1, k, cur_sum + nums[i], cur_num++, target))return true;\\n                visited[i] = 0;\\n            }\\n        }\\n        return false;\\n    }\\n```"
		},
		{
			"lc_ans_id":"108741",
			"view":"2639",
			"top":"1",
			"title":"Cpp solution with explanation in details",
			"vote":"6",
			"content":"It's a very classical question.\\nPay attention to the note:\\n```1 <= k <= len(nums) <= 16```\\n```0 < nums[i] < 10000```\\n\\n\\nRef: http://www.geeksforgeeks.org/partition-set-k-subsets-equal-sum/\\n\\n```\\nclass Solution {\\npublic:\\n\\n    //  Method returns true if nums can be partitioned into K subsets\\n    // with equal sum\\n    bool canPartitionKSubsets(vector<int>& nums, int K)\\n    {\\n        int N = nums.size();\\n        //  If K is 1, then complete array will be our answer\\n        if (K == 1) return true;\\n\\n        //  If total number of partitions are more than N, then\\n        // division is not possible\\n        if (N < K) return false;\\n\\n        // if array sum is not divisible by K then we can't divide\\n        // array into K partitions\\n        int sum = 0;\\n        for (int i = 0; i < N; i++) sum += nums[i];\\n        if (sum % K != 0) return false;\\n\\n        //  the sum of each subset should be subset (= sum / K)\\n        int subset = sum / K;\\n        int subsetSum[K];\\n        bool taken[N];\\n\\n        //  Initialize sum of each subset from 0\\n        for (int i = 0; i < K; i++) subsetSum[i] = 0;\\n\\n        //  mark all elements as not taken\\n        for (int i = 0; i < N; i++) taken[i] = false;\\n\\n        // initialize first subsubset sum as last element of\\n        // array and mark that as taken\\n        subsetSum[0] = nums[N - 1];\\n        taken[N - 1] = true;\\n\\n        //  call recursive method to check K-substitution condition\\n        return canPartitionKSubsets(nums, subsetSum, taken, subset, K, N, 0, N - 1);\\n    }\\n\\n    // Recursive Utility method to check K equal sum\\n    // subsetition of array\\n    /**\\n        array           - given input array\\n        subsetSum array   - sum to store each subset of the array\\n        taken           - boolean array to check whether element\\n                          is taken into sum partition or not\\n        K               - number of partitions needed\\n        N               - total number of element in array\\n        curIdx          - current subsetSum index\\n        limitIdx        - lastIdx from where array element should be taken\\n    */\\n    bool canPartitionKSubsets(vector<int>& nums, int subsetSum[], bool taken[], int subset, int K, int N, int curIdx, int limitIdx) {\\n        if (subsetSum[curIdx] == subset) {\\n            /*  current index (K - 2) represents (K - 1) subsets of equal\\n                sum last partition will already remain with sum 'subset'*/\\n            if (curIdx == K - 2) return true;\\n\\n            //  recursive call for next subsetition\\n            return canPartitionKSubsets(nums, subsetSum, taken, subset,\\n                                        K, N, curIdx + 1, N - 1);\\n        }\\n\\n        //  start from limitIdx and include elements into current partition\\n        for (int i = limitIdx; i >= 0; i--) {\\n            //  if already taken, continue\\n            if (taken[i]) continue;\\n            int tmp = subsetSum[curIdx] + nums[i];\\n\\n            // if temp is less than subset then only include the element\\n            // and call recursively\\n            if (tmp <= subset) {\\n                //  mark the element and include into current partition sum\\n                taken[i] = true;\\n                subsetSum[curIdx] += nums[i];\\n                bool nxt = canPartitionKSubsets(nums, subsetSum, taken, subset, K, N, curIdx, i - 1);\\n                // after recursive call unmark the element and remove from\\n                // subsetition sum\\n                taken[i] = false;\\n                subsetSum[curIdx] -= nums[i];\\n                if (nxt) return true;\\n            }\\n        }\\n        return false;\\n    }\\n\\n};"
		},
		{
			"lc_ans_id":"108733",
			"view":"744",
			"top":"2",
			"title":"C++ 3ms DFS solution with pruning",
			"vote":"3",
			"content":"Sort the numbers and start with the biggest number, 3ms\\nWith original input (random order) 456ms\\nSort and start with the smallest number, TLE :)\\n```\\n    bool res=false;\\n    bool canPartitionKSubsets(vector<int>& nums, int k) {\\n        sort(nums.begin(), nums.end());\\n        reverse(nums.begin(), nums.end());\\n        int sum=0;\\n        for(int i=0;i<nums.size();i++) sum+=nums[i];\\n        if(sum%k!=0) return false;\\n        vector<int> bs(k, 0);\\n        BT(nums, sum/k, 0, bs);\\n        return res;\\n    }\\n    \\n    void BT(vector<int>& ns, int lim, int pos, vector<int> buckets) {\\n        if(res) return; // stop immediately\\n        if(pos>=ns.size()) {\\n            res=true;\\n            return;\\n        }\\n        bool flag=false;\\n        for(int i=0;i<buckets.size();i++) {\\n            if(flag&&buckets[i]==0) continue; //pruning, avoid putting an element into empty buckets repeatedly\\n            if(buckets[i]==0) flag=true;\\n            if(buckets[i]+ns[pos]>lim) continue;\\n            buckets[i]+=ns[pos];\\n            BT(ns, lim, pos+1, buckets);\\n            buckets[i]-=ns[pos];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"108731",
			"view":"1727",
			"top":"3",
			"title":"Dp solution, O(N * sum )",
			"vote":"3",
			"content":"class Solution {\\n    public boolean canPartitionKSubsets(int[] nums, int k) {\\n        int[] arr = nums;\\n        if(nums == null || nums.length == 0) return false;\\n        if(k <= 0) return false;\\n        if(k == 1) return true;\\n        int sum = 0;\\n        for(int i : nums){\\n            sum += i;\\n        }\\n        if(sum % k != 0) return false;\\n        int n = nums.length;\\n        boolean[][] dp = new boolean[sum + 1][n + 1];\\n        Arrays.fill(dp[0], true);\\n        for(int i = 1; i <= sum; i++){\\n            for(int j = 1; j <= n; j++){\\n                dp[i][j] = dp[i][j - 1];\\n                if(i >= arr[j - 1])\\n                    dp[i][j] |= dp[i - arr[j - 1]][j - 1];\\n            }\\n        }\\n        int sub = sum / k;\\n        for(int i = 0; i <= sum; i += sub){\\n            if(dp[i][n] == false) return false;\\n        }\\n        return true;\\n    }\\n}"
		},
		{
			"lc_ans_id":"108738",
			"view":"1151",
			"top":"4",
			"title":"Clean Python DFS beats 90%",
			"vote":"2",
			"content":"# dfs: ~90%\\n# Instead of remember all sums, this dfs only remember one sum\\n```\\nclass Solution(object):\\n    def canPartitionKSubsets(self, nums, k):\\n        if k==1: return True\\n\\n        self.n=len(nums)\\n        if k>self.n: return False\\n\\n        total=sum(nums)\\n        if total%k: return False\\n\\n        self.target=total/k\\n        visit=[0]*self.n\\n\\n        nums.sort(reverse=True)\\n        def dfs(k,ind,sum,cnt):\\n            if k==1: return True\\n            if sum==self.target and cnt>0:\\n                return dfs(k-1,0,0,0)\\n            for i in range(ind,self.n):\\n                if not visit[i] and sum+nums[i]<=self.target:\\n                    visit[i]=1\\n                    if dfs(k,i+1,sum+nums[i],cnt+1): \\n                        return True\\n                    visit[i]=0\\n            return False\\n\\n        return dfs(k,0,0,0)"
		},
		{
			"lc_ans_id":"108751",
			"view":"1679",
			"top":"5",
			"title":"Easy to understand java solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\n    HashMap<Integer, Integer> map = new HashMap<>();\\n    public boolean canPartitionKSubsets(int[] nums, int k) {\\n        if (nums == null || nums.length == 0 || k == 0) return false;\\n        Arrays.sort(nums);\\n        int sum = 0;\\n        for (int num : nums) sum += num;\\n        if (sum % k != 0 || sum < k) return false;\\n        sum = sum / k;\\n        return possible(nums, sum, new int[k], nums.length - 1);\\n    }\\n    \\n    boolean possible(int[] nums, int sum, int[] p, int idx) {\\n        //System.out.println(idx);\\n        if (idx == -1) {\\n            // for (int s : p) System.out.print(s + \" \");\\n            //System.out.println();\\n            for (int s : p) if (s != sum) return false;\\n            return true;\\n        }\\n        \\n        int num = nums[idx];\\n        \\n        for (int i = 0; i < p.length; i++) {\\n            if (p[i] + num <= sum) {\\n                p[i] += num;\\n                if (possible(nums, sum, p, idx - 1)) return true;\\n                p[i] -= num;\\n            }\\n        }\\n        return false;\\n    }    \\n}\\n```"
		},
		{
			"lc_ans_id":"108747",
			"view":"345",
			"top":"6",
			"title":"Python Backtracking without TLE,easy to understand",
			"vote":"1",
			"content":"The key points to avoid TLE, 1. reverse sort the array, to check the biggest number first, 2. if any single num is great than the average, return false immediately\\n```\\n    def canPartitionKSubsets(self, A, k):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type k: int\\n        :rtype: bool\\n        \"\"\"\\n        def dfs(A,target,step,num,k):\\n            if step==k-1:         # if previous k-1 subset has the average value, then the sum of the rest must be the average\\n                return True\\n            n=len(A)\\n            for i in xrange(n):\\n                B=A[:i]+A[i+1:]\\n                if num+A[i]==target:\\n                    if dfs(B,target,step+1,0,k):  # if sum of previous number and current number is the average, the step plus 1, \\n                        return True\\n                elif num+A[i]<target:\\n                    if dfs(B,target,step,num+A[i],k):\\n                        return True\\n                elif num==0: return False  #if any single num is great than the average, return false immediately\\n            return False\\n\\n        n,total=len(A),sum(A)\\n        if total%k!=0: return False\\n        target=total/k\\n        A.sort(reverse=True)     # reverse  sort to check bigest number first\\n        res=dfs(A,target,0,0,k)\\n        return res"
		},
		{
			"lc_ans_id":"108745",
			"view":"300",
			"top":"7",
			"title":"discrete knapsack problem using dp",
			"vote":"1",
			"content":"This can be solved using discrete knapsack solution\\n```\\nclass Solution {\\npublic:\\n    bool canPartitionKSubsets(vector<int>& nums, int k) {\\n        int sum0=accumulate(nums.begin(),nums.end(),0);\\n        if(sum0%k) return 0;\\n        //discrete knapsack without repetition\\n\\n        int n=nums.size();\\n        vector<vector<int>> value(sum0/k+1,vector<int>(n+1));\\n        for(int i=1;i<=n;i++)\\n        {\\n            int wi=nums[i-1];\\n            //cout<<wi<<endl;\\n            for(int w=1;w<=sum0/k;w++) //all smaller problems\\n            {\\n                value[w][i]=value[w][i-1];//if w>wi then it use previous value\\n                if(w>=wi)\\n                {\\n                    value[w][i]=max(value[w-wi][i-1]+wi,value[w][i-1]);                    \\n                }\\n            }\\n         }\\n        return value[sum0/k][n]==sum0/k;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108762",
			"view":"242",
			"top":"8",
			"title":"C++ solution use backtrace",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    bool fun(vector<int>& nums, int idx, int sum){\\n        if( sum == 0 ){\\n            return true;\\n        }\\n        for( int i = 0; i<nums.size(); i++){\\n            if( nums[i] == 0 )\\n                continue;\\n            if( sum - nums[i]>=0 ){\\n                int tmp = nums[i];\\n                nums[i] = 0;\\n                if( fun(nums, i, sum-tmp ) ){\\n                    return true;\\n                }\\n                nums[i] = tmp;\\n            }else{\\n                return false;\\n            }\\n        }\\n        return false;   \\n    }\\n    bool canPartitionKSubsets(vector<int>& nums, int k) {\\n        \\n        int sum = 0;\\n        sort(nums.begin(), nums.end());\\n        reverse(nums.begin(), nums.end());\\n        for( int i = 0; i<nums.size(); i++){\\n            sum += nums[i];\\n        }\\n        sum /= k;\\n        for(int  i= 0; i<k; i++){\\n            if(!fun(nums, 0, sum)){\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108727",
			"view":"19",
			"top":"9",
			"title":"11ms Java DFS solution.",
			"vote":"0",
			"content":"Inspired by @vincent-cai 's  [solution](https://discuss.leetcode.com/topic/107185/java-c-straightforward-dfs-solution).\\n\\n```\\npublic boolean canPartitionKSubsets(int[] nums, int k) {\\n        int sum = 0;\\n        for (int n : nums) sum += n;\\n        if (sum % k != 0) return false;\\n        Arrays.sort(nums);\\n        boolean[] usage = new boolean[nums.length];\\n        return findPartition(nums, usage, 0, 0, sum / k, k);\\n    }\\n\\n    private boolean findPartition(int[] nums, boolean[] usage, int startIndex, int currentSum, int target, int pairsToFind) {\\n        if (pairsToFind == 1) return true;\\n\\n        for (int i = startIndex; i < nums.length; i++) {\\n            if (usage[i]) continue;\\n            int sum = currentSum + nums[i];\\n            if (sum < target) {\\n                usage[i] = true;\\n                if (findPartition(nums, usage, i + 1, sum, target, pairsToFind)) return true;\\n                usage[i] = false;\\n            } else if (sum == target) {\\n                usage[i] = true;\\n                boolean result = findPartition(nums, usage, 0,0, target, pairsToFind - 1);\\n                usage[i] = false;\\n                return result;\\n            } else return false;\\n\\n        }\\n        return false;\\n    }\\n```"
		}
	],
	"id":"675",
	"title":"Partition to K Equal Sum Subsets",
	"content":"<p>Given an array of integers <code>nums</code> and a positive integer <code>k</code>, find whether it's possible to divide this array into <code>k</code> non-empty subsets whose sums are all equal.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> nums = [4, 3, 2, 3, 5, 2, 1], k = 4\r\n<b>Output:</b> True\r\n<b>Explanation:</b> It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li><code>1 <= k <= len(nums) <= 16</code>.</li>\r\n<li><code>0 < nums[i] < 10000</code>.</li>\r\n</p>",
	"frequency":"230",
	"ac_num":"9866"
}