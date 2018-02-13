{
	"difficulty":"2",
	"submit_num":"228555",
	"show_id":"229",
	"leetcode_id":"229",
	"answers":[
		{
			"lc_ans_id":"63520",
			"view":"48601",
			"top":"0",
			"title":"Boyer-Moore Majority Vote algorithm and my elaboration",
			"vote":"204",
			"content":"For those who aren't familiar with Boyer-Moore Majority Vote algorithm, \\nI found a great article (http://goo.gl/64Nams) that helps me to understand this fantastic algorithm!!\\nPlease check it out!\\n\\nThe essential concepts is you keep a counter for the majority number **X**. If you find a number **Y** that is not **X**, the current counter should deduce 1. The reason is that if there is 5 **X** and 4 **Y**, there would be one (5-4) more **X** than **Y**. This could be explained as \"4 **X** being paired out by 4 **Y**\".\\n\\nAnd since the requirement is finding the majority for more than ceiling of [n/3], the answer would be less than or equal to two numbers. \\nSo we can modify the algorithm to maintain two counters for two majorities.\\n\\nFollowings are my sample Python code:\\n\\n    class Solution:\\n    # @param {integer[]} nums\\n    # @return {integer[]}\\n    def majorityElement(self, nums):\\n        if not nums:\\n            return []\\n        count1, count2, candidate1, candidate2 = 0, 0, 0, 1\\n        for n in nums:\\n            if n == candidate1:\\n                count1 += 1\\n            elif n == candidate2:\\n                count2 += 1\\n            elif count1 == 0:\\n                candidate1, count1 = n, 1\\n            elif count2 == 0:\\n                candidate2, count2 = n, 1\\n            else:\\n                count1, count2 = count1 - 1, count2 - 1\\n        return [n for n in (candidate1, candidate2)\\n                        if nums.count(n) > len(nums) // 3]"
		},
		{
			"lc_ans_id":"63500",
			"view":"21009",
			"top":"1",
			"title":"JAVA-------------------Easy Version To Understand!!!!!!!!!!!!",
			"vote":"85",
			"content":"    \\tpublic List<Integer> majorityElement(int[] nums) {\\n\\t\\tif (nums == null || nums.length == 0)\\n\\t\\t\\treturn new ArrayList<Integer>();\\n\\t\\tList<Integer> result = new ArrayList<Integer>();\\n\\t\\tint number1 = nums[0], number2 = nums[0], count1 = 0, count2 = 0, len = nums.length;\\n\\t\\tfor (int i = 0; i < len; i++) {\\n\\t\\t\\tif (nums[i] == number1)\\n\\t\\t\\t\\tcount1++;\\n\\t\\t\\telse if (nums[i] == number2)\\n\\t\\t\\t\\tcount2++;\\n\\t\\t\\telse if (count1 == 0) {\\n\\t\\t\\t\\tnumber1 = nums[i];\\n\\t\\t\\t\\tcount1 = 1;\\n\\t\\t\\t} else if (count2 == 0) {\\n\\t\\t\\t\\tnumber2 = nums[i];\\n\\t\\t\\t\\tcount2 = 1;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tcount1--;\\n\\t\\t\\t\\tcount2--;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tcount1 = 0;\\n\\t\\tcount2 = 0;\\n\\t\\tfor (int i = 0; i < len; i++) {\\n\\t\\t\\tif (nums[i] == number1)\\n\\t\\t\\t\\tcount1++;\\n\\t\\t\\telse if (nums[i] == number2)\\n\\t\\t\\t\\tcount2++;\\n\\t\\t}\\n\\t\\tif (count1 > len / 3)\\n\\t\\t\\tresult.add(number1);\\n\\t\\tif (count2 > len / 3)\\n\\t\\t\\tresult.add(number2);\\n\\t\\treturn result;\\n\\t}"
		},
		{
			"lc_ans_id":"63522",
			"view":"19169",
			"top":"2",
			"title":"Boyer-Moore Majority Vote algorithm generalization",
			"vote":"63",
			"content":"Boyer-Moore Majority Vote algorithm generalization to elements appear more than floor(n/k) times\\n\\n    class Solution {\\n    public:\\n      vector<int> majorityElement(vector<int> &a) {\\n        int y = 0, z = 1, cy = 0, cz = 0;\\n        for (auto x: a) {\\n          if (x == y) cy++;\\n          else if (x == z) cz++;\\n          else if (! cy) y = x, cy = 1;\\n          else if (! cz) z = x, cz = 1;\\n          else cy--, cz--;\\n        }\\n        cy = cz = 0;\\n        for (auto x: a)\\n          if (x == y) cy++;\\n          else if (x == z) cz++;\\n        vector<int> r;\\n        if (cy > a.size()/3) r.push_back(y);\\n        if (cz > a.size()/3) r.push_back(z);\\n        return r;\\n      }\\n    };"
		},
		{
			"lc_ans_id":"63571",
			"view":"12574",
			"top":"3",
			"title":"My C++ Solution",
			"vote":"57",
			"content":"   \\n    vector<int> majorityElement(vector<int>& nums) {\\n        int cnt1 = 0, cnt2 = 0, a=0, b=1;\\n        \\n        for(auto n: nums){\\n            if (a==n){\\n                cnt1++;\\n            }\\n            else if (b==n){\\n                cnt2++;\\n            }\\n            else if (cnt1==0){\\n                a = n;\\n                cnt1 = 1;\\n            }\\n            else if (cnt2 == 0){\\n                b = n;\\n                cnt2 = 1;\\n            }\\n            else{\\n                cnt1--;\\n                cnt2--;\\n            }\\n        }\\n        \\n        cnt1 = cnt2 = 0;\\n        for(auto n: nums){\\n            if (n==a)   cnt1++;\\n            else if (n==b)  cnt2++;\\n        }\\n        \\n        vector<int> res;\\n        if (cnt1 > nums.size()/3)   res.push_back(a);\\n        if (cnt2 > nums.size()/3)   res.push_back(b);\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"63502",
			"view":"2423",
			"top":"4",
			"title":"6 lines, general case O(N) time and O(k) space",
			"vote":"35",
			"content":"**Solution**\\n\\nI keep up to two candidates in my counter, so this fulfills the O(N) time and O(1) space requirements.\\n\\n    def majorityElement(self, nums):\\n        ctr = collections.Counter()\\n        for n in nums:\\n            ctr[n] += 1\\n            if len(ctr) == 3:\\n                ctr -= collections.Counter(set(ctr))\\n        return [n for n in ctr if nums.count(n) > len(nums)/3]\\n\\n---\\n\\n**Explanation**\\n\\nThink of it this way: Find three different votes and hide them. Repeat until there aren't three different votes left. A number that originally had more than one third of the votes now still has at least one vote, because to hide *all* of its votes you would've had to hide more than three times one third of the votes - more votes than there were. You can easily have false positives, though, so in the end check whether the remaining up to two candidates actually had more than one third of the votes.\\n\\nMy code does just that: Collect (count) the votes for every number, but remove triples of three different votes on the fly, as soon as we have such a triple.\\n\\n---\\n\\n**Generalization to \\u230aN/k\\u230b, still O(N) time but O(k) space**\\n\\nFor the general problem, looking for elements appearing more than \\u230aN/k\\u230b times for some positive integer k, I just have to change my `3` to `k`. Then it already works and takes takes O(k) space and O(kN) time.\\n\\nThe O(kN) time does **not** come from the main loop, though. Yes, each `ctr -= ...` does cost k, but I only have to do it at most N/k times. To put it in terms of the above explanation, I can't hide a vote more than once.\\n\\nNo, the culprit is my last line, counting each remaining candidate separately. If I count them at the same time, I get O(N) again. Here's the full generalized code:\\n\\n    def majorityElement(self, nums, k):\\n        ctr = collections.Counter()\\n        for n in nums:\\n            ctr[n] += 1\\n            if len(ctr) == k:\\n                ctr -= collections.Counter(set(ctr))\\n        ctr = collections.Counter(n for n in nums if n in ctr)\\n        return [n for n in ctr if ctr[n] > len(nums)/k]"
		},
		{
			"lc_ans_id":"63592",
			"view":"7826",
			"top":"5",
			"title":"My O(n) time solution ,20ms",
			"vote":"33",
			"content":"My idea comes from Majority Vote algroithm,[http://www.cs.utexas.edu/~moore/best-ideas/mjrty/index.html][1].Now we vote two numbers simultaneously. if the next number is differents from them both.then the two numbers' votes minus one. If some number's vote comes zero,then vote the next number.Every time vote minus,it is the same that we remove the three numbers from the array.And the majority elemnts of original still are the majority elements  in the end. So check t1 and t2 are the majority elements of original array at last.\\n\\n    vector<int> majorityElement(vector<int>& nums) {\\n            int t1,t2,n1=0,n2=0;  //numbers t1 and t2,votes' numbers n1,and n2.\\n            for(int i=0;i<nums.size();++i)\\n            {\\n                if(n1!=0&&t1==nums[i]){++n1;continue;} \\n                if(n2!=0&&t2==nums[i]){++n2;continue;}\\n                if(n1==0){ t1=nums[i];++n1;continue;}\\n                if(n2==0){ t2=nums[i];++n2;continue;}\\n                --n1;--n2;\\n            }\\n            int z1=0,z2=0;\\n            for(int i=0;i<nums.size();++i)\\n            {\\n                if(n1>0){ if(nums[i]==t1) ++z1;}\\n                if(n2>0) {if(nums[i]==t2) ++z2;}\\n            }\\n            vector<int> ret;\\n             //check t1 and t2.\\n            if(z1>nums.size()/3) ret.push_back(t1);\\n            if(z2>nums.size()/3) ret.push_back(t2);\\n            return ret;\\n        }\\n\\n\\n  [1]: http://www.cs.utexas.edu/~moore/best-ideas/mjrty/index.html"
		},
		{
			"lc_ans_id":"63584",
			"view":"4413",
			"top":"6",
			"title":"Concise JAVA solution based on Moore's Voting Algorithm",
			"vote":"27",
			"content":"**Explanation**\\n\\nThe basic idea is based on Moore's Voting Algorithm, we need two candidates with top 2 frequency. If meeting different number from the candidate, then decrease 1 from its count, or increase 1 on the opposite condition. Once count equals 0, then switch the candidate to the current number. The trick is that we need to count again for the two candidates after the first loop.  Finally, output the numbers appearing more than n/3 times.\\n\\nThanks for [yanggao][1]'s smart advice!\\n\\n\\n    public List<Integer> majorityElement(int[] nums) {\\n    \\t  \\tArrayList<Integer> res = new ArrayList<Integer>();\\n            if (nums.length==0) return res;\\n            \\n            int count[] = new int[2];        \\n            int x[] = new int[2];       \\n       \\n            x[0] = 0; x[1] = 1;        \\n            for (int i = 0; i < nums.length; i++) {\\n            \\tif (x[0] == nums[i])\\n            \\t\\tcount[0]++;\\n            \\telse if (x[1] == nums[i])\\n            \\t\\tcount[1]++;\\n            \\telse if (count[0] == 0) {\\n            \\t\\tx[0] = nums[i];\\n            \\t\\tcount[0] = 1;\\n            \\t} else if (count[1] == 0) {\\n            \\t\\tx[1] = nums[i];\\n            \\t\\tcount[1] = 1;\\n            \\t} else {\\n            \\t\\tcount[0]--;\\n            \\t\\tcount[1]--;        \\t\\t\\n            \\t}\\n            }\\n            \\n            Arrays.fill(count, 0);\\n            for (int i : nums) {// Count again for x1, x2\\n        \\tif (i == x[0]) count[0]++;\\n        \\telse if (i == x[1]) count[1]++;\\n        }\\n        for (int j = 0; j < 2; j++) {\\n        \\tif (count[j] > nums.length/3 && !res.contains(x[j])) res.add(x[j]);\\n        }        \\n        return res;\\n    }\\n\\n\\n  [1]: https://leetcode.com/discuss/user/yanggao"
		},
		{
			"lc_ans_id":"63599",
			"view":"4028",
			"top":"7",
			"title":"Boyer-Moore method Java Implementation.",
			"vote":"22",
			"content":"    public class Solution{\\n    \\tpublic List<Integer> majorityElement(int[] nums){\\n    \\t\\tList<Integer> rst = new ArrayList<Integer>();\\n    \\t\\tif(nums == null || nums.length == 0) return rst;\\n    \\t\\tint count1 = 0, count2 = 0, candidate1 = 0, candidate2 = 1;\\n    \\t\\tfor(int num : nums){\\n    \\t\\t\\tif(num == candidate1) count1++;\\n    \\t\\t\\telse if(num == candidate2) count2++;\\n    \\t\\t\\telse if(count1 == 0){\\n    \\t\\t\\t\\tcandidate1 = num;\\n    \\t\\t\\t\\tcount1 = 1;\\n    \\t\\t\\t}\\n    \\t\\t\\telse if(count2 == 0){\\n    \\t\\t\\t\\tcandidate2 = num;\\n    \\t\\t\\t\\tcount2 = 1;\\n    \\t\\t\\t}\\n    \\t\\t\\telse{\\n    \\t\\t\\t\\tcount1--;\\n    \\t\\t\\t\\tcount2--;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\tcount1 = 0; count2 = 0;\\n    \\t\\tfor(int num : nums){\\n    \\t\\t\\tif(num == candidate1) count1+=2;\\n    \\t\\t\\telse count1--;\\n    \\t\\t\\tif(num == candidate2) count2 += 2;\\n    \\t\\t\\telse count2--;\\n    \\t\\t}\\n    \\t\\tif(count1 > 0) rst.add(candidate1);\\n    \\t\\tif(count2 > 0) rst.add(candidate2);\\n    \\t\\treturn rst;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"63654",
			"view":"2915",
			"top":"8",
			"title":"O(n) time O(1) space",
			"vote":"15",
			"content":"    public class Solution {\\n        public List<Integer> majorityElement(int[] nums) {\\n            List<Integer> rst = new ArrayList<Integer>();\\n            if (nums == null) {\\n                return rst;\\n            }\\n            int n1 = 0, n2 = 0;\\n            int c1 = 0, c2 = 0;\\n            for (int i = 0; i < nums.length; ++i) {\\n                int n3 = nums[i];\\n                if (c1 > 0 && c2 > 0) {\\n                    if (n3 != n1 && n3 != n2) {\\n                        c1--;\\n                        c2--;\\n                    } else if (n3 == n1) {\\n                        c1++;\\n                    } else {\\n                        c2++;\\n                    }\\n                } else if (c1 > 0) {\\n                    if (n3 == n1) {\\n                        c1++;\\n                    } else {\\n                        n2 = n3;\\n                        c2++;\\n                    }\\n                } else if (c2 > 0) {\\n                    if (n3 == n2) {\\n                        c2++;\\n                    } else {\\n                        n1 = n3;\\n                        c1++;\\n                    }\\n                } else {\\n                    n1 = n3;\\n                    c1++;\\n                }\\n            }\\n            c1 = c2 = 0;\\n            for (int i = 0; i < nums.length; ++i) { // n1, n2 are only candidates!!! need to count again!!!\\n                if (nums[i] == n1) {\\n                    c1 ++;\\n                } else if (nums[i] == n2) { //no worry if n1==n2 in some cases, because we only count once.\\n                    c2 ++;\\n                }\\n            }\\n            if (c1 > nums.length/3) {\\n                rst.add(n1);\\n            }\\n            if (c2 > nums.length/3) {\\n                rst.add(n2);\\n            }\\n            return rst;\\n        }\\n    }\\n\\nn1, n2 are 2 distinct numbers. c1, c2 are the count of the 2 numbers.\\nWhenever encounter 3 different numbers, cancel them by decreasing the count. And the remaining 2 numbers (or 1 or 0) are candidates. Scan the array one more time to determine the result."
		},
		{
			"lc_ans_id":"63634",
			"view":"2987",
			"top":"9",
			"title":"C++ solution with explanation, O(n) time and O(1) space",
			"vote":"12",
			"content":"\\n\\nWe can apply the same idea as easy version of majority element. If we remove three elements with different value at the same time, finally we should filter out the majority elements. So in the first pass, we search for possible majority elements (the number of majority element <3), and then for each candidate, we scan the array again to confirm wether it's majority or not.\\n\\n***Updated***\\n Some guys are confused by the first branch, i.e.\\n       \\n\\n     if(nums[i] == candidate1) count1 ++;\\n\\nHere we don't need to verify the value of count1. Why? Because if count1 is 0, and nums[i] = candidate1, \\nwe can still just add one to count1. It's logically safe.\\n\\n\\n----------\\n\\n\\n    class Solution {\\n    public:\\n        vector<int> majorityElement(vector<int>& nums) {\\n            int array_size = nums.size();\\n            int candidate1, candidate2;\\n            int count1 = 0;\\n            int count2 = 0;\\n            for(int i = 0; i < array_size; i ++){\\n                if(nums[i] == candidate1) count1 ++;\\n                else if(nums[i] == candidate2) count2 ++;\\n                else{\\n                    if(count1 && count2) {count1 --; count2 --;}\\n                    else if (count1){candidate2 = nums[i]; count2 = 1;}\\n                    else {candidate1 = nums[i]; count1 = 1;}\\n                }\\n            }\\n            vector<int> candidate;\\n            if(count1 > 0) candidate.push_back(candidate1);\\n            if(count2 > 0) candidate.push_back(candidate2);\\n            vector<int> result;\\n            for(int i = 0; i < candidate.size(); i ++){\\n                int count = 0;\\n                for(int j = 0; j < array_size; j ++){\\n                    if(nums[j] == candidate[i]) count ++;\\n                }\\n                if(count > array_size/3) result.push_back(candidate[i]);\\n            }\\n            return result;\\n        }\\n    };"
		}
	],
	"id":"229",
	"title":"Majority Element II",
	"content":"<p>Given an integer array of size <i>n</i>, find all elements that appear more than <code>&lfloor; n/3 &rfloor;</code> times. The algorithm should run in linear time and in O(1) space.</p>",
	"frequency":"482",
	"ac_num":"66294"
}