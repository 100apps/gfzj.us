{
	"difficulty":"2",
	"submit_num":"38927",
	"show_id":"556",
	"leetcode_id":"556",
	"answers":[
		{
			"lc_ans_id":"101824",
			"view":"7235",
			"top":"0",
			"title":"Simple Java solution (4ms) with explanation.",
			"vote":"29",
			"content":"This solution is just a java version derived from this [post](http://www.geeksforgeeks.org/find-next-greater-number-set-digits/).\\n\\nAt first, lets look at the edge cases -\\n1. If all digits sorted in descending order, then output is always \\u201cNot Possible\\u201d. For example, 4321.\\n2) If all digits are sorted in ascending order, then we need to swap last two digits. For example, 1234.\\n3) For other cases, we need to process the number from rightmost side (why? because we need to find the smallest of all greater numbers)\\n\\nNow the main algorithm works in following steps -\\n\\nI) Traverse the given number from rightmost digit, keep traversing till you find a digit which is smaller than the previously traversed digit. For example, if the input number is \\u201c534976\\u201d, we stop at 4 because 4 is smaller than next digit 9. If we do not find such a digit, then output is \\u201cNot Possible\\u201d.\\n\\nII) Now search the right side of above found digit \\u2018d\\u2019 for the smallest digit greater than \\u2018d\\u2019. For \\u201c53**4**976\\u2033, the right side of 4 contains \\u201c976\\u201d. The smallest digit greater than 4 is **6**.\\n\\nIII) Swap the above found two digits, we get 53**6**97**4** in above example.\\n\\nIV) Now sort all digits from position next to \\u2018d\\u2019 to the end of number. The number that we get after sorting is the output. For above example, we sort digits in bold 536**974**. We get \\u201c536**479**\\u201d which is the next greater number for input 534976.\\n\\n```\\npublic class Solution {\\n    public int nextGreaterElement(int n) {\\n        char[] number = (n + \"\").toCharArray();\\n        \\n        int i, j;\\n        // I) Start from the right most digit and \\n        // find the first digit that is\\n        // smaller than the digit next to it.\\n        for (i = number.length-1; i > 0; i--)\\n            if (number[i-1] < number[i])\\n               break;\\n\\n        // If no such digit is found, its the edge case 1.\\n        if (i == 0)\\n            return -1;\\n            \\n         // II) Find the smallest digit on right side of (i-1)'th \\n         // digit that is greater than number[i-1]\\n        int x = number[i-1], smallest = i;\\n        for (j = i+1; j < number.length; j++)\\n            if (number[j] > x && number[j] <= number[smallest])\\n                smallest = j;\\n        \\n        // III) Swap the above found smallest digit with \\n        // number[i-1]\\n        char temp = number[i-1];\\n        number[i-1] = number[smallest];\\n        number[smallest] = temp;\\n        \\n        // IV) Sort the digits after (i-1) in ascending order\\n        Arrays.sort(number, i, number.length);\\n        \\n        long val = Long.parseLong(new String(number));\\n        return (val <= Integer.MAX_VALUE) ? (int) val : -1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101815",
			"view":"3614",
			"top":"1",
			"title":"C++ 4 lines (next_permutation)",
			"vote":"11",
			"content":"```\\nint nextGreaterElement(int n) {\\n    auto digits = to_string(n);\\n    next_permutation(begin(digits), end(digits));\\n    auto res = stoll(digits);\\n    return (res > INT_MAX || res <= n) ? -1 : res;\\n}\\n```"
		},
		{
			"lc_ans_id":"101825",
			"view":"1311",
			"top":"2",
			"title":"[C++] Solution with explanation",
			"vote":"5",
			"content":"```\\n/**\\n * 1. a max number has the property of decreasing in every digit: 9876\\n * 2. find the first non-max substring from the right; ex. in 1234(59876), 59876 is the first non-max substring from the right\\n * 3. sort the max part of 5(9876), by reverse, becames 5(6789);\\n * 4. flip 5,6, becames 65789; because 6 is the next smallest digit than 5, in 56789;\\n * 5. incase of 66789, you got flip 6 with 7 to make it 76689, to make it bigger.\\n */\\nclass Solution {\\npublic:\\n    int nextGreaterElement(int n) {\\n        string s = to_string(n);\\n        if (s.length() == 1) {\\n            return -1;\\n        }\\n        /* find the first decreasing digit from the right, eg: 59876, 5 is the first decreasing digit */\\n        int i = s.length() - 2; // 21 -> i = 0; 59876 -> i = 3\\n        for (; i >= 0 && s[i] >= s[i + 1]; i--) { }\\n        if (i == -1) {  // if a decreasing digit cannot be find, the number cannot be larger.\\n            return -1;\\n        }\\n        reverse(s.begin() + i + 1, s.end());\\n        for (int j = i + 1; j < s.length(); j++) {\\n            if (s[j] > s[i]) {\\n                swap(s[i], s[j]);\\n                break;\\n            }\\n        }\\n        long next = stol(s);\\n        return next == n || next > INT_MAX ? -1 : next;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"101843",
			"view":"2716",
			"top":"3",
			"title":"Java Solution like Next Permutation Problem O(n)",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public int nextGreaterElement(int n) {\\n        char[] a=(\"\"+n).toCharArray();\\n        int i = a.length - 2;\\n        while (i >= 0 && a[i + 1] <= a[i]) {\\n            i--;\\n        }\\n        if(i<0)\\n            return -1;\\n        int j = a.length - 1;\\n        while (j >= 0 && a[j] <= a[i]) {\\n            j--;\\n        }\\n        swap(a, i, j);\\n        reverse(a, i + 1);\\n        try{\\n           return Integer.parseInt(new String(a));\\n        }\\n        catch(Exception e){\\n           return -1;\\n        }\\n    }\\n    private void reverse(char[] a, int start) {\\n        int i = start, j = a.length - 1;\\n        while (i < j) {\\n            swap(a, i, j);\\n            i++;\\n            j--;\\n        }\\n    }\\n    private void swap(char[] a, int i, int j) {\\n        char temp = a[i];\\n        a[i] = a[j];\\n        a[j] = temp;\\n    }\\n}"
		},
		{
			"lc_ans_id":"101834",
			"view":"1973",
			"top":"4",
			"title":"Java(5ms) - Find - Swap - Sort Solution",
			"vote":"3",
			"content":"From right to left, the idea is to find the number greater than `num[i]`, swap it, and sort the rest of the elements to the right.\\n\\n    public int nextGreaterElement(int n) {\\n        char[] num = (n + \"\").toCharArray();\\n        for(int i = num.length-2; i >= 0; i--) {\\n            // find min number greater than num(i)\\n            int minIdx = i;\\n            for(int j = i+1; j < num.length; j++) {\\n                minIdx = num[j] > num[i] ? j : minIdx;\\n            }\\n            if(minIdx != i) {\\n                char temp = num[i]; //swap minIdx and i;\\n                num[i] = num[minIdx];\\n                num[minIdx] = temp;\\n                \\n                Arrays.sort(num, i+1, num.length);\\n\\n                long val = Long.parseLong(new String(num));\\n                return (val <= Integer.MAX_VALUE) ? (int) val : -1;\\n            }\\n        }\\n        return -1;\\n    }"
		},
		{
			"lc_ans_id":"101818",
			"view":"105",
			"top":"5",
			"title":"My Java solution with explanation in comments (3ms)",
			"vote":"2",
			"content":"```\\n    public int nextGreaterElement(int n) {\\n\\n        char[] cArr = String.valueOf(n).toCharArray();\\n\\n        // i is the leftmost digit that should be exchanged\\n        int i = cArr.length - 1;\\n        while (i > 0 && cArr[i] <= cArr[i-1]) i--;\\n\\n        if (i <= 0) return -1;\\n\\n        // j is the digit that should be exchanged with digit at i\\n        int j = cArr.length - 1;\\n        while (j >= i && cArr[j] <= cArr[i-1]) j--;\\n\\n        // Exchange the digits at location i and j\\n        char tmp = cArr[j];\\n        cArr[j] = cArr[i-1];\\n        cArr[i-1] = tmp;\\n\\n        // Sort the digits from location i to the end\\n        Arrays.sort(cArr, i, cArr.length);\\n\\n        try {\\n           return Integer.parseInt(String.valueOf(cArr));\\n        } catch (Exception e) {\\n            // Intentionally left blank\\n        }\\n        return -1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"101870",
			"view":"276",
			"top":"6",
			"title":"Java Solution with in-line explanation",
			"vote":"2",
			"content":"The same problem with https://leetcode.com/problems/next-permutation\\n\\n```\\npublic class Solution {\\n    public int nextGreaterElement(int n) {\\n        char[] chars = (n + \"\").toCharArray();\\n        \\n        int l = chars.length;\\n        if (l < 2) return -1;\\n        int[] nums = new int[l];\\n        \\n        for (int i = 0; i < l; i++) nums[i] = chars[i] - '0';\\n        \\n        //Start from its last element, traverse backward to find the first one with index i that satisfy\\n       // nums[i-1] < nums[i]. So, elements from nums[i] to nums[l-1] is reversely sorted.\\n        int index = l - 1;\\n        while (index > 0) {\\n            if (nums[index - 1] < nums[index]) break;\\n            index--;\\n        }\\n        \\n        //To find the next permutation, we have to swap some numbers at different positions, \\n        //to minimize the increased amount, we have to make the highest changed position\\n        // as high as possible. Notice that index larger than or equal to i is not possible as\\n        // nums[i,l-1] is reversely sorted. So, we want to increase the number at index i-1,\\n        // clearly, swap it with the smallest number between nums[i,l-1] that is larger than nums[i-1].\\n        // For example, original number is 121543321, we want to swap the '1' at position 2 with '2' at position 7.\\n        if (index == 0) {\\n            return -1;\\n        }\\n        else {\\n            //The last step is to make the remaining higher position part as small as possible,\\n           // we just have to reversely sort the nums[i,l-1]\\n            int val = nums[index - 1];\\n            int j = l - 1;\\n            while (j >= index){\\n                if (nums[j] > val) break;\\n                j--;\\n            }\\n            swap(nums, j, index - 1);\\n            \\n            reverse(nums, index, l - 1);\\n        }\\n        \\n        long result = 0;\\n        for (int i = 0; i < l; i++) {\\n            result = result * 10 + nums[i];\\n        }\\n        \\n        return result <= Integer.MAX_VALUE ? (int)result : -1;\\n    }\\n    \\n    public void swap(int[] nums, int i, int j){\\n        int temp = nums[i];\\n        nums[i] = nums[j];\\n        nums[j] = temp;\\n    }\\n    \\n    public void reverse(int[] nums, int start, int end){   \\n        if (start > end) return;\\n        for (int i = start; i <= (end + start) / 2; i++)\\n            swap(nums, i, start + end - i);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101823",
			"view":"430",
			"top":"7",
			"title":"This problem is the same to Next Permutation, algorithm only.",
			"vote":"2",
			"content":"Here is one simple example.\\nindex:  012345\\ngiven:  124651\\nans :      125146\\nprocedure:\\nStarting from the rightmost digit, going to left. Find the first digit which is smaller than the previous digit. \\nIn this example, 4 is smaller than 6.  Remember 4 and its index 2. \\nGoing from rightmost again. This time, find the first digit which is bigger than 4. It is 5 here.\\nSwap 4 and 5. The number becomes 125641.\\nReverse all the digits which are right to 4's original index (That is 2), 641 should be reversed to 146 here.  \\nAnd the answer is reached which is 125146."
		},
		{
			"lc_ans_id":"101871",
			"view":"510",
			"top":"8",
			"title":"Concise Java Solution - Equivalent to Next Greater Permutation",
			"vote":"2",
			"content":"```\\npublic int nextGreaterElement(int num) {\\n    String n = Integer.toString(num);\\n    for (int i=n.length()-2;i>=0;i--) {\\n        if (n.charAt(i) >= n.charAt(i+1)) continue;\\n        for (int j=n.length()-1;j>i;j--) {\\n            if (n.charAt(i) >= n.charAt(j)) continue;\\n            try {\\n                return Integer.parseInt(n.substring(0,i) + n.charAt(j) \\n                       + new StringBuilder(n.substring(i+1, j) + n.charAt(i) + n.substring(j+1)).reverse().toString()); \\n            } catch(Exception e) { return -1; }\\n        }\\n    }\\n    return -1;\\n}\\n```"
		},
		{
			"lc_ans_id":"101839",
			"view":"125",
			"top":"9",
			"title":"C++ STL 2-line self-comment solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int nextGreaterElement(int n) {\\n        string s = to_string(n);\\n        return next_permutation(s.begin(), s.end()) && stoll(s) <= numeric_limits<int>::max() ? stoi(s) : -1;\\n    }\\n};\\n```"
		}
	],
	"id":"539",
	"title":"Next Greater Element III",
	"content":"<p>Given a positive <strong>32-bit</strong> integer <strong>n</strong>, you need to find the smallest <strong>32-bit</strong> integer which has exactly the same digits existing in the integer <strong>n</strong> and is greater in value than n. If no such positive <strong>32-bit</strong> integer exists, you need to return -1.</p>\r\n\r\n<p><strong>Example 1:</strong></p>\r\n\r\n<pre>\r\n<strong>Input:</strong> 12\r\n<strong>Output:</strong> 21\r\n</pre>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Example 2:</strong></p>\r\n\r\n<pre>\r\n<strong>Input:</strong> 21\r\n<strong>Output:</strong> -1\r\n</pre>\r\n\r\n<p>&nbsp;</p>\r\n",
	"frequency":"142",
	"ac_num":"11316"
}