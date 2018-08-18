{
	"difficulty":"1",
	"submit_num":"55429",
	"show_id":"686",
	"leetcode_id":"686",
	"answers":[
		{
			"lc_ans_id":"108084",
			"view":"6251",
			"top":"0",
			"title":"C++ 4 lines O(m * n) | O(1) and 7 lines KMP O(m + n) | O(n)",
			"vote":"19",
			"content":"This is basically a modified version of string find, which does not stop at the end of A, but continue matching by looping through A.\\n```\\nint repeatedStringMatch(string A, string B) {\\n    for (auto i = 0, j = 0; i < A.size(); ++i) {\\n        for (j = 0; j < B.size() && A[(i + j) % A.size()] == B[j]; ++j);\\n        if (j == B.size()) return (i + j) / A.size() + ((i + j) % A.size() != 0 ? 1 : 0);\\n    }\\n    return -1;\\n}\\n```\\nAs suggested by @k_j, I am also providing O(n + m) version that uses a prefix table (KMP). We first compute the prefix table using the suffix and prefix pointers. Then we are going through A only once, shifting B using the prefix table.\\n\\nThis solution requires O(n) extra memory for the prefix table, but it's the fastest out there (OJ runtime is 3 ms). However, we do not need extra memory to append A multiple times, as in many other solutions.\\n\\nAlso thanks to @mylzsd for the review and the optimization to move i faster (skip multiple search characters) rather incrementing it one by one.\\n```\\nint repeatedStringMatch(string a, string b) {\\n    vector<int> prefTable(b.size() + 1); // 1-based to avoid extra checks.\\n    for (auto sp = 1, pp = 0; sp < b.size(); prefTable[++sp] = pp) {\\n        pp = b[pp] == b[sp] ? pp + 1 :  prefTable[pp];\\n    }\\n    for (auto i = 0, j = 0; i < a.size(); i += max(1, j - prefTable[j]), j = prefTable[j]) {\\n        while (j < b.size() && a[(i + j) % a.size()] == b[j]) ++j;\\n        if (j == b.size()) return (i + j) / a.size() + ((i + j) % a.size() != 0 ? 1 : 0);\\n    }\\n    return -1;\\n}\\n```"
		},
		{
			"lc_ans_id":"108086",
			"view":"6873",
			"top":"1",
			"title":"Java Solution - Just keep building (OJ Missing Test Cases)",
			"vote":"19",
			"content":"Since LC has so many test cases missing, I wrote new code.\\nThe idea is to keep string builder and appending until the length A is greater or equal to B.\\n\\n     public int repeatedStringMatch(String A, String B) {\\n\\n        int count = 0;\\n        StringBuilder sb = new StringBuilder();\\n        while (sb.length() < B.length()) {\\n            sb.append(A);\\n            count++;\\n        }\\n        if(sb.toString().contains(B)) return count;\\n        if(sb.append(A).toString().contains(B)) return ++count;\\n        return -1;\\n    }\\n\\nHere's the old idea I used which got accepted with multiple bugs.\\n\\n~~Idea is to count all A in B as first step. \\nThen remove all A in B. \\nThen remaining B is either present in A or A+A.~~\\n\\n    public int repeatedStringMatch(String A, String B) {\\n        int i = 0, count = 0;\\n        while (i < B.length()) {\\n            int idx = B.indexOf(A, i);\\n            if (idx == -1) break;\\n            i = idx + A.length();\\n            count++;\\n        }\\n        B = B.replaceAll(A, \"\"); // remaining B if valid, should be smaller than A\\n        if (!B.isEmpty()) {\\n            if (A.startsWith(B)) count++; // B is substring AND first part of A\\n            else if(A.contains(B)) return -1; // B is substring somewhere in between\\n            else if ((A + A).contains(B)) count += 2; // B in rotating A\\n            else return -1;\\n        }\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"108090",
			"view":"2774",
			"top":"2",
			"title":"Intuitive Python 2-liner",
			"vote":"8",
			"content":"Let `n` be the answer, the minimum number of times `A` has to be repeated. \\n\\nFor `B` to be inside `A`, `A` has to be repeated sufficient times such that it is at least as long as `B` (or one more), hence we can conclude that the theoretical lower bound for the answer would be length of `B` / length of `A`.\\n\\nLet `x` be the theoretical lower bound, which is `ceil(len(B)`/`len(A))`.\\n\\nThe answer `n` can only be `x` or `x + 1` (in the case where `len(B)` is a multiple of `len(A)` like in `A = \"abcd\"` and `B = \"cdabcdab\"`) and not more. Because if `B` is already in `A * n`, `B` is definitely in `A * (n + 1)`. \\n\\nHence we only need to check whether `B in A * x` or `B in A * (x + 1)`, and if both are not possible return -1.\\n\\n*- Yangshun*\\n\\nHere's the cheeky two-liner suggested by @liping5:\\n\\n```\\nclass Solution(object):\\n    def repeatedStringMatch(self, A, B):\\n        t = -(-len(B) // len(A)) # Equal to ceil(len(b) / len(a))\\n        return t * (B in A * t) or (t + 1) * (B in A * (t + 1)) or -1\\n```\\n\\nBut don't do the above in interviews. Doing the following is more readable.\\n\\n```\\nclass Solution(object):\\n    def repeatedStringMatch(self, A, B):\\n        times = -(-len(B) // len(A)) # Equal to ceil(len(b) / len(a))\\n        for i in range(2):\\n          if B in (A * (times + i)):\\n            return times + i\\n        return -1\\n\\n```\\n\\nThanks @ManuelP for suggesting that `times = int(math.ceil(float(len(B)) / len(A)))` can be written as `times = -(-len(B) // len(A))`."
		},
		{
			"lc_ans_id":"108113",
			"view":"2609",
			"top":"3",
			"title":"share my java solution!",
			"vote":"6",
			"content":"```\\nclass Solution {\\n    public int repeatedStringMatch(String A, String B) {\\n        StringBuilder sb = new StringBuilder();\\n        sb.append(A);\\n        int count = 1;\\n        while(sb.indexOf(B)<0){\\n            if(sb.length()-A.length()>B.length()){\\n                return -1;\\n            }\\n            sb.append(A);\\n            count++;\\n        }\\n        \\n        return count;\\n}\\n```"
		},
		{
			"lc_ans_id":"108118",
			"view":"2944",
			"top":"4",
			"title":"[C++/Java] Clean Code",
			"vote":"3",
			"content":"first of all, we need `as` to be at least as long as `b`:\\na: `\"abc\" \"abc\"`\\nb: `\"abc abc\"` - in this case we need 2 copies of `a`;\\n\\na:`\"abc\" \"abc\" \"abc\"`\\nb: `\"c abc ab\"` - in this case we need 3 copies of `a`\\n\\nWe can tell we need at least 1 extra copy, `b.length() / a.length() + 1` works fine when `a.len / a.len == 0`\\nBut:\\na: `\"abc\" \"abc\" \"abc\"`\\nb: `\"c abc a\"` - in this case we still need 3 copies of `a`, but `a.len / b.len  (5/3)` only give you 1\\nThat's why we want to add at least 2 copies.\\n\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int repeatedStringMatch(string a, string b) {\\n        string as = a;\\n        for (int rep = 1; rep <= b.length() / a.length() + 2; rep++, as += a)\\n            if (as.find(b) != string::npos) return rep;\\n        return -1;\\n    }\\n};\\n```\\n**Java**\\n```\\nclass Solution {\\n    public int repeatedStringMatch(String a, String b) {\\n        String as = a;\\n        for (int rep = 1; rep <= b.length() / a.length() + 2; rep++, as += a)\\n            if (as.indexOf(b) != -1) return rep;\\n        return -1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108097",
			"view":"326",
			"top":"5",
			"title":"C++ straight-forward solution",
			"vote":"2",
			"content":"```\\n    int repeatedStringMatch(string A, string B) {\\n        int p=0, ct=0;\\n        for(p;p<A.size();p++) {\\n            if(isMatch(A, B, p, 0)) break;\\n        }\\n        if(p==A.size()) return -1; \\n        p=A.size()-p; \\n        ct++;\\n        while(p<B.size()) {\\n            if(isMatch(A, B, 0, p)) p+=A.size();\\n            else return -1;\\n            ct++;\\n        }\\n        return ct;\\n    }\\n    \\n    bool isMatch(string& a, string& b, int pa, int pb) {\\n        while(pa<a.size()&&pb<b.size()) {\\n            if(a[pa]!=b[pb]) return false;\\n            pa++, pb++;\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"108128",
			"view":"442",
			"top":"6",
			"title":"O(|A| + |B|)-time Solution",
			"vote":"2",
			"content":"Assume the repeated string does exist. Then, we must have\\n`B = [some nullable suffix of A] AA..AA [some nullable prefix of A]`.\\n\\nLet k = floor(|B| / |A|). Then, we just need to test\\n1) whether the string by repeating `A` k times contains `B` as a substring,\\n2) whether the string by repeating `A` (k+1) times contains `B` as a substring,\\n3) whether the string by repeating `A` (k+2) times contains `B` as a substring.\\n\\nNote that, test 1 makes sense only if |B| is divisible by |A|. But for convenience, we include this case anyway, without increasing the overall asymptotic runtime.\\n\\nEach test can be done in O(|A| + |B|) time using (say) KMP. Therefore, the total runtime is still O(|A| + |B|).\\n\\nJava code:\\n```java\\npublic int repeatedStringMatch(String A, String B) {\\n    StringBuilder builder = new StringBuilder(A);\\n    while (builder.length() < B.length())\\n        builder.append(A);\\n\\n    for (int i = 0; i < 3; i++) {\\n        if (builder.toString().contains(B)) // For simplicity, pretend that String.contains is implemented using KMP.\\n            return builder.length() / A.length();\\n        builder.append(A);\\n    }\\n    return -1;\\n}\\n```\\n\\nUsing KMP:\\n```\\nclass Solution {\\n    public int repeatedStringMatch(String A, String B) {\\n        StringBuilder builder = new StringBuilder(A);\\n        while (builder.length() < B.length())\\n            builder.append(A);\\n\\n        int[] next = new int[B.length()];\\n        for (int i = 0, j = -1; i < B.length(); i++) {\\n            while (j != -1 && B.charAt(i) != B.charAt(j + 1))\\n                j = next[j];\\n            next[i] = i > 0 && B.charAt(i) == B.charAt(j + 1) ? j + 1 : -1;\\n            j = next[i];\\n        }\\n\\n        for (int i = 0; i < 3; i++) {\\n            if (kmpMatch(builder.toString(), B, next))\\n                return builder.length() / A.length();\\n            builder.append(A);\\n        }\\n        return -1;\\n    }\\n\\n    private boolean kmpMatch(String s, String pattern, int[] next) {\\n        for (int i = 0, j = -1; i < s.length(); i++) {\\n            while (j != -1 && s.charAt(i) != pattern.charAt(j + 1))\\n                j = next[j];\\n            if (s.charAt(i) == pattern.charAt(j + 1))\\n                j++;\\n            if (j == pattern.length() - 1)\\n                return true;\\n        }\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108078",
			"view":"394",
			"top":"7",
			"title":"Python solution.",
			"vote":"2",
			"content":"Testing if b is substring while building the string in C. The number 3 was chosen to be sufficiently large to make sure new string will contain b.\\n```\\n    def repeatedStringMatch(self, A, B):\\n        C = \"\"\\n        for i in range(len(B)/len(A) + 3): \\n            if B in C:\\n                return i\\n            C += A\\n        return -1\\n```"
		},
		{
			"lc_ans_id":"108089",
			"view":"68",
			"top":"8",
			"title":"A missing test case that fails quite a few fastest solutions accepted....",
			"vote":"1",
			"content":"A: \"aaac\"\\nB: \"aac\"\\n\\nAny solution that tries to move to the next char of A when a mismatch happens simply fails this case. However, a lot of so very fast solutions of this sort are accepted.\\n\\nPlease someone add this test case:)\\n\\nThis is fairly urgent...\\n\\nIf an interviewer ever found such bugs in a string match algorithm, the interviewee would be in trouble..."
		},
		{
			"lc_ans_id":"108094",
			"view":"177",
			"top":"9",
			"title":"Can Anybody Show Why The Repeated String Must Stop at the Length of \"A.length()*2 + B.length()\" ?",
			"vote":"1",
			"content":"Learned from this thread:\\nhttps://discuss.leetcode.com/topic/105566/java-solution-just-keep-building-oj-missing-test-cases\\nI rewrote the code simply as:\\n```\\nclass Solution {\\n    public int repeatedStringMatch(String A, String B) {\\n        for (String C = A; C.length() < B.length() + A.length()*2; C += A) \\n            if (C.contains(B)) return C.length()/A.length();\\n        return -1;\\n    }\\n}\\n```\\n\\nBut why must the string repeating loop end at C.length() >= 2*A.length() + B.length() ?"
		}
	],
	"id":"663",
	"title":"Repeated String Match",
	"content":"<p>Given two strings A and B, find the minimum number of times A has to be repeated such that B is a substring of it. If no such solution, return -1.</p>\n\n<p>\nFor example, with A = \"abcd\" and B = \"cdabcdab\". </p>\n\n<p>\nReturn 3, because by repeating A three times (“abcdabcdabcd”), B is a substring of it; and B is not a substring of A repeated two times (\"abcdabcd\").\n</p>\n\n<p><b>Note:</b><br />\nThe length of <code>A</code> and <code>B</code> will be between 1 and 10000.\n</p>",
	"frequency":"266",
	"ac_num":"18814"
}