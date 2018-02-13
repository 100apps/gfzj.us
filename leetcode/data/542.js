{
	"difficulty":"1",
	"submit_num":"94602",
	"show_id":"561",
	"leetcode_id":"561",
	"answers":[
		{
			"lc_ans_id":"102170",
			"view":"28046",
			"top":"0",
			"title":"Java Solution, Sorting. And rough proof of algorithm.",
			"vote":"123",
			"content":"The algorithm is first sort the input array and then the sum of 1st, 3rd, 5th..., is the answer. \\n```\\npublic class Solution {\\n    public int arrayPairSum(int[] nums) {\\n        Arrays.sort(nums);\\n        int result = 0;\\n        for (int i = 0; i < nums.length; i += 2) {\\n            result += nums[i];\\n        }\\n        return result;\\n    }\\n}\\n```\\nLet me try to prove the algorithm...\\n1. Assume in each pair ```i```, ```bi >= ai```. \\n2. Denote ```Sm = min(a1, b1) + min(a2, b2) + ... + min(an, bn)```. The biggest ```Sm``` is the answer of this problem. Given ```1```, ```Sm = a1 + a2 + ... + an```.\\n3. Denote ```Sa = a1 + b1 + a2 + b2 + ... + an + bn```. ```Sa``` is constant for a given input.\\n4. Denote ```di = |ai - bi|```. Given ```1```, ```di = bi - ai```. Denote ```Sd = d1 + d2 + ... + dn```.\\n5. So ```Sa = a1 + a1 + d1 + a2 + a2 + d2 + ... + an + an + dn = 2Sm + Sd``` => ```Sm = (Sa - Sd) / 2```. To get the max ```Sm```, given ```Sa``` is constant, we need to make ```Sd``` as small as possible.\\n6. So this problem becomes finding pairs in an array that makes sum of ```di``` (distance between ```ai``` and ```bi```) as small as possible. Apparently, sum of these distances of adjacent elements is the smallest. If that's not intuitive enough, see attached picture. Case 1 has the smallest ```Sd```.\\n![0_1492961937328_leetcode561.jpg](/uploads/files/1492961944408-leetcode561.jpg)"
		},
		{
			"lc_ans_id":"102175",
			"view":"16125",
			"top":"1",
			"title":"Please explain: The question doesn't make sense.",
			"vote":"68",
			"content":"So if we are given [1.2.3.4], is this a possibility?\\n\\n(1,4) and (2,3)\\n\\nIn that case, won't the correct answer be 5. Our goal is to get the largest possible sum from the above 4 integers. So, how can 4 be the answer?\\n\\nThanks"
		},
		{
			"lc_ans_id":"102160",
			"view":"15417",
			"top":"2",
			"title":"c++ code O(n),beats 100%",
			"vote":"24",
			"content":"```\\nclass Solution {\\npublic:\\n    int arrayPairSum(vector<int>& nums) {\\n        vector<int> hashtable(20001,0);\\n        for(size_t i=0;i<nums.size();i++)\\n        {\\n            hashtable[nums[i]+10000]++;\\n        }\\n        int ret=0;\\n        int flag=0;\\n        for(size_t i=0;i<20001;){\\n            if((hashtable[i]>0)&&(flag==0)){\\n                ret=ret+i-10000;\\n                flag=1;\\n                hashtable[i]--;\\n            }else if((hashtable[i]>0)&&(flag==1)){\\n                hashtable[i]--;\\n                flag=0;\\n            }else i++;\\n        }\\n        return ret;\\n    }\\n};\\n```\\nwith the range of numbers,it is easy to using vector,and if we don't know the range of numbers,maybe using STL multiset,but using multiset is O(nlogn)."
		},
		{
			"lc_ans_id":"102161",
			"view":"9637",
			"top":"3",
			"title":"Python 1 line (sorting is accepted)",
			"vote":"16",
			"content":"```\\nclass Solution(object):\\n\\n    def arrayPairSum(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        return sum(sorted(nums)[::2])"
		},
		{
			"lc_ans_id":"102179",
			"view":"5773",
			"top":"4",
			"title":"Python, Simple with Explanation",
			"vote":"11",
			"content":"Consider the smallest element ```x```.  It should be paired with the next smallest element, because ```min(x, anything) = x```, and having bigger elements only helps you have a larger score.  Thus, we should pair adjacent elements together in the sorted array.\\n\\n```\\ndef arrayPairSum(self, A):\\n    return sum(sorted(A)[::2])\\n```"
		},
		{
			"lc_ans_id":"102180",
			"view":"1839",
			"top":"5",
			"title":"Java O(n) beats 100%",
			"vote":"9",
			"content":"inspired by [c++ code O(n),beats 100%](https://discuss.leetcode.com/topic/87483/c-code-o-n-beats-100)\\n```\\npublic class Solution {\\n\\n\\tpublic int arrayPairSum(int[] nums) {\\n\\t\\tint[] exist = new int[20001];\\n\\t\\tfor (int i = 0; i < nums.length; i++) {\\n\\t\\t\\texist[nums[i] + 10000]++;\\n\\t\\t}\\n\\t\\tint sum = 0;\\n\\t\\tboolean odd = true;\\n\\t\\tfor (int i = 0; i < exist.length; i++) {\\n\\t\\t\\twhile (exist[i] > 0) {\\n\\t\\t\\t\\tif (odd) {\\n\\t\\t\\t\\t\\tsum += i - 10000;\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\todd = !odd;\\n\\t\\t\\t\\texist[i]--;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn sum;\\n\\t}\\n\\t\\n}\\n```"
		},
		{
			"lc_ans_id":"102208",
			"view":"2763",
			"top":"6",
			"title":"[C++] Clean Code - 1 sentence explanation",
			"vote":"8",
			"content":"In short, the sum of all number is fixed, to maximize the sum of smaller group, you want to minimize the diff of the sum of 2 groups.\\nAnd the best way to do that is to pair the numbers that are next to each other in sorted order.\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int arrayPairSum(vector<int>& nums) {\\n        int sum = 0;\\n        sort(nums.begin(), nums.end());\\n        for (int i = 0; i < nums.size(); i += 2) {\\n            sum += nums[i];\\n        }\\n        \\n        return sum;\\n    }\\n};\\n```\\n\\n**Java**\\n```\\nclass Solution {\\n    public int arrayPairSum(int[] nums) {\\n        int sum = 0;\\n        Arrays.sort(nums);\\n        for (int i = 0; i < nums.length; i += 2) {\\n            sum += nums[i];\\n        }\\n        \\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102169",
			"view":"1235",
			"top":"7",
			"title":"share my java solution! beat 90%!",
			"vote":"6",
			"content":"```\\npublic class Solution {\\n    public int arrayPairSum(int[] nums) {\\n         int[] hash=new int[20001];\\n         for(int ele:nums){\\n             hash[ele+10000]++;\\n         }\\n         int sum=0;\\n         int p=0;\\n         for(int i=0;i<20001;i++){\\n             if(hash[i]==0) continue;\\n             while(hash[i]!=0){\\n                 if(p%2==0){\\n                     sum+=(i-10000);\\n                 }\\n                 p++;\\n                 hash[i]--;\\n             }\\n         }\\n         return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102196",
			"view":"352",
			"top":"8",
			"title":"C simple solution",
			"vote":"3",
			"content":"```\\nint arrayPairSum(int* nums, int numsSize) {\\n    int i, bucket[20001]={0};\\n    int Flag=1,reg=0,count=0;\\n    for(i=0;i<numsSize;i++)\\n        bucket[nums[i]+10000]++;\\n    for(i=0;i<20001&&count<numsSize/2;)   // Use count variable can reduce iteration times\\n    {\\n        if(bucket[i]>0)\\n        {\\n            if(Flag)\\n            {\\n                Flag=0;\\n                reg+=i-10000;\\n                bucket[i]--;\\n                count++;\\n            }\\n            else\\n            {\\n                Flag=1;\\n                bucket[i]--;\\n            }\\n                \\n        }\\n        else i++;\\n    }\\n    return reg;\\n}\\n```"
		},
		{
			"lc_ans_id":"102201",
			"view":"530",
			"top":"9",
			"title":"Python solution with detailed explanation",
			"vote":"2",
			"content":"**Solution with detailed discussion** https://discuss.leetcode.com/topic/91279/python-solution-with-detailed-explanation\\n\\n**Array Partition I** https://leetcode.com/problems/array-partition-i/#/description\\n\\n**Editorial** https://leetcode.com/articles/array-partitioning-i/\\n\\n**Bruteforce**\\n* Find all permutations and then imagine each adjacent pair being pairs.\\n\\n**Sorting based solution**\\n1. For an optimized solution, begin with an example arr = [4,3,1,2]\\n2. Sort this array. arr = [1,2,3,4]\\n3. Now note that 1 needs to be a paired with a larger number. What is the number we would like to sacrifice? Clearly the smallest possible.\\n4. This gives the insight: sort and pair adjacent numbers.\\n5. Sorting takes Nlg(N) and space lg(N).\\n\\n```\\nclass Solution(object):\\n    def arrayPairSum(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        nums.sort()\\n        s_so_far = 0\\n        for i in range(0, len(nums)-1, 2):\\n            s_so_far += nums[i]\\n        return s_so_far\\n```\\n\\n**Hashing based solution**\\n1. We use the same idea to pair adjacent elements, but instead use a counting sort approach.\\n2. Range of numbers is -10k to 10k. This means 20001 elements.\\n3. Build the frequency map for the input.\\n4. Now iterate this map. When frequency is even, the contribution is the implied number times freq//2. When odd, it is (implied number) times (freq//2 + 1).\\n5. Implied number: (idx-10000)\\n6. The time and space complexity is order K where K is the range of the numbers.\\n\\n```\\nclass Solution(object):\\n    def arrayPairSum(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        res = [0]*20001\\n        for x in nums:\\n            res[x+10000] += 1\\n        s_so_far, adjust = 0, False\\n        for idx, freq in enumerate(res):\\n            if freq:\\n                freq = freq-1 if adjust else freq\\n                if freq&1:\\n                    s_so_far += ((freq//2) + 1)*(idx-10000)\\n                    adjust = True\\n                else:\\n                    s_so_far += ((freq//2))*(idx-10000)\\n                    adjust = False\\n        return s_so_far\\n```"
		}
	],
	"id":"542",
	"title":"Array Partition I",
	"content":"<p>\r\nGiven an array of <b>2n</b> integers, your task is to group these integers into <b>n</b> pairs of integer, say (a<sub>1</sub>, b<sub>1</sub>), (a<sub>2</sub>, b<sub>2</sub>), ..., (a<sub>n</sub>, b<sub>n</sub>) which makes sum of min(a<sub>i</sub>, b<sub>i</sub>) for all i from 1 to n as large as possible.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,4,3,2]\r\n\r\n<b>Output:</b> 4\r\n<b>Explanation:</b> n is 2, and the maximum sum of pairs is 4 = min(1, 2) + min(3, 4).\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li><b>n</b> is a positive integer, which is in the range of [1, 10000].</li>\r\n<li>All the integers in the array will be in the range of [-10000, 10000].</li>\r\n</ol>\r\n</p>",
	"frequency":"599",
	"ac_num":"62994"
}