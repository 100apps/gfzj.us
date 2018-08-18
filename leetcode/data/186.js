{
	"difficulty":"2",
	"submit_num":"126542",
	"show_id":"186",
	"leetcode_id":"186",
	"answers":[
		{
			"lc_ans_id":"53775",
			"view":"16938",
			"top":"0",
			"title":"My Java solution with explanation",
			"vote":"84",
			"content":"\\n    public void reverseWords(char[] s) {\\n        // Three step to reverse\\n        // 1, reverse the whole sentence\\n        reverse(s, 0, s.length - 1);\\n        // 2, reverse each word\\n        int start = 0;\\n        int end = -1;\\n        for (int i = 0; i < s.length; i++) {\\n            if (s[i] == ' ') {\\n                reverse(s, start, i - 1);\\n                start = i + 1;\\n            }\\n        }\\n        // 3, reverse the last word, if there is only one word this will solve the corner case\\n        reverse(s, start, s.length - 1);\\n    }\\n    \\n    public void reverse(char[] s, int start, int end) {\\n        while (start < end) {\\n            char temp = s[start];\\n            s[start] = s[end];\\n            s[end] = temp;\\n            start++;\\n            end--;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"53765",
			"view":"4390",
			"top":"1",
			"title":"Java concise in-place solution.",
			"vote":"11",
			"content":"       \\n    public void reverseWords(char[] s) {\\n        reverse(s, 0, s.length-1);  // reverse the whole string first\\n        int r = 0;\\n        while (r < s.length) {\\n            int l = r;\\n            while (r < s.length && s[r] != ' ')\\n                r++;\\n            reverse(s, l, r-1);  // reverse words one by one\\n            r++;\\n        }\\n    }\\n    \\n    public void reverse(char[] s, int l, int r) {\\n        while (l < r) {\\n            char tmp = s[l];\\n            s[l++] = s[r];\\n            s[r--] = tmp;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"53795",
			"view":"5780",
			"top":"2",
			"title":"Python - use reverse() and reversed()",
			"vote":"8",
			"content":"    class Solution(object):\\n        def reverseWords(self, s):\\n            \"\"\"\\n            :type s: a list of 1 length strings (List[str])\\n            :rtype: nothing\\n            \"\"\"\\n            s.reverse()\\n    \\n            index = 0\\n            for i in range(len(s)):\\n                if s[i] == \" \":\\n                    s[index: i] = reversed(s[index: i])\\n                    index = i + 1\\n    \\n            s[index: ] = reversed(s[index: ])\\n\\nLearn something new. Slice of list can use reverse() function, does not work. But, we can assign the reversed part to the slice of list."
		},
		{
			"lc_ans_id":"53851",
			"view":"3223",
			"top":"3",
			"title":"Six lines solution in C++",
			"vote":"8",
			"content":"    void reverseWords(string &s) {\\n        reverse(s.begin(), s.end());\\n        for (int i = 0, j = 0; i < s.size(); i = j + 1) {\\n            for (j = i; j < s.size() && !isblank(s[j]); ++j);\\n            reverse(s.begin()+i, s.begin()+j);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"53832",
			"view":"1769",
			"top":"4",
			"title":"Python solution",
			"vote":"7",
			"content":"reverse the whole string and then reverse words by words\\n\\n    def reverseWords(self, s):\\n        self.reverse(s, 0, len(s) - 1)\\n        \\n        beg = 0\\n        for i in xrange(len(s)):\\n            if s[i] == ' ':\\n                self.reverse(s, beg, i-1)\\n                beg = i + 1\\n            elif i == len(s) -1:\\n                self.reverse(s, beg, i)\\n    \\n    def reverse(self, s, start, end):\\n        while start < end:\\n            s[start], s[end] = s[end], s[start]\\n            start += 1\\n            end -= 1"
		},
		{
			"lc_ans_id":"53845",
			"view":"1076",
			"top":"5",
			"title":"6-lines 8ms C++ Solution",
			"vote":"4",
			"content":"The idea is simple: reverse the full string `s` first and then reverse each word in it in place. For reversing each word, we just need to locate the left and right boundaries of the word. The code is as follows.\\n\\n    class Solution { \\n    public:\\n        void reverseWords(string &s) {\\n            reverse(s.begin(), s.end());\\n            int n = s.length(), l = 0, r = 0;\\n            while (r < n) {\\n                while (r < n && !isspace(s[r])) r++;\\n                reverse(s.begin() + l, s.begin() + r); \\n                l = ++r;\\n            }\\n        } \\n    };"
		},
		{
			"lc_ans_id":"53787",
			"view":"1165",
			"top":"6",
			"title":"Easy Python one line",
			"vote":"3",
			"content":"    class Solution(object):\\n        def reverseWords(self, s):     \\n            s[:] = list(' '.join(reversed(''.join(s).split(' '))))"
		},
		{
			"lc_ans_id":"53768",
			"view":"118",
			"top":"7",
			"title":"Bug in the testing code",
			"vote":"1",
			"content":"I ran into a strange error trying to submit this code. The input is \"\", my output is [] and the expected output is\"\". I didn't really understand how this can even be an issue with my code since we don't even return anything. Ultimately I tested it with a few solutions that are listed in the discussion and those also produce the same error. Is anyone else having this issue?\\n\\nMy code, in case there's any concern:\\n```\\npublic class Solution {\\n    public void reverseWords(char[] s) {\\n        if (s.length < 2) {\\n            return;\\n        }\\n        flip(s, 0, s.length - 1);\\n        \\n        int start = 0;\\n        int end = -1;\\n        while (start < s.length) {\\n            while (isWhiteSpace(s[start])) {\\n                ++start;\\n            }\\n            end = start + 1;\\n            \\n            while (end < s.length && !isWhiteSpace(s[end])) {\\n                ++end;\\n            }\\n            // end is on a space or is the length of the array\\n            flip(s, start, end - 1);\\n            start = end + 1;\\n        }\\n        \\n    }\\n    \\n    private void flip(char[] s, int start, int end) {\\n        while (start < end) {\\n            char temp = s[start];\\n            s[start] = s[end];\\n            s[end] = temp;\\n            ++start;\\n            --end;\\n        }\\n    }\\n    \\n    private boolean isWhiteSpace(char ch) {\\n        return ch == ' ' || ch == '\\\\t' || ch == '\\\\n';\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"53770",
			"view":"62",
			"top":"8",
			"title":"my java code",
			"vote":"1",
			"content":"System has bug here. \\nInput:\"\"\\nOutput:[]\\nExpected:\"\"\\n```\\n    public void reverseWords(char[] s) {\\n        int len=s.length;\\n        reverse(s, 0, len-1);\\n        int idx=0;\\n        for(int i=0;i<len;i++)\\n        {\\n            if(s[i]==' ')\\n            {\\n                reverse(s, idx, i-1);\\n                idx=i+1;\\n            }\\n        }\\n        reverse(s, idx, len-1);\\n    }\\n    \\n    public void reverse(char[] s, int start, int end)\\n    {\\n        while(start<end)\\n        {\\n            char tmp=s[start];\\n            s[start++]=s[end];\\n            s[end--]=tmp;\\n        }\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"53777",
			"view":"118",
			"top":"9",
			"title":"Reverse Twice",
			"vote":"1",
			"content":"1. Reverse the whole sentence\\n2. Reverse each word\\n```\\npublic void reverseWords(char[] s) {\\n        int i=0;\\n        int j=s.length-1;\\n        // swap full sentence\\n        while(i<j) {\\n            swap(s, i, j);\\n            i++;\\n            j--;\\n        }\\n        i=0;j=0;\\n        int k=0;\\n        // swap word by word\\n        while(j<s.length) {\\n        \\twhile(j<s.length && s[j] != ' ') {\\n        \\t\\tj++;\\n        \\t}\\n        \\tk=j-1;\\n                // swap the current word\\n        \\twhile(i<k) {\\n        \\t\\tswap(s,i,k);\\n        \\t\\ti++;\\n        \\t\\tk--;\\n        \\t}\\n        \\tj++;\\n        \\ti=j;\\n        }\\n    }\\n    \\n    private static void swap(char[] s, int i, int j) {\\n        char temp = s[i];\\n        s[i] = s[j];\\n        s[j] = temp;\\n    }\\n```"
		}
	],
	"id":"186",
	"title":"Reverse Words in a String II",
	"content":"<p>\r\nGiven an input string, reverse the string word by word. A word is defined as a sequence of non-space characters.\r\n</p>\r\n\r\n<p>\r\nThe input string does not contain leading or trailing spaces and the words are always separated by a single space.\r\n</p>\r\n\r\n<p>\r\nFor example,<br>\r\nGiven s = \"<code>the sky is blue</code>\",<br>\r\nreturn \"<code>blue is sky the</code>\".\r\n</p>\r\n\r\n<p>\r\nCould you do it <i>in-place</i> without allocating extra space?\r\n</p>\r\n\r\n<p>Related problem: <a href=\"/problems/rotate-array/\">Rotate Array</a></p>\r\n\r\n<p>\r\n<b><font color=\"red\">Update (2017-10-16):</font></b><br>\r\nWe have updated the function signature to accept a <code>character array</code>, so please <b><u>reset to the default code definition</u></b> by clicking on the reload button above the code editor. Also, <b>Run Code</b> is now available!\r\n</p>",
	"frequency":"184",
	"ac_num":"36398"
}