{
	"difficulty":"2",
	"submit_num":"42110",
	"show_id":"524",
	"leetcode_id":"524",
	"answers":[
		{
			"lc_ans_id":"99588",
			"view":"9570",
			"top":"0",
			"title":"Short Java Solutions - Sorting Dictionary and Without Sorting",
			"vote":"41",
			"content":"We sort the input dictionary by longest length and lexicography. Then, we iterate through the dictionary exactly once. In the process, the first dictionary word in the sorted dictionary which appears as a subsequence in the input string s must be the desired solution.\\n\\n```\\npublic String findLongestWord(String s, List<String> d) {\\n    Collections.sort(d, (a,b) -> a.length() != b.length() ? -Integer.compare(a.length(), b.length()) :  a.compareTo(b));\\n    for (String dictWord : d) {\\n        int i = 0;\\n        for (char c : s.toCharArray()) \\n            if (i < dictWord.length() && c == dictWord.charAt(i)) i++;\\n        if (i == dictWord.length()) return dictWord;\\n    }\\n    return \"\";\\n}\\n```\\n\\nAn alternate, more efficient solution which avoids sorting the dictionary: \\n\\n```\\npublic String findLongestWord(String s, List<String> d) {\\n    String longest = \"\";\\n    for (String dictWord : d) {\\n        int i = 0;\\n        for (char c : s.toCharArray()) \\n            if (i < dictWord.length() && c == dictWord.charAt(i)) i++;\\n\\n        if (i == dictWord.length() && dictWord.length() >= longest.length()) \\n            if (dictWord.length() > longest.length() || dictWord.compareTo(longest) < 0)\\n                longest = dictWord;\\n    }\\n    return longest;\\n}\\n```\\n\\nTime Complexity: O(nk), where n is the length of string s and k is the number of words in the dictionary."
		},
		{
			"lc_ans_id":"99590",
			"view":"3128",
			"top":"1",
			"title":"Short Python solutions",
			"vote":"15",
			"content":"    def findLongestWord(self, s, d):\\n        def isSubsequence(x):\\n            it = iter(s)\\n            return all(c in it for c in x)\\n        return max(sorted(filter(isSubsequence, d)) + [''], key=len)\\n\\nMore efficient version (no sorting):\\n\\n    def findLongestWord(self, s, d):\\n        def isSubsequence(x):\\n            it = iter(s)\\n            return all(c in it for c in x)\\n        return min(filter(isSubsequence, d) + [''], key=lambda x: (-len(x), x))\\n\\nDifferent style:\\n\\n    def findLongestWord(self, s, d):\\n        best = ''\\n        for x in d:\\n            if (-len(x), x) < (-len(best), best):\\n                it = iter(s)\\n                if all(c in it for c in x):\\n                    best = x\\n        return best\\n\\nOptimized as suggested by @easton042, testing from longest to shortest and returning the first valid one without testing the rest:\\n\\n    def findLongestWord(self, s, d):\\n        def isSubsequence(x):\\n            it = iter(s)\\n            return all(c in it for c in x)\\n        d.sort(key=lambda x: (-len(x), x))\\n        return next(itertools.ifilter(isSubsequence, d), '')\\n\\nOr:\\n\\n    def findLongestWord(self, s, d):\\n        for x in sorted(d, key=lambda x: (-len(x), x)):\\n            it = iter(s)\\n            if all(c in it for c in x):\\n                return x\\n        return ''\\n\\nAnd taking that even further by not sorting unnecessarily much:\\n\\n    def findLongestWord(self, s, d):\\n        heap = [(-len(word), word) for word in d]\\n        heapq.heapify(heap)\\n        while heap:\\n            word = heapq.heappop(heap)[1]\\n            it = iter(s)\\n            if all(c in it for c in word):\\n                return word\\n        return ''"
		},
		{
			"lc_ans_id":"99583",
			"view":"2012",
			"top":"2",
			"title":"Python Simple (Two pointer)",
			"vote":"10",
			"content":"Let's check whether each word is a subsequence of S individually by \"best\" order (largest size, then lexicographically smallest.)  Then if we find a match, we know the word being considered must be the best possible answer, since better answers were already considered beforehand.\\n\\nLet's figure out how to check if a needle (***word***) is a subsequence of a haystack (***S***).  This is a classic problem with the following solution: walk through S, keeping track of the position (***i***) of the needle that indicates that word[i:] still remains to be matched to S at this point in time.  Whenever word[i] matches the current character in S, we only have to match word[i+1:], so we increment i.  At the end of this process, i == len(word) if and only if we've matched every character in word to some character in S in order of our walk.\\n\\n```\\ndef findLongestWord(self, S, D):\\n    D.sort(key = lambda x: (-len(x), x))\\n    for word in D:\\n        i = 0\\n        for c in S:\\n            if i < len(word) and word[i] == c:\\n                i += 1\\n        if i == len(word):\\n            return word\\n    return \"\"\\n```"
		},
		{
			"lc_ans_id":"99585",
			"view":"3104",
			"top":"3",
			"title":"10 lines solutions for c++",
			"vote":"7",
			"content":"I think there is no need to sort the dic, just iterate the dic and test whether the word is satisfied and whether we need update our answer.\\n\\n```\\n    string findLongestWord(string s, vector<string>& d) {\\n        string ans;\\n        for (int i = 0; i < d.size(); i++) {\\n            int pi = 0, pj = 0;\\n            for (; pi < s.size() && pj < d[i].size(); pi++) {\\n                pj += s[pi] == d[i][pj];\\n            }\\n            if (pj == d[i].size() && (ans.size() < d[i].size() || (ans.size() == d[i].size() && ans > d[i])))\\n                ans = d[i];\\n        }\\n        return ans;\\n    }\\n```"
		},
		{
			"lc_ans_id":"99597",
			"view":"2323",
			"top":"4",
			"title":"Easy Java Solution, isSubSequence",
			"vote":"4",
			"content":"Idea is sort the dictionary ```d``` first by length ```DESC``` then lexicographical ```ASC``` and test if ```p``` is ```SubSequence``` of ```s```. The first match is the answer.\\n\\n```\\npublic class Solution {\\n    public String findLongestWord(String s, List<String> d) {\\n        if (s.length() == 0 || d.size() == 0) return \"\";\\n        \\n        Collections.sort(d, (a, b) -> {\\n           if (a.length() != b.length()) return b.length() - a.length();\\n           return a.compareTo(b);\\n        });\\n        \\n        for (String p : d) {\\n            if (s.length() < p.length()) continue;\\n            if (isSubSeq(s, p)) return p;\\n        }\\n        \\n        return \"\";\\n    }\\n    \\n    private boolean isSubSeq(String s, String p) {\\n        int i = 0, j = 0;\\n        while (i < s.length() && j < p.length()) {\\n            if (s.charAt(i) == p.charAt(j)) {\\n                i++; j++;\\n            }\\n            else {\\n                i++;\\n            }\\n        }\\n        return j == p.length();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99592",
			"view":"249",
			"top":"5",
			"title":"a test case error ??",
			"vote":"3",
			"content":"Hello,\\n\\nI have a testcase that failed.\\n\\nThe input:\\n\\n\"aewfafwafjlwajflwajflwafj\"\\n[\"apple\",\"ewaf\",\"awefawfwaf\",\"awef\",\"awefe\",\"ewafeffewafewf\"]\\n\\nThe output for this one in the testcase is \"ewaf\"\\n\\nbut I think it is \"awefawfwaf\", which is the longest string.\\n\\nIs there anything wrong on my side?"
		},
		{
			"lc_ans_id":"99611",
			"view":"1337",
			"top":"6",
			"title":"Fast java solution 19ms beats 97% using indexOf",
			"vote":"3",
			"content":"My solution is very simple. Compare s with every words in dictionary using String.indexOf(). If matched, then compare size and lexicographical order with the candidate. \\n```\\npublic class Solution {\\n    public String findLongestWord(String s, List<String> d) {\\n        String longest=null;\\n        Iterator<String> itr=d.iterator();\\n        while(itr.hasNext()){\\n            String dd=itr.next();\\n            int start=-1;\\n            boolean flag=true;\\n            for(int i=0;i<dd.length();i++){\\n                start=s.indexOf(dd.charAt(i),start+1);\\n                if(start<0){\\n                    flag=false;\\n                    break;\\n                }\\n            }\\n            if(!flag)   continue;\\n            if(longest==null)   longest=dd;\\n            else{\\n                if(dd.length()>longest.length())    longest=dd;\\n                if(dd.length()==longest.length()&&dd.compareTo(longest)<0)   longest=dd;\\n            }\\n        }\\n        return longest==null?\"\":longest;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99621",
			"view":"564",
			"top":"7",
			"title":"My AC approach using sorting and binary search",
			"vote":"2",
			"content":"Approach:\\n1. Sort the strings in descending order of length (if length is equal, opt for the lexicographically smaller one)\\n\\n2. Pre-process the string `s` into a dictionary of char to list of indices. Note that these indices are in sorted order and can therefore facilitate the use of binary search.\\n\\nOverall Time complexity for N strings of average length |T| and string of length |S| :O(NlogN) + O(NTlog(|S|)\\n\\n```\\nclass Solution {\\npublic:\\n    struct order\\n    {\\n        bool operator()(const string& s1, const string& s2)\\n        {\\n            if(s1.size() == s2.size())\\n            {\\n                int j = 0;\\n                while(s1[j] == s2[j] && j < s1.size())\\n                    j++;\\n                return (j == s1.size()) ? true : s1[j] < s2[j];\\n            }\\n            else\\n                return s1.size() > s2.size();\\n        }\\n    };\\n    string findLongestWord(string s, vector<string>& d)\\n    {\\n        sort(d.begin(), d.end(), order());\\n        vector<vector<int>> dict(26, vector<int>());\\n        int i = 0;\\n        for(auto c : s)\\n            dict[c - 'a'].push_back(i++);\\n        string result;\\n        for(auto ele : d)\\n        {\\n            int id = 0;\\n            bool notPossible = false;\\n            for(auto c : ele)\\n            {\\n                auto nextIt = lower_bound(dict[c - 'a'].begin(), dict[c - 'a'].end(), id);\\n                if(nextIt == dict[c - 'a'].end())\\n                {\\n                    notPossible = true;\\n                    break;\\n                }\\n                id = *nextIt + 1;\\n            }\\n            if(!notPossible)\\n            {\\n                result = ele;\\n                break;\\n            }\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99577",
			"view":"23",
			"top":"8",
			"title":"C++ 86ms hash+binary search",
			"vote":"1",
			"content":"```\\nstring findLongestWord(string s, vector<string>& d) {\\n    vector<vector<int> >hash(26,vector<int>{});//each letter's position of s\\n    for(int i=0;i<s.size();i++)hash[s[i]-'a'].push_back(i);\\n    sort(d.begin(),d.end(),[](string&a,string&b){return a.size()==b.size()?a<b:a.size()>b.size();});\\n    for(string str:d){\\n        int p=-1;\\n        bool f=1;\\n        vector<int>::iterator it;\\n        for(int i=0;i<str.size();i++){\\n            if(hash[str[i]-'a'].empty()){f=0;break;}\\n            if(i>0&&str[i]==str[i-1])it++;\\n            else it=upper_bound(hash[str[i]-'a'].begin(),hash[str[i]-'a'].end(),p);\\n            if(it==hash[str[i]-'a'].end()){f=0;break;}\\n            p=*it;\\n        }\\n        if(f)return str;\\n    }\\n    return \"\";\\n}\\n```"
		},
		{
			"lc_ans_id":"99587",
			"view":"90",
			"top":"9",
			"title":"Java Solution",
			"vote":"1",
			"content":"```public class Solution {\\n    public String findLongestWord(String s, List<String> d) {\\n        String longest = \"\";\\n        for(String word:d){\\n            if(word.length()>=longest.length()){\\n                int curI = 0;\\n                for(int i =0; i<s.length() && curI<word.length(); i++){\\n                    char c = s.charAt(i);\\n                    if(c==word.charAt(curI)){\\n                        curI++;\\n                    }\\n                }\\n                if(curI==word.length()){\\n                    if(word.length()==longest.length()&&word.compareTo(longest)>=0){\\n                        continue;\\n                    }\\n                    longest = word;\\n                }\\n            }\\n        }\\n        return longest;\\n    }\\n}"
		}
	],
	"id":"509",
	"title":"Longest Word in Dictionary through Deleting",
	"content":"<p>\r\nGiven a string and a string dictionary, find the longest string in the dictionary that can be formed by deleting some characters of the given string. If there are more than one possible results, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.\r\n</p>\r\n<p><b>Example 1:</b><br>\r\n<pre>\r\n<b>Input:</b>\r\ns = \"abpcplea\", d = [\"ale\",\"apple\",\"monkey\",\"plea\"]\r\n\r\n<b>Output:</b> \r\n\"apple\"\r\n</pre>\r\n</p>\r\n\r\n</p>\r\n<p><b>Example 2:</b><br>\r\n<pre>\r\n<b>Input:</b>\r\ns = \"abpcplea\", d = [\"a\",\"b\",\"c\"]\r\n\r\n<b>Output:</b> \r\n\"a\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>All the strings in the input will only contain lower-case letters.</li>\r\n<li>The size of the dictionary won't exceed 1,000.</li>\r\n<li>The length of all the strings in the input won't exceed 1,000.</li>\r\n</ol>\r\n</p>",
	"frequency":"147",
	"ac_num":"18294"
}