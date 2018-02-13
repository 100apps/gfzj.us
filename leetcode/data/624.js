{
	"difficulty":"2",
	"submit_num":"52427",
	"show_id":"647",
	"leetcode_id":"647",
	"answers":[
		{
			"lc_ans_id":"105689",
			"view":"18785",
			"top":"0",
			"title":"Java solution, 8 lines, extendPalindrome",
			"vote":"57",
			"content":"Idea is start from each index and try to extend palindrome for both odd and even length.\\n\\n```\\npublic class Solution {\\n    int count = 0;\\n    \\n    public int countSubstrings(String s) {\\n        if (s == null || s.length() == 0) return 0;\\n        \\n        for (int i = 0; i < s.length(); i++) { // i is the mid point\\n            extendPalindrome(s, i, i); // odd length;\\n            extendPalindrome(s, i, i + 1); // even length\\n        }\\n        \\n        return count;\\n    }\\n    \\n    private void extendPalindrome(String s, int left, int right) {\\n        while (left >=0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\\n            count++; left--; right++;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105688",
			"view":"8347",
			"top":"1",
			"title":"Very Simple Java Solution with Detail Explanation",
			"vote":"24",
			"content":"A very easy explanation with an example\\nLets take a string \"aabaa\"\\n\\n**Step 1:** Start a for loop to point at every single character from where we will trace the palindrome string.\\ncheckPalindrome(s,i,i);   //To check the palindrome of odd length palindromic sub-string\\ncheckPalindrome(s,i,i+1);    //To check the palindrome of even length palindromic sub-string\\n\\n**Step 2:** From each character of the string, we will keep checking if the sub-string is a palindrome and increment the palindrome count. To check the palindrome, keep checking the left and right of the character if it is same or not.\\n\\n**First Loop:**\\n![0_1500788783696_300147d3-e98e-4977-83f1-9eb8213a485e-image.png](/assets/uploads/files/1500788789821-300147d3-e98e-4977-83f1-9eb8213a485e-image.png) \\nPalindrome: a  (Count=1)\\n![0_1500788808121_fec1dec5-ab5f-44cf-8dbd-eb2780e8d65f-image.png](/assets/uploads/files/1500788808273-fec1dec5-ab5f-44cf-8dbd-eb2780e8d65f-image.png) \\nPalindrome: aa  (Count=2)\\n\\n**Second Loop:**\\n![0_1500788845582_881440b8-6dde-4b6f-a864-24fef277069b-image.png](/assets/uploads/files/1500788845825-881440b8-6dde-4b6f-a864-24fef277069b-image.png) \\nPalindrome: a   (Count=3)\\n![0_1500788872920_61fc20cb-0cb2-4179-8f5a-529cbad7a2ec-image.png](/assets/uploads/files/1500788872992-61fc20cb-0cb2-4179-8f5a-529cbad7a2ec-image.png) \\nPalindrome: No Palindrome\\n\\n**Third Loop:**\\n![0_1500788901120_bf12b13b-ff32-4703-86cf-0bcb54465428-image.png](/assets/uploads/files/1500788901208-bf12b13b-ff32-4703-86cf-0bcb54465428-image.png) \\nPalindrome: b,aba,aabaa   (Count=6)\\n![0_1500788934388_5cc2c31d-404c-456a-a77d-1432bb0c679b-image.png](/assets/uploads/files/1500788934464-5cc2c31d-404c-456a-a77d-1432bb0c679b-image.png) \\nPalindrome: No Palindrome\\n\\n**Forth Loop:**\\n![0_1500788981884_a2d3f30e-0745-4a75-b2c0-940834bd6a84-image.png](/assets/uploads/files/1500788981974-a2d3f30e-0745-4a75-b2c0-940834bd6a84-image.png) \\nPalindrome: a   (Count=7)\\n![0_1500789009429_f38aa5c2-17ac-47db-8fe9-b9bb4ceb1407-image.png](/assets/uploads/files/1500789009507-f38aa5c2-17ac-47db-8fe9-b9bb4ceb1407-image.png) \\nPalindrome: aa   (Count=8)\\n\\nCount = 9 (For the last character)\\n\\n**Answer = 9** \\n\\n'''\\n\\n \\n    int count =1;\\n    public int countSubstrings(String s) {\\n        if(s.length()==0) \\n            return 0;\\n        for(int i=0; i<s.length()-1; i++){\\n            checkPalindrome(s,i,i);     //To check the palindrome of odd length palindromic sub-string\\n            checkPalindrome(s,i,i+1);   //To check the palindrome of even length palindromic sub-string\\n        }\\n        return count;\\n    }    \\n\\n    private void checkPalindrome(String s, int i, int j) {\\n        while(i>=0 && j<s.length() && s.charAt(i)==s.charAt(j)){    //Check for the palindrome string \\n            count++;    //Increment the count if palindromin substring found\\n            i--;    //To trace string in left direction\\n            j++;    //To trace string in right direction\\n        }\\n    }\\n\\n\\n'''"
		},
		{
			"lc_ans_id":"105687",
			"view":"8749",
			"top":"2",
			"title":"Python, Straightforward with Explanation (Bonus O(N) solution)",
			"vote":"20",
			"content":"We perform a \"center expansion\" among all possible centers of the palindrome.\\n\\nLet ```N = len(S)```.  There are ```2N-1``` possible centers for the palindrome: we could have a center at ```S[0]```, between ```S[0]``` and ```S[1]```, at ```S[1]```, between ```S[1]``` and ```S[2]```, at ```S[2]```, etc.\\n\\nTo iterate over each of the ```2N-1``` centers, we will move the left pointer every 2 times, and the right pointer every 2 times starting with the second (index 1).  Hence, ```left = center / 2, right = center / 2 + center % 2```.\\n\\nFrom here, finding every palindrome starting with that center is straightforward: while the ends are valid and have equal characters, record the answer and expand.\\n\\n```\\ndef countSubstrings(self, S):\\n    N = len(S)\\n    ans = 0\\n    for center in xrange(2*N - 1):\\n        left = center / 2\\n        right = left + center % 2\\n        while left >= 0 and right < N and S[left] == S[right]:\\n            ans += 1\\n            left -= 1\\n            right += 1\\n    return ans\\n```\\n\\n<hr>\\n\\nBonus: Implementing Manacher's algorithm can give a linear time solution with one additional line.  I invite the reader to Google \"Manacher's Algorithm\" if interested in the explanation.\\n```\\ndef countSubstrings(self, S):\\n    def manachers(S):\\n        A = '@#' + '#'.join(S) + '#$'\\n        Z = [0] * len(A)\\n        center = right = 0\\n        for i in xrange(1, len(A) - 1):\\n            if i < right:\\n                Z[i] = min(right - i, Z[2 * center - i])\\n            while A[i + Z[i] + 1] == A[i - Z[i] - 1]:\\n                Z[i] += 1\\n            if i + Z[i] > right:\\n                center, right = i, i + Z[i]\\n        return Z\\n\\n    return sum((v+1)/2 for v in manachers(S))\\n```"
		},
		{
			"lc_ans_id":"105707",
			"view":"6028",
			"top":"3",
			"title":"Java DP solution based on longest palindromic substring",
			"vote":"20",
			"content":"This solution is almost same as the DP solution for longest palindromic substring, instead of storing the longest, just get the count of palindromic substrings.\\n\\n```\\npublic int countSubstrings(String s) {\\n    int n = s.length();\\n    int res = 0;\\n    boolean[][] dp = new boolean[n][n];\\n    for (int i = n - 1; i >= 0; i--) {\\n        for (int j = i; j < n; j++) {\\n            dp[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 3 || dp[i + 1][j - 1]);\\n            if(dp[i][j]) ++res;\\n        }\\n    }\\n    return res;\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"105691",
			"view":"6032",
			"top":"4",
			"title":"[Java/C++] 6 lines solution - NO DP",
			"vote":"18",
			"content":"The idea is count the number of different palindromic substrings from their respective middle. \\n\\nIn the following code, when we consider the substring ```s[i-j, ..., i+j]```, ```i``` is the middle index of the substring; When we consider the substring ```s[i-1-j, ..., i+j]```, ```(i-1, i)``` is the middle index of the substring.\\n\\nC++ version:\\n\\n```\\n    int countSubstrings(string s) {\\n        int res = 0, n = s.length();\\n        for(int i = 0; i < n; i++){\\n            for(int j = 0; i-j >= 0 && i+j < n && s[i-j] == s[i+j]; j++)res++; //substring s[i-j, ..., i+j]\\n            for(int j = 0; i-1-j >= 0 && i+j < n && s[i-1-j] == s[i+j]; j++)res++; //substring s[i-1-j, ..., i+j]\\n        }\\n        return res;\\n    }\\n\\n```\\nJava version:\\n```\\n    public int countSubstrings(String s) {\\n        int res = 0, n = s.length();\\n        for(int i = 0; i<n ;i++ ){\\n            for(int j = 0; i-j >= 0 && i+j < n && s.charAt(i-j) == s.charAt(i+j); j++)res++; //substring s[i-j, ..., i+j]\\n            for(int j = 0; i-1-j >= 0 && i+j < n && s.charAt(i-1-j) == s.charAt(i+j); j++)res++; //substring s[i-1-j, ..., i+j]\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"105739",
			"view":"1031",
			"top":"5",
			"title":"Java O(n^2) time O(1) space solution with comments.",
			"vote":"5",
			"content":"```\\npublic int countSubstrings(String s) {\\n    int sum = 0;\\n    // Loop across different middle points.\\n    for (int i = 0; i < s.length(); i++) {\\n      // Find all odd length palindrome with i as middle point.\\n      sum += findPalindromic(s, i, i);\\n      // Find all even length palindrome with i and i+1 as middle point.\\n      sum += findPalindromic(s, i, i + 1);\\n    }\\n    return sum;\\n  }\\n\\n  // Expend from the current mid point to all of its low and high positions.\\n  private int findPalindromic(String s, int left, int right) {\\n    int count = 0;\\n    // Increase count if the substring is a validate palindrome.\\n    while (left >= 0 && right < s.length() && s.charAt(left--) == s.charAt(right++))\\n      count++;\\n    return count;\\n  }\\n```"
		},
		{
			"lc_ans_id":"105750",
			"view":"453",
			"top":"6",
			"title":"Python solution",
			"vote":"5",
			"content":"```\\nclass Solution(object):\\n    def countSubstrings(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n        res = 0\\n        for i in range(len(s)):\\n            for j in range(i, len(s)):\\n                if s[i:j+1] == s[i:j+1][::-1]:\\n                    res += 1\\n        return res\\n```"
		},
		{
			"lc_ans_id":"105749",
			"view":"554",
			"top":"7",
			"title":"Java O(n^2) DP solution",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public int countSubstrings(String s) {\\n        \\n        int sLen = s.length();\\n        char[] cArr = s.toCharArray();\\n        \\n        int totalPallindromes = 0;\\n        \\n        boolean[][] dp = new boolean[sLen][sLen];\\n        \\n        // Single length pallindroms\\n        for (int i = 0; i < sLen; i++) {\\n            dp[i][i] = true;\\n            totalPallindromes++;\\n        }\\n        \\n        // 2 length pallindromes\\n        for (int i = 0; i < sLen - 1; i++) {\\n            if (cArr[i] == cArr[i + 1]) {\\n                dp[i][i + 1] = true;\\n                totalPallindromes++;\\n            }\\n        }\\n\\n        // Lengths > 3\\n        \\n        for (int subLen = 2; subLen < sLen; subLen++) {\\n            \\n            for (int i = 0; i < sLen - subLen; i++) {\\n                \\n                int j = i + subLen;\\n                \\n                if (dp[i + 1][j - 1] && cArr[i] == cArr[j]) {\\n                    dp[i][j] = true;\\n                    totalPallindromes++;\\n                }\\n            }\\n        }        \\n        return totalPallindromes;\\n        \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105694",
			"view":"870",
			"top":"8",
			"title":"Oneliner Python",
			"vote":"2",
			"content":"    def countSubstrings(self, s):\\n        return sum(s[i:j] == s[i:j][::-1] for j in range(len(s) + 1) for i in range(j))"
		},
		{
			"lc_ans_id":"105698",
			"view":"165",
			"top":"9",
			"title":"5 lines C++ solution that beats 80%+",
			"vote":"1",
			"content":"\\n```cpp\\nint countSubstrings(string s) {\\n    int num = s.size();\\n    for(float center = 0.5; center < s.size(); center += 0.5) {\\n        int left = int(center - 0.5), right = int(center + 1);\\n        while(left >= 0 && right < s.size() && s[left--] == s[right++]) ++num;\\n    }\\n    return num;\\n}   \\n```"
		}
	],
	"id":"624",
	"title":"Palindromic Substrings",
	"content":"<p>\r\nGiven a string, your task is to count how many palindromic substrings in this string.\r\n</p>\r\n\r\n<p>\r\nThe substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters. \r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"abc\"\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> Three palindromic strings: \"a\", \"b\", \"c\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"aaa\"\r\n<b>Output:</b> 6\r\n<b>Explanation:</b> Six palindromic strings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The input string length won't exceed 1000.</li>\r\n</ol>\r\n</p>",
	"frequency":"384",
	"ac_num":"29071"
}