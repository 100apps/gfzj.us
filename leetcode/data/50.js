{
	"difficulty":"2",
	"submit_num":"742580",
	"show_id":"50",
	"leetcode_id":"50",
	"answers":[
		{
			"lc_ans_id":"19546",
			"view":"76036",
			"top":"0",
			"title":"Short and easy to understand solution",
			"vote":"158",
			"content":"    public class Solution {\\n        public double pow(double x, int n) {\\n            if(n == 0)\\n                return 1;\\n            if(n<0){\\n                n = -n;\\n                x = 1/x;\\n            }\\n            return (n%2 == 0) ? pow(x*x, n/2) : x*pow(x*x, n/2);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"19544",
			"view":"36406",
			"top":"1",
			"title":"5 different choices when talk with interviewers",
			"vote":"142",
			"content":"After reading some good sharing solutions, I'd like to show them together. You can see different ideas in the code.\\n1. nest myPow\\n----------\\n\\n    double myPow(double x, int n) {\\n        if(n<0) return 1/x * myPow(1/x, -(n+1));\\n        if(n==0) return 1;\\n        if(n==2) return x*x;\\n        if(n%2==0) return myPow( myPow(x, n/2), 2);\\n        else return x*myPow( myPow(x, n/2), 2);\\n    }\\n\\n2. double myPow\\n---------------\\n\\n    double myPow(double x, int n) { \\n        if(n==0) return 1;\\n        double t = myPow(x,n/2);\\n        if(n%2) return n<0 ? 1/x*t*t : x*t*t;\\n        else return t*t;\\n    }\\n\\n3. double x\\n---------------\\n\\n    double myPow(double x, int n) { \\n        if(n==0) return 1;\\n        if(n<0){\\n            n = -n;\\n            x = 1/x;\\n        }\\n        return n%2==0 ? myPow(x*x, n/2) : x*myPow(x*x, n/2);\\n    }\\n\\n\\n4. iterative one\\n----------------\\n\\n    double myPow(double x, int n) { \\n        if(n==0) return 1;\\n        if(n<0) {\\n            n = -n;\\n            x = 1/x;\\n        }\\n        double ans = 1;\\n        while(n>0){\\n            if(n&1) ans *= x;\\n            x *= x;\\n            n >>= 1;\\n        }\\n        return ans;\\n    }\\n\\n5. bit operation\\n---------------\\nsee this [solution][1]\\n\\nIf you have other ideas, please leave it below. Thanks.\\n\\n  [1]: https://leetcode.com/discuss/12004/my-answer-using-bit-operation-c-implementation"
		},
		{
			"lc_ans_id":"19563",
			"view":"15515",
			"top":"2",
			"title":"Iterative Log(N) solution with Clear Explanation",
			"vote":"83",
			"content":"I couldn't find a clear explanation for an interative Log(n) solution so here's mine.  The basic idea is to decompose the exponent into powers of 2, so that you can keep dividing the problem in half.  For example, lets say \\n\\nN = 9 = 2^3 + 2^0 = 1001 in binary. Then:\\n\\nx^9 = x^(2^3) * x^(2^0)\\n\\nWe can see that every time we encounter a 1 in the binary representation of N, we need to multiply the answer with x^(2^i) where **i** is the **ith** bit of the exponent.  Thus, we can keep a running total of repeatedly squaring x - (x, x^2, x^4, x^8, etc) and multiply it by the answer when we see a 1.  \\n\\nTo handle the case where N=INTEGER_MIN we use a long (64-bit) variable.  Below is solution:\\n\\n    public class Solution {\\n        public double MyPow(double x, int n) {\\n            double ans = 1;\\n            long absN = Math.Abs((long)n);\\n            while(absN > 0) {\\n                if((absN&1)==1) ans *= x;\\n                absN >>= 1;\\n                x *= x;\\n            }\\n            return n < 0 ?  1/ans : ans;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"19560",
			"view":"7747",
			"top":"3",
			"title":"Shortest Python - Guaranteed",
			"vote":"49",
			"content":"[Surprisingly](http://stackoverflow.com/questions/30693639/why-does-class-x-mypow-pow-work-what-about-self), I can just use Python's existing `pow` like this:\\n\\n    class Solution:\\n        myPow = pow\\n\\nThat's even shorter than the other more obvious \"cheat\":\\n\\n    class Solution:\\n        def myPow(self, x, n):\\n            return x ** n\\n\\nAnd to calm down the haters, here's me *\"doing it myself\"*:\\n\\nRecursive:\\n\\n    class Solution:\\n        def myPow(self, x, n):\\n            if not n:\\n                return 1\\n            if n < 0:\\n                return 1 / self.myPow(x, -n)\\n            if n % 2:\\n                return x * self.myPow(x, n-1)\\n            return self.myPow(x*x, n/2)\\n\\nIterative:\\n\\n    class Solution:\\n        def myPow(self, x, n):\\n            if n < 0:\\n                x = 1 / x\\n                n = -n\\n            pow = 1\\n            while n:\\n                if n & 1:\\n                    pow *= x\\n                x *= x\\n                n >>= 1\\n            return pow"
		},
		{
			"lc_ans_id":"19593",
			"view":"23670",
			"top":"4",
			"title":"O (logn) solution in Java",
			"vote":"47",
			"content":"/* This is a simple solution based on divide and conquer */   \\n\\n     public class Solution {\\n            public double pow(double x, int m) {\\n                double temp=x;\\n                if(m==0)\\n                return 1;\\n                temp=pow(x,m/2);\\n                if(m%2==0)\\n                return temp*temp;\\n                else \\n                {\\n                if(m > 0)\\n                    return x*temp*temp;\\n                else\\n                    return (temp*temp)/x;\\n                }\\n              \\n        }"
		},
		{
			"lc_ans_id":"19578",
			"view":"9582",
			"top":"5",
			"title":"Non-recursive C++ log(n) solution",
			"vote":"43",
			"content":"    class Solution {\\n    public:\\n        double myPow(double x, int n) {\\n        \\tdouble ans = 1;\\n        \\tunsigned long long p;\\n        \\tif (n < 0) {\\n        \\t\\tp = -n;\\n        \\t\\tx = 1 / x;\\n        \\t} else {\\n        \\t\\tp = n;\\n        \\t}\\n    \\t\\twhile (p) {\\n    \\t\\t\\tif (p & 1)\\n    \\t\\t\\t\\tans *= x;\\n    \\t\\t\\tx *= x;\\n    \\t\\t\\tp >>= 1;\\n    \\t\\t}\\n    \\t\\treturn ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"19608",
			"view":"3904",
			"top":"6",
			"title":"8 lines of c++ / 7 ms",
			"vote":"24",
			"content":"       double pow(double x, int n) {\\n            if (n==0) return 1;\\n            double t = pow(x,n/2);\\n            if (n%2) {\\n                return n<0 ? 1/x*t*t : x*t*t;\\n            } else {\\n                return t*t;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"19571",
			"view":"7302",
			"top":"7",
			"title":"My answer using bit operation (C++ implementation)",
			"vote":"19",
			"content":"    class Solution {\\n    public:\\n        double pow(double x, int n) {\\n        \\tif(n<0){\\n        \\t\\tx = 1.0/x;\\n        \\t\\tn = -n;\\n        \\t}\\n        \\tint unsigned m = n;\\n            double tbl[32] = {0};\\n            double result = 1;\\n            tbl[0] = x;\\n            for(int i=1;i<32;i++){\\n                tbl[i] = tbl[i-1]*tbl[i-1];\\n            }\\n            for(int i=0;i<32;i++){\\n                if( m & (0x1<<i) )\\n                result *= tbl[i];\\n            }\\n            return result;\\n        }\\n    };\\n\\n\\nIn bit format and for a unsigned number, the number is represented as `k0*2^0 + k1*2^1 + ... +k31*2^31`. Therefore, once we know the pow(x,2^0), pow(x,2^1), ..., pow(x,2^31), we can get pow(x,n). And pow(x,2^m) can be constructed easily as pow(x,2^m) = pow(x,2^(m-1)*pow(x,2^(m-1)."
		},
		{
			"lc_ans_id":"19733",
			"view":"2605",
			"top":"8",
			"title":"Simple iterative lg n solution",
			"vote":"16",
			"content":"The idea is similar to the recursive version.\\n\\n    double pow(double x, int n) {\\n        double d = 1.; int m = n;\\n        for (; n; x *= x, n /= 2) if (n % 2) d *= x;\\n        return m >= 0 ? d : 1. / d;\\n    }"
		},
		{
			"lc_ans_id":"19566",
			"view":"2218",
			"top":"9",
			"title":"Iterative Java/Python short solution O(log n)",
			"vote":"12",
			"content":"**Java**\\n\\n    public double myPow(double x, int n) {\\n        long m = n > 0 ? n : -(long)n;\\n        double ans = 1.0;\\n        while (m != 0) {\\n            if ((m & 1) == 1)\\n                ans *= x;\\n            x *= x;\\n            m >>= 1;\\n        }\\n        return n >= 0 ? ans : 1 / ans;\\n    }\\n    //299 / 299 test cases passed.\\n    //Status: Accepted\\n    //Runtime: 1 ms\\n\\n**Python**\\n\\n    def myPow(self, x, n):\\n        m = abs(n)\\n        ans = 1.0\\n        while m:\\n            if m & 1:\\n                ans *= x\\n            x *= x\\n            m >>= 1\\n        return ans if n >= 0 else 1 / ans\\n\\n\\n    # 299 / 299 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 44 ms"
		}
	],
	"id":"50",
	"title":"Pow(x, n)",
	"content":"<p>Implement <a href=\"http://www.cplusplus.com/reference/valarray/pow/\" target=\"_blank\">pow(<i>x</i>, <i>n</i>)</a>.\r\n</p>\r\n\r\n<br />\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> 2.00000, 10\r\n<b>Output:</b> 1024.00000\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> 2.10000, 3\r\n<b>Output:</b> 9.26100\r\n</pre>\r\n</p>",
	"frequency":"559",
	"ac_num":"193344"
}