{
	"difficulty":"1",
	"submit_num":"27415",
	"show_id":"728",
	"leetcode_id":"728",
	"answers":[
		{
			"lc_ans_id":"109424",
			"view":"2533",
			"top":"0",
			"title":"Java solution with explanation, no toString() conversion",
			"vote":"6",
			"content":"The idea is to traverse each integer sequence from left to right incrementing by one (left, left + 1, left + 2,..., left + n, right). Each time check if the the current number i is self-divided. \\nSelf-division check is done by using '%' operator(we check each digit of i moving from right to left)\\nE.g. if i = 128 number: \\n1) 128 % 10 = 8, check 8 != 0;\\n2) remove 8 from next step j = 128 / 10 = 12\\n3) repeat 1 and 2 until j == 0\\n\\nTime complexity is O(nm), where n = right - left, and m is number of digits in iterated number\\n```\\nclass Solution {\\n    public List<Integer> selfDividingNumbers(int left, int right) {\\n        List<Integer> list = new ArrayList<>();\\n        for (int i = left; i <= right; i++) {\\n            int j = i;\\n            for (; j > 0; j /= 10) {\\n                if ((j % 10 == 0) || (i % (j % 10) != 0)) break;\\n            }\\n            if (j == 0) list.add(i); \\n        }\\n        return list;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109445",
			"view":"2285",
			"top":"1",
			"title":"Python Elegant 2-liner!!!",
			"vote":"5",
			"content":"Pretty self-explanatory.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def selfDividingNumbers(self, left, right):\\n        is_self_dividing = lambda num: '0' not in str(num) and all([num % int(digit) == 0 for digit in str(num)])\\n        return filter(is_self_dividing, range(left, right + 1))\\n```\\n\\nAs pointed out by @ManuelP, `[num % int(digit) == 0 for digit in str(num)]` creates an entire list which is not necessary. By leaving out the `[` and `]`, we can make use of generators which are lazy and allows for short-circuit evaluation, i.e. `all` will terminate as soon as one of the digits fail the check.\\n\\nThe answer below improves the run time from 128 ms to 95 ms:\\n\\n```\\nclass Solution(object):\\n    def selfDividingNumbers(self, left, right):\\n        is_self_dividing = lambda num: '0' not in str(num) and all(num % int(digit) == 0 for digit in str(num))\\n        return filter(is_self_dividing, range(left, right + 1))\\n```"
		},
		{
			"lc_ans_id":"109459",
			"view":"292",
			"top":"2",
			"title":"Short brute force python solution",
			"vote":"3",
			"content":"```\\n    def selfDividingHelper(self, num):\\n        temp = num\\n        while temp:\\n            if not temp % 10 or num % (temp % 10): return False\\n            temp = temp//10\\n        return True\\n\\n    def selfDividingNumbers(self, left, right):\\n        result = []\\n        for num in range(left, right+1):\\n            if self.selfDividingHelper(num): result.append(num)\\n        return result\\n```"
		},
		{
			"lc_ans_id":"109425",
			"view":"927",
			"top":"3",
			"title":"Boring C++ solution, calculating all digits",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> selfDividingNumbers(int l, int r) {\\n        vector<int> v;\\n        for (int i = l; i <= r; ++i) {\\n            int j= i;\\n            bool ok = 1;\\n            while (j) {\\n                int d= (j%10);\\n                if (d == 0 || i % d) ok = 0;\\n                j/=10;\\n            }\\n            if (ok) v.push_back(i);\\n        }\\n        \\n        return v;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109440",
			"view":"1589",
			"top":"4",
			"title":"Java Easiest Solution !",
			"vote":"2",
			"content":"```\\nclass Solution {\\n    public List<Integer> selfDividingNumbers(int left, int right) {\\n     \\n        List<Integer> ans = new ArrayList<Integer>();\\n\\n        for(int i=left; i<=right ; i++){\\n            if(isSelfDividingNumber(i))\\n                ans.add(i);\\n        }\\n        return ans;\\n    }\\n    \\n    \\n    public boolean isSelfDividingNumber(int n){\\n        int original = n;\\n        while(n>0){\\n            int r = n%10;\\n            if(r == 0)            return false;\\n            if(original%r !=0)   return false;\\n            n /= 10;\\n        }\\n        return true;\\n    }\\n    \\n}\\n```"
		},
		{
			"lc_ans_id":"109455",
			"view":"291",
			"top":"5",
			"title":"Brute Force Python",
			"vote":"2",
			"content":"```\\ndef is_self_dividing(x):\\n    s = str(x)\\n    for d in s:\\n        if d==\"0\" or x%int(d)!=0:\\n            return False\\n    return True\\n\\nclass Solution(object):\\n    def selfDividingNumbers(self, left, right):\\n        \"\"\"\\n        :type left: int\\n        :type right: int\\n        :rtype: List[int]\\n        \"\"\"\\n        ans = []\\n        for x in xrange(left, right+1):\\n            if is_self_dividing(x):\\n                ans.append(x)\\n        return ans"
		},
		{
			"lc_ans_id":"109458",
			"view":"327",
			"top":"6",
			"title":"[Java/C++] Clean Code",
			"vote":"2",
			"content":"for every number `n` from `left` to `right`, if `n` cannot be divided by any of its digit, it is not acceptible.\\n\\n**Without Helper**\\n**Java**\\n```\\nclass Solution {\\n    public List<Integer> selfDividingNumbers(int left, int right) {\\n        List<Integer> res = new ArrayList<>();\\n        for (int i = left, n = 0; i <= right; i++) {\\n            for (n = i; n > 0; n /= 10)\\n                if (n % 10 == 0 || i % (n % 10) != 0) break;\\n            if (n == 0) res.add(i);\\n        }\\n        return res;\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<int> selfDividingNumbers(int left, int right) {\\n        vector<int> res;\\n        for (int i = left, n = 0; i <= right; i++) {\\n            for (n = i; n > 0; n /= 10)\\n                if (!(n % 10) || i % (n % 10)) break;\\n            if (!n) res.push_back(i);\\n        }\\n        return res;\\n    }\\n};\\n```\\n**With Helper**\\n**Java**\\n```\\nclass Solution {\\n    public List<Integer> selfDividingNumbers(int left, int right) {\\n        List<Integer> res = new ArrayList<>();\\n        for (int i = left; i <= right; i++)\\n            if (dividingNumber(i)) res.add(i);\\n        return res;\\n    }\\n\\n    boolean dividingNumber(int num) {\\n        for (int n = num; n > 0; n /= 10)\\n            if (n % 10 == 0 || num % (n % 10) != 0) return false;\\n        return true;\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<int> selfDividingNumbers(int left, int right) {\\n        vector<int> res;\\n        for (int i = left; i <= right; i++)\\n            if (dividingNumber(i)) res.push_back(i);\\n        return res;\\n    }\\n\\n    bool dividingNumber(int num) {\\n        for (int n = num; n > 0; n /= 10)\\n            if (!(n % 10) || num % (n % 10)) return false;\\n        return true;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109394",
			"view":"63",
			"top":"7",
			"title":"My Javascript Solution",
			"vote":"1",
			"content":"\\n```\\nfunction isSelfDividingNumber(num) {\\n    return num.toString()\\n        .split('')\\n        .map(Number)\\n        .map((digit) => digit !== 0 && num % digit === 0)\\n        .reduce((acc, val) => acc && val);\\n}\\n\\n/**\\n * @param {number} left\\n * @param {number} right\\n * @return {number[]}\\n */\\nvar selfDividingNumbers = function(left, right) {\\n    return new Array(right - left + 1)\\n        .fill(0)\\n        .map((val, index) => left + index)\\n        .filter((val) => isSelfDividingNumber(val));\\n};\\n```"
		},
		{
			"lc_ans_id":"109457",
			"view":"251",
			"top":"8",
			"title":"Java verbose solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\n    public List<Integer> selfDividingNumbers(int left, int right) {\\n        List<Integer> res = new ArrayList<>();\\n        for (int  i = left; i <= right; i++) {\\n            if (isSelfDividingNumber(i)) res.add(i);\\n        }\\n        return res;\\n    }\\n\\n    private boolean isSelfDividingNumber(int i) {\\n        int a = i;\\n        while (a > 0) {\\n            int b = a % 10;\\n            if (b == 0) return false;\\n            if (i % b != 0) return false;\\n            a = a / 10;\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109389",
			"view":"7",
			"top":"9",
			"title":"Easy JavaScript Solution",
			"vote":"0",
			"content":"My JavaScript Solution\\n\\n```\\n/**\\n * @param {number} left\\n * @param {number} right\\n * @return {number[]}\\n */\\nvar selfDividingNumbers = function (left, right) {\\n  var res = [];\\n  for (var i = left; i <= right; i++) {\\n    var num = i;\\n    if (isSelfDeviding(num)) {\\n      res.push(num);\\n    }\\n  }\\n  return res;\\n};\\n\\nvar isSelfDeviding = function (num) {\\n  var copy = num;\\n  while (copy !== 0) {\\n    var remain = copy % 10;\\n    var devisor = Math.floor(copy / 10);\\n    if (remain === 0 || num % remain !== 0) {\\n      return false;\\n    }\\n    copy = devisor;\\n  }\\n  return true;\\n};\\n\\n```"
		}
	],
	"id":"694",
	"title":"Self Dividing Numbers",
	"content":"<p>\r\nA <i>self-dividing number</i> is a number that is divisible by every digit it contains.\r\n</p><p>\r\nFor example, 128 is a self-dividing number because <code>128 % 1 == 0</code>, <code>128 % 2 == 0</code>, and <code>128 % 8 == 0</code>.\r\n</p><p>\r\nAlso, a self-dividing number is not allowed to contain the digit zero.\r\n</p><p>\r\nGiven a lower and upper number bound, output a list of every possible self dividing number, including the bounds if possible.\r\n</p>\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nleft = 1, right = 22\r\n<b>Output:</b> [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The boundaries of each input argument are <code>1 <= left <= right <= 10000</code>.</li>\r\n</p>",
	"frequency":"443",
	"ac_num":"18501"
}