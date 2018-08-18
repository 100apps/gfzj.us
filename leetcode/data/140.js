{
	"difficulty":"3",
	"submit_num":"439701",
	"show_id":"140",
	"leetcode_id":"140",
	"answers":[
		{
			"lc_ans_id":"44167",
			"view":"42071",
			"top":"0",
			"title":"My concise JAVA solution based on memorized DFS",
			"vote":"124",
			"content":"**Explanation**\\n\\nUsing DFS directly will lead to TLE, so I just used HashMap to save the previous results to prune duplicated branches, as the following:\\n \\n\\n    public List<String> wordBreak(String s, Set<String> wordDict) {\\n        return DFS(s, wordDict, new HashMap<String, LinkedList<String>>());\\n    }       \\n    \\n    // DFS function returns an array including all substrings derived from s.\\n    List<String> DFS(String s, Set<String> wordDict, HashMap<String, LinkedList<String>>map) {\\n        if (map.containsKey(s)) \\n            return map.get(s);\\n            \\n        LinkedList<String>res = new LinkedList<String>();     \\n        if (s.length() == 0) {\\n            res.add(\"\");\\n            return res;\\n        }               \\n        for (String word : wordDict) {\\n            if (s.startsWith(word)) {\\n                List<String>sublist = DFS(s.substring(word.length()), wordDict, map);\\n                for (String sub : sublist) \\n                    res.add(word + (sub.isEmpty() ? \"\" : \" \") + sub);               \\n            }\\n        }       \\n        map.put(s, res);\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"44178",
			"view":"23121",
			"top":"1",
			"title":"11ms C++ solution (concise)",
			"vote":"83",
			"content":"    class Solution {\\n        unordered_map<string, vector<string>> m;\\n    \\n        vector<string> combine(string word, vector<string> prev){\\n            for(int i=0;i<prev.size();++i){\\n                prev[i]+=\" \"+word;\\n            }\\n            return prev;\\n        }\\n    \\n    public:\\n        vector<string> wordBreak(string s, unordered_set<string>& dict) {\\n            if(m.count(s)) return m[s]; //take from memory\\n            vector<string> result;\\n            if(dict.count(s)){ //a whole string is a word\\n                result.push_back(s);\\n            }\\n            for(int i=1;i<s.size();++i){\\n                string word=s.substr(i);\\n                if(dict.count(word)){\\n                    string rem=s.substr(0,i);\\n                    vector<string> prev=combine(word,wordBreak(rem,dict));\\n                    result.insert(result.end(),prev.begin(), prev.end());\\n                }\\n            }\\n            m[s]=result; //memorize\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"44185",
			"view":"14831",
			"top":"2",
			"title":"Getting rid of TLE",
			"vote":"46",
			"content":"if you are getting TLE despite the correct DP or DFS solution, it might be because the largest test input is like this\\n\\n    \\n\\n> [\"aa..(lots of 'a').b\", \"a\",\"aaaaa\"...so on]\\n\\nAs you can see this test case should return empty  as last character in input string is **b**, which is not in the dictionary. So all the work in DP/DFS is a waste\\n\\nTo escape from TLE, just put a check first whether the input string **s** is breakable or not..if breakable then try to break it using your algo"
		},
		{
			"lc_ans_id":"44169",
			"view":"11758",
			"top":"3",
			"title":"9 lines Python, 10 lines C++",
			"vote":"40",
			"content":"`sentences(i)` returns a list of all sentences that can be built from the suffix `s[i:]`.\\n\\n**Python:**\\n\\n    def wordBreak(self, s, wordDict):\\n        memo = {len(s): ['']}\\n        def sentences(i):\\n            if i not in memo:\\n                memo[i] = [s[i:j] + (tail and ' ' + tail)\\n                           for j in range(i+1, len(s)+1)\\n                           if s[i:j] in wordDict\\n                           for tail in sentences(j)]\\n            return memo[i]\\n        return sentences(0)\\n\\n**C++:**\\n\\n    vector<string> wordBreak(string s, unordered_set<string>& wordDict) {\\n        unordered_map<int, vector<string>> memo {{s.size(), {\"\"}}};\\n        function<vector<string>(int)> sentences = [&](int i) {\\n            if (!memo.count(i))\\n                for (int j=i+1; j<=s.size(); j++)\\n                    if (wordDict.count(s.substr(i, j-i)))\\n                        for (string tail : sentences(j))\\n                            memo[i].push_back(s.substr(i, j-i) + (tail==\"\" ? \"\" : ' ' + tail));\\n            return memo[i];\\n        };\\n        return sentences(0);\\n    }"
		},
		{
			"lc_ans_id":"44255",
			"view":"17700",
			"top":"4",
			"title":"My concise answer.",
			"vote":"34",
			"content":"    public class Solution {\\n    public List<String> wordBreak(String s, Set<String> dict) {\\n        List<String> result = new ArrayList<String>();\\n        for(int j = s.length() - 1; j >= 0; j--){\\n            if(dict.contains(s.substring(j)))\\n                break;\\n            else{\\n                if(j == 0)\\n                    return result;\\n            }\\n        }\\n        for(int i = 0; i < s.length()-1; i++)\\n        {\\n            if(dict.contains(s.substring(0,i+1)))\\n            {\\n                List<String> strs = wordBreak(s.substring(i+1,s.length()),dict);\\n                if(strs.size() != 0)\\n                    for(Iterator<String> it = strs.iterator();it.hasNext();)\\n                    {\\n                        result.add(s.substring(0,i+1)+\" \"+it.next());\\n                    }\\n            }\\n        }\\n        if(dict.contains(s)) result.add(s);\\n        return result;\\n    }\\n}"
		},
		{
			"lc_ans_id":"44179",
			"view":"5883",
			"top":"5",
			"title":"Slightly modified DP Java solution",
			"vote":"32",
			"content":"Hi guys!\\n\\nThere's a lot of concern in other posts about \"aaaa...aab\" test case that causes TLE when we run through our string not in reverse but from start to end. I've thought a bit on how to add a tiny modification and make just the whole thing more effective, not only pass the TLE case. \\n\\nThe approach is the same as before: we loop through all possible prefixes checking if it in the dictionary and caching the results. \\n\\nBut just before jumping into recursion we could also check that the right reminder has a prefix from the dictionary, because if it hasn't then there's no sense in splitting the reminder into sub-strings. It's just a linear check, which I think also could be optimized with some caching but even without optimization the solution is accepted. And also the code looks quite understandable.\\n\\n    public class Solution {\\n\\n        private final Map<String, List<String>> cache = new HashMap<>();\\n    \\n        private boolean containsSuffix(Set<String> dict, String str) {\\n            for (int i = 0; i < str.length(); i++) {\\n                if (dict.contains(str.substring(i))) return true;\\n            }\\n            return false;\\n        }\\n    \\n        public List<String> wordBreak(String s, Set<String> dict) {\\n            if (cache.containsKey(s)) return cache.get(s);\\n            List<String> result = new LinkedList<>();\\n            if (dict.contains(s)) result.add(s);\\n            for (int i = 1; i < s.length(); i++) {\\n                String left = s.substring(0,i), right = s.substring(i);\\n                if (dict.contains(left) && containsSuffix(dict, right)) {\\n                    for (String ss : wordBreak(right, dict)) {\\n                        result.add(left + \" \" + ss);\\n                    }\\n                }\\n            }\\n            cache.put(s, result);\\n            return result;\\n        }\\n    }\\n\\nHope it helps!"
		},
		{
			"lc_ans_id":"44399",
			"view":"9990",
			"top":"6",
			"title":"Two different strategies about DP get different results",
			"vote":"30",
			"content":"firstly I used DP from head of the string to  traverse the dp-map: and then got a \\u201cTime Limit Exceeded\\u201d Error with the unpassed case \"aaaaaaaaa....ab\", but this method can pass such case like \"baaaaaa....a\"\\n\\nsecondly I found the answer on internet with the dp-strategy, and saw  the dp-method  from tail of the string to  traverse the dp-map, then got an \"Accepted\" ,but i tested the case like \"baaaaaa....a\" on my own computer ,finally the result is \\u201cTime Limit Exceeded\\u201d\\n\\nabove all, i think the two strategies are the same ; and the OJ's test cases may have some infulence on different methods!"
		},
		{
			"lc_ans_id":"44299",
			"view":"4259",
			"top":"7",
			"title":"Java 6ms simple solution beating 88%",
			"vote":"24",
			"content":"    public class Solution {\\n        HashMap<Integer, List<String>> dp = new HashMap<>();\\n\\n        public List<String> wordBreak(String s, Set<String> wordDict) {\\n            int maxLength = -1;\\n            for(String ss : wordDict) maxLength = Math.max(maxLength, ss.length());\\n            return addSpaces(s, wordDict, 0, maxLength);\\n        }\\n        \\n        private List<String> addSpaces(String s, Set<String> wordDict, int start, int max){\\n            List<String> words = new ArrayList<>();\\n            if(start == s.length()) {\\n                words.add(\"\");\\n                return words;\\n            }\\n            for(int i = start + 1; i <= max + start && i <= s.length(); i++){\\n                String temp = s.substring(start, i);\\n                if(wordDict.contains(temp)){\\n                    List<String> ll;\\n                    if(dp.containsKey(i)) ll = dp.get(i);\\n                    else ll = addSpaces(s, wordDict, i, max);\\n                    for(String ss : ll) words.add(temp + (ss.equals(\"\") ? \"\" : \" \") + ss);\\n                }\\n                \\n            }\\n            dp.put(start, words);\\n            return words;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"44400",
			"view":"4171",
			"top":"8",
			"title":"Please add test case 'baaaaaaaa...aaaa', ['a', 'aa', 'aaa', ..., 'aaa...aa']",
			"vote":"24",
			"content":"The topic has been well discussed in many posts such as [here](https://oj.leetcode.com/discuss/12936/accepted-solution-backtracking-difference-front-tracking) and [here](https://oj.leetcode.com/discuss/8830/two-different-strategies-about-dp-get-different-results). Because the existence of test case `'aaaaa...aaaab', ['a', 'aa', 'aaa', ... 'aaa...aa']`, the forward DP solution will cause MLE while the backward DP is just fine, apparently the test case `'baaaaaaaa...aaaa', ['a', 'aa', 'aaa', ..., 'aaa...aa']` should also be included."
		},
		{
			"lc_ans_id":"44311",
			"view":"1762",
			"top":"9",
			"title":"Python easy-to-understand solution",
			"vote":"18",
			"content":"    class Solution(object):\\n    def wordBreak(self, s, wordDict):\\n        \"\"\"\\n        :type s: str\\n        :type wordDict: Set[str]\\n        :rtype: List[str]\\n        \"\"\"\\n        return self.helper(s, wordDict, {})\\n        \\n    def helper(self, s, wordDict, memo):\\n        if s in memo: return memo[s]\\n        if not s: return []\\n        \\n        res = []\\n        for word in wordDict:\\n            if not s.startswith(word):\\n                continue\\n            if len(word) == len(s):\\n                res.append(word)\\n            else:\\n                resultOfTheRest = self.helper(s[len(word):], wordDict, memo)\\n                for item in resultOfTheRest:\\n                    item = word + ' ' + item\\n                    res.append(item)\\n        memo[s] = res\\n        return res"
		}
	],
	"id":"140",
	"title":"Word Break II",
	"content":"<p>\r\nGiven a <b>non-empty</b> string <i>s</i> and a dictionary <i>wordDict</i> containing a list of <b>non-empty</b> words, add spaces in <i>s</i> to construct a sentence where each word is a valid dictionary word. You may assume the dictionary does not contain duplicate words.\r\n</p>\r\n\r\n<p>\r\nReturn all such possible sentences.\r\n</p>\r\n\r\n<p>\r\nFor example, given<br>\r\n<i>s</i> = <code>\"catsanddog\"</code>,<br>\r\n<i>dict</i> = <code>[\"cat\", \"cats\", \"and\", \"sand\", \"dog\"]</code>.\r\n</p>\r\n\r\n<p>\r\nA solution is <code>[\"cats and dog\", \"cat sand dog\"]</code>.\r\n</p>\r\n\r\n<p>\r\n<b><font color=\"red\">UPDATE (2017/1/4):</font></b><br />\r\nThe <i>wordDict</i> parameter had been changed to a list of strings (instead of a set of strings). Please reload the code definition to get the latest changes.\r\n</p>",
	"frequency":"441",
	"ac_num":"106448"
}