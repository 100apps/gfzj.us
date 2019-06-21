{
	"difficulty":"2",
	"submit_num":"36020",
	"show_id":"673",
	"leetcode_id":"673",
	"answers":[
		{
			"lc_ans_id":"107293",
			"view":"9274",
			"top":"0",
			"title":"[Java/C++] Simple dp solution with explanation",
			"vote":"34",
			"content":"The idea is to use two arrays ```len[n]``` and ```cnt[n]``` to record the maximum length of Increasing Subsequence and the coresponding number of these sequence which ends with ```nums[i]```, respectively. That is:\\n\\n```len[i]```: the length of the Longest Increasing Subsequence which ends with ```nums[i]```.\\n```cnt[i]```: the number of the Longest Increasing Subsequence which ends with ```nums[i]```.\\n\\nThen, the result is the sum of each ```cnt[i]``` while its corresponding ```len[i]``` is the maximum length.\\n\\nJava version:\\n```\\npublic int findNumberOfLIS(int[] nums) {\\n        int n = nums.length, res = 0, max_len = 0;\\n        int[] len =  new int[n], cnt = new int[n];\\n        for(int i = 0; i<n; i++){\\n            len[i] = cnt[i] = 1;\\n            for(int j = 0; j <i ; j++){\\n                if(nums[i] > nums[j]){\\n                    if(len[i] == len[j] + 1)cnt[i] += cnt[j];\\n                    if(len[i] < len[j] + 1){\\n                        len[i] = len[j] + 1;\\n                        cnt[i] = cnt[j];\\n                    }\\n                }\\n            }\\n            if(max_len == len[i])res += cnt[i];\\n            if(max_len < len[i]){\\n                max_len = len[i];\\n                res = cnt[i];\\n            }\\n        }\\n        return res;\\n    }\\n```\\n\\nC++ version: (use ```vector<pair<int, int>> dp``` to combine ```len[]``` and ```cnt[]```)\\n```\\n    int findNumberOfLIS(vector<int>& nums) {\\n        int n = nums.size(), res = 0, max_len = 0;\\n        vector<pair<int,int>> dp(n,{1,1});            //dp[i]: {length, number of LIS which ends with nums[i]}\\n        for(int i = 0; i<n; i++){\\n            for(int j = 0; j <i ; j++){\\n                if(nums[i] > nums[j]){\\n                    if(dp[i].first == dp[j].first + 1)dp[i].second += dp[j].second;\\n                    if(dp[i].first < dp[j].first + 1)dp[i] = {dp[j].first + 1, dp[j].second};\\n                }\\n            }\\n            if(max_len == dp[i].first)res += dp[i].second;\\n            if(max_len < dp[i].first){\\n                max_len = dp[i].first;\\n                res = dp[i].second;\\n            }\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"107318",
			"view":"3615",
			"top":"1",
			"title":"C++, DP with explanation, O(n^2)",
			"vote":"9",
			"content":"The solution is based on DP. \\n```\\nFor a sequence of numbers,\\ncnt[k] is total number of longest subsequence ending with nums[k];\\nlen[k] is the length of longest subsequence ending with nums[k];\\n```\\nThen we have following equations \\n```\\nlen[k+1] = max(len[k+1], len[i]+1) for all i <= k and nums[i] < nums[k+1];\\ncnt[k+1] = sum(cnt[i]) for all i <= k and nums[i] < nums[k+1] and len[i] = len[k+1]-1;\\n```\\nStarting case and default case: cnt[0] = len[0] = 1;\\n```\\nclass Solution {\\npublic:\\n    int findNumberOfLIS(vector<int>& nums) {\\n        int n = nums.size(), maxlen = 1, ans = 0;\\n        vector<int> cnt(n, 1), len(n, 1);\\n        for (int i = 1; i < n; i++) {\\n            for (int j = 0; j < i; j++) {\\n                if (nums[i] > nums[j]) {\\n                    if (len[j]+1 > len[i]) {\\n                        len[i] = len[j]+1;\\n                        cnt[i] = cnt[j];\\n                    }\\n                    else if (len[j]+1 == len[i]) \\n                        cnt[i] += cnt[j];\\n                }\\n            }\\n            maxlen = max(maxlen, len[i]);\\n        }\\n        // find the longest increasing subsequence of the whole sequence\\n       // sum valid counts\\n        for (int i = 0; i < n; i++) \\n            if (len[i] == maxlen) ans += cnt[i];\\n        return ans;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"107320",
			"view":"2278",
			"top":"2",
			"title":"Python DP with explanation (Beats 88%)",
			"vote":"6",
			"content":"If you have not solved the [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) problem, you should do so before attempting this question. The approach is very similar and only requires augmentation of the DP array.\\n\\nIn the Longest Increasing Subsequence problem, the DP array simply had to store the longest length. In this variant, each element in the DP array needs to store two things: (1) Length of longest subsequence ending at this index and (2) Number of longest subsequences that end at this index. I use a two element list for this purpose.\\n\\nIn each loop as we build up the DP array, find the longest length for this index and then sum up the numbers at these indices that contribute to this longest length.\\n\\nHere I provide two versions: (1) A slower but easier to understand version and (2) Much faster and optimized version\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def findNumberOfLIS(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        # Time: O(n^2)\\n        # Space: O(n)\\n        dp, longest = [[1, 1] for i in range(len(nums))], 1\\n        for i, num in enumerate(nums):\\n            curr_longest, count = 1, 0\\n            for j in range(i):\\n                if nums[j] < num:\\n                    curr_longest = max(curr_longest, dp[j][0] + 1)\\n            for j in range(i):\\n                if dp[j][0] == curr_longest - 1 and nums[j] < num:\\n                    count += dp[j][1]\\n            dp[i] = [curr_longest, max(count, dp[i][1])]\\n            longest = max(curr_longest, longest)\\n        return sum([item[1] for item in dp if item[0] == longest])\\n```\\n\\nThe counting step can be optimized such that we don't count from the start when we find a longer `max_len`. This improved the speed from 10% to 88%.\\n\\n```\\nclass Solution(object):\\n    def findNumberOfLIS(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        dp = [[1, 1] for i in range(len(nums))]\\n        max_for_all = 1\\n        for i, num in enumerate(nums):\\n            max_len, count = 1, 0\\n            for j in range(i):\\n                if nums[j] < num:\\n                    if dp[j][0] + 1 > max_len:\\n                        max_len = dp[j][0] + 1\\n                        count = 0 \\n                    if dp[j][0] == max_len - 1:\\n                        count += dp[j][1]\\n            dp[i] = [max_len, max(count, dp[i][1])]\\n            max_for_all = max(max_len, max_for_all)\\n        return sum([item[1] for item in dp if item[0] == max_for_all])\\n```"
		},
		{
			"lc_ans_id":"107303",
			"view":"442",
			"top":"3",
			"title":"python DP solution with DETAILED explanation",
			"vote":"4",
			"content":"Well this question is based on problem [#300 Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) problem. In problem #300, dp solution is quite easy to come forward, which can be written as follow:\\n\\n```\\nclass Solution(object):\\n    def lengthOfLIS(self, nums):\\n        if not nums:\\n            return 0\\n        dp,ans = [1]* len(nums),1\\n        for i in range(1,len(nums)):\\n            dp[i]=max([dp[j]+1 for j in range(i) if nums[i]>nums[j]]+[1])\\n            ans=max(ans,dp[i])\\n        return ans\\n```\\n\\nHere ```dp[i]``` represents ```the length of the longest subsequence  in nums[:i+1] && ended with index i```. And when I calculate array ```dp```, I just update the result, stored in ```ans```.\\n\\nSo now let's back to this problem, the biggest difference here is that **we also need to find the number of the longest subsequence**. A basic idea is to use another array to memorize the number, so the code is as follow:\\n\\n```\\nclass Solution(object):\\n    def findNumberOfLIS(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        if not nums:\\n            return 0\\n        dp1,dp2 = [1]* len(nums),[1]*len(nums)\\n        count,maxval=1,1\\n        for i in range(1,len(nums)):\\n            for j in range(i):\\n                if nums[i]>nums[j]:\\n                    if dp1[j]+1>dp1[i]:\\n                        dp1[i],dp2[i]=dp1[j]+1,dp2[j]\\n                    elif dp1[j]+1==dp1[i]:\\n                        dp2[i]+=dp2[j]\\n\\n            if dp1[i]>maxval:\\n                maxval,count=dp1[i],dp2[i]\\n            elif dp1[i]==maxval:\\n                count+=dp2[i]\\n\\n        return count\\n\\n```\\n ```dp1```  works the same as  ```dp```  in problem #300: it represents ```the length of the longest subsequence  in nums[:i+1] && ended with index i```. \\n\\n```dp2``` represents ```the number of the subsequences which are satisfied the conditions mentioned in above```.\\n\\nAnd also as problem #300, I also update the final result, stored in ```count``` in the loop.\\n\\n```maxval``` represents ```the length of the longest increasing subsequence```.\\n\\n```count``` represents ```the number of the increasing subsequence with length equals to maxval```.\\n\\nThe time complexity is O(n^2)---time,O(n)---space."
		},
		{
			"lc_ans_id":"107298",
			"view":"2289",
			"top":"4",
			"title":"Java with explanation, easy to understand",
			"vote":"2",
			"content":"\\n\\n```\\nclass Solution {\\n    public int findNumberOfLIS(int[] nums) {\\n        if (nums == null || nums.length == 0)\\n            return 0;\\n        int[] maxLens = new int[nums.length];// length of longest increasing sequence start from i\\n        int[] counts = new int[nums.length]; // number of length of longest increasing sequence start from i\\n        int maxLen = 1; // length of longest increasing subsequnce\\n        maxLens[nums.length-1] = 1;\\n        counts[nums.length-1] = 1;\\n\\n        for(int i = nums.length -2; i>=0; i--){//Backward iteration, i is used as the first character\\n            int curMax = 1;\\n            int count = 1;\\n            for(int j = i+1; j < nums.length; j++) {//j is used as the second character\\n                if(nums[i] < nums[j]){//increasing number\\n                    if (curMax == maxLens[j]+1)//means have another way to reach the same max length increasing sequence\\n                        count += counts[j];  //Important: not ++\\n                    else if (curMax < maxLens[j]+1){\\n                        count = counts[j]; \\n                        curMax = maxLens[j]+1; \\n                    }\\n                }\\n            }\\n            maxLens[i] = curMax;\\n            counts[i] = count;\\n            maxLen = Math.max(maxLen, curMax);\\n        }\\n        int count = 0;\\n        for(int i = 0; i< maxLens.length; i++){//check each possible start position\\n            if (maxLens[i] == maxLen)\\n                count += counts[i];\\n        }\\n        return count;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107292",
			"view":"40",
			"top":"5",
			"title":"O(nlgn) solution:c++ 15ms beats 98.24% with promoted DP.",
			"vote":"1",
			"content":"```\\nint findNumberOfLIS(vector<int>& nums) {\\n    map<int,pair<int,int> >end;//key:digits of nums. value:\"largest length of subarray end of 'key'\" and \"number of  such subarray\"\\n    int i=0,l=0,c=0,n=1;//DP iterms:l:largest length of all; c:number of such subarray; n:how many times nums[i] appears continuously.\\n    vector<int>lend;//the end of longest subarray in descend\\n    while(i<nums.size()){\\n        if(i+1<nums.size()&&nums[i]==nums[i+1]){n++;i++;continue;}\\n        int lt=0,ct=0;//lt:length of longest subarray end of nums[i]; ct:number of such subarray\\n        for(int j=lend.size()-1;j>=0&&lend[j]<nums[i];j--)ct+=end[lend[j]].second;\\n        if(!l||ct){//if nums[i] is bigger than some of lend,than update the longest subarray\\n            l++;c=(ct==0?n:ct*n);\\n            lend.clear();lend.push_back(nums[i]);\\n            end[nums[i]]=pair<int,int>(l,c);\\n        }else{//compute the longest subarray end of nums[i]\\n            ct=1;\\n            map<int,pair<int,int> >::iterator it;\\n            for(it=end.begin();it!=end.end()&&it->first<nums[i];it++){\\n                if(lt<it->second.first){lt=it->second.first;ct=it->second.second;}\\n                else if(lt==it->second.first)ct+=it->second.second;\\n            }\\n            lt++;ct*=n;\\n            if(it!=end.end()&&it->first==nums[i]&&lt<=it->second.first){lt=it->second.first;ct+=it->second.second;}\\n            if(lt==l){\\n                if(nums[i]!=lend.back()){lend.push_back(nums[i]);c+=ct;}\\n                else{c=c-end[nums[i]].second+ct;}\\n            }\\n            end[nums[i]]=pair<int,int>(lt,ct);\\n        }\\n        n=1;i++;\\n    }\\n    return c;\\n}\\n```"
		},
		{
			"lc_ans_id":"107331",
			"view":"382",
			"top":"6",
			"title":"Python solution with detailed explanation",
			"vote":"1",
			"content":"**Number of Longest Increasing Subsequence** https://leetcode.com/problems/number-of-longest-increasing-subsequence/description/\\n\\n**DP Solution**\\n* Use the DP solution for LIS. Maintain an array called LIS and cnt. LIS[i] is the length of longest subsequence ending at index i. cnt[i] is the number of longest subsequences ending at index i.\\n* When we find a new LIS for index i, update cnt[i] with cnt[j]. Otherwise if the LIS[i] is the same as LIS[j]+1, simply add cnt[j] to cnt[i].\\n* Return the sum of frequencies of the maximum LIS.\\n* Time complexity is O(N^2) and Space complexity is O(N).\\n```\\nclass Solution:\\n    def findNumberOfLIS(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        if nums == []:\\n            return 0\\n        LIS, cnt = [1]*len(nums), [1]*len(nums)\\n        for i in range(1, len(nums)):\\n            for j in range(0,i):\\n                if nums[i] > nums[j]:\\n                    if LIS[i] == LIS[j]+1:\\n                        cnt[i] += cnt[j]\\n                    elif LIS[i] < LIS[j]+1:\\n                        cnt[i] = cnt[j]\\n                        LIS[i] = LIS[j]+1\\n        return sum((y for x,y in zip(LIS, cnt) if x==max(LIS)))\\n```"
		},
		{
			"lc_ans_id":"107294",
			"view":"85",
			"top":"7",
			"title":"JAVA +DP(with table int[][])",
			"vote":"1",
			"content":"I solved using DP & table. I failed on time but it was fun!\\n\\n\"\"\"\\n\\n    public int findNumberOfLIS(int[] nums) {\\n        // make table\\n        int[][] dic = new int[nums.length][nums.length];\\n\\n        // init for length of 1 subsequences\\n        for(int i = 0; i< nums.length; i++) {\\n            dic[0][i]= 1;\\n        }\\n        \\n        // start with subsequence length 2\\n        for(int size = 1; size < nums.length; size++) {\\n            // full search(can be improved I think)\\n            for(int i = 0; i < nums.length; i++) {\\n                // if can not be reached frin size - 1, conintue\\n                if(dic[size-1][i] == 0) {\\n                    continue;\\n                }\\n                // anchor. must be bigger.\\n                int anchor = nums[i];\\n                // count of the reachable length of (size-1) subsequence\\n                int lastCount = dic[size-1][i];\\n                // must be in right side !\\n                for(int j = i + 1; j< nums.length; j++) {\\n                    // if it's bigger,\\n                    if(anchor < nums[j]) {\\n                        // += the reachable counts\\n                        dic[size][j] += lastCount;\\n                    }\\n                }      \\n            }\\n        }\\n        \\n        // decreasing order.\\n        for(int i = nums.length - 1 ; i >= 0 ; i--) {\\n            int sum = 0;\\n            for(Integer e : dic[i]) {\\n                sum += e;\\n            }\\n            // if there is any reachable count, return it.\\n            if(sum > 0 ) {\\n                return sum;\\n            }\\n        }\\n        return 0;\\n    }\\n\"\"\""
		},
		{
			"lc_ans_id":"107299",
			"view":"543",
			"top":"8",
			"title":"Java solution, DP",
			"vote":"1",
			"content":"```\\nclass Solution {\\n    public int findNumberOfLIS(int[] nums) {\\n        if (nums == null || nums.length == 0) return 0;\\n        int n = nums.length;\\n        \\n        int[] dp = new int[n];\\n        int[] next = new int[n];\\n        dp[n - 1] = 1; next[n - 1] = 1;\\n        int len = 1;\\n        for (int i = n - 2; i >= 0; i--) {\\n            int max = 0, cnt = 0;\\n            for (int j = i + 1; j < n; j++){\\n                if (nums[j] > nums[i]){\\n                    max = Math.max(max, dp[j]);\\n                }\\n            }\\n            dp[i] = max + 1;\\n            len = Math.max(len, dp[i]);\\n            if (dp[i] == 1) next[i] = 1;\\n            else {\\n                for(int j = i + 1; j < n; ++j){\\n                    if(nums[j] > nums[i] && dp[j] == max){\\n                        next[i] += next[j];\\n                    }\\n                }\\n            }\\n        }\\n        \\n        int res = 0;\\n        for (int i = 0; i < n; ++i) {\\n            if (dp[i] == len){\\n                res += next[i];\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107295",
			"view":"23",
			"top":"9",
			"title":"9ms [C++] Explanation: DP + Binary search + prefix sums O(NlogN) time; O(N) space",
			"vote":"0",
			"content":"The idea is to modify classic [LIS solution which uses binary search]( https://en.wikipedia.org/wiki/Longest_increasing_subsequence) to find the \"insertion point\" of a currently processed value. At ```dyn[k]``` we **don't store** a single number representing the smallest value such that there exists a LIS of length ```k+1``` as in classic LIS solution. Instead, at ```dyn[k]``` we store all such values that were once endings of a ```k+1``` LIS (so we keep the history as well). \\nThese values are held in the first part of the pairs in  ```vector<pair<int,int>>``` which we get by indexing ```dyn``` vector. So for example in a pair ```x = {a, b}``` the first part -- ```a```, indicates that there exists a LIS of length ```k+1``` such that it ends with a value ```a```. The second part -- ```b```, represents the number of possible options for which LIS of length ```k+1``` ends with a value equal to or smaller than ```a```. This is the place where we use prefix sums. \\nIf we want to know how many options do we have to end a LIS of length ```m``` with value ```y```, we just binary search for the index ```i``` of a pair with first part strictly less than ```y``` in ```dyn[m-2]```. Then the number of options is ```dyn[m-2].back().second - dyn[m-2][i-1].second``` or just ```dyn[m-2].back()``` if ```i``` is ```0```.\\nThat is the basic idea, the running time is O(NlogN), because we just do 2 binary searches for every element of the input. Space complexity is O(N), as every element of the input will be contained in the ```dyn``` vector exactly once.\\nFeel free to post any corrections or simpler explanations :)\\n```\\nclass Solution {\\npublic:\\n    int findNumberOfLIS(vector<int>& nums) {\\n        if (nums.empty())\\n            return 0;\\n        \\n        vector<vector<pair<int, int>>> dyn(nums.size() + 1);\\n        int max_so_far = 0;\\n        for (int i = 0; i < nums.size(); ++i) {\\n            // bsearch insertion point\\n            int l = 0, r = max_so_far;\\n            while (l < r) {\\n                int mid = l + (r - l) / 2;\\n                if (dyn[mid].back().first < nums[i]) {\\n                    l = mid + 1;\\n                } else {\\n                    r = mid;\\n                }\\n            }\\n            \\n            // bsearch number of options\\n            int options = 1;\\n            int row = l - 1;\\n            if (row >= 0) {\\n                int l1 = 0, r1 = dyn[row].size();\\n                while (l1 < r1) {\\n                    int mid = l1 + (r1 - l1) / 2;\\n                    if (dyn[row][mid].first < nums[i]) {\\n                        r1 = mid;\\n                    } else {\\n                        l1 = mid + 1;\\n                    }\\n                }\\n                \\n                options = dyn[row].back().second;\\n                options -= (l1 == 0) ? 0 : dyn[row][l1 - 1].second;\\n            }\\n            \\n            \\n            dyn[l].push_back({nums[i], (dyn[l].empty() ? options : dyn[l].back().second + options)});\\n            if (l == max_so_far) {\\n                max_so_far++;\\n            }\\n        }\\n        \\n        return dyn[max_so_far-1].back().second;\\n        \\n    }\\n};\\n```"
		}
	],
	"id":"650",
	"title":"Number of Longest Increasing Subsequence",
	"content":"<p>\r\nGiven an unsorted array of integers, find the number of longest increasing subsequence.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,3,5,4,7]\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> The two longest increasing subsequence are [1, 3, 4, 7] and [1, 3, 5, 7].\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [2,2,2,2,2]\r\n<b>Output:</b> 5\r\n<b>Explanation:</b> The length of longest continuous increasing subsequence is 1, and there are 5 subsequences' length is 1, so output 5.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nLength of the given array will be not exceed 2000 and the answer is guaranteed to be fit in 32-bit signed int.\r\n</p>",
	"frequency":"202",
	"ac_num":"11372"
}