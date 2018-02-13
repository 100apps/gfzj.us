{
	"difficulty":"1",
	"submit_num":"178818",
	"show_id":"374",
	"leetcode_id":"374",
	"answers":[
		{
			"lc_ans_id":"84665",
			"view":"17333",
			"top":"0",
			"title":"The key point is to read the problem carefully.",
			"vote":"73",
			"content":"-1 : My number is lower\\n 1 : My number is higher\\n 0 : Congrats! You got it!\\n\\nHere \"My\" means the number which is given for you to guess not the number you put into      **guess(int num).**"
		},
		{
			"lc_ans_id":"84677",
			"view":"15666",
			"top":"1",
			"title":"2 lines as usual",
			"vote":"21",
			"content":"Using binary search to find the smallest number that's not too small.\\n\\n```\\n    def guessNumber(self, n):\\n        class C: __getitem__ = lambda _, i: -guess(i)\\n        return bisect.bisect(C(), -1, 1, n)\\n```\\n\\nAlternatively, without using the library:\\n\\n```\\n    def guessNumber(self, n):\\n        lo, hi = 1, n\\n        while lo < hi:\\n            mid = (lo + hi) / 2\\n            if guess(mid) == 1:\\n                lo = mid + 1\\n            else:\\n                hi = mid\\n        return lo\\n```\\n\\nFunny variation:\\n\\n```\\n    def guessNumber(self, n):\\n        lo, hi = 1, n\\n        while lo < hi:\\n            mid = (lo + hi) / 2\\n            lo, hi = ((mid, mid), (mid+1, hi), (lo, mid-1))[guess(mid)]\\n        return lo\\n```"
		},
		{
			"lc_ans_id":"84664",
			"view":"6252",
			"top":"2",
			"title":"0ms c++ binary search",
			"vote":"14",
			"content":"```\\nint guessNumber(int n) {\\n        int maxNumber = n, minNumber = 1;\\n        while (true) {\\n            int meanNumber = (maxNumber - minNumber) / 2 + minNumber;\\n            // Do NOT use (maxNumber+minNumber)/2 in case of over flow\\n            int res = guess(meanNumber);\\n            if (res == 0) { \\n                return meanNumber;\\n            } else if (res == 1) {\\n                minNumber = meanNumber + 1;\\n            } else {\\n                maxNumber = meanNumber - 1;\\n            }\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"84668",
			"view":"10649",
			"top":"3",
			"title":"Short Java code using binary search",
			"vote":"14",
			"content":"This problem is a binary search problem has an O(logn) complexity.\\n\\n    public int guessNumber(int n) {\\n        int i = 1, j = n;\\n        while(i < j) {\\n            int mid = i + (j - i) / 2;\\n            if(guess(mid) == 0) {\\n                return mid;\\n            } else if(guess(mid) == 1) {\\n                i = mid + 1;\\n            } else {\\n                j = mid;\\n            }\\n        }\\n        return i;\\n    }"
		},
		{
			"lc_ans_id":"84712",
			"view":"741",
			"top":"4",
			"title":"I hope developers of Leetcode can make the question definition more clear.",
			"vote":"6",
			"content":"For the part of \"My guess number\""
		},
		{
			"lc_ans_id":"84662",
			"view":"440",
			"top":"5",
			"title":"What is the difference between (low + high) / 2 and low + (high - low) / 2?",
			"vote":"4",
			"content":"To do binary search, sometimes I see people use\\n```\\nmid = (low + high) / 2;\\n```\\nSometimes I see\\n```\\nmid = low + (high - low) / 2;\\n```\\n\\n*mid* will at most diff 1. What is the difference between these two approaches?\\n\\nHere is my code, it works with \"low + (high - low)\" but TLE with (low + high) / 2.\\n\\n```\\n    public int guessNumber(int n) {\\n        int low = 1, high = n;\\n        int result = low + (high - low) / 2;\\n        int guess = 0;\\n        while ((guess = (guess(result))) != 0) {\\n            if (guess > 0) {\\n                low = result + 1;\\n            } else {\\n                high = result - 1;\\n            }\\n            result = low + (high - low) / 2;\\n        }\\n        return result;\\n    }\\n```"
		},
		{
			"lc_ans_id":"84687",
			"view":"1303",
			"top":"6",
			"title":"2ms Java",
			"vote":"4",
			"content":"A typical binary search problem. `(l & r) + ((l ^ r) >> 1)` avoids the overflow (a much easier alternative is `l + (r - l) / 2`).\\n```\\n/* The guess API is defined in the parent class GuessGame.\\n   @param num, your guess\\n   @return -1 if my number is lower, 1 if my number is higher, otherwise return 0\\n      int guess(int num); */\\n\\npublic class Solution extends GuessGame {\\n    public int guessNumber(int n) {\\n        int l = 0, r = n;\\n        while (l < r) {\\n            int m = (l & r) + ((l ^ r) >> 1);\\n            if (guess(m) == 0) return m;\\n            else if (guess(m) == 1) l = m + 1;\\n            else r = m - 1;\\n        }\\n        return l;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"84739",
			"view":"2059",
			"top":"7",
			"title":"c++ binary search",
			"vote":"3",
			"content":"Declare res to equal the API call to only have 1 API call/iteration\\n```\\nclass Solution {\\npublic:\\n    int guessNumber(int n) {\\n        //simple binary search : low = 1; high = n\\n        int low = 1;\\n        while(low <= n){\\n            int mid = low + (n-low) / 2;\\n            int res = guess(mid);\\n            if(res == 0)\\n                return mid;\\n            else if(res == -1)\\n                n = mid - 1;\\n            else\\n                low = mid + 1;\\n        }\\n        return -1;\\n    }\\n};"
		},
		{
			"lc_ans_id":"84683",
			"view":"673",
			"top":"8",
			"title":"1ms java solution",
			"vote":"2",
			"content":"```\\npublic class Solution extends GuessGame {\\n    public int guessNumber(int n) {\\n        return helper(1,n);\\n    }\\n    \\n    public int helper(int start, int end){\\n        if(start == end) return start;\\n        int mid = Math.toIntExact(((long)start+(long)end)/2);\\n        int r = 0;\\n        if(guess(mid) == 0) r = mid;\\n        else if(guess(mid) == 1) r = helper(mid+1, end);\\n        else if(guess(mid) == -1) r = helper(start, mid-1);\\n        return r;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"84681",
			"view":"1581",
			"top":"9",
			"title":"My C++ solution using result of guess()",
			"vote":"2",
			"content":"    int guessNumber(int n) {\\n        int cur = (1 + n) >> 1;\\n        int t;\\n        int step = cur;\\n        do{\\n            t = guess(cur);\\n            step = step >> 1 ? step  >> 1 : 1;\\n            cur += t*step;\\n        } while(t != 0);\\n        \\n        return cur;\\n    }"
		}
	],
	"id":"374",
	"title":"Guess Number Higher or Lower",
	"content":"<p>We are playing the Guess Game. The game is as follows:<p> \r\n\r\n<p>I pick a number from <b>1</b> to <b><i>n</i></b>. You have to guess which number I picked.</p>\r\n\r\n<p>Every time you guess wrong, I'll tell you whether the number is higher or lower.</p>\r\n\r\n<p>You call a pre-defined API <code>guess(int num)</code> which returns 3 possible results (<code>-1</code>, <code>1</code>, or <code>0</code>):</p>\r\n<pre>\r\n-1 : My number is lower\r\n 1 : My number is higher\r\n 0 : Congrats! You got it!\r\n</pre>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\nn = 10, I pick 6.\r\n\r\nReturn 6.\r\n</pre>\r\n</p>",
	"frequency":"410",
	"ac_num":"64907"
}