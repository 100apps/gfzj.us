{
	"difficulty":"2",
	"submit_num":"323715",
	"show_id":"131",
	"leetcode_id":"131",
	"answers":[
		{
			"lc_ans_id":"41963",
			"view":"30793",
			"top":"0",
			"title":"Java: Backtracking solution.",
			"vote":"132",
			"content":"if the input is \"aab\", check if [0,0] \"a\" is palindrome. then check [0,1] \"aa\", then [0,2] \"aab\".\\nWhile checking [0,0], the rest of string is \"ab\",  use ab as input to make a recursive call.\\n![enter image description here][1]\\n\\nin this example, in the loop of i=l+1, a recursive call will be made with input = \"ab\".\\nEvery time a recursive call is made, the position of l move right. \\n\\nHow to define a correct answer?\\nThink about DFS, if the current string to be checked (Palindrome) contains the last position, in this case \"c\", this path is a correct answer, otherwise, it's a false answer.\\n\\n![enter image description here][2]\\n\\nline 13:  is the boundary to check if the current string contains the last element. \\n l>=s.length()  \\n\\n    public class Solution {\\n            List<List<String>> resultLst;\\n    \\t    ArrayList<String> currLst;\\n    \\t    public List<List<String>> partition(String s) {\\n    \\t        resultLst = new ArrayList<List<String>>();\\n    \\t        currLst = new ArrayList<String>();\\n    \\t        backTrack(s,0);\\n    \\t        return resultLst;\\n    \\t    }\\n    \\t    public void backTrack(String s, int l){\\n    \\t        if(currLst.size()>0 //the initial str could be palindrome\\n    \\t            && l>=s.length()){\\n    \\t                List<String> r = (ArrayList<String>) currLst.clone();\\n    \\t                resultLst.add(r);\\n    \\t        }\\n    \\t        for(int i=l;i<s.length();i++){\\n    \\t            if(isPalindrome(s,l,i)){\\n    \\t                if(l==i)\\n    \\t                    currLst.add(Character.toString(s.charAt(i)));\\n    \\t                else\\n    \\t                    currLst.add(s.substring(l,i+1));\\n    \\t                backTrack(s,i+1);\\n    \\t                currLst.remove(currLst.size()-1);\\n    \\t            }\\n    \\t        }\\n    \\t    }\\n    \\t    public boolean isPalindrome(String str, int l, int r){\\n    \\t        if(l==r) return true;\\n    \\t        while(l<r){\\n    \\t            if(str.charAt(l)!=str.charAt(r)) return false;\\n    \\t            l++;r--;\\n    \\t        }\\n    \\t        return true;\\n    \\t    }\\n    }\\n\\n\\n  [1]: http://1.bp.blogspot.com/-3g_qWEIsyUI/VJR0Co__PcI/AAAAAAAAAfg/okeb7u1mZnI/s1600/test.png\\n  [2]: http://i58.tinypic.com/2la69p2.png"
		},
		{
			"lc_ans_id":"41974",
			"view":"22120",
			"top":"1",
			"title":"My Java DP only solution without recursion. O(n^2)",
			"vote":"77",
			"content":"  \\n\\n           \\n    public class Solution {\\n     \\tpublic static List<List<String>> partition(String s) {\\n    \\t\\tint len = s.length();\\n    \\t\\tList<List<String>>[] result = new List[len + 1];\\n    \\t\\tresult[0] = new ArrayList<List<String>>();\\n    \\t\\tresult[0].add(new ArrayList<String>());\\n    \\n    \\t\\tboolean[][] pair = new boolean[len][len];\\n    \\t\\tfor (int i = 0; i < s.length(); i++) {\\n    \\t\\t\\tresult[i + 1] = new ArrayList<List<String>>();\\n    \\t\\t\\tfor (int left = 0; left <= i; left++) {\\n    \\t\\t\\t\\tif (s.charAt(left) == s.charAt(i) && (i-left <= 1 || pair[left + 1][i - 1])) {\\n    \\t\\t\\t\\t\\tpair[left][i] = true;\\n    \\t\\t\\t\\t\\tString str = s.substring(left, i + 1);\\n    \\t\\t\\t\\t\\tfor (List<String> r : result[left]) {\\n    \\t\\t\\t\\t\\t\\tList<String> ri = new ArrayList<String>(r);\\n    \\t\\t\\t\\t\\t\\tri.add(str);\\n    \\t\\t\\t\\t\\t\\tresult[i + 1].add(ri);\\n    \\t\\t\\t\\t\\t}\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn result[len];\\n    \\t}\\n    }\\n\\nHere the **pair** is to mark a range for the substring is a Pal. if pair[i][j] is true, that means sub string from i to j is pal.\\n\\nThe **result[i]**, is to store from beginng until current index i (Non inclusive), all possible partitions. From the past result we can determine current result."
		},
		{
			"lc_ans_id":"41964",
			"view":"10715",
			"top":"2",
			"title":"Clean C++ backtracking solution",
			"vote":"54",
			"content":"The Idea is simple: loop through the string, check if substr(0, i) is palindrome. If it is, recursively call dfs() on the rest of sub string: substr(i+1, length). keep the current palindrome partition so far in the 'path' argument of dfs(). When reaching the end of string, add current partition in the result.\\n\\n    class Solution {\\n    public:\\n        vector<vector<string>> partition(string s) {\\n            vector<vector<string> > ret;\\n            if(s.empty()) return ret;\\n            \\n            vector<string> path;\\n            dfs(0, s, path, ret);\\n            \\n            return ret;\\n        }\\n        \\n        void dfs(int index, string& s, vector<string>& path, vector<vector<string> >& ret) {\\n            if(index == s.size()) {\\n                ret.push_back(path);\\n                return;\\n            }\\n            for(int i = index; i < s.size(); ++i) {\\n                if(isPalindrome(s, index, i)) {\\n                    path.push_back(s.substr(index, i - index + 1));\\n                    dfs(i+1, s, path, ret);\\n                    path.pop_back();\\n                }\\n            }\\n        }\\n        \\n        bool isPalindrome(const string& s, int start, int end) {\\n            while(start <= end) {\\n                if(s[start++] != s[end--])\\n                    return false;\\n            }\\n            return true;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"41982",
			"view":"7625",
			"top":"3",
			"title":"Java DP + DFS solution",
			"vote":"46",
			"content":"The normal dfs backtracking will need to check each substring for palindrome, but a dp array can be used to record the possible break for palindrome before we start recursion.\\n\\nEdit:\\nSharing my thought process:\\nfirst, I ask myself that how to check if a string is palindrome or not, usually a two point solution scanning from front and back.  Here if you want to get all the possible palindrome partition, first a nested for loop to get every possible partitions for a string, then a scanning for all the partitions.  That's a O(n^2) for partition and O(n^2) for the scanning of string, totaling at O(n^4) just for the partition.  However, if we use a 2d array to keep track of any string we have scanned so far, with an addition pair, we can determine whether it's palindrome or not by justing looking at that pair, which is this line `if(s.charAt(i) == s.charAt(j) && (i - j <= 2 || dp[j+1][i-1]))`.  This way, the 2d array `dp` contains the possible palindrome partition among all.  \\n\\nsecond, based on the prescanned palindrome partitions saved in dp array, a simple backtrack does the job.\\n\\n    public class Solution {\\n        public List<List<String>> partition(String s) {\\n            List<List<String>> res = new ArrayList<>();\\n            boolean[][] dp = new boolean[s.length()][s.length()];\\n            for(int i = 0; i < s.length(); i++) {\\n                for(int j = 0; j <= i; j++) {\\n                    if(s.charAt(i) == s.charAt(j) && (i - j <= 2 || dp[j+1][i-1])) {\\n                        dp[j][i] = true;\\n                    }\\n                }\\n            }\\n            helper(res, new ArrayList<>(), dp, s, 0);\\n            return res;\\n        }\\n        \\n        private void helper(List<List<String>> res, List<String> path, boolean[][] dp, String s, int pos) {\\n            if(pos == s.length()) {\\n                res.add(new ArrayList<>(path));\\n                return;\\n            }\\n            \\n            for(int i = pos; i < s.length(); i++) {\\n                if(dp[pos][i]) {\\n                    path.add(s.substring(pos,i+1));\\n                    helper(res, path, dp, s, i+1);\\n                    path.remove(path.size()-1);\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"42025",
			"view":"6667",
			"top":"4",
			"title":"1-liner Python, Ruby",
			"vote":"32",
			"content":"Python:\\n\\nBroken into several physical lines for readability, but still one logical line and just one simple statement.\\n\\n    def partition(self, s):\\n        return [[s[:i]] + rest\\n                for i in xrange(1, len(s)+1)\\n                if s[:i] == s[i-1::-1]\\n                for rest in self.partition(s[i:])] or [[]]\\n\\nRuby:\\n\\n    def partition(s)\\n      s == '' ? [[]] : s.size.times.flat_map { |i| s[0..i] != s[0..i].reverse ? [] :\\n        partition(s[i+1..-1]).map { |rest| [s[0..i]] + rest }\\n      }\\n    end"
		},
		{
			"lc_ans_id":"42101",
			"view":"4914",
			"top":"5",
			"title":"12ms 14-lines C++",
			"vote":"29",
			"content":"The problem has a nice structure that backtracking naturally fits in. The structure is, given a starting position `idx`, we search from `idx` till the end of the string `s.length() - 1`. Once we reach a position `i` such that the sub-string from `idx` to `i` (`s.substr(idx, i  - idx + 1)`) is a palindrome, we add it to a temporary `tmp`. Then we recursively call the same function to process the remaining sub-string. Once we reach the end of the string, we add `tmp` into the result `res` of all the possible partitioning.\\n \\nThen, **backtracking** happens! Remember that at position `i`, we find `s.substr(idx, i - idx + 1)` to be a palindrome and we immediately add it to `tmp`. It is obvious that there may be some position `j` such that `j > i` and `s.substr(idx, j - idx + 1)` is also a palindrome. So we need to recover to the state before adding `s.substr(idx, i - idx + 1)` to `tmp` and continue to find the next palindrome position after `i`. And we simply need to pop `s.substr(idx, i - idx + 1)` out of `tmp` to make things work.  \\n \\nPutting these together, we can write down the following code, which should be self-explanatory.\\n\\n    class Solution {\\n    public:\\n        vector<vector<string>> partition(string s) {\\n            vector<vector<string>> res;\\n            vector<string> tmp;\\n            getPartition(s, 0, tmp, res);\\n            return res;\\n        }\\n    private: \\n        void getPartition(string& s, int idx, vector<string>& tmp, vector<vector<string>>& res) {\\n            if (idx == s.length()) {\\n                res.push_back(tmp);\\n                return;\\n            }\\n            for (int i = idx, n = s.length(); i < n; i++) {\\n                int l = idx, r = i;\\n                while (l < r && s[l] == s[r]) l++, r--;\\n                if (l >= r) {\\n                    tmp.push_back(s.substr(idx, i - idx + 1));\\n                    getPartition(s, i + 1, tmp, res);\\n                    tmp.pop_back();\\n                }\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"41973",
			"view":"2182",
			"top":"6",
			"title":"Python recursive/iterative backtracking solution",
			"vote":"21",
			"content":"Inspired by caikehe's solution:\\n\\n    def partition(self, s):\\n        res = []\\n        self.dfs(s, [], res)\\n        return res\\n    \\n    def dfs(self, s, path, res):\\n        if not s:\\n            res.append(path)\\n            return\\n        for i in range(1, len(s)+1):\\n            if self.isPal(s[:i]):\\n                self.dfs(s[i:], path+[s[:i]], res)\\n        \\n    def isPal(self, s):\\n        return s == s[::-1]"
		},
		{
			"lc_ans_id":"42023",
			"view":"3226",
			"top":"7",
			"title":"Concise Java Solution",
			"vote":"19",
			"content":"    public class Solution {\\n        public List<List<String>> partition(String s) {\\n            List<List<String>> res=new ArrayList<List<String>>();\\n            if(s.length()==0)return res;\\n            recur(res,new ArrayList<String>(),s);\\n            return res;\\n        }\\n        \\n        public void recur(List<List<String>> res,List<String> temp, String s){\\n            if(s.length()==0){\\n                res.add(new ArrayList<String>(temp));\\n                return;\\n            }\\n            for(int i=0;i<s.length();i++){\\n                if(isPalin(s.substring(0,i+1))){\\n                    temp.add(s.substring(0,i+1));\\n                    recur(res,temp,s.substring(i+1));\\n                    temp.remove(temp.size()-1);\\n                }\\n            }\\n        }\\n        \\n        public boolean isPalin(String s){\\n            for(int i=0;i<s.length()/2;i++){\\n                if(s.charAt(i)!=s.charAt(s.length()-1-i))return false;\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"42134",
			"view":"1476",
			"top":"8",
			"title":"My c++ solution 13ms backtracking",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        void palPart (vector<vector<string>> &ans,vector<string> &temp,string s,int j){\\n            if(s.size()==0)\\n                return;\\n            //\\u7279\\u6b8a\\u8f93\\u5165\\n            if(j>s.size()-1){\\n            ans.push_back(temp);\\n            return;\\n            }\\n            //\\u8fb9\\u754c\\u6761\\u4ef6\\uff0c\\u5f88\\u91cd\\u8981\\n            int m,n,l;\\n            \\n            for(m=s.size()-1;m>=j;m--){\\n                l=j;\\n                n=m;\\n                \\n                while(l<n&&s[l]==s[n]){\\n                    \\n                    l++;\\n                    n--;\\n                    \\n                }//\\u5224\\u65ads(j,m)\\u662f\\u4e0d\\u662f\\u56de\\u6587\\n                if(l>=n){\\n                    \\n                    temp.push_back(s.substr(j,m-j+1));//\\u5b50\\u4e32\\u5165\\u6808\\n                    \\n                    palPart(ans,temp,s,m+1);//\\u904d\\u5386\\n                    \\n                    temp.pop_back();//\\u904d\\u5386\\u5b8c\\u6bd5\\uff0c\\u5b50\\u4e32\\u51fa\\u6808\\n                }\\n            }\\n        }\\n    \\n        vector<vector<string>> partition(string s) {\\n        vector<vector<string> >  ans;\\n        vector<string> temp;\\n        palPart (ans,temp,s,0);\\n        return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"42136",
			"view":"1444",
			"top":"9",
			"title":"Concise Java solution",
			"vote":"7",
			"content":"DFS to find every combinations of the string, if the substring is not Palindrome, ignore it then go to the next.\\n\\n    public class Solution {\\n        List<List<String>> result = new ArrayList<List<String>>();\\n        public List<List<String>> partition(String s) {\\n            helper(s, new ArrayList<String>());\\n            return result;\\n        }        \\n        \\n        public void helper(String s, List<String> cur){                 //DFS every combinations\\n            if(s.length() == 0){result.add(cur); return;}        \\n            for(int i = 1; i <= s.length(); i++){\\n                String sub = s.substring(0,i);\\n                if(isPal(sub)){\\n                    List<String> newList = new ArrayList<String>(cur);\\n                    newList.add(sub);\\n                    helper(s.substring(i,s.length()), newList);\\n                }\\n                else continue;                                    //not palindrome, ignore it\\n            }        \\n        }                \\n        \\n        public boolean isPal(String str){\\n            int l = 0;\\n            int r = str.length()-1;\\n            while(l <= r){\\n                if(str.charAt(l) != str.charAt(r))  return false;\\n                l++;r--;\\n            }\\n            return true;\\n        }\\n    } \\n\\n\\nnote: I found some people using the same method of mine, but they like to call their methods \"backtracking\", it is actually DFS, note backtracking."
		}
	],
	"id":"131",
	"title":"Palindrome Partitioning",
	"content":"<p>\r\nGiven a string <i>s</i>, partition <i>s</i> such that every substring of the partition is a palindrome.\r\n</p>\r\n<p>\r\nReturn all possible palindrome partitioning of <i>s</i>.\r\n</p>\r\n<p>\r\nFor example, given <i>s</i> = <code>\"aab\"</code>,<br />\r\n\r\nReturn\r\n<pre>\r\n[\r\n  [\"aa\",\"b\"],\r\n  [\"a\",\"a\",\"b\"]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"359",
	"ac_num":"113255"
}