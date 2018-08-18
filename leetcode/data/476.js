{
	"difficulty":"2",
	"submit_num":"13627",
	"show_id":"484",
	"leetcode_id":"484",
	"answers":[
		{
			"lc_ans_id":"96613",
			"view":"6071",
			"top":"0",
			"title":"Java O(n) clean solution easy to understand",
			"vote":"37",
			"content":"For example, given ```IDIIDD``` we start with sorted sequence ```1234567```\\nThen for each ```k``` continuous ```D``` starting at index ```i``` we need to reverse ```[i, i+k]``` portion of the sorted sequence.\\n\\n```\\nIDIIDD\\n1234567 // sorted\\n1324765 // answer\\n```\\n```\\n    public int[] findPermutation(String s) {\\n        int n = s.length(), arr[] = new int[n + 1]; \\n        for (int i = 0; i <= n; i++) arr[i] = i + 1; // sorted\\n        for (int h = 0; h < n; h++) {\\n            if (s.charAt(h) == 'D') {\\n                int l = h;\\n                while (h < n && s.charAt(h) == 'D') h++;\\n                reverse(arr, l, h); \\n            }   \\n        }   \\n        return arr;\\n    }   \\n\\n    void reverse(int[] arr, int l, int h) {\\n        while (l < h) {\\n            arr[l] ^= arr[h];\\n            arr[h] ^= arr[l];\\n            arr[l] ^= arr[h];\\n            l++; h--;\\n        }   \\n    }\\n```"
		},
		{
			"lc_ans_id":"96624",
			"view":"1995",
			"top":"1",
			"title":"1-liner and 5-liner, visual explanation",
			"vote":"35",
			"content":"If it's all just `I`, then the answer is the numbers in ascending order. And if there are streaks of `D`, then just reverse the number streak under each:\\n\\n![0_1485039424299_Find Permutation.png](/uploads/files/1485039426666-find-permutation.png) \\n\\nMy 5-liner does exactly that. Start from sorted, then find the `D`-streaks and reverse the numbers under them:\\n\\n    def findPermutation(self, s):\\n        a = range(1, len(s) + 2)\\n        for m in re.finditer('D+', s):\\n            i, j = m.start(), m.end() + 1\\n            a[i:j] = a[i:j][::-1]\\n        return a\\n\\nMy 1-liner tells `sorted` that the (larger) number `i` comes before the (smaller) number `j` iff they're both under the same `D`-streak, i.e., iff there's no `I` between them. (I'm not totally sure that `i` will always be the larger number, but it appears to be the case).\\n\\n    def findPermutation(self, s):\\n        return sorted(range(1, len(s) + 2), cmp=lambda i, j: -('I' not in s[j-1:i-1]))"
		},
		{
			"lc_ans_id":"96663",
			"view":"1431",
			"top":"2",
			"title":"Greedy O(n) JAVA solution with explanation",
			"vote":"17",
			"content":"Idea is pretty simple. There are 2 possibilities:\\n1. String starts with `\"I\"`. Then we should use 1 as the first item.\\n2. String starts with `\"D..DI\"` (`k` letters) or the string is just `\"D...D\"`. In this case we should use `k, k - 1, ..., 1` to get lexicographically smallest permutation.\\n\\nThen we proceed computing the rest of the array. Also we should increase `min` variable that is used to store minimum value in remaining part of the array.\\n\\n```\\npublic int[] findPermutation(String s) {\\n    \\n    s = s + \".\";\\n    int[] res = new int[s.length()];\\n    int min = 1, i = 0;\\n\\n    while (i < res.length) {\\n        if (s.charAt(i) != 'D') {\\n            res[i++] = min++;\\n        } else {\\n            int j = i;\\n            while (s.charAt(j) == 'D') j++;\\n            for (int k = j; k >= i; k--)\\n                res[k] = min++;\\n            i = j + 1;\\n        }\\n    }\\n\\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"96650",
			"view":"1465",
			"top":"3",
			"title":"Python simple O(n) solution in 5 lines",
			"vote":"13",
			"content":"**I have used a greedy algorithm:**\\n1. Loop on the input and insert a decreasing numbers when see a 'I'\\n2. Insert a decreasing numbers to complete the result.\\n\\n**Simple example:**\\nInput: \"DIDDID\"\\n0 []\\n1 [2, 1]\\n2 [2, 1]\\n3 [2, 1]\\n4 [2, 1, 5, 4, 3]\\n5 [2, 1, 5, 4, 3]\\n[2, 1, 5, 4, 3, 7, 6]\\n\\nThen, output is [2, 1, 5, 4, 3, 7, 6]\\n\\n```\\ndef findPermutation(self, s):\\n    ret = []\\n    for i in range(len(s)):\\n      if s[i] == 'I':\\n        ret.extend(range(i + 1, len(ret), -1))\\n    ret.extend(range(len(s) + 1, len(ret), -1))\\n    return ret\\n````\\nHope that you like my solution. :)"
		},
		{
			"lc_ans_id":"96644",
			"view":"1436",
			"top":"4",
			"title":"C++ simple solution in 72ms and 9 lines",
			"vote":"11",
			"content":"````\\nvector<int> findPermutation(string s) {\\n  vector<int> ret;\\n  for (int i = 0; i <= s.size(); ++i)\\n    if (i == s.size() || s[i] == 'I')\\n      for (int j = i + 1, lenTmp = ret.size(); j > lenTmp; --j)\\n        ret.push_back(j);\\n  return ret;\\n}\\n\\n````"
		},
		{
			"lc_ans_id":"96643",
			"view":"293",
			"top":"5",
			"title":"Python O(n) solution with stack",
			"vote":"3",
			"content":"To find the smallest lexicographical permutation, we start with a list of increasing order. All \"I\"s are already satisfied.  With any sequence of continuous 'D''s, we reverse the list. Since the range of the numbers within the sequence is unchanged, the \"I\"'s are not influenced. \\n```\\nclass Solution(object):\\n    def findPermutation(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: List[int]\\n        \"\"\"\\n        \\n        l = len(s)\\n        stack,res = [],[]\\n        for i in range (l):\\n            cur_num = i+1\\n            if s[i] == 'D':\\n                stack.append(cur_num)\\n            if s[i] == 'I':\\n                stack.append(cur_num)\\n                while stack:\\n                    res.append(stack.pop())\\n        # last digit\\n        res.append(l+1)\\n        while stack:\\n            res.append(stack.pop())\\n            \\n        return res\\n```"
		},
		{
			"lc_ans_id":"96652",
			"view":"190",
			"top":"6",
			"title":"C++ straightforward solution with iterator and insert()",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> findPermutation(string s) {\\n        vector<int> res(1, 1);\\n        auto b = res.begin();\\n        int i = 2;\\n        for (auto c : s) {\\n            if (c == 'D') {\\n                b = res.insert(b, i++);\\n            }\\n            else {\\n                res.push_back(i++);\\n                b = prev(res.end());\\n            }\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"96665",
			"view":"174",
			"top":"7",
			"title":"Clean 23ms Stack solution",
			"vote":"2",
			"content":"```\\npublic int[] findPermutation(String s) {\\n\\tint[] res = new int[s.length()+1];\\n\\tStack<Integer> stack = new Stack<Integer>();\\n\\tint min = 0;\\n\\tfor (int i = 0; i < s.length(); i++) {\\n\\t\\tchar c = s.charAt(i);\\n\\t\\tif (c == 'D') stack.add(i);\\n\\t\\telse {\\n\\t\\t\\tres[i] = ++min;\\n\\t\\t\\twhile (!stack.isEmpty()) res[stack.pop()] = ++min;\\n\\t\\t}\\n\\t}\\n\\tif (s.charAt(s.length()-1) == 'D') stack.add(s.length());\\n\\telse res[res.length-1] = ++min;\\n\\n\\twhile (!stack.isEmpty()) res[stack.pop()] = ++min;\\n\\treturn res;\\n}\\n```"
		},
		{
			"lc_ans_id":"96620",
			"view":"104",
			"top":"8",
			"title":"Consice 15-line C++ solution by using reverse",
			"vote":"1",
			"content":"We initialize one vector from 1 to n and call it nums, so this should be the result if secret signature is made up with all I's.\\nImagine we meet one 'D' in the given secret signature, which means nums[i] should be smaller than nums[i+1], then all we need to do is swap nums[i] with nums[i+1].\\nBut what if we have multiple 'D' s?\\nIf we have continuous 'D's from s[i, j] then that means nums[i, j+1] should be in descending order, so we just reverse this subsequence in nums.\\nBy swiping from left to right, we are able to get the smallest permutation possible.\\nHere is the code - \\n```\\n    vector<int> findPermutation(string s) \\n    {\\n        int n = s.length();\\n    \\tvector<int> nums(n + 1);\\n    \\tfor (int i = 0; i < n + 1; i++) nums[i] = i+1; // initialize vector in increasing order\\n    \\tint i = 0;\\n    \\twhile (i < n)\\n    \\t{\\n    \\t\\tif (s[i] == 'I') i++;\\n    \\t\\telse\\n    \\t\\t{\\n    \\t\\t\\tint j = i; // remember the start point\\n    \\t\\t\\twhile (i < n && s[i] == 'D') i++;\\n    \\t\\t\\treverse(nums.begin()+j, nums.begin()+i+1); // affected range nums[j, i]\\n    \\t\\t}\\n    \\t}\\n    \\treturn nums;    \\n    }\\n```"
		},
		{
			"lc_ans_id":"96623",
			"view":"89",
			"top":"9",
			"title":"My accepted solution.No need to reverse string.",
			"vote":"1",
			"content":"```\\nvar findPermutation = function(word) {\\n    if(!word){\\n        return;\\n    }\\n    var res=[];\\n    var i=1;\\n    res.push(i);\\n    var dInsert=0;\\n    word.split('').forEach(e=>{\\n       if(e==='D'){\\n           res.splice(dInsert,0,++i);\\n       } else if(e==='I'){\\n           res.push(++i);\\n           dInsert=res.length-1;\\n       }\\n    });\\n    return res;\\n};\\n```"
		}
	],
	"id":"476",
	"title":"Find Permutation",
	"content":"<p>\r\nBy now, you are given a <b>secret signature</b> consisting of character 'D' and 'I'. 'D' represents a decreasing relationship between two numbers, 'I' represents an increasing relationship between two numbers. And our <b>secret signature</b> was constructed by a special integer array, which contains uniquely all the different number from 1 to n (n is the length of the secret signature plus 1). For example, the secret signature \"DI\" can be constructed by array [2,1,3] or [3,1,2], but won't be constructed by array [3,2,4] or [2,1,3,4], which are both illegal constructing special string that can't represent the \"DI\" <b>secret signature</b>.\r\n</p>\r\n\r\n<p>\r\nOn the other hand, now your job is to find the lexicographically smallest permutation of [1, 2, ... n] could refer to the given <b>secret signature</b> in the input.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"I\"\r\n<b>Output:</b> [1,2]\r\n<b>Explanation:</b> [1,2] is the only legal initial spectial string can construct secret signature \"I\", where the number 1 and 2 construct an increasing relationship.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"DI\"\r\n<b>Output:</b> [2,1,3]\r\n<b>Explanation:</b> Both [2,1,3] and [3,1,2] can construct the secret signature \"DI\", </br>but since we want to find the one with the smallest lexicographical permutation, you need to output [2,1,3]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The input string will only contain the character 'D' and 'I'.</li>\r\n<li>The length of input string is a positive integer and will not exceed 10,000</li>\r\n</p>",
	"frequency":"49",
	"ac_num":"7579"
}