{
	"difficulty":"2",
	"submit_num":"119573",
	"show_id":"277",
	"leetcode_id":"277",
	"answers":[
		{
			"lc_ans_id":"71227",
			"view":"28477",
			"top":"0",
			"title":"Java Solution. Two Pass",
			"vote":"202",
			"content":"The first pass is to pick out the candidate. If candidate knows i, then switch candidate. The second pass is to check whether the candidate is real.\\n    \\n    \\n    public class Solution extends Relation {\\n        public int findCelebrity(int n) {\\n            int candidate = 0;\\n            for(int i = 1; i < n; i++){\\n                if(knows(candidate, i))\\n                    candidate = i;\\n            }\\n            for(int i = 0; i < n; i++){\\n                if(i != candidate && (knows(candidate, i) || !knows(i, candidate))) return -1;\\n            }\\n            return candidate;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71228",
			"view":"9379",
			"top":"1",
			"title":"Java/Python, O(n) calls, O(1) space easy to understand solution",
			"vote":"65",
			"content":"**Java**\\n\\n    public class Solution extends Relation {\\n         public int findCelebrity(int n) {\\n            int x = 0;\\n            for (int i = 0; i < n; ++i) if (knows(x, i)) x = i;\\n            for (int i = 0; i < x; ++i) if (knows(x, i)) return -1;\\n            for (int i = 0; i < n; ++i) if (!knows(i, x)) return -1;\\n            return x;\\n        }\\n    }\\n\\n    // 171 / 171 test cases passed.\\n    // Status: Accepted\\n    // Runtime: 13 ms\\n    // 97.79%\\n\\n**Python**\\n\\n    def findCelebrity(self, n):\\n        x = 0\\n        for i in xrange(n):\\n            if knows(x, i):\\n                x = i\\n        if any(knows(x, i) for i in xrange(x)):\\n            return -1\\n        if any(not knows(i, x) for i in xrange(n)):\\n            return -1\\n        return x\\n\\n    # 171 / 171 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 1460 ms\\n    # 91.18%\\n\\n**Explanation**\\n\\nThe first loop is to exclude `n - 1` labels that are not possible to be a celebrity. \\nAfter the first loop, `x` is the only candidate.\\nThe second and third loop is to verify `x` is actually a celebrity by definition.\\n\\nThe key part is the first loop. To understand this you can think the `knows(a,b)` as a `a < b` comparison, if `a` knows `b` then `a < b`, if `a` does not know `b`, `a > b`. Then if there is a celebrity, he/she must be the \"maximum\" of the `n` people.\\n\\nHowever, the \"maximum\" may not be the celebrity in the case of no celebrity at all. Thus we need the second and third loop to check if `x` is actually celebrity by definition.\\n\\nThe total calls of knows is thus `3n` at most. One small improvement is that in the second loop we only need to check i in the range `[0, x)`. You can figure that out yourself easily."
		},
		{
			"lc_ans_id":"71268",
			"view":"9168",
			"top":"2",
			"title":"Straight forward C++ solution with explaination",
			"vote":"64",
			"content":"The idea is as follows:\\n\\nfirst, if  person A knows person B, then B could be the candidate of being a celebrity, A must not be a celebrity. We iterate all the n persons and we will have a candidate that everyone knows this candidate.\\n\\nsecond, we check two things after we get this candidate. 1. If this candidate knows other person in the group, if the candidate knows anyone in the group, then the candidate is not celebrity, return -1; 2. if everyone knows this candidate, if anyone does not know the candidate, return -1;\\n\\n// Forward declaration of the knows API.\\n\\n\\n\\nbool knows(int a, int b);\\n\\n\\n\\nclass Solution {\\n\\n\\npublic:\\n\\n    int findCelebrity(int n) {\\n        if(n<=1) return n;\\n        \\n        int candidate = 0;\\n        \\n        for(int i=1; i<n; i++){\\n            \\n            if ( !knows(i,candidate) ){\\n                candidate = i;\\n            }\\n        }\\n        \\n       \\n        for(int j=0; j<n; j++){\\n            \\n            if(j== candidate) continue;\\n         \\n            if( !knows(j,candidate) || knows(candidate,j) ){\\n                  //if j does not know candidate, or candidate knows j, return -1;\\n                return -1;\\n            }\\n       \\n        }\\n       \\n        \\n        return candidate;\\n      \\n    }\\n};"
		},
		{
			"lc_ans_id":"71240",
			"view":"4367",
			"top":"3",
			"title":"AC Java solution using stack",
			"vote":"45",
			"content":"    public int findCelebrity(int n) {\\n        // base case\\n        if (n <= 0) return -1;\\n        if (n == 1) return 0;\\n        \\n        Stack<Integer> stack = new Stack<>();\\n        \\n        // put all people to the stack\\n        for (int i = 0; i < n; i++) stack.push(i);\\n        \\n        int a = 0, b = 0;\\n        \\n        while (stack.size() > 1) {\\n            a = stack.pop(); b = stack.pop();\\n            \\n            if (knows(a, b)) \\n                // a knows b, so a is not the celebrity, but b may be\\n                stack.push(b);\\n            else \\n                // a doesn't know b, so b is not the celebrity, but a may be\\n                stack.push(a);\\n        }\\n        \\n        // double check the potential celebrity\\n        int c = stack.pop();\\n        \\n        for (int i = 0; i < n; i++)\\n            // c should not know anyone else\\n            if (i != c && (knows(c, i) || !knows(i, c)))\\n                return -1;\\n        \\n        return c;\\n    }"
		},
		{
			"lc_ans_id":"71255",
			"view":"1387",
			"top":"4",
			"title":"Share my two pointer solution",
			"vote":"11",
			"content":"I came up with this idea and found that there is already single pointer solutions which is basically the same. But I think it might be a good addition to the discussion. The idea is similar as the two pointer solution for the sorted two sum problem. It should be straight forward to understand. Please check the code:\\n      \\n    public int findCelebrity(int n) {\\n        if (n < 0) return 0;\\n        int l = 0, r = n - 1;\\n        while (l < r) {\\n            if (knows(l, r)) l++;\\n            else r--;\\n        }\\n        int i = 0;\\n        while (i < n) {\\n            if (i != l && (knows(l, i) || !knows(i, l))) return -1;\\n            i++;\\n        }\\n        return l;\\n    }"
		},
		{
			"lc_ans_id":"71274",
			"view":"903",
			"top":"5",
			"title":"3(n-1) API call C++ original solution",
			"vote":"9",
			"content":"knows(int a, int b) has two outcomes:\\n\\n**true**: a knows b, so a is not celebrity, b is the candidate\\n\\n**false**: a doesn't know b, so b can't be the celebrity, then a is the candidate. \\n\\nBy calling API n - 1 times, each call we pick one and drop the other one, so in the end, we have one candidate left. Then we do another pass to check if everyone else know the candidate, and the candidate knows nobody else.\\n\\n\\n\\n    // Forward declaration of the knows API.\\n    bool knows(int a, int b);\\n    \\n    class Solution {\\n    public:\\n        int findCelebrity(int n) {\\n            int ans = 0;\\n            for(int i = 1; i < n; i++){ //  n - 1 API call\\n                if(knows(ans, i)) ans = i;\\n            } \\n            \\n            for(int i = 0; i < n; i++){\\n                if(i == ans) continue;\\n                if(knows(ans, i) || !knows(i, ans)) return -1; //  2*(n - 1) API call\\n            }\\n            \\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71250",
			"view":"1549",
			"top":"6",
			"title":"C++ solution (7 lines) , easy understanding with simple explanation",
			"vote":"6",
			"content":"       int findCelebrity(int n) {\\n        for (int i = 0, j = 0; i < n; i++) {\\n            for (j = 0; j < n; j++) {\\n                if (i != j && knows(i, j)) break; //if i knows j, i is not celebrity\\n                if (i != j && !knows(j, i)) break; //if j don't know i, not celebrity\\n            }\\n            if (j == n) return i; //i does not know any j , but all j know i\\n        }\\n        return -1;\\n    }"
		},
		{
			"lc_ans_id":"71249",
			"view":"1594",
			"top":"7",
			"title":"5 line c++ solution",
			"vote":"6",
			"content":"    int findCelebrity(int n) {\\n        if(n<2) return n?0:-1;\\n        int curr = 0, next = 1;\\n        for(;next<n;next++) if(knows(curr,next)) curr = next;\\n        for(int i=0; i<n; i++) if(curr != i && (knows(curr, i) || !knows(i, curr))) return -1;\\n        return curr;\\n    }"
		},
		{
			"lc_ans_id":"71278",
			"view":"1073",
			"top":"8",
			"title":"JAVA---------Easy Version To Understand!!!!!!!!!!",
			"vote":"4",
			"content":"\\tpublic int findCelebrity(int n) {\\n\\t\\tif (n <= 1)\\n\\t\\t\\treturn -1;\\n\\t\\tint celebrity = 0, i;\\n\\t\\tfor (i = 1; i < n; i++) {// Exclusion way to find candidate\\n\\t\\t\\tif (knows(celebrity, i))\\n\\t\\t\\t\\tcelebrity = i;\\n\\t\\t}\\n\\t\\tfor (i = 0; i < n; i++) { // Check whether candidate is valid\\n\\t\\t\\tif (i == celebrity || (knows(i, celebrity) && !knows(celebrity, i)))\\n\\t\\t\\t\\tcontinue;\\n\\t\\t\\telse\\n\\t\\t\\t\\tbreak;\\n\\t\\t}\\n\\t\\tif (i == n)\\n\\t\\t\\treturn celebrity;\\n\\t\\telse\\n\\t\\t\\treturn -1;\\n\\t}"
		},
		{
			"lc_ans_id":"71246",
			"view":"1186",
			"top":"9",
			"title":"Interesting: same O(n) code(commented), one beats 99.82% run times, the other only beats 9.96%",
			"vote":"3",
			"content":"> below is the code that beats 9.96% run times, O(n), run time 140ms. but i think it minimizes the call of \"bool knows(a, b)\"\\n\\n    public class Solution extends Relation {\\n        public int findCelebrity(int n) {\\n            int cand = 0;  // set 0 as current candidate\\n            int prevOneKnowsCand = -1;\\n            for (int i=1; i<n; ++i) { // if cand knows i, celebrity must not be this cand, set cand to i. otherwise, i must not be the celebrity, skip it.\\n                if (knows(cand, i)) {\\n                    prevOneKnowsCand = cand;  // at least we've already known that \"cand\" knows the future candidate i\\n                    cand = i;\\n                }\\n            }  // at this point, cand does not know anyone coming after him\\n            for (int i=0; i<cand; ++i) { if (knows(cand, i)) { return -1; } }  // at this point, cand does not know anyone else\\n            for (int i=0; i<n; ++i) {\\n                if (i!=cand && i!=prevOneKnowsCand) {  // these 2 ppl know candidate for sure \\n                if (!knows(i, cand)) { return -1; } } \\n            }\\n            return cand;\\n        }\\n    }\\n\\n> below is the code that beats 99.82% run times, O(n), run time 12ms.\\n\\n    public class Solution extends Relation {\\n        public int findCelebrity(int n) {\\n            int cand = 0;  // set 0 as current candidate\\n            // int prevOneKnowsCand = -1;\\n            for (int i=1; i<n; ++i) { // if cand knows i, celebrity must not be this cand, set cand to i. otherwise, i must not be the celebrity, skip it.\\n                if (knows(cand, i)) {\\n                    // prevOneKnowsCand = cand;  // at least we've already known that \"cand\" knows the future candidate i\\n                    cand = i;\\n                }\\n            }  // at this point, cand does not know anyone coming after him\\n            for (int i=0; i<cand; ++i) { if (knows(cand, i)) { return -1; } }  // at this point, cand does not know anyone else\\n            for (int i=0; i<n; ++i) {\\n                // if (i!=cand && i!=prevOneKnowsCand) {  // these 2 ppl know candidate for sure \\n                if (!knows(i, cand)) { return -1; } // } \\n            }\\n            return cand;\\n        }\\n    }\\n\\nwhy using IF-Statement so slow??? i mean, it should be slower, but maybe not this slow..."
		}
	],
	"id":"277",
	"title":"Find the Celebrity",
	"content":"<p>\r\nSuppose you are at a party with <code>n</code> people (labeled from <code>0</code> to <code>n - 1</code>) and among them, there may exist one celebrity. The definition of a celebrity is that all the other <code>n - 1</code> people know him/her but he/she does not know any of them.\r\n</p>\r\n\r\n<p>\r\nNow you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is to ask questions like: \"Hi, A. Do you know B?\" to get information of whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).\r\n</p>\r\n\r\n<p>\r\nYou are given a helper function <code>bool knows(a, b)</code> which tells you whether A knows B. Implement a function <code>int findCelebrity(n)</code>, your function should minimize the number of calls to <code>knows</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Note</b>: There will be exactly one celebrity if he/she is in the party. Return the celebrity's label if there is a celebrity in the party. If there is no celebrity, return <code>-1</code>.\r\n</p>",
	"frequency":"327",
	"ac_num":"42787"
}