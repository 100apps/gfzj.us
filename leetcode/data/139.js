{
	"difficulty":"2",
	"submit_num":"617395",
	"show_id":"139",
	"leetcode_id":"139",
	"answers":[
		{
			"lc_ans_id":"43790",
			"view":"67468",
			"top":"0",
			"title":"Java implementation using DP in two ways",
			"vote":"181",
			"content":"    public class Solution {\\n        public boolean wordBreak(String s, Set<String> dict) {\\n            \\n            boolean[] f = new boolean[s.length() + 1];\\n            \\n            f[0] = true;\\n            \\n            \\n            /* First DP\\n            for(int i = 1; i <= s.length(); i++){\\n                for(String str: dict){\\n                    if(str.length() <= i){\\n                        if(f[i - str.length()]){\\n                            if(s.substring(i-str.length(), i).equals(str)){\\n                                f[i] = true;\\n                                break;\\n                            }\\n                        }\\n                    }\\n                }\\n            }*/\\n            \\n            //Second DP\\n            for(int i=1; i <= s.length(); i++){\\n                for(int j=0; j < i; j++){\\n                    if(f[j] && dict.contains(s.substring(j, i))){\\n                        f[i] = true;\\n                        break;\\n                    }\\n                }\\n            }\\n            \\n            return f[s.length()];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"43814",
			"view":"26951",
			"top":"1",
			"title":"C++ Dynamic Programming simple and fast solution (4ms) with optimization",
			"vote":"90",
			"content":"We use a boolean vector dp[]. dp[***i***] is set to true if a valid word (word sequence) ends there. The optimization is to look from current position ***i*** back and only substring and do dictionary look up in case the preceding position ***j*** with *dp[**j**] == true* is found.\\n\\n    bool wordBreak(string s, unordered_set<string> &dict) {\\n            if(dict.size()==0) return false;\\n            \\n            vector<bool> dp(s.size()+1,false);\\n            dp[0]=true;\\n            \\n            for(int i=1;i<=s.size();i++)\\n            {\\n                for(int j=i-1;j>=0;j--)\\n                {\\n                    if(dp[j])\\n                    {\\n                        string word = s.substr(j,i-j);\\n                        if(dict.find(word)!= dict.end())\\n                        {\\n                            dp[i]=true;\\n                            break; //next i\\n                        }\\n                    }\\n                }\\n            }\\n            \\n            return dp[s.size()];\\n        }"
		},
		{
			"lc_ans_id":"43797",
			"view":"26178",
			"top":"2",
			"title":"A solution using BFS",
			"vote":"72",
			"content":"People have posted elegant solutions using DP. The solution I post below using BFS is no better than those. Just to share some new thoughts.\\n\\nWe can use a graph to represent the possible solutions. The vertices of the graph are simply the positions of the first characters of the words and each edge actually represents a word. For example, the input string is \"nightmare\", there are two ways to break it, \"night mare\" and \"nightmare\". The graph would be\\n\\n0-->5-->9\\n\\n|__ __ _^\\n\\nThe question is simply to check if there is a path from 0 to 9. The most efficient way is traversing the graph using BFS with the help of a queue and a hash set. The hash set is used to keep track of the visited nodes to avoid repeating the same work. \\n\\nFor this problem, the time complexity is O(n^2) and space complexity is O(n), the same with DP. This idea can be used to solve the problem word break II. We can simple construct the graph using BFS, save it into a map and then find all the paths using DFS. \\n\\n    bool wordBreak(string s, unordered_set<string> &dict) {\\n        // BFS\\n        queue<int> BFS;\\n        unordered_set<int> visited;\\n        \\n        BFS.push(0);\\n        while(BFS.size() > 0)\\n        {\\n            int start = BFS.front();\\n            BFS.pop();\\n            if(visited.find(start) == visited.end())\\n            {\\n                visited.insert(start);\\n                for(int j=start; j<s.size(); j++)\\n                {\\n                    string word(s, start, j-start+1);\\n                    if(dict.find(word) != dict.end())\\n                    {\\n                        BFS.push(j+1);\\n                        if(j+1 == s.size())\\n                            return true;\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"43808",
			"view":"13316",
			"top":"3",
			"title":"Simple DP solution in Python with description",
			"vote":"40",
			"content":"The idea is the following:\\n\\n- d is an array that contains booleans\\n\\n- d[i] is True if there is a word in the dictionary that *ends* at ith index of s AND d is also True at the beginning of the word\\n\\n\\nExample:\\n\\n- s = \"leetcode\"\\n\\n- words = [\"leet\", \"code\"]\\n\\n- d[3] is True because there is \"leet\" in the dictionary that ends at 3rd index of \"leetcode\"\\n\\n- d[7] is True because there is \"code\" in the dictionary that ends at the 7th index of \"leetcode\" AND d[3] is True\\n\\nThe result is the last index of d.\\n\\n    def word_break(s, words):\\n     \\td = [False] * len(s)    \\n     \\tfor i in range(len(s)):\\n     \\t\\tfor w in words:\\n     \\t\\t\\tif w == s[i-len(w)+1:i+1] and (d[i-len(w)] or i-len(w) == -1):\\n     \\t\\t\\t\\td[i] = True\\n     \\treturn d[-1]"
		},
		{
			"lc_ans_id":"43788",
			"view":"9750",
			"top":"4",
			"title":"4 lines in Python",
			"vote":"39",
			"content":"`ok[i]` tells whether `s[:i]` can be built.\\n\\n    def wordBreak(self, s, words):\\n        ok = [True]\\n        for i in range(1, len(s)+1):\\n            ok += any(ok[j] and s[j:i] in words for j in range(i)),\\n        return ok[-1]"
		},
		{
			"lc_ans_id":"43796",
			"view":"11050",
			"top":"5",
			"title":"Accepted Java Solution",
			"vote":"33",
			"content":"    public class Solution {\\n        public boolean wordBreak(String s, Set<String> dict) {\\n            boolean [] breakable = new boolean[s.length()+1];\\n            breakable[0] = true;\\n    \\n            for(int i=1;i<=s.length();i++){\\n                for(int j=0;j<i;j++){\\n                    if(breakable[j]&&dict.contains(s.substring(j,i))){\\n                        breakable[i] = true;\\n                        break;\\n                    }\\n                }\\n            }\\n            return breakable[s.length()];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"44054",
			"view":"2747",
			"top":"6",
			"title":"Java DP solution",
			"vote":"29",
			"content":"    public boolean wordBreak(String s, Set<String> dict) {\\n      if (s == null || s.length() == 0) return false;\\n      \\n      int n = s.length();\\n      \\n      // dp[i] represents whether s[0...i] can be formed by dict\\n      boolean[] dp = new boolean[n];\\n      \\n      for (int i = 0; i < n; i++) {\\n        for (int j = 0; j <= i; j++) {\\n          String sub = s.substring(j, i + 1);\\n          \\n          if (dict.contains(sub) && (j == 0 || dp[j - 1])) {\\n            dp[i] = true;\\n            break;\\n          }\\n        }\\n      }\\n      \\n      return dp[n - 1];\\n    }"
		},
		{
			"lc_ans_id":"43916",
			"view":"4449",
			"top":"7",
			"title":"A concise Java solution. (11-line in wordBreak function)",
			"vote":"27",
			"content":"    public class Solution {\\n        \\n        public boolean wordBreak(String s, Set<String> wordDict) {\\n            int len = s.length();\\n            boolean[] f = new boolean[len+1];\\n            f[0] = true;\\n            for (int i=1; i<len+1; i++)\\n                for (int j=0; j<i; j++)\\n                    if (f[j] && wordDict.contains(s.substring(j,i)))\\n                    {\\n                        f[i] = true;\\n                        break;\\n                    }\\n            return f[len];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"43819",
			"view":"4771",
			"top":"8",
			"title":"DFS with Path Memorizing Java Solution",
			"vote":"27",
			"content":"I write this method by what I learned from @[mahdy][1] in his post [Decode Ways][2]\\n\\nUse a set to record all position that cannot find a match in dict. That cuts down the run time of DFS to O(n^2)\\n\\n    public class Solution {\\n        public boolean wordBreak(String s, Set<String> dict) {\\n            // DFS\\n            Set<Integer> set = new HashSet<Integer>();\\n            return dfs(s, 0, dict, set);\\n        }\\n        \\n        private boolean dfs(String s, int index, Set<String> dict, Set<Integer> set){\\n            // base case\\n            if(index == s.length()) return true;\\n            // check memory\\n            if(set.contains(index)) return false;\\n            // recursion\\n            for(int i = index+1;i <= s.length();i++){\\n                String t = s.substring(index, i);\\n                if(dict.contains(t))\\n                    if(dfs(s, i, dict, set))\\n                        return true;\\n                    else\\n                        set.add(i);\\n            }\\n            set.add(index);\\n            return false;\\n        }\\n    }\\n\\n\\n  [1]: https://oj.leetcode.com/discuss/user/mahdy\\n  [2]: https://oj.leetcode.com/discuss/23872/sharing-my-java-memoized-solution"
		},
		{
			"lc_ans_id":"44011",
			"view":"3178",
			"top":"9",
			"title":"Java solution using DP",
			"vote":"22",
			"content":"    public boolean wordBreak(String s, Set<String> wordDict) {\\n        if (s == null && wordDict == null)\\n            return true;\\n        if (s == null || wordDict == null)\\n            return false;\\n        //dp[i] represents if s.substring(0, i) is wordbreakable.\\n        boolean[] dp = new boolean[s.length()+1];\\n        dp[0] = true;\\n        for (int i = 1; i <= s.length(); i++) {\\n            for (int j = 0; j < i; j++) {\\n                if (dp[j] && wordDict.contains(s.substring(j, i))) {\\n                    dp[i] = true;\\n                    break;\\n                }\\n            }\\n        }\\n        return dp[s.length()];\\n    }"
		}
	],
	"id":"139",
	"title":"Word Break",
	"content":"<p>\r\nGiven a <b>non-empty</b> string <i>s</i> and a dictionary <i>wordDict</i> containing a list of <b>non-empty</b> words, determine if <i>s</i> can be segmented into a space-separated sequence of one or more dictionary words. You may assume the dictionary does not contain duplicate words.\r\n</p>\r\n\r\n<p>For example, given<br>\r\n<i>s</i> = <code>\"leetcode\"</code>,<br>\r\n<i>dict</i> = <code>[\"leet\", \"code\"]</code>.\r\n</p>\r\n\r\n<p>\r\nReturn true because <code>\"leetcode\"</code> can be segmented as <code>\"leet code\"</code>.\r\n</p>\r\n\r\n<p>\r\n<b><font color=\"red\">UPDATE (2017/1/4):</font></b><br />\r\nThe <i>wordDict</i> parameter had been changed to a list of strings (instead of a set of strings). Please reload the code definition to get the latest changes.\r\n</p>",
	"frequency":"544",
	"ac_num":"192077"
}