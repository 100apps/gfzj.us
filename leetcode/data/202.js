{
	"difficulty":"1",
	"submit_num":"361191",
	"show_id":"202",
	"leetcode_id":"202",
	"answers":[
		{
			"lc_ans_id":"56917",
			"view":"46643",
			"top":"0",
			"title":"My solution in C( O(1) space and no magic math property involved )",
			"vote":"474",
			"content":"I see the majority of those posts use hashset to record values. Actually, we can simply adapt the Floyd Cycle detection algorithm. I believe that many people have seen this in the Linked List Cycle detection problem. The following is my code:\\n\\n    int digitSquareSum(int n) {\\n        int sum = 0, tmp;\\n        while (n) {\\n            tmp = n % 10;\\n            sum += tmp * tmp;\\n            n /= 10;\\n        }\\n        return sum;\\n    }\\n    \\n    bool isHappy(int n) {\\n        int slow, fast;\\n        slow = fast = n;\\n        do {\\n            slow = digitSquareSum(slow);\\n            fast = digitSquareSum(fast);\\n            fast = digitSquareSum(fast);\\n        } while(slow != fast);\\n        if (slow == 1) return 1;\\n        else return 0;\\n    }"
		},
		{
			"lc_ans_id":"56913",
			"view":"27973",
			"top":"1",
			"title":"Beat 90% Fast Easy Understand Java Solution with Brief Explanation",
			"vote":"98",
			"content":"The idea is to use one hash set to record sum of every digit square of every number occurred. Once the current sum cannot be added to set, return false; once the current sum equals 1, return true;\\n\\n    public boolean isHappy(int n) {\\n        Set<Integer> inLoop = new HashSet<Integer>();\\n        int squareSum,remain;\\n\\t\\twhile (inLoop.add(n)) {\\n\\t\\t\\tsquareSum = 0;\\n\\t\\t\\twhile (n > 0) {\\n\\t\\t\\t    remain = n%10;\\n\\t\\t\\t\\tsquareSum += remain*remain;\\n\\t\\t\\t\\tn /= 10;\\n\\t\\t\\t}\\n\\t\\t\\tif (squareSum == 1)\\n\\t\\t\\t\\treturn true;\\n\\t\\t\\telse\\n\\t\\t\\t\\tn = squareSum;\\n\\n\\t\\t}\\n\\t\\treturn false;\\n\\n    }"
		},
		{
			"lc_ans_id":"56919",
			"view":"11317",
			"top":"2",
			"title":"Explanation of why those posted algorithms are mathematically valid",
			"vote":"83",
			"content":"Earlier posts gave the algorithm but did not explain why it is valid mathematically, and this is what this post is about: present a \"short\" mathematical proof.\\n\\nFirst of all, it is easy to argue that starting from a number `I`, if some value - say `a` - appears again during the process after `k` steps, the initial number `I` cannot be a happy number. Because `a` will continuously become `a` after every `k` steps.\\n\\nTherefore, as long as we can show that there is a loop after running the process continuously, the number is not a happy number.\\n\\nThere is another detail not clarified yet: For any non-happy number, will it definitely end up with a loop during the process? This is important, because it is possible for a non-happy number to follow the process endlessly while having no loop.\\n\\nTo show that a non-happy number will definitely generate a loop, we only need to show that `for any non-happy number, all outcomes during the process are bounded by some large but finite integer N`. If all outcomes can only be in a finite set `(2,N]`, and since there are infinitely many outcomes for a non-happy number, there has to be at least one duplicate, meaning a loop!\\n\\nSuppose after a couple of processes, we end up with a large outcome `O1` with `D` digits where `D` is kind of large, say `D>=4`, i.e., `O1 > 999` (If we cannot even reach such a large outcome, it means all outcomes are bounded by `999` ==> loop exists). We can easily see that after processing `O1`, the new outcome `O2` can be at most `9^2*D < 100D`, meaning that `O2` can have at most `2+d(D)` digits, where `d(D)` is the number of digits `D` have. It is obvious that `2+d(D) < D`. We can further argue that `O1` is the maximum (or boundary) of all outcomes afterwards. This can be shown by contradictory: Suppose after some steps, we reach another large number `O3 > O1`. This means we process on some number `W <= 999` that yields `O3`. However, this cannot happen because the outcome of `W` can be at most `9^2*3 < 300 < O1`.\\n\\nDone.\\n\\nPlease leave your comment if any question or suggestion."
		},
		{
			"lc_ans_id":"56976",
			"view":"20185",
			"top":"3",
			"title":"O(1) space Java solution",
			"vote":"69",
			"content":"    public class Solution {\\n        public boolean isHappy(int n) {\\n            int x = n;\\n            int y = n;\\n            while(x>1){\\n                x = cal(x) ;\\n                if(x==1) return true ;\\n                y = cal(cal(y));\\n                if(y==1) return true ;\\n    \\n                if(x==y) return false;\\n            }\\n            return true ;\\n        }\\n        public int cal(int n){\\n            int x = n;\\n            int s = 0;\\n            while(x>0){\\n                s = s+(x%10)*(x%10);\\n                x = x/10;\\n            }\\n            return s ;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"56942",
			"view":"11656",
			"top":"4",
			"title":"4ms, 5 line C code",
			"vote":"48",
			"content":"Using fact all numbers in [2, 6] are not happy (and all not happy numbers end on a cycle that hits this interval):\\n\\n    bool isHappy(int n) {\\n        while(n>6){\\n            int next = 0;\\n            while(n){next+=(n%10)*(n%10); n/=10;}\\n            n = next;\\n        }\\n        return n==1;\\n    }"
		},
		{
			"lc_ans_id":"56915",
			"view":"4593",
			"top":"5",
			"title":"My Python Solution",
			"vote":"35",
			"content":"    def isHappy(self, n):\\n        mem = set()\\n        while n != 1:\\n            n = sum([int(i) ** 2 for i in str(n)])\\n            if n in mem:\\n                return False\\n            else:\\n                mem.add(n)\\n        else:\\n            return True"
		},
		{
			"lc_ans_id":"57134",
			"view":"3467",
			"top":"6",
			"title":"Share my accepted Java solution!",
			"vote":"26",
			"content":"    public class Solution {\\n        public boolean isHappy(int n) {\\n            HashSet<Integer> set = new HashSet<Integer>();\\n            set.add(n);\\n            while (n != 1) {\\n                int result = 0;\\n                while (n != 0) {\\n                    result += Math.pow(n % 10, 2);\\n                    n /= 10;\\n                }\\n                if (set.contains(result)) {\\n                    return false;\\n                }\\n                set.add(result);\\n                n = result;\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"56918",
			"view":"2896",
			"top":"7",
			"title":"All you need to know about testing happy number!",
			"vote":"23",
			"content":"for those who are less patient, here is some findings,\\n> (1) for a positive integer n, n is either a happy number or unhappy with\\n> cycle length 7.\\n> \\n> (2) digitSquareSum(n) < n for all n>99\\n> \\n> (3) there are 19 happy numbers and 80 unhappy numbers in [1,99]\\n> \\n> (4) happyNumLess100 = [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70,\\n> 79, 82, 86, 91, 94, 97]\\n> \\n> (5) for these numbers the corresponding update count to become 1 is  stepcnt = [0, 5,\\n> 1, 2, 4, 3, 3, 2, 3, 4, 4, 2, 5, 3, 3, 2, 4, 4, 3]\\n\\n[GWTW][1] has explained why a loop must exist if not happy, I will show something more.\\n\\nlet g(n) denote digitSquareSum function, eg. g(4) = g(16), g(19) = 82 etc\\n------------------------------------------------------------------------\\n\\n - for nin [1,10), g(n)>=n, since g(n)=n*n>=nwith equality hold only\\n   for n=1\\n - for other n with only highest digit nonzero (eg. 10, 90, 500, 4000,\\n   20000, etc), g(n)<n\\n - and we can factor n into sum of numbers with only highest digit\\n   nonzero, eg. 12045 = 10000 + 2000 + 40 + 5\\n\\nin this way, we can show for any n>=100, g(n) < n\\n\\nby calculate all cases in [1,200], \\n\\n    L1 = [digitSquareSum(n) - n for n in range(1,200)]\\n    L2 = list(filter(lambda x: x>0, L1))\\n    L3 = list(filter(lambda x: x>0, L1[99:]))\\n    len(L1), len(L2), len(L3)\\n    >>> (199, 50, 0)\\n    max(L2), L1.count(max(L2)), 1 + L1.index(max(L2))\\n    >>> (72, 1, 9)\\n    min(L2), L1.count(min(L2)), 1 + L1.index(min(L2))\\n    >>> (2, 1, 2)\\n\\nthe test shows that\\n-------------------\\n\\n> (1) for all n>=100, g(n) < n.  \\n> \\n> (2) there are only 50 number such that g(n) < n, among them for g(n)-n\\n>\\n> (3) the unique largest is 9 (g(9)-9 = 72), the unique smallest is 2 \\n> (g(2) - 2 = 2).\\n\\n    def isHappy(n):\\n        ''' rtype: int\\n            return 0 if n is happy otherwise return the smallet cycle length\\n        '''\\n        # implementation ....\\n\\n\\n    cycleLength = [isHappy(n) for n in range(1,10000)]\\n    max(cycleLength)\\n    >>> 7\\n    cycleLength.count(7) + cycleLength.count(0) == len(cycleLength)\\n    >>> True\\n\\nwhich shows a surprising result, there is only two cases for any positive integer n\\n------------------------------------------------------------------------\\n\\n> (1) n is a happy number\\n> \\n> (2) n is not happy and have cycle length 7 (we will further verify\\n> about the cycle length soon)\\n\\nthis can be verified like below. the algorithm is basically\\n\\n    Algorithm 1\\n    input: n (positive integer)\\n    func g = digitSquareSum\\n    while n!=1 and n's current value not appeared in this calculation process\\n        n= g(n)\\n    output: True if n==1, false otherwise\\n\\nbut we have showed,\\n-------------------\\n\\n> (1) for all n>=100, the update step (n= g(n)) reduce the value of n\\n> \\n> (2) a loop exist if and only if update have both decreasing and\\n> increasing effect in the whole process (the only case of equality is\\n> 1, which is excluded at first)\\n> \\n> (3) increasing update can only happen for 50 numbers, all of them less\\n> than 100\\n\\nso if we have a True table for all numbers less than 100 indicating happiness, denote it as HappyTable, then algorithm could be changed to\\n\\n    Algorithm 2\\n    input: n (positive integer)\\n    func g = digitSquareSum\\n    while n>99\\n        n = g(n)\\n    output: HappyTable(n)\\n\\nif we use function isHappy previously showed (return 0 if n is happy otherwise return the smallet cycle length)\\n\\n    mylist = [isHappy(n) for n in range(1,100)]\\n    happyList = [i+1 for i, val in enumerate(mylist) if val==0]\\n    unhappyList = [i+1 for i, val in enumerate(mylist) if val!=0] # or equivalently if val==7\\n    len(mylist), len(happyList), len(unhappyList)\\n    >>> (99, 19, 80)\\n    happyList\\n    >>> [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97]\\n\\nso it seems that the HappyTable can be easily achieved by a set\\n---------------------------------------------------------------\\n\\n    Algorithm 3 (in python)\\n    def isHappy(n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: bool\\n        \"\"\"\\n        happySet = set([1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97])\\n        while n>99:\\n            n = digitSquareSum(n)\\n        return n in happySet\\n\\n    # another version\\n    def isHappy(self, n):\\n        while n>99:\\n            n = self.digitSquareSum(n)\\n        for i in range(5): // for why 5, see below about 'stepcnt'\\n            if n==1: break\\n            n = self.digitSquareSum(n)\\n        return n==1\\n    # another version worked for current test case, but may fail\\n    def isHappy(self, n):\\n        cnt = 6\\n        while n>1 and cnt:\\n            cnt -= 1\\n            tmp, n = n, 0\\n            while tmp:\\n                n += (tmp%10)*(tmp%10)\\n                tmp = int(tmp/10)\\n        return n==1\\n\\n    # some test about how many update step needed for happy number less than 100\\n    def beHappy(n):\\n        \"\"\"\\n        n should be in range(1,100), \\n        return step number to become 1 for happy number, \\n        7 otherwise\\n        \"\"\"\\n        cnt = 0\\n        while n>1 and cnt<7:\\n            cnt += 1\\n            n = digitSquareSum(n)\\n        return cnt if n==1 else 7\\n    \\n    \\n    K = [beHappy(n) for n in range(1,100)]\\n    \\n    K.count(7)\\n    >>> 80\\n    stepcnt = [n for n in K if n<7]\\n    stepcnt\\n    >>> [0, 5, 1, 2, 4, 3, 3, 2, 3, 4, 4, 2, 5, 3, 3, 2, 4, 4, 3]\\n\\n\\n**Eureka!!**\\n\\n\\n  [1]: https://leetcode.com/discuss/71625/explanation-those-posted-algorithms-mathematically-valid"
		},
		{
			"lc_ans_id":"56946",
			"view":"3102",
			"top":"8",
			"title":"My Java solution: find 1 or 7 when happy sum is a single digit",
			"vote":"17",
			"content":"In order to find a rule to break out the loop, I start calculating 2 and find a loop at 4, then 3,5,6,9 will all go into that loop. So in 1-9, only 1 and 7 are happy numbers. Also I find all numbers' calculation will goes into a single digit at some time. So what I did is just calculate happy sum and when it is a single digit, check if it is 1 or 7 ^.^\\n\\n    public boolean isHappy(int n) {\\n            if(n<=0) return false;\\n            while(true){\\n                int sum=0;\\n                while(n!=0){\\n                  sum+=(n%10)*(n%10);\\n                  n=n/10;\\n                }\\n                if(sum/10==0){\\n                   if(sum==1||sum==7) return true;\\n                   else return false;\\n                }\\n                n=sum;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"57111",
			"view":"2117",
			"top":"9",
			"title":"No hashset, O(1) time check whether is in the loop with mathematical proof",
			"vote":"14",
			"content":"class Solution {\\npublic:\\n    int loop[8] = {4,16,37,58,89,145,42,20};\\n    \\n    bool inLoop(int n){\\n        for(auto x: loop){\\n            if(x == n) return true;\\n        }\\n        return false;\\n    }\\n    \\n    bool isHappy(int n) {\\n        if(n == 1) return true;\\n        if(inLoop(n)) return false;\\n        int next = 0;\\n        while(n){\\n            next += (n%10)*(n%10);\\n            n /= 10;\\n        }\\n        return isHappy(next);\\n    }\\n};\\n\\nproof:\\n\\n1.loop number is less than 162.\\n\\nAssume f(x) is the sum of the squares of x's digits. let's say  0 < x <= 9,999,999,999 which is larger than the range of an int. f(x) <= 9^2 * 10 = 810. So no mater how big x is, after one step of f(x), it will be less than 810.The most large f(x) value (x < 810) is f(799) = 211. And do this several times: f(211) < f(199) = 163.  f(163) < f(99) = 162. So no mater which x you choose after several times of f(x),it finally fall in the range of [1,162] and can never get out.\\n\\n2.I check every unhappy number in range of [1,162] , they all fall in loop {4,16,37,58,89,145,42,20} ,which means every unhappy number fall in this loop."
		}
	],
	"id":"202",
	"title":"Happy Number",
	"content":"<p>Write an algorithm to determine if a number is \"happy\".</p>\r\n\r\n<p>A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.</p>\r\n\r\n<p><b>Example:&nbsp;</b>19 is a happy number</p>\r\n\r\n<ul style=\"list-style: none;\">\r\n<li>1<sup>2</sup> + 9<sup>2</sup> = 82</li>\r\n<li>8<sup>2</sup> + 2<sup>2</sup> = 68</li>\r\n<li>6<sup>2</sup> + 8<sup>2</sup> = 100</li>\r\n<li>1<sup>2</sup> + 0<sup>2</sup> + 0<sup>2</sup> = 1</li>\r\n</ul>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/mithmatt\">@mithmatt</a> and <a href=\"https://leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"564",
	"ac_num":"149132"
}