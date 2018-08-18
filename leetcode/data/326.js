{
	"difficulty":"1",
	"submit_num":"284521",
	"show_id":"326",
	"leetcode_id":"326",
	"answers":[
		{
			"lc_ans_id":"77856",
			"view":"41777",
			"top":"0",
			"title":"1 line java solution without loop / recursion",
			"vote":"345",
			"content":"    public class Solution {\\n    public boolean isPowerOfThree(int n) {\\n        // 1162261467 is 3^19,  3^20 is bigger than int  \\n        return ( n>0 &&  1162261467%n==0);\\n    }\\n}"
		},
		{
			"lc_ans_id":"77876",
			"view":"34796",
			"top":"1",
			"title":"** A summary of `all` solutions (new method included at 15:30pm Jan-8th)",
			"vote":"257",
			"content":"Well, this problem doesn't seem to be quite interesting or worthwhile to think about at a first glance. I had the same feeling at the beginning. However, after seeing a couple of posts, I saw a couple of interesting ways. So here is a summary post and hope you learn something from others' solutions.\\n\\nTwo trivial solutions first: \\n#Recursive Solution#\\n\\n    public boolean isPowerOfThree(int n) {\\n        return n>0 && (n==1 || (n%3==0 && isPowerOfThree(n/3)));\\n    }\\n\\n#Iterative Solution#\\n\\n**update following Stefan's answer below:**\\n\\n    public boolean isPowerOfThree(int n) {\\n        if(n>1)\\n            while(n%3==0) n /= 3;\\n        return n==1;\\n    }\\n\\n**my original code:**\\n    public boolean isPowerOfThree(int n) {\\n        while(n>1) {\\n            if(n%3!=0) return false;\\n            n /= 3;\\n        }\\n        return n<=0 ? false : true;\\n    }\\n\\n#It's all about MATH...#\\n\\n**Method 1**\\n\\nFind the maximum integer that is a power of 3 and check if it is a multiple of the given input. ([related post][1])\\n\\n    public boolean isPowerOfThree(int n) {\\n        int maxPowerOfThree = (int)Math.pow(3, (int)(Math.log(0x7fffffff) / Math.log(3)));\\n        return n>0 && maxPowerOfThree%n==0;\\n    }\\n\\nOr simply hard code it since we know `maxPowerOfThree = 1162261467`:\\n\\n    public boolean isPowerOfThree(int n) {\\n        return n > 0 && (1162261467 % n == 0);\\n    }\\n\\nIt is worthwhile to mention that Method 1 works only when the base is prime. For example, we cannot use this algorithm to check if a number is a power of 4 or 6 or any other composite number.\\n\\n**Method 2**\\n\\n If `log10(n) / log10(3)` returns an int (more precisely, a double but has 0 after decimal point), then n is a power of 3. ([original post][2]). But **be careful here**, you cannot use `log` (natural log) here, because it will generate round off error for `n=243`. This is more like a coincidence. I mean when `n=243`, we have the following results:\\n\\n    log(243) = 5.493061443340548    log(3) = 1.0986122886681098\\n       ==> log(243)/log(3) = 4.999999999999999\\n   \\n    log10(243) = 2.385606273598312    log10(3) = 0.47712125471966244\\n       ==> log10(243)/log10(3) = 5.0\\n\\nThis happens because `log(3)` is actually slightly larger than its true value due to round off, which makes the ratio smaller. \\n\\n    public boolean isPowerOfThree(int n) {\\n        return (Math.log10(n) / Math.log10(3)) % 1 == 0;\\n    }\\n\\n**Method 3** [related post][3]\\n\\n    public boolean isPowerOfThree(int n) {\\n        return n==0 ? false : n==Math.pow(3, Math.round(Math.log(n) / Math.log(3)));\\n    }\\n\\n**Method 4** [related post][4]\\n\\n    public boolean isPowerOfThree(int n) {\\n        return n>0 && Math.abs(Math.log10(n)/Math.log10(3)-Math.ceil(Math.log10(n)/Math.log10(3))) < Double.MIN_VALUE;\\n    }\\n\\n**`Cheating` Method**\\n\\nThis is not really a good idea in general. But for such kind of `power` questions, if we need to check many times, it might be a good idea to store the desired powers into an array first. ([related post][5])\\n\\n    public boolean isPowerOfThree(int n) {\\n        int[] allPowerOfThree = new int[]{1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049, 177147, 531441, 1594323, 4782969, 14348907, 43046721, 129140163, 387420489, 1162261467};\\n        return Arrays.binarySearch(allPowerOfThree, n) >= 0;\\n    }\\n\\nor even better with HashSet:\\n\\n    public boolean isPowerOfThree(int n) {\\n        HashSet<Integer> set = new HashSet<>(Arrays.asList(1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049, 177147, 531441, 1594323, 4782969, 14348907, 43046721, 129140163, 387420489, 1162261467));\\n        return set.contains(n);\\n    }\\n\\n#New Method Included at 15:30pm Jan-8th#\\n\\n**Radix-3** [original post][6]\\n\\nThe idea is to convert the original number into radix-3 format and check if it is of format `10*` where `0*` means `k` zeros with `k>=0`.\\n\\n    public boolean isPowerOfThree(int n) {\\n        return Integer.toString(n, 3).matches(\"10*\");\\n    }\\n\\n\\n----------\\n\\n\\nAny other interesting solutions?\\n\\nIf you are interested in my other posts, please feel free to check my Github page here: [https://github.com/F-L-A-G/Algorithms-in-Java][7]\\n\\n\\n  [1]: https://leetcode.com/discuss/78500/math-solution\\n  [2]: https://leetcode.com/discuss/78495/my-one-line-java-solution\\n  [3]: https://leetcode.com/discuss/78481/java-one-line-solution-using-math-knowledge\\n  [4]: https://leetcode.com/discuss/78531/one-line-math-solution-python-code\\n  [5]: https://leetcode.com/discuss/78492/one-lined-python-solution-without-using-any-loop-recursion\\n  [6]: https://leetcode.com/discuss/78708/ternary-number-solution\\n  [7]: https://github.com/F-L-A-G/Algorithms-in-Java"
		},
		{
			"lc_ans_id":"77872",
			"view":"15450",
			"top":"2",
			"title":"Without log and O(1).",
			"vote":"86",
			"content":"    class Solution {\\n    public:\\n        int const Max3PowerInt = 1162261467; // 3^19, 3^20 = 3486784401 > MaxInt32\\n        int const MaxInt32 = 2147483647; // 2^31 - 1\\n        bool isPowerOfThree(int n) {\\n            if (n <= 0 || n > Max3PowerInt) return false;\\n            return Max3PowerInt % n == 0;\\n        }\\n    };\\n \\nTypically, Log(x, y) is not O(1), it should be O(ln(N)), which just hides the loop/recursion ."
		},
		{
			"lc_ans_id":"77859",
			"view":"14035",
			"top":"3",
			"title":"1 line C++ no recursion/loop",
			"vote":"33",
			"content":"    class Solution {\\n    public:\\n        bool isPowerOfThree(int n) {\\n            return fmod(log10(n)/log10(3), 1)==0;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"77924",
			"view":"9842",
			"top":"4",
			"title":"One line (cheating)",
			"vote":"31",
			"content":"    public class Solution {\\n    public bool IsPowerOfThree(int n) {\\n         return n > 0 && (1162261467 % n == 0);\\n      }\\n    }"
		},
		{
			"lc_ans_id":"77854",
			"view":"5841",
			"top":"5",
			"title":"Simple Java Solution Without Recursion/Iteration",
			"vote":"27",
			"content":"If `N` is a power of `3`:\\n\\n - It follows that `3^X == N`\\n - It follows that `log (3^X) == log N`\\n - It follows that `X log 3 == log N`\\n - It follows that `X == (log N) / (log 3)`\\n - For the basis to hold, `X` must be an integer.\\n\\nHowever, due to the fact that log(3) cannot be precisely represented on a binary computer; X is considered an integer if its decimal component falls within a guard range of `+/-0.00000000000001`. Static imports for `log`, `abs` and `rint` from `java.lang.Math`.\\n\\n    public boolean isPowerOfThree(int n) {\\n      double a = log(n) / log(3);\\n      return abs(a - rint(a)) <= 0.00000000000001;\\n    }"
		},
		{
			"lc_ans_id":"77882",
			"view":"4658",
			"top":"6",
			"title":"C++ solution no loop / recursion",
			"vote":"24",
			"content":"    bool isPowerOfThree(int n) {\\n            if (n<=0) return false;\\n            int t = pow(3,(int)(log(INT_MAX)/log(3)));\\n            return (t%n == 0);\\n        }\\nt is maximum power of three"
		},
		{
			"lc_ans_id":"77850",
			"view":"9144",
			"top":"7",
			"title":"Python O(1) Solution 96.6%",
			"vote":"23",
			"content":"    class Solution(object):\\n        def isPowerOfThree(self, n):\\n            return n > 0 and 1162261467 % n == 0"
		},
		{
			"lc_ans_id":"77958",
			"view":"5857",
			"top":"8",
			"title":"Two ways and O(1)",
			"vote":"22",
			"content":"solution 1:\\n\\n    return (n == 1 || n == 3 || n == 9 || n == 27 || n == 81 || n == 243 || n == 729 || n == 2187 || n == 6561 || n == 19683 || n == 59049 || n == 177147 || n == 531441 || n == 1594323 || n == 4782969 || n == 14348907 || n == 43046721 || n == 129140163 || n == 387420489 || n == 1162261467);\\n\\nI like this solution! very easy to understand!\\n\\nsolution 2:\\n\\n    return n>0?!(1162261467 % n):0;\\n\\nor:\\n\\n    return n>0?(1162261467 / n == 1162261467 / (double)n):0; //this is a little bit faster\\n\\nif a number is the power of 3, it must can be divided by 1162261467, which is the largest number who is the power of 3."
		},
		{
			"lc_ans_id":"77943",
			"view":"3992",
			"top":"9",
			"title":"JAVA----------------Easy Version To Understand!!!!!!!!!!!",
			"vote":"20",
			"content":"    \\tpublic static boolean isPowerOfThree(int n) {\\n\\t\\tif (n <= 0)\\n\\t\\t\\treturn false;\\n\\t\\tdouble r = Math.log10(n) / Math.log10(3);\\n\\t\\tif (r % 1 == 0)\\n\\t\\t\\treturn true;\\n\\t\\telse\\n\\t\\t\\treturn false;\\n\\t}"
		}
	],
	"id":"326",
	"title":"Power of Three",
	"content":"<p>\r\n    Given an integer, write a function to determine if it is a power of three.\r\n</p>\r\n<p>\r\n    <b>Follow up:</b><br>\r\n    Could you do it without using any loop / recursion?\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"520",
	"ac_num":"115437"
}