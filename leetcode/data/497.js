{
	"difficulty":"1",
	"submit_num":"59662",
	"show_id":"507",
	"leetcode_id":"507",
	"answers":[
		{
			"lc_ans_id":"98594",
			"view":"9185",
			"top":"0",
			"title":"Simple Java Solution",
			"vote":"22",
			"content":"```\\npublic class Solution {\\n    public boolean checkPerfectNumber(int num) {\\n        if (num == 1) return false;\\n        \\n        int sum = 0;\\n        for (int i = 2; i <= Math.sqrt(num); i++) {\\n            if (num % i == 0) {\\n                sum += i;\\n                if (i != num / i) sum += num / i;\\n            }\\n        }\\n        sum++;\\n        \\n        return sum == num;\\n    }\\n}\\n```\\n```Update``` Enlightened by discussion below by @StefanPochmann and @jdrogin, in the given range we don't need to test ```if (i != num / i)``` before add ```num / i``` to ```sum```. \\n```\\npublic class Solution {\\n    public boolean checkPerfectNumber(int num) {\\n        if (num == 1) return false;\\n        \\n        int sum = 0;\\n        for (int i = 2; i <= Math.sqrt(num); i++) {\\n            if (num % i == 0) {\\n                sum += i + num / i;\\n            }\\n        }\\n        sum++;\\n        \\n        return sum == num;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98601",
			"view":"1856",
			"top":"1",
			"title":"Missing test cases",
			"vote":"13",
			"content":"The following wrong code gets accepted:\\n\\n    def checkPerfectNumber(self, num):\\n        k = num.bit_length() / 2\\n        return num > 1 and num == (2 << k) - 1 << k\\n\\nIt just checks whether the number has a certain form (k+1 one-bits followed by k zero-bits). That form is necessary (at least for numbers in the allowed range, see [Wikipedia](https://en.wikipedia.org/wiki/Perfect_number#Even_perfect_numbers)) but not sufficient. It incorrectly returns `True` for the following numbers, so those should be added to the test suite:\\n\\n120, 2016, 32640, 130816, 523776, 2096128, 8386560\\n\\n@1337c0d3r"
		},
		{
			"lc_ans_id":"98636",
			"view":"2255",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"5",
			"content":"Let's consider the problem of finding the sum of all divisors of N.\\n\\nConsider the prime factorization of N, for example suppose it was 2^a * 3^b * 5^c...  Every divisor is going to be some 2^i 3^j 5^k... for i in [0,a], j in [0,b] etc.  The sum of all of these is simply (2^0 + 2^1 + ... + 2^a) * (3^0 + 3^1 + ... + 3^b) * (5^0 + 5^1 + ... + 5^c) * ... .\\n\\nHow might we find the prime factorization of N?  This is a standard technique worth learning.\\n\\nLook at our function **prime_factorization**, which is defined for positive integers.  Our loop invariant is: **d** will be the least number that N might be divisible by.  We'll divide out factors of d and record the number of such divisions as the exponent of d in the prime factorization of N.  Since we have checked all numbers before it and divided them out of N, d will always be prime.  After checking all potential primes <= sqrt(N), if N > 1 then it must be prime, and we should record that too.\\n\\nWe should also be careful to remember that negative N's are always not perfect.\\n```\\ndef prime_factorization(N):\\n  d = 2\\n  while d * d <= n:\\n    expo = 0\\n    while N % d == 0:\\n      expo += 1\\n      N /= d\\n    if expo:\\n      yield (d, expo)\\n    d += 1\\n  if N > 1:\\n    yield (N, 1)\\n\\nans = 1\\nfor prime, expo in prime_factorization(abs(N)):\\n  ans *= sum(prime ** k for k in xrange(expo + 1))\\nreturn ans == 2*N\\n```\\n\\n*Note:  I try to focus my editorials on the most repeatable and instructive solutions, not the most clever or short.*"
		},
		{
			"lc_ans_id":"98616",
			"view":"1910",
			"top":"3",
			"title":"Simple Python",
			"vote":"4",
			"content":"One thing to keep in mind is the stopping condition of ```for``` loop is ```less or equal to SQRT```.\\n```\\nclass Solution(object):\\n    def checkPerfectNumber(self, num):\\n        \"\"\"\\n        :type num: int\\n        :rtype: bool\\n        \"\"\"\\n        if num <= 0: return False\\n        ans, SQRT = 0, int(num ** 0.5)\\n        ans = sum(i + num//i for i in range(1, SQRT+1) if not num % i)\\n        if num == SQRT ** 2: ans -= SQRT\\n        return ans - num == num\\n```"
		},
		{
			"lc_ans_id":"98596",
			"view":"4115",
			"top":"4",
			"title":"2 line solution C++",
			"vote":"3",
			"content":"    class Solution {\\n    public:\\n        bool checkPerfectNumber(int num) {\\n            static unordered_set<int> n = {6, 28, 496, 8128, 33550336};\\n            return n.count(num);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"98600",
			"view":"366",
			"top":"5",
			"title":"C++ 6 lines 'normal' solution ( 3 lines actually...)",
			"vote":"2",
			"content":"```\\n    bool checkPerfectNumber(int num) {\\n        vector<int>res(1,1);\\n        int upper=num;\\n        for(int i=2;i<upper;i++) if(num%i==0) res.push_back(i), res.push_back(num/i), upper=num/i;\\n        int sum=0;\\n        for(auto i:res) sum+=i;\\n        return sum==num && num!=1;\\n    }\\n```\\n***\\n**Update(8/6/2017):** I just found I don't need to keep updating `upper` if I know where it will land (when i == num/i, it doesn't matter if i< or <= sqrt(num) as explained in comment), and it reduces run time from 1055ms to 3ms, well...\\n```\\n    bool checkPerfectNumber(int num) {\\n        vector<int>res(1,1);\\n        for(int i=2;i<sqrt(num);i++) if(num%i==0) res.push_back(i), res.push_back(num/i);\\n        int sum=0;\\n        for(auto i:res) sum+=i;\\n        return sum==num && num!=1;\\n    }\\n```\\n***\\n**Update:** Why would  I need a vector?\\n```\\n    bool checkPerfectNumber(int num) {\\n        int sum=1;\\n        for(int i=2;i<sqrt(num);i++) if(num%i==0) sum += i + num/i;\\n        return sum==num && num!=1;\\n    }\\n```\\n***\\nThanks @MAPLELEAF2012 for advice. \\nThe comprehensive version if we take the perfect square into account, in which case sum(49) is 1+7=8, not 1+7+7=15 or 1.\\n```\\n    bool checkPerfectNumber(int num) {\\n        int sum=1;\\n        for(int i=2;i<=sqrt(num);i++) if(num%i==0) sum += i + (i==num/i ? 0 : num/i);\\n        return sum==num && num!=1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"98621",
			"view":"411",
			"top":"6",
			"title":"2 simple Java solutions - via Stream and a contant time",
			"vote":"2",
			"content":"Via `Stream`\\n```java\\nboolean checkPerfectNumber(int num) {\\n  return (num >= 6) && (num == (divisors(num).sum() + 1));\\n}\\nIntStream divisors(int num) {\\n  return IntStream.rangeClosed(2, (int) Math.sqrt(num))\\n                  .filter(i -> num % i == 0)\\n                  .flatMap(i -> IntStream.of(i, num / i));\\n}\\n```\\n---\\nor in a single line, if you're into that:\\n```java\\nboolean checkPerfectNumber(int num) {\\n  return (num >= 6) && (num == IntStream.rangeClosed(2, (int) Math.sqrt(num)).filter(i -> num % i == 0).flatMap(i -> IntStream.of(i, num / i)).sum() + 1);\\n}\\n```\\n---\\nor a constant time alternative, since there are only a few perfect numbers that are small enough:\\n```java\\nboolean checkPerfectNumber(int num) {\\n  switch(num) {\\n    case 6: case 28: case 496: case 8_128: case 33_550_336: return true;\\n    default: return false;\\n  }\\n}\\n```"
		},
		{
			"lc_ans_id":"98611",
			"view":"1613",
			"top":"7",
			"title":"Java 4-Liner O(sqrt(n)) Solution",
			"vote":"2",
			"content":"```\\npublic boolean checkPerfectNumber(int num) {\\n    int sum = 1;\\n    for (int i=2;i<Math.sqrt(num);i++) \\n        if (num % i == 0) sum += i + (num/i == i ? 0 : num/i);\\n    return num != 1 && sum == num;\\n}\\n```"
		},
		{
			"lc_ans_id":"98597",
			"view":"95",
			"top":"8",
			"title":"Two pointer, Java solution.",
			"vote":"1",
			"content":"class Solution {\\n    public boolean checkPerfectNumber(int num) {\\n        if (num == 1) {\\n            return false;\\n        }\\n        \\n        int result = 1;\\n        int end = num;\\n        \\n        \\n        for (int i = 2; i < end; i++) {\\n            if (num % i == 0) {\\n                result += i;\\n                end = num / i;\\n                result += end;\\n            }\\n        }\\n        return result == num;\\n    }\\n}"
		},
		{
			"lc_ans_id":"98622",
			"view":"81",
			"top":"9",
			"title":"Another O(sqrt(n)) c++ solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    bool checkPerfectNumber(int num) {\\n        if (num <= 1) {\\n            return false;\\n        }\\n        int sum = 1, left = 2, right = num / 2;\\n        while (left < right) {\\n            if (left * right == num) {\\n                sum += left + right;\\n            }\\n            ++left;\\n            right = num / left;\\n        }\\n        return sum == num;\\n    }\\n};\\n```"
		}
	],
	"id":"497",
	"title":"Perfect Number",
	"content":"<p>We define the Perfect Number is a <b>positive</b> integer that is equal to the sum of all its <b>positive</b> divisors except itself. \r\n</p>\r\nNow, given an <b>integer</b> n, write a function that returns true when it is a perfect number and false when it is not.\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> 28\r\n<b>Output:</b> True\r\n<b>Explanation:</b> 28 = 1 + 2 + 4 + 7 + 14\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe input number <b>n</b> will not exceed 100,000,000. (1e8)\r\n</p>",
	"frequency":"206",
	"ac_num":"19652"
}