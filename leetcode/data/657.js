{
	"difficulty":"1",
	"submit_num":"59297",
	"show_id":"680",
	"leetcode_id":"680",
	"answers":[
		{
			"lc_ans_id":"107716",
			"view":"8550",
			"top":"0",
			"title":"Java O(n) Time O(1) Space",
			"vote":"15",
			"content":"```\\npublic boolean validPalindrome(String s) {\\n    int l = -1, r = s.length();\\n    while (++l < --r) \\n        if (s.charAt(l) != s.charAt(r)) return isPalindromic(s, l, r+1) || isPalindromic(s, l-1, r);\\n    return true;\\n}\\n\\npublic boolean isPalindromic(String s, int l, int r) {\\n    while (++l < --r) \\n        if (s.charAt(l) != s.charAt(r)) return false;\\n    return true;\\n}\\n```"
		},
		{
			"lc_ans_id":"107714",
			"view":"3186",
			"top":"1",
			"title":"Java solution, isPalindrome",
			"vote":"11",
			"content":"Follow normal way (two pointers) to check if ```s``` is palindrome. When two chars are not equal, try to skip (pseudo ```delete```) either left one or right one and continue checking.\\n```\\nclass Solution {\\n    public boolean validPalindrome(String s) {\\n        int i = 0, j = s.length() - 1;\\n        while (i < j && s.charAt(i) == s.charAt(j)) {\\n            i++; j--;\\n        }\\n\\n        if (i >= j) return true;\\n\\n        if (isPalin(s, i + 1, j) || isPalin(s, i, j - 1)) return true;\\n        return false;\\n    }\\n\\n    private boolean isPalin(String s, int i, int j) {\\n        while (i < j) {\\n            if (s.charAt(i) == s.charAt(j)) {\\n                i++; j--;\\n            }\\n            else return false;\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107718",
			"view":"980",
			"top":"2",
			"title":"Easy to Understand Python Solution",
			"vote":"6",
			"content":"We can use the standard two-pointer approach that starts at the left and right of the string and move inwards. Whenever there is a mismatch, we can either exclude the character at the left or the right pointer. We then take the two remaining substrings and compare against its reversed and see if either one is a palindrome.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def validPalindrome(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: bool\\n        \"\"\"\\n        # Time: O(n)\\n        # Space: O(n)\\n        left, right = 0, len(s) - 1\\n        while left < right:\\n            if s[left] != s[right]:\\n                one, two = s[left:right], s[left + 1:right + 1]\\n                return one == one[::-1] or two == two[::-1]\\n            left, right = left + 1, right - 1\\n        return True\\n```"
		},
		{
			"lc_ans_id":"107720",
			"view":"1377",
			"top":"3",
			"title":"Python easy and concise solution",
			"vote":"5",
			"content":"`````\\ndef validPalindrome(self, s):\\n        i = 0\\n        while i < len(s) / 2 and s[i] == s[-(i + 1)]: i += 1\\n        s = s[i:len(s) - i]\\n        return s[1:] == s[1:][::-1] or s[:-1] == s[:-1][::-1]"
		},
		{
			"lc_ans_id":"107717",
			"view":"1891",
			"top":"4",
			"title":"[C++] Clean Code - 2 liner",
			"vote":"5",
			"content":"**Compact**\\n```\\nclass Solution {\\npublic:\\n    bool validPalindrome(string s) {\\n        return valid(s, 0, s.length() - 1, 1);\\n    }\\n\\nprivate:\\n    bool valid(string& s, int i, int j, int d) { // d: num of chars you can delete at most\\n        return i >= j || (s[i] == s[j] ? valid(s, i + 1, j - 1, d) : d > 0 && (valid(s, i + 1, j, d - 1) || valid(s, i, j - 1, d - 1)));\\n    }\\n};\\n```\\n**Cozy**\\n```\\nclass Solution {\\npublic:\\n    bool validPalindrome(string s) {\\n        return valid(s, 0, s.length() - 1, 1);\\n    }\\n\\nprivate:\\n    bool valid(string& s, int i, int j, int d) { // d: num of chars you can delete at most\\n        if (i >= j) return true;\\n        if (s[i] == s[j])\\n            return valid(s, i + 1, j - 1, d);\\n        else\\n            return d > 0 && (valid(s, i + 1, j, d - 1) || valid(s, i, j - 1, d - 1));\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"107731",
			"view":"1579",
			"top":"5",
			"title":"Simple python solution",
			"vote":"3",
			"content":"Whenever there is a mismatch when checking for palindrome, we try deleting either one of the two characters involved in the mismatch and see if isPalindrome succeeds. To make sure, we don\\u2019t delete more than 1 character, we also maintain the delCount.\\n\\n```\\n    def isPalindrome(self, s, start, end, delCount):\\n        if delCount > 1:\\n            return False\\n        while start < end:\\n            if s[start] != s[end]:\\n                break\\n            start += 1\\n            end -= 1\\n        if (start == end) or (start == end+1):\\n            return True\\n        return any([self.isPalindrome(s, start+1, end, delCount+1), self.isPalindrome(s, start, end-1, delCount+1)])\\n\\n    def validPalindrome(self, s):\\n        return self.isPalindrome(s, 0, len(s)-1, 0)\\n```"
		},
		{
			"lc_ans_id":"107767",
			"view":"613",
			"top":"6",
			"title":"Two solutions (optimized and recursive) Java and C#",
			"vote":"2",
			"content":"Java:\\n\\nOptimized (Accepted):\\n```\\npublic boolean validPalindrome(String s)\\n{\\n    int left = 0, right = s.length() - 1;\\n\\n    while (left < right)\\n    {\\n        if (s.charAt(left) == s.charAt(right))\\n        {\\n            left++; right--;\\n        }\\n        else\\n        {\\n            //remove right\\n            int templeft = left, tempright = right - 1;\\n\\n            while (templeft < tempright)\\n            {\\n                if (s.charAt(templeft) != s.charAt(tempright)) break;\\n                templeft++; tempright--;\\n\\n                if (templeft >= tempright) return true;\\n            }\\n\\n            //remove left\\n            left++;\\n\\n            while (left < right)\\n            {\\n                if (s.charAt(left) != s.charAt(right)) return false;\\n                left++; right--;\\n            }\\n        }\\n    }\\n    return true;\\n}\\n```\\n\\nBrute Force (Recursive) (Time Limit Exceeded):\\n```\\npublic boolean validPalindrome(String s) \\n{\\n    return validPalindrome(s, 0, s.length() - 1, false);\\n}\\nprivate boolean validPalindrome(String s, int left, int right, Boolean mismatch)\\n{\\n    if (right - left <= 1) return true;\\n\\n    if (s.charAt(left) != s.charAt(right))\\n    {\\n        if (mismatch == true)\\n            return false;\\n\\n        return validPalindrome(s, left, right - 1, true) || validPalindrome(s, left + 1, right, true);\\n    }\\n    else\\n    {\\n        return validPalindrome(s, left + 1, right - 1, mismatch);\\n    }\\n}\\n```\\n\\n\\n\\nC#:\\n\\nOptimized (Accepted):\\n```\\npublic bool ValidPalindrome(string s)\\n{\\n    int left = 0, right = s.Length - 1;\\n\\n    while (left < right)\\n    {\\n        if (s[left] == s[right])\\n        {\\n            left++; right--;\\n        }\\n        else\\n        {\\n            //remove right\\n            int templeft = left, tempright = right - 1;\\n\\n            while (templeft < tempright)\\n            {\\n                if (s[templeft] != s[tempright]) break;\\n                templeft++; tempright--;\\n\\n                if (templeft >= tempright) return true;\\n            }\\n\\n            //remove left\\n            left++;\\n\\n            while (left < right)\\n            {\\n                if (s[left] != s[right]) return false;\\n                left++; right--;\\n            }\\n        }\\n    }\\n    return true;\\n}\\n```\\n\\n\\nBrute Force (Recursive) (Time Limit Exceeded):\\n```\\npublic bool ValidPalindrome(string s) //brute force\\n{\\n    return ValidPalindrome(s, 0, s.Length - 1, false);\\n}\\nprivate bool ValidPalindrome(string s, int left, int right, bool mismatch)\\n{\\n    if (right - left <= 1) return true;\\n\\n    if (s[left] != s[right])\\n    {\\n        if (mismatch == true)\\n            return false;\\n\\n        return ValidPalindrome(s, left, right - 1, true) || ValidPalindrome(s, left + 1, right, true);\\n    }\\n    else\\n    {\\n        return ValidPalindrome(s, left + 1, right - 1, mismatch);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107768",
			"view":"260",
			"top":"7",
			"title":"Consice Java Solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\n    public boolean validPalindrome(String s) {\\n        if (s == null || s.length() == 0) return true;\\n        int i = 0, j = s.length() - 1;\\n        while (i < j) {\\n            if (s.charAt(i) == s.charAt(j)) {\\n                i++;\\n                j--;\\n            }\\n            else {\\n                if (helper(s.substring(0, j) + (s.substring(j + 1))) || helper(s.substring(0, i) + (s.substring(i + 1)))) return true;\\n                else return false;\\n            }\\n        }\\n        return true;\\n    }\\n    private boolean helper(String s) {\\n        int l = 0, r = s.length() - 1;\\n        while (l < r) {\\n            if (s.charAt(l++) != s.charAt(r--)) return false;\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107730",
			"view":"222",
			"top":"8",
			"title":"My straightforward solution, very easy to understand",
			"vote":"1",
			"content":"```\\npublic bool ValidPalindrome(string s) {\\n    int i = 0, j = s.Length - 1;\\n    bool lbFirst = false;\\n\\n    while (i < j) {\\n        if (s[i] == s[j]) {\\n            ++i;\\n            --j;\\n        } else if (lbFirst)\\n            return false;\\n        else {\\n            if (j == i + 1)\\n                return true;\\n            else {\\n                lbFirst = true;\\n                if ( s[i+1] == s[j] && s[i+2] == s[j-1]) {\\n                    i += 2;\\n                    --j;\\n                } else if ( s[i] == s[j-1] && s[i+1] == s[j-2]) {\\n                    ++i;\\n                    j -= 2;\\n                } else {\\n                    return false;\\n                }\\n            }\\n        }\\n    }\\n\\n    return true;\\n}\\n```"
		},
		{
			"lc_ans_id":"107748",
			"view":"141",
			"top":"9",
			"title":"Java O(1) space easy solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\n    public boolean isPalindrome(String s,int start,int end){\\n        while(start<end){\\n            if(s.charAt(start++)!=s.charAt(end--))\\n                return false;\\n        }\\n        return true;\\n    }\\n    public boolean validPalindrome(String s) {\\n        int i=0,j=s.length()-1;\\n        while(i<j){\\n            if(s.charAt(i)!=s.charAt(j)){\\n                if(isPalindrome(s,i+1,j))\\n                    return true;\\n                \\n                if(isPalindrome(s,i,j-1))\\n                    return true;\\n                \\n                return false;\\n                }\\n            i++;j--;\\n        }\\n        return true;\\n    }\\n}\\n```"
		}
	],
	"id":"657",
	"title":"Valid Palindrome II",
	"content":"<p>\r\nGiven a non-empty string <code>s</code>, you may delete <b>at most</b> one character.  Judge whether you can make it a palindrome.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"aba\"\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"abca\"\r\n<b>Output:</b> True\r\n<b>Explanation:</b> You could delete the character 'c'.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The string will only contain lowercase characters a-z.\r\nThe maximum length of the string is 50000.</li>\r\n</ol>\r\n</p>",
	"frequency":"180",
	"ac_num":"19326"
}