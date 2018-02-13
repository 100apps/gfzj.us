{
	"difficulty":"3",
	"submit_num":"141249",
	"show_id":"282",
	"leetcode_id":"282",
	"answers":[
		{
			"lc_ans_id":"71895",
			"view":"47173",
			"top":"0",
			"title":"Java Standard Backtrace AC Solutoin, short and clear",
			"vote":"255",
			"content":"This problem has a lot of edge cases to be considered:\\n\\n1. overflow: we use a long type once it is larger than Integer.MAX_VALUE or minimum, we get over it. \\n2. 0 sequence: because we can't have numbers with multiple digits started with zero, we have to deal with it too.\\n3. a little trick is that we should save the value that is to be multiplied in the next recursion.\\n\\n---\\n\\n    public class Solution {\\n        public List<String> addOperators(String num, int target) {\\n            List<String> rst = new ArrayList<String>();\\n            if(num == null || num.length() == 0) return rst;\\n            helper(rst, \"\", num, target, 0, 0, 0);\\n            return rst;\\n        }\\n        public void helper(List<String> rst, String path, String num, int target, int pos, long eval, long multed){\\n            if(pos == num.length()){\\n                if(target == eval)\\n                    rst.add(path);\\n                return;\\n            }\\n            for(int i = pos; i < num.length(); i++){\\n                if(i != pos && num.charAt(pos) == '0') break;\\n                long cur = Long.parseLong(num.substring(pos, i + 1));\\n                if(pos == 0){\\n                    helper(rst, path + cur, num, target, i + 1, cur, cur);\\n                }\\n                else{\\n                    helper(rst, path + \"+\" + cur, num, target, i + 1, eval + cur , cur);\\n                    \\n                    helper(rst, path + \"-\" + cur, num, target, i + 1, eval -cur, -cur);\\n                    \\n                    helper(rst, path + \"*\" + cur, num, target, i + 1, eval - multed + multed * cur, multed * cur );\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71898",
			"view":"17373",
			"top":"1",
			"title":"17 lines solution, dfs (C++)",
			"vote":"58",
			"content":"    class Solution {\\n    private:\\n        // cur: {string} expression generated so far.\\n        // pos: {int}    current visiting position of num.\\n        // cv:  {long}   cumulative value so far.\\n        // pv:  {long}   previous operand value.\\n        // op:  {char}   previous operator used.\\n        void dfs(std::vector<string>& res, const string& num, const int target, string cur, int pos, const long cv, const long pv, const char op) {\\n            if (pos == num.size() && cv == target) {\\n                res.push_back(cur);\\n            } else {\\n                for (int i=pos+1; i<=num.size(); i++) {\\n                    string t = num.substr(pos, i-pos);\\n                    long now = stol(t);\\n                    if (to_string(now).size() != t.size()) continue;\\n                    dfs(res, num, target, cur+'+'+t, i, cv+now, now, '+');\\n                    dfs(res, num, target, cur+'-'+t, i, cv-now, now, '-');\\n                    dfs(res, num, target, cur+'*'+t, i, (op == '-') ? cv+pv - pv*now : ((op == '+') ? cv-pv + pv*now : pv*now), pv*now, op);\\n                }\\n            }\\n        }\\n    \\n    public:\\n        vector<string> addOperators(string num, int target) {\\n            vector<string> res;\\n            if (num.empty()) return res;\\n            for (int i=1; i<=num.size(); i++) {\\n                string s = num.substr(0, i);\\n                long cur = stol(s);\\n                if (to_string(cur).size() != s.size()) continue;\\n                dfs(res, num, target, s, i, cur, cur, '#');         // no operator defined.\\n            }\\n    \\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71897",
			"view":"11877",
			"top":"2",
			"title":"Java AC solution, 19ms, beat 100.00%.",
			"vote":"33",
			"content":"I am surprised that it beats 100.00% other solutions, so i have to share this.\\n\\n    void dfs(List<String> ret, char[] path, int len, long left, long cur, char[] digits, int pos, int target) {\\n        if (pos == digits.length) {\\n            if (left + cur == target) ret.add(new String(path, 0, len));\\n            return;\\n        }\\n        long n = 0;\\n        int j = len + 1;\\n        for (int i = pos; i < digits.length; i++) {\\n            n = n * 10 + digits[i] - '0';\\n            path[j++] = digits[i];\\n            path[len] = '+';\\n            dfs(ret, path, j, left + cur, n, digits, i + 1, target);\\n            path[len] = '-';\\n            dfs(ret, path, j, left + cur, -n, digits, i + 1, target);\\n            path[len] = '*';\\n            dfs(ret, path, j, left, cur * n, digits, i + 1, target);\\n            if (digits[pos] == '0') break; \\n        }\\n    }\\n    public List<String> addOperators(String num, int target) {\\n        List<String> ret = new LinkedList<>();\\n        if (num.length() == 0) return ret;\\n        char[] path = new char[num.length() * 2 - 1];\\n        char[] digits = num.toCharArray();\\n        long n = 0;\\n        for (int i = 0; i < digits.length; i++) {\\n            n = n * 10 + digits[i] - '0';\\n            path[i] = digits[i];\\n            dfs(ret, path, i + 1, 0, n, digits, i + 1, target);\\n            if (n == 0) break;\\n        }\\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"71971",
			"view":"5379",
			"top":"3",
			"title":"Accepted C++ Solution",
			"vote":"26",
			"content":"    void addOperators(vector<string>& result, string nums, string t, long long last, long long curVal, int target) {\\n\\t\\tif (nums.length() == 0) {\\n\\t\\t\\tif (curVal == target)\\n\\t\\t\\t\\tresult.push_back(t);\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\n\\t\\tfor (int i = 1; i<=nums.length(); i++) {\\n\\t\\t\\tstring num = nums.substr(0, i);\\n\\t\\t\\tif(num.length() > 1 && num[0] == '0')\\n\\t\\t\\t    return;\\n\\t\\t\\t\\n\\t\\t\\tstring nextNum = nums.substr(i);\\n\\n\\t\\t\\tif (t.length() > 0) {\\n\\t\\t\\t\\taddOperators(result, nextNum, t + \"+\" + num, stoll(num), curVal + stoll(num), target);\\n\\t\\t\\t\\taddOperators(result, nextNum, t + \"-\" + num, -stoll(num), curVal - stoll(num), target);\\n\\t\\t\\t\\taddOperators(result, nextNum, t + \"*\" + num, last * stoll(num), (curVal - last) + (last * stoll(num)), target);\\n\\t\\t\\t}\\n\\t\\t\\telse \\n\\t\\t\\t\\taddOperators(result, nextNum, num, stoll(num), stoll(num), target);\\n\\t\\t}\\n\\t}\\n\\n\\tvector<string> addOperators(string num, int target) {\\n\\t\\tvector<string> result;\\n\\t\\taddOperators(result, num, \"\", 0, 0, target);\\n\\t\\treturn result;\\n\\t}"
		},
		{
			"lc_ans_id":"71927",
			"view":"7673",
			"top":"4",
			"title":"[recommend for beginners]clean C++ implementation with detailed explanation",
			"vote":"24",
			"content":"    class Solution {\\n    public:\\n        vector<string> addOperators(string num, int target) {\\n            vector<string> result;\\n            if(num.size()==0)   return result;\\n            help(result, \"\", num, target, 0, 0, 0);\\n            return result;\\n        }\\n        \\n        void help(vector<string> &result, string path, string num, int target, int pos, long cur, long prev){\\n            if(pos==num.size()){\\n                if(cur==target)   result.push_back(path);\\n                return;\\n            }\\n            for(int i=pos; i<num.size(); i++){\\n                /*** corner-case-added-code ***/\\n                if(num[pos]=='0' && i>pos) break;\\n                string _str=num.substr(pos, i-pos+1);\\n                long _value=stol(_str);\\n                if(pos==0)  {\\n                    help(result, path+_str, num, target, i+1, _value, _value);\\n                }\\n                else{\\n                    help(result, path+\"+\"+_str, num, target, i+1, cur+_value, _value);\\n                    help(result, path+\"-\"+_str, num, target, i+1, cur-_value, -_value);\\n                    help(result, path+\"*\"+_str, num, target, i+1, cur-prev+prev*_value, prev*_value);\\n                }\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71968",
			"view":"3577",
			"top":"5",
			"title":"Clean Python DFS with comments",
			"vote":"21",
			"content":"dfs() parameters:  \\nnum:   remaining num string  \\ntemp:  temporally string with operators added  \\ncur:     current result of \"temp\" string  \\nlast:     last multiply-level number in \"temp\". if next operator is \"multiply\", \"cur\" and \"last\" will be updated  \\nres:      result to return\\n\\n    def addOperators(self, num, target):\\n        res, self.target = [], target\\n        for i in range(1,len(num)+1):\\n            if i == 1 or (i > 1 and num[0] != \"0\"): # prevent \"00*\" as a number\\n                self.dfs(num[i:], num[:i], int(num[:i]), int(num[:i]), res) # this step put first number in the string\\n        return res\\n\\n    def dfs(self, num, temp, cur, last, res):\\n        if not num:\\n            if cur == self.target:\\n                res.append(temp)\\n            return\\n        for i in range(1, len(num)+1):\\n            val = num[:i]\\n            if i == 1 or (i > 1 and num[0] != \"0\"): # prevent \"00*\" as a number\\n                self.dfs(num[i:], temp + \"+\" + val, cur+int(val), int(val), res)\\n                self.dfs(num[i:], temp + \"-\" + val, cur-int(val), -int(val), res)\\n                self.dfs(num[i:], temp + \"*\" + val, cur-last+last*int(val), last*int(val), res)"
		},
		{
			"lc_ans_id":"71947",
			"view":"4204",
			"top":"6",
			"title":"16ms C++ solution",
			"vote":"13",
			"content":"The idea is to cut a value from the left of the string and then for each of operations '+', '-', '*' repeat the procedure recursively. The trick is to pass the sum of all left summands and the product of rightmost factors. This allows to calculate the left sum and the right product on the next step depending on the next chosen operation.\\n\\n    class Solution {\\n        typedef long long int i64;\\n        \\n        string myS;\\n        const char* s;\\n        i64 target;\\n        int slen;\\n        \\n    public:\\n      \\n        vector<string> addOperators(const string& num, int t) {\\n            myS = num;\\n            slen = myS.size();\\n            s = myS.c_str();\\n            target = t;\\n            \\n            vector<string> res;\\n            char buf[slen*2+1];\\n            \\n            int lmax = (s[0] == '0' ? 1 : slen);\\n            i64 v = 0;\\n            for (int l=1; l<=lmax; ++l) {\\n                int c = s[l-1];\\n                v = v*10 + (c-'0');   // add next digit\\n                buf[l-1] = c;  // only need to append the last digit\\n                processTail(0, v, l, buf, l, res);\\n            }\\n            return res;\\n        }\\n    \\n        void processTail(i64 prevsum, i64 last, int pos, char* buf, int bufpos, vector<string>& res) {\\n            if (pos == slen) {\\n                // end of string\\n                // check the value and save\\n                if (prevsum+last == target) {\\n                    buf[bufpos] = 0;\\n                    res.push_back(buf);\\n                }\\n                return;\\n            }\\n            \\n            int lmax = (s[pos] == '0' ? 1 : slen-pos); // don't allow multichar intergers starting from a '0'\\n            i64 v = 0;\\n            for (int l=1; l<=lmax; ++l) {\\n                int c = s[pos+l-1];\\n                v = v*10 + (c-'0');     // add next digit to v\\n    \\n                buf[bufpos] = '+';\\n                buf[bufpos+l] = c;      // only need to append the last digit of v\\n                processTail(prevsum+last, v, pos+l, buf, bufpos+l+1, res);\\n    \\n                buf[bufpos] = '-'; \\n                processTail(prevsum+last, -v, pos+l, buf, bufpos+l+1, res);\\n    \\n                buf[bufpos] = '*'; \\n                processTail(prevsum, last*v, pos+l, buf, bufpos+l+1, res);\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71967",
			"view":"3478",
			"top":"7",
			"title":"Elegant JAVA solution",
			"vote":"12",
			"content":"    public class Solution {\\n    List<String> result =new ArrayList<String>();\\n    public List<String> addOperators(String num, int target) {\\n        for(int i=1;i<=num.length();i++){\\n            if(i>=2 && num.charAt(0)=='0') continue;\\n            bfs(num.substring(i),num.substring(0,i),target,0,Long.parseLong(num.substring(0,i)),true);\\n        }\\n        return result;\\n    }\\n    \\n    public void bfs(String s,String trace,int target,long pre,long current,boolean sign){\\n        long sum = sign? pre+current:pre-current;\\n        if(s.length()==0){\\n            if(sum==(long) target) result.add(trace);\\n            return;\\n        }\\n        for(int i=1;i<=s.length();i++){\\n            if(i>=2 && s.charAt(0)=='0') continue;\\n            int number = Integer.parseInt(s.substring(0,i));\\n            bfs(s.substring(i),trace+\"+\"+number,target,sum,number,true);\\n            bfs(s.substring(i),trace+\"-\"+number,target,sum,number,false);\\n            bfs(s.substring(i),trace+\"*\"+number,target,pre,current*number,sign);\\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"71912",
			"view":"2464",
			"top":"8",
			"title":"Most solutions are dfs solution, who knows divide and conquer solution?",
			"vote":"11",
			"content":"who knows divide and conquer solution for this problem?"
		},
		{
			"lc_ans_id":"71921",
			"view":"3511",
			"top":"9",
			"title":"Java simple solution beats 96.56%",
			"vote":"10",
			"content":"Inspired by [this great solution][1]. \\n\\nWhat's different is, I use backtracking with `StringBuilder` instead of directly String addition.\\n\\nThis increase speed by `20%`.\\n\\n    public List<String> addOperators(String num, int target) {\\n        List<String> res = new ArrayList<>();\\n       \\tStringBuilder sb = new StringBuilder();\\n        dfs(res, sb, num, 0, target, 0, 0);\\n        return res;\\n        \\n    }\\n    public void dfs(List<String> res, StringBuilder sb, String num, int pos, int target, long prev, long multi) { \\n    \\tif(pos == num.length()) {\\n    \\t\\tif(target == prev) res.add(sb.toString());\\n    \\t\\treturn;\\n    \\t}\\n    \\tfor(int i = pos; i < num.length(); i++) {\\n    \\t\\tif(num.charAt(pos) == '0' && i != pos) break;\\n    \\t\\tlong curr = Long.parseLong(num.substring(pos, i + 1));\\n    \\t\\tint len = sb.length();\\n    \\t\\tif(pos == 0) {\\n    \\t\\t\\tdfs(res, sb.append(curr), num, i + 1, target, curr, curr); \\n    \\t\\t\\tsb.setLength(len);\\n    \\t\\t} else {\\n    \\t\\t\\tdfs(res, sb.append(\"+\").append(curr), num, i + 1, target, prev + curr, curr); \\n    \\t\\t\\tsb.setLength(len);\\n    \\t\\t\\tdfs(res, sb.append(\"-\").append(curr), num, i + 1, target, prev - curr, -curr); \\n    \\t\\t\\tsb.setLength(len);\\n    \\t\\t\\tdfs(res, sb.append(\"*\").append(curr), num, i + 1, target, prev - multi + multi * curr, multi * curr); \\n    \\t\\t\\tsb.setLength(len);\\n    \\t\\t}\\n    \\t}\\n    }\\n\\n\\n  [1]: https://leetcode.com/discuss/58614/java-standard-backtrace-ac-solutoin-short-and-clear"
		}
	],
	"id":"282",
	"title":"Expression Add Operators",
	"content":"<p>\r\nGiven a string that contains only digits <code>0-9</code> and a target value, return all possibilities to add <b>binary</b> operators (not unary) <code>+</code>, <code>-</code>, or <code>*</code> between the digits so they evaluate to the target value.\r\n</p>\r\n<p>\r\nExamples: <br/>\r\n<pre>\"123\", 6 -> [\"1+2+3\", \"1*2*3\"] \r\n\"232\", 8 -> [\"2*3+2\", \"2+3*2\"]\r\n\"105\", 5 -> [\"1*0+5\",\"10-5\"]\r\n\"00\", 0 -> [\"0+0\", \"0-0\", \"0*0\"]\r\n\"3456237490\", 9191 -> []\r\n</pre>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/davidtan1890\">@davidtan1890</a> for adding this problem and creating all test cases.</p>",
	"frequency":"381",
	"ac_num":"43080"
}