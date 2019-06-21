{
	"difficulty":"2",
	"submit_num":"114168",
	"show_id":"313",
	"leetcode_id":"313",
	"answers":[
		{
			"lc_ans_id":"76291",
			"view":"26064",
			"top":"0",
			"title":"Java three methods, 23ms, 36 ms, 58ms(with heap), performance explained",
			"vote":"113",
			"content":"Basic idea is same as ugly number II, new ugly number is generated by multiplying a prime with previous generated ugly number. One catch is need to remove duplicate\\n\\nLet's start with the **common solution** from ugly number II **36 ms, Theoretically O(kN)**\\n\\n    public int nthSuperUglyNumberI(int n, int[] primes) {\\n        int[] ugly = new int[n];\\n        int[] idx = new int[primes.length];\\n    \\n        ugly[0] = 1;\\n        for (int i = 1; i < n; i++) {\\n            //find next\\n            ugly[i] = Integer.MAX_VALUE;\\n            for (int j = 0; j < primes.length; j++)\\n                ugly[i] = Math.min(ugly[i], primes[j] * ugly[idx[j]]);\\n            \\n            //slip duplicate\\n            for (int j = 0; j < primes.length; j++) {\\n                while (primes[j] * ugly[idx[j]] <= ugly[i]) idx[j]++;\\n            }\\n        }\\n    \\n        return ugly[n - 1];\\n    }\\n\\n\\nIf you look at the above solution, it has **redundant multiplication** can be avoided, and also two for loops can be consolidated into one. This **trade-off space for speed. 23 ms, Theoretically O(kN)**\\n\\n    public int nthSuperUglyNumber(int n, int[] primes) {\\n            int[] ugly = new int[n];\\n            int[] idx = new int[primes.length];\\n            int[] val = new int[primes.length];\\n            Arrays.fill(val, 1);\\n    \\n            int next = 1;\\n            for (int i = 0; i < n; i++) {\\n                ugly[i] = next;\\n                \\n                next = Integer.MAX_VALUE;\\n                for (int j = 0; j < primes.length; j++) {\\n                    //skip duplicate and avoid extra multiplication\\n                    if (val[j] == ugly[i]) val[j] = ugly[idx[j]++] * primes[j];\\n                    //find next ugly number\\n                    next = Math.min(next, val[j]);\\n                }\\n            }\\n    \\n            return ugly[n - 1];\\n        }\\n\\nCan we do better? Theoretically yes, by keep the one candidates for each prime in a **heap**, it can improve the theoretical bound to **O( log(k)N )**, but in reality it's **58 ms**. I think it's the result of using higher level object instead of primitive. Can be improved by writing an **index heap** (http://algs4.cs.princeton.edu/24pq/IndexMinPQ.java.html)\\n\\n\\n    public int nthSuperUglyNumberHeap(int n, int[] primes) {\\n        int[] ugly = new int[n];\\n    \\n        PriorityQueue<Num> pq = new PriorityQueue<>();\\n        for (int i = 0; i < primes.length; i++) pq.add(new Num(primes[i], 1, primes[i]));\\n        ugly[0] = 1;\\n    \\n        for (int i = 1; i < n; i++) {\\n            ugly[i] = pq.peek().val;\\n            while (pq.peek().val == ugly[i]) {\\n                Num nxt = pq.poll();\\n                pq.add(new Num(nxt.p * ugly[nxt.idx], nxt.idx + 1, nxt.p));\\n            }\\n        }\\n    \\n        return ugly[n - 1];\\n    }\\n    \\n    private class Num implements Comparable<Num> {\\n        int val;\\n        int idx;\\n        int p;\\n    \\n        public Num(int val, int idx, int p) {\\n            this.val = val;\\n            this.idx = idx;\\n            this.p = p;\\n        }\\n    \\n        @Override\\n        public int compareTo(Num that) {\\n            return this.val - that.val;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"76298",
			"view":"12042",
			"top":"1",
			"title":"7 line consice O(kn) c++ solution",
			"vote":"56",
			"content":" Keep k pointers and update them in each iteration.   Time complexity is O(kn).\\n\\n    int nthSuperUglyNumber(int n, vector<int>& primes) {\\n            vector<int> index(primes.size(), 0), ugly(n, INT_MAX);\\n            ugly[0]=1;\\n            for(int i=1; i<n; i++){\\n                for(int j=0; j<primes.size(); j++) ugly[i]=min(ugly[i],ugly[index[j]]*primes[j]);\\n                for(int j=0; j<primes.size(); j++) index[j]+=(ugly[i]==ugly[index[j]]*primes[j]);\\n            }\\n            return ugly[n-1];\\n    }"
		},
		{
			"lc_ans_id":"76343",
			"view":"11130",
			"top":"2",
			"title":"108ms easy to understand java solution",
			"vote":"42",
			"content":"    public int nthSuperUglyNumber(int n, int[] primes) {\\n        int[] ret    = new int[n];\\n              ret[0] = 1;\\n\\n        int[] indexes  = new int[primes.length];\\n       \\n        for(int i = 1; i < n; i++){\\n            ret[i] = Integer.MAX_VALUE;\\n            \\n            for(int j = 0; j < primes.length; j++){\\n                ret[i] = Math.min(ret[i], primes[j] * ret[indexes[j]]);\\n            }\\n            \\n            for(int j = 0; j < indexes.length; j++){\\n                if(ret[i] == primes[j] * ret[indexes[j]]){\\n                    indexes[j]++;\\n                }\\n            }\\n        }\\n        \\n        return ret[n - 1];\\n    }"
		},
		{
			"lc_ans_id":"76301",
			"view":"10351",
			"top":"3",
			"title":"Python, generators on a heap",
			"vote":"39",
			"content":"**Solution 1** ... ~550 ms (updated July 2016, originally was ~1570 ms)\\n\\nUsing generators and `heapq.merge`. Too bad there's no `itertools.unique`.\\n\\n    def nthSuperUglyNumber(self, n, primes):\\n        uglies = [1]\\n        def gen(prime):\\n            for ugly in uglies:\\n                yield ugly * prime\\n        merged = heapq.merge(*map(gen, primes))\\n        while len(uglies) < n:\\n            ugly = next(merged)\\n            if ugly != uglies[-1]:\\n                uglies.append(ugly)\\n        return uglies[-1]\\n\\n---\\n\\n**Solution 2** ... ~500 ms (updated July 2016, originally was ~1400 ms)\\n\\nSame thing done differently and it's a bit faster.\\n\\n    def nthSuperUglyNumber(self, n, primes):\\n        uglies = [1]\\n        merged = heapq.merge(*map(lambda p: (u*p for u in uglies), primes))\\n        uniqed = (u for u, _ in itertools.groupby(merged))\\n        map(uglies.append, itertools.islice(uniqed, n-1))\\n        return uglies[-1]"
		},
		{
			"lc_ans_id":"76395",
			"view":"2417",
			"top":"4",
			"title":"Wrong Test case",
			"vote":"11",
			"content":"I am using Java and failed because of this case.\\n\\n500000\\n[7,19,29,37,41,47,53,59,61,79,83,89,101,103,109,127,131,137,139,157,167,179,181,199,211,229,233,239,241,251]\\n\\nOJ is expecting 127671181, however, the right answer should be greater than Integer.MAX_VALUE."
		},
		{
			"lc_ans_id":"76330",
			"view":"4610",
			"top":"5",
			"title":"Using min-heap, Accepted Java and Python code",
			"vote":"11",
			"content":"The idea is similar to 264 Ugly Number II. The insight is that each new ugly number is generated from the previous ugly number by multiplying one of the prime. Thus we can maintain a pointer for each prime which indicates the current position of the generated ugly number list. Then there is a new ugly number from each prime, then we find the minimum one from them. Naturally the minimum one can be found by min-heap.\\n\\nThe Java version is accepted by 474 ms, but not the python version. \\n\\n**UPDATE**: Thanks **Stefan** for pointing out that the complexity of this algorithm is **NOT** O(nlog(k)). I have modified the Python code and it was just accepted by 800 ms; the modified Java code is accepted by 160 ms. I will keep the original inefficient code here and Please check the updated code below...\\n\\nJava\\n\\n    import java.util.Comparator;\\n    import java.util.PriorityQueue;\\n    public class Solution {\\n    public int nthSuperUglyNumber(int n, int[] primes) {\\n\\t\\tComparator<Number> comparator = new NumberCompare();\\n\\t\\tPriorityQueue<Number> queue = \\n\\t            new PriorityQueue<Number>(primes.length, comparator);\\n\\t\\tfor(int i = 0; i < primes.length; i ++) \\n\\t\\t\\tqueue.add(new Number(primes[i], 0, primes[i]));\\n\\t\\tint[] uglyNums = new int[n];\\n\\t\\tuglyNums[0] = 1;\\n\\t\\tfor(int i = 1; i < n; i++){\\n\\t\\t\\tNumber min = queue.peek();\\n\\t\\t\\tuglyNums[i] = min.un;\\n\\t\\t\\twhile(queue.peek().un == min.un){\\n\\t\\t\\t\\tNumber tmp = queue.poll();\\n\\t\\t\\t\\tqueue.add(new Number(uglyNums[tmp.pos + 1] * tmp.prime, tmp.pos+1, tmp.prime)); \\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn uglyNums[n-1];\\n    }\\n    \\n\\tpublic class Number{\\n\\t\\tint un;\\n\\t\\tint pos;\\n\\t\\tint prime;\\n\\t\\tNumber(int un, int pos, int prime){\\n\\t\\t\\tthis.un = un;\\n\\t\\t\\tthis.pos = pos;\\n\\t\\t\\tthis.prime = prime;\\n\\t\\t}\\n\\t}\\n\\t\\n\\tpublic class NumberCompare implements Comparator<Number>{\\n\\n\\t\\t@Override\\n\\t\\tpublic int compare(Number x, Number y) {\\n\\t\\t\\t// TODO Auto-generated method stub\\n\\t\\t\\tif (x.un > y.un)\\n\\t\\t\\t\\treturn 1;\\n\\t\\t\\telse if (x.un < y.un)\\n\\t\\t\\t\\treturn -1;\\n\\t\\t\\telse\\n\\t\\t\\t\\treturn 0;\\n\\t\\t}\\n\\t}\\n}\\n\\n\\n\\nPython \\n\\n    class Solution(object):\\n    def nthSuperUglyNumber(self, n, primes):\\n        \"\"\"\\n        :type n: int\\n        :type primes: List[int]\\n        :rtype: int\\n        \"\"\"\\n        # Use the heap to find the next one\\n        import heapq\\n        q, uglyNums = [], [1]\\n        k = len(primes)\\n        for i in range(k): heapq.heappush(q, (primes[i], 0, primes[i]))\\n        while len(uglyNums) < n:\\n            x, i, p = q[0]\\n            uglyNums += [x]\\n            while q and q[0][0] == x:\\n                x, i, p = heapq.heappop(q)\\n                heapq.heappush(q, (p * uglyNums[i+1], i+1, p))\\n        return uglyNums[-1]"
		},
		{
			"lc_ans_id":"76369",
			"view":"1160",
			"top":"6",
			"title":"Fast Python solution based on solution for Ugly Number II",
			"vote":"7",
			"content":"Just an extrapolation of @dietpepsi's solution for Ugly Number II\\nhttps://leetcode.com/discuss/61443/ac-python-solution-o-n-time-o-n-space\\n\\n\\n\\n\\n    class Solution(object):\\n        def nthSuperUglyNumber(self, n, primes):\\n            \"\"\"\\n            :type n: int\\n            :type primes: List[int]\\n            :rtype: int\\n            \"\"\"\\n            ugly = [1] * n\\n            i_list = [-1] * len(primes)\\n            v_list = [1] * len(primes)\\n            k = 0\\n            while k < n:\\n                x = min(v_list)\\n                ugly[k] = x\\n                for v in xrange(len(v_list)):\\n                    if x == v_list[v]:\\n                        i_list[v] += 1\\n                        v_list[v] = ugly[i_list[v]] * primes[v]\\n                k += 1\\n            return ugly[k-1]"
		},
		{
			"lc_ans_id":"76314",
			"view":"2171",
			"top":"7",
			"title":"Heap is slower than array\\u2014possible explanation",
			"vote":"7",
			"content":"The most efficient solutions so far were based on the idea of taking a sequence of numbers starting with the given primes and then take the minimum one, update the values by multiplying the minimum ones by the next respective ugly number (already found) and start looking for the minimum again.\\n\\nThe question is, what data structure to use for that layer of current candidates for ugly numbers? You need something that supports fast search for the minimum number, so the first thing that comes to mind is a min-heap. The problem is even tagged heap, for that matter!\\n\\nHowever, when using `PriorityQueue` in Java, which is a real efficient min-heap, I found out that my solution runs for 76 ms, beating 95%, but dumb solution using a regular array to store those candidates runs 36 ms, beating 99%! Why is that?\\n\\nI understand that inserting into a min-heap takes `O(log k)` time, but looking for the minimum is `O(1)`! On the other hand, dumb array solution uses linear search which is `O(k)`, even though removal/insertion is not needed at all.\\n\\nGiven that the problem description says that there can be up to 10000 primes, which is a lot for linear search, these results are very surprising. Is this just because the tests don't actually contain that kind of huge inputs, or am I missing something fundamental here?\\n\\nMy idea is that it has something to do with duplicates. If there is a lot of them, that means that we are removing/inserting elements from the heap many times per each outer loop iteration. If the number of duplicates approaches `k`, then we have `O(k log k)` complexity, which is worse than `O(k)` for a dumb array.\\n\\nIf that's the case, I wonder if it's possible to mitigate that by somehow merging elements together so that the heap always contain one minimum value for us to retrieve. That would be very tricky, though, if possible at all, because we need to be able to somehow do that before we even know that those elements are minimum ones. Which means we have to always merge equal elements, possibly by using some sort of a helper hash table or something."
		},
		{
			"lc_ans_id":"76326",
			"view":"3695",
			"top":"8",
			"title":"112ms C++ solution with explanation",
			"vote":"7",
			"content":"    class Solution {\\n    public:\\n        int nthSuperUglyNumber(int n, vector<int>& primes) {\\n            vector<int> superUglyNumbers;\\n            superUglyNumbers.push_back(1);  // first super ugly number\\n            int numPrimes = primes.size();\\n            vector<int> idxs(numPrimes, 0);\\n            // add super ugly number up to nth \\n            while(superUglyNumbers.size() < n)\\n            {\\n                int nextSuperUglyNumber = superUglyNumbers[idxs[0]]*primes[0];   // next super ugly number\\n                for(int i = 0; i < numPrimes; i++)\\n                {\\n                    nextSuperUglyNumber = min(nextSuperUglyNumber, superUglyNumbers[idxs[i]]*primes[i]);\\n                }\\n                for(int i = 0; i < numPrimes; i++)\\n                {\\n                    if(nextSuperUglyNumber == superUglyNumbers[idxs[i]]*primes[i])\\n                    {\\n                        idxs[i]++;\\n                    }\\n                }\\n                superUglyNumbers.push_back(nextSuperUglyNumber);\\n            }\\n            \\n            return superUglyNumbers[n-1];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"76331",
			"view":"899",
			"top":"9",
			"title":"Clear c++ solution inspired by Ugly Number II",
			"vote":"6",
			"content":"    int nthSuperUglyNumber(int n, vector<int>& primes) {\\n    \\tint k = primes.size();\\n    \\tvector<int> pos(k, 0);\\n    \\tvector<int> res(n);\\n    \\tres[0] = 1;\\n    \\tfor (int i = 1; i < n; i++) {\\n    \\t\\tint temp = INT_MAX;\\n    \\t\\tfor (int j = 0; j < k; j++) \\n    \\t\\t\\ttemp = min(temp, res[pos[j]] * primes[j]);\\n    \\t\\tfor (int j = 0; j < k; j++) {\\n    \\t\\t\\tif (temp == res[pos[j]] * primes[j])\\n    \\t\\t\\t\\tpos[j]++;\\n    \\t\\t}\\n    \\t\\tres[i] = temp;\\n    \\t}\\n    \\treturn res[n - 1];\\n    }"
		}
	],
	"id":"313",
	"title":"Super Ugly Number",
	"content":"<p>\r\n    Write a program to find the n<sup>th</sup> super ugly number.\r\n</p>\r\n\r\n<p>\r\n    Super ugly numbers are positive numbers whose all prime factors are in the given prime list\r\n    <code>primes</code> of size <code>k</code>. For example, <code>[1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32]\r\n</code> is the sequence of the first 12 super ugly numbers given <code>primes</code>\r\n    = <code>[2, 7, 13, 19]</code> of size 4.\r\n</p>\r\n\r\n<p>\r\n    <b>Note:</b><br/>\r\n    (1) <code>1</code> is a super ugly number for any given <code>primes</code>.<br/>\r\n    (2) The given numbers in <code>primes</code> are in ascending order.<br/>\r\n    (3) 0 < <code>k</code> &le; 100, 0 < <code>n</code> &le; 10<sup>6</sup>, 0 < <code>primes[i]</code> < 1000.<br />\r\n    (4) The n<sup>th</sup> super ugly number is guaranteed to fit in a 32-bit signed integer.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"276",
	"ac_num":"43617"
}