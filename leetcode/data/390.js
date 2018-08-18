{
	"difficulty":"2",
	"submit_num":"35708",
	"show_id":"390",
	"leetcode_id":"390",
	"answers":[
		{
			"lc_ans_id":"87119",
			"view":"14206",
			"top":"0",
			"title":"JAVA: Easiest solution O(logN) with explanation",
			"vote":"202",
			"content":"```\\n    public int lastRemaining(int n) {\\n        boolean left = true;\\n        int remaining = n;\\n        int step = 1;\\n        int head = 1;\\n        while (remaining > 1) {\\n            if (left || remaining % 2 ==1) {\\n                head = head + step;\\n            }\\n            remaining = remaining / 2;\\n            step = step * 2;\\n            left = !left;\\n        }\\n        return head;\\n    }\\n```\\nMy idea is to update and record **head** in each turn. when the total number becomes 1, head is the only number left.\\n\\nWhen will head be updated?\\n* if we move from left\\n* if we move from right and the total remaining number % 2 == 1\\nlike 2 4 6 8 10, we move from 10, we will take out 10, 6 and 2, head is deleted and move to 4\\nlike 2 4 6 8 10 12, we move from 12, we will take out 12, 8, 4, head is still remaining 2\\n\\nthen we find a rule to update our head.\\n\\nexample:\\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24\\n\\n\\n1. Let us start with **head = 1, left = true, step = 1 (times 2 each turn), remaining = n(24)**\\n\\n2. we first move from left, we definitely need to move head to next position. **(head = head + step)**\\n    So after first loop we will have:\\n   1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 - > 2 4 6 8 10 12 14 16 18 20 22 24\\n    **head = 2,  left = false, step = 1 * 2 = 2, remaining = remaining / 2 = 12**\\n\\n3. second loop, we move from right, in what situation we need to move head?\\n    only if the remaining % 2 == 1, in this case we have 12 % 2 == 0, we don't touch head.\\n    so after this second loop we will have:\\n    2 4 6 8 10 12 14 16 18 20 22 24 - > 2 6 10 14 18 22\\n    **head = 2, left = true, step = 2 * 2 = 4, remaining = remaining / 2 = 6**\\n\\n4. third loop, we move from left, move head to next position\\n    after third loop we will have:\\n     2 6 10 14 18 22 - > 6 14 22\\n    **head = 6, left = false, step = 4 * 2 = 8, remaining = remaining / 2 = 3**\\n\\n5. fourth loop, we move from right, NOTICE HERE:\\n   we have remaining(3) % 2 == 1, so we know we need to move head to next position\\n   after this loop, we will have\\n   6 14 22 - > 14\\n   **head = 14, left = true, step = 8 * 2 = 16, remaining = remaining / 2 = 1**\\n\\n6. while loop end, return head"
		},
		{
			"lc_ans_id":"87128",
			"view":"8032",
			"top":"1",
			"title":"C 1 line solution with explanation",
			"vote":"60",
			"content":"After first elimination, all the numbers left are **even** numbers. \\nDivide by 2, we get a continuous new sequence from 1 to n / 2.\\nFor this sequence we start from right to left as the first elimination. \\nThen the original result should be two times the mirroring result of lastRemaining(n / 2).\\n\\n```\\nint lastRemaining(int n) {\\n    return n == 1 ? 1 : 2 * (1 + n / 2 - lastRemaining(n / 2));\\n}\\n```"
		},
		{
			"lc_ans_id":"87121",
			"view":"4225",
			"top":"2",
			"title":"O(logN) solution. clear break down",
			"vote":"20",
			"content":"```\\n    public int lastRemaining(int n) {\\n      return leftToRight(n);\\n    }\\n\\n    private static int leftToRight(int n) {\\n      if(n <= 2) return n;\\n      return 2 * rightToLeft(n / 2);\\n    }\\n\\n    private static int rightToLeft(int n) {\\n      if(n <= 2) return 1;\\n      if(n % 2 == 1) return 2 * leftToRight(n / 2);\\n      return 2 * leftToRight(n / 2) - 1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"87120",
			"view":"3332",
			"top":"3",
			"title":"one line java solution based on Josephus Problem",
			"vote":"12",
			"content":"This problem is similar to [Josephus problem](https://en.wikipedia.org/wiki/Josephus_problem#k.3D2) when **k=2**, the recursive version is easy after referring to the josephus problem on wiki.\\nit is highly recommend to refer to [Josephus problem](https://en.wikipedia.org/wiki/Josephus_problem#k.3D2) first, because i am chinese, my english is poor, my explanation may not be good, but the wiki explanation is very good.\\n```\\n    public int lastRemaining(int n) {\\n        return ((Integer.highestOneBit(n) - 1) & (n | 0x55555555)) + 1;\\n    }\\n```\\nrecursive version\\nfor example:\\n1,2,3,4,...n\\nif you start from the left to right, the result is **i**\\nthen, if you start from right to left, the result is **n+1-i**\\nfor n numbers, after one pass, there are n/2 left, each number is two times of the original,\\n1,2,3,4,5,6,7,8,9\\nafter one pass\\n2,4,6,8\\nassume the result of 1,2,3,4 from left to right is f(4)\\nthen the result of 1,2,3,4 from right to left is 5-f(4)\\nthen the result of 2,4,6,8 from right to left is 2*(5-f(4))\\nthis is the formula\\n**f(n)=2*(1+n/2-f(n/2))** when n is 1, of course the result is 1\\n```\\n    public int lastRemaining(int n) {\\n        return n == 1 ? 1 : 2 * (1 + n / 2 - lastRemaining(n / 2));\\n    }\\n```\\nnon-recursive version:\\n```\\n    public int lastRemaining(int n) {\\n        Stack<Integer> stack = new Stack<>();\\n        while (n > 1) {\\n            n /= 2;\\n            stack.push(n);\\n        }\\n        int result = 1;\\n        while (!stack.isEmpty()) {\\n            result = 2 * (1 + stack.pop() - result);\\n        }\\n        return result;\\n    }\\n```"
		},
		{
			"lc_ans_id":"87117",
			"view":"1556",
			"top":"4",
			"title":"C++ 29ms with Complexity of Log4(N) and Explanation",
			"vote":"9",
			"content":"First of all, if n is an odd number, then f(1..n) = f(1..n-1), because after the first round elimination, the last odd number will be removed.\\n\\nSo let's consider even number. \\nIf the number of remaining numbers is even after the first round, which means the number is divided by 4. ex: 12. after first elimination, we have 2,4,6,8,10,12. then after the second round, we have 2, 6, 10. ,start from the beginning again => f(1..12) = f(2,6,10) = 2* f(1,3,5) = 2* [f(2,4,6) - 1] = 2 * [2*f(1,2,3) - 1] = 4*f(1..3) - 2; similarly we get f(n) = 4f(n/4) - 2. if n is divided by 4. \\n\\nIf it is odd after first round, which means the number can't divided by 4, then during the second round, odd positioned numbers will be eliminated either process from beginning or from the end. ex: 10. first=> 2,4,6,8,10, second => 4, 8 => f(10) = 4*f(1..2)\\n=> f(n) = 4f(n/4)\\n```\\nclass Solution {\\npublic:\\n    int lastRemaining(int n) {\\n        if (n == 1) return 1;\\n        if (n <= 4) return 2;\\n        if (n % 2 != 0) n -= 1;\\n        if (n % 4 != 0) return 4 * lastRemaining(n/4);\\n        return 4 * lastRemaining(n/4) - 2;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87165",
			"view":"516",
			"top":"5",
			"title":"Easy to understand c++ recursion with comments.",
			"vote":"5",
			"content":"```\\nclass Solution {\\npublic:\\n    int lastRemaining(int n) {\\n        return recursion(n, true);\\n    }\\n    // return the left number of 1 - n starting from eliminting left to right\\n    int recursion(int n, bool isLeft) {\\n        if(n == 1) return n;\\n        if(!isLeft && (n % 2) == 0) {\\n            // eliminate all the even numbers\\n            // [1, 2, 3, 4, 5, 6] -> [1, 3, 5]\\n            // It is equivalent to consider the number left in [1, 2, 3] * 2 - 1\\n            return recursion(n / 2, !isLeft) * 2 - 1;\\n        } else {\\n            // eliminate all the odd numbers\\n            // [1, 2, 3, 4, 5, 6] -> [2, 4, 6]\\n            // It is equivalent to consider the number left in [1, 2, 3] * 2\\n            return recursion(n / 2, !isLeft) * 2;\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87154",
			"view":"596",
			"top":"6",
			"title":"Clean Easy Java logN solution",
			"vote":"3",
			"content":"```\\npublic class Solution {\\n    public int lastRemaining(int n) {\\n        return help(n, true);\\n    }\\n    \\n    private int help(int n, boolean left) {\\n        if (n == 1) return 1;\\n        int res = help(n / 2, !left) * 2;\\n        if ((n & 1) == 1 || left) {\\n            return res;\\n        }\\n        return res - 1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"87163",
			"view":"1403",
			"top":"7",
			"title":"Only 3 lines, C++, O(logN)",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    int lastRemaining(int n) {\\n        int tmp = 0x7FFFFFFF;\\n        while(tmp >= n) tmp >>= 1;\\n        return  ((n|0x55555555)&tmp) + 1;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87144",
			"view":"164",
			"top":"8",
			"title":"easier to read ONE LINE C++ recursive solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int lastRemaining(int n, int x=1, int isRight=0, int shift=0) {\\n        return n > 1 ? lastRemaining(n/2, x*2, isRight^1, shift + x*(isRight && n%2 == 0)) : x - shift;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87151",
			"view":"609",
			"top":"9",
			"title":"Python mod 4 rather than mod 2. Clean and short.",
			"vote":"1",
			"content":"The process got a circulation every round elimination rather than through to right nor left. Think about it.\\n\\n```python\\nclass Solution(object):\\n    def lastRemaining(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: int\\n        \"\"\"\\n        if n == 3 or n == 2:\\n            return 2\\n        elif n == 1:\\n            return 1\\n        else:\\n            base = 4 * self.lastRemaining(n/4)   \\n            if n%4 == 0 or n%4 == 1:\\n                return base - 2\\n            else:\\n                return base"
		}
	],
	"id":"390",
	"title":"Elimination Game",
	"content":"<p>\r\nThere is a list of sorted integers from 1 to <i>n</i>. Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.</p>\r\n\r\n<p>Repeat the previous step again, but this time from right to left, remove the right most number and every other number from the remaining numbers.</p>\r\n\r\n<p>We keep repeating the steps again, alternating left to right and right to left, until a single number remains.</p>\r\n\r\n<p>Find the last number that remains starting with a list of length <i>n</i>.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nInput:\r\nn = 9,\r\n<u>1</u> 2 <u>3</u> 4 <u>5</u> 6 <u>7</u> 8 <u>9</u>\r\n2 <u>4</u> 6 <u>8</u>\r\n<u>2</u> 6\r\n6\r\n\r\nOutput:\r\n6\r\n</pre>\r\n</p>",
	"frequency":"415",
	"ac_num":"15170"
}