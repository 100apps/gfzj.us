{
	"difficulty":"2",
	"submit_num":"56475",
	"show_id":"372",
	"leetcode_id":"372",
	"answers":[
		{
			"lc_ans_id":"84472",
			"view":"17576",
			"top":"0",
			"title":"C++ Clean and Short Solution",
			"vote":"102",
			"content":"One knowledge:  ab % k = (a%k)(b%k)%k\\nSince the power here is an array, we'd better handle it digit by digit.\\nOne observation:\\na^1234567 % k = (a^1234560 % k) * (a^7 % k) % k = (a^123456 % k)^10 % k * (a^7 % k) % k\\nLooks complicated? Let me put it  other way:\\nSuppose f(a, b) calculates a^b % k; Then translate above formula to using f :\\nf(a,1234567) = f(a, 1234560) * f(a, 7) % k = f(f(a, 123456),10) * f(a,7)%k;\\nImplementation of this idea:\\n```\\nclass Solution {\\n    const int base = 1337;\\n    int powmod(int a, int k) //a^k mod 1337 where 0 <= k <= 10\\n    {\\n        a %= base;\\n        int result = 1;\\n        for (int i = 0; i < k; ++i)\\n            result = (result * a) % base;\\n        return result;\\n    }\\npublic:\\n    int superPow(int a, vector<int>& b) {\\n        if (b.empty()) return 1;\\n        int last_digit = b.back();\\n        b.pop_back();\\n        return powmod(superPow(a, b), 10) * powmod(a, last_digit) % base;\\n    }\\n};\\n```\\n**Note:** This approach is definitely not the fastest, but it is something one can quickly understand and write out when asked in an interview. \\nAnd this approach is not using any built-in \"pow\" functions, I think this is also what the interviewer would expect you to do.\\nHope it helps!"
		},
		{
			"lc_ans_id":"84466",
			"view":"13224",
			"top":"1",
			"title":"Math solusion based on Euler's theorem, power called only ONCE, C++/Java/1-line-Python",
			"vote":"46",
			"content":"1337 only has two divisors 7 and 191 exclusive 1 and itself, so judge if `a` has a divisor of 7 or 191, and note that 7 and 191 are prime numbers, `phi` of them is itself - 1, then we can use the Euler's theorem, see it on wiki https://en.wikipedia.org/wiki/Euler%27s_theorem, it's just [Fermat's little theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem) if the mod `n` is prime.\\n\\nsee how 1140 is calculated out:\\nphi(1337) = phi(7) * phi(191) = 6 * 190 = 1140\\n\\n\\n**optimized solution update at 2016-7-12**\\n--------------------------------\\nToday, seeing @myanonymos 's comments, and I find several days ago I AC it just by fortunate coincidence, it's not the best solution. now I get a better idea.\\n\\n(1)  Firstly,  if `a` has both divisor 7 and 191, that's `a % 1337 == 0`, answer is 0.\\n(2)  Then if `a` has neither divisor 7 nor 191, that's a and 1337 are coprime, so **a<sup>b</sup> % 1337 = a<sup>b % phi(1337) </sup> % 1337 = a<sup>b % 1140 </sup> % 1337**.\\n\\n(3)  Finally,  `a` could has either divisor 7 or 191, that's similar.\\nLet it be 7 for example.\\nLet **a =  7<sup>n</sup>x**\\nand let **b = 1140p + q**, where **0 < q <= 1140**\\nthen:\\n\\n**a<sup>b</sup> % 1337**\\n**= ((7<sup>n</sup>x)<sup>b</sup>) % 1337**\\n**= (7<sup>nb</sup>x<sup>b</sup>) % 1337**\\n**= ( (7<sup>nb</sup> % 1337) * (x<sup>b</sup> % 1337) ) % 1337**\\n**= ( (7<sup>1140np + nq</sup> % 1337) * (x<sup>1140p + q</sup> % 1337) ) % 1337**\\n\\nnow note x and 1337 are coprime, so\\n\\n**= ( (7<sup>1140np + nq</sup> % 1337) * (x<sup>q</sup> % 1337) ) % 1337**\\n**= ( 7 * (7<sup>1140np + nq - 1</sup> % 191) * (x<sup>q</sup> % 1337) ) % 1337**\\n\\nnote 7 and 191 are coprime too, and 1140 is a multiple of 190, where 190 = phi(191). What's more we should assure that q != 0, if b % 1140== 0, then let b = 1140. so\\n\\n**= ( 7 * (7<sup>nq - 1</sup> % 191) * (x<sup>q</sup> % 1337) ) % 1337**\\n**= ( (7<sup>nq</sup> % 1337) * (x<sup>q</sup> % 1337) ) % 1337**\\n**= (7<sup>nq</sup>x<sup>q</sup>) % 1337**\\n**= ((7<sup>n</sup>x)<sup>q</sup>) % 1337**\\n**= (a<sup>q</sup>) % 1337**\\n\\nnow you see condition (2) and (3) can be merged as one solution, if you take care of when `b % 1440 == 0`, and let `b += 1140`. Actually (1) can be merged too, but not efficient.\\n\\n\\nnew code:\\nC++:\\n\\n    int superPow(int a, vector<int>& b) {\\n        if (a % 1337 == 0) return 0; // this line could also be removed\\n        int p = 0;\\n        for (int i : b) p = (p * 10 + i) % 1140;\\n        if (p == 0) p += 1140;\\n        return power(a, p, 1337);\\n    }\\n    int power(int x, int n, int mod) {\\n        int ret = 1;\\n        for (x %= mod; n; x = x * x % mod, n >>= 1) if (n & 1) ret = ret * x % mod;\\n        return ret;\\n    }\\n\\njava:\\n\\n    public int superPow(int a, int[] b) {\\n        if (a % 1337 == 0) return 0;\\n        int p = 0;\\n        for (int i : b) p = (p * 10 + i) % 1140;\\n        if (p == 0) p += 1440;\\n        return power(a, p, 1337);\\n    }\\n    public int power(int a, int n, int mod) {\\n        a %= mod;\\n        int ret = 1;\\n        while (n != 0) {\\n            if ((n & 1) != 0) ret = ret * a % mod;\\n            a = a * a % mod;\\n            n >>= 1;\\n        }\\n        return ret;\\n    }\\n\\nActually, if p == 0 or not, we can always let p += 1140, it doesn't matter.\\none line python:\\n\\n    def superPow(self, a, b):\\n        return 0 if a % 1337 == 0 else pow(a, reduce(lambda x, y: (x * 10 + y) % 1140, b) + 1140, 1337)\\n\\n**will this be the best solution?**\\n\\np.s.\\nI have testcases that the system missed\\n574\\n[1,1,4,0]\\n\\n764\\n[1,1,4,0]\\nin this case if I remove this line of code `if (p == 0) p += 1140;`, it will get wrong answer, but also can get AC on OJ.\\n\\nand I found thar 574 * 574 % 1337 = 574, 764 * 764 % 1337 = 764, how interesting!"
		},
		{
			"lc_ans_id":"84479",
			"view":"8628",
			"top":"2",
			"title":"Java 4ms solution using the remainder repeat pattern",
			"vote":"30",
			"content":"The main idea is cashed on the repeated pattern of the remainder of **a^b**.\\nAs long as we know the length of the pattern **m**, we just have to find an index point of this pattern based on **b mod m**. \\nIn addition, if **a > 1337**, we can let **a = a mod 1337**. \\nBecause if we let a = (1337*x + c) where c = a mod 1337,\\n(1337*x + c)(1337*x + c)(1337*x + c)...(1337*x + c) mod 1337 == c*c*c*...c mod 1337.  \\n\\n````\\npublic class Solution {\\n    int DIV = 1337;\\n    \\n    List<Integer> findLoop(int a){\\n        List<Integer> index = new ArrayList<>();\\n        boolean[] set = new boolean[DIV];\\n        int rem = a % DIV;\\n        while ( ! set[rem] ) {\\n            set[rem]=true;\\n            index.add(rem);\\n            rem = (rem*a) % DIV;\\n        }\\n        return index;\\n    }\\n    \\n    int modBy(int[] b, int m){\\n        int rem = 0;\\n        for (int i=0; i < b.length; i++) {\\n            rem = (rem*10+b[i]) % m;\\n        }\\n        return rem;\\n    }\\n\\n    public int superPow(int a, int[] b) {\\n        if (a==0 || a==DIV || b==null || b.length == 0) return 0;\\n        if (a==1) return 1;\\n        if (a > DIV) return superPow( a % DIV, b);\\n        List<Integer> index = findLoop(a);\\n        int loopsize = index.size();\\n        int rem = modBy(b, loopsize);\\n        rem = rem==0? loopsize: rem;\\n        return index.get(rem-1);\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"84470",
			"view":"5797",
			"top":"3",
			"title":"What's the point of this kind of question?",
			"vote":"22",
			"content":"Just to test whether the candidate knows https://en.wikipedia.org/wiki/Modular_exponentiation?\\n\\nWhich company has asked this question? Curious."
		},
		{
			"lc_ans_id":"84534",
			"view":"4734",
			"top":"4",
			"title":"1-liners & other with explanations",
			"vote":"14",
			"content":"## Solution 1: Using Python's big integers <sup>(accepted in 72 ms)</sup>\\n\\nTurn `b` into a Python integer object (they grow arbitrarily large) and just use the `pow` function (which supports a modulo paramenter).\\n\\n    def superPow(self, a, b):\\n        return pow(a, int(''.join(map(str, b))), 1337)\\n\\n<br>\\n## Solution 2: Using small ints <sup>(accepted in 80 ms)</sup>\\n\\nOriginally I went backwards (see solution 5) but then I saw other people go forwards and it's simpler. Sigh. Anyway... my version:\\n\\n    def superPow(self, a, b):\\n        result = 1\\n        for digit in b:\\n            result = pow(result, 10, 1337) * pow(a, digit, 1337) % 1337\\n        return result\\n\\nExplanation: For example for a<sup>5347</sup>, the above computes a<sup>5</sup>, then a<sup>53</sup>, then a<sup>534</sup>, and then finally a<sup>5347</sup>. And a step from one to the next can be done like a<sup>5347</sup> = (a<sup>534</sup>)<sup>10</sup> \\\\* a<sup>7</sup>.\\n\\n<br>\\n## Solution 3: Using recursion <sup>(accepted in 92 ms)</sup>\\n\\nObligatory recursive oneliner version of solution 2.\\n\\n    def superPow(self, a, b):\\n        return pow(a, b.pop(), 1337) * pow(self.superPow(a, b), 10, 1337) % 1337 if b else 1\\n\\n<br>\\n## Solution 4: Using `reduce` <sup>(accepted in 80 ms)</sup>\\n\\nObligatory `reduce`-oneliner version of solution 2.\\n\\n    def superPow(self, a, b):\\n        return reduce(lambda result, digit: pow(result, 10, 1337) * pow(a, digit, 1337) % 1337, b, 1)\\n\\n<br>\\n## Solution 5: omg was i stupid <sup>(accepted in 72 ms)\\n\\nMy original do-it-yourself before I saw other people's solutions and wrote solutions 2-4.\\n\\nUsing only small ints, also accepted in 72 ms:\\n\\n    def superPow(self, a, b):\\n        result = 1\\n        apower = a\\n        for digit in reversed(b):\\n            result = result * pow(apower, digit, 1337) % 1337\\n            apower = pow(apower, 10, 1337)\\n        return result\\n\\nExplanation by example:\\n\\na<sup>**5347**</sup>\\n= a<sup>5000</sup> * a<sup>300</sup> * a<sup>40</sup> * a<sup>7</sup>\\n= (a<sup>1000</sup>)<sup>5</sup> * (a<sup>100</sup>)<sup>3</sup> * (a<sup>10</sup>)<sup>4</sup> * a<sup>7</sup>\\n= (((a<sup>10</sup>)<sup>10</sup>)<sup>10</sup>)<sup>**5**</sup> * ((a<sup>10</sup>)<sup>10</sup>)<sup>**3**</sup> * (a<sup>10</sup>)<sup>**4**</sup> * a<sup>**7**</sup>\\n\\nComputing that from back to front is straightforward (or straightbackward?)."
		},
		{
			"lc_ans_id":"84475",
			"view":"3000",
			"top":"5",
			"title":"Fermat and Chinese Remainder",
			"vote":"13",
			"content":"If the modulus weren't 1337 = 7 * 191 but a prime number p, we could use [Fermat's little theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem) to first reduce the exponent to **e = b % (p-1)** and then compute the result as **a<sup>e</sup> % p**. Oh well, we can do it for 1337's prime factors 7 and 191 and then combine the two results with the [Chinese remainder theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem). I'll show my derivation of the magic constants 764 and 574 after the solutions below.\\n\\nI got the solution using Fermat from @Stomach_ache (thanks) and only added the Chinese remainder theorem stuff to adapt it to non-primes like 1337.\\n\\n## Solution 1: Python \"golf\"\\n\\nThe helper computes **a<sup>b</sup>** modulo the prime `p`.\\n\\n    def superPow(self, a, b):\\n        def mod(p):\\n            return pow(a, reduce(lambda e, d: (10*e + d) % (p-1), b, 0), p) if a%p else 0\\n        return (764 * mod(7) + 574 * mod(191)) % 1337\\n\\n## Solution 2: C++\\n\\nThe helper computes **a<sup>b</sup>** modulo the given prime.\\n\\n    int superPow(int a, vector<int>& b) {\\n        return (764 * superPow(a, b, 7) + 574 * superPow(a, b, 191)) % 1337;\\n    }\\n\\n    int superPow(int a, vector<int>& b, int prime) {\\n        if (!(a %= prime)) return 0;\\n        int e = 0, mod = prime - 1;\\n        for (int digit : b)\\n            e = (e * 10 + digit) % mod;\\n        int pow = 1;\\n        while (e) {\\n            if (e & 1)\\n                pow = pow * a % prime;\\n            a = a * a % prime;\\n            e >>= 1;\\n        }\\n        return pow;\\n    }\\n\\n## Using the Chinese Remainder Theorem\\n\\nLet's call **x = a<sup>b</sup>**. We want to know **x % 1337**. The helper function using Fermat already gave us **u** and **w** so that **x % 7 = u** and **x % 191 = w**. Or put differently, **x \\u2261 u (mod 7)** and **x = w + 191t** for some integer **t**. Combine these to get **w + 191t \\u2261 u (mod 7)**. Subtracting **w** and multiplying with [191<sup>-1</sup>]<sub>7</sub> (the multiplicative inverse of 191 modulo 7) we get **t \\u2261 (u-w)\\xb7[191<sup>-1</sup>]<sub>7</sub> (mod 7)**.\\n\\nWe have  [191<sup>-1</sup>]<sub>7</sub> = [(191%7)<sup>-1</sup>]<sub>7</sub> = [2<sup>-1</sup>]<sub>7</sub> and one can easily see that the latter is 4, as (2*4)%7=1.\\n\\nUsing that, we have **t \\u2261 4(u-w) (mod 7)** or in other words **t = 4(u-w) + 7s** for some integer **s**. Which means:\\n\\n **x = w + 191t\\n = w + 191(4(u-w) + 7s)\\n= 764u - 763w + 1337s\\n= 764u + (1337-763)w + 1337(s-w)\\n= 764u + 574w + 1337(s-w)**\\n\\nSo we can compute **x** from **u** and **v** as **x = (764u + 574w) % 1337**, like I have done in my solutions."
		},
		{
			"lc_ans_id":"84485",
			"view":"1619",
			"top":"6",
			"title":"8ms JAVA solution using fast power",
			"vote":"8",
			"content":"```\\nprivate static final int M = 1337;\\n\\n    public int normalPow(int a, int b) {\\n        int result = 1;\\n        while (b != 0) {\\n            if (b % 2 != 0)\\n                result = result * a % M;\\n            a = a * a % M;\\n            b /= 2;\\n        }\\n        return result;\\n    }\\n\\n    public int superPow(int a, int[] b) {\\n        a %= M;\\n        int result = 1;\\n        for (int i = b.length - 1; i >= 0; i--) {\\n            result = result * normalPow(a, b[i]) % M;\\n            a = normalPow(a, 10);\\n        }\\n        return result;\\n    }\\n````"
		},
		{
			"lc_ans_id":"84520",
			"view":"742",
			"top":"7",
			"title":"Java 16 lines AC solution 11ms",
			"vote":"4",
			"content":"just a java version \\n[you can check the C++ solution with more detail here](https://discuss.leetcode.com/topic/50489/c-clean-and-short-solution)\\nBasic math knowlege:\\n(ab)%k=(a%k)(b%k)%k;\\n(abc)%k=(a%k)(b%k)(c%k)%k \\n\\n An example:\\n<h4><code>23^1335%base\\n=(23^1330%base)*(23^5%base)%base\\n=((23^133%base)^10)%base*(23^5%base)%base\\n=function(function(23,133),10)*function(23,5)%base\\n</code></h4>\\n``` java \\npublic class Solution {\\n    int base =1337;\\n    public int superPow(int a, int[] b) {\\n        return helper(a,b,b.length-1);\\n    }\\n    int helper(int a,int[]b,int endidx){\\n        if(endidx==-1) return 1;\\n        int last_digit=b[endidx];\\n        return powmod(helper(a,b,endidx-1),10)*powmod(a,last_digit)%base;\\n    }\\n    int powmod(int a,int k){\\n        a%=base;\\n        int result=1;\\n        for(int i=0;i<k;i++){\\n            result=(result*a)%base;\\n        }\\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"84467",
			"view":"510",
			"top":"8",
			"title":"Simple python solution using recursion",
			"vote":"4",
			"content":"Here we use the following two properties:\\n* `n1*n2 % 1337 == (n1 % 1337)*(n2 % 1337) % 1337`\\n* If `b = m*10 + d`,  we have `a**b == (a**d)*(a**10)**m`\\n```\\nclass Solution(object):\\n    def superPow(self, a, b):\\n        if not b:\\n            return 1\\n        return pow(a, b.pop(), 1337)*self.superPow(pow(a, 10, 1337), b)%1337\\n```"
		},
		{
			"lc_ans_id":"84528",
			"view":"575",
			"top":"9",
			"title":"16ms C++ solution",
			"vote":"3",
			"content":"'''\\nclass Solution {\\npublic:\\n\\tint superPow(int a, vector<int>& b) \\n\\t{\\n\\t\\tif (b.size() == 0) return 1;\\n\\n\\t\\tconst int D = 1337;\\n\\t\\tint A = a % D;\\n\\t\\tvector<int> v(10, 0);\\n\\t\\tv[0] = 1;\\n\\t\\tfor (int i = 1; i < 10; i++)\\n\\t\\t{\\n\\t\\t\\tv[i] = (v[i - 1] * A) % 1337;\\n\\t\\t}\\n\\n\\t\\tint L = v[b[0]];\\n\\n\\t\\tfor (int i = 1; i < b.size(); i++)\\n\\t\\t{\\n\\t\\t\\tint M = 1;\\n\\t\\t\\tfor (int i = 0; i < 10; i++)\\n\\t\\t\\t{\\n\\t\\t\\t\\tM = M*L % D;\\n\\t\\t\\t}\\n\\n\\t\\t\\tM = M*v[b[i]] % D;\\n\\t\\t\\tL = M;\\n\\t\\t}\\n\\n\\t\\treturn L;\\n\\t}\\n};\\n'''"
		}
	],
	"id":"372",
	"title":"Super Pow",
	"content":"<p>\r\nYour task is to calculate <i>a</i><sup><i>b</i></sup> mod 1337 where <i>a</i> is a positive integer and <i>b</i> is an extremely large positive integer given in the form of an array.\r\n</p>\r\n\r\n<p><b>Example1:</b>\r\n<pre>\r\na = 2\r\nb = [3]\r\n\r\nResult: 8\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example2:</b>\r\n<pre>\r\na = 2\r\nb = [1,0]\r\n\r\nResult: 1024\r\n</pre>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/stomach_ache\">@Stomach_ache</a> for adding this problem and creating all test cases.</p>",
	"frequency":"316",
	"ac_num":"19540"
}