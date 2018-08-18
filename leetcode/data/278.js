{
	"difficulty":"1",
	"submit_num":"504502",
	"show_id":"278",
	"leetcode_id":"278",
	"answers":[
		{
			"lc_ans_id":"71296",
			"view":"30631",
			"top":"0",
			"title":"O(lgN) simple Java solution",
			"vote":"94",
			"content":"**The binary search code:**\\n\\n\\tpublic int firstBadVersion(int n) {\\n\\t    int start = 1, end = n;\\n\\t    while (start < end) {\\n\\t        int mid = start + (end-start) / 2;\\n\\t        if (!isBadVersion(mid)) start = mid + 1;\\n\\t        else end = mid;            \\n\\t    }        \\n\\t    return start;\\n\\t}"
		},
		{
			"lc_ans_id":"71311",
			"view":"10311",
			"top":"1",
			"title":"A good warning to me to use  start+(end-start)/2 to avoid overflow",
			"vote":"76",
			"content":"Before this problem, I have always use\\n\\n      mid = (start+end)) / 2;\\n\\nTo get the middle value, but this can caused OVERFLOW ! \\n\\nwhen start and end are all about INT_MAX , then (start+end) of course will be overflow !\\n\\nTo avoid the problem we can use\\n       \\n      mid =  start+(end-start)/2;\\n\\nHere is the AC implementation \\n\\n// Forward declaration of isBadVersion API.\\nbool isBadVersion(int version);\\n\\n    class Solution {\\n    public:\\n        int firstBadVersion(int n) {\\n            int start=0, end=n;\\n            cout<<end-start<<end;\\n            while(end-start>1){\\n                int mid=start+(end-start)/2;\\n                /** mid = (start+end)) / 2; **/\\n                if(isBadVersion(mid))  end=mid;\\n                else  start=mid;\\n            }\\n            return end;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71302",
			"view":"5956",
			"top":"2",
			"title":"Time limit exceed",
			"vote":"33",
			"content":"Is there any difference between \" ( low + high ) / 2 \"  and  \" low + ( high - low ) / 2 \"?\\n\\nWhen I use the first one, it told me \"time limit exceed\" but if I use the second one, it worked!"
		},
		{
			"lc_ans_id":"71312",
			"view":"8313",
			"top":"3",
			"title":"Short C++ answer and minimize API calls",
			"vote":"23",
			"content":"    class Solution {\\n    public:\\n        int firstBadVersion(int n) {\\n            int lower = 1, upper = n, mid;\\n            while(lower < upper) {\\n                mid = lower + (upper - lower) / 2;\\n                if(!isBadVersion(mid)) lower = mid + 1;   /* Only one call to API */\\n                else upper = mid;\\n            }\\n            return lower;   /* Because there will alway be a bad version, return lower here */\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71333",
			"view":"3463",
			"top":"4",
			"title":"1-liner in Ruby / Python",
			"vote":"17",
			"content":"**Ruby**\\n\\n    def first_bad_version(n)\\n      (1..n).bsearch { |i| is_bad_version(i) }\\n    end\\n\\nOr:\\n\\n    def first_bad_version(n)\\n      (1..n).bsearch(&method(:is_bad_version))\\n    end\\n\\n---\\n\\n**Python**\\n\\nIn Python I was only able to do it with a rather ugly wrapper:\\n\\n    def firstBadVersion(self, n):\\n        return bisect.bisect(type('', (), {'__getitem__': lambda self, i: isBadVersion(i)})(), False, 0, n)\\n\\nNicer, more readable version:\\n\\n    def firstBadVersion(self, n):\\n        class Wrap:\\n            def __getitem__(self, i):\\n                return isBadVersion(i)\\n        return bisect.bisect(Wrap(), False, 0, n)"
		},
		{
			"lc_ans_id":"71342",
			"view":"5378",
			"top":"5",
			"title":"What's the difference between \"(left + right) / 2\" and \"left + (right - left) / 2\"?",
			"vote":"14",
			"content":"Below is my code, it got TLE. But I can't see the difference between my code and [this one][1] except for how I calculated mid. So is there any difference between \"(left + right) / 2\" and \"left + (right - left) / 2\"? \\n\\n    bool isBadVersion(int version);\\n    \\n    class Solution {\\n    public:\\n        int firstBadVersion(int n) {\\n            int left = 1;\\n            int right = n;\\n            int mid;\\n            while(left < right) {\\n                mid = (left + right) / 2;\\n                if(isBadVersion(mid)) {\\n                    right = mid - 1;\\n                }\\n                else {\\n                    left = mid + 1;\\n                }\\n            }\\n            return left;\\n        }\\n    };\\n\\n\\n  [1]: https://leetcode.com/discuss/56550/short-c-answer-and-minimize-api-calls"
		},
		{
			"lc_ans_id":"71324",
			"view":"2629",
			"top":"6",
			"title":"Python, understand (easily from Binary search idea)",
			"vote":"12",
			"content":"    class Solution(object):\\n    def firstBadVersion(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: int\\n        \"\"\"\\n        r = n-1\\n        l = 0\\n        while(l<=r):\\n            mid = l + (r-l)/2\\n            if isBadVersion(mid)==False:\\n                l = mid+1\\n            else:\\n                r = mid-1\\n        return l"
		},
		{
			"lc_ans_id":"71408",
			"view":"2289",
			"top":"7",
			"title":"Java simple clean",
			"vote":"7",
			"content":"it looks very simple, but actually a little tricky. Have to pay attention to the detail.\\n<br>\\nAlgo. 1 --\\n\\n      public int firstBadVersion(int n) {\\n        int lo = 1, hi = n;\\n        while (lo < hi) {\\n        \\tint med = lo + (hi -  lo)/2;\\n        \\tif (isBadVersion(med)) {\\n        \\t\\thi = med;\\n        \\t} else {\\n        \\t\\tlo = med + 1;\\n        \\t}\\n        }\\n        return lo;\\n    }\\n\\nAlgo.2 --\\n\\n        public int firstBadVersion(int n) {\\n        int lo = 1, hi = n;\\n        while (lo <= hi) {\\n        \\tint med = lo + (hi -  lo)/2;\\n        \\tif (isBadVersion(med)) {\\n        \\t\\tif (med == 1 || !isBadVersion(med-1))\\n        \\t\\t\\treturn med;\\n        \\t\\thi = med;\\n        \\t} else {\\n        \\t\\tlo = med + 1;\\n        \\t}\\n        }\\n        return -1; //no solution found.\\n    }"
		},
		{
			"lc_ans_id":"71426",
			"view":"1159",
			"top":"8",
			"title":"Java binary search with recursive implement",
			"vote":"5",
			"content":"/* The isBadVersion API is defined in the parent class VersionControl.\\n      boolean isBadVersion(int version); */\\n\\npublic class Solution extends VersionControl {\\n\\n    public int firstBadVersion(int n) {\\n        \\n        if(n==0) {\\n            return 0;\\n        }\\n    \\n       return helper(n,1,n);\\n    }\\n    \\n    \\n    public int helper(int n, int start, int end) {\\n        \\n        if(start>=end) {\\n            return start;\\n        }\\n        int middle = start+(end-start)/2;\\n        \\n        if(isBadVersion(middle)) {\\n            return helper(n,start,middle);\\n        } else {\\n            return helper(n,middle+1,end);\\n            \\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"71420",
			"view":"1804",
			"top":"9",
			"title":"My 0ms c++ solution with O(logn) time and O(1) space",
			"vote":"4",
			"content":"    class Solution {\\n    public:\\n        int firstBadVersion(int n) {\\n            int from,to,mid;\\n            from=1;to=n;\\n            while(from!=to)\\n            {\\n                mid=((long long)from+to)/2;\\n                if(isBadVersion(mid)==true)\\n                {\\n                    to=mid;\\n                }\\n                else\\n                {\\n                    from=mid+1;\\n                }\\n            }\\n            return from;\\n        }\\n    };"
		}
	],
	"id":"278",
	"title":"First Bad Version",
	"content":"<p>\r\nYou are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad. \r\n</p>\r\n\r\n<p>\r\nSuppose you have <code>n</code> versions <code>[1, 2, ..., n]</code> and you want to find out the first bad one, which causes all the following ones to be bad.\r\n</p>\r\n\r\n<p>\r\nYou are given an API <code>bool isBadVersion(version)</code> which will return whether <code>version</code> is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"411",
	"ac_num":"131050"
}