{
	"difficulty":"3",
	"submit_num":"239841",
	"show_id":"87",
	"leetcode_id":"87",
	"answers":[
		{
			"lc_ans_id":"29392",
			"view":"18828",
			"top":"0",
			"title":"Share my 4ms c++ recursive solution",
			"vote":"99",
			"content":"Assume the strings are all lower case letters\\n\\n    class Solution {\\n    public:\\n        bool isScramble(string s1, string s2) {\\n            if(s1==s2)\\n                return true;\\n                \\n            int len = s1.length();\\n            int count[26] = {0};\\n            for(int i=0; i<len; i++)\\n            {\\n                count[s1[i]-'a']++;\\n                count[s2[i]-'a']--;\\n            }\\n            \\n            for(int i=0; i<26; i++)\\n            {\\n                if(count[i]!=0)\\n                    return false;\\n            }\\n            \\n            for(int i=1; i<=len-1; i++)\\n            {\\n                if( isScramble(s1.substr(0,i), s2.substr(0,i)) && isScramble(s1.substr(i), s2.substr(i)))\\n                    return true;\\n                if( isScramble(s1.substr(0,i), s2.substr(len-i)) && isScramble(s1.substr(i), s2.substr(0,len-i)))\\n                    return true;\\n            }\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29387",
			"view":"15297",
			"top":"1",
			"title":"Accepted Java solution",
			"vote":"75",
			"content":"    public class Solution {\\n        public boolean isScramble(String s1, String s2) {\\n            if (s1.equals(s2)) return true; \\n            \\n            int[] letters = new int[26];\\n            for (int i=0; i<s1.length(); i++) {\\n                letters[s1.charAt(i)-'a']++;\\n                letters[s2.charAt(i)-'a']--;\\n            }\\n            for (int i=0; i<26; i++) if (letters[i]!=0) return false;\\n        \\n            for (int i=1; i<s1.length(); i++) {\\n                if (isScramble(s1.substring(0,i), s2.substring(0,i)) \\n                 && isScramble(s1.substring(i), s2.substring(i))) return true;\\n                if (isScramble(s1.substring(0,i), s2.substring(s2.length()-i)) \\n                 && isScramble(s1.substring(i), s2.substring(0,s2.length()-i))) return true;\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"29394",
			"view":"11053",
			"top":"2",
			"title":"My C++ solutions (recursion with cache , DP, recursion with cache and pruning) with explanation (4ms)",
			"vote":"62",
			"content":"The basic idea is to divide s1(s2) into two substrings with length k and len-k and check if the two substrings s1[0..k-1] and s1[k, len-1] are the scrambles of s2[0..k-1] and s2[k,len-1] or s2[len-k, len-1] and s2[0..len-k-1] via recursion. The straigtforward recursion will be very slow due to many repeated recursive function calls. To speed up the recursion, we can use an unordered_map isScramblePair to save intermediate results. The key used here is s1+s2, but other keys are also possible (e.g. using indices)\\n\\n        class Solution {\\n            bool DP_helper(unordered_map<string, bool> &isScramblePair, string s1, string s2)\\n            {\\n                int i,len = s1.size();\\n                bool res = false;\\n                if(0==len) return true;\\n                else if(1==len) return s1 == s2;\\n                else\\n                {\\n                    if(isScramblePair.count(s1+s2)) return isScramblePair[s1+s2]; // checked before, return intermediate result directly\\n                    if(s1==s2) res=true;\\n                    else{\\n                        for(i=1; i<len && !res; ++i)\\n                        {\\n    //check s1[0..i-1] with s2[0..i-1] and s1[i..len-1] and s2[i..len-1]\\n                            res = res || (DP_helper(isScramblePair, s1.substr(0,i), s2.substr(0,i)) && DP_helper(isScramblePair, s1.substr(i,len-i), s2.substr(i,len-i)));\\n     //if no match, then check s1[0..i-1] with s2[len-k.. len-1] and s1[i..len-1] and s2[0..len-i]\\n                           res = res || (DP_helper(isScramblePair, s1.substr(0,i), s2.substr(len-i,i)) && DP_helper(isScramblePair, s1.substr(i,len-i), s2.substr(0,len-i)));\\n                        }\\n                    }\\n                    return isScramblePair[s1+s2]= res; //save the intermediate results\\n                    \\n                }\\n            }\\n        public:\\n            bool isScramble(string s1, string s2) {\\n               unordered_map<string, bool> isScramblePair;\\n               return DP_helper(isScramblePair, s1, s2);\\n            }\\n        };\\n\\nThe recursive version has exponential complexity. To further improve the performance, we can use bottom-up DP, which is O(N^4) complexity. Here we build a table isS[len][i][j], which indicates whether s1[i..i+len-1] is a scramble of s2[j..j+len-1].\\n\\n    class Solution {\\n    public:\\n        bool isScramble(string s1, string s2) {\\n            int sSize = s1.size(), len, i, j, k;\\n            if(0==sSize) return true;\\n            if(1==sSize) return s1==s2;\\n            bool isS[sSize+1][sSize][sSize];\\n    \\n            for(i=0; i<sSize; ++i)\\n                for(j=0; j<sSize; ++j)\\n                    isS[1][i][j] = s1[i] == s2[j];\\n                    \\n            for(len=2; len <=sSize; ++len)\\n                for(i=0; i<=sSize-len; ++i)\\n                    for(j=0; j<=sSize-len; ++j)\\n                    {\\n                        isS[len][i][j] = false;\\n                            for(k=1; k<len && !isS[len][i][j]; ++k)\\n                            {\\n                                isS[len][i][j] = isS[len][i][j] || (isS[k][i][j] && isS[len-k][i+k][j+k]);\\n                                isS[len][i][j] = isS[len][i][j] || (isS[k][i+len-k][j] && isS[len-k][i][j+k]);\\n                            }\\n                    }\\n            return isS[sSize][0][0];            \\n    \\n        }\\n    }; \\n\\nFurhtermore, in many cases, we found we can terminate our recursion early by pruning: i.e. by first checking if s1 and s2 have the same character set before we do recursion: if not, just terminate without recursion.  This observation leads us to the following Recursion+cache+pruning version. Here the key of the cache changes to idx1*sSize +idx2 + len*sSize*sSize;\\n\\n    class Solution {\\n    private:\\n        bool DP_helper(string &s1, string &s2, int idx1, int idx2, int len, char isS[])\\n        {\\n            int sSize = s1.size(),i, j, k, hist[26] , zero_count =0;\\n            if(isS[(len*sSize+idx1)*sSize+idx2]) return isS[(len*sSize+idx1)*sSize+idx2]==1;\\n            bool res = false;\\n            \\n            fill_n(hist, 26, 0);\\n            for(k=0; k<len;++k)\\n            { // check if s1[idx1:idx1+len-1] and s2[idx2:idx2+len-1] have same characters\\n                zero_count +=  (0==hist[s1[idx1+k]-'a']) - (0== ++hist[s1[idx1+k]-'a']);\\n                zero_count +=  (0==hist[s2[idx2+k]-'a']) - (0== --hist[s2[idx2+k]-'a']);\\n            }\\n            if(zero_count) {isS[(len*sSize+idx1)*sSize+idx2] = 2; return false;} //if not, return directly\\n            if(len==1)     {isS[(len*sSize+idx1)*sSize+idx2] = 1; return true;}\\n            for(k=1;k<len && !res;++k) //otherwise, recursion with cache\\n            {\\n                res = res || (DP_helper(s1, s2, idx1, idx2, k, isS) && DP_helper(s1, s2, idx1+k, idx2+k, len-k, isS) );\\n                res = res || (DP_helper(s1, s2, idx1+len-k, idx2, k, isS) && DP_helper(s1, s2, idx1, idx2+k, len-k, isS) );\\n            }\\n            isS[(len*sSize+idx1)*sSize+idx2] = res?1:2;\\n            return res;\\n        }\\n    public:\\n        bool isScramble(string s1, string s2) {\\n            const int sSize = s1.size();\\n            if(0==sSize) return true;\\n            char isS[(sSize+1)*sSize*sSize];\\n            fill_n(isS, (sSize+1)*sSize*sSize, 0);\\n            return DP_helper(s1, s2, 0, 0, sSize, isS);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29455",
			"view":"8780",
			"top":"3",
			"title":"Can you partition a string at ANY index at ANY time in producing a scramble?",
			"vote":"34",
			"content":"The example shows the case where left child ALWAYS has equal or one-less characters than right child. But since \"abb\" is a scramble of \"bab\", as suggested by a test case, strings are not always partitioned in the way as the example implies.\\n\\nHowever, if the answer is Yes, I think scrambles just become permutations. Isn't it?\\n\\nSo I am so confused what is expected...\\n\\nThanks!"
		},
		{
			"lc_ans_id":"29396",
			"view":"4462",
			"top":"4",
			"title":"Simple iterative DP Java solution with explanation",
			"vote":"32",
			"content":"Explanation in code itself. The iterative version of the idea is considerably slower than the recursive simply because here we consider all possible states, while the recursive will only compute required states as it founds them. Time complexity of both is, in any case, the same.\\n    \\n    public class Solution {\\n    \\tpublic boolean isScramble(String s1, String s2) {\\n    \\t\\tif (s1.length() != s2.length()) return false;\\n    \\t\\tint len = s1.length();\\n    \\t\\t/**\\n    \\t\\t * Let F(i, j, k) = whether the substring S1[i..i + k - 1] is a scramble of S2[j..j + k - 1] or not\\n    \\t\\t * Since each of these substrings is a potential node in the tree, we need to check for all possible cuts.\\n    \\t\\t * Let q be the length of a cut (hence, q < k), then we are in the following situation:\\n    \\t\\t * \\n    \\t\\t * S1 [   x1    |         x2         ]\\n    \\t\\t *    i         i + q                i + k - 1\\n    \\t\\t * \\n    \\t\\t * here we have two possibilities:\\n    \\t\\t *      \\n    \\t\\t * S2 [   y1    |         y2         ]\\n    \\t\\t *    j         j + q                j + k - 1\\n    \\t\\t *    \\n    \\t\\t * or \\n    \\t\\t * \\n    \\t\\t * S2 [       y1        |     y2     ]\\n    \\t\\t *    j                 j + k - q    j + k - 1\\n    \\t\\t * \\n    \\t\\t * which in terms of F means:\\n    \\t\\t * \\n    \\t\\t * F(i, j, k) = for some 1 <= q < k we have:\\n    \\t\\t *  (F(i, j, q) AND F(i + q, j + q, k - q)) OR (F(i, j + k - q, q) AND F(i + q, j, k - q))\\n    \\t\\t *  \\n    \\t\\t * Base case is k = 1, where we simply need to check for S1[i] and S2[j] to be equal \\n    \\t\\t * */\\n    \\t\\tboolean [][][] F = new boolean[len][len][len + 1];\\n    \\t\\tfor (int k = 1; k <= len; ++k)\\n    \\t\\t\\tfor (int i = 0; i + k <= len; ++i)\\n    \\t\\t\\t\\tfor (int j = 0; j + k <= len; ++j)\\n    \\t\\t\\t\\t\\tif (k == 1)\\n    \\t\\t\\t\\t\\t\\tF[i][j][k] = s1.charAt(i) == s2.charAt(j);\\n    \\t\\t\\t\\t\\telse for (int q = 1; q < k && !F[i][j][k]; ++q) {\\n    \\t\\t\\t\\t\\t\\tF[i][j][k] = (F[i][j][q] && F[i + q][j + q][k - q]) || (F[i][j + k - q][q] && F[i + q][j][k - q]);\\n    \\t\\t\\t\\t\\t}\\n    \\t\\treturn F[0][0][len];\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"29459",
			"view":"1769",
			"top":"5",
			"title":"Python recursive solution",
			"vote":"19",
			"content":"    class Solution:\\n    # @return a boolean\\n    def isScramble(self, s1, s2):\\n        n, m = len(s1), len(s2)\\n        if n != m or sorted(s1) != sorted(s2):\\n            return False\\n        if n < 4 or s1 == s2:\\n            return True\\n        f = self.isScramble\\n        for i in range(1, n):\\n            if f(s1[:i], s2[:i]) and f(s1[i:], s2[i:]) or \\\\\\n               f(s1[:i], s2[-i:]) and f(s1[i:], s2[:-i]):\\n                return True\\n        return False"
		},
		{
			"lc_ans_id":"29445",
			"view":"13180",
			"top":"6",
			"title":"Any better solution?",
			"vote":"17",
			"content":"My AC code is as below. I think it's not very efficient. Is there any better solution?\\n\\n    class Solution {\\n    private:\\n    \\tbool anagram(string &s1, string &s2){\\n    \\t\\tif(s1.size() != s2.size()) return false;\\n    \\t\\tunordered_map<char, int> m;\\n    \\t\\tint n = s1.size();\\n    \\t\\tfor(int i = 0; i < n; ++i){\\n    \\t\\t\\tif(m.find(s1[i]) != m.end()){\\n    \\t\\t\\t\\t++m[s1[i]];\\n    \\t\\t\\t}else{\\n    \\t\\t\\t\\tm[s1[i]] = 1;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\tfor(int i = 0; i < n; ++i){\\n    \\t\\t\\tif(m.find(s2[i]) != m.end()){\\n    \\t\\t\\t\\t--m[s2[i]];\\n    \\t\\t\\t\\tif(m[s2[i]] < 0){\\n    \\t\\t\\t\\t\\treturn false;\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}else{\\n    \\t\\t\\t\\treturn false;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn true;\\n    \\t}\\n    public:\\n        bool isScramble(string s1, string s2) {\\n        \\tif(s1.size() != s2.size()) return false;\\n        \\tif(s1 == s2) return true;\\n        \\tint n = s1.size();\\n        \\tfor(int i = 1; i < n; ++i){\\n        \\t\\tstring s11 = s1.substr(0, i);\\n        \\t\\tstring s12 = s1.substr(i, n - i);\\n        \\t\\tstring s21 = s2.substr(0, i);\\n        \\t\\tstring s22 = s2.substr(i, n - i);\\n        \\t\\tstring s23 = s2.substr(n - i, i);\\n        \\t\\tstring s24 = s2.substr(0, n - i);\\n        \\t\\tif(anagram(s11, s21) && anagram(s12, s22) &&\\n        \\t\\t\\tisScramble(s11, s21) && isScramble(s12, s22)\\n        \\t\\t\\t||\\n        \\t\\t\\tanagram(s11, s23) && anagram(s12, s24) &&\\n        \\t\\t\\tisScramble(s11, s23) && isScramble(s12, s24)){\\n        \\t\\t\\treturn true;\\n        \\t\\t}\\n        \\t}\\n            return false;\\n        }\\n    };\\n\\nThe main idea is:\\n\\n1. separate `s1` into two parts, namely `--s11--`, `--------s12--------`\\n2. separate `s2` into two parts, namely `--s21--`, `--------s22--------`, and test the corresponding part (`s11` and `s21` && `s12` and `s22`) with `isScramble`.\\n3. separate `s2` into two parts, namely `--------s23--------`, `--s24--`, and test the corresponding part (`s11` and `s24` && `s12` and `s23`) with `isScramble`.\\n4. Note that before testing each sub-part with `isScramble`, `anagram` is used first to test if the corresponding parts are anagrams. If not, skip directly."
		},
		{
			"lc_ans_id":"29458",
			"view":"3501",
			"top":"7",
			"title":"A simple solution without dp in C++",
			"vote":"15",
			"content":"    class Solution {\\n    public:\\n        bool isScramble(string s1, string s2) {\\n            int n = s1.length();\\n            return judge(s1.c_str(), s2.c_str(), 0, n-1, 0, n-1);\\n        }\\n        \\n        bool judge(const char* s1, const char* s2,int a,int b,int u, int v){\\n            if(b-a!=v-u) return false;\\n            if(b-a==0 && s1[a]==s2[u]) return true;\\n            \\n            int cnt[256]={0};\\n            for(int i=a;i<=b;++i){\\n                cnt[s1[i]]++;\\n            }\\n            for(int i=u;i<=v;++i){\\n                cnt[s2[i]]--;\\n            }\\n            for(int i=0;i<256;++i){\\n                if(cnt[i]!=0) return false;\\n            }\\n            \\n            for(int i=a;i<b;++i){\\n                if(judge(s1,s2,a,i,u,u+i-a) && judge(s1,s2,i+1,b,v-(b-i-1),v)){                    \\n                    return true;\\n                }\\n                if(judge(s1,s2,a,i,v-(i-a),v) && judge(s1,s2,i+1,b,u,u+b-(i+1))){\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n    };\\n\\nSurprisingly, it runs very fast even without dynamic programming."
		},
		{
			"lc_ans_id":"29411",
			"view":"2924",
			"top":"8",
			"title":"Optimized recursive (0ms) and DP (20ms) solution C beating 100% submissions",
			"vote":"12",
			"content":"Simply we can just use recursive method to traverse every possible situations but as we can expect that we will run into TLE. \\n\\nThere are other factors we should make full use of to reduce the traversing range \\n- the limited characters \\n- the scrambled string is containing just exactly the same set of characters as the original string \\n\\nwhich can be used to `prune` almost all invalid traversing branches and result in the best time cost.  \\n\\n    #define SIZE 256\\n    bool isnScramble(char* s1, char* s2, int len) \\n    {\\n        \\n        if(!strncmp(s1, s2, len)) return true;\\n        int count[SIZE] = {0};\\n        for(int i = 0; i < len; i++)\\n            count[s1[i]-'a']++, count[s2[i]-'a']--;\\n        for(int i = 0; i < SIZE; i++)\\n            if(count[i]) return false;\\n        for(int i=1; i < len; i++)\\n            if(isnScramble(s1, s2, i) && isnScramble(s1+i, s2+i, len-i) ||\\n                    isnScramble(s1, s2+len-i, i) && isnScramble(s1+i, s2, len-i)) return true;\\n        return false;\\n    }\\n    \\n    //AC - 0ms - beats 100% submissions;\\n    bool isScramble(char* s1, char* s2)\\n    {\\n        int len = strlen(s1);\\n        return isnScramble(s1, s2, len);\\n    }\\n\\nA DP solution is also provided here with 20ms time cost, which is inspired by the above recursive method using three-dimension array to store the state \\n\\n> match[size][index1][index2]\\n\\nthe size is the comparing size of the two strings, index1 is the start index of string 1 and index2 is that of string 2.\\n\\n    //AC - 20ms - beats 100% submissions - DP solution;\\n    bool isScramble(char* s1, char* s2)\\n    {\\n        int len = strlen(s1);\\n        if(!len) return true;\\n        if(len==1) return *s1==*s2;\\n        bool*** match = (bool***)malloc(sizeof(bool**)*(len+1));\\n        for(int i = 0; i <= len; i++)\\n        {\\n            match[i] = (bool**)malloc(sizeof(bool*)*len);\\n            for(int j = 0; j < len; j++)\\n            {\\n                match[i][j] = (bool*)malloc(sizeof(bool)*len);\\n                memset(match[i][j], 0, sizeof(bool)*len);\\n            }\\n        }\\n        for(int i = 0; i < len; i++)\\n            for(int j = 0; j < len; j++)\\n                match[1][i][j] = (s1[i] == s2[j]);\\n        for(int size = 2; size <= len; size++)\\n            for(int i = 0; i <= len-size; i++)\\n                for(int j = 0; j <= len-size; j++)\\n                    for(int k = 1; k<size && !match[size][i][j]; k++)\\n                        match[size][i][j] = (match[k][i][j] && match[size-k][i+k][j+k]) || (match[k][i+size-k][j] && match[size-k][i][j+k]);\\n        return match[len][0][0];\\n    }\\n\\nThere are still lots of redundant search in the above methods; can someone further improve it? Thanks in advance!"
		},
		{
			"lc_ans_id":"29452",
			"view":"876",
			"top":"9",
			"title":"Python dp solutions (with and without memorization).",
			"vote":"7",
			"content":"    # DP \\n    def isScramble1(self, s1, s2):\\n        if len(s1) != len(s2):\\n            return False\\n        if s1 == s2:\\n            return True\\n        if sorted(s1) != sorted(s2): # prunning\\n            return False\\n        for i in xrange(1, len(s1)):\\n            if (self.isScramble(s1[:i], s2[:i]) and self.isScramble(s1[i:], s2[i:])) or \\\\\\n            (self.isScramble(s1[:i], s2[-i:]) and self.isScramble(s1[i:], s2[:-i])):\\n                return True\\n        return False\\n        \\n    # DP with memorization\\n    def __init__(self):\\n        self.dic = {}\\n        \\n    def isScramble(self, s1, s2):\\n        if (s1, s2) in self.dic:\\n            return self.dic[(s1, s2)]\\n        if len(s1) != len(s2) or sorted(s1) != sorted(s2): # prunning\\n            self.dic[(s1, s2)] = False\\n            return False\\n        if s1 == s2:\\n            self.dic[(s1, s2)] = True\\n            return True\\n        for i in xrange(1, len(s1)):\\n            if (self.isScramble(s1[:i], s2[:i]) and self.isScramble(s1[i:], s2[i:])) or \\\\\\n            (self.isScramble(s1[:i], s2[-i:]) and self.isScramble(s1[i:], s2[:-i])):\\n                return True\\n        self.dic[(s1, s2)] = False\\n        return False"
		}
	],
	"id":"87",
	"title":"Scramble String",
	"content":"<p>\r\nGiven a string <i>s1</i>, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.\r\n</p>\r\n<p>\r\nBelow is one possible representation of <i>s1</i> = <code>\"great\"</code>:\r\n</p>\r\n<pre>\r\n    great\r\n   /    \\\r\n  gr    eat\r\n / \\    /  \\\r\ng   r  e   at\r\n           / \\\r\n          a   t\r\n</pre>\r\n<p>\r\nTo scramble the string, we may choose any non-leaf node and swap its two children.\r\n</p>\r\n<p>\r\nFor example, if we choose the node <code>\"gr\"</code> and swap its two children, it produces a scrambled string <code>\"rgeat\"</code>.\r\n</p>\r\n<pre>\r\n    rgeat\r\n   /    \\\r\n  rg    eat\r\n / \\    /  \\\r\nr   g  e   at\r\n           / \\\r\n          a   t\r\n</pre>\r\n<p>\r\nWe say that <code>\"rgeat\"</code> is a scrambled string of <code>\"great\"</code>.\r\n</p>\r\n<p>\r\nSimilarly, if we continue to swap the children of nodes <code>\"eat\"</code> and <code>\"at\"</code>, it produces a scrambled string <code>\"rgtae\"</code>.\r\n</p>\r\n<pre>\r\n    rgtae\r\n   /    \\\r\n  rg    tae\r\n / \\    /  \\\r\nr   g  ta  e\r\n       / \\\r\n      t   a\r\n</pre>\r\n<p>\r\nWe say that <code>\"rgtae\"</code> is a scrambled string of <code>\"great\"</code>.\r\n</p>\r\n<p>\r\nGiven two strings <i>s1</i> and <i>s2</i> of the same length, determine if <i>s2</i> is a scrambled string of <i>s1</i>.\r\n</p>",
	"frequency":"355",
	"ac_num":"70941"
}