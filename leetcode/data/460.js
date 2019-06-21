{
	"difficulty":"3",
	"submit_num":"18842",
	"show_id":"466",
	"leetcode_id":"466",
	"answers":[
		{
			"lc_ans_id":"95401",
			"view":"4949",
			"top":"0",
			"title":"Ugly Java brute force solution, but accepted. 1088ms.",
			"vote":"35",
			"content":"I didn't come up with any good solution so I tried brute force. Key points:\\n1. How do we know \"string s2 can be obtained from string s1\"? Easy, use two pointers iterate through s2 and s1. If chars are equal, move both. Otherwise only move pointer1.\\n2. We repeat step 1 and go through s1 for n1 times and count how many times can we go through s2.\\n3. Answer to this problem is times go through s2 divide by n2.\\n\\n```\\npublic class Solution {\\n    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {\\n        char[] array1 = s1.toCharArray(), array2 = s2.toCharArray();\\n        int count1 = 0, count2 = 0, i = 0, j = 0;\\n        \\n        while (count1 < n1) {\\n            if (array1[i] == array2[j]) {\\n                j++;\\n                if (j == array2.length) {\\n                    j = 0;\\n                    count2++;\\n                }\\n            }\\n            i++;\\n            if (i == array1.length) {\\n                i = 0;\\n                count1++;\\n            }\\n        }\\n        \\n        return count2 / n2;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95398",
			"view":"3915",
			"top":"1",
			"title":"C++ solution inspired by @70664914 with organized explanation",
			"vote":"30",
			"content":"It's easy to come up with a brute force solution and to find that there will be a **repetitive pattern** when matching `S2` through `S1`. The only problem is how to use the repetitive pattern to save computation.\\n\\n**Fact:**\\nIf `s2` repeats in `S1` `R` times, then `S2` must repeats in `S1` `R / n2` times.\\n**Conclusion:**\\nWe can simply count the repetition of `s2` and then divide the count by `n2`.\\n\\n**How to denote repetition:**\\nWe need to scan `s1` `n1` times. Denote each scanning of `s1` as a `s1` segment.\\nAfter each scanning of `i`-th `s1` segment, we will have\\n1. The accumulative count of `s2` repeated in this `s1` segment.  \\n2. A `nextIndex` that `s2[nextIndex]` is the first letter you'll be looking for in the next `s1` segment.\\n> Suppose `s1=\"abc\"`, `s2=\"bac\"`, `nextIndex` will be `1`; `s1=\"abca\"`, `s2=\"bac\"`, `nextIndex` will be `2`\\n\\nIt is the `nextIndex` that is the denotation of the repetitive pattern.\\n\\n**Example:**\\n```\\nInput:\\ns1=\"abacb\", n1=6\\ns2=\"bcaa\", n2=1\\n\\nReturn:\\n3\\n```\\n```\\n                    0  1   2 3 0      1    2 3 0      1    2 3 0  \\nS1 --------------> abacb | abacb | abacb | abacb | abacb | abacb \\nrepeatCount ----->    0  |   1   |   1   |   2   |   2   |   3\\nIncrement of \\nrepeatCount     ->    0  |   1   |   0   |   1   |   0   |   1\\nnextIndex ------->    2  |   1   |   2   |   1   |   2   |   1\\n```\\n\\nThe `nextIndex` has `s2.size()` possible values, ranging from `0` to `s2.size() - 1`. Due to PigeonHole principle, you must find two same `nextIndex` after scanning `s2.size() + 1` `s1` segments.\\n\\nOnce you meet a `nextIndex` you've met before, you'll know that the following `nextIndex`s and increments of `repeatCount` will repeat a pattern.\\n\\nSo let's separate the `s1` segments into 3 parts:\\n1. the prefix part before repetitive pattern\\n2. the repetitive part\\n3. the suffix part after repetitive pattern (incomplete repetitive pattern remnant)\\n\\nAll you have to do is add up the repeat counts of the 3 parts.\\n\\n```\\nclass Solution {\\npublic:\\n    int getMaxRepetitions(string s1, int n1, string s2, int n2) {\\n        vector<int> repeatCount(s2.size() + 1, 0);\\n        vector<int> nextIndex(s2.size() + 1, 0);\\n        int j = 0, cnt = 0;\\n        for (int k = 1; k <= n1; ++k) {\\n            for (int i = 0; i < s1.size(); ++i) {\\n                if (s1[i] == s2[j]) {\\n                    ++j;\\n                    if (j == s2.size()) {\\n                        j = 0;\\n                        ++cnt;\\n                    }\\n                }\\n            }\\n            repeatCount[k] = cnt;\\n            nextIndex[k] = j;\\n            for (int start = 0; start < k; ++start) {\\n                if (nextIndex[start] == j) {\\n                    int prefixCount = repeatCount[start];\\n                    int patternCount = (repeatCount[k] - repeatCount[start]) * (n1 - start) / (k - start);\\n                    int suffixCount = repeatCount[start + (n1 - start) % (k - start)] - repeatCount[start];\\n                    return (prefixCount + patternCount + suffixCount) / n2;\\n                }\\n            }\\n        }\\n        return repeatCount[n1] / n2;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95397",
			"view":"6076",
			"top":"2",
			"title":"C++ 0ms O(str1.length*str2.length)",
			"vote":"17",
			"content":"IDEA: \\n\\n**Given a str2, for each str, we can give a value v to this str such that, after greedily looking through str, our imaginary next step is to find str2[v].**\\nIn our problem, str is always (str1,n), with a given str1, so, we can take one more step and say that for each n, there is a unique v associated to n(i.e t0 (str,n)).\\n\\ndefine a division and a modulo between two strings as follow: \\n\\nstr/str2=argmax{i, (str2,i) can be obtained by str}\\nstr%str2=the v mentioned above associated with str.\\n\\nAll possible values of v is less than str2.size(), \\nso (str1,n)%str2 will begin to **repeat a pattern** after a certain n less than str2.size(). \\n(the pattern is the same because in the cases with the same v, our situations are exactly the same), \\nso is (str1,n)/str2-(str1,n+1)/str2 for the same reason. \\nWe can therefore precompute a table for all these values with O(str1.length*str2.length).\\n\\n(str1,n) can be divided in three parts:\\n\\nsth before pattern(A)    +    pattern parts(B)    +    sth after pattern(C)\\n\\nThe pattern does not necessarily begin in the first str1, we shall see if n is great enough so that there can be a pattern.\\n\\nThe last pattern(C) is not necessarily complete, we need to calculate it separately.\\n\\nWe can finish in just looking to the precomputed table and doing some simple maths. \\n\\n\\n```\\nclass Solution {\\npublic:\\n    int getMaxRepetitions(string s1, int n1, string s2, int n2) {\\n        vector<int> rapport(102,-1);\\n        vector<int> rest(102,-1);\\n        int b=-1;int posRest=0;int rap=0;\\n        int last=-1;\\n        rapport[0]=rest[0]=0;//case when n=0\\n        for(int i=1;i<=s2.size()+1;i++){\\n            int j;\\n            for(j=0;j<s1.size();j++){\\n                if(s2[posRest]==s1[j]){\\n                    posRest++;\\n                    if(posRest==s2.size()){\\n                        rap++;\\n                        posRest=0;\\n                    }\\n                }\\n            }\\n            for(int k=0;k<i;k++){\\n                if(posRest==rest[k]){b=k;last=i;break;}\\n            }\\n            rapport[i]=rap;rest[i]=posRest;\\n            if(b>=0)break;\\n        }\\n        int interval=last-b;\\n        if(b>=n1)return rapport[n1]/n2;\\n        return ((n1-b)/interval*(rapport[last]-rapport[b])+rapport[(n1-b)%interval+b])/n2;\\n//corrected thanks to @zhiqing_xiao and @iaming \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95408",
			"view":"3904",
			"top":"3",
			"title":"Easy-understanding Java Solution with detailed explanation, 21ms!",
			"vote":"13",
			"content":"The key is, we just need to calculate ***what will remain after s1 obtains s2***.\\n\\nThat is, `(s1, s2) -> (sRemain, matchCnt)`; for example,\\n`(abcd, ab) -> (cd, 1)`\\n`(ababa, ab) -> (a, 2)`\\n`(a, aaaa) -> (a, 0)`\\n`(aabaabaab, aba) -> (ab, 2)` as `aabaaba` exactly matches `aba` twice.\\n\\n\\nAnd, each time we append `s1` to the `remain string`, to make a sequence: (Using `[]` to mark the `remain string`)\\n`(abcd, ab): abcd -> [cd]abcd -> [cd]abcd -> [cd]abcd -> ...`\\n`(ababa, ab): ababa -> [a]ababa -> [a]ababa -> [a]ababa -> ...`\\n`(a, aaaa): a -> [a]a -> [aa]a -> [aaa]a -> a -> [a]a -> [aa]a -> ...`\\n`(aabaabaab, aba): aabaabaab -> [ab]aabaabaab -> [ab]aabaabaab -> ...`\\n\\nObviously, there will be a loop in the sequence, assume the length of loop is `loop`, and the length before the loop is `k`.\\n`(abcd, ab): loop=1, k=1`\\n`(a, aaaa): loop=4, k=0`\\n`(aabaabaab, aba): loop=1, k=1`\\n\\nSo, we just need to calculate `the count of each loop`, and `the count before entering the loop`, and calculate the total.\\n\\nHere is the code with detailed comment, 21ms.\\n\\n```\\npublic class Solution {\\n    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {\\n        if (!ableToObtain(s1, s2)) return 0; // check if [s1. \\u221e] obtains s2\\n        int cnt=0, k=-1;\\n        String s=s1;\\n        StringBuilder remainBuilder; // record `remain string`\\n        ArrayList<String> stringList=new ArrayList<>(); // record all the `remain string`\\n        ArrayList<Integer> countList=new ArrayList<>(); // record matching count from start to the current remain string \\n        stringList.add(\"\"); // record empty string\\n        countList.add(0);\\n        for (int i=0;i<=n1;i++) {\\n            remainBuilder=new StringBuilder();\\n            cnt+=getRemain(s, s2, remainBuilder); // get the next remain string, returns the count of matching\\n            String remain=remainBuilder.toString();\\n            if ((k=stringList.indexOf(remain))!=-1) break; // if there is a loop, break\\n            stringList.add(remain); // record the remain string into arraylist \\n            countList.add(cnt);\\n            s=remain+s1; // append s1 to make a new string\\n        }\\n        // here, k is the beginning of the loop\\n        if (k==-1) return cnt/n2; // if there is no loop\\n        int countOfLoop=cnt-countList.get(k), loopLength=stringList.size()-k; // get matching count in the loop, and loop length\\n        cnt=countList.get(k);\\n        n1-=k;\\n        cnt+=countOfLoop*(n1/loopLength);\\n        n1%=loopLength; \\n        cnt+=countList.get(k+n1)-countList.get(k);\\n        return cnt/n2;\\n    }\\n\\n    // check if [s1. \\u221e] obtains s2\\n    private boolean ableToObtain(String s1, String s2) {\\n        boolean[] cnt=new boolean[26];\\n        for (char c: s1.toCharArray()) cnt[c-'a']=true;\\n        for (char c: s2.toCharArray()) {\\n            if (!cnt[c-'a']) return false;\\n        }\\n        return true;\\n    }\\n\\n    // get remain string after s1 obtains s2, return the matching count\\n    private int getRemain(String s1, String s2, StringBuilder remain) {\\n        int cnt=0, lastMatch=-1, p2=0;\\n        for (int p1=0;p1<s1.length();p1++) {\\n            if (s1.charAt(p1)==s2.charAt(p2)) {\\n                if (++p2==s2.length()) {\\n                    p2=0;\\n                    cnt++;\\n                    lastMatch=p1;\\n                }\\n            }\\n        }\\n        remain.append(s1.substring(lastMatch+1));\\n        return cnt;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95402",
			"view":"1734",
			"top":"4",
			"title":"Very clean and short 7ms Java solution based on @70664914 's idea",
			"vote":"6",
			"content":"Based on idea here: https://discuss.leetcode.com/topic/70667/c-0ms-o-str1-length-str2-length\\nThanks to @70664914 \\nAdded some early stop\\n```Java\\npublic class Solution {\\n    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {\\n        int[] reps = new int[102];\\n        int[] rests = new int[102];\\n        int posRest=0, repTime=0;\\n        int i=0, k=0;\\n        if(n1 <= 0) return 0;\\n        while(k==i) {\\n            i++;\\n            for(int j=0; j<s1.length(); j++) {\\n                if(s2.charAt(posRest) == s1.charAt(j)) {\\n                    posRest++;\\n                    if(posRest == s2.length()) {\\n                        repTime++;\\n                        posRest=0;\\n                    }\\n                }\\n            }\\n            if(i >= n1)\\n                return repTime / n2;\\n            for(k=0; k<i; k++){\\n                if(posRest == rests[k])\\n                    break;\\n            }\\n            reps[i] = repTime;\\n            rests[i] = posRest;\\n        }\\n        int interval = i-k;\\n        int repeatCount = (n1-k) / interval;\\n        int repeatTimes = repeatCount * (reps[i]-reps[k]);\\n        int remainTimes = reps[(n1-k) % interval + k];\\n        return (repeatTimes + remainTimes) / n2;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95407",
			"view":"299",
			"top":"5",
			"title":"Simple C++ code, 16 lines, but slow, 179ms",
			"vote":"4",
			"content":"```\\nclass Solution {\\npublic:\\n    int getMaxRepetitions(string s1, int n1, string s2, int n2) {\\n        int len=s2.size();\\n        vector<int> dp(len);\\n        for(int i=0;i<len;i++){\\n            int start=i;\\n            for(char ch : s1)if(ch==s2[start%len])start++;\\n            if(start==i)return 0;\\n            dp[i]=start-i;\\n        }\\n        int idx=0;\\n        for(int i=0;i<n1;i++)idx+=dp[idx%len];\\n        return idx/len/n2;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95420",
			"view":"294",
			"top":"6",
			"title":"C++, 3ms, find reoccurence and skip",
			"vote":"3",
			"content":"Every time we find a complete s2 in n1\\\\*s1, we record three things using a map:\\n* key: current position in s1\\n* value: current position in n\\\\*s1 and how many s2 have been found.\\n\\nLater, we check if current position in s1 has been recorded before, and if so, we can skip reoccurrence of all s1[i0:i](see what i0 and i mean in code below) in n1\\\\*s1.\\n\\n```\\nclass Solution {\\npublic:\\n    int getMaxRepetitions(string s1, int n1, string s2, int n2) {\\n        unordered_map<int, pair<int, int>> r;\\n        \\n        int k = 0;\\n        for(int i = 0; i < s1.length()*n1;) {\\n            \\n            int rr = i % s1.length();\\n            if(r.find(rr) == r.end()) {\\n                r[rr] = make_pair(i, k);\\n                // cout << \"setup: \" << rr << ',' << i << ',' << k << endl;\\n            }\\n            else {\\n                // cout << rr << ',' << i << ',' << k << endl;\\n                auto i0 = r[rr].first;\\n                auto k0 = r[rr].second; // now, i - i0 == (k - k0) * s2.length()\\n                \\n                int n = (s1.length()*n1 - i0) / (i - i0); // we have n*(k - k0) complete s2 left\\n                \\n                // skip repeated patterns\\n                i = i0 + n*(i - i0);\\n                k = k0 + n*(k - k0);\\n            }\\n            \\n            for(int j = 0; i < s1.length()*n1 && j < s2.length(); ++ i, ++ j) {\\n                while(i < s1.length()*n1 && s1[i%s1.length()] != s2[j]) ++ i;\\n            }\\n            \\n            if(i >= s1.length()*n1) {\\n                break;\\n            }\\n            \\n            ++ k;\\n        }\\n        \\n        // cout << k << endl;\\n        return k / n2;\\n    }\\n    \\n    inline string repeat(string &s, int n) {\\n        string S;\\n        S.reserve(s.size()*n);\\n        while(n -- > 0) {\\n            S += s;\\n        }\\n        return S;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"95426",
			"view":"1754",
			"top":"7",
			"title":"Accepted 8ms Java solution with explanation",
			"vote":"3",
			"content":"**IDEA:** \\nImagine s1 and s2 repeat inifinite times as below (for example s1 = \"abcd\" and \\ns2 = \"ab\") \\nabcdabcdabcd... \\nababab... \\nsay <i, j> are pairs of pointers to s1 and s2 in greedy matched characters, \\nin above example will be \\n<0, 0>, <1, 1>, <4, 2>, <5, 3>, <8, 4>, <9, 5>... \\nIn a brute force solution we can keep increasing i and j until i exceeds s1 x n1.\\n\\nSay the lengths of s1 and s2 are m1 and m2. It's easy to prove that: \\nIf there are two pairs <i1, j1>, <i2, j2> satisfying: \\n(i2 - i1) % m1 == 0 && (j2 - j1) % m2 == 0, \\nlet d1 = i2 - i1 and d2 = j2 - j1, \\nthen for all positive integer k, <i1 + d1 * k, j1 + d2 * k> will be pairs too.\\n\\nSo without brute force matching, my trick is to use above conclusion to push <i,\\nj> quickly to near the end of the expanded string s1 x n1, after the first <i1,\\nj1> and <i2, j2> pair is found. Here's the solution:\\n\\n```\\npublic class Solution {\\n\\tpublic int getMaxRepetitions(String s1, int n1, String s2, int n2) {\\n\\t\\tint m1 = s1.length();\\n\\t\\tint m2 = s2.length();\\n\\t\\tif (m1 == 0 || m2 == 0)\\n\\t\\t\\treturn 0;\\n\\t\\tint i, j;\\n\\t\\t// extra code to remove unnecessary characters in s1\\n\\t\\tStringBuffer sb = new StringBuffer();\\n\\t\\tboolean[] used = new boolean[26];\\n\\t\\tint[] counts = new int[26]; // count of each character in s1\\n\\t\\tfor (i = 0; i < m2; i++) {\\n\\t\\t\\tj = s2.charAt(i) - 'a';\\n\\t\\t\\tused[j] = true;\\n\\t\\t}\\n\\t\\tfor (i = 0; i < m1; i++) {\\n\\t\\t\\tj = s1.charAt(i) - 'a';\\n\\t\\t\\tif (used[j])\\n\\t\\t\\t\\tsb.append(s1.charAt(i));\\n\\t\\t\\tcounts[j]++;\\n\\t\\t}\\n\\t\\tfor (i = 0; i < 26; i++) {\\n\\t\\t\\tif (used[i] && counts[i] == 0) // character in s2 not in s1\\n\\t\\t\\t\\treturn 0;\\n\\t\\t}\\n\\t\\ts1 = sb.toString();\\n\\t\\tm1 = s1.length();\\n\\n\\t\\t// extra code to reduce s1 and s2 if it contains repeating pattern\\n\\t\\tfor (i = 1; i <= m1 / 2; i++) {\\n\\t\\t\\tif (m1 % i != 0)\\n\\t\\t\\t\\tcontinue;\\n\\t\\t\\tif (repeatAtK(s1, i)) {\\n\\t\\t\\t\\ts1 = s1.substring(0, i);\\n\\t\\t\\t\\tn1 *= m1 / i;\\n\\t\\t\\t\\tm1 = i;\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tfor (i = 1; i <= m2 / 2; i++) {\\n\\t\\t\\tif (m2 % i != 0)\\n\\t\\t\\t\\tcontinue;\\n\\t\\t\\tif (repeatAtK(s2, i)) {\\n\\t\\t\\t\\ts2 = s2.substring(0, i);\\n\\t\\t\\t\\tn2 *= m2 / i;\\n\\t\\t\\t\\tm2 = i;\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\tint[][] ocs = new int[26][m1]; // occurrences of each character in s1\\n\\t\\tArrays.fill(counts, 0);\\n\\t\\tfor (i = 0; i < m1; i++) {\\n\\t\\t\\tj = s1.charAt(i) - 'a';\\n\\t\\t\\tocs[j][counts[j]] = i;\\n\\t\\t\\tcounts[j]++;\\n\\t\\t}\\n\\t\\t\\n\\t\\t// simple case\\n\\t\\tif (m2 == 1) {\\n\\t\\t\\tj = s2.charAt(0) - 'a';\\n\\t\\t\\treturn counts[j]*n1/n2;\\n\\t\\t}\\n\\n\\t\\treturn getMaxRepetitionsProcessed(counts, ocs, n1, s2.toCharArray(), n2);\\n\\t}\\n\\n\\tpublic int getMaxRepetitionsProcessed(int[] counts, int[][] ocs, int n1, char[] ca2, int n2) {\\n\\t\\tint m1 = ocs[0].length;\\n\\t\\tint m2 = ca2.length;\\n\\t\\t// <i, j> pairs in slot mod m1/m2\\n\\t\\tint[][][] r = new int[m1][m2][2];\\n\\t\\t// pos[c][0] is the current index of character c in i, \\n\\t\\t// pos[c][1] is which occurrence in s1\\n\\t\\tint[][] pos = new int[26][2]; \\n\\t\\tint i, j, k, r1 = 0, r2 = 0;\\n\\t\\tboolean found = false;\\n\\t\\tfor (i = 0; i < 26; i++) {\\n\\t\\t\\tpos[i][0] = ocs[i][0];\\n\\t\\t}\\n\\t\\tfor (i = 0; i < m1; i++) {\\n\\t\\t\\tfor (j = 0; j < m2; j++) {\\n\\t\\t\\t\\tr[i][j][0] = -1;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tfor (i = 0, j = 0; i < m1 * n1; i++, j++) {\\n\\t\\t\\tk = ca2[j % m2] - 'a';\\n\\t\\t\\t// move pos[k] to a position equal or after i by iterating k's occurrences\\n\\t\\t\\twhile (pos[k][0] < i) {\\n\\t\\t\\t\\tpos[k][1]++;\\n\\t\\t\\t\\tif (pos[k][1] < counts[k]) {\\n\\t\\t\\t\\t\\tpos[k][0] += ocs[k][pos[k][1]] - ocs[k][pos[k][1] - 1];\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tpos[k][1] = 0;\\n\\t\\t\\t\\t\\tpos[k][0] += ocs[k][0] + m1 - ocs[k][counts[k] - 1];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\ti = pos[k][0];\\n\\t\\t\\tif (i >= m1 * n1) {\\n\\t\\t\\t\\treturn j / m2 / n2;\\n\\t\\t\\t}\\n\\t\\t\\tr1 = i % m1;\\n\\t\\t\\tr2 = j % m2;\\n\\t\\t\\tif (!found && r[r1][r2][0] < 0) {\\n\\t\\t\\t\\tr[r1][r2][0] = i;\\n\\t\\t\\t\\tr[r1][r2][1] = j;\\n\\t\\t\\t} else if (!found) { // push by mod trick here\\n\\t\\t\\t\\tint d1 = i - r[r1][r2][0];\\n\\t\\t\\t\\tint d2 = j - r[r1][r2][1];\\n\\t\\t\\t\\tk = (m1 * n1 - i) / d1;\\n\\t\\t\\t\\ti += k * d1;\\n\\t\\t\\t\\tj += k * d2;\\n\\t\\t\\t\\tfor (r1 = 0; r1 < 26; r1++) { // update all pos[c] the same way as i\\n\\t\\t\\t\\t\\tpos[r1][0] += k * d1;\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\tfound = true;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn j / m2 / n2;\\n\\t}\\n\\n\\tpublic boolean repeatAtK(String s, int k) { // check if s is repeated every k characters\\n\\t\\tint m = s.length();\\n\\t\\tint x = m / k;\\n\\t\\tfor (int i = 0; i < k; i++) {\\n\\t\\t\\tfor (int j = 0; j < x; j++) {\\n\\t\\t\\t\\tif (s.charAt(i) != s.charAt(j * k + i))\\n\\t\\t\\t\\t\\treturn false;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn true;\\n\\t}\\n}\\n```\\n\\nRegarding the time complexity, the for loop should be less than 2 * m1 * m2\\ntimes according to pigeonhole theorem, and the while loop inside should be less\\nthant m1 (actually can be amortized to d1/d2), so the overall time complexity\\nshould be less than O(m1 * m1 * m2). I believe in reality it should be much less. \\n\\nUgly coding because I'm not good at it, just want to share this idea to see if \\nit makes sense. Any improvement is most welcome."
		},
		{
			"lc_ans_id":"95403",
			"view":"379",
			"top":"8",
			"title":"A 15ms Java Solution with explanation (brute force + memorization)",
			"vote":"2",
			"content":"I was enlightened by the @shawngao's brute force solution, the post can be found [here](https://discuss.leetcode.com/topic/70707/ugly-java-brute-force-solution-but-accepted-1088ms).\\n\\nThe basic idea is to repeat s1 in n1 times, and count how many s2 we can find. The answer number of s2  we can find divide by n2. \\n\\nTo accelerate the process, a map is used to find \"loop\".\\n\\nThe following is the code\\n\\nPoint[][] map is used for find loop.\\nint[] p1 and int[] p2 are the counters.\\n\\n```\\npublic class Solution {\\n\\n    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {\\n        int len1 = s1.length();\\n        int len2 = s2.length();\\n        Point[][] map = new Point[len1][len2];\\n        int[] p1 = new int[2];\\n        int[] p2 = new int[2];\\n        while (p1[1] < n1) {\\n            char c = s2.charAt(p2[0]);\\n            while (p1[1] < n1 && s1.charAt(p1[0]) != c) {\\n                inc(p1, len1);\\n            }\\n            if (map[p1[0]][p2[0]] == null) {\\n                map[p1[0]][p2[0]] = new Point(p1[1], p2[1]);\\n            } else {\\n                int deltaP1 = p1[1] - map[p1[0]][p2[0]].x;\\n                int deltaP2 = p2[1] - map[p1[0]][p2[0]].y;\\n                int k = (n1 - deltaP1 - 1) / deltaP1;\\n                p1[1] += k * deltaP1;\\n                p2[1] += k * deltaP2;\\n            }\\n            inc(p1, len1);\\n            inc(p2, len2);\\n        }\\n        return p2[1] / n2;\\n    }\\n\\n    public void inc(int[] p, int len) {\\n        if (++ p[0] == len) {\\n            p[0] = 0;\\n            p[1] += 1;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95429",
			"view":"390",
			"top":"9",
			"title":"Python 69ms solution",
			"vote":"2",
			"content":"The main idea is to find a circle. A `circle` means m rounds of s1 has a subarray of n rounds of s2, and at the meantime starting from the same point of s1. \\n```\\nclass Solution(object):\\n    def getMaxRepetitions(self, s1, n1, s2, n2):\\n        start = {} # s2_idx : s1_round, s2_round\\n        s1_round, s2_round, s2_idx = 0, 0, 0\\n        while s1_round < n1:\\n            s1_round += 1\\n            for ch in s1:\\n                if ch == s2[s2_idx]:\\n                    s2_idx += 1\\n                    if s2_idx == len(s2):\\n                        s2_round += 1\\n                        s2_idx = 0\\n            if s2_idx in start:\\n                prev_s1_round, prev_s2_round = start[s2_idx]\\n                circle_s1_round, circle_s2_round = s1_round - prev_s1_round, s2_round - prev_s2_round\\n                res = (n1 - prev_s1_round) / circle_s1_round * circle_s2_round\\n                left_s1_round = (n1 - prev_s1_round) % circle_s1_round + prev_s1_round\\n                for key, val in start.iteritems():\\n                    if val[0] == left_s1_round:\\n                        res += val[1]\\n                        break\\n                return res / n2\\n            else:\\n                start[s2_idx] = (s1_round, s2_round)\\n        return s2_round / n2\\n```"
		}
	],
	"id":"460",
	"title":"Count The Repetitions",
	"content":"<p>Define <code>S = [s,n]</code> as the string S which consists of n connected strings s. For example, <code>[\"abc\", 3]</code> =\"abcabcabc\". </p>\n<p>On the other hand, we define that string s1 can be obtained from string s2 if we can remove some characters from s2 such that it becomes s1. For example, “abc”  can be obtained from “abdbec” based on our definition, but it can not be obtained from “acbbe”.</p>\n<p>You are given two non-empty strings s1 and s2 (each at most 100 characters long) and two integers 0 &le; n1 &le; 10<sup>6</sup> and 1 &le; n2 &le; 10<sup>6</sup>. Now consider the strings S1 and S2, where <code>S1=[s1,n1]</code> and <code>S2=[s2,n2]</code>. Find the maximum integer M such that <code>[S2,M]</code> can be obtained from <code>S1</code>.</p>\n\n<p><b>Example:</b>\n<pre>\nInput:\ns1=\"acb\", n1=4\ns2=\"ab\", n2=2\n\nReturn:\n2\n</pre>\n</p>",
	"frequency":"211",
	"ac_num":"5175"
}