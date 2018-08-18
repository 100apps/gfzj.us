{
	"difficulty":"1",
	"submit_num":"839461",
	"show_id":"28",
	"leetcode_id":"28",
	"answers":[
		{
			"lc_ans_id":"12807",
			"view":"56998",
			"top":"0",
			"title":"Elegant Java solution",
			"vote":"167",
			"content":"    public int strStr(String haystack, String needle) {\\n      for (int i = 0; ; i++) {\\n        for (int j = 0; ; j++) {\\n          if (j == needle.length()) return i;\\n          if (i + j == haystack.length()) return -1;\\n          if (needle.charAt(j) != haystack.charAt(i + j)) break;\\n        }\\n      }\\n    }"
		},
		{
			"lc_ans_id":"12811",
			"view":"23354",
			"top":"1",
			"title":"Share my accepted java solution",
			"vote":"67",
			"content":"    public class Solution {\\n        public int strStr(String haystack, String needle) {\\n            int l1 = haystack.length(), l2 = needle.length();\\n            if (l1 < l2) {\\n                return -1;\\n            } else if (l2 == 0) {\\n                return 0;\\n            }\\n            int threshold = l1 - l2;\\n            for (int i = 0; i <= threshold; ++i) {\\n                if (haystack.substring(i,i+l2).equals(needle)) {\\n                    return i;\\n                }\\n            }\\n            return -1;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"12956",
			"view":"26126",
			"top":"2",
			"title":"Explained 4ms Easy C++ solution",
			"vote":"66",
			"content":"Well, the problem does not aim for an advanced algorithm like KMP but only a clean brute-force algorithm. So we can traverse all the possible starting points of `haystack` (from `0` to `haystack.length() - needle.length()`) and see if the following characters in `haystack` match those of `needle`.\\n\\nThe code is as follows.\\n\\n    class Solution {\\n    public: \\n        int strStr(string haystack, string needle) {\\n            int m = haystack.length(), n = needle.length();\\n            if (!n) return 0;\\n            for (int i = 0; i < m - n + 1; i++) {\\n                int j = 0;\\n                for (; j < n; j++)\\n                    if (haystack[i + j] != needle[j])\\n                        break;\\n                if (j == n) return i;\\n            }\\n            return -1;\\n        }\\n    };\\n\\nOf course, you may challenge yourself implementing the KMP algorithm for this problem. \\n\\nKMP is a classic and yet notoriously hard-to-understand algorithm. However, I think the following two links give nice explanations. You may refer to them.\\n\\n 1. [KMP on jBoxer's blog][1];\\n 2. [KMP on geeksforgeeks][2], with a well-commented C code.\\n\\nI am sorry that I am still unable to give a personal explanation of the algorithm. I only read it from the two links above and mimic the code in the second link.\\n\\nMy accepted C++ code using KMP is as follows. Well, it also takes 4ms -_-\\n\\n    class Solution {\\n    public:\\n        int strStr(string haystack, string needle) {\\n            int m = haystack.length(), n = needle.length();\\n            if (!n) return 0;\\n            vector<int> lps = kmpProcess(needle);\\n            for (int i = 0, j = 0; i < m; ) {\\n                if (haystack[i] == needle[j]) { \\n                    i++;\\n                    j++;\\n                }\\n                if (j == n) return i - j;\\n                if (i < m && haystack[i] != needle[j]) {\\n                    if (j) j = lps[j - 1];\\n                    else i++;\\n                }\\n            }\\n            return -1;\\n        }\\n    private:\\n        vector<int> kmpProcess(string& needle) {\\n            int n = needle.length();\\n            vector<int> lps(n, 0);\\n            for (int i = 1, len = 0; i < n; ) {\\n                if (needle[i] == needle[len])\\n                    lps[i++] = ++len;\\n                else if (len) len = lps[len - 1];\\n                else lps[i++] = 0;\\n            }\\n            return lps;\\n        }\\n    };\\n\\n  [1]: http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/\\n  [2]: http://www.geeksforgeeks.org/searching-for-patterns-set-2-kmp-algorithm/"
		},
		{
			"lc_ans_id":"12931",
			"view":"25434",
			"top":"3",
			"title":"A very clean solution, brute-force",
			"vote":"60",
			"content":"    int strStr(char *haystack, char *needle) {\\n            if (!haystack || !needle) return -1;\\n            for (int i = 0; ; ++i) {\\n                for (int j = 0; ; ++j) {\\n                    if (needle[j] == 0) return i;\\n                    if (haystack[i + j] == 0) return -1;\\n                    if (haystack[i + j] != needle[j]) break;\\n                }\\n            }\\n        }"
		},
		{
			"lc_ans_id":"12814",
			"view":"10353",
			"top":"4",
			"title":"My answer by Python",
			"vote":"38",
			"content":"    class Solution(object):\\n    def strStr(self, haystack, needle):\\n        \"\"\"\\n        :type haystack: str\\n        :type needle: str\\n        :rtype: int\\n        \"\"\"\\n        for i in range(len(haystack) - len(needle)+1):\\n            if haystack[i:i+len(needle)] == needle:\\n                return i\\n        return -1"
		},
		{
			"lc_ans_id":"12886",
			"view":"12909",
			"top":"5",
			"title":"Accepted KMP solution in java for reference",
			"vote":"26",
			"content":"\\n    public String strStr(String haystack, String needle) {\\n    \\t//KMP algorithms\\n    \\tif(needle.equals(\"\")) return haystack;\\n    \\tif(haystack.equals(\"\")) return null;\\n    \\tchar[] arr = needle.toCharArray();\\n    \\tint[] next = makeNext(arr);\\n\\n    \\tfor(int i = 0, j = 0, end = haystack.length(); i < end;){\\n    \\t\\tif(j == -1 || haystack.charAt(i) == arr[j]){\\n    \\t\\t\\tj++;\\n    \\t\\t\\ti++;\\n    \\t\\t\\tif(j == arr.length) return haystack.substring(i - arr.length);\\n    \\t\\t}\\n    \\t\\tif(i < end && haystack.charAt(i) != arr[j]) j = next[j];\\n    \\t}\\n        return null;\\n    }\\n\\n    private int[] makeNext(char[] arr){\\n    \\tint len = arr.length;\\n    \\tint[] next = new int[len];\\n\\n    \\tnext[0] = -1;\\n    \\tfor(int i = 0, j = -1; i + 1 < len;){\\n    \\t\\tif(j == -1 || arr[i] == arr[j]){\\n    \\t\\t\\tnext[i+1] = j+1;\\n    \\t\\t\\tif(arr[i+1] == arr[j+1]) next[i+1] = next[j+1];\\n    \\t\\t\\ti++;\\n    \\t\\t\\tj++;\\n    \\t\\t}\\n    \\t\\tif(arr[i] != arr[j]) j = next[j];\\n    \\t}\\n\\n    \\treturn next;\\n    }"
		},
		{
			"lc_ans_id":"13018",
			"view":"3025",
			"top":"6",
			"title":"This test case doesn't make sense.",
			"vote":"21",
			"content":"Input: \\t\"\", \"\"\\nOutput: \\t-1\\nExpected: \\t0\\n\\nBasically there is nothing in the string, how do you get the index.\\n\\nIf this test case is valid, then needle =\"\", haystack=\"anything\" could return any value. since empty is everywhere."
		},
		{
			"lc_ans_id":"12952",
			"view":"2445",
			"top":"7",
			"title":"Java easy to understand solutions.",
			"vote":"13",
			"content":"       \\n    public int strStr1(String haystack, String needle) {\\n        return haystack.indexOf(needle);\\n    }\\n    \\n    public int strStr(String haystack, String needle) {\\n        if (haystack == null || needle == null)\\n            return -1;\\n        int l1 = haystack.length();\\n        int l2 = needle.length();\\n        for (int i = 0; i < l1-l2+1; i++) {\\n            int count = 0;\\n            while (count < l2 && haystack.charAt(i+count) == needle.charAt(count))\\n                count++;\\n            if (count == l2)\\n                return i;\\n        }\\n        return -1;\\n    }"
		},
		{
			"lc_ans_id":"13255",
			"view":"1552",
			"top":"8",
			"title":"Python 56 ms Time O(N*M) Space O(1)",
			"vote":"12",
			"content":"Do we need to really use KMP in the interview? I just had a few interviews but personally I really can not remember those fantastic algorithms in that short period of time in pressure. Maybe I was nervous and needed more programming practice..\\n\\n\\n    def strStr(self, haystack, needle):\\n        if needle == \"\":\\n            return 0\\n        for i in range(len(haystack)-len(needle)+1):\\n            for j in range(len(needle)):\\n                if haystack[i+j] != needle[j]:\\n                    break\\n                if j == len(needle)-1:\\n                    return i\\n        return -1"
		},
		{
			"lc_ans_id":"13385",
			"view":"10355",
			"top":"9",
			"title":"Are we expected to use KMP for this problem?",
			"vote":"12",
			"content":" Is it the standard string matching problem? Am I wrong?"
		}
	],
	"id":"28",
	"title":"Implement strStr()",
	"content":"<p>\r\nImplement <a href=\"http://www.cplusplus.com/reference/cstring/strstr/\" target=\"_blank\">strStr()</a>.\r\n</p>\r\n\r\n<p>\r\nReturn the index of the first occurrence of needle in haystack, or <b>-1</b> if needle is not part of haystack.\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> haystack = \"hello\", needle = \"ll\"\r\n<b>Output:</b> 2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> haystack = \"aaaaa\", needle = \"bba\"\r\n<b>Output:</b> -1\r\n</pre>\r\n</p>",
	"frequency":"515",
	"ac_num":"241717"
}