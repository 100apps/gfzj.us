{
	"difficulty":"2",
	"submit_num":"777038",
	"show_id":"91",
	"leetcode_id":"91",
	"answers":[
		{
			"lc_ans_id":"30357",
			"view":"60190",
			"top":"0",
			"title":"DP Solution (Java) for reference",
			"vote":"216",
			"content":"    public class Solution {\\n        public int numDecodings(String s) {\\n            int n = s.length();\\n            if (n == 0) return 0;\\n            \\n            int[] memo = new int[n+1];\\n            memo[n]  = 1;\\n            memo[n-1] = s.charAt(n-1) != '0' ? 1 : 0;\\n            \\n            for (int i = n - 2; i >= 0; i--)\\n                if (s.charAt(i) == '0') continue;\\n                else memo[i] = (Integer.parseInt(s.substring(i,i+2))<=26) ? memo[i+1]+memo[i+2] : memo[i+1];\\n            \\n            return memo[0];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"30358",
			"view":"29507",
			"top":"1",
			"title":"Java clean DP solution with explanation",
			"vote":"151",
			"content":"I used a dp array of size n + 1 to save subproblem solutions.  `dp[0]` means an empty string will have one way to decode, `dp[1]` means the way to decode a string of size 1.  I then check one digit and two digit combination and save the results along the way.  In the end, `dp[n]` will be the end result.\\n\\n    public class Solution {\\n        public int numDecodings(String s) {\\n            if(s == null || s.length() == 0) {\\n                return 0;\\n            }\\n            int n = s.length();\\n            int[] dp = new int[n+1];\\n            dp[0] = 1;\\n            dp[1] = s.charAt(0) != '0' ? 1 : 0;\\n            for(int i = 2; i <= n; i++) {\\n                int first = Integer.valueOf(s.substring(i-1, i));\\n                int second = Integer.valueOf(s.substring(i-2, i));\\n                if(first >= 1 && first <= 9) {\\n                   dp[i] += dp[i-1];  \\n                }\\n                if(second >= 10 && second <= 26) {\\n                    dp[i] += dp[i-2];\\n                }\\n            }\\n            return dp[n];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"30384",
			"view":"24359",
			"top":"2",
			"title":"A concise dp solution",
			"vote":"113",
			"content":"    int numDecodings(string s) {\\n        if (!s.size() || s.front() == '0') return 0;\\n        // r2: decode ways of s[i-2] , r1: decode ways of s[i-1] \\n        int r1 = 1, r2 = 1;\\n        \\n        for (int i = 1; i < s.size(); i++) {\\n            // zero voids ways of the last because zero cannot be used separately\\n            if (s[i] == '0') r1 = 0;\\n\\n            // possible two-digit letter, so new r1 is sum of both while new r2 is the old r1\\n            if (s[i - 1] == '1' || s[i - 1] == '2' && s[i] <= '6') {\\n                r1 = r2 + r1;\\n                r2 = r1 - r2;\\n            }\\n\\n            // one-digit letter, no new way added\\n            else {\\n                r2 = r1;\\n            }\\n        }\\n\\n        return r1;\\n    }"
		},
		{
			"lc_ans_id":"30474",
			"view":"14971",
			"top":"3",
			"title":"My c++ 0ms DP solution O(n)",
			"vote":"45",
			"content":"     int n = s.size();\\n        if(n == 0 || s[0] == '0') return 0;\\n        if(n == 1) return 1;\\n        int res = 0,fn_1 = 1,fn_2 = 1;\\n        for(int i = 1;i < n;i++){\\n            int temp = fn_1;\\n            if(isValid(s[i])&&isValid(s[i-1],s[i]))  res+=fn_1+fn_2;\\n            if(!isValid(s[i])&&isValid(s[i-1],s[i])) res+=fn_2;\\n            if(isValid(s[i])&&!isValid(s[i-1],s[i])) res+=fn_1;\\n            if(!isValid(s[i])&&!isValid(s[i-1],s[i]))  return 0;\\n            fn_1 = res;\\n            fn_2 = temp;\\n            res = 0;\\n        }\\n        return fn_1;\\n    }\\n    bool isValid(char a,char b){\\n        return a == '1'||(a == '2' && b <='6');\\n    }\\n    bool isValid(char a){\\n        return a != '0';\\n    }"
		},
		{
			"lc_ans_id":"30379",
			"view":"10572",
			"top":"4",
			"title":"1-liner, O(1) space",
			"vote":"39",
			"content":"[This is the Python](https://xkcd.com/353/).\\n\\n    def numDecodings(self, s):\\n        return reduce(lambda(v,w,p),d:(w,(d>'0')*w+(9<int(p+d)<27)*v,d),s,(0,s>'',''))[1]*1\\n\\n---\\n\\nMore readable version:\\n\\n    def numDecodings(self, s):\\n        v, w, p = 0, int(s>''), ''\\n        for d in s:\\n            v, w, p = w, (d>'0')*w + (9<int(p+d)<27)*v, d\\n        return w\\n\\n- `w` tells the number of ways\\n- `v` tells the previous number of ways\\n- `d` is the current digit\\n- `p` is the previous digit"
		},
		{
			"lc_ans_id":"30354",
			"view":"3813",
			"top":"5",
			"title":"Input \"\" should return 1 instead of 0",
			"vote":"30",
			"content":"There is 1 way to decoding \"\", the decoding result is \"\"."
		},
		{
			"lc_ans_id":"30352",
			"view":"4349",
			"top":"6",
			"title":"Accpeted Python DP solution",
			"vote":"27",
			"content":"    class Solution:\\n        # @param s, a string\\n        # @return an integer\\n        def numDecodings(self, s):\\n            #dp[i] = dp[i-1] if s[i] != \"0\"\\n            #       +dp[i-2] if \"09\" < s[i-1:i+1] < \"27\"\\n            if s == \"\": return 0\\n            dp = [0 for x in range(len(s)+1)]\\n            dp[0] = 1\\n            for i in range(1, len(s)+1):\\n                if s[i-1] != \"0\":\\n                    dp[i] += dp[i-1]\\n                if i != 1 and s[i-2:i] < \"27\" and s[i-2:i] > \"09\":  #\"01\"ways = 0\\n                    dp[i] += dp[i-2]\\n            return dp[len(s)]"
		},
		{
			"lc_ans_id":"30451",
			"view":"1047",
			"top":"7",
			"title":"Evolve from recursion to dp",
			"vote":"21",
			"content":"1. Recursion O(2^n)\\n```\\n    int numDecodings(string s) {\\n        return s.empty() ? 0: numDecodings(0,s);    \\n    }\\n    int numDecodings(int p, string& s) {\\n        int n = s.size();\\n        if(p == n) return 1;\\n        if(s[p] == '0') return 0;\\n        int res = numDecodings(p+1,s);\\n        if( p < n-1 && (s[p]=='1'|| (s[p]=='2'&& s[p+1]<'7'))) res += numDecodings(p+2,s);\\n        return res;\\n    }\\n```\\n2. Memoization O(n)\\n```\\n    int numDecodings(string s) {\\n        int n = s.size();\\n        vector<int> mem(n+1,-1);\\n        mem[n]=1;\\n        return s.empty()? 0 : num(0,s,mem);   \\n    }\\n    int num(int i, string &s, vector<int> &mem) {\\n        if(mem[i]>-1) return mem[i];\\n        if(s[i]=='0') return mem[i] = 0;\\n        int res = num(i+1,s,mem);\\n        if(i<s.size()-1 && (s[i]=='1'||s[i]=='2'&&s[i+1]<'7')) res+=num(i+2,s,mem);\\n        return mem[i] = res;\\n    }\\n``` \\n3. dp O(n) time and space, this can be converted from #2 with copy and paste.\\n```\\n    int numDecodings(string s) {\\n        int n = s.size();\\n        vector<int> dp(n+1);\\n        dp[n] = 1;\\n        for(int i=n-1;i>=0;i--) {\\n            if(s[i]=='0') dp[i]=0;\\n            else {\\n                dp[i] = dp[i+1];\\n                if(i<n-1 && (s[i]=='1'||s[i]=='2'&&s[i+1]<'7')) dp[i]+=dp[i+2];\\n            }\\n        }\\n        return s.empty()? 0 : dp[0];   \\n    }\\n```\\n4. dp constant space\\n```\\n    int numDecodings(string s) {\\n        int p = 1, pp, n = s.size();\\n        for(int i=n-1;i>=0;i--) {\\n            int cur = s[i]=='0' ? 0 : p;\\n            if(i<n-1 && (s[i]=='1'||s[i]=='2'&&s[i+1]<'7')) cur+=pp;\\n            pp = p;\\n            p = cur;\\n        }\\n        return s.empty()? 0 : p;   \\n    }\\n```"
		},
		{
			"lc_ans_id":"30490",
			"view":"2324",
			"top":"8",
			"title":"7 lines cpp solution",
			"vote":"19",
			"content":"    int numDecodings(string s) {\\n          int n = s.size();\\n          if(!n || s[0] == '0')\\n              return 0;\\n          int f[n+1] = {1, 1}, i;\\n          for(i = 2; i <= n; ++i)\\n               f[i] = (int)(s[i-1] != '0')*f[i-1] + (int)((s[i-2] == '1') || (s[i-2] == '2' && s[i-1] < '7'))*f[i-2];\\n        return f[n];\\n    }\\n\\n\\nSlightly Modified O(1) space method:\\n\\n    int numDecodings(string s) {\\n          int n = s.size();\\n          if(!n || s[0] == '0')\\n              return 0;\\n          int f0 = 1, f1 = 1, f2, i;\\n          for(i = 2; i <= n; ++i)\\n          {\\n               f2 = (int)(s[i-1] != '0')*f1 + (int)((s[i-2] == '1') || (s[i-2] == '2' && s[i-1] < '7'))*f0;\\n               f0 = f1;\\n               f1 = f2;\\n          }\\n        return f1;\\n    }"
		},
		{
			"lc_ans_id":"30644",
			"view":"3198",
			"top":"9",
			"title":"Concise cpp solution with O(1) space and O(n) time",
			"vote":"18",
			"content":"    int numDecodings(string s) {\\n        // empty string or leading zero means no way\\n        if (!s.size() || s.front() == '0') return 0;\\n    \\n        // r1 and r2 store ways of the last and the last of the last\\n        int r1 = 1, r2 = 1;\\n    \\n        for (int i = 1; i < s.size(); i++) {\\n            // zero voids ways of the last because zero cannot be used separately\\n            if (s[i] == '0') r1 = 0;\\n            \\n            // possible two-digit letter, so new r1 is sum of both while new r2 is the old r1\\n            if (s[i - 1] == '1' || s[i - 1] == '2' && s[i] <= '6') {\\n                r1 = r2 + r1;\\n                r2 = r1 - r2;\\n            }\\n    \\n            // one-digit letter, no new way added\\n            else {\\n                r2 = r1;\\n            }\\n        }\\n    \\n        return r1;\\n    }"
		}
	],
	"id":"91",
	"title":"Decode Ways",
	"content":"<p>\r\nA message containing letters from <code>A-Z</code> is being encoded to numbers using the following mapping:\r\n</p>\r\n\r\n<pre>\r\n'A' -> 1\r\n'B' -> 2\r\n...\r\n'Z' -> 26\r\n</pre>\r\n\r\n<p>\r\nGiven an encoded message containing digits, determine the total number of ways to decode it.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven encoded message <code>\"12\"</code>,\r\nit could be decoded as <code>\"AB\"</code> (1 2) or <code>\"L\"</code> (12).\r\n</p>\r\n\r\n<p>\r\nThe number of ways decoding <code>\"12\"</code> is 2.\r\n</p>",
	"frequency":"392",
	"ac_num":"156806"
}