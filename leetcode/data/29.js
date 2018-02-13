{
	"difficulty":"2",
	"submit_num":"775757",
	"show_id":"29",
	"leetcode_id":"29",
	"answers":[
		{
			"lc_ans_id":"13407",
			"view":"57687",
			"top":"0",
			"title":"Detailed Explained 8ms C++ solution",
			"vote":"299",
			"content":"In this problem, we are asked to divide two integers. However, we are not allowed to use division, multiplication and mod operations. So, what else can we use? Yeah, bit manipulations.\\n\\nLet's do an example and see how bit manipulations work.\\n\\nSuppose we want to divide `15` by `3`, so `15` is `dividend` and `3` is `divisor`. Well, division simply requires us to find how many times we can subtract the `divisor` from the the `dividend` without making the `dividend` negative.\\n\\nLet's get started. We subtract `3` from `15` and we get `12`, which is positive. Let's try to subtract more. Well, we **shift** `3` to the left by `1` bit and we get `6`. Subtracting `6` from `15` still gives a positive result. Well, we shift again and get `12`. We subtract `12` from `15` and it is still positive. We shift again, obtaining `24` and we know we can at most subtract `12`. Well, since `12` is obtained by shifting `3` to left twice, we know it is `4` times of `3`. How do we obtain this `4`? Well, we start from `1` and shift it to left twice at the same time. We add `4` to an answer (initialized to be `0`). In fact, the above process is like `15 = 3 * 4 + 3`. We now get part of the quotient (`4`), with a remainder `3`.\\n\\nThen we repeat the above process again. We subtract `divisor = 3` from the remaining `dividend = 3` and obtain `0`. We know we are done. No shift happens, so we simply add `1 << 0` to the answer.\\n\\nNow we have the full algorithm to perform division. \\n\\nAccording to the problem statement, we need to handle some exceptions, such as overflow.\\n\\nWell, two cases may cause overflow:\\n\\n 1. `divisor = 0`;\\n 2. `dividend = INT_MIN` and `divisor = -1` (because `abs(INT_MIN) = INT_MAX + 1`).\\n\\nOf course, we also need to take the sign into considerations, which is relatively easy.\\n\\nPutting all these together, we have the following code.\\n\\n    class Solution {\\n    public:\\n        int divide(int dividend, int divisor) {\\n            if (!divisor || (dividend == INT_MIN && divisor == -1))\\n                return INT_MAX;\\n            int sign = ((dividend < 0) ^ (divisor < 0)) ? -1 : 1;\\n            long long dvd = labs(dividend);\\n            long long dvs = labs(divisor);\\n            int res = 0;\\n            while (dvd >= dvs) { \\n                long long temp = dvs, multiple = 1;\\n                while (dvd >= (temp << 1)) {\\n                    temp <<= 1;\\n                    multiple <<= 1;\\n                }\\n                dvd -= temp;\\n                res += multiple;\\n            }\\n            return sign == 1 ? res : -res; \\n        }\\n    };"
		},
		{
			"lc_ans_id":"13397",
			"view":"36911",
			"top":"1",
			"title":"Clean Java solution with some comment.",
			"vote":"58",
			"content":"  \\tpublic int divide(int dividend, int divisor) {\\n\\t\\t//Reduce the problem to positive long integer to make it easier.\\n\\t\\t//Use long to avoid integer overflow cases.\\n\\t\\tint sign = 1;\\n\\t\\tif ((dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0))\\n\\t\\t\\tsign = -1;\\n\\t\\tlong ldividend = Math.abs((long) dividend);\\n\\t\\tlong ldivisor = Math.abs((long) divisor);\\n\\t\\t\\n\\t\\t//Take care the edge cases.\\n\\t\\tif (ldivisor == 0) return Integer.MAX_VALUE;\\n\\t\\tif ((ldividend == 0) || (ldividend < ldivisor))\\treturn 0;\\n\\t\\t\\n\\t\\tlong lans = ldivide(ldividend, ldivisor);\\n\\t\\t\\n\\t\\tint ans;\\n\\t\\tif (lans > Integer.MAX_VALUE){ //Handle overflow.\\n\\t\\t\\tans = (sign == 1)? Integer.MAX_VALUE : Integer.MIN_VALUE;\\n\\t\\t} else {\\n\\t\\t\\tans = (int) (sign * lans);\\n\\t\\t}\\n\\t\\treturn ans;\\n\\t}\\n\\n\\tprivate long ldivide(long ldividend, long ldivisor) {\\n\\t\\t// Recursion exit condition\\n\\t\\tif (ldividend < ldivisor) return 0;\\n\\t\\t\\n\\t\\t//  Find the largest multiple so that (divisor * multiple <= dividend), \\n\\t\\t//  whereas we are moving with stride 1, 2, 4, 8, 16...2^n for performance reason.\\n\\t\\t//  Think this as a binary search.\\n\\t\\tlong sum = ldivisor;\\n\\t\\tlong multiple = 1;\\n\\t\\twhile ((sum+sum) <= ldividend) {\\n\\t\\t\\tsum += sum;\\n\\t\\t\\tmultiple += multiple;\\n\\t\\t}\\n\\t\\t//Look for additional value for the multiple from the reminder (dividend - sum) recursively.\\n\\t\\treturn multiple + ldivide(ldividend - sum, ldivisor);\\n\\t}"
		},
		{
			"lc_ans_id":"13403",
			"view":"13251",
			"top":"2",
			"title":"Clear python code",
			"vote":"55",
			"content":"    class Solution:\\n    # @return an integer\\n    def divide(self, dividend, divisor):\\n        positive = (dividend < 0) is (divisor < 0)\\n        dividend, divisor = abs(dividend), abs(divisor)\\n        res = 0\\n        while dividend >= divisor:\\n            temp, i = divisor, 1\\n            while dividend >= temp:\\n                dividend -= temp\\n                res += i\\n                i <<= 1\\n                temp <<= 1\\n        if not positive:\\n            res = -res\\n        return min(max(-2147483648, res), 2147483647)"
		},
		{
			"lc_ans_id":"13426",
			"view":"20088",
			"top":"3",
			"title":"Simple O((log N) ^ 2) C++ solution",
			"vote":"53",
			"content":"Long division in binary:\\nThe outer loop reduces n by at least half each iteration. So It has O(log N) iterations.\\nThe inner loop has at most log N iterations. \\n So  the overall complexity is O(( log N)^2) \\n\\n    typedef long long ll;\\n\\n    int divide(int n_, int d_) {\\n        ll ans=0;\\n        ll n=abs((ll)n_);\\n        ll d=abs((ll)d_);\\n        while(n>=d){\\n            ll a=d;\\n            ll m=1;\\n            while((a<<1) < n){a<<=1;m<<=1;}\\n            ans+=m;\\n            n-=a;\\n        }\\n        if((n_<0&&d_>=0)||(n_>=0&&d_<0))\\n            return -ans;\\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"13428",
			"view":"15415",
			"top":"4",
			"title":"15 line easy understand solution. 129ms",
			"vote":"36",
			"content":"for example, if we want to calc (17/2)\\n\\nret = 0;\\n\\n17-2  ,ret+=1; left=15\\n\\n15-4  ,ret+=2; left=11\\n\\n11-8  ,ret+=4; left=3\\n\\n3-2    ,ret+=1; left=1\\n\\n\\nret=8;\\n\\n\\n\\n\\n\\n\\n    class Solution:\\n    # @return an integer\\n    def divide(self, dividend, divisor):\\n        isMinus= ((dividend<0 and divisor >0) or (dividend>0 and divisor <0));\\n        ret=0;        \\n        dividend,divisor=abs(dividend),abs(divisor);\\n        c,sub=1,divisor;\\n\\n        while(dividend >= divisor):\\n            if(dividend>=sub):\\n                dividend-=sub;\\n                ret+=c;\\n                sub=(sub<<1);\\n                c=(c<<1);\\n            else:\\n                sub=(sub>>1);\\n                c=(c>>1);\\n        \\n        if(isMinus):\\n            ret=-ret;\\n        return min(max(-2147483648,ret),2147483647);"
		},
		{
			"lc_ans_id":"13420",
			"view":"3690",
			"top":"5",
			"title":"32 times bit shift operation in C with O(1) solution",
			"vote":"25",
			"content":"we assure the factor `ret`'s binary fomula is\\n\\n`ret = a0 + a1*2 + a2*2^2 + ...... + a29*2^29 + a30*2^30 + a31*2^31;  ai = 0 or 1, i = 0......31`\\n\\nthe dividend `B` and divisor `A` is non-negative, then\\n\\n`A(a0 + a1*2 + a2*2^2 + ...... + a29*2^29 + a30*2^30 + a31*2^31) = B;    Eq1`\\n\\n(1) when `Eq1` divided by `2^31`, we can get  `A*a31 = B>>31`;  then `a31 = (B>>31)/A`;\\n\\nif `(B>>31) > A`, then `a31 = 1`; else `a31 = 0`;\\n\\n(2) when `Eq1` divided by `2^30`, we can get  `A*a30 + A*a30*2 = B>>30`;  then `a30 = ((B>>30) - a30*A*2)/A`;  and `(B>>30) - a31*A*2` can be rewritten by `(B-a31*A<<31)>>30`, so we make `B' = B-a31*A<<31`, the formula simplified to `a30 = (B'>>30)/A`\\n\\nif `(B'>>31) > A`, then `a30 = 1`; else `a30 = 0`;\\n\\n(3) in the same reason, we can get  `a29 = ((B-a31*A<<31-a30*A<<30)>>29)/A`, we make `B'' = B' - a30*A<<30`, the formula simplified to `a29 = (B''>>29)/A`;\\n\\ndo the same bit operation `32` times, we can get `a31 ..... a0`, so we get the `ret` finally.\\n\\nthe C solution with constant time complexity\\n\\n    int divide(int dividend, int divisor) {\\n        //special cases\\n        if(divisor == 0 || (dividend == INT_MIN && divisor == -1))\\n            return INT_MAX;\\n        \\n        // transform to unsigned int\\n        bool sign = (dividend > 0)^(divisor > 0);\\n        unsigned int A = (divisor < 0) ? -divisor : divisor;\\n        unsigned int B = (dividend < 0) ? -dividend : dividend;\\n        int ret = 0;\\n        \\n        // shift 32 times\\n        for(int i = 31; i >= 0; i--)\\n        {\\n            if((B>>i) >= A)\\n            {\\n                ret = (ret<<1)|0x01;\\n                B -= (A<<i);   // update B\\n            }\\n            else\\n                ret = ret<<1;\\n        }\\n        \\n        if(sign)\\n            ret = -ret;\\n        \\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"13422",
			"view":"7255",
			"top":"6",
			"title":"Accepted Java solution with comments.",
			"vote":"21",
			"content":"    public int divide(int dividend, int divisor) {\\n\\t\\tlong result = divideLong(dividend, divisor);\\n\\t\\treturn result > Integer.MAX_VALUE ? Integer.MAX_VALUE : (int)result;\\n    }\\n\\t\\n\\t// It's easy to handle edge cases when\\n\\t// operate with long numbers rather than int\\n\\tpublic long divideLong(long dividend, long divisor) {\\n\\t\\t\\n\\t\\t// Remember the sign\\n\\t\\tboolean negative = dividend < 0 != divisor < 0;\\n\\t\\t\\n\\t\\t// Make dividend and divisor unsign\\n\\t\\tif (dividend < 0) dividend = -dividend;\\n\\t\\tif (divisor < 0) divisor = -divisor;\\n\\t\\t\\n\\t\\t// Return if nothing to divide\\n\\t\\tif (dividend < divisor) return 0;\\n\\t\\t\\n\\t\\t// Sum divisor 2, 4, 8, 16, 32 .... times\\n        long sum = divisor;\\n        long divide = 1;\\n        while ((sum+sum) <= dividend) {\\n        \\tsum += sum;\\n        \\tdivide += divide;\\n        }\\n        \\n        // Make a recursive call for (devided-sum) and add it to the result\\n        return negative ? -(divide + divideLong((dividend-sum), divisor)) :\\n        \\t(divide + divideLong((dividend-sum), divisor));\\n    }"
		},
		{
			"lc_ans_id":"13417",
			"view":"2578",
			"top":"7",
			"title":"No Use of Long Java Solution",
			"vote":"20",
			"content":"Integer.MIN_VALUE as dividend is really troublesome. Thus, I turn everything to negative value and keep finding closest 1,2,4,8... multiples and recursive on rest. The only case that will cause overflow is Integer.MIN_VALUE / -1, so I list it alone as an edge case. \\n\\n\\n    public class Solution {\\n        public int divide(int dividend, int divisor) {\\n    \\t\\tif(dividend==Integer.MIN_VALUE && divisor==-1) return Integer.MAX_VALUE;\\n            if(dividend > 0 && divisor > 0) return divideHelper(-dividend, -divisor);\\n            else if(dividend > 0) return -divideHelper(-dividend,divisor);\\n            else if(divisor > 0) return -divideHelper(dividend,-divisor);\\n            else return divideHelper(dividend, divisor);\\n        }\\n        \\n        private int divideHelper(int dividend, int divisor){\\n            // base case\\n            if(divisor < dividend) return 0;\\n            // get highest digit of divisor\\n            int cur = 0, res = 0;\\n            while((divisor << cur) >= dividend && divisor << cur < 0 && cur < 31) cur++;\\n            res = dividend - (divisor << cur-1);\\n            if(res > divisor) return 1 << cur-1;\\n            return (1 << cur-1)+divide(res, divisor);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"13524",
			"view":"2723",
			"top":"8",
			"title":"Summary of 3 C++ solutions",
			"vote":"18",
			"content":"-1-  log-based solution\\n \\n\\n       class Solution {\\n        public:\\n            int divide(int dividend, int divisor) {\\n                /** a/b = e^(ln(a))/e^(ln(b)) = e^(ln(a)-ln(b)) **/\\n                if(dividend==0)  return 0;\\n                if(divisor==0)  return INT_MAX;\\n                \\n                double t1=log(fabs(dividend));\\n                double t2=log(fabs(divisor));\\n                long long result=double(exp(t1-t2));\\n                if((dividend<0) ^ (divisor<0))  result=-result;\\n                if(result>INT_MAX)  result=INT_MAX;\\n                return result;\\n            }\\n        };\\n\\n\\n-2-   Binary Index tree idea inspired solution, \\n\\nas we can decompose any result number to sum of the power \\n\\nof 2.\\n\\nHere is the C++ implementation.\\n\\n    class Solution {\\n    public:\\n        int divide(int dividend, int divisor) {\\n            if(!divisor || (dividend==INT_MIN && divisor==-1))   return INT_MAX;\\n            \\n            int sign=((dividend<0)^(divisor<0)) ? -1:1;\\n            long long m=labs(dividend);\\n            long long n=labs(divisor);\\n            int result=0;\\n            \\n            /** dvd >= 2^k1*dvs + 2^k2*dvs ... **/\\n            while(m>=n){\\n                long long temp=n, count=1;\\n                while(m >= (temp<<1)){\\n                    temp<<=1;\\n                    count<<=1;\\n                }\\n                m-=temp;\\n                result+=count;\\n            }\\n            \\n            return sign==1?result:-result;\\n        }\\n    };\\n\\n-3-  concise version of the solution 2\\n\\n    class Solution {\\n    public:\\n        int divide(int dividend, int divisor) {\\n            long long result=0;\\n            long long m=abs((long long)dividend);\\n            long long n=abs((long long)divisor);\\n            while(m>=n){\\n                long long s=n, power=1;\\n                while((s<<1) <= m) { s<<=1; power<<=1; }\\n                result+=power;\\n                m-=s;\\n            }\\n            \\n            if( (dividend>0) ^ (divisor>0))  result = -result;\\n            return result>INT_MAX ? INT_MAX:result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"13460",
			"view":"4078",
			"top":"9",
			"title":"6 line solution C++",
			"vote":"15",
			"content":"Basic idea: a/b = e^(ln(a))/e^(ln(b)) = e^(ln(a)-ln(b))\\n\\n    class Solution {\\n    public:\\n        int divide(int dividend, int divisor) {\\n            if (dividend==0) return 0;\\n            if (divisor==0) return INT_MAX;\\n            long long res=double(exp(log(fabs(dividend))-log(fabs(divisor))));\\n            if ((dividend<0)^(divisor<0)) res=-res;\\n            if (res>INT_MAX) res=INT_MAX;\\n            return res;\\n        }\\n    };"
		}
	],
	"id":"29",
	"title":"Divide Two Integers",
	"content":"<p>\r\nDivide two integers without using multiplication, division and mod operator.\r\n</p>\r\n<p>\r\nIf it is overflow, return MAX_INT.\r\n</p>",
	"frequency":"501",
	"ac_num":"122944"
}