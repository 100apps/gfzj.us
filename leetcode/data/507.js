{
	"difficulty":"2",
	"submit_num":"29941",
	"show_id":"522",
	"leetcode_id":"522",
	"answers":[
		{
			"lc_ans_id":"99453",
			"view":"7673",
			"top":"0",
			"title":"Python, Simple Explanation",
			"vote":"26",
			"content":"When we add a letter Y to our candidate longest uncommon subsequence answer of X, it only makes it strictly harder to find a common subsequence.  Thus our candidate longest uncommon subsequences will be chosen from the group of words itself.\\n\\nSuppose we have some candidate X.  We only need to check whether X is not a subsequence of any of the other words Y.  To save some time, we could have quickly ruled out Y when len(Y) < len(X), either by adding \"if len(w1) > len(w2): return False\" or enumerating over A[:i] (and checking neighbors for equality.)  However, the problem has such small input constraints that this is not required.\\n\\nWe want the max length of all candidates with the desired property, so we check candidates in descending order of length.  When we find a suitable one, we know it must be the best global answer.\\n\\n```\\ndef subseq(w1, w2):\\n    #True iff word1 is a subsequence of word2.\\n    i = 0\\n    for c in w2:\\n        if i < len(w1) and w1[i] == c:\\n            i += 1\\n    return i == len(w1)\\n    \\nA.sort(key = len, reverse = True)\\nfor i, word1 in enumerate(A):\\n    if all(not subseq(word1, word2) \\n            for j, word2 in enumerate(A) if i != j):\\n        return len(word1)\\nreturn -1\\n```"
		},
		{
			"lc_ans_id":"99443",
			"view":"3648",
			"top":"1",
			"title":"Java(15ms) - Sort + check subsequence",
			"vote":"19",
			"content":"Sort the strings in the reverse order. If there is not duplicates in the array, then the longest string is the answer. \\n\\nBut if there are duplicates, and if the longest string is not the answer, then we need to check other strings. But the smaller strings can be subsequence of the bigger strings. \\nFor this reason, we need to check if the string is a subsequence of all the strings bigger than itself. If it's not, that is the answer. \\n```java\\n    public int findLUSlength(String[] strs) {\\n        Arrays.sort(strs, new Comparator<String>() {\\n            public int compare(String o1, String o2) {\\n                return o2.length() - o1.length();\\n            }\\n        });\\n        \\n        Set<String> duplicates = getDuplicates(strs);\\n        for(int i = 0; i < strs.length; i++) {\\n            if(!duplicates.contains(strs[i])) {\\n                if(i == 0) return strs[0].length();\\n                for(int j = 0; j < i; j++) {\\n                    if(isSubsequence(strs[j], strs[i])) break;\\n                    if(j == i-1) return strs[i].length();\\n                }\\n            }\\n        }\\n        return -1;\\n    }\\n    \\n    public boolean isSubsequence(String a, String b) {\\n        int i = 0, j = 0;\\n        while(i < a.length() && j < b.length()) {\\n            if(a.charAt(i) == b.charAt(j)) j++;\\n            i++;\\n        }\\n        return j == b.length();\\n    }\\n    \\n    private Set<String> getDuplicates(String[] strs) {\\n        Set<String> set = new HashSet<String>();\\n        Set<String> duplicates = new HashSet<String>();\\n        for(String s : strs) {\\n            if(set.contains(s)) duplicates.add(s);\\n            set.add(s);\\n        }\\n        return duplicates;\\n    }\\n```"
		},
		{
			"lc_ans_id":"99449",
			"view":"5747",
			"top":"2",
			"title":"Java Hashing Solution",
			"vote":"11",
			"content":"We simply maintain a map of all subsequence frequencies and get the subsequence with frequency 1 that has longest length.\\n\\nNOTE: This solution does not take advantage of the fact that the optimal length subsequence (if it exists) is always going to be the length of some string in the array. Thus, the time complexity of this solution is non-optimal. See https://discuss.leetcode.com/topic/85044/python-simple-explanation for optimal solution.\\n\\n```\\npublic int findLUSlength(String[] strs) {\\n    Map<String, Integer> subseqFreq = new HashMap<>();\\n    for (String s : strs) \\n        for (String subSeq : getSubseqs(s))\\n            subseqFreq.put(subSeq, subseqFreq.getOrDefault(subSeq, 0) + 1);\\n    int longest = -1;\\n    for (Map.Entry<String, Integer> entry : subseqFreq.entrySet()) \\n        if (entry.getValue() == 1) longest = Math.max(longest, entry.getKey().length());\\n    return longest;\\n}\\n\\npublic static Set<String> getSubseqs(String s) {\\n    Set<String> res = new HashSet<>();\\n    if (s.length() == 0) {\\n         res.add(\"\");\\n         return res;\\n    }\\n    Set<String> subRes = getSubseqs(s.substring(1));\\n    res.addAll(subRes);\\n    for (String seq : subRes) res.add(s.charAt(0) + seq);\\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"99498",
			"view":"2653",
			"top":"3",
			"title":"hashmap + sort solution, c++",
			"vote":"10",
			"content":"```\\nbool cmp(pair<string,int> &a, pair<string,int> &b)\\n{\\n    return a.first.size() > b.first.size();\\n}\\n\\nbool isS1subsOfS2(string &s1, string &s2){\\n    int j = 0, i = 0;\\n    for(; i < s1.size(); ++i){\\n        while(j < s2.size() && s1[i] != s2[j]) ++j;\\n        if(j == s2.size())\\n           return false;\\n        ++j;\\n    }\\n    return true;\\n}\\nclass Solution {\\npublic:\\n    int findLUSlength(vector<string>& strs) {\\n        unordered_map<string,int> m;\\n        for(int i = 0; i < strs.size(); ++i)\\n          ++m[strs[i]];\\n        vector<pair<string,int>> v;\\n        for(auto it = m.begin(); it != m.end(); ++it)\\n           v.push_back(*it);\\n        sort(v.begin(),v.end(),cmp);\\n        for(int i = 0; i < v.size(); ++i)\\n        {\\n           if(v[i].second == 1){\\n               int j = 0;\\n               for(; j < i; ++j)\\n                 if(isS1subsOfS2(v[i].first,v[j].first))\\n                     break;\\n               if(j == i) return v[i].first.size();\\n           }\\n        }\\n        return -1;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99456",
			"view":"2128",
			"top":"4",
			"title":"Clean C++ O(n^2) with Explanation",
			"vote":"4",
			"content":"Very naive solution. Find the max Len of a string that is has no common subsequence of any other string. \\n```\\nclass Solution {\\npublic:\\n    //This is used to determine if a has common subsequence in b\\n    bool hasCommon(string a,string b){\\n        int remine = a.size();\\n        int remine2 = b.size();\\n        for(;remine>0&&remine2>0;){\\n            int i = a.size()-remine;\\n            int j = b.size()-remine2;\\n            if(a.at(i) == b.at(j)){\\n                remine--;remine2--;\\n            }else{\\n                remine2--;\\n            }\\n        }\\n        return remine==0;\\n    }\\n    int findLUSlength(vector<string>& strs) {\\n        int maxLen = -1;\\n        for(int i = 0;i<strs.size();++i){\\n            int currentLen = strs[i].length();\\n            bool all = true;\\n            for(int j = 0;j<strs.size();++j){\\n                if(i!=j&&hasCommon(strs[i], strs[j])){\\n                    all = false;\\n                    break;\\n                }\\n            }\\n            if(all){\\n                maxLen = maxLen<currentLen?currentLen:maxLen;\\n            }\\n        }\\n        return maxLen;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99494",
			"view":"642",
			"top":"5",
			"title":"Question on particular test",
			"vote":"2",
			"content":"One of the test case for the code is:\\n[\"aabbcc\", \"aabbcc\",\"cb\",\"abc\"]\\nIn this case the expected output is 2.\\n\\nCan someone explain why it is 2. From what i understand isn't the longest uncommon subsequence \"abc\"(length 3) since is is not common with any of the string."
		},
		{
			"lc_ans_id":"99447",
			"view":"100",
			"top":"6",
			"title":"Java(10ms) beat 90% without using hash",
			"vote":"1",
			"content":"Here are the observations of this problem:\\n\\n1. the LUS must not duplicate in the giving strings, otherwise, it's the subsequence of itself.\\n2. if length of String A larger than the length of String B then A is not a subsequence of B.\\n\\nBase on these two observations, the solution is:\\n\\n1. Sort the string array, based on the length of the string.\\n2. go thought the array start from the longest to the shortest, if it's unique and it's not a subsequence of the strings with the length larger than it. then we found the LUS, just return it's length.\\n\\nThere are solutions using a hash set to find duplicate strings. However, if the sort is based on both length(first) and alphabet(second) order, then the duplicated ones are neighbours in the sorted array. So, you can simply check if array[i] == array[i - 1] to determine if the string is duplicate.\\n\\n    public int findLUSlength(String[] strs) {\\n        Arrays.sort(strs, new Comparator<String>() {\\n            public int compare(String a, String b) {\\n                return a.length() != b.length() ? a.length() - b.length() : a.compareTo(b);\\n            }\\n        });\\n        \\n        for(int i = strs.length - 1; i >= 0; i--) {\\n            if(i > 0 && !strs[i].equals(strs[i - 1]) || i == 0) {\\n                int j = i + 1;\\n                for(; j < strs.length; j++)\\n                    if(isSubSequence(strs[i], strs[j]))\\n                        break;\\n                if(j == strs.length)\\n                    return strs[i].length();\\n            }\\n        }\\n        \\n        return -1;\\n    }\\n    \\n    private boolean isSubSequence(String a, String b) {\\n       if(a.equals(b)) return true;\\n        int p = 0;\\n        for(int i = 0; i < b.length() && p < a.length(); i++)\\n            if(b.charAt(i) == a.charAt(p))\\n                p++;\\n        return p == a.length();\\n    }"
		},
		{
			"lc_ans_id":"99489",
			"view":"551",
			"top":"7",
			"title":"Simple Java Solution",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int findLUSlength(String[] strs) {\\n        if(isEqual(strs)) return -1;\\n        \\n        Arrays.sort(strs, (a, b) -> Integer.compare(b.length(), a.length()));\\n        \\n        for(int i = 0; i < strs.length; ++i) {\\n            String first = strs[i];\\n            boolean flag = true;\\n            for(int j = 0; j < strs.length; ++j) {\\n                if(j == i) continue;\\n                String second = strs[j];\\n                if(first.equals(second) || charMatch(first, second)) {\\n                    flag = false;\\n                    break;\\n                }\\n            }\\n            if(flag) return first.length();\\n        }\\n        \\n        return -1;\\n    }\\n    \\n    private boolean charMatch(String first, String second) {\\n        int index = -1;\\n        for(int k = 0; k < first.length(); k++) {\\n            char c = first.charAt(k);\\n            index = second.indexOf(c, index + 1);\\n            if(index == -1) return false;\\n        }\\n        return true;\\n    }\\n    \\n    public boolean isEqual(String[] strs) {\\n        for(int i = 1; i < strs.length; ++i) {\\n            if(strs[i - 1].equals(strs[i])) continue;\\n            return false;\\n        }\\n        return true;\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"99496",
			"view":"452",
			"top":"8",
			"title":"[C++] Clean Code",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int findLUSlength(vector<string>& strs) {\\n        int n = strs.size();\\n        int maxlen = -1;\\n        for (int i = 0; i < n; i++) {\\n            bool uniq = true;\\n            for (int j = 0; j < n; j++) {\\n                if (i != j && isSubsequence(strs[i], strs[j], 0, 0)) {\\n                    uniq = false;\\n                    break;\\n                }\\n            }\\n            if (uniq) {\\n                maxlen = max(maxlen, (int)strs[i].length());\\n            }\\n        }\\n\\n        return maxlen;\\n    }\\nprivate:\\n    bool isSubsequence(string s, string t, size_t si, size_t ti) {\\n        if (si == s.length()) {\\n            return true;\\n        }\\n        if (ti == t.length()) {\\n            return false;\\n        }\\n\\n        return (s[si] == t[ti]) && isSubsequence(s, t, si + 1, ti + 1) || isSubsequence(s, t, si, ti + 1);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99445",
			"view":"49",
			"top":"9",
			"title":"share my o(n) solution",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    bool isSubSeq(string &s1, string &s2)\\n    {\\n        int i = 0, j;\\n        for (j = 0; j<s2.size() ; j++)\\n        {\\n            while (i<s1.size() && s1[i] != s2[j])\\n            {\\n                i++;\\n            }\\n            if(i>=s1.size()) break;\\n            i++;\\n        }\\n        return j == s2.size();\\n    }\\n    int findLUSlength(vector<string>& strs) {\\n        map<int, unordered_set<string>> map;\\n        unordered_set<string> duplicated;\\n        for (auto x : strs)\\n        {\\n            if (map[x.size()].find(x) != map[x.size()].end())\\n                duplicated.insert(x);\\n            else\\n                map[x.size()].insert(x);\\n        }\\n        for (auto it = map.rbegin(); it != map.rend(); it++)\\n        {\\n            for (auto s : it->second)\\n            {\\n                if (duplicated.find(s) != duplicated.end()) continue;\\n                bool isSub = false;\\n                for (auto it2 = map.rbegin(); it2 != it; it2++)\\n                {\\n                    for (auto s2 : it2->second)\\n                    {\\n                        if (isSubSeq(s2, s))\\n                        {\\n                            isSub = true;\\n                            break;\\n                        }\\n                    }\\n                    if (isSub) break;\\n                }\\n                if (!isSub) return s.size();\\n            }\\n        }\\n        return -1;\\n    }\\n};\\n```"
		}
	],
	"id":"507",
	"title":"Longest Uncommon Subsequence II",
	"content":"<p>\r\nGiven a list of strings, you need to find the longest uncommon subsequence among them. The longest uncommon subsequence is defined as the longest subsequence of one of these strings and this subsequence should not be <b>any</b> subsequence of the other strings.\r\n</p>\r\n\r\n<p>\r\nA <b>subsequence</b> is a sequence that can be derived from one sequence by deleting some characters without changing the order of the remaining elements. Trivially, any string is a subsequence of itself and an empty string is a subsequence of any string.\r\n</p>\r\n\r\n<p>\r\nThe input will be a list of strings, and the output needs to be the length of the longest uncommon subsequence. If the longest uncommon subsequence doesn't exist, return -1.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"aba\", \"cdc\", \"eae\"\r\n<b>Output:</b> 3\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>All the given strings' lengths will not exceed 10.</li>\r\n<li>The length of the given list will be in the range of [2, 50].</li>\r\n</ol>\r\n</p>",
	"frequency":"101",
	"ac_num":"9598"
}