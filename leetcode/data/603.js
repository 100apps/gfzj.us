{
	"difficulty":"2",
	"submit_num":"13631",
	"show_id":"625",
	"leetcode_id":"625",
	"answers":[
		{
			"lc_ans_id":"104661",
			"view":"2350",
			"top":"0",
			"title":"Java Solution, result array",
			"vote":"16",
			"content":"Reference: http://www.geeksforgeeks.org/find-smallest-number-whose-digits-multiply-given-number-n/\\n\\n```\\npublic class Solution {\\n    public int smallestFactorization(int n) {\\n        // Case 1: If number is smaller than 10\\n        if (n < 10) return n;\\n        \\n        // Case 2: Start with 9 and try every possible digit\\n        List<Integer> res = new ArrayList<>();\\n        for (int i = 9; i > 1; i--) {\\n            // If current digit divides n, then store all\\n            // occurrences of current digit in res\\n            while (n % i == 0) {\\n                n = n / i;\\n                res.add(i);\\n            }\\n        }\\n\\n        // If n could not be broken in form of digits\\n        if (n != 1) return 0;\\n\\n        // Get the result from the array in reverse order\\n        long result = 0;\\n        for (int i = res.size() - 1; i >= 0; i--) {\\n            result = result * 10 + res.get(i);\\n            if (result > Integer.MAX_VALUE) return 0;\\n        }\\n        \\n        return (int)result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104663",
			"view":"798",
			"top":"1",
			"title":"[C++] Clean Code - 7 line - 3 Solutions",
			"vote":"8",
			"content":"**Solution 1 - build a ``long number`` and ``stop at 10th digit``**\\n```\\nclass Solution {\\npublic:\\n    int smallestFactorization(int a) {\\n        if (a < 2) return a;\\n        long l = 0;\\n        for (int i = 9, d = 0; i >= 2 && d < 10; i--) {\\n            while (a % i == 0 && d < 10) {\\n                l += i * pow(10, d++);\\n                a /= i;\\n            }\\n        }\\n        return a > 1 || l > INT_MAX ? 0 : l;\\n    }\\n};\\n```\\n**Solution 2 - build a ``string`` and ``stop at the 10th digit``**\\n```\\nclass Solution {\\npublic:\\n    int smallestFactorization(int a) {\\n        if (a < 2) return a;\\n        string s(10, '0');  // only collect 10 digit, for INT_MAX is 10 digit;\\n        for (int i = 9, d = 9; i >= 2 && d; i--) {\\n            while (a % i == 0 && d) {\\n                s[d--] = '0' + i;\\n                a /= i;\\n            }\\n        }\\n        return a > 1 || stol(s) > INT_MAX ? 0 : stoi(s);\\n    }\\n};\\n```\\n**Solution 3 - build a ``string`` all the way to the end**\\n```\\nclass Solution {\\npublic:\\n    int smallestFactorization(int a) {\\n        if (a < 2) return a;\\n        string s;\\n        for (int i = 9; i >= 2; i--) {\\n            while (a % i == 0) {\\n                s.insert(s.begin(), ('0' + i));\\n                a /= i;\\n            }\\n        }\\n        return (a > 1 || s.size() > 10 || stol(s) > INT_MAX) ? 0 : stoi(s);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104685",
			"view":"724",
			"top":"2",
			"title":"My java code (Math)?",
			"vote":"4",
			"content":"This problem is a little bit tricky.  Factors should be selected from 2 to 9 and should be as large as possible.\\n\\nAny 10 digit solution will overflow.  \\n\\n    public int smallestFactorization(int a) {\\n        int k = 9;\\n        List<Integer> ans = new ArrayList<>();\\n        if (a <= 9) return a;\\n        while (a > 1 && k >= 2) {\\n            if (a % k == 0){\\n                ans.add(k);\\n                a = a / k;\\n            }\\n            else{\\n                k--;\\n            }\\n        }\\n        Collections.sort(ans);\\n        // Integer.MAX_VALUE = 2147483647  \\n        // Note: ans starts at least with 2 (guaranteed to have overflow if the size is great or equal 10)\\n        if (a > 10 || ans.size() >= 10)   return 0;\\n        int num = 0;\\n        for (int i: ans){\\n            num *= 10;\\n            num += i;\\n        }\\n        return num;\\n    }"
		},
		{
			"lc_ans_id":"104678",
			"view":"458",
			"top":"3",
			"title":"Python, Straightforward with Explanation",
			"vote":"2",
			"content":"Suppose N > 1.  Let's greedily try to divide N by 9, 8, 7, ..., 2.  If we can't divide by some factor here (eg. N = 13) then it's invalid.  \\n\\nOtherwise, we have some set of digits in descending order whose product equals N.  This set is also the smallest possible size (*proof below.)  Let's write these digits in sorted order.  If it would overflow a 32 bit int, we'll write zero instead.\\n\\nLet's prove the set is smallest.  If N has factors of 5 or 7, there's only one way to write them.  Also, if ```N = 2^(3w + x) + 3^(2y + z)``` where ```0 <= x < 3``` and ```0 <= z < 2```, then writing 8's and 9's are at least as efficient as optimal.  So now we want to write ```2^x * 3^z``` only.  If ```x = 0``` or ```z = 0``` we're fine writing 9, 3 or 8, 4, 2.  If ```(x, z) = (1, 1)``` then we'll write a 6 optimally; if ```(x, z) = (2, 1)``` then we'll write ```6 * 2``` which can't be beaten.\\n\\n```\\ndef smallestFactorization(self, N):\\n    if N == 1:\\n        return 1\\n        \\n    A = []\\n    while N > 1:\\n        for d in xrange(9, 1, -1):\\n            if N % d == 0:\\n                N /= d\\n                A.append(d)\\n                break\\n        else:\\n            return 0\\n    \\n    ans = int(\"\".join(map(str, A[::-1])))\\n    return ans if ans < 2**31 else 0\\n```"
		},
		{
			"lc_ans_id":"104662",
			"view":"227",
			"top":"4",
			"title":"Java Easy and Efficient Solution, int only. no array, no String",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int smallestFactorization(int a) {\\n        if (a == 1) return 1;\\n        \\n        int div = 9;\\n        int ret = 0;\\n        int mul = 1;\\n        while (div > 1 && a > 1) {\\n            if (a % div == 0) {\\n                // check overflow\\n                if ((Integer.MAX_VALUE - ret) / mul > div || Integer.MAX_VALUE == ret + mul * div) {\\n                    ret += mul * div;\\n                    mul *= 10;\\n                    a /= div;\\n                } else {\\n                    return 0;\\n                }\\n            } else {\\n                div--;\\n            }\\n        }\\n        \\n        if (div == 1) {\\n            return 0;\\n        }\\n        \\n        return ret;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104664",
			"view":"58",
			"top":"5",
			"title":"Java Simple Solution, just some math",
			"vote":"0",
			"content":"    public int smallestFactorization(int a) {\\n        if ( a==1 ) return 1;\\n        String res = new String();\\n        int i = 9;\\n        while(true) {\\n           if (a%i==0){\\n            a /= i;\\n            res = i + res;\\n           }\\n           else {\\n               i--;\\n           }\\n           if ( a == 1 ) break;\\n           if ( i == 1 ) return 0;\\n        }\\n        long ret = Long.valueOf(res);\\n        if(ret>Integer.MAX_VALUE) {\\n            return 0;\\n        }\\n        else {\\n            return (int) ret;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"104665",
			"view":"97",
			"top":"6",
			"title":"Simple C++ Greedy Algorithm With A Brief Explanation.",
			"vote":"0",
			"content":"We only need to pick the largest factor in [2, 9] each time and put it to the front of current result. (So that the first pick is put at the least significant digit).\\nWhy it works?\\nLets forget about how we put the digits for a moment. If we just pick the largest factor in [2, 9] every time, we can guarantee the result has the shortest length (least digits).\\nNow if we have the shortest length, the way to make this number smallest is to put the largest one to the least significant. \\nHence this algorithm.\\n```\\nclass Solution {\\npublic:\\n    int smallestFactorization(int n) {\\n\\tif (n == 1) return 1;\\n\\tlong long m = 0, l = 1;\\n        for (int i = 9; i >= 2;)\\n        if (n % i == 0)\\n        {\\n            m += i*l;\\n            l *= 10;\\n            n /= i;\\n            if (m > INT_MAX)\\n                return 0;\\n        }else\\n            i --;\\n    return n == 1 ? m : 0;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"104666",
			"view":"60",
			"top":"7",
			"title":"Easy recursive solution",
			"vote":"0",
			"content":"```\\npublic class Solution {\\n    public int smallestFactorization(int a) {\\n        if (a < 10) {\\n            return a;\\n        }\\n        \\n        for (int i = 9; i >= 2; i--) {\\n            if (a % i == 0) {\\n                int pre = smallestFactorization(a / i);\\n                if (pre != 0) {\\n                    int ans = 0;\\n                    try {\\n                        ans = Integer.parseInt(pre + \"\" + i);\\n                        return ans;\\n                    } catch (Exception ex) {\\n                        continue;\\n                    }\\n                }\\n            }\\n        }\\n        return 0;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104667",
			"view":"65",
			"top":"8",
			"title":"Python simple solution",
			"vote":"0",
			"content":"````\\ndef smallestFactorization(self, a):\\n        if a < 10: return a\\n        ret = \"\"\\n        for i in range(9, 1, -1):\\n            while a % i == 0:\\n                ret = str(i) + ret\\n                a /= i\\n        return int(ret) if a == 1 and int(ret) < 2**31 else 0"
		},
		{
			"lc_ans_id":"104668",
			"view":"71",
			"top":"9",
			"title":"C++ simple and short solution",
			"vote":"0",
			"content":"```\\nint smallestFactorization(int a) {\\n        if(a<10) return a;\\n        vector<int> res;\\n        long num=0, mul=1;\\n        for(int i=9;i>1;i--) {\\n            while(a%i==0) {\\n                a/=i;\\n                res.push_back(i);\\n            }\\n        }\\n        if(a>9||res.size()>10) return 0;\\n        sort(res.begin(), res.end());\\n        for(int i=res.size()-1;i>=0;i--) {\\n            num+=res[i]*mul;\\n            mul*=10;\\n        }\\n        if(num>INT_MAX) return 0;\\n        return num;\\n    }"
		}
	],
	"id":"603",
	"title":"Minimum Factorization",
	"content":"<p>Given a positive integer <code>a</code>, find the smallest positive integer <code>b</code> whose multiplication of each digit equals to <code>a</code>. </p>\r\n\r\n<p>\r\nIf there is no answer or the answer is not fit in 32-bit signed integer, then return 0.</p>\r\n\r\n<p>\r\n<b>Example 1</b><br>\r\nInput:\r\n<pre>48 </pre>\r\nOutput:\r\n<pre>68</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Example 2</b><br>\r\nInput: \r\n<pre>15</pre>\r\n\r\nOutput:\r\n<pre>35</pre>\r\n</p>",
	"frequency":"43",
	"ac_num":"4257"
}