{
	"difficulty":"1",
	"submit_num":"533521",
	"show_id":"204",
	"leetcode_id":"204",
	"answers":[
		{
			"lc_ans_id":"57588",
			"view":"41580",
			"top":"0",
			"title":"My simple Java solution",
			"vote":"129",
			"content":"    public class Solution {\\n        public int countPrimes(int n) {\\n            boolean[] notPrime = new boolean[n];\\n            int count = 0;\\n            for (int i = 2; i < n; i++) {\\n                if (notPrime[i] == false) {\\n                    count++;\\n                    for (int j = 2; i*j < n; j++) {\\n                        notPrime[i*j] = true;\\n                    }\\n                }\\n            }\\n            \\n            return count;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"57595",
			"view":"13733",
			"top":"1",
			"title":"Fast Python Solution",
			"vote":"67",
			"content":"    class Solution:\\n    # @param {integer} n\\n    # @return {integer}\\n    def countPrimes(self, n):\\n        if n < 3:\\n            return 0\\n        primes = [True] * n\\n        primes[0] = primes[1] = False\\n        for i in range(2, int(n ** 0.5) + 1):\\n            if primes[i]:\\n                primes[i * i: n: i] = [False] * len(primes[i * i: n: i])\\n        return sum(primes)"
		},
		{
			"lc_ans_id":"57594",
			"view":"22140",
			"top":"2",
			"title":"My easy one round c++ code",
			"vote":"58",
			"content":"    int countPrimes(int n) {\\n        if (n<=2) return 0;\\n\\t\\tvector<bool> passed(n, false);\\n\\t\\tint sum = 1;\\n\\t\\tint upper = sqrt(n);\\n\\t\\tfor (int i=3; i<n; i+=2) {\\n\\t\\t\\tif (!passed[i]) {\\n\\t\\t\\t\\tsum++;\\n\\t\\t\\t\\t//avoid overflow\\n\\t\\t\\t\\tif (i>upper) continue;\\n\\t\\t\\t\\tfor (int j=i*i; j<n; j+=i) {\\n\\t\\t\\t\\t\\tpassed[j] = true;\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn sum;\\n    }"
		},
		{
			"lc_ans_id":"57593",
			"view":"14305",
			"top":"3",
			"title":"12 ms Java solution modified from the hint method, beats 99.95%",
			"vote":"44",
			"content":"    publib int countPrimes(int n) {\\n        if (n < 3)\\n            return 0;\\n            \\n        boolean[] f = new boolean[n];\\n        //Arrays.fill(f, true); boolean[] are initialed as false by default\\n        int count = n / 2;\\n        for (int i = 3; i * i < n; i += 2) {\\n            if (f[i])\\n                continue;\\n            \\n            for (int j = i * i; j < n; j += 2 * i) {\\n                if (!f[j]) {\\n                    --count;\\n                    f[j] = true;\\n                }\\n            }\\n        }\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"57601",
			"view":"10886",
			"top":"4",
			"title":"Short C++ Sieve of Eratosthenes solution",
			"vote":"43",
			"content":"    class Solution {\\n    public:\\n        int countPrimes(int n) {\\n            vector<bool> prime(n, true);\\n            prime[0] = false, prime[1] = false;\\n            for (int i = 0; i < sqrt(n); ++i) {\\n                if (prime[i]) {\\n                    for (int j = i*i; j < n; j += i) {\\n                        prime[j] = false;\\n                    }    \\n                }    \\n            }\\n            return count(prime.begin(), prime.end(), true);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"57708",
			"view":"5288",
			"top":"5",
			"title":"My C solutions in 44ms, time nearly O(n), and space nearly O(n)",
			"vote":"33",
			"content":"        /*1. trick1 is to use square root of n.\\n         2.  trick2 is not to use non-prime numbers as the step\\n         3. trick3 is to use i*i as the start. \\n         4. trick4 is to use count-- in every loop, avoiding another traversal. */  \\n    int countPrimes(int n) {\\n    \\tif(n <= 2) return 0;\\n    \\tif(n == 3) return 1;\\n    \\tbool *prime= (bool*)malloc(sizeof(bool)*n);\\n    \\tint i=0,j=0;\\n    \\tint count = n-2;\\n    \\tint rt = sqrt(n);//trick1\\n    \\tfor(j = 0; j < n; j++)\\n    \\t{\\n    \\t\\tprime[j] = 1;\\n    \\t}\\n    \\tfor(i = 2; i <= rt; i++)\\n    \\t{\\n    \\t     if (prime[i])//trick2\\n    \\t    {\\n        \\t    for(j=i*i ; j<n ; j+=i)//trick3\\n        \\t    {\\n        \\t        if (prime[j])\\n        \\t                {\\n        \\t                   prime[j]=0;\\n        \\t                   count--;//trick4\\n        \\t                }\\n        \\t    }\\n    \\t    }\\n    \\t}\\n    \\tfree(prime);\\n    \\treturn count;\\n    }"
		},
		{
			"lc_ans_id":"57636",
			"view":"4724",
			"top":"6",
			"title":"My JAVA Solution",
			"vote":"27",
			"content":"    public class Solution {\\n        public int countPrimes(int n) {\\n             boolean[] m = new boolean[n];\\n            int count = 0;\\n            for (int i=2; i<n; i++) {\\n                if (m[i])\\n                    continue;\\n                 \\n                count++;\\n                for (int j=i; j<n; j=j+i)\\n                    m[j] = true;\\n            }\\n             \\n            return count;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"57614",
			"view":"3107",
			"top":"7",
			"title":"Simple 16 ms,10 line C++ solution. 1.use new bool array 2. only traverse odd numbers 3.count and sieve at the same time",
			"vote":"24",
			"content":"1. use new bool array. 2. only traverse odd numbers. 3. count and sieve at the same time.\\n\\ntrick 1, thanks to [27ms,16 lines, C++ solution][1]\\n\\ntrick 2, for the inspiration, thanks to [my C solutions in 13ms,use Sieve of Eratosthenes and only test 6n-1 and 6n+1][2]\\n\\ntrick 3, thanks to [my C solutions in 44ms, time nearly O(n), and space nearly O(n)][3] and [my easy one round c++ code][4]\\n\\n    int countPrimes(int n) {\\n    \\tif (n <= 2) return 0;\\n    \\tint res=n>>1, m=sqrt(n-1); // intilize res to n/2, removes all even number(not 2) and 1\\n    \\tbool *table=new bool[n];\\n    \\tfor(int i=3,j,step;i<=m;i+=2)\\n    \\t\\tif(!table[i]) { // i is an odd prime\\n    \\t\\t\\tfor(step=i<<1, j=i*i;j<n;j+=step) // step=i*2, ignore even numbers\\n    \\t\\t\\tif(!table[j]) { table[j]=1; --res; }\\n    \\t\\t}\\n    \\tdelete []table;\\n    \\treturn res;\\n    }\\n\\n  [1]: https://leetcode.com/discuss/33669/27ms-16-lines-c-solution\\n  [2]: https://leetcode.com/discuss/35973/solutions-13ms-use-sieve-eratosthenes-and-only-test-6n-and-6n\\n  [3]: https://leetcode.com/discuss/34622/my-c-solutions-in-44ms-time-nearly-o-n-and-space-nearly-o-n\\n  [4]: https://leetcode.com/discuss/33694/my-easy-one-round-c-code"
		},
		{
			"lc_ans_id":"57587",
			"view":"3020",
			"top":"8",
			"title":"Python easy to understand solution.",
			"vote":"18",
			"content":"        \\n    def countPrimes(self, n):\\n        if n <= 2:\\n            return 0\\n        res = [True] * n\\n        res[0] = res[1] = False\\n        for i in xrange(2, n):\\n            if res[i] == True:\\n                for j in xrange(2, (n-1)//i+1):\\n                    res[i*j] = False\\n        return sum(res)"
		},
		{
			"lc_ans_id":"57648",
			"view":"3517",
			"top":"9",
			"title":"Beats 99.45% of submissions",
			"vote":"15",
			"content":"    public class Solution {\\n    public int countPrimes(int n) {\\n\\t\\t\\n\\t\\tif( n <=2) {\\n\\t\\t\\treturn 0;\\n\\t\\t}\\n\\t\\t\\n\\t\\tint c= 1;\\n\\t\\t\\n\\t\\tboolean isNotPrime[] = new boolean[n+1];\\n\\t\\t\\n\\t\\t\\n\\t\\t\\n\\t\\tfor(int i=3;i*i<=n;i=i+2) {\\n\\t\\t\\t\\n\\t\\t\\tif(isNotPrime[i]) {\\n\\t\\t\\t\\t\\n\\t\\t\\t\\tcontinue;\\n\\t\\t\\t}\\n\\t\\t\\t\\n\\t\\t\\tfor(int j= i*i ;j<=n;j=j+2*i) {\\n\\t\\t\\t\\tisNotPrime[j] = true;\\n\\t\\t\\t} \\n            \\t\\t\\t\\n\\t\\t}\\n        \\n\\t\\tfor(int i =3;i<n;i=i+2){\\n\\t\\t\\t\\n\\t\\t\\t\\n\\t\\t\\tif(!isNotPrime[i]) {\\n\\t\\t\\t\\tc++;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn c;\\n\\t\\t\\n\\t}\\n    }"
		}
	],
	"id":"204",
	"title":"Count Primes",
	"content":"<p><b>Description:</b></p>\r\n<p>Count the number of prime numbers less than a non-negative number, <b><i>n</i></b>.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/mithmatt\">@mithmatt</a> for adding this problem and creating all test cases.</p>",
	"frequency":"449",
	"ac_num":"142152"
}