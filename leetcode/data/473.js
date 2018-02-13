{
	"difficulty":"2",
	"submit_num":"26962",
	"show_id":"481",
	"leetcode_id":"481",
	"answers":[
		{
			"lc_ans_id":"96413",
			"view":"10349",
			"top":"0",
			"title":"Simple Java solution using one array and two pointers",
			"vote":"44",
			"content":"Algorithm:\\n1. Create an ```int``` array ```a``` and initialize the first 3 elements with ```1, 2, 2```.\\n2. Create two pointers ```head``` and ```tail```. ```head``` points to the number which will be used to generate new numbers. ```tail``` points to the next empty position to put the new number. Then keep generating new numbers until ```tail``` >= ```n```. \\n3. Need to create the array 1 element more than ```n``` to avoid overflow because the last round ```head``` might points to a number ```2```. \\n4. A trick to flip number back and forth between ```1``` and ```2```: ```num = num ^ 3```\\n```\\npublic class Solution {\\n    public int magicalString(int n) {\\n        if (n <= 0) return 0;\\n        if (n <= 3) return 1;\\n        \\n        int[] a = new int[n + 1];\\n        a[0] = 1; a[1] = 2; a[2] = 2;\\n        int head = 2, tail = 3, num = 1, result = 1;\\n        \\n        while (tail < n) {\\n            for (int i = 0; i < a[head]; i++) {\\n                a[tail] = num;\\n                if (num == 1 && tail < n) result++;\\n                tail++;\\n            }\\n            num = num ^ 3;\\n            head++;\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96408",
			"view":"5068",
			"top":"1",
			"title":"Short C++",
			"vote":"29",
			"content":"Just build enough of the string and then count.\\n\\n    int magicalString(int n) {\\n        string S = \"122\";\\n        int i = 2;\\n        while (S.size() < n)\\n            S += string(S[i++] - '0', S.back() ^ 3);\\n        return count(S.begin(), S.begin() + n, '1');\\n    }"
		},
		{
			"lc_ans_id":"96412",
			"view":"2398",
			"top":"2",
			"title":"Is the magical string unique?",
			"vote":"15",
			"content":"Based on the rule, if start with 2, I can get string:\\n2211212212211....\\n\\nCompare with the one in the problem 1**2211212212211**...., it removes the prefix 1.\\n\\nIf that is correct, for some N  like 5, then the answer will be different depending on which one we are referring to."
		},
		{
			"lc_ans_id":"96432",
			"view":"1931",
			"top":"3",
			"title":"O(log n) space using recursive generators",
			"vote":"7",
			"content":"There's a paper called [A Space-Efficient Algorithm for Calculating the Digit Distribution in the Kolakoski Sequence](http://www.emis.ams.org/journals/JIS/VOL15/Nilsson/nilsson5.pdf) about an O(log n) space and O(n) time algorithm. I didn't read the paper but wrote my code based on Figure 1 on page 3. I use one generator per level, and to get things going, I hardcode the first three digits caused by the first two digits of the level above (which I therefore ignore).\\n\\n    def magicalString(self, n):\\n        def gen():\\n            for x in 1, 2, 2:\\n                yield x\\n            for i, x in enumerate(gen()):\\n                if i > 1:\\n                    for _ in range(x):\\n                        yield i % 2 + 1\\n        return sum(x & 1 for x in itertools.islice(gen(), n))\\n\\nI think it's O(log n) space and O(n) time. Here are test results for different n, counting the numbers of generators and yields to measure space and time:\\n```\\n     n      generators  yields\\n             (=space)   (=time)\\n         1         1         1\\n        10         4        25\\n       100        10       295\\n      1000        16      3001\\n     10000        22     30028\\n    100000        27    299935\\n   1000000        33   2999958\\n  10000000        39  29999888\\n 100000000        44 300001534\\n```\\nThe number of generators is very close to log<sub>1.5</sub>(n), which makes sense because [apparently there are about equally many ones and twos in any prefix of the sequence](https://en.wikipedia.org/wiki/Kolakoski_sequence#Density), so on average one digit in a generator causes 1.5 digits in the generator using it.\\n\\nThe number of yields is very close to 3n, which also makes sense. The outermost generator yields n times, the generator it uses yields about (2/3)n times, the next inner generator yields about (2/3)<sup>2</sup>n times, and so on. So the total number of yields is about:\\nn &sdot; &sum;<sub>i=0..&infin;</sub> (2/3)<sup>i</sup> = n &sdot; 1/(1-2/3) = 3n\\n\\nHere's the testing code:\\n```\\nimport itertools\\n\\nclass Solution(object):\\n    def magicalString(self, n):\\n        def gen():\\n            global generators, yields\\n            generators += 1\\n            for x in 1, 2, 2:\\n                yields += 1\\n                yield x\\n            for i, x in enumerate(gen()):\\n                if i > 1:\\n                    for _ in range(x):\\n                        yields += 1\\n                        yield i % 2 + 1\\n        return sum(x & 1 for x in itertools.islice(gen(), n))\\n\\nprint '     n      generators  yields'\\nprint '             (=space)   (=time)'\\nfor e in range(9):\\n    n = 10**e\\n    generators = yields = 0\\n    Solution().magicalString(n)\\n    print '%10d' * 3 % (n, generators, yields)\\n```"
		},
		{
			"lc_ans_id":"96419",
			"view":"3598",
			"top":"4",
			"title":"Very Straightforward and simple Java solution O(n)",
			"vote":"6",
			"content":"```\\npublic int magicalString(int n) {\\n        StringBuilder magic = new StringBuilder(\"1221121221221121122\");\\n        int pt1 = 12, pt2 = magic.length(), count = 0; //initiate pointers\\n        //generate sequence directly\\n        while(magic.length() < n){\\n            if(magic.charAt(pt1) == '1'){\\n                if(magic.charAt(pt2-1) == '1') magic.append(2);\\n                else magic.append(1);\\n                pt2++;\\n            }else{ //==2\\n                if(magic.charAt(pt2-1) == '1') magic.append(22);\\n                else magic.append(11);\\n                pt2+=2;\\n            }\\n            pt1++;\\n        }\\n        for(int i=0;i<n;i++)\\n            if(magic.charAt(i)=='1') count++;\\n        return count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"96433",
			"view":"316",
			"top":"5",
			"title":"The example in the problem seems to be wrong.",
			"vote":"3",
			"content":"```\\nInput: 6\\nOutput: 3\\nExplanation: The first 6 elements of magical string S is \"12211\" and it contains three 1's, so return 3.\\n```\\nShouldn't it be first 5 elements (12211) instead of 6? Am I stupid?"
		},
		{
			"lc_ans_id":"96472",
			"view":"1537",
			"top":"6",
			"title":"Short Python using queue",
			"vote":"3",
			"content":"Since how many current \"1\" or \"2\" depends on previous number in S, we can use a queue to get the corresponding information we need. Every time we update S, we update queue as well.\\n\\nUpdated: based @StefanPochmann 's idea, we can only use an index to indict current number of value we need.\\n```\\nclass Solution(object):\\n    def magicalString(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: int\\n        \"\"\"\\n        S = [1,2,2]\\n        idx = 2\\n        while len(S) < n:\\n            S += S[idx] * [(3 - S[-1])]\\n            idx += 1\\n        return S[:n].count(1)\\n```\\n\\nOld version:\\n```\\nclass Solution(object):\\n    def magicalString(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: int\\n        \"\"\"\\n        queue = collections.deque([2])\\n        S = [1,2,2]\\n        while len(S) < n:\\n            k = queue.popleft()\\n            tmp = 3 - S[-1]\\n            for i in range(k):\\n                S.append(tmp)\\n                queue.append(tmp)\\n        return S[:n].count(1)\\n```"
		},
		{
			"lc_ans_id":"96442",
			"view":"199",
			"top":"7",
			"title":"C++ solutions",
			"vote":"2",
			"content":"1) build string\\nthe most concise\\nit is from this post:\\nhttps://discuss.leetcode.com/topic/74637/short-c\\n```\\nclass Solution {\\npublic:\\n    int magicalString(int n) {\\n        string s = \"122\";\\n        int i = 2;\\n        while (s.length() < n)\\n            s.append(s[i++] - '0', s.back() ^ 3); // binary form of '1' is 011 0001\\n        return count(s.begin(), s.begin() + n, '1');\\n    }\\n};\\n```\\n\\n\\n2) build array instead of string\\n```\\nclass Solution {\\npublic:\\n    int magicalString(int n) {\\n        vector<int> v = {1, 2, 2};\\n        int i = 2;\\n        while (v.size() < n)\\n            v.insert(v.end(), v[i++], v.back() ^ 3);\\n        return count(v.begin(), v.begin() + n, 1);\\n    }\\n};\\n```\\n\\n3) use queue instead of building string\\n```\\nclass Solution {\\npublic:\\n    int magicalString(int n) {\\n        if (n < 1)\\n            return 0;\\n        \\n        queue<int> q;\\n        int ans = 1, num = 1, count = 2, i = 3;\\n        while (i < n) {\\n            while (count--) {\\n                q.push(num);\\n                if (i < n && num == 1)\\n                    ++ans;\\n                ++i;\\n            }\\n            \\n            num ^= 3; // num = (num == 1 ? 2 : 1);\\n            count = q.front();\\n            q.pop();\\n        }\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"96458",
			"view":"798",
			"top":"8",
			"title":"O(log n) space Java",
			"vote":"2",
			"content":"Based on [my Python solution](https://discuss.leetcode.com/topic/75242/o-log-n-space-using-recursive-generators). Here I use a helper class giving me the Kolakoski sequence ([that's its name](https://en.wikipedia.org/wiki/Kolakoski_sequence)) one element at a time with its `next` method. It has the first three elements hard-coded, and after that, it uses another instance of the sequence to iterate further. That other instance does the same, so it might eventually use yet another instance. And so on, O(log n) nested Kolakoski objects iterating in parallel at different speeds as needed. Takes O(log n) space and O(n) time.\\n\\n```\\npublic class Solution {\\n\\n    public int magicalString(int n) {\\n        Kolakoski kolakoski = new Kolakoski();\\n        int ones = 0;\\n        while (n-- > 0)\\n            if (kolakoski.next() == 1)\\n                ones++;\\n        return ones;\\n    }\\n\\n    private class Kolakoski {\\n        private int[] queue = {1, 2, 2};\\n        private int first = 0, last = 2;\\n        private Kolakoski source;\\n        int next() {\\n            if (first > last) {\\n                if (source == null) {\\n                    source = new Kolakoski();\\n                    source.next();\\n                    source.next();\\n                }\\n                int output = queue[last % 3] ^ 3;\\n                for (int k = source.next(); k > 0; k--)\\n                    queue[++last % 3] = output;\\n            }\\n            return queue[first++ % 3];\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96447",
			"view":"405",
			"top":"9",
			"title":"Straightforward Java Solution with explanation",
			"vote":"1",
			"content":"The method is quite simple using two points:\\n```\\n1, create a boolean[] and initialize the first three(the reason initializing first three is to avoid tail and head overlap)\\n2, if tail is 2, add two identical item which is different from current head\\n3, if tail is 1, add 1 different.\\n4, since it is 1 or 2, just use boolean (1: true, 2: false) to replace int\\n```\\nHere is the code:\\n```\\npublic class Solution {\\n    public int magicalString(int n) {\\n        // o(n)\\n        if (n == 0) return 0;\\n        if (n < 3) return 1;\\n        int head = 3;\\n        int tail = 2;\\n        boolean[] nums = new boolean[n];\\n        //1:true 2: false\\n        nums[0] = true;\\n        nums[1] = false;\\n        nums[2] = false;\\n        int res = 0;\\n        while (head < n) {\\n            if (!nums[tail]) {\\n                nums[head] = !nums[head-1];\\n                head++;\\n                if (head < n) {\\n                    nums[head] = nums[head-1];\\n                    head++;\\n                }\\n            } else {\\n                nums[head] = !nums[head-1];\\n                head++;\\n            }\\n            tail++;\\n        }\\n        for(boolean b: nums) {\\n            if (b) res++;\\n        }\\n        return res;\\n    }\\n}\\n```"
		}
	],
	"id":"473",
	"title":"Magical String",
	"content":"<p>\nA magical string <b>S</b> consists of only '1' and '2' and obeys the following rules:\n</p>\n<p>\nThe string <b>S</b> is magical because concatenating the number of contiguous occurrences of characters '1' and '2' generates the string <b>S</b> itself.\n</p>\n\n<p>\nThe first few elements of string <b>S</b> is the following:\n<b>S</b> = \"1221121221221121122……\"\n</p>\n\n<p>\nIf we group the consecutive '1's and '2's in <b>S</b>, it will be:\n</p>\n<p>\n1   22  11  2  1  22  1  22  11  2  11  22 ......\n</p>\n<p>\nand the occurrences of '1's or '2's in each group are:\n</p>\n<p>\n1   2\t   2    1   1    2     1    2     2    1    2    2 ......\n</p>\n\n<p>\nYou can see that the occurrence sequence above is the <b>S</b> itself. \n</p>\n\n<p>\nGiven an integer N as input, return the number of '1's in the first N number in the magical string <b>S</b>.\n</p>\n\n<p><b>Note:</b>\nN will not exceed 100,000.\n</p>\n\n\n<p><b>Example 1:</b><br />\n<pre>\n<b>Input:</b> 6\n<b>Output:</b> 3\n<b>Explanation:</b> The first 6 elements of magical string S is \"12211\" and it contains three 1's, so return 3.\n</pre>\n</p>",
	"frequency":"290",
	"ac_num":"12316"
}