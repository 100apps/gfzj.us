{
	"difficulty":"1",
	"submit_num":"165203",
	"show_id":"367",
	"leetcode_id":"367",
	"answers":[
		{
			"lc_ans_id":"83874",
			"view":"28454",
			"top":"0",
			"title":"A square number is 1+3+5+7+..., JAVA code",
			"vote":"121",
			"content":"   ```\\n public boolean isPerfectSquare(int num) {\\n        int i = 1;\\n        while (num > 0) {\\n            num -= i;\\n            i += 2;\\n        }\\n        return num == 0;\\n    }\\n```\\n\\nThe time complexity is **O(sqrt(n))**, a more efficient one using binary search whose time complexity is **O(log(n))**:\\n```\\npublic boolean isPerfectSquare(int num) {\\n        int low = 1, high = num;\\n        while (low <= high) {\\n            long mid = (low + high) >>> 1;\\n            if (mid * mid == num) {\\n                return true;\\n            } else if (mid * mid < num) {\\n                low = (int) mid + 1;\\n            } else {\\n                high = (int) mid - 1;\\n            }\\n        }\\n        return false;\\n    }\\n```\\nOne thing to note is that we have to use **long** for mid to avoid **mid\\\\*mid** from overflow. Also, you can use **long** type for **low** and **high** to avoid type casting for mid from long to int.\\nAnd a third way is to use **Newton Method** to calculate the square root or num, refer to [Newton Method](https://en.wikipedia.org/wiki/Integer_square_root#Using_only_integer_division) for details. \\n```\\npublic boolean isPerfectSquare(int num) {\\n        long x = num;\\n        while (x * x > num) {\\n            x = (x + num / x) >> 1;\\n        }\\n        return x * x == num;\\n    }\\n```"
		},
		{
			"lc_ans_id":"83902",
			"view":"8973",
			"top":"1",
			"title":"Java Three Solutions 1,3,5,.. Sequence/Binary Search/Newton",
			"vote":"23",
			"content":"1. a square number is 1+3+5+7+... Time Complexity O(sqrt(N)) (Credit to lizhibupt, thanks for correcting this).\\n2. binary search. Time Complexity O(logN)\\n3. Newton Method. See [this wiki page][1]. Time Complexity is close to constant, given a positive integer.\\n\\n<pre><code>\\n\\n    public boolean isPerfectSquare(int num) {\\n      if (num < 1) return false;\\n      for (int i = 1; num > 0; i += 2)\\n        num -= i;\\n      return num == 0;\\n    }\\n    \\n    public boolean isPerfectSquare(int num) {\\n      if (num < 1) return false;\\n      long left = 1, right = num;// long type to avoid 2147483647 case\\n    \\n      while (left <= right) {\\n        long mid = left + (right - left) / 2;\\n        long t = mid * mid;\\n        if (t > num) {\\n          right = mid - 1;\\n        } else if (t < num) {\\n          left = mid + 1;\\n        } else {\\n          return true;\\n        }\\n      }\\n    \\n      return false;\\n    }\\n    \\n    boolean isPerfectSquare(int num) {\\n      if (num < 1) return false;\\n      long t = num / 2;\\n      while (t * t > num) {\\n        t = (t + num / t) / 2;\\n      }\\n      return t * t == num;\\n    }\\n\\n\\n\\n  [1]: https://en.wikipedia.org/wiki/Newton%27s_method"
		},
		{
			"lc_ans_id":"83907",
			"view":"8976",
			"top":"2",
			"title":"3-4 short lines, Integer Newton, Most Languages",
			"vote":"23",
			"content":"Just slightly modified my [sqrt solutions](https://leetcode.com/discuss/58631/3-4-short-lines-integer-newton-every-language). You can find some explanation there.\\n\\n(Note I renamed the parameter to x because that's the name in the sqrt problem and I like it better.)\\n\\n**Java, C++, C, C#**\\n\\n        long r = x;\\n        while (r*r > x)\\n            r = (r + x/r) / 2;\\n        return r*r == x;\\n\\n**Python**\\n\\n        r = x\\n        while r*r > x:\\n            r = (r + x/r) / 2\\n        return r*r == x\\n\\n**Ruby**\\n\\n        r  = x\\n        r = (r + x/r) / 2 while r*r > x\\n        r*r == x\\n\\n**JavaScript**\\n\\n        r = x;\\n        while (r*r > x)\\n            r = ((r + x/r) / 2) | 0;\\n        return r*r == x;"
		},
		{
			"lc_ans_id":"83872",
			"view":"7685",
			"top":"3",
			"title":"O(1) time c++ solution inspired by Q_rsqrt",
			"vote":"17",
			"content":"    class Solution {\\n    public:\\n        bool isPerfectSquare(int num) {\\n            if (num < 0) return false;\\n            int root = floorSqrt(num);\\n            return root * root == num;\\n        }\\n    \\n        int32_t floorSqrt(int32_t x) {\\n            double y=x; int64_t i=0x5fe6eb50c7b537a9;\\n            y = *(double*)&(i = i-(*(int64_t*)&y)/2);\\n            y = y * (3 - x * y * y) * 0.5;\\n            y = y * (3 - x * y * y) * 0.5;\\n            i = x * y + 1; return i - (i * i > x);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"83888",
			"view":"5708",
			"top":"4",
			"title":"O(logN) Bisection method",
			"vote":"14",
			"content":"    bool isPerfectSquare(int num) {\\n        long long l = 0, r = num;\\n        while (l <= r) {\\n            long long mid = (l + r) >> 1;\\n            long long sqmid = mid * mid;\\n            if (sqmid > num) r = mid - 1;\\n            else if (sqmid < num) l = mid + 1;\\n            else return true;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"83889",
			"view":"4790",
			"top":"5",
			"title":"Java Binary Search Solution ( the obvious one)",
			"vote":"10",
			"content":"    public class Solution {\\n        public boolean isPerfectSquare(int num) {\\n    \\n         if(num == 1)\\n            return true;\\n    \\n            long low = 1,\\n                high = num / 2,\\n                mid = 0;\\n    \\n            long nums = (long)num;\\n    \\n            while(low <= high)\\n            {\\n                mid = low + (high - low) / 2;\\n    \\n                if((mid * mid) == nums)\\n                    return true;\\n                else if( (mid * mid) < nums)\\n                    low = mid + 1;\\n                else\\n                    high = mid - 1;\\n            }\\n    \\n    \\n    \\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83901",
			"view":"2162",
			"top":"6",
			"title":"O(1) Java solution",
			"vote":"4",
			"content":"\\n    \\n    /*\\n        use solution from 069 - Sqrt(x), compare res * res == num\\n        time: O(16) = O(1), space: O(1)\\n    */\\n    public boolean solution(int num) {\\n        int root = 0, bit = 1 << 15;\\n        while (bit > 0) {\\n            root |= bit;\\n            if (root > num / root) {    // if root * root > num\\n                root ^= bit;    // set the bit back to 0\\n            }\\n            bit >>= 1;\\n        }\\n        return root * root == num;\\n    }"
		},
		{
			"lc_ans_id":"83900",
			"view":"872",
			"top":"7",
			"title":"Python solution using Newton's method",
			"vote":"4",
			"content":"    class Solution(object):\\n        def isPerfectSquare(self, num):\\n            \"\"\"\\n            :type num: int\\n            :rtype: bool\\n            \"\"\"\\n            if num < 0: return False\\n            if num <= 1: return True\\n            n = num/2  # start guessing using n = num/2\\n            while n*n!= num:\\n                inc = (num-n*n)/(2*n)\\n                n += inc\\n                if -1 <= inc <= 1: break\\n            if n*n < num: n+=1\\n            if n*n > num: n-=1\\n            return n*n == num\\n\\nf(x) = x^2   (find x that f(x) = num)\\n\\nf'(x) = 2*x\\n\\nstart process with x = n (any positive number)\\n\\nif f(x) != num, update x = x + (num - f(x))/f'(x) = x + (num - n^2)/(2n)"
		},
		{
			"lc_ans_id":"83949",
			"view":"483",
			"top":"8",
			"title":"Java binary search O(lgn) solution without using \"long\" type to avoid overflow",
			"vote":"3",
			"content":"```\\npublic boolean isPerfectSquare(int num){\\n        \\n        if(num <= 0) return false;\\n        \\n        int left = 1, right = num;\\n        \\n        while(left <= right){\\n            int mid = left + (right - left)/2;\\n            // use \"/\" to avoid overflow\\n            if(mid > num / mid){\\n                right = mid - 1;\\n            }else if(mid < num / mid){\\n                left = mid + 1;\\n            }else{\\n                return num % mid == 0;\\n            }\\n        }\\n        return false;\\n    }\\n```"
		},
		{
			"lc_ans_id":"83887",
			"view":"562",
			"top":"9",
			"title":"My concise and easy to understand Java solution without using long",
			"vote":"3",
			"content":"    public class Solution {\\n        public boolean isPerfectSquare(int num) {\\n            if (num < 0) return false;\\n            if (num == 0) return true;\\n            int start = 1, end = num, mid = 0;\\n            while (start <= end) {\\n                mid = (end - start) / 2 + start;\\n                if (mid * mid > num || mid * mid <= 0) end = mid - 1;\\n                else if (mid * mid < num ) start = mid + 1;\\n                else return true;\\n            }\\n            return start * start == num;\\n        }\\n    }"
		}
	],
	"id":"367",
	"title":"Valid Perfect Square",
	"content":"<p>Given a positive integer <i>num</i>, write a function which returns True if <i>num</i> is a perfect square else False.</p>\r\n\r\n<p>\r\n<b>Note:</b> <b>Do not</b> use any built-in library function such as <code>sqrt</code>.\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\nInput: 16\r\nReturns: True\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\nInput: 14\r\nReturns: False\r\n</pre>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/elmirap\">@elmirap</a> for adding this problem and creating all test cases.</p>",
	"frequency":"227",
	"ac_num":"63741"
}