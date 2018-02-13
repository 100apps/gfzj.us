{
	"difficulty":"3",
	"submit_num":"247649",
	"show_id":"115",
	"leetcode_id":"115",
	"answers":[
		{
			"lc_ans_id":"37327",
			"view":"24063",
			"top":"0",
			"title":"Easy to understand DP in Java",
			"vote":"227",
			"content":"The idea is the following:\\n\\n - we will build an array `mem` where `mem[i+1][j+1]` means that `S[0..j]` contains `T[0..i]` that many times as distinct subsequences. Therefor the result will be `mem[T.length()][S.length()]`.\\n - we can build this array rows-by-rows:\\n  - the first row must be filled with 1. That's because the empty string is a subsequence of any string but only 1 time. So `mem[0][j] = 1` for every `j`. So with this we not only make our lives easier, but we also return correct value if `T` is an empty string.\\n  - the first column of every rows except the first must be 0. This is because an empty string cannot contain a non-empty string as a substring -- the very first item of the array: `mem[0][0] = 1`, because an empty string contains the empty string 1 time.\\n\\nSo the matrix looks like this:\\n\\n      S 0123....j\\n    T +----------+\\n      |1111111111|\\n    0 |0         |\\n    1 |0         |\\n    2 |0         |\\n    . |0         |\\n    . |0         |\\n    i |0         |\\n\\nFrom here we can easily fill the whole grid: for each `(x, y)`, we check if `S[x] == T[y]` we add the previous item and the previous item in the previous row, otherwise we copy the previous item in the same row. The reason is simple:\\n\\n - if the current character in S doesn't equal to current character T, then we have the same number of distinct subsequences as we had without the new character.\\n - if the current character in S equal to the current character T, then the distinct number of subsequences: the number we had before **plus** the distinct number of subsequences we had with less longer T and less longer S.\\n\\nAn example:\\n`S: [acdabefbc]` and `T: [ab]`\\n\\nfirst we check with `a`:\\n\\n               *  *\\n          S = [acdabefbc]\\n    mem[1] = [0111222222]\\n\\nthen we check with `ab`:\\n\\n                   *  * ]\\n          S = [acdabefbc]\\n    mem[1] = [0111222222]\\n    mem[2] = [0000022244]\\n\\nAnd the result is 4, as the distinct subsequences are:\\n\\n          S = [a   b    ]\\n          S = [a      b ]\\n          S = [   ab    ]\\n          S = [   a   b ]\\n\\nSee the code in Java:\\n\\n    public int numDistinct(String S, String T) {\\n        // array creation\\n        int[][] mem = new int[T.length()+1][S.length()+1];\\n\\n        // filling the first row: with 1s\\n        for(int j=0; j<=S.length(); j++) {\\n            mem[0][j] = 1;\\n        }\\n        \\n        // the first column is 0 by default in every other rows but the first, which we need.\\n        \\n        for(int i=0; i<T.length(); i++) {\\n            for(int j=0; j<S.length(); j++) {\\n                if(T.charAt(i) == S.charAt(j)) {\\n                    mem[i+1][j+1] = mem[i][j] + mem[i+1][j];\\n                } else {\\n                    mem[i+1][j+1] = mem[i+1][j];\\n                }\\n            }\\n        }\\n        \\n        return mem[T.length()][S.length()];\\n    }"
		},
		{
			"lc_ans_id":"37412",
			"view":"15200",
			"top":"1",
			"title":"Any better solution that takes less than O(n^2) space while in O(n^2) time?",
			"vote":"92",
			"content":"My solution is using O(n^2) space and running in O(n^2) time. I wonder is there a better way to do that which consumes less memory? I guess run time could not be improved though. Any thought/input would be highly appreciated, thanks!\\n\\n    /**\\n     * Solution (DP):\\n     * We keep a m*n matrix and scanning through string S, while\\n     * m = T.length() + 1 and n = S.length() + 1\\n     * and each cell in matrix Path[i][j] means the number of distinct subsequences of \\n     * T.substr(1...i) in S(1...j)\\n     * \\n     * Path[i][j] = Path[i][j-1]            (discard S[j])\\n     *              +     Path[i-1][j-1]    (S[j] == T[i] and we are going to use S[j])\\n     *                 or 0                 (S[j] != T[i] so we could not use S[j])\\n     * while Path[0][j] = 1 and Path[i][0] = 0.\\n     */\\n    int numDistinct(string S, string T) {\\n        int m = T.length();\\n        int n = S.length();\\n        if (m > n) return 0;    // impossible for subsequence\\n        vector<vector<int>> path(m+1, vector<int>(n+1, 0));\\n        for (int k = 0; k <= n; k++) path[0][k] = 1;    // initialization\\n        \\n        for (int j = 1; j <= n; j++) {\\n            for (int i = 1; i <= m; i++) {\\n                path[i][j] = path[i][j-1] + (T[i-1] == S[j-1] ? path[i-1][j-1] : 0);\\n            }\\n        }\\n        \\n        return path[m][n];\\n    }"
		},
		{
			"lc_ans_id":"37354",
			"view":"9015",
			"top":"2",
			"title":"Task clarification",
			"vote":"75",
			"content":"Could someone please clarify this problem to me?\\n\\n>  Given a string S and a string T, count the number of distinct\\n> subsequences of T in S.\\n> \\n> A subsequence of a string is a new string which is formed from the\\n> original string by deleting some (can be none) of the characters\\n> without disturbing the relative positions of the remaining characters.\\n> (ie, \"ACE\" is a subsequence of \"ABCDE\" while \"AEC\" is not).\\n> \\n> Here is an example: S = \"rabbbit\", T = \"rabbit\"  count = 3\\n\\nIf I understood correctly, we need to find all distinct subsequences of T and see how many, if any appear in s. How does that equal to 3 in the given example?"
		},
		{
			"lc_ans_id":"37332",
			"view":"4338",
			"top":"3",
			"title":"The question should be reworded.",
			"vote":"61",
			"content":"Given a string S and a string T, count the number of distinct subsequences of T in S.\\n\\n*should be reworded to* \\n\\nGiven a string S and a string T, count the number of distinct **subsequences of S which equals T**.\\n\\n*or*\\n\\nGiven a string S and a string T, count the number of distinct **sequences of T** in S.\\n\\n\\nIn the original description, *subsequences of T* could be any subsequences which are not necessary to be equal to T.\\n\\n@administrators Can you please improve the description?"
		},
		{
			"lc_ans_id":"37316",
			"view":"5956",
			"top":"4",
			"title":"7-10 lines C++ Solutions with Detailed Explanations (O(m*n) time and O(m) space)",
			"vote":"52",
			"content":"Well, a dynamic programming problem. Let's first define its state `dp[i][j]` to be the number of distinct subsequences of `t[0..i - 1]` in `s[0..j - 1]`. Then we have the following state equations:\\n\\n 1. General case 1: `dp[i][j] = dp[i][j - 1]` if `t[i - 1] != s[j - 1]`;\\n 2. General case 2: `dp[i][j] = dp[i][j - 1] + dp[i - 1][j - 1]` if `t[i - 1] == s[j - 1]`;\\n 3. Boundary case 1: `dp[0][j] = 1` for all `j`;\\n 4. Boundary case 2: `dp[i][0] = 0` for all **positive** `i`.\\n\\nNow let's give brief explanations to the four equations above.\\n\\n 1. If `t[i - 1] != s[j - 1]`, the distinct subsequences will not include `s[j - 1]` and thus all the number of distinct subsequences will simply be those in `s[0..j - 2]`, which corresponds to `dp[i][j - 1]`;\\n 2. If `t[i - 1] == s[j - 1]`, the number of distinct subsequences include two parts: those with `s[j - 1]` and those without;\\n 3. An empty string will have exactly one subsequence in any string :-)\\n 4. Non-empty string will have no subsequences in an empty string.\\n\\nPutting these together, we will have the following simple codes (just like translation :-)):\\n\\n    class Solution {\\n    public:\\n        int numDistinct(string s, string t) {\\n            int m = t.length(), n = s.length();\\n            vector<vector<int>> dp(m + 1, vector<int> (n + 1, 0));\\n            for (int j = 0; j <= n; j++) dp[0][j] = 1;\\n            for (int j = 1; j <= n; j++)\\n                for (int i = 1; i <= m; i++)\\n                    dp[i][j] = dp[i][j - 1] + (t[i - 1] == s[j - 1] ? dp[i - 1][j - 1] : 0);\\n            return dp[m][n];\\n        }\\n    };  \\n\\nNotice that we keep the whole `m*n` matrix simply for `dp[i - 1][j - 1]`. So we can simply store that value in a single variable and further optimize the space complexity. The final code is as follows.\\n\\n    class Solution {\\n    public:\\n        int numDistinct(string s, string t) {\\n            int m = t.length(), n = s.length();\\n            vector<int> cur(m + 1, 0);\\n            cur[0] = 1;\\n            for (int j = 1; j <= n; j++) { \\n                int pre = 1;\\n                for (int i = 1; i <= m; i++) {\\n                    int temp = cur[i];\\n                    cur[i] = cur[i] + (t[i - 1] == s[j - 1] ? pre : 0);\\n                    pre = temp;\\n                }\\n            }\\n            return cur[m];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"37390",
			"view":"2045",
			"top":"5",
			"title":"What is the problem actually asking for?  The description is exceptionally unclear.",
			"vote":"49",
			"content":"In the example, S=\"rabbbit\" and T=\"rabbit\". The description says you're supposed to return 3 for that, but don't indicate what the three distinct subsequences are.\\n\\nBy their definition of subsequence, it seems like the answer should be much larger, as T has the following subsequences, all of which are in T:\\n\\n\"r\" \"ra\" \"rab\" \"rabb\" \"a\" \"ab\" \"abb\" \"b\" \"bb\" \"bbi\" \"bbit\" \"bi\" \"bit\" \"i\" \"it\" \"t\"\\n\\nAnd I'm not even sure that list is complete. But, it's way more than 3. They must be using a very particular definition of 'distinct', as all of those subsequences look distinct to me.\\n\\nCan we get a clarification?  For example, how was '3' derived for the example?"
		},
		{
			"lc_ans_id":"37387",
			"view":"5205",
			"top":"6",
			"title":"A DP solution with clarification and explanation",
			"vote":"46",
			"content":"First of all, a bit clarification about the problem.  The problem statement can be rephrased as \\n\\n**Given two sequences S, T,  how many unique ways in sequence S, to form a subsequence that is identical to the sequence T.** \\n\\n    e.g. \\n    \\tS = \"rabbbit\", T = \"rabbit\"\\n     \\n        The number is 3. And the formations as follows: \\n         \\n        S1= \"ra_bbit\" S2= \"rab_bit\" S3=\"rabb_it\"                            \\n\\n        \"_\" marks the removed character. \\n\\n**As a typical way to implement a dynamic programming algorithm, we construct a matrix dp, where each cell `dp[i][j]` represents the number of solutions of aligning substring T[0..i] with S[0..j];** \\n\\nRule 1).  `dp[0][j] = 1`, since aligning T = \"\" with any substring of S would have only ONE solution which is to delete all characters in S.  \\n\\nRule 2).  when i > 0,  dp[i][j] can be derived by two cases: \\n\\n  case 1). if T[i] != S[j], then the solution would be to ignore the character S[j] and align substring T[0..i] with S[0..(j-1)]. Therefore, `dp[i][j] = dp[i][j-1].`\\n\\n  case 2). if T[i] == S[j], then first we could adopt the solution in case 1), but also we could match the characters T[i] and S[j] and align the rest of them (i.e. T[0..(i-1)] and S[0..(j-1)]. As a result, `dp[i][j] = dp[i][j-1] + d[i-1][j-1]`\\n\\ne.g.     T = B, S = ABC\\n\\ndp[1][2]=1:  Align T'=B and S'=AB, only one solution, which is to remove character A in S'.     \\n\\n\\n\\tpublic int numDistinct(String S, String T) {\\n\\t\\tint sl = S.length();\\n\\t\\tint tl = T.length();\\n\\t\\t\\n\\t\\tint [][] dp = new int[tl+1][sl+1];\\n    \\n\\t\\tfor(int i=0; i<=sl; ++i){\\n\\t\\t\\tdp[0][i] = 1;\\n\\t\\t}\\n\\t\\t\\n\\t\\tfor(int t=1; t<=tl; ++t){\\n\\t\\t\\t\\n\\t\\t\\tfor(int s=1; s<=sl; ++s){\\n\\t\\t\\t\\tif(T.charAt(t-1) != S.charAt(s-1)){\\n\\t\\t\\t\\t\\tdp[t][s] = dp[t][s-1];\\n\\t\\t\\t\\t}else{\\n\\t\\t\\t\\t\\tdp[t][s] = dp[t][s-1] + dp[t-1][s-1];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\t\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn dp[tl][sl];\\n\\t}\\n  \\n\\n\\nAs one can observe from the algorithm, in the inner loop, we only refer to the values in the previous iteration, i.e. the values in the previous row of the dp matrix. Therefore, to optimize the algorithm, we could reduce the space by keeping only two arrays, instead of the entire matrix. The algorithm can be optimized as follows. The running time is then reduced from 448ms to 424 ms. \\n\\n\\tpublic int numDistinct_sdp(String S, String T) {\\n\\t\\tint sl = S.length();\\n\\t\\tint tl = T.length();\\n\\t\\t\\n\\t\\tint [] preComb = new int[sl+1];\\n\\t\\tint [] comb = new int[sl+1];\\n\\t\\t\\n\\t\\t\\n\\t\\tfor(int i=0; i<=sl; i++)\\n\\t\\t\\tpreComb[i] = 1;\\t\\t\\n\\t\\n\\t\\tfor(int t=1; t<=tl; ++t){\\n\\t\\t\\tfor(int s=1; s<=sl; ++s){\\n\\t\\t\\t\\tif(T.charAt(t-1) != S.charAt(s-1)){\\n\\t\\t\\t\\t\\tcomb[s] = comb[s-1];\\n\\t\\t\\t\\t}else{\\n\\t\\t\\t\\t\\tcomb[s] = comb[s-1] + preComb[s-1];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\t\\n\\t\\t\\tfor(int i=0; i<=sl; ++i){\\n\\t\\t\\t\\tpreComb[i] = comb[i];\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn preComb[sl];\\n\\t}"
		},
		{
			"lc_ans_id":"37388",
			"view":"2540",
			"top":"7",
			"title":"4ms, 7 lines, c++ dp solution! very clear, almost best!",
			"vote":"30",
			"content":"prefixVec stores the numbers of t's prefixes occur when we iterate through s. the dp equation is when we encounter a character which also occurs in t at position i, then prefixVec[i] += prefixVec[i-1] (i > 0), prefixVec[i]++ (i = 0). we calculate prefixVec backwards so the new value produced won't influence the calculation of next value (at i-1), otherwise we need a temp vector.\\n   \\n    int numDistinct(string s, string t) {\\n        int tLen = t.size();\\n        vector<int> prefixVec(tLen,0);\\n        for (auto c: s)\\n            for (int i = tLen-1;i >= 0;--i)\\n                if (t[i] == c)\\n                    prefixVec[i] = (i > 0 ? prefixVec[i-1] : 1) + prefixVec[i];\\n        return prefixVec.back();\\n    }\\n\\n    /*\\n    example showing how prefixVec is calculated when we eat a new char\\n    rabbbit rabbit\\n    \\n    rabbit \\n    000000\\n    100000 r\\n    110000 a\\n    111000 b\\n    112100 b\\n    113300 b\\n    113330 i\\n    113333 t\\n    */"
		},
		{
			"lc_ans_id":"37440",
			"view":"1499",
			"top":"8",
			"title":"Ambiguity in problem statement",
			"vote":"21",
			"content":"Shouldn't the problem statement be:\\n\"Given a string S and a string T, count the number of sub-sequences of string S,that form string T??"
		},
		{
			"lc_ans_id":"37376",
			"view":"770",
			"top":"9",
			"title":"It is a really bad description",
			"vote":"11",
			"content":"It should be something like \"how many different ways we can get the subsequence of S to become T\"."
		}
	],
	"id":"115",
	"title":"Distinct Subsequences",
	"content":"<p>\r\nGiven a string <b>S</b> and a string <b>T</b>, count the number of distinct subsequences of <b>S</b> which equals <b>T</b>.\r\n</p>\r\n\r\n<p>\r\nA subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, <code>\"ACE\"</code> is a subsequence of <code>\"ABCDE\"</code> while <code>\"AEC\"</code> is not).\r\n</p>\r\n\r\n<p>\r\nHere is an example:<br />\r\n<b>S</b> = <code>\"rabbbit\"</code>, <b>T</b> = <code>\"rabbit\"</code>\r\n</p>\r\n<p>\r\nReturn <code>3</code>.\r\n</p>",
	"frequency":"453",
	"ac_num":"79410"
}