{
	"difficulty":"2",
	"submit_num":"348039",
	"show_id":"93",
	"leetcode_id":"93",
	"answers":[
		{
			"lc_ans_id":"30949",
			"view":"25407",
			"top":"0",
			"title":"My code in Java",
			"vote":"175",
			"content":"    public class Solution {\\n        public List<String> restoreIpAddresses(String s) {\\n            List<String> res = new ArrayList<String>();\\n            int len = s.length();\\n            for(int i = 1; i<4 && i<len-2; i++){\\n                for(int j = i+1; j<i+4 && j<len-1; j++){\\n                    for(int k = j+1; k<j+4 && k<len; k++){\\n                        String s1 = s.substring(0,i), s2 = s.substring(i,j), s3 = s.substring(j,k), s4 = s.substring(k,len);\\n                        if(isValid(s1) && isValid(s2) && isValid(s3) && isValid(s4)){\\n                            res.add(s1+\".\"+s2+\".\"+s3+\".\"+s4);\\n                        }\\n                    }\\n                }\\n            }\\n            return res;\\n        }\\n        public boolean isValid(String s){\\n            if(s.length()>3 || s.length()==0 || (s.charAt(0)=='0' && s.length()>1) || Integer.parseInt(s)>255)\\n                return false;\\n            return true;\\n        }\\n    }\\n\\n3-loop divides the string s into 4 substring: s1, s2, s3, s4. Check if each substring is valid.\\nIn isValid, strings whose length greater than 3 or equals to 0 is not valid; or if the string's length is longer than 1 and the first letter is '0' then it's invalid; or the string whose integer representation greater than 255 is invalid."
		},
		{
			"lc_ans_id":"30972",
			"view":"11103",
			"top":"1",
			"title":"WHO CAN BEAT THIS CODE ?",
			"vote":"73",
			"content":"\\n        // c++  code\\n        vector<string> restoreIpAddresses(string s) {\\n            vector<string> ret;\\n            string ans;\\n            \\n            for (int a=1; a<=3; a++)\\n            for (int b=1; b<=3; b++)\\n            for (int c=1; c<=3; c++)\\n            for (int d=1; d<=3; d++)\\n                if (a+b+c+d == s.length()) {\\n                    int A = stoi(s.substr(0, a));\\n                    int B = stoi(s.substr(a, b));\\n                    int C = stoi(s.substr(a+b, c));\\n                    int D = stoi(s.substr(a+b+c, d));\\n                    if (A<=255 && B<=255 && C<=255 && D<=255)\\n                        if ( (ans=to_string(A)+\".\"+to_string(B)+\".\"+to_string(C)+\".\"+to_string(D)).length() == s.length()+3)\\n                            ret.push_back(ans);\\n                }    \\n            \\n            return ret;\\n        }"
		},
		{
			"lc_ans_id":"30944",
			"view":"17947",
			"top":"2",
			"title":"Very simple DFS solution",
			"vote":"73",
			"content":"    public List<String> restoreIpAddresses(String s) {\\n        List<String> solutions = new ArrayList<String>();\\n        restoreIp(s, solutions, 0, \"\", 0);\\n        return solutions;\\n    }\\n    \\n    private void restoreIp(String ip, List<String> solutions, int idx, String restored, int count) {\\n        if (count > 4) return;\\n        if (count == 4 && idx == ip.length()) solutions.add(restored);\\n        \\n        for (int i=1; i<4; i++) {\\n            if (idx+i > ip.length()) break;\\n            String s = ip.substring(idx,idx+i);\\n            if ((s.startsWith(\"0\") && s.length()>1) || (i==3 && Integer.parseInt(s) >= 256)) continue;\\n            restoreIp(ip, solutions, idx+i, restored+s+(count==3?\"\" : \".\"), count+1);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"31165",
			"view":"8875",
			"top":"3",
			"title":"What is the definition of a valid IP address?",
			"vote":"37",
			"content":"Here we have\\n\\nInput: \\t\"010010\"\\n\\nOutput: \\t[\"0.1.0.10\",\"0.1.1.0\",\"0.10.0.10\",\"0.10.1.0\",\"0.100.1.0\",\"1.0.0.10\",\"1.0.1.0\",\"10.0.1.0\"]\\n\\nExpected: \\t[\"0.10.0.10\",\"0.100.1.0\"]\\n\\n\\nMay I know why \"0.1.0.10\" is not valid? From previous test cases, I know even '0.0.0.0' is counted as valid.\\nYour input is highly appreciated."
		},
		{
			"lc_ans_id":"30998",
			"view":"5285",
			"top":"4",
			"title":"My concise AC java code",
			"vote":"33",
			"content":"the basic idea is to make three cuts into the string, separating it into four parts, each part contains 1~3 digits and it must be <255. \\n\\n    static List<String> restoreIpAddresses(String s) {\\n    \\tList<String> ans = new ArrayList<String>();\\n    \\tint len = s.length();\\n    \\tfor (int i = 1; i <=3; ++i){  // first cut\\n    \\t\\tif (len-i > 9) continue;    \\t\\t\\n    \\t\\tfor (int j = i+1; j<=i+3; ++j){  //second cut\\n    \\t\\t\\tif (len-j > 6) continue;    \\t\\t\\t\\n    \\t\\t\\tfor (int k = j+1; k<=j+3 && k<len; ++k){  // third cut\\n    \\t\\t\\t\\tint a,b,c,d;                // the four int's seperated by \".\"\\n    \\t\\t\\t\\ta = Integer.parseInt(s.substring(0,i));  \\n    \\t\\t\\t\\tb = Integer.parseInt(s.substring(i,j)); // notice that \"01\" can be parsed into 1. Need to deal with that later.\\n    \\t\\t\\t\\tc = Integer.parseInt(s.substring(j,k));\\n    \\t\\t\\t\\td = Integer.parseInt(s.substring(k));\\n    \\t\\t\\t\\tif (a>255 || b>255 || c>255 || d>255) continue; \\n    \\t\\t\\t\\tString ip = a+\".\"+b+\".\"+c+\".\"+d;\\n    \\t\\t\\t\\tif (ip.length()<len+3) continue;  // this is to reject those int's parsed from \"01\" or \"00\"-like substrings\\n    \\t\\t\\t\\tans.add(ip);\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t}\\n    \\treturn ans;\\n    }"
		},
		{
			"lc_ans_id":"31098",
			"view":"2728",
			"top":"5",
			"title":"Easy Java code of backtracking within 16 lines",
			"vote":"23",
			"content":"        public List<String> restoreIpAddresses(String s) {\\n            List<String> res = new ArrayList<>();\\n            helper(s,\"\",res,0);\\n            return res;\\n        }\\n        public void helper(String s, String tmp, List<String> res,int n){\\n            if(n==4){\\n                if(s.length()==0) res.add(tmp.substring(0,tmp.length()-1));\\n                //substring here to get rid of last '.'\\n                return;\\n            }\\n            for(int k=1;k<=3;k++){\\n                if(s.length()<k) continue;\\n                int val = Integer.parseInt(s.substring(0,k));\\n                if(val>255 || k!=String.valueOf(val).length()) continue;\\n                /*in the case 010 the parseInt will return len=2 where val=10, but k=3, skip this.*/\\n                helper(s.substring(k),tmp+s.substring(0,k)+\".\",res,n+1);\\n            }\\n        }"
		},
		{
			"lc_ans_id":"31151",
			"view":"2426",
			"top":"6",
			"title":"Share 0ms neat and clear c++ solution using DFS",
			"vote":"12",
			"content":"    class Solution {\\n    public:\\n        vector<string> restoreIpAddresses(string s) {\\n            vector<string> result;\\n            string ip;\\n            dfs(s,0,0,ip,result); //paras:string s,start index of s,step(from0-3),intermediate ip,final result\\n            return result;\\n        }\\n        void dfs(string s,int start,int step,string ip,vector<string>& result){\\n            if(start==s.size()&&step==4){\\n                ip.erase(ip.end()-1); //remove the last '.' from the last decimal number\\n                result.push_back(ip);\\n                return;\\n            }\\n            if(s.size()-start>(4-step)*3) return;\\n            if(s.size()-start<(4-step)) return;\\n            int num=0;\\n            for(int i=start;i<start+3;i++){\\n                num=num*10+(s[i]-'0');\\n                if(num<=255){\\n                    ip+=s[i];\\n                    dfs(s,i+1,step+1,ip+'.',result);\\n                }\\n                if(num==0) break;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"30946",
			"view":"1675",
			"top":"7",
			"title":"DFS in Python",
			"vote":"8",
			"content":"    class Solution(object):\\n        def restoreIpAddresses(self, s):\\n            \"\"\"\\n            :type s: str\\n            :rtype: List[str]\\n            \"\"\"\\n            ans = []\\n            self.helper(ans, s, 4, [])\\n            return ['.'.join(x) for x in ans]\\n            \\n        def helper(self, ans, s, k, temp):\\n            if len(s) > k*3:\\n                return\\n            if k == 0:\\n                ans.append(temp[:])\\n            else:\\n                for i in range(min(3,len(s)-k+1)):\\n                    if i==2 and int(s[:3]) > 255 or i > 0 and s[0] == '0':\\n                        continue\\n                    self.helper(ans, s[i+1:], k-1, temp+[s[:i+1]])"
		},
		{
			"lc_ans_id":"31113",
			"view":"1106",
			"top":"8",
			"title":"Java , recursive, backtracking, easy to read.",
			"vote":"6",
			"content":"    public List<String> restoreIpAddresses(String s) {\\n        List<String> ret = new LinkedList<>();\\n        int[] path = new int[4];\\n        helper(ret, s, 0,  path, 0);\\n        return ret;\\n    }\\n    \\n    void helper(List<String> acc, String s, int idx, int[] path,  int segment){\\n        if(segment == 4 && idx == s.length() ){\\n            acc.add(path[0] + \".\" + path[1] + \".\"+ path[2] + \".\" + path[3]);\\n            return ;\\n        }else if(segment == 4 || idx == s.length() ){\\n            return ;\\n        }\\n        \\n        for(int len = 1; len <= 3 && idx + len <= s.length() ; len ++){\\n            int val = Integer.parseInt(s.substring(idx, idx + len));\\n            // range check, no leading 0.\\n            if(val > 255 || len >= 2  && s.charAt(idx) == '0') \\n                break; \\n                \\n            path[segment] = val;\\n            helper(acc, s, idx + len, path, segment + 1);\\n            path[segment] = -1; // for debug. \\n        }\\n    }"
		},
		{
			"lc_ans_id":"31184",
			"view":"1661",
			"top":"9",
			"title":"Beautiful C++ backtracking solution",
			"vote":"6",
			"content":"    class Solution {\\n    public:\\n        vector<string> result;\\n        string solution;\\n        \\n        vector<string> restoreIpAddresses(string s) {\\n            \\n            backtracking(s, 0, 0);\\n            \\n            return result;\\n        }\\n        \\n    private:\\n        void backtracking(string s, int start, int part)\\n        {\\n            if(start == s.size() && part == 4)\\n            {\\n                result.push_back(solution);\\n                return;\\n            }\\n            \\n            for(int i = start; i < s.size(); i++)\\n            {\\n                if(part < 4 && i-start < 3 && validIP(s, start, i))\\n                {\\n                    solution.append(s.substr(start, i-start+1));\\n                    part++;\\n                    if(part < 4) solution.push_back('.');\\n    \\n                    backtracking(s, i+1, part);\\n                    \\n                    if(part < 4) solution.pop_back();\\n                    part--;\\n                    for(int j = 0; j < i-start+1; j++) solution.pop_back();\\n                }\\n            }\\n        }\\n        \\n        bool validIP(string s, int start, int end)\\n        {\\n            string temp = s.substr(start, end-start+1);\\n            int ip = stoll(temp);\\n            \\n            if(s[start] == '0' && start != end) return false;\\n            else if(ip >= 0 && ip <= 255) return true;\\n            \\n            return false;\\n        }\\n    };"
		}
	],
	"id":"93",
	"title":"Restore IP Addresses",
	"content":"<p>Given a string containing only digits, restore it by returning all possible valid IP address combinations.</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven <code>\"25525511135\"</code>,\r\n</p>\r\n<p>\r\nreturn <code>[\"255.255.11.135\", \"255.255.111.35\"]</code>. (Order does not matter)\r\n</p>",
	"frequency":"376",
	"ac_num":"98032"
}