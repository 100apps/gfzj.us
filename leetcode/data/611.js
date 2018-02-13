{
	"difficulty":"1",
	"submit_num":"58370",
	"show_id":"633",
	"leetcode_id":"633",
	"answers":[
		{
			"lc_ans_id":"104930",
			"view":"7551",
			"top":"0",
			"title":"Java Two Pointers Solution",
			"vote":"31",
			"content":"```\\npublic class Solution {\\n    public boolean judgeSquareSum(int c) {\\n        if (c < 0) {\\n            return false;\\n        }\\n        int left = 0, right = (int)Math.sqrt(c);\\n        while (left <= right) {\\n            int cur = left * left + right * right;\\n            if (cur < c) {\\n                left++;\\n            } else if (cur > c) {\\n                right--;\\n            } else {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"104973",
			"view":"3577",
			"top":"1",
			"title":"Python, Straightforward with Explanation",
			"vote":"9",
			"content":"```\\ndef judgeSquareSum(self, c):\\n    def is_square(N):\\n        return int(N**.5)**2 == N\\n        \\n    return any(is_square(c - a*a) \\n                for a in xrange(int(c**.5) + 1))\\n```\\n\\nWithout loss of generality, let's consider only ```a, b >= 0```.  This is because if say, ```a < 0```, then we may also find a solution using ```abs(a)```.\\n\\nNow, ```a*a = c - b*b <= c```, because ```b*b >= 0```, and ```0 <= a <= sqrt(c)``` is a necessary condition for a solution.\\n\\nLet's try each ```0 <= a <= sqrt(c)```.  For each choice of ```a```, we must have ```b*b = c - a*a```.  There will be a solution if and only if the right-hand-side is a perfect square."
		},
		{
			"lc_ans_id":"104932",
			"view":"1451",
			"top":"2",
			"title":"HashSet, Java, quick solution, one for loop",
			"vote":"8",
			"content":"```\\npublic class Solution {\\n    public boolean judgeSquareSum(int c) {\\n        HashSet<Integer> set = new HashSet<Integer>();\\n        \\n        for (int i = 0; i <= Math.sqrt(c); i++) {\\n            set.add(i * i);\\n            if (set.contains(c - i * i)) {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n}"
		},
		{
			"lc_ans_id":"104940",
			"view":"3380",
			"top":"3",
			"title":"Java 3-Liner",
			"vote":"7",
			"content":"```\\npublic static boolean judgeSquareSum(int c) {\\n  for (int i=0;i<=Math.sqrt(c);i++) \\n    if (Math.floor(Math.sqrt(c-i*i)) == Math.sqrt(c-i*i)) return true;\\n  return false;\\n}  \\n```"
		},
		{
			"lc_ans_id":"104935",
			"view":"1490",
			"top":"4",
			"title":"Fermat",
			"vote":"6",
			"content":"As [said earlier](https://discuss.leetcode.com/topic/23808/o-sqrt-n-in-ruby-c-c), a natural number is a sum of two squares if and only if each prime factor that's 3 modulo 4 occurs to an even power in the number's prime factorization.\\n```\\nrequire 'prime'\\n\\ndef judge_square_sum(c)\\n  c == 0 || c.prime_division.all? { |p, e| p % 4 != 3 || e.even? }\\nend\\n```"
		},
		{
			"lc_ans_id":"104970",
			"view":"289",
			"top":"5",
			"title":"C++ very simple O(1) space solution",
			"vote":"5",
			"content":"```\\nbool judgeSquareSum(int c) {\\n        for(int i=0;i<=sqrt(c);i++) {\\n            int t=sqrt(c-i*i);\\n            if(t*t==c-i*i) return true;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"104938",
			"view":"591",
			"top":"6",
			"title":"Simple C++ Solution",
			"vote":"3",
			"content":"```\\nbool judgeSquareSum(int c) {\\n        int a = 0;\\n        int b = sqrt(c);\\n        \\n        while(a <= b){\\n            \\n            if(a*a + b*b == c)return true;\\n            else if(a*a + b*b > c)b--;\\n            else a++;\\n        }\\n        return false;\\n    }\\n```"
		},
		{
			"lc_ans_id":"104964",
			"view":"458",
			"top":"7",
			"title":"16ms - Java",
			"vote":"2",
			"content":"```\\npublic boolean judgeSquareSum(int c) {\\n        int i=0;\\n        int j = (int) Math.sqrt(c);\\n        while(i<=j){\\n            if((i*i + j*j) < c) i++;\\n            else if((i*i + j*j) > c) j--;\\n            else return true;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"104948",
			"view":"724",
			"top":"8",
			"title":"Swift solution - Binary Search, Set, Two Pointers",
			"vote":"2",
			"content":"```\\nclass Solution {\\n    func judgeSquareSum_BinarySearch(_ c: Int) -> Bool {\\n        let sqrtC = Int(sqrt(Double(c)))\\n        \\n        for i in 0...sqrtC {\\n            var left = i\\n            var right = sqrtC\\n            let middle = (i + sqrtC) / 2\\n            while left <= right {\\n                if i * i + middle * middle == c {\\n                    return true\\n                } else if i * i + middle * middle < c {\\n                    left = middle + 1\\n                } else {\\n                    right = middle - 1\\n                }\\n            }\\n        }\\n        \\n        return false\\n    }\\n    \\n    func judgeSquareSum_TwoPointer(_ c: Int) -> Bool {\\n        var left = 0\\n        var right = Int(sqrt(Double(c)))\\n        \\n        while left <= right {\\n            let sum = left * left + right * right\\n            if sum == c {\\n                return true\\n            } else if sum < c {\\n                left += 1\\n            } else {\\n                right -= 1\\n            }\\n        }\\n        \\n        return false\\n    }\\n    \\n    func judgeSquareSum_Set(_ c: Int) -> Bool {\\n        var set = Set<Int>()\\n        \\n        for i in 0...Int(sqrt(Double(c))) {\\n            let i2 = i * i\\n            set.insert(i2)\\n            if set.contains(c - i2) {\\n                return true\\n            }\\n        }\\n        \\n        return false\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104966",
			"view":"327",
			"top":"9",
			"title":"Python - 2sum modified",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def judgeSquareSum(self, c):\\n        \"\"\"\\n        :type c: int\\n        :rtype: bool\\n        \"\"\"\\n        maxs = 1\\n        while (maxs * maxs) < c :\\n            maxs +=1 \\n        \\n        \\n        lo = 0\\n        hi = maxs\\n        while lo <= hi:\\n            if ((lo * lo) + (hi * hi)) == c :\\n                return True\\n            if ((lo * lo) + (hi * hi)) < c :\\n                lo += 1\\n            if ((lo * lo) + (hi * hi)) > c :\\n                hi -= 1\\n        \\n        # Bruthe force until maxs O(n^2)\\n        # for i in range(1,maxs):\\n        #    for j in range(1,maxs):\\n        #        if c == (i*i + j*j):\\n        #            return True\\n        \\n        return False"
		}
	],
	"id":"611",
	"title":"Sum of Square Numbers",
	"content":"<p>\r\nGiven a non-negative integer <code>c</code>, your task is to decide whether there're two integers <code>a</code> and <code>b</code> such that a<sup>2</sup> + b<sup>2</sup> = c.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> 5\r\n<b>Output:</b> True\r\n<b>Explanation:</b> 1 * 1 + 2 * 2 = 5\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> 3\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n",
	"frequency":"199",
	"ac_num":"18932"
}